---
title: "Session 14: CIP-68 NFT Standard"
sidebar_label: Session
sidebar_position: 1
slug: /working-group/q1-2026/sessions/14-cip-68-nft-standard/session-notes
---

# CIP-68 NFT Standard — Lecture Notes

## 1. Background

Early Cardano NFTs followed **CIP-25**, where metadata was stored in the minting transaction.

### Limitations of CIP-25

- Metadata becomes **immutable after mint**
- **Smart contracts cannot read metadata**
- Difficult to build **dynamic or evolving NFTs**
- Requires **off-chain infrastructure** for interpretation

To solve these limitations, Cardano introduced **CIP-68**, a modern NFT architecture enabling **programmable assets**.

---

# 2. Core Idea of CIP-68

CIP-68 separates **NFT ownership** from **metadata storage**.

Instead of minting a single token, a project mints **two tokens**:

### User NFT
- Held in a user's wallet
- Represents the actual NFT

### Reference NFT
- Stored in a smart contract UTxO
- Contains metadata in the **datum**

This structure allows metadata to be **read by smart contracts and updated if allowed by the script**.

---

# 3. Token Labels

CIP-68 uses labels defined in **CIP-67** to distinguish token types.

| Label | Purpose |
|------|------|
| 100 | Reference NFT (metadata holder) |
| 222 | User NFT |
| 333 | Fungible Token |
| 444 | Rich Fungible Token |

Example:

```
(222)DragonSword
(100)DragonSword
```

Both tokens share:
- the same policy ID
- the same asset name
- but use different labels.

# 4. Metadata Storage

Metadata is stored inside a datum attached to the UTxO holding the reference NFT.

Example structure:

```
datum = [
  metadata,
  version,
  extra
]
```

Example metadata:

```
{
  "name": "Dragon Sword",
  "image": "ipfs://Qm123...",
  "description": "Legendary weapon",
  "attributes": {
    "damage": 120,
    "rarity": "legendary"
  }
}
```

Advantages:
- Metadata lives on-chain
- Smart contracts can read and validate metadata
- Metadata can be updated under controlled conditions


# 5. Metadata Lookup Process

When a wallet encounters an NFT:

`policyID.(222)DragonSword`

The system derives the reference token:

`policyID.(100)DragonSword`

Then:

- 1. Locate the UTxO containing the reference NFT

- 2. Read the datum attached to that UTxO

- 3. Decode the metadata

This process ensures deterministic metadata discovery.


# 6. Smart NFT Capabilities

CIP-68 enables programmable NFTs.

Examples:

**Dynamic NFTs**

NFT attributes evolve over time.

```
level
skills
appearance
```
**Membership NFTs**

```
tier
expiration date
privileges
```

**Reputation NFTs**

```
DAO participation
achievements
contributions
```

**DeFi Position NFTs**

NFTs representing:

```
liquidity positions
loans
staking records
```

# 7. Development Stack

Typical Cardano NFT development stack:

**Smart Contracts**

- Plutus V2
- Aiken
- Helios

**SDKs**
- Lucid
- MeshJS
- Cardano Serialization Library

**Infrastructure**

- Blockfrost
- Ogmios
- Kupo

**Storage**

- IPFS
- Arweave


# 8. Minting Flow

Modern NFT minting using CIP-68 follows these steps.

1. Create Minting Policy

Defines mint conditions.

**Examples:**

- one-time mint
- time-locked mint
- DAO-controlled mint

2. Mint Two Tokens

For each NFT:

```
(222)UserNFT
(100)ReferenceNFT
```

3. Lock Reference NFT

Send the reference NFT to a script address.
Attach metadata inside the datum.

4. Distribute User NFT

The user token (222) is sent to the buyer’s wallet.
Wallets and marketplaces retrieve metadata from the reference NFT.


# 9. Best Practices

When designing NFT projects:

**Decide Metadata Type:**
- immutable
- semi-dynamic
- fully dynamic

**Separate Components**

Recommended architecture:

- mint policy
- metadata contract
- application logic contract

**Secure Metadata Updates**

Ensure only authorized scripts can update metadata.

**Store Media Off-Chain**

Images and large files should be stored on:

- IPFS
- Arweave

The blockchain should store references and hashes.

# 10. When to Use CIP-68

Use CIP-68 when NFTs require:

- dynamic metadata
- smart contract interaction
- on-chain logic
- evolving assets

Examples:

- games
- DAO memberships
- DeFi positions
- identity systems

For simple static art collections, CIP-25 may still be sufficient.

# 11. Summary

CIP-68 introduces programmable NFTs to Cardano by:

- separating ownership from metadata
- storing metadata on-chain
- enabling smart contract interaction

This architecture forms the foundation for:
- dynamic NFTs
- decentralized identity
- on-chain gaming assets
- financial NFTs

CIP-68 is now considered the modern standard for advanced NFT development on Cardano.