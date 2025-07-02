import * as vscode from "vscode";

export async function initializeLucid(
  selectedNetwork: string,
  apiKey: string
): Promise<any | null> {
  const networkUrls: { [key: string]: string } = {
    Mainnet: "https://cardano-mainnet.blockfrost.io/api/v0",
    Preprod: "https://cardano-preprod.blockfrost.io/api/v0",
    Preview: "https://cardano-preview.blockfrost.io/api/v0",
  };

  const baseUrl = networkUrls[selectedNetwork];
  if (!baseUrl) {
    vscode.window.showErrorMessage(`Invalid network: ${selectedNetwork}`);
    return null;
  }

  try {
    // Dynamically import Lucid and Blockfrost
    const { Blockfrost, Lucid } = await import("lucid-cardano");

    let lucid: any;
    if (selectedNetwork === "Mainnet") {
      lucid = await Lucid.new(new Blockfrost(baseUrl, apiKey), "Mainnet");
    } else if (selectedNetwork === "Preprod") {
      lucid = await Lucid.new(new Blockfrost(baseUrl, apiKey), "Preprod");
    } else if (selectedNetwork === "Preview") {
      lucid = await Lucid.new(new Blockfrost(baseUrl, apiKey), "Preview");
    } else {
      vscode.window.showErrorMessage("Network selection is invalid.");

      return null;
    }

    return lucid;
  } catch (error: any) {
    vscode.window.showErrorMessage(
      "Error initializing Lucid with the selected network."
    );

    return null;
  } finally {
    // Ensure the status bar item is shown even if there's an error
  }
}

import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";
export async function restoreWallet(
  seedPhrase: string,
  selectedNetwork: string,
  apiKey: string
): Promise<boolean> {
  try {
    // Validate seed phrase
    const seedArray = seedPhrase.trim().split(/\s+/);
    if (seedArray.length < 24) {
      vscode.window.showErrorMessage("Please enter all 24 seed words");
      return false;
    }

    // Validate workspace
    if (!vscode.workspace.workspaceFolders?.length) {
      vscode.window.showErrorMessage(
        "Please open a workspace folder before restoring a wallet"
      );
      return false;
    }

    // Initialize Lucid
    const lucid = await initializeLucid(selectedNetwork, apiKey);
    // Get password
    const password = await vscode.window.showInputBox({
      prompt: "Enter a password to encrypt your wallet",
      password: true,
      ignoreFocusOut: true,
      validateInput: (value) => (value ? undefined : "Password is required"),
    });

    if (!password) {
      vscode.window.showErrorMessage(
        "Wallet restoration canceled. Password is required."
      );
      return false;
    }

    // Process wallet
    const mnemonic = seedArray.join(" ");
    const encryptedMnemonic = encryptMnemonic(mnemonic, password);
    lucid.selectWalletFromSeed(mnemonic);
    const address = await lucid.wallet.address();

    // Prepare file paths
    const workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const walletFolder = path.join(
      workspacePath,
      "wallet_details",
      selectedNetwork
    );

    // Create directories if they don't exist
    fs.mkdirSync(walletFolder, { recursive: true });

    // Save wallet file
    const sanitizedAddress = address.replace(/[^a-zA-Z0-9]/g, "_");
    const walletFile = path.join(walletFolder, `${sanitizedAddress}.json`);

    const walletData = {
      address,
      network: selectedNetwork,
      encryptedSeed: encryptedMnemonic,
      createdAt: new Date().toISOString(),
    };

    fs.writeFileSync(walletFile, JSON.stringify(walletData, null, 2));

    vscode.window
      .showInformationMessage(
        `✅ Wallet restore successfully! on ${walletData.network}
                        -------------------------
                       Saved to: wallet_details/${selectedNetwork}/${sanitizedAddress}.json`,
        "Copy Address"
      )
      .then((selection) => {
        if (selection === "Copy Address") {
          vscode.env.clipboard.writeText(walletData.address);
          vscode.window.showInformationMessage(
            "✅ Wallet address copied successfully!"
          );
        }
      });

    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    vscode.window.showErrorMessage(`Failed to restore wallet: ${message}`);
    return false;
  }
}
export async function createWallet(
  selectedNetwork: string,
  apiKey: string
): Promise<{
  success: boolean;
  message?: string;
  data?: {
    address: string;
    network: string;
    filePath: string;
    mnemonic: string; // Only included if needed for immediate use
  };
  error?: string;
}> {
  try {
    // Ensure workspace exists
    if (!vscode.workspace.workspaceFolders?.length) {
      return {
        success: false,
        error:
          "No workspace folder is open. Please open a workspace before creating a wallet.",
      };
    }

    const lucid = await initializeLucid(selectedNetwork, apiKey);
    
    const mnemonic = lucid.utils.generateSeedPhrase();

    const password = await vscode.window.showInputBox({
      prompt: "Enter a password for your wallet privacy",
      password: true,
      ignoreFocusOut: true,
      validateInput: (value) => (value ? undefined : "Password is required."),
    });

    if (!password) {
      return {
        success: false,
        error: "Wallet creation canceled. Password is required.",
      };
    }

    // Encrypt the mnemonic
    const encryptedMnemonic = encryptMnemonic(mnemonic, password);

    // Select the wallet from the generated mnemonic
    lucid.selectWalletFromSeed(mnemonic);
    const address = await lucid.wallet.address();

    // Define folder paths
    const workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const walletBaseFolderPath = path.join(workspacePath, "wallet_details");
    const walletNetworkFolderPath = path.join(
      walletBaseFolderPath,
      selectedNetwork
    );

    // Ensure directories exist
    fs.mkdirSync(walletBaseFolderPath, { recursive: true });
    fs.mkdirSync(walletNetworkFolderPath, { recursive: true });

    // Sanitize the address for filename
    const sanitizedAddress = address.replace(/[^a-zA-Z0-9]/g, "_");
    const walletFilePath = path.join(
      walletNetworkFolderPath,
      `${sanitizedAddress}.json`
    );

    // Prepare wallet data in JSON format
    const walletData = {
      address,
      network: selectedNetwork,
      encryptedSeed: encryptedMnemonic,
      createdAt: new Date().toISOString(),
    };

    fs.writeFileSync(walletFilePath, JSON.stringify(walletData, null, 2), {
      encoding: "utf-8",
    });

    return {
      success: true,
      message: `Wallet created successfully on ${selectedNetwork}`,
      data: {
        address,
        network: selectedNetwork,
        filePath: `wallet_details/${selectedNetwork}/${sanitizedAddress}.json`,
        mnemonic, // Only include if needed for immediate use (consider security implications)
      },
    };
  } catch (error: any) {
    console.error("Wallet creation error:", error);
    return {
      success: false,
      error: error.message || "Failed to create wallet",
    };
  }
}
export function encryptMnemonic(mnemonic: string, password: string): string {
  const salt = crypto.randomBytes(16);
  const key = crypto.scryptSync(password, salt, 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(mnemonic, "utf8", "hex");
  encrypted += cipher.final("hex");

  return `${salt.toString("hex")}:${iv.toString("hex")}:${encrypted}`;
}
export async function checkBalance(
  selectedNetwork: string,
  apiKey: string,
  addr: string
): Promise<{ balance: number; balanceInLovelace: bigint }> {
  const lucid = await initializeLucid(selectedNetwork, apiKey);
  const utxos = await lucid.utxosAt(addr);

  const balanceInLovelace = utxos.reduce(
    (acc: bigint, utxo: { assets: { lovelace: any } }) =>
      acc + BigInt(utxo.assets.lovelace || 0n),
    0n
  );
  const balance = Number(balanceInLovelace) / 1_000_000;
  return {
    balance,
    balanceInLovelace,
  };
}
