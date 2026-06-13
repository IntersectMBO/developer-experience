# Video Script — Kupo
*~3 min | Target: dApp developers moving beyond hosted APIs*

---

Once you decide to self-host your Cardano data layer, the first tool most developers reach for is **Kupo**.

Kupo is a lightweight, fast chain indexer from CardanoSolutions. And unlike the big full-chain indexers, it has a very specific job: it watches the blockchain for transaction outputs that match patterns you define, and builds a lookup table of everything it finds.

That's it. That narrow focus is exactly what makes it useful.

---

Here's how it works.

You give Kupo a list of patterns — an address, a set of addresses, a policy ID, a script hash. Kupo connects to your Cardano node through Ogmios — which is a required dependency, not optional — and starts watching the chain. Every time a transaction output matches one of your patterns, Kupo records it: the output reference, the ADA and native asset values, any attached datum, any associated script.

You query that data through a clean HTTP API.

Crucially, Kupo tracks both **spent and unspent** outputs. So you can look up the full history of outputs matching your patterns, not just what's currently sitting unspent.

---

Why does the narrow scope matter?

Because it means Kupo stays small. If you're only indexing a handful of addresses — say, your dApp's contract addresses — your database stays tiny and your queries stay fast. You're not pulling the weight of the entire Cardano ledger.

This makes Kupo a great fit for smart contract backends, wallet infrastructure, and any dApp that needs reliable, low-latency output queries without the operational overhead of running something like DB Sync.

---

Now, what Kupo does *not* do.

It doesn't index staking data, reward balances, delegation history, governance information, or metadata labels. If your output matching patterns don't cover it, Kupo doesn't know about it. It's scoped to transaction outputs — nothing beyond that.

For staking and full-ledger queries, you'll need DB Sync or Yaci Store.

---

One more thing on setup: Kupo requires **both** a running Cardano node and a running Ogmios instance. Ogmios acts as the bridge between Kupo and the node. If you don't want to manage that yourself, Demeter.run offers hosted Kupo instances you can point at directly.

---

To get started, head to cardanosolutions.github.io/kupo. The docs walk you through configuring your first pattern and running your first query.

In the next video, we'll look at Oura — which takes a completely different approach and turns Cardano into a real-time event stream.

---
*Word count: ~390 | Est. runtime: ~3m*
