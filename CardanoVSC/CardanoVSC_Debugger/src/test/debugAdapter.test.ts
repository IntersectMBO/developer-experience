
import * as fs from "fs/promises";
import * as path from "path";
import { HaskellDebugSession } from "../debugAdapter";
import { DebugProtocol } from "vscode-debugprotocol";
jest.mock("vscode");
import * as vscode from "vscode";


jest.mock("fs/promises");
jest.mock("../utils/extractHaskellFunctions", () => ({
  extractHaskellFunctions: jest.fn(() =>
    Promise.resolve([
      {
        name: "add",
        args: ["x", "y"],
        body: ["x + y"],
      },
    ])
  ),
}));

const mockFilePath = "test/app/Main.hs";

describe("HaskellDebugSession", () => {
  let session: HaskellDebugSession;

  beforeEach(() => {
    session = new HaskellDebugSession();

    session["_currentLine"] = 42;
    session["_argumentMap"] = { x: "1", y: "2" };
    session["launchArgs"] = {
      activeFile: mockFilePath,
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });


  describe("getModuleNameFromFile", () => {
    it("should return module name when valid module line is found", async () => {
      const fileContent = `
        module Hello.World where

        main = putStrLn "Hello"
      `;
      (fs.readFile as jest.Mock).mockResolvedValue(fileContent);

      const moduleName = await session["getModuleNameFromFile"](mockFilePath);
      expect(moduleName).toBe("Hello.World");
    });

    it("should return null when no module declaration is found", async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        'main = putStrLn "Hello"'
      );
      const moduleName = await session["getModuleNameFromFile"](mockFilePath);
      expect(moduleName).toBeNull();
    });

    it("should handle file read error gracefully", async () => {
      (fs.readFile as jest.Mock).mockRejectedValue(new Error("Read error"));
      const moduleName = await session["getModuleNameFromFile"](mockFilePath);
      expect(moduleName).toBeNull();
    });
  });

  describe("variablesRequest", () => {
    it("should return variables including file info, module name, and function info", async () => {
      const response: DebugProtocol.VariablesResponse = {
        request_seq: 1,
        success: true,
        command: "variables",
        body: { variables: [] },
        seq: 0,
        type: "response",
      };

      const fileName = path.basename(mockFilePath);
      const dirName = path.dirname(mockFilePath);

      // Mock module name
      (fs.readFile as jest.Mock).mockResolvedValue(`
        module Test.Main where
        main = putStrLn "Hello"
      `);

      await session["variablesRequest"](response, { variablesReference: 1000 });

      expect(response.body.variables).toEqual(
        expect.arrayContaining([
          { name: "File", value: fileName, variablesReference: 0 },
          { name: "Directory", value: dirName, variablesReference: 0 },
          { name: "📄 Module", value: "Test.Main", variablesReference: 0 },
          expect.objectContaining({
            name: " add ",
            value: expect.stringContaining("f: add x y"),
          }),
          expect.objectContaining({ name: " x ", value: "1" }),
          expect.objectContaining({ name: " y ", value: "2" }),
        ])
      );
    });
  });

  describe("stackTraceRequest", () => {
    it("returns stack frame when _currentLine is set", async () => {
      session["_currentLine"] = 5;
      session["launchArgs"] = {
        activeFile: "test/app/Main.hs",
      };

      const response: DebugProtocol.StackTraceResponse = {
        seq: 1,
        type: "response",
        request_seq: 1,
        success: true,
        command: "stackTrace",
        body: {
          stackFrames: [],
          totalFrames: 0,
        },
      };

      const sendResponseSpy = jest.spyOn(session as any, "sendResponse");

      await session["stackTraceRequest"](response, {
        threadId: 1,
      });

      expect(response.body.stackFrames.length).toBe(1);
      expect(response.body.stackFrames[0]).toEqual({
        id: 1,
        name: "main",
        line: 5,
        column: 1,
        source: {
          name: path.basename("test/app/Main.hs"),
          path: "test/app/Main.hs",
        },
      });

      expect(sendResponseSpy).toHaveBeenCalledWith(response);
    });

    it("returns no frame when _currentLine is undefined", async () => {
      session["_currentLine"] = -1;
      session["launchArgs"] = {
        activeFile: "test/app/Main.hs",
      };

      const response: DebugProtocol.StackTraceResponse = {
        seq: 2,
        type: "response",
        request_seq: 2,
        success: true,
        command: "stackTrace",
        body: {
          stackFrames: [],
          totalFrames: 0,
        },
      };

      const sendResponseSpy = jest.spyOn(session as any, "sendResponse");

      await session["stackTraceRequest"](response, {
        threadId: 1,
      });

      expect(response.body.stackFrames).toHaveLength(0);
      expect(sendResponseSpy).toHaveBeenCalledWith(response);
    });
  });

  // --- New tests for setBreakPointsRequest ---
  describe("setBreakPointsRequest", () => {
    beforeEach(() => {
      jest.spyOn(session as any, "launchRequest").mockImplementation(() => {});
      jest.spyOn(session as any, "sendErrorResponse").mockImplementation(() => {});
      jest.spyOn(session as any, "sendResponse").mockImplementation(() => {});
    });

    it("should set breakpoints and call launchRequest when launchArgs is available", () => {
      session["launchArgs"] = { activeFile: mockFilePath };

      const response: DebugProtocol.SetBreakpointsResponse = {
        seq: 1,
        type: "response",
        request_seq: 1,
        success: true,
        command: "setBreakpoints",
        body: { breakpoints: [] },
      };

      const args: DebugProtocol.SetBreakpointsArguments = {
        source: {
          name: "file.hs",
          path: mockFilePath,
        },
        breakpoints: [
          { line: 10 },
          { line: 20 },
        ],
        sourceModified: false,
      };

      const launchRequestSpy = jest.spyOn(session as any, "launchRequest");
      const sendResponseSpy = jest.spyOn(session as any, "sendResponse");

      session["setBreakPointsRequest"](response, args);

      // Internal breakpoints array updated correctly
      expect(session["_breakpoints"]).toEqual([10, 20]);

      // Response body contains verified breakpoints
      expect(response.body).toEqual({
        breakpoints: [
          { verified: true, line: 10 },
          { verified: true, line: 20 },
        ],
      });

     
      expect(launchRequestSpy).toHaveBeenCalledTimes(1);
      expect(launchRequestSpy).toHaveBeenCalledWith(response, session["launchArgs"]);

      
      expect(sendResponseSpy).toHaveBeenCalledTimes(1);
      expect(sendResponseSpy).toHaveBeenCalledWith(response);
    });

    it("should send error response when launchArgs is not available", () => {
      session["launchArgs"] = undefined;

      const response: DebugProtocol.SetBreakpointsResponse = {
        seq: 2,
        type: "response",
        request_seq: 2,
        success: true,
        command: "setBreakpoints",
        body: { breakpoints: [] },
      };

      const args: DebugProtocol.SetBreakpointsArguments = {
        source: {
          name: "file.hs",
          path: mockFilePath,
        },
        breakpoints: [
          { line: 15 },
        ],
        sourceModified: false,
      };

      const sendErrorResponseSpy = jest.spyOn(session as any, "sendErrorResponse");
      const sendResponseSpy = jest.spyOn(session as any, "sendResponse");

      session["setBreakPointsRequest"](response, args);

      
      expect(session["_breakpoints"]).toEqual([15]);

     
      expect(sendErrorResponseSpy).toHaveBeenCalledTimes(1);
      expect(sendErrorResponseSpy).toHaveBeenCalledWith(response, {
        id: 1004,
        format: "Cannot restart: No previous launch configuration available",
      });

      // sendResponse called once with response
      expect(sendResponseSpy).toHaveBeenCalledTimes(1);
      expect(sendResponseSpy).toHaveBeenCalledWith(response);
    });
  });


  describe("nextRequest", () => {
    let response: DebugProtocol.NextResponse;
    let sendResponseSpy: jest.SpyInstance;
    let sendErrorResponseSpy: jest.SpyInstance;
    let sendEventSpy: jest.SpyInstance;
    let launchRequestSpy: jest.SpyInstance;

    beforeEach(() => {
      response = {
        seq: 1,
        type: "response",
        request_seq: 1,
        success: true,
        command: "next",
        body: {},
      };
      sendResponseSpy = jest.spyOn(session as any, "sendResponse");
      sendErrorResponseSpy = jest.spyOn(session as any, "sendErrorResponse");
      sendEventSpy = jest.spyOn(session as any, "sendEvent");
      launchRequestSpy = jest.spyOn(session as any, "launchRequest").mockResolvedValue(undefined);

    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should restart when no breakpoints set and launchArgs available", async () => {
      session["_breakpoints"] = [];
      session["launchArgs"] = { activeFile: "file.hs" };

      await session["nextRequest"](response, {
          threadId: 0
      });

      expect(session["_flag"]).toBe(true);
      expect(sendResponseSpy).toHaveBeenCalledWith(response);
      expect(launchRequestSpy).toHaveBeenCalledWith(response, session["launchArgs"]);
      expect(sendErrorResponseSpy).not.toHaveBeenCalled();
    });

    
    it("should send error when no breakpoints and no launchArgs", async () => {
      session["_breakpoints"] = [];
      session["launchArgs"] = undefined;

      await session["nextRequest"](response, {
          threadId: 0
      });

      expect(session["_flag"]).toBe(true);
      expect(sendErrorResponseSpy).toHaveBeenCalledWith(response, {
        id: 1004,
        format: "Cannot restart: No previous launch configuration available",
      });
      expect(sendResponseSpy).toHaveBeenCalledWith(response);
    });



    it("should send error if at last breakpoint and no launchArgs", async () => {
        session["_breakpoints"] = [10, 20];
        session["_currentLine"] = 20;  // last breakpoint
        session["launchArgs"] = undefined;
      
        (vscode.window as any).activeTextEditor = {
          document: {
            lineCount: 42,
            lineAt: jest.fn().mockReturnValue({ text: 'main = putStrLn "Hello"' }),
          },
        };
      
        const sendErrorResponseSpy = jest.spyOn(session as any, "sendErrorResponse");
        const sendResponseSpy = jest.spyOn(session as any, "sendResponse");
        const sendEventSpy = jest.spyOn(session as any, "sendEvent");
      
        const response = {
          command: "next",
          request_seq: 1,
          seq: 1,
          type: "response",
          body: {},
          success: true,
        } as any;
      
        await session["nextRequest"](response, { threadId: 0 });
      
        expect(session["_flag"]).toBe(true);
      
        expect(sendErrorResponseSpy).toHaveBeenCalledWith(response, {
          id: 1004,
          format: "Cannot restart: No previous launch configuration available",
        });
      
        expect(sendResponseSpy).toHaveBeenCalledWith(response);
      
      
        expect(sendEventSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            event: "output",
            body: expect.objectContaining({
              output: expect.stringContaining("Reached end of program at line"),
            }),
          })
        );
      });


    it("should move to next breakpoint when not at last breakpoint", async () => {
      session["_breakpoints"] = [10, 20, 30];
      session["_currentLine"] = 10;

      await session["nextRequest"](response, {
          threadId: 0
      });

      expect(session["_currentLine"]).toBe(20);
      expect(session["_flag"]).toBe(false);


    expect(sendEventSpy).toHaveBeenCalledWith(expect.objectContaining({
        event: "stopped",
        body: expect.objectContaining({
          reason: "step",
        }),
      }));

    expect(sendEventSpy).toHaveBeenCalledWith(expect.objectContaining({
        event: "output",
        body: expect.objectContaining({
          output: expect.stringContaining("breakpoint hit at 20"),
        }),
      }));

      expect(sendResponseSpy).toHaveBeenCalledWith(response);
    });
      

    it("should send output event if no active editor when at end of file", async () => {
      // simulate last breakpoint
      session["_breakpoints"] = [10];
      session["_currentLine"] = 10;
    
  (vscode.window as any).activeTextEditor = undefined;

  const sendEventSpy = jest.spyOn(session as any, "sendEvent");
  const sendResponseSpy = jest.spyOn(session as any, "sendResponse");


  const response = {
    command: "next",
    request_seq: 1,
    seq: 1,
    type: "response",
    body: {},
    success: true,
  } as any;


      await session["nextRequest"](response, {
          threadId: 0
      });

    expect(sendEventSpy).toHaveBeenCalledWith(expect.objectContaining({
        event: "output",
        body: expect.objectContaining({
          output: expect.stringContaining("Editor not found")
        })
      }))
      expect(sendResponseSpy).toHaveBeenCalledWith(response);
    });
  });
});
