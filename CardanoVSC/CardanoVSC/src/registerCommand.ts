import * as vscode from "vscode";
import * as childprocess from "child_process";

export class extensionCommand {
  private extensionContext: vscode.ExtensionContext;
  private outputChannel: vscode.OutputChannel;
  baseUrl: string = "https://api.cardanoscan.io/api/v1"; // Base URL for API requests

  constructor(context: vscode.ExtensionContext) {
    this.extensionContext = context;
    this.outputChannel = vscode.window.createOutputChannel(
      "Cardano API Response"
    );
    this.registerCommands();
  }

  private registerCommands(): void {
    const commands = [
      {
        command: "cardanovsc.get_block_details",
        callback: this.getBlockDetails.bind(this),
      },
      {
        command: "cardanovsc.get_pool_details",
        callback: this.getPoolDetails.bind(this),
      },
      {
        command: "cardanovsc.get_latest_block_details",
        callback: this.getLatestBlockDetails.bind(this),
      },
      {
        command: "cardanovsc.get_address_balance",
        callback: this.getAddressBalance.bind(this),
      },
      {
        command: "cardanovsc.get_pool_stats",
        callback: this.getPoolStats.bind(this),
      },
      {
        command: "cardanovsc.get_pools_list",
        callback: this.getPoolsList.bind(this),
      },
      {
        command: "cardanovsc.get_pools_expiring",
        callback: this.getPoolsExpiring.bind(this),
      },
      {
        command: "cardanovsc.get_pools_expired",
        callback: this.getPoolsExpired.bind(this),
      },
      {
        command: "cardanovsc.get_asset_details",
        callback: this.getAssetDetails.bind(this),
      },
      {
        command: "cardanovsc.get_assets_by_policyId",
        callback: this.getAssetsByPolicyId.bind(this),
      },
      {
        command: "cardanovsc.get_assets_by_address",
        callback: this.getAssetsByAddress.bind(this),
      },
      {
        command: "cardanovsc.get_transaction_details",
        callback: this.getTransactionDetails.bind(this),
      },
      {
        command: "cardanovsc.get_transaction_list_by_address",
        callback: this.getTransactionListByAddress.bind(this),
      },
      {
        command: "cardanovsc.get_stake_key_details",
        callback: this.getStakeKeyDetails.bind(this),
      },
      {
        command: "cardanovsc.get_addresses_associated_with_stake_key",
        callback: this.getAddressesAssociatedWithStakeKey.bind(this),
      },
      {
        command: "cardanovsc.get_network_details",
        callback: this.getNetworkDetails.bind(this),
      },
      {
        command: "cardanovsc.get_network_protocol_details",
        callback: this.getNetworkProtocolDetails.bind(this),
      },
      {
        command: "cardanovsc.get_cc_hot_details",
        callback: this.getCCHotDetails.bind(this),
      },
      {
        command: "cardanovsc.get_cc_member_details",
        callback: this.getCCMemberDetails.bind(this),
      },
      {
        command: "cardanovsc.get_committee_information",
        callback: this.getCommitteeInformation.bind(this),
      },
      {
        command: "cardanovsc.get_committee_members",
        callback: this.getCommitteeMembers.bind(this),
      },
      {
        command: "cardanovsc.get_drep_information",
        callback: this.getDRepInformation.bind(this),
      },
      {
        command: "cardanovsc.get_dreps_list",
        callback: this.getDRepsList.bind(this),
      },
      {
        command: "cardanovsc.get_governance_action",
        callback: this.getGovernanceAction.bind(this),
      },
    ];

    commands.forEach(({ command, callback }) => {
      this.extensionContext.subscriptions.push(
        vscode.commands.registerCommand(command, callback)
      );
    });
  }

  public getApiKey(): string | null {
    const storedApiKey =
      this.extensionContext.globalState.get<string>("cardano.apiKey");

    if (!storedApiKey) {
      // Notify the user and execute the API integration command
      vscode.window.showErrorMessage(
        "API key not found! Starting API integration setup..."
      );

      // Execute the API integration command
      vscode.commands.executeCommand("cardano.apiIntegration");

      // Check again after the command completes
      const updatedApiKey =
        this.extensionContext.globalState.get<string>("cardano.apiKey");

      if (!updatedApiKey) {
        vscode.window.showErrorMessage(
          "API integration setup failed or was canceled."
        );
        return null;
      }

      return updatedApiKey;
    }

    return storedApiKey;
  }

  public executeCurlCommand(
    apiUrl: string,
    apiKey: string,
    onSuccess: (response: any) => void
  ): void {
    const curlCommand = `curl -X GET "${apiUrl}" --header "apiKey: ${apiKey}"`;

    childprocess.exec(curlCommand, (error, stdout, stderr) => {
      if (error) {
        vscode.window.showErrorMessage(`Error: ${stderr || error.message}`);
        return;
      }

      try {
        const jsonResponse = JSON.parse(stdout);
        onSuccess(jsonResponse);
      } catch (parseError) {
        vscode.window.showErrorMessage("Failed to parse API response as JSON.");
      }
    });
  }

  public displayOutput(jsonResponse: any): void {
    const formattedJson = JSON.stringify(jsonResponse, null, 2);
    this.outputChannel.clear();
    this.outputChannel.appendLine(formattedJson);
    this.outputChannel.show();
  }

  private getBlockDetails(): void {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    vscode.window
      .showQuickPick(
        ["blockHash", "blockHeight", "absoluteSlot", "epoch and slot"],
        { placeHolder: "Choose the parameter type to fetch block details." }
      )
      .then(async (parameterType) => {
        if (!parameterType) {
          vscode.window.showErrorMessage(
            "You must select a parameter type to fetch block details."
          );
          return;
        }

        let queryString = "";
        if (parameterType === "blockHash") {
          const blockHash = await vscode.window.showInputBox({
            prompt: "Enter the Block Hash",
            placeHolder: "e.g., abc123...",
          });
          if (!blockHash) {
            vscode.window.showErrorMessage("Block Hash is required.");
            return;
          }
          queryString = `blockHash=${blockHash}`;
        } else if (parameterType === "blockHeight") {
          const blockHeight = await vscode.window.showInputBox({
            prompt: "Enter the Block Height",
            placeHolder: "e.g., 12345",
          });
          if (!blockHeight) {
            vscode.window.showErrorMessage("Block Height is required.");
            return;
          }
          queryString = `blockHeight=${blockHeight}`;
        } else if (parameterType === "absoluteSlot") {
          const absoluteSlot = await vscode.window.showInputBox({
            prompt: "Enter the Absolute Slot",
            placeHolder: "e.g., 12345678",
          });
          if (!absoluteSlot) {
            vscode.window.showErrorMessage("Absolute Slot is required.");
            return;
          }
          queryString = `absoluteSlot=${absoluteSlot}`;
        } else if (parameterType === "epoch and slot") {
          const epoch = await vscode.window.showInputBox({
            prompt: "Enter the Epoch",
            placeHolder: "e.g., 123",
          });
          if (!epoch) {
            vscode.window.showErrorMessage("Epoch is required.");
            return;
          }

          const slot = await vscode.window.showInputBox({
            prompt: "Enter the Slot",
            placeHolder: "e.g., 456",
          });
          if (!slot) {
            vscode.window.showErrorMessage("Slot is required.");
            return;
          }
          queryString = `epoch=${epoch}&slot=${slot}`;
        }

        const apiUrl = `${this.baseUrl}/block?${queryString}`;
        this.executeCurlCommand(apiUrl, apiKey, (response) => {
          this.displayOutput(response);
        });
      });
  }

  private async getPoolDetails(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    const poolId = await vscode.window.showInputBox({
      prompt: "Enter the Pool ID (Hex representation, exactly 56 characters)",
      placeHolder: "e.g., abc123...",
      validateInput: (input) => {
        if (input.length !== 56) {
          return "Pool ID must be exactly 56 characters long.";
        }
        return null;
      },
    });

    if (!poolId) {
      vscode.window.showErrorMessage(
        "Pool ID is required to fetch pool details."
      );
      return;
    }

    const apiUrl = `${this.baseUrl}/pool?poolId=${poolId}`;
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }

  public getLatestBlockDetails(): void {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    const apiUrl = `${this.baseUrl}/block/latest`;
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }

  private async getAddressBalance(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    const address = await vscode.window.showInputBox({
      prompt: "Enter the Address",
      placeHolder: "e.g., addr1xyz...",
      validateInput: (input) =>
        input.length > 200
          ? "Address exceeds the maximum length of 200."
          : null,
    });

    if (!address) {
      vscode.window.showErrorMessage(
        "Address is required to fetch the balance."
      );
      return;
    }

    const apiUrl = `${this.baseUrl}/address/balance?address=${address}`;
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }
  private async getPoolStats(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    const poolId = await vscode.window.showInputBox({
      prompt: "Enter the Pool ID (Hex representation, exactly 56 characters)",
      placeHolder: "e.g., abc123...",
      validateInput: (input) => {
        if (input.length !== 56) {
          return "Pool ID must be exactly 56 characters long.";
        }
        return null;
      },
    });

    if (!poolId) {
      vscode.window.showErrorMessage(
        "Pool ID is required to fetch pool stats."
      );
      return;
    }

    const apiUrl = `${this.baseUrl}/pool/stats?poolId=${poolId}`;
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }
  private async getPoolsList(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    const pageNo = await vscode.window.showInputBox({
      prompt: "Enter the Page Number to fetch (1-10000)",
      placeHolder: "e.g., 1",
      validateInput: (input) => {
        const page = parseInt(input);
        if (isNaN(page) || page < 1 || page > 10000) {
          return "Page number must be between 1 and 10000.";
        }
        return null;
      },
    });

    if (!pageNo) {
      vscode.window.showErrorMessage(
        "Page number is required to fetch pools list."
      );
      return;
    }

    const apiUrl = `${this.baseUrl}/pool/list?pageNo=${pageNo}`;
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }
  private async getPoolsExpiring(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    const pageNo = await vscode.window.showInputBox({
      prompt: "Enter the Page Number to fetch (1-10000)",
      placeHolder: "e.g., 1",
      validateInput: (input) => {
        const page = parseInt(input);
        if (isNaN(page) || page < 1 || page > 10000) {
          return "Page number must be between 1 and 10000.";
        }
        return null;
      },
    });

    if (!pageNo) {
      vscode.window.showErrorMessage(
        "Page number is required to fetch pools expiring list."
      );
      return;
    }

    const apiUrl = `${this.baseUrl}/pool/list/expiring?pageNo=${pageNo}`;
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }
  private async getPoolsExpired(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    const pageNo = await vscode.window.showInputBox({
      prompt: "Enter the Page Number to fetch (1-10000)",
      placeHolder: "e.g., 1",
      validateInput: (input) => {
        const page = parseInt(input);
        if (isNaN(page) || page < 1 || page > 10000) {
          return "Page number must be between 1 and 10000.";
        }
        return null;
      },
    });

    if (!pageNo) {
      vscode.window.showErrorMessage(
        "Page number is required to fetch expired pools list."
      );
      return;
    }

    const apiUrl = `${this.baseUrl}/pool/list/expired?pageNo=${pageNo}`;
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }
  private async getAssetDetails(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    // Prompt user to input either assetId or fingerprint
    const assetId = await vscode.window.showInputBox({
      prompt: "Enter the assetId (minimum length 56)",
      placeHolder: "e.g., asset12345",
    });

    if (assetId && assetId.length >= 56) {
      const apiUrl = `${this.baseUrl}/asset?assetId=${assetId}`;
      this.executeCurlCommand(apiUrl, apiKey, (response) => {
        this.displayOutput(response);
      });
    } else {
      const fingerprint = await vscode.window.showInputBox({
        prompt: "Enter the fingerprint (maximum length 200)",
        placeHolder: "e.g., fingerprint12345",
      });

      if (fingerprint && fingerprint.length <= 200) {
        const apiUrl = `${this.baseUrl}/asset?fingerprint=${fingerprint}`;
        this.executeCurlCommand(apiUrl, apiKey, (response) => {
          this.displayOutput(response);
        });
      } else {
        vscode.window.showErrorMessage(
          "Please enter either a valid assetId (min length 56) or a valid fingerprint (max length 200)."
        );
      }
    }
  }
  private async getAssetsByPolicyId(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    // Prompt user to input the policyId
    const policyId = await vscode.window.showInputBox({
      prompt: "Enter the policyId (length must be 56 characters)",
      placeHolder:
        "e.g., policy123456789012345678901234567890123456789012345678901234",
    });

    if (!policyId || policyId.length !== 56) {
      vscode.window.showErrorMessage(
        "The policyId must be 56 characters long."
      );
      return;
    }

    // Prompt user to input the page number
    const pageNo = await vscode.window.showInputBox({
      prompt: "Enter the Page Number to fetch (1-10000)",
      placeHolder: "e.g., 1",
      validateInput: (input) => {
        const page = parseInt(input);
        if (isNaN(page) || page < 1 || page > 10000) {
          return "Page number must be between 1 and 10000.";
        }
        return null;
      },
    });

    if (!pageNo) {
      vscode.window.showErrorMessage("Page number is required.");
      return;
    }

    const apiUrl = `${this.baseUrl}/asset/list/byPolicyId?policyId=${policyId}&pageNo=${pageNo}`;
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }
  private async getAssetsByAddress(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    // Prompt user to input the address
    const address = await vscode.window.showInputBox({
      prompt: "Enter the address (maximum length is 200 characters)",
      placeHolder: "e.g., addr1qxyz...abc",
      validateInput: (input) => {
        if (input.length > 200) {
          return "Address must not exceed 200 characters.";
        }
        return null;
      },
    });

    if (!address) {
      vscode.window.showErrorMessage("Address is required.");
      return;
    }

    // Prompt user to input the page number
    const pageNo = await vscode.window.showInputBox({
      prompt: "Enter the Page Number to fetch (1-10000)",
      placeHolder: "e.g., 1",
      validateInput: (input) => {
        const page = parseInt(input);
        if (isNaN(page) || page < 1 || page > 10000) {
          return "Page number must be between 1 and 10000.";
        }
        return null;
      },
    });

    if (!pageNo) {
      vscode.window.showErrorMessage("Page number is required.");
      return;
    }

    const apiUrl = `${this.baseUrl}/asset/list/byAddress?address=${address}&pageNo=${pageNo}`;
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }
  private async getTransactionDetails(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    // Prompt user to input the transaction hash
    const transactionHash = await vscode.window.showInputBox({
      prompt: "Enter the transaction hash (64 characters)",
      placeHolder: "e.g., a4e5c3f4b2d1...",
      validateInput: (input) => {
        if (input.length !== 64) {
          return "Transaction hash must be exactly 64 characters.";
        }
        return null;
      },
    });

    if (!transactionHash) {
      vscode.window.showErrorMessage("Transaction hash is required.");
      return;
    }

    const apiUrl = `${this.baseUrl}/transaction?hash=${transactionHash}`;
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }
  private async getTransactionListByAddress(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    // Prompt user to input the address
    const address = await vscode.window.showInputBox({
      prompt: "Enter the address (maximum length is 200 characters)",
      placeHolder: "e.g., addr1qxyz...abc",
      validateInput: (input) => {
        if (input.length > 200) {
          return "Address must not exceed 200 characters.";
        }
        return null;
      },
    });

    if (!address) {
      vscode.window.showErrorMessage("Address is required.");
      return;
    }

    // Prompt user to input the page number
    const pageNo = await vscode.window.showInputBox({
      prompt: "Enter the Page Number to fetch (minimum 1)",
      placeHolder: "e.g., 1",
      validateInput: (input) => {
        const page = parseInt(input);
        if (isNaN(page) || page < 1) {
          return "Page number must be at least 1.";
        }
        return null;
      },
    });

    if (!pageNo) {
      vscode.window.showErrorMessage("Page number is required.");
      return;
    }

    const apiUrl = `${this.baseUrl}/transaction/list?address=${address}&pageNo=${pageNo}`;
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }
  private async getStakeKeyDetails(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    // Prompt user to input the reward address
    const rewardAddress = await vscode.window.showInputBox({
      prompt: "Enter the reward address (maximum length is 58 characters)",
      placeHolder: "e.g., stake1u9xyz...",
      validateInput: (input) => {
        if (input.length > 58) {
          return "Reward address must not exceed 58 characters.";
        }
        return null;
      },
    });

    if (!rewardAddress) {
      vscode.window.showErrorMessage("Reward address is required.");
      return;
    }

    const apiUrl = `${this.baseUrl}/rewardAccount?rewardAddress=${rewardAddress}`;
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }
  private async getAddressesAssociatedWithStakeKey(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    // Prompt user to input the reward address
    const rewardAddress = await vscode.window.showInputBox({
      prompt:
        "Enter the stake key reward address (maximum length is 58 characters)",
      placeHolder: "e.g., stake1u9xyz...",
      validateInput: (input) => {
        if (input.length > 58) {
          return "Stake key reward address must not exceed 58 characters.";
        }
        return null;
      },
    });

    if (!rewardAddress) {
      vscode.window.showErrorMessage("Stake key reward address is required.");
      return;
    }

    // Prompt user to input the page number
    const pageNo = await vscode.window.showInputBox({
      prompt: "Enter the Page Number to fetch (minimum 1)",
      placeHolder: "e.g., 1",
      validateInput: (input) => {
        const page = parseInt(input);
        if (isNaN(page) || page < 1 || page > 10000) {
          return "Page number must be between 1 and 10000.";
        }
        return null;
      },
    });

    if (!pageNo) {
      vscode.window.showErrorMessage("Page number is required.");
      return;
    }

    const apiUrl = `${this.baseUrl}/rewardAccount/addresses?rewardAddress=${rewardAddress}&pageNo=${pageNo}`;
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }
  private async getNetworkDetails(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    const apiUrl = `${this.baseUrl}/network/state`;
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }
  private async getNetworkProtocolDetails(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    const apiUrl = `${this.baseUrl}/network/protocolParams`;
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }
  private async getCCHotDetails(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    // Ask the user for the hotHex parameter
    const hotHex = await vscode.window.showInputBox({
      prompt: "Enter the hotHex (58 characters, Hex format)",
      validateInput: (input) =>
        input.length === 58
          ? null
          : "hotHex must be exactly 58 characters long.",
    });

    if (!hotHex) {
      vscode.window.showErrorMessage("hotHex is required.");
      return;
    }

    const apiUrl = `${this.baseUrl}/governance/ccHot?hotHex=${hotHex}`;
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }
  private async getCCMemberDetails(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    // Ask the user for the coldHex parameter
    const coldHex = await vscode.window.showInputBox({
      prompt: "Enter the coldHex (58 characters, Hex format)",
      validateInput: (input) =>
        input.length === 58
          ? null
          : "coldHex must be exactly 58 characters long.",
    });

    if (!coldHex) {
      vscode.window.showErrorMessage("coldHex is required.");
      return;
    }

    const apiUrl = `${this.baseUrl}/governance/ccMember?coldHex=${coldHex}`;
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }
  private async getCommitteeInformation(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    const apiUrl = `${this.baseUrl}/governance/committee`;

    // Execute the API call and handle the response
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }
  private async getCommitteeMembers(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    // Ask the user for the page number
    const pageNoInput = await vscode.window.showInputBox({
      prompt: "Enter the page number (1-10000)",
      validateInput: (input) =>
        isNaN(Number(input)) || Number(input) < 1 || Number(input) > 10000
          ? "Page number must be between 1 and 10000."
          : null,
    });

    if (!pageNoInput) {
      vscode.window.showErrorMessage("Page number is required.");
      return;
    }

    const includeExpiredInput = await vscode.window.showQuickPick(
      ["true", "false"],
      {
        placeHolder: "Include expired members?",
        canPickMany: false,
      }
    );

    const apiUrl = `${this.baseUrl}/governance/committee/members?pageNo=${pageNoInput}&includeExpired=${includeExpiredInput}`;

    // Execute the API call and handle the response
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }
  private async getDRepInformation(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    // Ask the user for the dRepId (DRep hex string)
    const dRepIdInput = await vscode.window.showInputBox({
      prompt: "Enter the dRep ID (Hex representation, minimum 58 characters)",
      validateInput: (input) =>
        input.length !== 58 ? "DRep ID must be exactly 58 characters." : null,
    });

    if (!dRepIdInput) {
      vscode.window.showErrorMessage("DRep ID is required.");
      return;
    }

    const apiUrl = `${this.baseUrl}/governance/dRep?dRepId=${dRepIdInput}`;

    // Execute the API call and handle the response
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }
  private async getDRepsList(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    // Ask the user for the search term (to filter dReps)
    const searchTermInput = await vscode.window.showInputBox({
      prompt: "Enter a search term to filter dReps (Max 200 characters)",
      validateInput: (input) =>
        input.length > 200
          ? "Search term must be less than 200 characters."
          : null,
    });

    if (!searchTermInput) {
      vscode.window.showErrorMessage("Search term is required.");
      return;
    }

    // Ask for the page number
    const pageNoInput = await vscode.window.showInputBox({
      prompt: "Enter the page number (1-10000)",
      validateInput: (input) =>
        isNaN(Number(input)) || Number(input) < 1 || Number(input) > 10000
          ? "Page number must be between 1 and 10000."
          : null,
    });

    if (!pageNoInput) {
      vscode.window.showErrorMessage("Page number is required.");
      return;
    }

    const apiUrl = `${this.baseUrl}/governance/dRep/list?search=${searchTermInput}&pageNo=${pageNoInput}`;

    // Execute the API call and handle the response
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }
  private async getGovernanceAction(): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return;
    }

    // Ask the user for the actionId (Hex string representation)
    const actionIdInput = await vscode.window.showInputBox({
      prompt: "Enter the ActionId (Hex representation, minimum 66 characters)",
      validateInput: (input) =>
        input.length !== 66 ? "ActionId must be exactly 66 characters." : null,
    });

    if (!actionIdInput) {
      vscode.window.showErrorMessage("ActionId is required.");
      return;
    }

    const apiUrl = `${this.baseUrl}/governance/action?actionId=${actionIdInput}`;

    // Execute the API call and handle the response
    this.executeCurlCommand(apiUrl, apiKey, (response) => {
      this.displayOutput(response);
    });
  }
}
