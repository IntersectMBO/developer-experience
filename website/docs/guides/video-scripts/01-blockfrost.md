# Video Script — Blockfrost
*~3 min | Target: dApp developers new to Cardano data querying*

---

If you've just started building on Cardano, one of the first questions you'll hit is: how do I actually query blockchain data?

How do I check a wallet balance? Get a list of transactions? Look up what's sitting at a script address?

The Cardano node doesn't answer those questions directly. It's designed to validate and follow the chain — not to serve arbitrary queries. So you need an indexing layer on top of it.

The easiest way to get there is **Blockfrost**.

---

Blockfrost is a hosted REST API. You sign up, get an API key, and you're querying Cardano data in minutes. No node to run, no database to set up, no infrastructure to manage. Just HTTP requests.

You can query address balances, UTxO sets, transaction history, block data, native assets, stake pool info, smart contract datums and scripts — pretty much everything you'd need for a dApp frontend or backend.

There are official SDKs for JavaScript, TypeScript, Python, Go, Rust, and a few more. The free tier is generous enough to cover development and most small projects.

---

So when should you use it?

Blockfrost is the right starting point for almost every Cardano project. Hackathons, prototypes, workshops, early-stage dApps — if you're trying to move fast and not spend your first week wrestling with infrastructure, use Blockfrost.

It's also viable in production if your use case doesn't require custom indexing logic and you're comfortable depending on a managed third-party service.

---

That said, there are cases where you'll outgrow it.

The free tier has rate limits. You can't extend what it indexes — you query what Blockfrost exposes, nothing more. If you need a custom data slice, high-throughput queries, or full ownership of your data layer, you'll want to self-host something like Kupo or Yaci Store.

But here's the thing: most projects start with Blockfrost and switch out the data layer later, when they actually need to. That's the right call. Don't over-engineer your data layer on day one.

---

To get started, head to blockfrost.io, create a free account, grab your project ID, and run:

```bash
npm install @blockfrost/blockfrost-js
```

That's it. You're querying Cardano.

In the next video, we'll look at Kupo — the tool you'll likely reach for once you want to self-host your own transaction output index.

---
*Word count: ~370 | Est. runtime: ~2m 50s*
