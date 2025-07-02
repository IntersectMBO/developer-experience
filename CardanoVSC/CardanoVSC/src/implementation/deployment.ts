import * as vscode from "vscode";
import * as fs from "fs/promises";
import * as path from "path";
import { getFirstNetworkConfig, getNetworkConfigs, integrateCardanoNodeAPI } from "../config/cardanoNodeIntegration";
import { initializeLucid } from "./implementation";
import { OpenWalletManagementWebview } from "../webview_ui/wallet_webview";

export async function selectFile(context: vscode.ExtensionContext,_extensionUri:vscode.Uri) {
  try {
    // 1️⃣ Check network availability
    const networks = await getNetworkConfigs(context);
    if (!networks || networks.length === 0) {
      const action = await vscode.window.showErrorMessage(
        "No Cardano network configured. Would you like to configure one now?",
        "Configure Network", "Cancel"
      );
      
      if (action === "Configure Network") {
       const check= await integrateCardanoNodeAPI(context);
        if(check){
                 if (OpenWalletManagementWebview.panel) {
                   new OpenWalletManagementWebview(context, _extensionUri).initialize();
       
                 }
               }
      }
      return;
    }
    
    // 2️⃣ Select and parse Plutus file
    const { scriptJson, scriptPath } = await selectPlutusFile();
    if (!scriptJson || !scriptPath) {return;}

    // 3️⃣ Initialize Lucid with network config
    const firstConfig = getFirstNetworkConfig(context);
    if (!firstConfig) {throw new Error("Failed to get network configuration.");}

    const lucid = await initializeLucid(firstConfig.network, firstConfig.apiKey);
    if (!lucid) {throw new Error("Failed to initialize Lucid.");}

    // 4️⃣ Generate address
    const scriptAddress = generateScriptAddress(lucid, scriptJson.cborHex);
    const addrFilePath = getAddrFilePath(scriptPath);

    // 5️⃣ Check if file exists and confirm overwrite
    if (await fileExists(addrFilePath)) {
      const overwrite = await vscode.window.showWarningMessage(
        `Address file "${path.basename(addrFilePath)}" already exists. Overwrite?`,
        { modal: true },
        "Overwrite", "Cancel"
      );
      
      if (overwrite !== "Overwrite") {
        vscode.window.showInformationMessage("Operation cancelled.");
        return;
      }
    }

    // 6️⃣ Save address file
    await saveAddressFile(addrFilePath, scriptAddress);
 // Show additional detailed information
const fullPath = path.resolve(addrFilePath);
const addressPreview = scriptAddress.length > 30 
    ? `${scriptAddress.substring(0, 15)}...${scriptAddress.slice(-15)}`
    : scriptAddress;

    vscode.window.showInformationMessage(
      `✅ Script address generated successfully.................................
        📁 Location: ${fullPath}          
        `,
      "Open Folder",
      "Copy Address"
    ).then((selection) => {
      if (selection === "Open Folder") {
        vscode.commands.executeCommand("revealFileInOS", vscode.Uri.file(fullPath));
      } else if (selection === "Copy Address") {
        vscode.env.clipboard.writeText(scriptAddress);
        vscode.window.showInformationMessage("Address copied successfully");
      }
    });
    

  } catch (error: any) {
    vscode.window.showErrorMessage(`❌ Error: ${error.message}`);
  }
}

// 🛠️ Helper function to check file existence
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// 🗺️ Get .addr file path
function getAddrFilePath(plutusPath: string): string {
  return plutusPath.replace(/\.plutus$/i, '.addr');
}

// 💾 Save address to file
async function saveAddressFile(filePath: string, address: string) {
  try {
    await fs.writeFile(filePath, address);
  } catch (error) {
    throw new Error(`Failed to save address file: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// 📜 Select and parse Plutus file
export async function selectPlutusFile(): Promise<{ scriptJson: any | null, scriptPath: string | null }> {
  const scriptUri = await vscode.window.showOpenDialog({
    canSelectMany: false,
    openLabel: "Select Plutus Script",
    filters: { "Plutus Files": ["plutus"] },
  });

  if (!scriptUri?.length) {
    vscode.window.showWarningMessage("No script selected.");
    return { scriptJson: null, scriptPath: null };
  }

  const scriptPath = scriptUri[0].fsPath;
  try {
    const scriptContent = await fs.readFile(scriptPath, "utf8");
    const scriptJson = JSON.parse(scriptContent);

    if (!scriptJson.cborHex) {
      throw new Error("Invalid Plutus script: The file must contain a 'cborHex' field");
    }
    if (typeof scriptJson.cborHex !== 'string') {
      throw new Error("Invalid Plutus script: 'cborHex' must be a string");
    }
    return { scriptJson, scriptPath };
  } catch (error:any) {
    let errorMessage = "Failed to process Plutus script file";
    
    if (error instanceof SyntaxError) {
      errorMessage = "Invalid JSON format in Plutus script file";
    } else if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    } else {
      errorMessage += `: ${String(error)}`;
    }
    
    throw new Error(errorMessage);
  }
}

// 🔑 Generate script address
export function generateScriptAddress(lucid: any, cborHex: string): string {
  if (!cborHex || typeof cborHex !== 'string') {
    throw new Error("Invalid CBOR hex format");
  }
  return lucid.utils.validatorToAddress({ 
    type: "PlutusV2", 
    script: cborHex 
  });
}