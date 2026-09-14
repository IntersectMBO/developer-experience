---
title: "Session 14: Repository Walkthrough: Offchain and SDK building - Notes"
sidebar_label: Session Notes
slug: /working-group/q2-2026/sessions/14-sdk-repo-walkthrough/session-notes
---

# Repository Walkthrough: Offchain and SDK building

## Introduction

This session is a continuation of the Q4 2025 walkthrough, shifting focus from the onchain code to the **offchain integration and SDK building**. We explore how to interact with the Payment Subscription Smart Contract built by Anastasia Labs, how to structure an SDK, and how to build transactions to interact with Cardano smart contracts using Lucid Evolution.

## Recap: The Smart Contract Architecture

Before diving into the offchain code, we briefly recapped the three main validators of the contract:
1. **Account Validator**: Acts as authentication. Uses CIP-68 standards to mint a paired reference token (sent to the contract) and user token (sent to the user's wallet).
2. **Service Validator**: Used by merchants to define subscription services (e.g., Netflix-like plans) with specific fees and intervals.
3. **Payment Validator**: Handles linear vesting, locking funds, and allowing merchants to withdraw fees periodically while letting users cancel or extend subscriptions.

## The Offchain SDK Structure

A well-structured SDK is critical to lower the barrier to entry for Cardano developers. The project is organized into clear directories:
- **`docs/`**: API endpoints documentation (in partnership with Maestro).
- **`src/`**: The main source code.
  - **`core/`**: Contains helper functions and compiled contract blueprints (`plutus.json`).
  - **`endpoints/`**: Contains the transaction building logic for each contract action (e.g., `createService`, `updateService`).
  - **`examples/`**: Code snippets demonstrating how a third-party developer can use the SDK.

## Transaction Building Walkthrough

Using **Lucid Evolution** (though MashJS or others are viable), we walked through the `createService` endpoint to understand transaction building:

### 1. Extracting the Validator
The `plutus.json` blueprint is parsed to extract the specific validator needed. Helper functions abstract this process to quickly get the required endpoints and policy IDs.

### 2. Collecting UTXOs and Minting
The user's wallet is connected to select the necessary UTXOs. For creating a service:
- The SDK mints two NFTs (Service Reference NFT and Service NFT) adhering to the CIP-68 standard.
- The reference NFT is sent to the smart contract, and the user NFT goes to the merchant's wallet.

### 3. Configuring the Datum
The SDK wraps all required parameters (e.g., service fee, interval length, penalty fee) into a `Config` object. This config is then formatted to match the exact `Datum` structure expected by the onchain code.

### 4. Building the Transaction
```typescript
lucid.newTx()
  .collectFrom(...)
  .mintAssets(...)
  .payToAddress(merchantAddress, ...)
  .payToContract(contractAddress, { inline: datum }, ...)
  .attachMintingPolicy(...)
  .complete()
```
*Note: The codebase utilizes the **Effect Library** in TypeScript (often seen via the `yield*` and `Effect.gen` syntax) to enforce robust type-safety, error handling, and standard execution flows.*

## Testing the SDK

Testing offchain code is just as important as the onchain code. The repository contains extensive tests:
- Tests populate dummy configurations (simulating what a user would input).
- Tests run the endpoint logic to ensure transactions build correctly.
- Helper functions sign and submit these test transactions to ensure end-to-end reliability.

## Key Takeaways
- **SDKs Drive Adoption**: Wrapping complex smart contracts into clean, well-documented SDKs is one of the biggest opportunities in the Cardano ecosystem. It allows frontend developers to build without needing to write or understand Plutus.
- **Blueprint Alignment**: The offchain code's main job is exactly mirroring the constraints, datums, and redeemers defined in the onchain design specification.

---

*These notes belong to the Q2 2026 Developer Experience Working Group.*
