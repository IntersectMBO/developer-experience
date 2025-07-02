
import {
  DebugSession,
  InitializedEvent,
  OutputEvent,
  StoppedEvent,
  TerminatedEvent,
} from "vscode-debugadapter";
import { DebugProtocol } from "vscode-debugprotocol";
import * as child_process from "child_process";
import * as vscode from "vscode";
import * as fs from "fs/promises";
import { diagnosticCollection, parseCabalErrors } from "./diagnostics";
import path from "path";
import { Thread } from "@vscode/debugadapter";
import { extractHaskellFunctions } from "./utils/extractHaskellFunctions";

export interface HaskellLaunchRequestArguments
  extends DebugProtocol.LaunchRequestArguments {
  program?: string;
  stopOnEntry?: boolean;
  showIO?: boolean;
  runMain?: boolean;
  runFunction?: string;
  activeFile?: string;
  cabalProjectRoot?: string;
  cwd?: string;
}

export class HaskellDebugSession extends DebugSession {
  public ghciProcess: child_process.ChildProcess | undefined;
  private isFileLoaded = false;
  private loadDebounceTimer: NodeJS.Timeout | undefined;
  private lastLoadedFileContent: string | undefined;
  private launchArgs: HaskellLaunchRequestArguments | undefined;
  private isRestarting = false;
  private static THREAD_ID = 1;
  private datumValue: string = "";
  _flag: boolean = false;
  _currentLine!: number;
  _breakpoints: any;
  _currentFilePath!: string;
  private _currentLineContent: string = "";
  private _argumentMap: Record<string, string> = {};
private _callStack: { callerLine: number; callerFunc: string }[] = [];
  // variable panel

  protected threadsRequest(
    response: DebugProtocol.ThreadsResponse,
    _request?: DebugProtocol.Request
  ): void {
    response.body = {
      threads: [new Thread(HaskellDebugSession.THREAD_ID, "main")],
    };

    this.sendResponse(response);
  }

  protected scopesRequest(
    response: DebugProtocol.ScopesResponse,
    args: DebugProtocol.ScopesArguments
  ): void {
    const scopes: DebugProtocol.Scope[] = [
      {
        name: "File Info",
        variablesReference: 1000,
        expensive: false,
      },
    ];

    response.body = { scopes };
    this.sendResponse(response);
  }

  protected async variablesRequest(
    response: DebugProtocol.VariablesResponse,
    args: DebugProtocol.VariablesArguments
  ): Promise<void> {
    const variables: DebugProtocol.Variable[] = [];

    const filePath = this.launchArgs?.activeFile;
    const currentLine = this._currentLine;
    const fileName = path.basename(filePath || "unknown");
    const dirName = path.dirname(filePath || "unknown");

    variables.push(
      { name: "File", value: fileName, variablesReference: 0 },
      { name: "Directory", value: dirName, variablesReference: 0 },      
      );
      const moduleName = filePath ? await this.getModuleNameFromFile(filePath) : null;

    if (moduleName) {
      variables.push({
        name: "📄 Module",
        value: moduleName,
        variablesReference: 0,
      });
    }

    if (filePath && currentLine !== undefined) {
      const functions = await extractHaskellFunctions(filePath);

      for (const func of functions) {
        variables.push({
          name: ` ${func.name} `,
          value: `f: ${func.name} ${func.args.join(" ")} = ${func.body.join(
            " "
          )}`,
          evaluateName: func.name,
          variablesReference: 0,
        });

        for (const arg of func.args) {
          const value = this._argumentMap?.[arg] || "not set";
          variables.push({
            name: ` ${arg} `,
            value,
            variablesReference: 0,
          });
        }
      }
    }

    response.body = { variables };
    this.sendResponse(response);
  }

   
private async getModuleNameFromFile(filePath: string): Promise<string | null> {
  try {
    const content = await fs.readFile(filePath, "utf8");
    const lines = content.split("\n");
 
    for (const line of lines) {
      const match = line.match(/^\s*module\s+([\w.]+)(\s*\(.*\))?\s+where/);
      if (match) {
        console.log("✅ Module Found:", match[1]);
        return match[1];
      }
    }
    console.warn("⚠️ No module declaration found in file:", filePath);
    return null;
  } catch (error) {
    console.error("❌ Failed to read file:", error);
    return null;
  }
}

  protected async stackTraceRequest(
    response: DebugProtocol.StackTraceResponse,
    args: DebugProtocol.StackTraceArguments
  ): Promise<void> {
    try {
      const activeFile =
        this.launchArgs?.activeFile ||
        vscode.window.activeTextEditor?.document.fileName ||
        "unknown";

      const stackFrames: DebugProtocol.StackFrame[] = [];

      if (this._currentLine !== undefined && this._currentLine > 0) {
        const frame: DebugProtocol.StackFrame = {
          id: 1,
          name: "main",
          line: this._currentLine,
          column: 1,
          source: {
            name: path.basename(activeFile),
            path: activeFile,
          },
        };
        stackFrames.push(frame);
      }

      response.body = {
        stackFrames,
        totalFrames: stackFrames.length,
      };

      this.sendResponse(response);
    } catch (error) {
      this.sendErrorResponse(response, {
        id: 1,
        format: `Failed to build stack trace: ${
          error instanceof Error ? error.message : String(error)
        }`,
      });
    }
  }

  protected setBreakPointsRequest(
    response: DebugProtocol.SetBreakpointsResponse,
    args: DebugProtocol.SetBreakpointsArguments
  ): void {
    const breakpoints = args.breakpoints?.map((bp) => bp.line) || [];

    this._breakpoints = breakpoints; // ✅ Initialize your internal breakpoints list

    response.body = {
      breakpoints: breakpoints.map((line) => ({
        verified: true,
        line,
      })),
    };

    if (this.launchArgs) {
      this.launchRequest(response, this.launchArgs);
    } else {
      this.sendErrorResponse(response, {
        id: 1004,
        format: "Cannot restart: No previous launch configuration available",
      });
    }
    this.sendResponse(response);
  }

  protected async nextRequest(
    response: DebugProtocol.NextResponse,
    args: DebugProtocol.NextArguments
  ): Promise<void> {
    if (!this._breakpoints || this._breakpoints.length === 0) {
      this._flag = true;

      this.sendResponse(response);
      if (this.launchArgs) {
        await this.launchRequest(response, this.launchArgs);
      } else {
        this.sendErrorResponse(response, {
          id: 1004,
          format: "Cannot restart: No previous launch configuration available",
        });
      }
      return;
    }

    const editor = vscode.window.activeTextEditor;

    if (editor && this._currentLine) {
      const doc = editor.document;
      const currentLineText = doc.lineAt(this._currentLine - 1).text.trim();
      this._currentLineContent = currentLineText;
    }

    // First step
    if (this._currentLine === undefined) {
      this._currentLine = this._breakpoints[0];
      this.sendEvent(
        new StoppedEvent("breakpoint", HaskellDebugSession.THREAD_ID)
      );
      this.sendEvent(
        new OutputEvent(`breakpoint hit at ${this._currentLine} \n`)
      );

      this.sendResponse(response);
      return;
    }

    const currentIdx = this._breakpoints.indexOf(this._currentLine);

    // No more breakpoints — execute end of file
    if (currentIdx === -1 || currentIdx === this._breakpoints.length - 1) {
      this._flag = true;

      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const lastLine = editor.document.lineCount;
        this._currentLine = lastLine;

        const lastLineText = editor.document.lineAt(lastLine - 1).text.trim();
        this._currentLineContent = lastLineText;

        this.sendEvent(
          new OutputEvent(
            `Reached end of program at line ${this._currentLine}\n`
          )
        );

        // 🔁 Execute the final line (this is where you'd invoke GHCi, run a command, etc.)
        if (this.launchArgs) {
          await this.launchRequest(response, this.launchArgs);
        } else {
          this.sendErrorResponse(response, {
            id: 1004,
            format:
              "Cannot restart: No previous launch configuration available",
          });
        }
      } else {
        this.sendEvent(
          new OutputEvent(`Editor not found. Can't set current line.\n`)
        );
      }

      this.sendResponse(response);
      return;
    }

    // Move to next breakpoint
    this._currentLine = this._breakpoints[currentIdx + 1];
    this._flag = false;

    this.sendEvent(new StoppedEvent("step", HaskellDebugSession.THREAD_ID));
    this.sendEvent(new OutputEvent(`breakpoint hit at ${this._currentLine}\n`));

    this.sendResponse(response);
  }

  protected async stepInRequest(
    response: DebugProtocol.StepInResponse,
    args: DebugProtocol.StepInArguments,
    request?: DebugProtocol.Request
  ): Promise<void> {
    if (this._flag || this._currentLine === undefined) {
      this.sendResponse(response);
      return;
    }

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      this.sendResponse(response);
      return;
    }

    const document = editor.document;
    const fullLine = document.lineAt(this._currentLine - 1).text;

    const rhs = fullLine.split("=")[1]?.trim();
    if (!rhs) {
      await this.nextRequest(response, args as DebugProtocol.NextArguments);
      return;
    }

    const words = this.extractWords(rhs);
    
    const functions = await extractHaskellFunctions(document.fileName);

    for (const word of words) {
      const targetFunc = functions.find((f) => f.name === word);
      if (targetFunc) {
        const targetLine = this.findFunctionDefinitionLine(document, word);
        console.log(targetLine,targetFunc);
        
        if (targetLine > 0) {
          this._callStack = this._callStack || [];
          this._callStack.push({
            callerLine: this._currentLine,
            callerFunc: this.extractFunctionName(fullLine),
          });
          this._currentLine = targetLine;

          // ✅ Extract argument values from the call expression
          const callMatch = rhs.match(new RegExp(`${word}\\s+(.*)`));
          const argValues = callMatch?.[1]?.split(/\s+/) || [];

          this._argumentMap = {};
          for (let i = 0; i < targetFunc.args.length; i++) {
            const name = targetFunc.args[i];
            const value = argValues[i] || "<missing>";
            this._argumentMap[name] = value;
          }

          this.sendEvent(
            new OutputEvent(`Stepped into ${word} at line ${targetLine}\n`)
          );
          this.sendEvent(
            new OutputEvent(
              `Captured args: ${JSON.stringify(this._argumentMap)}\n`
            )
          );
          this.sendEvent(
            new StoppedEvent("step", HaskellDebugSession.THREAD_ID)
          );

          editor.revealRange(
            new vscode.Range(
              new vscode.Position(targetLine - 1, 0),
              new vscode.Position(targetLine - 1, Number.MAX_VALUE)
            ),
            vscode.TextEditorRevealType.InCenter
          );

          this.sendResponse(response);
          return;
        }
      }
    }

    await this.nextRequest(response, args as DebugProtocol.NextArguments);
  }

 
private extractWords(rhs: string): string[] {
  
  const match = rhs.match(/\[\|\|(.+?)\|\|\]/);
  if (match) {
    rhs = match[1].trim(); 
  }

  const words: string[] = [];
  let currentWord = "";
  let inString = false;
  let inParens = 0;

  for (const char of rhs) {
    if (char === '"') {
      inString = !inString;
    }
    if (char === "(" && !inString) {
      inParens++;
    }
    if (char === ")" && !inString) {
      inParens--;
    }

    if (char === " " && !inString && inParens === 0) {
      if (currentWord) {
        words.push(currentWord);
        currentWord = "";
      }
    } else {
      currentWord += char;
    }
  }

  if (currentWord) {
    words.push(currentWord);
  }

  return words.filter((w) => ![".", "=", "->"].includes(w));
}


private findFunctionDefinitionLine(
  document: vscode.TextDocument,
  funcName: string
): number {
  const text = document.getText();
  const lines = text.split("\n");

  const regex = new RegExp(`^\\s*${funcName}\\b.*=`);
  
  for (let i = 0; i < lines.length; i++) {
    if (regex.test(lines[i])) {
      return i + 1; // 1-based line number
    }
  }

  return 0;
}

  public constructor() {
    super();
    this.setDebuggerLinesStartAt1(true);
    this.setDebuggerColumnsStartAt1(true);
  }

  protected initializeRequest(
    response: DebugProtocol.InitializeResponse,
    args: DebugProtocol.InitializeRequestArguments
  ): void {
    response.body = response.body || {};
    response.body.supportsConfigurationDoneRequest = true;
    response.body.supportsFunctionBreakpoints = true;
    response.body.supportsRestartRequest = true;
    (response.body.supportsStepInTargetsRequest = true),
      (response.body.supportsSetVariable = true);
    response.body.supportsRestartFrame = true;
    this.sendResponse(response);
    this.sendEvent(new InitializedEvent());
  }

  public async launchRequest(
    response: DebugProtocol.LaunchResponse,
    args: HaskellLaunchRequestArguments
  ): Promise<void> {
    try {
      diagnosticCollection.clear();
      let x = "";
      let y = "";

      // Set launch args
      const editor = vscode.window.activeTextEditor;
      args.activeFile = editor?.document.fileName;
      this.launchArgs = args;

      // Check program validity
      const programCommand = args.program?.trim();
      const workspaceFolder =
        args.cwd || vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

      if (!programCommand || !programCommand.startsWith("cabal repl")) {
        this.sendEvent(
          new OutputEvent(
            'Please set "program": "cabal repl --repl-no-load" in launch.json\n',
            "console"
          )
        );
        this.sendResponse(response);
        return;
      }

      if (!workspaceFolder) {
        this.sendEvent(
          new OutputEvent("No workspace folder found\n", "stderr")
        );
        this.sendResponse(response);
        return;
      }

      this.isFileLoaded = false;
      this.isRestarting = false;

      // Kill existing GHCi process if any
      if (this.ghciProcess) {
        this.ghciProcess.removeAllListeners();
        this.ghciProcess.kill("SIGKILL");
        this.ghciProcess = undefined;
      }

      // Parse the program command
      const [cmd, ...cmdArgs] = programCommand.split(" ");
      this.sendEvent(new OutputEvent("Launching GHCi...\n", "console"));

      this._currentFilePath = args.activeFile || "unknown";

      // ✅ Breakpoint fallback logic
      if (!this._breakpoints || this._breakpoints.length === 0) {
        this._currentLine = 1;
        this.sendEvent(new StoppedEvent("entry", 1));
        this.sendEvent(
          new OutputEvent(`breakpoint hit  at ${this._currentLine} \n`)
        );
      } else {
        this._currentLine = this._breakpoints[0];
        this.sendEvent(new StoppedEvent("breakpoint", 1));
        this.sendEvent(
          new OutputEvent(`breakpoint hit  at ${this._currentLine} \n`)
        );
      }

      if (this._currentLine == -1) {
        this._flag = true;
      }
      // Launch GHCi only once per launch
      if (this._flag) {
        this.ghciProcess = child_process.spawn(cmd, cmdArgs, {
          cwd: workspaceFolder,
          shell: true,
        });

        this.ghciProcess.stdout?.on("data", (data: Buffer) => {
          const text = data.toString();

          x += text;
          this.sendEvent(new OutputEvent(text, "stdout"));

          if (
            (text.includes("Prelude>") ||
              text.includes("*Main>") ||
              text.includes("Ok,")) &&
            !this.isFileLoaded
          ) {
            if (args.activeFile) {
              this.loadHaskellFile(args.activeFile);
            }
          }
        });

        this.ghciProcess.stderr?.on("data", (data: Buffer) => {
          y += data.toString();
          parseCabalErrors(x + y, y);
          this.sendEvent(new OutputEvent(data.toString(), "stderr"));
        });

        this.ghciProcess.on("exit", (code) => {
          if (!this.isRestarting) {
            this.sendEvent(
              new OutputEvent(`GHCi exited with code ${code}\n`, "console")
            );
            this.sendEvent(new TerminatedEvent());
          }
        });

        this._flag = false;
      }

      if (args.activeFile) {
        await this.loadHaskellFile(args.activeFile);
      }

      this.sendResponse(response);
    } catch (error) {
      this.sendErrorResponse(response, {
        id: 1001,
        format: `Failed to launch debug session: ${error}`,
      });
    }
  }

  protected async restartRequest(
    response: DebugProtocol.RestartResponse,
    args: DebugProtocol.RestartArguments
  ): Promise<void> {
    try {
      this._flag = false;
      this.isRestarting = true;
      this.sendEvent(new OutputEvent("Restarting debug session...\n"));

      // Clean up existing process
      if (this.ghciProcess) {
        this.ghciProcess.removeAllListeners();
        this.ghciProcess.kill("SIGKILL");
        this.ghciProcess = undefined;
      }

      // Reset state
      this.isFileLoaded = false;
      this.lastLoadedFileContent = undefined;

      if (this.loadDebounceTimer) {
        clearTimeout(this.loadDebounceTimer);
        this.loadDebounceTimer = undefined;
      }

      // Start a new session
      if (this.launchArgs) {
        await this.launchRequest(response, this.launchArgs);
      } else {
        this.sendErrorResponse(response, {
          id: 1004,
          format: "Cannot restart: No previous launch configuration available",
        });
      }
    } finally {
      this.isRestarting = false;
    }
  }

  private async loadHaskellFile(filePath: string): Promise<void> {
    if (!this.ghciProcess) {
      return;
    }

    if (this.loadDebounceTimer) {
      clearTimeout(this.loadDebounceTimer);
      this.loadDebounceTimer = undefined;
    }

    try {
      const currentContent = await fs.readFile(filePath, "utf8");
      if (currentContent === this.lastLoadedFileContent && this.isFileLoaded) {
        this.sendEvent(
          new OutputEvent(`No changes in ${filePath}, skipping reload.\n`)
        );
        return;
      }

      this.lastLoadedFileContent = currentContent;

      if (!filePath.endsWith(".hs")) {
        this.sendEvent(
          new OutputEvent("File must be a Haskell source file (.hs)\n")
        );
        return;
      }

      this.loadDebounceTimer = setTimeout(() => {
        this.sendEvent(new OutputEvent(`Loading Haskell file: ${filePath}\n`));
        this.ghciProcess?.stdin?.write(`:l ${filePath}\n`);
        this.isFileLoaded = true;
        this.loadDebounceTimer = undefined;
      }, 300);
    } catch (error) {
      this.sendEvent(new OutputEvent(`Error loading file: ${error}\n`));
    }
  }

  protected evaluateRequest(
    response: DebugProtocol.EvaluateResponse,
    args: DebugProtocol.EvaluateArguments
  ): void {
    try {
      if (!this.ghciProcess) {
        throw new Error("GHCi process not running");
      }

      const expression = args.expression;
      this.ghciProcess.stdin?.write(`${expression}\n`);

      response.body = {
        result: `Evaluating: ${expression}`,
        variablesReference: 0,
      };
      this.sendResponse(response);
    } catch (error) {
      this.sendErrorResponse(response, {
        id: 1003,
        format: `Evaluation failed: ${error}`,
      });
    }
  }

  protected disconnectRequest(
    response: DebugProtocol.DisconnectResponse,
    args: DebugProtocol.DisconnectArguments
  ): void {
    if (this.loadDebounceTimer) {
      clearTimeout(this.loadDebounceTimer);
    }

    if (this.ghciProcess) {
      this.ghciProcess.removeAllListeners();
      this.ghciProcess.kill();
      this.ghciProcess = undefined;
    }

    this.sendEvent(new TerminatedEvent());
    this.sendResponse(response);
  }
   
  protected async stepOutRequest(
    response: DebugProtocol.StepOutResponse,
    args: DebugProtocol.StepOutArguments
  ): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor || !this._currentLine) {
      this.sendResponse(response);
      return;
    }
 
    if (!this._callStack || this._callStack.length === 0) {
      await this.nextRequest(response, args as DebugProtocol.NextArguments);
      return;
    }
 
    const callerInfo = this._callStack.pop();
    if (!callerInfo) {
      await this.nextRequest(response, args as DebugProtocol.NextArguments);
      return;
    }
 
    const { callerLine, callerFunc } = callerInfo;
 
    this._currentLine = callerLine;
 
    this.sendEvent(
      new OutputEvent(
        `Stepped out to caller at line ${callerLine} (${callerFunc})\n`
      )
    );
    this.sendEvent(new StoppedEvent("step", HaskellDebugSession.THREAD_ID));
 
    editor.revealRange(
      new vscode.Range(
        new vscode.Position(callerLine - 1, 0),
        new vscode.Position(callerLine - 1, Number.MAX_VALUE)
      ),
      vscode.TextEditorRevealType.InCenter
    );
 
    this.sendResponse(response);
  }
 
  protected attachRequest(
    response: DebugProtocol.AttachResponse,
    args: DebugProtocol.AttachRequestArguments,
    request?: DebugProtocol.Request
  ): void {
    this.launchRequest(response, args);
  }
    private extractFunctionName(line: string): string {
      
    const match = line.match(/^\s*\w+\s*=\s*(\w+)/);
    return match?.[1] || "<unknown>";
  }
}
