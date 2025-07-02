# ⚡ CardanoVSC 🚀

[![Version](https://vsmarketplacebadges.dev/version/AIQUANT-TECHNOLOGIES.cardanovsc.png)](https://marketplace.visualstudio.com/items?itemName=AIQUANT-TECHNOLOGIES.cardanovsc) [![Downloads](https://vsmarketplacebadges.dev/downloads/AIQUANT-TECHNOLOGIES.cardanovsc.png)](<(https://marketplace.visualstudio.com/items?itemName=AIQUANT-TECHNOLOGIES.cardanovsc)>) [![Installs](https://vsmarketplacebadges.dev/installs/AIQUANT-TECHNOLOGIES.cardanovsc.png)](https://marketplace.visualstudio.com/items?itemName=AIQUANT-TECHNOLOGIES.cardanovsc) [![Rating](https://vsmarketplacebadges.dev/rating-star/AIQUANT-TECHNOLOGIES.cardanovsc.svg)](https://marketplace.visualstudio.com/items?itemName=AIQUANT-TECHNOLOGIES.cardanovsc)

## ✨ Features

CardanoVSC is a powerful Visual Studio Code extension that provides seamless support for Haskell and Plutus development. It is designed to enhance developer productivity by offering:

- Advanced syntax highlighting for Haskell and Plutus code.
- Intelligent code completion to speed up development.
- Integration with the Cardano API for real-time blockchain interaction.
- An intuitive "Ctrl + Shift + P >> CardanoAPI" feature allowing developers to quickly access Cardano API options directly from the IDE.
- Cardano node Connection with **Blockfrost api** .
- Cardano wallet management
- Deployment of smart contract on cardano node

This extension is perfect for developers building on the Cardano blockchain, enabling smooth and efficient smart contract development within the Visual Studio Code ecosystem.

## 📥 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/AIQUANT-Tech/CardanoVSC.git
   cd CardanoVSC/cardanovsc/
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Debug the extension by clicking the VS Code debug icon.

## 🏗️ Development

### ✅ Running Tests

Before running the test command, ensure the required test file exists:

Create a folder `out/test/` if it does not exist and add the following file `sample.hs`:

```haskell
module Sample where

import Data.List

factorial :: Integer -> Integer
factorial 0 = 1
factorial n = n * factorial (n - 1)

main :: IO ()
main = print (factorial 5)
```

Create a .env file on working directory and put your API key from cardanoscan\
CARDANO_API_KEY=your_api_key_here

To run tests:

```sh
npm run test
```

## 🛠️ Usage

### cardanovsc extension's sidebar webview

The Webview in CardanoVSC provides a dedicated sidebar interface within Visual Studio Code, offering a centralized hub for blockchain api interactions , development tools.

![webview](https://raw.githubusercontent.com/AIQUANT-Tech/CardanoVSC/refs/heads/main/CardanoVSC/docs/cardanovsc01_sidebar_webview.png)

### 📜 Commands

CardanoVSC provides several commands to interact with the Cardano blockchain:

- `cardanovsc.get_latest_block_details` - Get details of the latest block.
- `cardanovsc.get_block_details` - Fetch details of a specific block.
- `cardanovsc.get_address_balance` - Retrieve balance for a given address.
- `cardanovsc.get_pool_details` - Fetch details about a stake pool.
- `cardanovsc.get_transaction_details` - Retrieve information about a transaction.

To access these commands, open the Command Palette (`Ctrl+Shift+P`), type `CardanoVSC`, and select the desired command.

![command0](https://raw.githubusercontent.com/AIQUANT-Tech/CardanoVSC/refs/heads/main/.github/images/cardanovsc_command.gif)

![command1](https://raw.githubusercontent.com/AIQUANT-Tech/CardanoVSC/refs/heads/main/CardanoVSC/docs/cardanovsc_command01.png)

## 🔗 API Integration

CardanoVSC integrates with Cardano APIs using cardanoscan API keys.
CardanoVSC integrates with the Cardano API to provide real-time blockchain interaction directly within the IDE. Developers can fetch blockchain data, such as block details, transaction information, and wallet balances, without leaving Visual Studio Code. The API integration is powered by Cardanoscan API keys, ensuring secure and efficient access to Cardano blockchain data.

![api](https://raw.githubusercontent.com/AIQUANT-Tech/CardanoVSC/refs/heads/main/CardanoVSC/docs/api_integration01.png)

## 🔗 Auto Completion

The Auto Completion feature in CardanoVSC enhances developer productivity by providing intelligent code suggestions as you type. It supports Haskell and Plutus syntax, offering context-aware recommendations for functions, variables, and modules. This feature reduces errors and speeds up coding by predicting and completing code snippets, making it easier to write complex smart contracts and blockchain-related logic.

![auto_completion0](https://raw.githubusercontent.com/AIQUANT-Tech/CardanoVSC/refs/heads/main/.github/images/auto_completion.gif)

![auto_completion1](https://raw.githubusercontent.com/AIQUANT-Tech/CardanoVSC/refs/heads/main/.github/images/auto_completion.png)

## 🔗 syntax highlighting

The Syntax Highlighting feature improves code readability by visually distinguishing different elements of Haskell and Plutus code. Keywords, functions, variables, and operators are color-coded, making it easier to identify and debug code. This feature is particularly useful for developers working on complex smart contracts, as it helps maintain clarity and structure in the codebase.

![highlight](https://raw.githubusercontent.com/AIQUANT-Tech/CardanoVSC/refs/heads/main/.github/images/syntax_highlight.png)

## 🔗 Cardano node Connection via BlockFrost

Before using wallet management and smart contract deployment, you need to connect to a Cardano node on the Mainnet, Preprod, or Preview network.

### Steps to Connect:

1. Open the **CardanoVSC** sidebar (click the Cardano icon in the Activity Bar).
2. Click **Cardano Node Connection**.
3. A prompt will appear to select the network (Mainnet, Preprod, or Preview).
4. Another prompt will appear asking for the BlockFrost API key for the selected network.
5. Enter the API key in the input box and press `Enter`.
6. The selected network will be reflected on the right side of the status bar, like this:  
   **🔗 Cardano Node: Preprod** (or **Mainnet/Preview**)

![node_connection](https://raw.githubusercontent.com/AIQUANT-Tech/CardanoVSC/refs/heads/main/CardanoVSC/docs/cardanovsc_node_connection.gif)

## 📜 Deploying a Smart Contract

### Steps to Deploy a Plutus Smart Contract:

1. **Ensure a Cardano network is configured:**

   - If no network is detected, the extension will prompt you to configure one.
   - Follow the on-screen instructions to set up the network.

2. **Select a Plutus Smart Contract file:**
   - Click on the **Deploy Smart Contract** option.
   - A file selection dialog will open.
   - Choose a `.plutus` file containing your contract.
   - example `.plutus` file content
   ````
     {
     "type": "PlutusScriptV2",
     "description": "",
     "cborHex": "49480100002221200101"
      } ```
   ````
3. **Initialize Lucid with network configuration:**

   - The extension will retrieve network details from your configuration.
   - Lucid (a JavaScript library for Cardano smart contract interactions) will be initialized.

4. **Generate the script address:**

   - The extension extracts the CBOR hex from the Plutus script.
   - It then computes the associated script address.

5. **Confirm overwriting existing address files:**

   - If an address file already exists, the extension prompts you for confirmation before overwriting.

6. **Save the generated address:**
   - The script address is saved to an `.addr` file in the same location as the `.plutus` script.
   - A success message is displayed with the file location and script address .

![deploy](https://raw.githubusercontent.com/AIQUANT-Tech/CardanoVSC/refs/heads/main/CardanoVSC/docs/cardanovsc_deployment.gif)

### 📌 Additional Features:

- **Open Folder:** View the location of the saved `.addr` file.
- **Copy Address:** Copy the generated script address to the clipboard for easy sharing.

## 🛠️ Troubleshooting

- **No network configured?** Follow the prompt to set up a network connection.
- **Invalid Plutus script?** Ensure the `.plutus` file contains a valid `cborHex` field.
- **Address file already exists?** Choose whether to overwrite the file or cancel the operation.
- **Errors during deployment?** Check the error messages and logs in the VSCode output panel.

### 🏦 Wallet Management

CardanoVSC allows you to manage your Cardano wallets directly within VS Code. You can create, restore, and check balances securely while ensuring encrypted storage and password protection.

![wallet_webview](https://raw.githubusercontent.com/AIQUANT-Tech/CardanoVSC/refs/heads/main/CardanoVSC/docs/cardanovsc_wellet_webview.png)

### 🆕 Creating a New Wallet

1. Open the **CardanoVSC** sidebar (click the Cardano icon in the Activity Bar).
2. Click **Wallet Management**
3. Select your network from the dropdown (Mainnet/Testnet) and also from the status bar `[cardano:network-name]` button, which displays the selected network.
4. Click **Create Wallet** and before creating wallet must open any folder otherwise not create wallet.
5. Set a strong password
6. Securely **store your 24-word recovery phrase** (displayed during setup).
7. Click **"I've Saved My Seed Phrase"** to complete the setup.
8. Wallet details are stored in the working directory inside the `wallet_details/` folder.

![create](https://raw.githubusercontent.com/AIQUANT-Tech/CardanoVSC/refs/heads/main/CardanoVSC/docs/cardanovsc_create_wallet.gif)

### 🔄 Restoring an Existing Wallet

1. Open **Wallet Management** from the sidebar.
2. Select your network from the dropdown (Mainnet/Testnet) and also from the status bar `[cardano:network-name]` button, which displays the selected network.
3. Click **Restore Wallet**.
4. Enter your **24-word seed phrase** using one of the following methods:
   - **Paste the entire phrase** (click "Paste Seed Phrase").
     - copy seed phrase in the format --
       `word1 word2 word3 word4 word5 word6 word7 word8 word9 word10  word11 word12 word13 word14 word15 word16 word17 word18 word19 word20 word21 word22 word23 word24`
   - **Manually type each word** in the numbered fields.
5. Click **Restore Wallet**and before restoring wallet must open any folder otherwise not restoring wallet.
6. Enter your **wallet password** when prompted.
7. After successful, Wallet details are stored in the working directory inside the `wallet_details/` folder.

![restore](https://raw.githubusercontent.com/AIQUANT-Tech/CardanoVSC/refs/heads/main/CardanoVSC/docs/cardanovsc_restore_webview.png)

### 💰 Checking Your Balance

1. Open **Wallet Management**.
2. Select the correct network (**Mainnet**/**Prepeod**/**Preview**).
3. Click **Check Balance**.
4. promt for asking address of wallet of that network in which you connected (network show at right corner in status bar of vscode)
5. View your balance in the **vscode Notification message**.

### 🔒 Wallet Security Features

✅ **AES-256 Encryption** – Wallets are encrypted before storage.  
✅ **Secure Storage** – Wallets are saved under `wallet_details/[network]/[wallet-address].json`.

#### 📂 Wallet File Location

Your wallet files are stored in vscode workspace after successful creating or restoring wallet

```
workspace/
└── wallet_details/
    ├── mainnet/
    │   ├── addr1q9...xyz.json
    │   └── addr1q8...abc.json
    ├── preview/
    │   └── addr_test1...def.json
    └── preprod/
        └── addr_test1...def.json

Each .json file contains:

{
  "address": "addr1...",
  "network": "mainnet",
  "encryptedSeed": "salt:iv:encryptedData",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

```

### ⚠️ Important Security Notes
🚨 **Never share your recovery phrase** – Anyone with these words can access your funds.
🚨 **Backup your wallet files** – Keep copies of `.json` files in a secure location.
🚨 **Use Testnet for development** – Always test with Testnet ADA before using Mainnet.

### 🛠️ Troubleshooting
If you encounter issues:
- Ensure you're on the correct network (**Mainnet**/**Preprod**/**Preview**).
- Double-check that all **24 words** are entered correctly when restoring.
- Make sure your **workspace folder has write permissions**.

## 🤝 Contributing
Contributions are welcome! Please open an issue or pull request on GitHub.

## 📜 License
This project is licensed under the MIT License.

## 📌Scope and Design Documentation

- **Scope and Design Document:** https://github.com/AIQUANT-Tech/CardanoVSC/blob/main/DesignDocs/CardanoVSC-Scope_Design_Document.pdf
- **Figma Design:** https://www.figma.com/design/MiVmXAtePUc3UndaGl7eGK
```
