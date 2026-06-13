# Video Script — Cardano DB Sync
*~3 min | Target: teams building explorers, analytics, or reporting tools*

---

Every tool we've covered so far makes a deliberate trade-off: index less, stay fast and lean. Kupo ignores everything that isn't a transaction output. Oura streams events without storing them. Yaci Store is modular and can be scoped down.

**Cardano DB Sync** makes the opposite trade-off. It indexes everything.

---

DB Sync is maintained by IOG — Input Output Global, the team that built Cardano. It connects to a running Cardano node, follows the chain, and writes the entire ledger into a PostgreSQL database.

Every transaction. Every address. Every stake delegation. Every reward. Every governance action. Every native asset mint and burn. Every Plutus script execution. Every metadata attachment. All of it, normalized into SQL tables, queryable with plain SQL.

Block explorers like Cardanoscan run on DB Sync. Analytics platforms run on DB Sync. Any application that needs to ask arbitrary questions across the full history of the chain — DB Sync is the foundation.

---

The power here is flexibility.

With DB Sync, you don't have to know in advance what data you're going to need. You can join across tables, write complex queries, aggregate historical data in ways you couldn't predict at design time. If you're building a reporting tool, a compliance dashboard, or a data science pipeline, that flexibility is worth a lot.

---

Now, the cost of that flexibility.

DB Sync is resource-intensive. A full mainnet sync takes significant time and disk space — we're talking hundreds of gigabytes of PostgreSQL data. It is absolutely not something you spin up locally for a development environment.

For workshops, development, and testing, the right approach is to point at a hosted DB Sync instance. Demeter.run provides one. Several other infrastructure providers do too.

And for many applications, DB Sync is simply overkill. If you only need UTxO data for a specific set of addresses, Kupo does that job at a fraction of the resource cost. DB Sync makes sense when you genuinely need the full ledger, not as a default starting point.

---

To get started with self-hosting, head to github.com/intersectmbo/cardano-db-sync. If you want a hosted instance without the infrastructure work, Demeter.run is the easiest route.

---

That wraps up our series on Cardano data pipelines. We've covered Blockfrost for fast hosted access, Kupo for lightweight self-hosted output indexing, Oura for real-time event streaming, Yaci Store for the JVM ecosystem and governance data, and DB Sync for full-ledger SQL access.

The full technical guide — with a comparison table and guidance on choosing between these tools — is linked in the description.

---
*Word count: ~390 | Est. runtime: ~3m*
