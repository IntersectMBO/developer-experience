# Build a Wallet Connection and Send Your First Payment

Almost every dApp on Cardano starts the same way. A browser wallet holds the keys, your app asks it for permission to see addresses and to request signatures, and the transaction is assembled somewhere else. The wallet never hands over a private key, so the only thing your app can do with the user's funds is ask them to approve an action.

We're going to build a small page that walks that whole path once: it lists the CIP-30 wallets installed in the browser, connects to one, refuses to continue if it is on the wrong network, reads the address and funds, builds an ADA payment with Mesh, asks the wallet to sign it, and submits it. Everything runs on **preview testnet**, so nothing here can cost you real funds.

## Prerequisites

You'll need five things in place before the first line of code:

- **Node.js 20 or later**, and npm.
- **A CIP-30 browser wallet**: Eternl, Lace, Nami, Flint or Gero. Install the extension before you start, because the page can only see wallets that already exist in the browser.
- **A preview testnet account in that wallet.** Create a fresh account and switch the wallet's network to **Preview**, not Mainnet.
- **Test ADA** from the [Cardano testnet faucet](https://docs.cardano.org/cardano-testnets/tools/faucet). Pick **Preview**, paste one of your wallet's `addr_test1…` addresses, and request funds. It arrives in a minute or two.
- **A Blockfrost preview project key** from [blockfrost.io](https://blockfrost.io/). The free tier is enough. Create the project with network **Preview**, because a mainnet key will fail against preview addresses.

:::warning

Every address in this tutorial starts with `addr_test1`. If your wallet shows an `addr1…` address, you are on mainnet and the transaction will be rejected at submit. That is the single most common source of confusion here.

:::

## How the Pieces Fit

Two pieces, and it is worth keeping them separate in your head.

- **The wallet** holds keys and signs. It never leaves the user's browser.
- **Your app** builds the transaction body, and a **provider** (Blockfrost) supplies protocol parameters and answers "has this been confirmed yet".

Mesh gives you a class for each: `MeshCardanoBrowserWallet` for the wallet, `MeshTxBuilder` for the transaction, and `BlockfrostProvider` for chain data.

## Setting Up the Project

### The Scaffold

The fastest route is the Mesh CLI, which sets up Next.js with Mesh already installed:

```bash
npx meshjs mesh-preview-payment
cd mesh-preview-payment
```

Answer the prompts, choose the React/Next.js template, then start the dev server:

```bash
npm run dev
```

You'll build the page you just created in the steps below.

### Adding Mesh to an Existing App

If you already have a React or Next.js app, install both packages instead. `@meshsdk/wallet` holds the CIP-30 wallet wrapper, and `@meshsdk/core` holds the transaction builder and the providers:

```bash
npm install @meshsdk/core @meshsdk/wallet
```

### The Provider Key

The provider needs a Blockfrost project key. Put it in `.env.local` so it is not committed:

```
NEXT_PUBLIC_BLOCKFROST_KEY=preview…
```

`NEXT_PUBLIC_` means the key is visible in the browser. That is acceptable for a preview project key and unacceptable for anything else; the Blockfrost docs are explicit that a project key is not a secret once it is in front-end code.

## Optional: Point Your Assistant at the Mesh Docs

The Mesh API has moved more than once. `MeshCardanoBrowserWallet`, `getUtxosMesh()` and `MeshTxBuilder({ fetcher })` are all newer than what a coding assistant learned from its training data, so an assistant working from memory will cheerfully write `BrowserWallet` and a `Transaction` class that no longer exist. Mesh ships an MCP server for exactly this: your editor connects to it, and the assistant reads the current documentation instead of recalling it.

Add it to your editor's MCP configuration. Claude Code and Cursor read `mcpServers`:

```json
{
  "mcpServers": {
    "mesh-mcp": {
      "command": "npx",
      "args": ["-y", "meshjs-mcp"],
      "env": {
        "API_KEY": "your-api-key",
        "MODEL": "your-preferred-model"
      }
    }
  }
}
```

VS Code uses the same block under a `servers` key, and each entry there also takes a `"name"`. `API_KEY` is a key from OpenAI, Anthropic or Google, and `MODEL` is a model that key can call, for example `gpt-4o` or `claude-sonnet-4-20250514`. After a restart the assistant gains one tool, `askDocs`, which searches Mesh's documentation and returns matching chunks with their source links.

:::warning

Check it before you rely on it. As of November 2026 the published server (`meshjs-mcp@1.1.1`) starts and lists `askDocs`, but the hosted service behind that tool (`mimir-api.meshjs.dev`) does not resolve, so every call answers "Couldn't match documentation". If that happens to you, hand the assistant the documentation file instead: [meshjs.dev/llms-full.txt](https://meshjs.dev/llms-full.txt) is the whole doc set in one file, and every Mesh page has a markdown twin you get by appending `.md` to its URL.

:::

Then ask it something that has a version in the answer, and check the result against [the browser wallet page](https://meshjs.dev/apis/wallets/browserwallet) before you paste it into your app.

## Connecting the Wallet

### The Building Blocks

The browser exposes wallets under `window.cardano`. Mesh wraps that for you, so the first step is one import:

```tsx
import { MeshCardanoBrowserWallet } from '@meshsdk/wallet';
```

Everything in this section comes off that class. There is no provider involved yet, because discovery, connection and signing are the wallet's own API.

### What Is Installed

Ask the browser which CIP-30 wallets are present:

```tsx
const installed = MeshCardanoBrowserWallet.getInstalledWallets();
// [{ id: 'eternl', name: 'Eternl', icon: 'data:image/png;base64,…', version: '…' }]
```

Each entry carries the `id` you pass to `enable()`, a display `name`, a base64 `icon` you can use as an `<img>` source, and the extension's `version`.

One thing surprises people: this returns nothing until the extension is installed **and the page has been reloaded**. Extensions inject themselves at page load, so a page that was already open when you installed the wallet keeps showing an empty list until you refresh it.

### Asking for Permission

Pick one of those ids and ask for permission. This is where the wallet popup appears:

```tsx
const wallet = await MeshCardanoBrowserWallet.enable('eternl');
```

Pass an `id` from `getInstalledWallets()` rather than a hardcoded guess, because the id is the wallet's own registration key and it differs between extensions. The identifier `eternl` only works for a reader who has Eternl installed.

`enable()` rejects if the user declines. Catch it and show a message; do not retry in a loop, because each attempt reopens the wallet popup.

### Guarding the Network

Before any transaction work, read the network the wallet is actually on:

```tsx
const networkId = await wallet.getNetworkId();
// 0 = testnet, 1 = mainnet
```

Then refuse to continue unless it is testnet:

```tsx
if ((await wallet.getNetworkId()) !== 0) {
  throw new Error('Switch the wallet to Preview testnet before continuing.');
}
```

The network is a property of the account inside the wallet, not of your app, so this is the check that catches a reader who followed every step but left the wallet on mainnet. Doing it first means the failure arrives as a sentence instead of as a rejected transaction later.

## Reading the Address and the Funds

### The Change Address

A wallet can own many addresses. The one to build against is the change address:

```tsx
const changeAddress = await wallet.getChangeAddressBech32();
// "addr_test1qz…"
```

Change is the money the transaction sends back to you. Whatever your payment does not spend ends up at this address, so the builder needs it to close the balance.

### UTxOs, Not a Balance

Cardano has no account balance. Funds live in unspent transaction outputs, and a wallet is simply the collection of outputs its addresses can spend:

```tsx
const utxos = await wallet.getUtxosMesh();
// [{ input: { txHash, outputIndex }, output: { address, amount: [{ unit: 'lovelace', quantity }] } }]
```

Each entry names the output it spends (`txHash` plus `outputIndex`) and the value it carries. That is the list you hand to the transaction builder in the next section.

### Why Every Amount Is a String

To read the funds, find the lovelace in the assets the wallet reports:

```tsx
const balance = await wallet.getBalanceMesh();
const lovelace = balance.find((a) => a.unit === 'lovelace')?.quantity ?? '0';
console.log(`${Number(lovelace) / 1_000_000} tADA`);
```

Amounts are always integers of the smallest unit. One ADA is `1_000_000` lovelace, and every quantity in the Mesh API is a **string**, not a number, because some tokens have 19 decimal places and JavaScript integers cannot hold them. Convert only for display.

## Building the Payment

### The Transaction Body

A transaction body says which UTxOs go in, which outputs come out, and where the change goes. Mesh selects the UTxOs, calculates the fee, and returns the change to your address:

```tsx
import { BlockfrostProvider, MeshTxBuilder } from '@meshsdk/core';

const provider = new BlockfrostProvider(process.env.NEXT_PUBLIC_BLOCKFROST_KEY!);

const txBuilder = new MeshTxBuilder({ fetcher: provider });

const unsignedTx = await txBuilder
  .txOut('addr_test1vq…', [{ unit: 'lovelace', quantity: String(5_000_000) }])
  .changeAddress(await wallet.getChangeAddressBech32())
  .selectUtxosFrom(await wallet.getUtxosMesh())
  .complete();
```

`txOut` takes the recipient address and the amount as an asset list, in the same `unit`/`quantity` shape the wallet reported. `selectUtxosFrom` takes the UTxOs from the previous step, and `changeAddress` tells the builder where the remainder goes.

### Choosing a Recipient

That `recipient` address is any `addr_test1…` you control or trust. Sending to a second address in your own wallet is the safest first run, because you can watch the exact amount arrive.

### What complete() Does

`complete()` is the step that talks to the provider for protocol parameters. Nothing before it touches the network, so it is also the first call that can fail on your key rather than on your code. If it throws `Blockfrost error: 403`, the key is wrong or belongs to another network.

The result is an unsigned transaction in CBOR hex. It is a proposal until the wallet signs it.

## Signing and Submitting

### Sign

Signing is the wallet's job:

```tsx
const signedTx = await wallet.signTx(unsignedTx, false);   // false = not a multi-sig
```

The second argument to `signTx` is `partialSign`. It matters only when more than one party has to sign; pass `false` for a single-signature payment.

### Submit

Submission can be the wallet's job too:

```tsx
const txHash = await wallet.submitTx(signedTx);
console.log(`Submitted: ${txHash}`);
```

You can also submit through the provider (`provider.submitTx(signedTx)`) when the transaction is signed by a key your server holds rather than by the browser wallet. For this walkthrough, submitting through the wallet is the shorter path.

## Confirming It Landed

A transaction hash is not a receipt. Poll until the chain says otherwise:

```tsx
provider.onTxConfirmed(txHash, () => {
  console.log('Confirmed');
});
```

Or paste the hash into the search box at [preview.cexplorer.io](https://preview.cexplorer.io/) and read the inputs, outputs and fee on the block explorer. That page is also the fastest way to confirm the recipient address matches what you intended.

## The Whole Page

All of the above in one component, including the wallet prompt, the network guard and the error handling:

```tsx
'use client';

import { useState } from 'react';
import { MeshCardanoBrowserWallet } from '@meshsdk/wallet';
import { BlockfrostProvider, MeshTxBuilder } from '@meshsdk/core';

const provider = new BlockfrostProvider(process.env.NEXT_PUBLIC_BLOCKFROST_KEY!);

export default function Payment() {
  const [status, setStatus] = useState<string>('Not connected');
  const [pending, setPending] = useState(false);

  async function pay() {
    setPending(true);

    try {
      setStatus('Connecting…');
      const wallet = await MeshCardanoBrowserWallet.enable('eternl');

      if ((await wallet.getNetworkId()) !== 0) {
        setStatus('Wrong network: switch the wallet to Preview.');
        return;
      }

      setStatus('Building…');
      const unsignedTx = await new MeshTxBuilder({ fetcher: provider })
        .txOut('addr_test1vq…', [{ unit: 'lovelace', quantity: '5000000' }])
        .changeAddress(await wallet.getChangeAddressBech32())
        .selectUtxosFrom(await wallet.getUtxosMesh())
        .complete();

      setStatus('Waiting for the wallet to sign…');
      const signedTx = await wallet.signTx(unsignedTx, false);
      const txHash = await wallet.submitTx(signedTx);

      setStatus(`Submitted ${txHash}, waiting for confirmation…`);
      provider.onTxConfirmed(txHash, () => setStatus(`Confirmed ${txHash}`));
    } catch (error) {
      setStatus(`Failed: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <button onClick={pay} disabled={pending}>
        Send 5 tADA
      </button>
      <p>{status}</p>
    </div>
  );
}
```

## Run It

Start the dev server and open the page:

```bash
npm run dev
```

Then:

1. Open [http://localhost:3000](http://localhost:3000).
2. Click the button, pick your preview wallet in the popup, and approve.
3. Watch the status line move through connecting, building and signing.
4. Approve the transaction in the wallet.
5. Paste the transaction hash into [preview.cexplorer.io](https://preview.cexplorer.io/) and check the recipient address and the amount.

Expected: the status line ends at `Confirmed <txHash>`, and the explorer shows a fee taken from your balance and 5 tADA at the recipient.

## Troubleshooting

**"No wallets found" / the list is empty.** The extension is installed but the page loaded before it. Reload. If it is still empty, the wallet is disabled for this site, or it is not a CIP-30 wallet.

**Wrong network.** `addr1…` instead of `addr_test1…` means the wallet is on mainnet. Switch the network in the wallet, not in your app, then reload.

**`Blockfrost error: 403` or "project not found".** The key is invalid, or it was created for a different network than the addresses you are using. A mainnet key and a preview address will never work together.

**"Not enough funds" / the fee cannot be covered.** Test ADA has not arrived yet, or you are trying to send more than the wallet holds. Leave at least ~2 tADA for fees and the minimum ADA per output.

**"UTxOs are not available" right after a transaction.** The wallet has not refreshed. Wait a few seconds and call `getUtxosMesh()` again before rebuilding.

**Missing collateral.** Collateral is required only for transactions that run Plutus scripts, and a plain ADA payment is not one. If you later add a smart contract call, get it with `wallet.getCollateralMesh()` and pass it to the builder; wallets also expose a way to set collateral, and Mesh has a guide for it.

**"User rejected the request".** The wallet popup was dismissed. Surface it as a message rather than an error toast, and let the user try again when they choose to.

## Summary

You built a page where a browser wallet connects to your app, the app checks which network the wallet is on, reads the address and UTxOs, builds a 5 tADA payment with `MeshTxBuilder`, asks the wallet to sign it, submits it, and waits for confirmation.

The pattern underneath is the one every Cardano dApp reuses: the keys stay in the wallet, your app builds the transaction describing the change it wants, and a provider supplies the chain data that building and confirming need. Changing the recipient and the amount is all that separates this from a checkout, a mint or a treasury payment.

## Where to Go Next

- [Browser Wallet API (Mesh)](https://meshjs.dev/apis/wallets/browserwallet): every CIP-30 method Mesh wraps, including `signData` for proving ownership.
- [Mesh transaction builder](https://meshjs.dev/apis/txbuilder): minting, multi-asset payments, metadata, TTL and script interactions.
- [Blockfrost provider](https://meshjs.dev/providers/blockfrost): the rest of the chain-data API, and `onTxConfirmed`.
- [CIP-30](https://cips.cardano.org/cip/CIP-30): the standard behind the connect flow, worth reading once.
- [Getting started](/docs/getting-started/): the rest of the Developer Experience track, including the session archive.

Once this works on preview, the same code runs on mainnet by switching the network and the provider key. Do that only after you have handled the two things preview lets you skip: showing the user the fee before they sign, and treating any address you did not personally type as untrusted input.
