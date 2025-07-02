import * as vscode from "vscode";
import * as sinon from "sinon";
import { getNetworkConfigs, getFirstNetworkConfig, storeNetworkConfig, valApiKey } from "../config/cardanoNodeIntegration";

import("chai").then((chai) => {
  const expect = chai.expect;

  suite("cardano_node_integration Test Suite", function () {
    this.timeout(30000); 

    let showQuickPickStub: sinon.SinonStub;
    let showInputBoxStub: sinon.SinonStub;
    let globalStateUpdateStub: sinon.SinonStub;
    const apiKey: string | undefined = "preprod8Z6zi3DPfkbN32xpZPmzBUGaMLobSEU0";
    const network: string | undefined = "preprod"; 

    setup(() => {
      // Stub user input methods
      showQuickPickStub = sinon.stub(vscode.window, "showQuickPick");
      showInputBoxStub = sinon.stub(vscode.window, "showInputBox");

      // Stub globalState update
      const mockGlobalState = {
        update: sinon.stub(),
      };
      globalStateUpdateStub = mockGlobalState.update as sinon.SinonStub;
    });

    teardown(() => {
      sinon.restore(); // Restore stubbed methods after each test
    });

    test("should return true for valid API key", async () => {
      if (apiKey) {
        const result = await valApiKey(apiKey, network);
        expect(result).to.be.true;
      }
    });

    test("should return false for invalid API key", async () => {
      const result = await valApiKey("075b3c7ae74bf72046d609", network);
      expect(result).to.be.false;
    });

    test("should return stored network configurations", async () => {
      const mockConfigs = [
        { network: "preprod", apiKey: "mock-api-key-123" },
        { network: "mainnet", apiKey: "mock-api-key-456" },
      ];

      const mockContext = {
        globalState: {
          get: sinon.stub().withArgs("cardano.node").returns(mockConfigs),
        },
      } as unknown as vscode.ExtensionContext;

      const result = await getNetworkConfigs(mockContext);
      expect(result).to.deep.equal(mockConfigs);
    });

    test("should return empty array if no configs are stored", async () => {
      const mockContext = {
        globalState: {
          get: sinon.stub().withArgs("cardano.node").returns(undefined),
        },
      } as unknown as vscode.ExtensionContext;

      const result = await getNetworkConfigs(mockContext);
      expect(result).to.deep.equal([]);
    });

    test("should return first network config if available", () => {
      const mockConfigs = [
        { network: "preprod", apiKey: "mock-api-key-123" },
        { network: "mainnet", apiKey: "mock-api-key-456" },
      ];

      const mockContext = {
        globalState: {
          get: sinon.stub().withArgs("cardano.node").returns(mockConfigs),
        },
      } as unknown as vscode.ExtensionContext;

      const result = getFirstNetworkConfig(mockContext);
      expect(result).to.deep.equal(mockConfigs[0]);
    });

    test("should return null if no configs are stored", () => {
      const mockContext = {
        globalState: {
          get: sinon.stub().withArgs("cardano.node").returns(undefined),
        },
      } as unknown as vscode.ExtensionContext;

      const result = getFirstNetworkConfig(mockContext);
      expect(result).to.be.null;
    });

    test("should store new config when none exists", async () => {
      const updateStub = sinon.stub().resolves();
      const mockContext = {
        globalState: {
          get: sinon.stub().withArgs("cardano.node").returns(undefined),
          update: updateStub,
        },
      } as unknown as vscode.ExtensionContext;

      await storeNetworkConfig("preprod", "api-key-123", mockContext);
      expect(updateStub.calledOnce).to.be.true;
      expect(updateStub.firstCall.args[1]).to.deep.equal([
        { network: "preprod", apiKey: "api-key-123" },
      ]);
    });

    test("should replace config for same network", async () => {
      const existingConfigs = [
        { network: "preprod", apiKey: "old-key" },
        { network: "mainnet", apiKey: "main-key" },
      ];
      const updateStub = sinon.stub().resolves();
      const mockContext = {
        globalState: {
          get: sinon.stub().withArgs("cardano.node").returns(existingConfigs),
          update: updateStub,
        },
      } as unknown as vscode.ExtensionContext;

      await storeNetworkConfig("preprod", "new-key", mockContext);
      expect(updateStub.calledOnce).to.be.true;
      expect(updateStub.firstCall.args[1]).to.deep.equal([
        { network: "preprod", apiKey: "new-key" },
        { network: "mainnet", apiKey: "main-key" },
      ]);
    });

    test("should keep only the last three configs", async () => {
      const existingConfigs = [
        { network: "mainnet", apiKey: "main-key" },
        { network: "preview", apiKey: "preview-key" },
        { network: "devnet", apiKey: "dev-key" },
      ];
      const updateStub = sinon.stub().resolves();
      const mockContext = {
        globalState: {
          get: sinon.stub().withArgs("cardano.node").returns(existingConfigs),
          update: updateStub,
        },
      } as unknown as vscode.ExtensionContext;

      await storeNetworkConfig("preprod", "pre-key", mockContext);
      expect(updateStub.calledOnce).to.be.true;
      expect(updateStub.firstCall.args[1]).to.deep.equal([
        { network: "preprod", apiKey: "pre-key" },
        { network: "mainnet", apiKey: "main-key" },
        { network: "preview", apiKey: "preview-key" },
      ]);
    });
  });
});