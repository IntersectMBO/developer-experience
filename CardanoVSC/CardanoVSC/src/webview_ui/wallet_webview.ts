import * as vscode from "vscode";
import {
  getFirstNetworkConfig,
  setNetwork,
} from "../config/cardanoNodeIntegration";
import {
  checkBalance,
  createWallet,
  restoreWallet
} from "../implementation/implementation";

export class OpenWalletManagementWebview {
  public static panel: vscode.WebviewPanel | undefined;

  constructor(
    private context: vscode.ExtensionContext,
    private readonly _extensionUri: vscode.Uri
  ) {
    if (OpenWalletManagementWebview.panel) {
      // If the panel is already open, reveal it
      OpenWalletManagementWebview.panel.reveal(vscode.ViewColumn.One,true);
      return;
    }
    OpenWalletManagementWebview.panel = vscode.window.createWebviewPanel(
      "cardanovsc.walletManagement",
      "Wallet Management",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [this._extensionUri],
      }
    );

    this.initialize();
    OpenWalletManagementWebview.panel.onDidDispose(() => {
      OpenWalletManagementWebview.panel = undefined;
    });
  }

  public async initialize() {
    if (!OpenWalletManagementWebview.panel) {return;}

    OpenWalletManagementWebview.panel.webview.html = await this._getWalletManagementHtml();

    OpenWalletManagementWebview.panel.webview.onDidReceiveMessage(
      async (message: {
        walletName?: string;
        command: string;
        network?: string;
        seedPhrase?: string;
        senderAddress?: string;
        recipientAddress?: string;
        amount?: number;
        password?: string;
      }) => {
        try {
          let firstConfig;
          let seed;

          switch (message.command) {
            case "connectNetwork":
              if (message.network) {
                await setNetwork(
                  message.network,
                  this.context,
                  this._extensionUri
                );
              }
              break;

            case "createWallet":
              firstConfig = getFirstNetworkConfig(this.context);

              if (!firstConfig) {
                vscode.window.showErrorMessage(
                  "No network configuration found. Please configure your network first."
                );
                break;
              }

              const creationResult = await createWallet(
                firstConfig.network,
                firstConfig.apiKey
              );

              if (creationResult.success && creationResult.data) {
                const walletData = {
                  address: creationResult.data.address,
                  network: creationResult.data.network,
                  filePath: creationResult.data.filePath,
                  seed:creationResult.data.mnemonic
                };

                await this.context.secrets.store(
                  "walletData",
                  JSON.stringify(walletData)
                );

                if (creationResult.data.mnemonic) {
                  if (OpenWalletManagementWebview.panel){
                  OpenWalletManagementWebview.panel.webview.html = this._getSeedPhraseHtml(
                    creationResult.data.mnemonic
                  );}
                  vscode.window.showInformationMessage(
                    `✅ Wallet created successfully!
                    ----------------------------------------------
                    Saved to: ${walletData.filePath}`,
                      "Copy Address", "Copy SeedPhrase"
                  ).then((selection) => {
                   if(selection === "Copy Address") {
                      vscode.env.clipboard.writeText(walletData.address);
                      vscode.window.showInformationMessage("✅ Wallet address copied successfully!");
                    }
                    if(selection === "Copy SeedPhrase") {
                      vscode.env.clipboard.writeText(walletData.seed);
                      vscode.window.showInformationMessage("✅ Wallet seedPhrase copied successfully!");
                    }
                  });
                }
              } else {
                vscode.window.showErrorMessage(
                  `Wallet creation failed: ${
                    creationResult.error || "Unknown error"
                  }`
                );
              }
              break;

            case "checkBalance":
              firstConfig = getFirstNetworkConfig(this.context);

              if (!firstConfig) {
                vscode.window.showErrorMessage(
                  "No network configuration found. Please configure your network first."
                );
                break;
              }
               const addr = await vscode.window.showInputBox({
                  prompt: "Enter the address",
                  ignoreFocusOut: true,
                });
              
                if (!addr) {
                  vscode.window.showErrorMessage("address is required.");
                  return;
                }
            const data=  await checkBalance(firstConfig.network, firstConfig.apiKey,addr);
            if(data){
              vscode.window.showInformationMessage(
                `Available balance: ${data.balance.toFixed(6)} ADA`
              );
            }else{
              vscode.window.showErrorMessage(
                `error in fetching balance..`
              );
            }
              break;

            case "restoreWallet":
              firstConfig = getFirstNetworkConfig(this.context);

              if (!firstConfig) {
                vscode.window.showErrorMessage(
                  "No network configuration found. Please configure your network first."
                );
                break;
              }

              if (!message.seedPhrase) {
                vscode.window.showErrorMessage("No seed phrase provided.");
                break;
              } else {
                await this.context.secrets.store("seed", message.seedPhrase);
              }

              try {
                const success = await restoreWallet(
                  message.seedPhrase,
                  firstConfig.network,
                  firstConfig.apiKey
                );

                if (success) {
                  // Only show seed if restoration was successful
                  await this.context.secrets.store("seed", message.seedPhrase);
                  // go home
                  if (OpenWalletManagementWebview.panel){

                  OpenWalletManagementWebview.panel.webview.html =
                    await this._getWalletManagementHtml();
                  }
                } else {
                  vscode.window.showErrorMessage("Failed to restore wallet.");
                }
              } catch (error) {
                vscode.window.showErrorMessage(
                  `Error restoring wallet: ${
                    error instanceof Error ? error.message : String(error)
                  }`
                );
              }
              break;
            case "home":
              if (OpenWalletManagementWebview.panel){
              OpenWalletManagementWebview.panel.webview.html = await this._getWalletManagementHtml();
              }
              break;

            case "getSeedphrase":
              // Validate workspace
                  if (!vscode.workspace.workspaceFolders?.length) {
                    vscode.window.showErrorMessage(
                     " Wallet restore failed: No workspace folder is open. Please open a workspace before restoring a wallet."
                    );
                    return false;
                  }

              firstConfig = getFirstNetworkConfig(this.context);

              if (!firstConfig) {
                vscode.window.showErrorMessage(
                  "No network configuration found. Please configure your network first."
                );
                break;
              }
              if (OpenWalletManagementWebview.panel){;

              OpenWalletManagementWebview.panel.webview.html = this._getRestoreWalletHtml(
                firstConfig.network
              );
            }
              break;

            default:
              vscode.window.showErrorMessage(
                `Unknown command: ${message.command}`
              );
          }
        } catch (error) {
          vscode.window.showErrorMessage(
            `Error processing command: ${
              error instanceof Error ? error.message : String(error)
            }`
          );
        }
      }
    );
  }

  private sanitizeNetworkName(network: string): string {
    return network.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  private async _getWalletManagementHtml(): Promise<string> {
    let previousNetworks =
      this.context.globalState.get<{ network: string; apiKey: string }[]>(
        "cardano.node"
      ) || [];

    const networkOptions =
      previousNetworks.length > 0
        ? previousNetworks
            .map(
              (p) =>
                `<button id="connect${this.sanitizeNetworkName(
                  p.network
                )}">${this.sanitizeNetworkName(p.network)}</button>`
            )
            .join("")
        : "<p>No networks available</p>";

    return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Wallet Management</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #003366;
          color: #fff;
          text-align: center;
          padding: 20px;
          margin: 0;
        }
        h2 {
          font-size: 24px;
          font-weight: bold;
        }
        .dropdown {
          position: relative;
          display: inline-block;
          margin-top: 20px;
        }
        .dropdown button {
          padding: 12px;
          font-size: 16px;
          background-color: #385FFF;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          width: 220px;
        }
        .container{
        margin-top:6%;
          display: flex;
          gap:20px;
          flex-direction: column;
          align-items:center;
        }
        .container button {
          padding: 12px;
          font-size: 16px;
          background-color: #385FFF;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          width: 220px;
        }
        
        .dropdown-content {
          display: none;
          position: absolute;
          left: 0;
          top: 100%;
          box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          background-color: #385FFF;
          width: 220px;
          z-index: 1;
        }
        .dropdown:hover .dropdown-content {
          display: block;
        }
        .dropdown-content button {
          background-color: #385FFF;
          color: #fff;
          padding: 12px;
          width: 100%;
          border: none;
          cursor: pointer;
          text-align: left;
        }

    button:hover {
    background-color: #005fa3; /* Darker Blue */
    transform: scale(1.05); /* Slight zoom effect */
      }

        .dropdown-content button:hover {
          background-color: #2c4bcc;
        }
      </style>
    </head>
    <body>
      <h2>Wallet Management</h2>
      <div class="dropdown">
        <button>Select Network ▼</button>
        <div class="dropdown-content">
          ${networkOptions}
        </div>
      </div>

      <div class="container">
        <button id="createWalletButton">Create Wallet</button>
        <button id="restoreWalletButton">Restore Wallet</button>
        <button id="checkBalance">Check Balance</button>
      </div>

      <script>
        const vscode = acquireVsCodeApi();

        ${previousNetworks
          .map(
            (p) => `
          document.getElementById('connect${p.network}').addEventListener('click', () => {
            vscode.postMessage({ command: 'connectNetwork', network: '${p.network}' });
          });
        `
          )
          .join("")}

        document.getElementById('createWalletButton').addEventListener('click', () => {
          vscode.postMessage({ command: 'createWallet' });
        });

        document.getElementById('restoreWalletButton').addEventListener('click', () => {
          vscode.postMessage({ command: 'getSeedphrase' });
        });
        
        document.getElementById('checkBalance').addEventListener('click', () => {
          vscode.postMessage({ command: 'checkBalance' });
        });
      </script>
    </body>
    </html>
  `;
  }

  private _getSeedPhraseHtml(seed: string): string {
    const seedArray = seed.split(" ");

    return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Wallet Seed Phrase</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          background-color: #003366; 
          color: #fff; 
          text-align: center; 
          padding: 20px; 
        }
        .seed-grid { 
          display: grid; 
          grid-template-columns: repeat(4, 1fr); 
          gap: 10px; 
          margin: 20px auto;
          max-width: 600px;
        }
        .seed-item { 
          padding: 10px; 
          background-color: #385FFF; 
          border-radius: 8px; 
          text-align: center; 
        }
        #submitButton { 
          margin-top: 20px; 
          padding: 12px 24px; 
          font-size: 16px; 
          background-color: #385FFF; 
          color: #fff; 
          border: none; 
          border-radius: 8px; 
          cursor: pointer; 
        }
        #submitButton:hover {
  background-color: #0056b3; /* Darker Blue */
  transform: scale(1.05);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
        .warning {
          color: #ffcc00;
          margin: 20px 0;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <h2>Your Wallet Seed Phrase</h2>
      <p class="warning">Please write down this seed phrase and store it in a secure location.</p>
      <p class="warning">Never share your seed phrase with anyone!</p>
      
      <div class="seed-grid">
        ${seedArray
          .map(
            (word, index) =>
              `<div class="seed-item">${index + 1}. ${word}</div>`
          )
          .join("")}
      </div>
      
      <button id="submitButton">I've Saved My Seed Phrase</button>

      <script>
        const vscode = acquireVsCodeApi();
        document.getElementById('submitButton').addEventListener('click', () => {
          vscode.postMessage({ command: 'home' });
        });
      </script>
    </body>
    </html>
  `;
  }
  private _getRestoreWalletHtml(selectedNetwork: string): string {
    return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Restore Wallet</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          background-color: #003366; 
          color: #ffffff; 
          padding: 20px; 
        }
        .grid { 
          display: grid; 
          grid-template-columns: repeat(3, 1fr); 
          gap: 10px; 
          max-width: 800px;
          margin: 20px auto;
        }
        .input-box { 
          padding: 10px; 
          border: 1px solidrgb(35, 36, 37); 
          border-radius: 5px; 
          background:rgb(26, 27, 27); 
          color: #fff; 
        }
        .button { 
          margin-top: 20px; 
          padding: 12px 24px; 
          font-size: 16px; 
          background-color: #385FFF; 
          color: #fff; 
          border: none; 
          border-radius: 8px; 
          cursor: pointer; 
        }
        .button:hover {
         background-color: #0056b3;
          transform: scale(1.05);
          box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.3);
        }
        .network-label { 
          margin-top: 20px; 
          font-weight: bold; 
          color: #ffffff;
        }
        .button.back { 
          background-color: #555; 
          margin-right: 10px; 
        }
        .button:disabled { 
          background-color: #555; 
          cursor: not-allowed; 
        }
        .instructions {
          margin-bottom: 20px;
          color: #cccccc;
        }
        .button-container {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        .button.paste {
          background-color: #385FFF;
          margin-top: 0;
        }
      </style>
    </head>
    <body>
      <h2>Restore Wallet</h2>
      <p class="instructions">Enter your 24-word seed phrase in order:</p>
      <div class="button-container">
        <button id="pasteButton" class="button paste">Paste Seed Phrase</button>
      </div>
      <div class="grid">
        ${Array.from(
          { length: 24 },
          (_, i) =>
            `<input type="text" class="input-box" id="word${
              i + 1
            }" placeholder="Word ${i + 1}" />`
        ).join("")}
      </div>
      <div>
        <button id="backButton" class="button back">Back</button>
        <button id="restoreButton" class="button" disabled>Restore Wallet</button>
      </div>
      <script>
        const vscode = acquireVsCodeApi();
        
        document.querySelectorAll('input').forEach(input => {
          input.addEventListener('input', () => {
            document.getElementById('restoreButton').disabled = 
              !Array.from(document.querySelectorAll('input'))
                .every(input => input.value.trim() !== '');
          });
        });

        document.getElementById('restoreButton').addEventListener('click', () => {
          const seedPhrase = Array.from({ length: 24 }, 
            (_, i) => document.getElementById('word' + (i + 1)).value.trim())
            .join(' ');

          if (seedPhrase.split(' ').length !== 24) {
            alert('Please enter all 24 words of your seed phrase.');
            return;
          }

          vscode.postMessage({ 
            command: 'restoreWallet', 
            seedPhrase: seedPhrase 
          });
        });
        
        document.getElementById('backButton').addEventListener('click', () => {
          vscode.postMessage({ command: 'home' });
        });

        document.getElementById('pasteButton').addEventListener('click', async () => {
          try {
            const clipboardText = await navigator.clipboard.readText();
            const words = clipboardText.trim().split(/\\s+/);
            
            if (words.length !== 24) {
              alert('Clipboard does not contain exactly 24 words. Found ' + words.length + ' words.');
              return;
            }
            
            for (let i = 0; i < 24; i++) {
              const input = document.getElementById('word' + (i + 1));
              if (input) {
                input.value = words[i] || '';
              }
            }
            
            // Enable restore button if all fields are filled
            document.getElementById('restoreButton').disabled = 
              !Array.from(document.querySelectorAll('input'))
                .every(input => input.value.trim() !== '');
          } catch (error) {
            alert('Failed to read from clipboard. Please paste manually.');
            console.error('Clipboard read error:', error);
          }
        });
      </script>
    </body>
    </html>
  `;
  }
}
