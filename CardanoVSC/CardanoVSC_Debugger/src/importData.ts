import * as vscode from "vscode";

export interface NetworkConfig {
  network: string;
  apiKey: string;
  [key: string]: any;
}

export const import_data = async (
  context: vscode.ExtensionContext
): Promise<NetworkConfig | undefined> => {
  try {
    const ext = vscode.extensions.getExtension(
      "AIQUANT-TECHNOLOGIES.cardanovsc"
    );

    if (!ext) {
      vscode.window.showErrorMessage("Cardanovsc extension not found.");
      return;
    }

    const api = ext.isActive ? ext.exports : await ext.activate();

    if (!api) {
      vscode.window.showErrorMessage("Cardanovsc extension not ready.");
      return;
    }

    const config: NetworkConfig = await api.getFirstNetworkConfig();
    return config;
  } catch (error: any) {
    console.error("Error retrieving config:", error);
    vscode.window.showErrorMessage(
      `Failed to retrieve Cardano config: ${error.message || error}`
    );
    return;
  }
};
