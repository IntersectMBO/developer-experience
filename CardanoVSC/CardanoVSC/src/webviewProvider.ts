
import * as vscode from "vscode";
import { integrateCardanoAPI } from "./config/cardanoApiIntegration";
import { OpenWalletManagementWebview } from "./webview_ui/wallet_webview";
import { integrateCardanoNodeAPI } from "./config/cardanoNodeIntegration";
import { selectFile } from "./implementation/deployment";

export class MyWebviewViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "cardanovsc.webview";

  constructor(
    private context: vscode.ExtensionContext,
    private readonly _extensionUri: vscode.Uri
  ) {}

  public async resolveWebviewView(
    webviewView: vscode.WebviewView,
    context1: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ): Promise<void> {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    // Listen for messages from the webview
    webviewView.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case "apiIntegration":
          const valid = await integrateCardanoAPI(vscode, this.context);
          break;
        case "nodeIntegration":
         const valid_connection= await integrateCardanoNodeAPI(this.context);
         if(valid_connection){
          if (OpenWalletManagementWebview.panel) {
            new OpenWalletManagementWebview(this.context, this._extensionUri).initialize();

          }
        }
          break;
        case "openCardanoScan":
          vscode.env.openExternal(vscode.Uri.parse("https://cardanoscan.io/"));
          break;
        case "walletManagement":
          new OpenWalletManagementWebview(this.context, this._extensionUri);
          break;
        case "deployment":
          await selectFile(this.context,this._extensionUri);
          break;
        default:
          vscode.window.showErrorMessage(`Unknown command: ${message.command}`);
      }
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview): string {
    return /*HTML*/ `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cardano Webview</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          button {
            margin: 10px 0;
            padding: 10px;
            font-size: 16px;
            color: #fff;
            background-color: #385FFF;
            border: none;
            border-radius: 8px;
            width: 80%;
            max-width: 250px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          button:hover {
            background-color: #005b99;
          }
          @media (max-width: 600px) {
            button {
              width: 90%;
            }
          }
        </style>
      </head>
      <body>
        <button id="apiIntegrationButton">Cardano API Integration</button>
        <button id="openCardanoScan">Go to CardanoScan Website</button>
        <button id="nodeIntegrationButton">Cardano Node Connection</button>
        <button id="walletManagementButton">Wallet Management</button>
        <button id="deploySmartContract">Deploy Smart Contract</button>

        <script>
          const vscode = acquireVsCodeApi();
          document.getElementById('apiIntegrationButton').addEventListener('click', () => {
            vscode.postMessage({ command: 'apiIntegration' });
          });
          document.getElementById('openCardanoScan').addEventListener('click', () => {
            vscode.postMessage({ command: 'openCardanoScan' });
          });
          document.getElementById('walletManagementButton').addEventListener('click', () => {
            vscode.postMessage({ command: 'walletManagement' });
          });
          document.getElementById('nodeIntegrationButton').addEventListener('click', () => {
            vscode.postMessage({ command: 'nodeIntegration' });
          });
          document.getElementById('deploySmartContract').addEventListener('click',()=>{
            vscode.postMessage({command:'deployment'})
          })
        </script>
      </body>
      </html>`;
  }
}
