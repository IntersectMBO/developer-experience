import axios from "axios";
import * as vscode from "vscode";
import { import_data, NetworkConfig } from "../importData";

export function getLoadingHtml(address: string): string {
  return wrapHtml(`
    <div style="display: flex; align-items: center; gap: 12px;">
      <div class="spinner"></div>
      <p>🔍 Fetching UTXOs for <code>${address}</code>...</p>
    </div>
  `);
}

export function wrapHtml(innerHtml: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 16px;
          color: #333;
          background: #f9f9f9;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        code {
          background: #eaeaea;
          padding: 2px 4px;
          border-radius: 4px;
        }
        code.highlight {
          background-color: black;
          color: white;
        }
        pre {
          background: #eee;
          padding: 10px;
          overflow-x: auto;
          border-left: 4px solid #007acc;
        }
        h2, h3 {
          color: #007acc;
        }
        main {
          flex: 1;
        }
        footer {
          text-align: center;
          padding: 12px;
          color: white;
          background: linear-gradient(90deg, #0066cc, #3399ff);
          font-size: 0.9em;
          border-top: 1px solid #ccc;
        }
        .spinner {
          width: 24px;
          height: 24px;
          border: 3px solid #ccc;
          border-top: 3px solid #007acc;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
    </head>
    <body>
      <main>${innerHtml}</main>
      <footer>CardanoVSC Debugger, AIQUANT TECHNOLOGIES</footer>
    </body>
    </html>
  `;
}

export function buildUtxoHtml(utxo: any, datumHtml: string): string {
  const amounts = utxo.amount
    .map((a: any) => `${a.quantity} ${a.unit}`)
    .join("<br/>");

  return wrapHtml(`
    <h2>📦 Latest UTXO</h2>
    <p><strong>Tx Hash:</strong> <code class="highlight">${utxo.tx_hash}</code></p>
    <p><strong>Tx Index:</strong> ${utxo.output_index}</p>
    <p><strong>Amount:</strong><br/> ${amounts}</p>
    ${datumHtml}
  `);
}

export const config_disposal = (context: vscode.ExtensionContext) => {
  const d1 = vscode.commands.registerCommand(
    "cardanovscDebugger.getUtxoDetails",
    async () => {
      const config: NetworkConfig | undefined = await import_data(context);
      if (!config) {
        vscode.window.showErrorMessage(
          "No network config found. Please configure it in the cardanovsc extension."
        );
        return;
      }

      const inputAddress = await vscode.window.showInputBox({
        prompt: "Enter the Cardano script address",
        placeHolder: "addr1...",
        ignoreFocusOut: true,
      });

      const scriptAddress = inputAddress?.trim();
      if (!scriptAddress) {
        vscode.window.showErrorMessage("Script address is required.");
        return;
      }

      const panel = vscode.window.createWebviewPanel(
        "cardanoUtxoInfo",
        "Script UTXO Info",
        vscode.ViewColumn.One,
        { enableScripts: true }
      );

      panel.webview.html = getLoadingHtml(scriptAddress);

      try {
        const utxoRes = await axios.get(
          `https://cardano-${config.network}.blockfrost.io/api/v0/addresses/${scriptAddress}/utxos`,
          { headers: { project_id: config.apiKey } }
        );

        const utxos = utxoRes.data;
        if (!utxos || utxos.length === 0) {
          panel.webview.html = wrapHtml(
            `<p>No UTXOs found at this address.</p>`
          );
          return;
        }

        const latestUtxo = utxos[utxos.length - 1];
        let datumHtml = "";

        if (latestUtxo.data_hash) {
          try {
            const datumRes = await axios.get(
              `https://cardano-${config.network}.blockfrost.io/api/v0/scripts/datum/${latestUtxo.data_hash}`,
              { headers: { project_id: config.apiKey } }
            );

            datumHtml = `
            <h3>Datum Hash</h3><code class="highlight">${
              latestUtxo.data_hash
            }</code>
            <h3>Datum Value</h3><pre>${JSON.stringify(
              datumRes.data,
              null,
              2
            )}</pre>
          `;
          } catch {
            datumHtml = `<p>❌ Failed to fetch datum for hash <code class="highlight">${latestUtxo.data_hash}</code></p>`;
          }
        } else if (latestUtxo.inline_datum) {
          datumHtml = `<h3>Inline Datum</h3><code>${latestUtxo.inline_datum}</code>`;
        }

        panel.webview.html = buildUtxoHtml(latestUtxo, datumHtml);
      } catch (err: any) {
        panel.webview.html = wrapHtml(
          `<p style="color:red;">❌ Error: ${err.message || err}</p>`
        );
      }
    }
  );

  context.subscriptions.push(d1);
};
