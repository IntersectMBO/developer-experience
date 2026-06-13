# Video Script — Yaci Store
*~3 min | Target: Java/JVM developers; teams needing governance data*

---

If you're building on the JVM, or you need Cardano governance data, or you just want a self-hosted indexer that comes with a REST API built in — **Yaci Store** is where you should look.

---

Yaci Store is an open-source Cardano blockchain indexer maintained by the Cardano Foundation, built on the Bloxbean libraries. It's written in Java, it's modular, and it ships with a Blockfrost-compatible REST API out of the box.

That last part matters. Blockfrost-compatible means any SDK or tool already wired up to Blockfrost — including the Blaze TypeScript SDK — can point at a self-hosted Yaci Store instance with minimal configuration changes. You're not rewriting your data layer; you're swapping the URL.

---

Here's what sets it apart.

First, **governance data**. Yaci Store has full support for Cardano's on-chain governance system — DRep delegations, voting power, proposal outcomes. If your application touches CIP-1694 governance in any way, Yaci Store is one of the most complete indexers for that data right now.

Second, **embeddability**. You can run Yaci Store as a standalone service, or you can embed it directly into an existing Java Spring Boot application. If you're already running a Java backend, you don't need to add a separate process — Yaci Store can be part of your application.

Third, **the plugin framework**. If the built-in indexing behaviour doesn't cover your use case, you can extend it without forking the core code. Write a plugin, register it, and Yaci Store handles the rest.

---

For local development, there's **Yaci DevKit** — a Docker-based setup that bundles Yaci Store with a local Cardano node and a browser-based block explorer called Yaci Viewer. You get a full local devnet running in seconds, with the Blockfrost-compatible API available at localhost:8080.

We have a full guide on using Yaci DevKit with the Blaze SDK — link in the description.

---

Now, the limitations.

Yaci Store is a JVM tool. If your team works in TypeScript, Python, or Rust, you're going to find Kupo or Oura more natural. It's also heavier than those tools — it's doing more, so it costs more to run. For simple single-purpose use cases, you may not need everything it provides.

---

To get started, head to github.com/bloxbean/yaci-store. For the local devnet route, check out the Yaci DevKit docs at devkit.yaci.xyz.

In the final video, we'll look at Cardano DB Sync — the full-ledger SQL database that powers block explorers and analytics platforms across the ecosystem.

---
*Word count: ~400 | Est. runtime: ~3m 5s*
