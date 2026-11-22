---
title: Connect a Wallet and Send Your First Payment
sidebar_label: Wallet connect and payment
sidebar_position: 2
---

Almost every dApp on Cardano starts the same way: a browser wallet holds the keys, your app asks it for permission to see addresses and ask for signatures, and the transaction is built somewhere else. This tutorial walks that whole path once, on **preview testnet**, so nothing here can cost you real funds.

You will end up with a small page that:

1. Lists the CIP-30 wallets installed in the browser.
2. Connects to one and confirms it is on preview, not mainnet.
3. Builds an ADA payment with Mesh and asks the wallet to sign it.
4. Submits the signed transaction and waits for confirmation.

## Prerequisites

- **Node.js 20 or later**, and npm.
- **A CIP-30 browser wallet**: Eternl, Lace, Nami, Flint or Gero. Install the extension before you start; the app can only see wallets that already exist in the browser.
- **A preview testnet account in that wallet.** Create a fresh account and switch the wallet's network to **Preview**, not Mainnet.
- **Test ADA** from the [Cardano testnet faucet](https://docs.cardano.org/cardano-testnets/tools/faucet). Pick **Preview**, paste one of your wallet's `addr_test1…` addresses, and request funds. It arrives in a minute or two.
- **A Blockfrost preview project key** from [blockfrost.io](https://blockfrost.io/). The free tier is enough. Create the project with network **Preview**; a mainnet key will fail against preview addresses.

:::warning
Every address in this tutorial starts with `addr_test1`. If your wallet shows an `addr1…` address, you are on mainnet and the transaction will be rejected at submit. That is the single most common source of confusion here.
:::

## What you are building

Two pieces, and it is worth keeping them separate in your head:

- **The wallet** holds keys and signs. It never leaves the user's browser.
- **Your app** builds the transaction body, and a **provider** (Blockfrost) supplies protocol parameters and answers "has this been confirmed yet".

Mesh gives you a class for each: `MeshCardanoBrowserWallet` for the wallet, `MeshTxBuilder` for the transaction, `BlockfrostProvider` for chain data.

## Scaffold the project

The fastest route is the Mesh CLI, which sets up Next.js with Mesh already installed:

```bash
npx meshjs mesh-preview-payment
cd mesh-preview-payment
```

Answer the prompts, choose the React/Next.js template, then start the dev server:

```bash
npm run dev
```

If you already have a React or Next.js app, install the three packages instead:

```bash
npm install @meshsdk/core @meshsdk/wallet
```

## Connect a CIP-30 wallet

The browser exposes wallets under `window.cardano`. Mesh wraps that for you:

```tsx
import { MeshCardanoBrowserWallet } from '@meshsdk/wallet';

// 1. What is installed in this browser?
const installed = MeshCardanoBrowserWallet.getInstalledWallets();
// [{ id: 'eternl', name: 'Eternl', icon: 'data:image/png;base64,…', version: '…' }]

// 2. Ask one of them for permission. This is where the wallet popup appears.
const wallet = await MeshCardanoBrowserWallet.enable('eternl');

// 3. Which network is it on? 0 = testnet, 1 = mainnet
const networkId = await wallet.getNetworkId();
```

Guard on that network id before you do anything else:

```tsx
if ((await wallet.getNetworkId()) !== 0) {
  throw new Error('Switch the wallet to Preview testnet before continuing.');
}
```

Two things that surprise people:

- `getInstalledWallets()` returns nothing until the extension is installed **and the page has been reloaded**. Extensions inject themselves at page load.
- `enable()` rejects if the user declines. Catch it and show a message; do not retry in a loop, because each attempt reopens the wallet popup.

## Read the address and the funds

```tsx
const changeAddress = await wallet.getChangeAddressBech32();
// "addr_test1qz…"

const utxos = await wallet.getUtxosMesh();
// [{ input: { txHash, outputIndex }, output: { address, amount: [{ unit: 'lovelace', quantity }] } }]

const balance = await wallet.getBalanceMesh();
const lovelace = balance.find((a) => a.unit === 'lovelace')?.quantity ?? '0';
console.log(`${Number(lovelace) / 1_000_000} tADA`);
```

Amounts are always integers of the smallest unit. One ADA is `1_000_000` lovelace, and every quantity in the Mesh API is a **string**, not a number, because some tokens have 19 decimal places and JavaScript integers cannot hold them.

## Build the payment

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

That `recipient` address is any `addr_test1…` you control or trust. Sending to a second address in your own wallet is the safest first run: you can see the exact amount arrive.

`complete()` is the step that talks to the provider for protocol parameters. If it throws `Blockfrost error: 403`, the key is wrong or belongs to another network.

## Do the arithmetic before you sign

A user should never see their first error message from the wallet. Three of the numbers a payment form needs are pure arithmetic, so they can run in the page before any wallet is involved. Edit this and watch it react:

```jsx live
function PreflightCalculator() {
  const [ada, setAda] = React.useState(5);
  const [assetName, setAssetName] = React.useState('TOKEN');
  const [address, setAddress] = React.useState('addr_test1vqh');

  // Cardano amounts are integers in lovelace, and 1 ADA is 1,000,000 lovelace.
  const lovelace = Math.round(ada * 1e6);

  // A native asset is identified as policyId + assetName in hex, no separator.
  const policyId = '86a9c2c1cf0e1b3b7d5e6c1b9f3f0f2b1c8a4b1a2c3d4e5f6a7b8c9d';
  const hex = [...new TextEncoder().encode(assetName)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  const unit = policyId + hex;

  // The prefix tells you the network, and sending to the wrong one is the classic mistake.
  const network = address.startsWith('addr_test1')
    ? 'preview / preprod testnet'
    : address.startsWith('addr1')
      ? 'mainnet'
      : 'not a Cardano address';

  const ok = network !== 'not a Cardano address';

  return (
    <div style={{ fontFamily: 'inherit', fontSize: 14, lineHeight: 1.6 }}>
      <label style={{ display: 'block', marginBottom: 8 }}>
        Amount in ADA{' '}
        <input
          type="number"
          value={ada}
          onChange={(e) => setAda(Number(e.target.value))}
          style={{ width: 90, padding: '2px 6px' }}
        />
      </label>
      <label style={{ display: 'block', marginBottom: 8 }}>
        Asset name{' '}
        <input
          value={assetName}
          onChange={(e) => setAssetName(e.target.value)}
          style={{ width: 140, padding: '2px 6px' }}
        />
      </label>
      <label style={{ display: 'block', marginBottom: 12 }}>
        Recipient{' '}
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: 420, padding: '2px 6px' }}
        />
      </label>
      <table style={{ borderCollapse: 'collapse', fontSize: 13 }}>
        <tbody>
          <tr>
            <td style={{ padding: '2px 12px 2px 0' }}>quantity</td>
            <td><code>{String(lovelace)}</code> lovelace</td>
          </tr>
          <tr>
            <td style={{ padding: '2px 12px 2px 0' }}>unit</td>
            <td><code>{unit.slice(0, 16)}…{unit.slice(-8)}</code></td>
          </tr>
          <tr>
            <td style={{ padding: '2px 12px 2px 0' }}>network</td>
            <td style={{ color: ok ? '#0a7c42' : '#c13a0b', fontWeight: 600 }}>
              {network}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
```

Type an `addr1` prefix into the last field and the network line changes to mainnet before any wallet is involved, which is exactly the mistake this label is there to catch: a testnet wallet will refuse the transaction, and the reader finds out here rather than after signing. Use the same `quantity` and `unit` strings in `txBuilder.txOut()`.

## Sign and submit

Signing is the wallet's job, and submission can be too:

```tsx
const signedTx = await wallet.signTx(unsignedTx, false);   // false = not a multi-sig
const txHash = await wallet.submitTx(signedTx);
console.log(`Submitted: ${txHash}`);
```

The second argument to `signTx` is `partialSign`. It matters only when more than one party has to sign; pass `false` for a single-signature payment.

You can also submit through the provider (`provider.submitTx(signedTx)`) when the transaction is signed by a key your server holds rather than by the browser wallet. For this walkthrough, submitting through the wallet is the shorter path.

## Confirm it landed

A transaction hash is not a receipt. Poll until the chain says otherwise:

```tsx
provider.onTxConfirmed(txHash, () => {
  console.log('Confirmed');
});
```

Or paste the hash into the search box at [preview.cexplorer.io](https://preview.cexplorer.io/) and read the inputs, outputs and fee on the block explorer. That page is also the fastest way to confirm the recipient address matches what you intended.

## The whole thing, in one component

```tsx
'use client';

import { useState } from 'react';
import { MeshCardanoBrowserWallet } from '@meshsdk/wallet';
import { BlockfrostProvider, MeshTxBuilder } from '@meshsdk/core';

const provider = new BlockfrostProvider(process.env.NEXT_PUBLIC_BLOCKFROST_KEY!);

export default function Payment() {
  const [status, setStatus] = useState<string>('Not connected');

  async function pay() {
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
  }

  return (
    <div>
      <button onClick={pay}>Send 5 tADA</button>
      <p>{status}</p>
    </div>
  );
}
```

Put the key in `.env.local` so it is not committed:

```
NEXT_PUBLIC_BLOCKFROST_KEY=preview…
```

`NEXT_PUBLIC_` means the key is visible in the browser. That is acceptable for a preview project key and unacceptable for anything else; the Blockfrost docs are explicit that a project key is not a secret once it is in front-end code.

## Troubleshooting

**"No wallets found" / the list is empty.** The extension is installed but the page loaded before it. Reload. If it is still empty, the wallet is disabled for this site, or it is not a CIP-30 wallet.

**Wrong network.** `addr1…` instead of `addr_test1…` means the wallet is on mainnet. Switch the network in the wallet, not in your app, then reload.

**`Blockfrost error: 403` or "project not found".** The key is invalid, or it was created for a different network than the addresses you are using. A mainnet key and a preview address will never work together.

**"Not enough funds" / the fee cannot be covered.** Test ADA has not arrived yet, or you are trying to send more than the wallet holds. Leave at least ~2 tADA for fees and the minimum ADA per output.

**"UTxOs are not available" right after a transaction.** The wallet has not refreshed. Wait a few seconds and call `getUtxosMesh()` again before rebuilding.

**Missing collateral.** Collateral is required only for transactions that run Plutus scripts, and a plain ADA payment is not one. If you later add a smart contract call, get it with `wallet.getCollateralMesh()` and pass it to the builder; wallets also expose a way to set collateral, and Mesh has a guide for it.

**"User rejected the request".** The wallet popup was dismissed. Surface it as a message rather than an error toast, and let the user try again when they choose to.

## Where to go next

- [Browser Wallet API (Mesh)](https://meshjs.dev/apis/wallets/browserwallet): every CIP-30 method Mesh wraps, including `signData` for proving ownership.
- [Mesh transaction builder](https://meshjs.dev/apis/txbuilder): minting, multi-asset payments, metadata, TTL and script interactions.
- [Blockfrost provider](https://meshjs.dev/providers/blockfrost): the rest of the chain-data API, and `onTxConfirmed`.
- [CIP-30](https://cips.cardano.org/cip/CIP-30): the standard behind the connect flow, worth reading once.
- [Getting started](/docs/getting-started/): the rest of the Developer Experience track, including the session archive.

Once this works on preview, the same code runs on mainnet by switching the network and the provider key. Do that only after you have handled the two things preview lets you skip: showing the user the fee before they sign, and treating any address you did not personally type as untrusted input.
