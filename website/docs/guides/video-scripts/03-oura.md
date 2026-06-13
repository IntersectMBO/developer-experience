# Video Script — Oura
*~3 min | Target: developers building event-driven or analytics systems*

---

All the tools we've looked at so far — Blockfrost, Kupo — are built around the idea of **querying** data. You ask a question, you get an answer.

Oura works differently. Instead of answering queries, it **streams events**.

---

Oura is a Rust-native pipeline from TxPipe. You connect it to a Cardano node, define filters for the events you care about, and it starts pushing those events to wherever you want them to go.

The name is a nod to Ouroboros — Cardano's consensus protocol, which itself references the ancient symbol of a serpent consuming its own tail. The idea being: Oura feeds the chain's data back into your systems, continuously.

---

So what are these events?

Every block, every transaction, every output, every datum, every metadata attachment — Oura can observe all of it and emit structured, self-contained event payloads as they happen.

You don't poll. You don't query. You just receive.

And where do those events go? Oura supports a range of sinks out of the box:

- **Kafka** — for feeding data pipelines and downstream consumers
- **Elasticsearch** — for search and analytics
- **Webhooks** — to trigger your application logic directly when something happens on chain
- **stdout** — useful for development and debugging
- **Redis** — used by another TxPipe tool, Scrolls, under the hood

---

When does this model make sense?

Oura is the right tool when you want to **react** to on-chain activity, rather than query historical state. Think notification systems — "alert me when this address receives ADA." Think analytics pipelines — "stream every NFT mint into Elasticsearch." Think event-driven architectures where Cardano is one input among many.

It's also used as the underlying engine for other tools in the ecosystem, like Carp and Scrolls.

---

And here's the important trade-off to understand.

Oura is a pipeline, not a store. It doesn't hold your data, and it doesn't provide a query API. Once an event is emitted, what happens to it is your problem. You need a storage layer — Kafka, Elasticsearch, a database — if you want to query that data later.

That's not a flaw, it's the design. Oura does one thing: it moves chain events into your infrastructure, fast and reliably. What you build on top of that is up to you.

---

To get started, head to github.com/txpipe/oura. It's written in Rust and ships as a single binary — no runtime dependencies beyond access to a Cardano node.

Next up: Yaci Store — a full-featured Java indexer with a built-in REST API, and the tool of choice for JVM teams and anyone who needs Cardano governance data.

---
*Word count: ~400 | Est. runtime: ~3m 5s*
