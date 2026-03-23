---
title: "Cardano Developer Pathway"
sidebar_label: Session Notes
sidebar_position: 1
---

# Cardano Developer Pathway

## From Zero to Core Contributor or dApp Builder - All Possibilities

The diagrams below show the full pathway and companion views. For the full explication, see [Resources](../session-resources/readme.md).

---

### Full pathway diagram

```mermaid
flowchart TD
    START([🚀 Where are you starting from?])

    START --> BEGINNER[Complete beginner<br/>No code background]
    START --> WEB2[Web2 developer<br/>JS · Python · Rust · Java · Haskell]
    START --> DESIGNER[Designer / UI-UX<br/>Figma · CSS · UX]

    BEGINNER --> FUNDAMENTALS
    WEB2 --> FUNDAMENTALS
    DESIGNER --> FUNDAMENTALS

    FUNDAMENTALS["📚 Cardano fundamentals<br/>eUTxO model · native tokens · Ouroboros · governance · CIPs"]

    FUNDAMENTALS --> LEARN_FUND["🎓 Learn here<br/>Cardano Academy · IOG Academy<br/>developers.cardano.org · Gimbalabs"]

    FUNDAMENTALS --> CHOOSE{Choose your track}

    CHOOSE --> TRACK_SC["⚙️ Smart contracts<br/>On-chain logic"]
    CHOOSE --> TRACK_FE["🖥️ Frontend dApp<br/>JS · React · Next.js"]
    CHOOSE --> TRACK_INFRA["🔧 Infrastructure<br/>Node · indexers · APIs"]
    CHOOSE --> TRACK_MARLOWE["📊 Finance / no-code<br/>Marlowe DSL"]

    TRACK_SC --> LANG_CHOICE{Language choice}

    LANG_CHOICE --> AIKEN["🦀 Aiken<br/>Rust-like · most popular 2025"]
    LANG_CHOICE --> PLUTUS["λ Plutus V3<br/>Haskell · maximum control"]
    LANG_CHOICE --> OTHERS_SC["Other languages<br/>OpShin · Helios · Scalus · Plu-ts"]

    AIKEN --> AIKEN_LEARN["📖 Aiken learning path<br/>aiken-lang.org · stdlib<br/>Gimbalabs PBL · Discord"]
    PLUTUS --> PLUTUS_LEARN["📖 Plutus learning path<br/>IOG Haskell Bootcamp<br/>Plutus Pioneer Program<br/>10 weeks · 10 hrs/week"]

    AIKEN_LEARN --> SC_BUILD
    PLUTUS_LEARN --> SC_BUILD
    OTHERS_SC --> SC_BUILD

    SC_BUILD["✍️ Write validators + scripts<br/>eUTxO patterns · datum · redeemer<br/>ScriptContext · minting policies"]

    TRACK_FE --> SDK_CHOICE{SDK choice}

    SDK_CHOICE --> MESHJS["MeshJS<br/>TS · beginners · full toolkit"]
    SDK_CHOICE --> LUCID["Lucid-evo<br/>TS · flexible tx builder"]
    SDK_CHOICE --> BLAZE["Blaze<br/>TS · modern API"]
    SDK_CHOICE --> OTHER_SDK["Others<br/>CTL · PyCardano · Atlas"]

    MESHJS --> WALLET_INT
    LUCID --> WALLET_INT
    BLAZE --> WALLET_INT
    OTHER_SDK --> WALLET_INT

    WALLET_INT["🔗 Wallet integration<br/>CIP-30 · CIP-95 · CIP-62<br/>Eternl · Lace · Nami · Vespr"]
    WALLET_INT --> FE_BUILD["🎨 Build dApp UI<br/>Tx builder · chain queries · state"]

    TRACK_INFRA --> NODE["⬛ Cardano node + CLI<br/>cardano-course.gitbook.io<br/>raw tx · KES keys · epoch mechanics"]

    NODE --> INDEXER["🗄️ Indexing layer<br/>DB-Sync · Kupo · Scrolls<br/>Oura · Carp"]
    INDEXER --> API_LAYER["🌐 API / middleware<br/>Ogmios · Blockfrost<br/>Koios · Maestro"]
    API_LAYER --> SPO["⛓️ Stake pool operation<br/>SPO · DevOps · Grafana<br/>Prometheus · monitoring"]

    TRACK_MARLOWE --> MARLOWE_LEARN["📖 Marlowe Pioneer Program<br/>IOG · 7 weeks · no Haskell needed"]
    MARLOWE_LEARN --> MARLOWE_PLAY["🎮 Marlowe Playground<br/>Visual Blockly editor<br/>Haskell · JS interfaces"]
    MARLOWE_PLAY --> MARLOWE_BUILD["💰 Financial dApps<br/>Loans · escrow · options<br/>bonds · swaps · DCA"]

    DESIGNER --> UX_LEARN["🎓 Learn Web3 UX patterns<br/>Wallet approval flows<br/>tx pending states · fee UX"]
    UX_LEARN --> FE_BUILD

    SC_BUILD --> FULLSTACK
    FE_BUILD --> FULLSTACK
    SPO --> FULLSTACK
    MARLOWE_BUILD --> FULLSTACK

    FULLSTACK["🔄 Full-stack dApp integration<br/>On-chain validator + off-chain Tx builder<br/>+ Frontend UI + Chain data API"]

    FULLSTACK --> TESTING["🧪 Testing + security<br/>Aiken tests · Plutarch · audit<br/>Demeter preview · property-based tests"]

    TESTING --> AUDIT{"Security audit<br/>needed?"}
    AUDIT -->|DeFi protocol| AUDIT_FIRM["🔍 External audit<br/>Tweag · Anastasia Labs<br/>MLabs · Vacuum Labs"]
    AUDIT -->|Simple dApp| TESTNET

    AUDIT_FIRM --> TESTNET

    TESTNET["🧪 Testnet deployment<br/>Preview · Pre-prod · Sanchonet<br/>Demeter workspaces"]
    TESTNET --> MAINNET["🚀 Mainnet launch<br/>DeFi · NFT · DAO · RWA · Gaming"]

    MAINNET --> CATALYST["💰 Project Catalyst<br/>Quarterly funding · $10k–$500k<br/>projectcatalyst.io"]
    MAINNET --> COMMUNITY["👥 Community hubs<br/>Discord · Stack Exchange<br/>Cardano Forum · Twitter/X"]

    CATALYST --> ADVANCED
    COMMUNITY --> ADVANCED

    ADVANCED{Advanced specialisation}

    ADVANCED --> CORE["🧬 Core protocol<br/>Haskell · IOG · Intersect MBO<br/>CIP author · ledger contributor"]
    ADVANCED --> DEFI["📈 DeFi dApp founder<br/>DEX · lending · stablecoin<br/>yield farming · options"]
    ADVANCED --> INFRA_ADV["⚡ Infra / L2<br/>Hydra · Mithril · ZK<br/>Pallas · Dolos · bridges"]
    ADVANCED --> NFT_GAME["🎮 NFT / Gaming<br/>Marketplace · GameFi<br/>Metaverse · RWA"]
    ADVANCED --> GOV["🏛️ Governance<br/>DRep · Intersect<br/>Voltaire · DAO builder"]

    CORE --> OUTCOME
    DEFI --> OUTCOME
    INFRA_ADV --> OUTCOME
    NFT_GAME --> OUTCOME
    GOV --> OUTCOME

    OUTCOME(["🏆 You become: Core contributor or dApp builder<br/>Where: Freelance, startup, IOG, Cardano Foundation, Emurgo, or open source<br/>Earn: Funds + salary, Catalyst grants, or equity"])

    OUTCOME -->|keep building| CATALYST

    classDef sc fill:#EEEDFE,stroke:#534AB7,color:#3C3489
    classDef fe fill:#E1F5EE,stroke:#0F6E56,color:#085041
    classDef infra fill:#FAECE7,stroke:#993C1D,color:#712B13
    classDef learn fill:#E6F1FB,stroke:#185FA5,color:#0C447C
    classDef marlowe fill:#FAEEDA,stroke:#854F0B,color:#633806
    classDef outcome fill:#FBEAF0,stroke:#993556,color:#72243E
    classDef neutral fill:#F1EFE8,stroke:#5F5E5A,color:#444441
    classDef decision fill:#F1EFE8,stroke:#888780,color:#2C2C2A

    class SC_BUILD,AIKEN,PLUTUS,OTHERS_SC,AIKEN_LEARN,PLUTUS_LEARN,LANG_CHOICE sc
    class FE_BUILD,MESHJS,LUCID,BLAZE,OTHER_SDK,WALLET_INT,SDK_CHOICE,UX_LEARN fe
    class NODE,INDEXER,API_LAYER,SPO,INFRA_ADV infra
    class FUNDAMENTALS,LEARN_FUND,MARLOWE_LEARN,MARLOWE_PLAY learn
    class MARLOWE_BUILD,TRACK_MARLOWE marlowe
    class OUTCOME,CORE,DEFI,NFT_GAME,GOV outcome
    class START,BEGINNER,WEB2,DESIGNER,FULLSTACK,TESTING,TESTNET,MAINNET,COMMUNITY,CATALYST,AUDIT_FIRM neutral
    class CHOOSE,ADVANCED,AUDIT,LANG_CHOICE,SDK_CHOICE decision
```

---

### Tools and platforms reference

```mermaid
flowchart LR
    subgraph LANG["On-chain languages"]
        AIKEN["Aiken<br/>Rust-like · ⭐ recommended"]
        PLUTUS["Plutus V3<br/>Haskell"]
        OPSHIN["OpShin<br/>Python"]
        HELIOS["Helios<br/>JS-like"]
        SCALUS["Scalus<br/>Scala 3"]
        MARLOWE_L["Marlowe<br/>DSL Finance"]
        PLUTS["Plu-ts<br/>TypeScript"]
    end

    subgraph SDK["Off-chain SDKs"]
        MESH["MeshJS<br/>TS · beginners"]
        LUCID2["Lucid-evo<br/>TS · flexible"]
        BLAZE2["Blaze<br/>TS · modern"]
        EVOLUTION["Evolution SDK<br/>Cardano SDK"]
        PYCARDANO["PyCardano<br/>Python"]
        CTL["CTL<br/>PureScript"]
        ATLAS["Atlas<br/>Haskell"]
    end

    subgraph API["APIs & indexers"]
        BLOCKFROST["Blockfrost<br/>REST · free tier"]
        KOIOS["Koios<br/>REST · decentralised"]
        MAESTRO["Maestro<br/>Events · managed"]
        OGMIOS["Ogmios<br/>WebSocket · node bridge"]
        KUPO["Kupo<br/>UTxO indexer"]
        OURA["Oura<br/>Event pipeline"]
        DBSYNC["DB-Sync<br/>Full PostgreSQL"]
    end

    subgraph ENV["Dev environments"]
        DEMETER["Demeter.run<br/>Cloud workspaces"]
        KUBIDE["KuberIDE<br/>Browser IDE"]
        CLI["cardano-cli<br/>Node control"]
        NIX["Nix dev shells<br/>Reproducible"]
    end

    subgraph LEARN2["Learning platforms"]
        CF_ACAD["Cardano Academy<br/>Free · certifications"]
        IOG_ACAD["IOG Academy<br/>Haskell + Plutus"]
        GIMBAL["Gimbalabs<br/>Project-based"]
        DEV_PORTAL["Developer Portal<br/>developers.cardano.org"]
        CARDANO_COURSE["Cardano Course<br/>Node · CLI · gitbook"]
    end

    subgraph L2["Advanced / L2 / ZK"]
        HYDRA["Hydra<br/>L2 state channels"]
        MITHRIL["Mithril<br/>Light clients · sig"]
        ZKFOLD["zkFold<br/>Zero-knowledge"]
        PALLAS["Pallas / Dolos<br/>Rust node"]
    end

    subgraph GOV2["Governance tooling"]
        GOVTOOL["GovTool<br/>DRep · CIP-1694"]
        INTERSECT2["Intersect MBO<br/>Committees"]
        CATALYST2["Project Catalyst<br/>Funding DAOs"]
        AGORA["Agora<br/>On-chain DAO lib"]
    end
```

---

### Web2 to Web3 transition paths

```mermaid
flowchart LR
    JS["JS / TypeScript<br/>React · Node"] -->|learn| JS2["UTxO · CIP-30<br/>wallet patterns"]
    JS2 -->|use| JS3["MeshJS · Lucid · Blaze<br/>+ Aiken validators"]
    JS3 -->|become| JS4[("Full-stack<br/>dApp dev")]

    PY["Python<br/>data · backend"] -->|learn| PY2["UTxO · tx building<br/>CBOR · chain data"]
    PY2 -->|use| PY3["PyCardano · OpShin<br/>Python smart contracts"]
    PY3 -->|become| PY4[("Backend dev<br/>+ SC builder")]

    RUST["Rust<br/>systems · WASM"] -->|learn| RUST2["Pallas · CBOR<br/>node internals"]
    RUST2 -->|use| RUST3["Pallas · Dolos · Oura<br/>Scrolls · TxPipe"]
    RUST3 -->|become| RUST4[("Infra engineer<br/>core tooling")]

    JVM["Java / Kotlin / Scala<br/>JVM ecosystem"] -->|learn| JVM2["eUTxO · CBOR<br/>JVM serialisation"]
    JVM2 -->|use| JVM3["Cardano Client Lib<br/>Scalus · Kogmios"]
    JVM3 -->|become| JVM4[("Enterprise<br/>backend dev")]

    HS["Haskell / FP<br/>functional langs"] -->|learn| HS2["Plutus · Plutarch<br/>ledger · Ouroboros"]
    HS2 -->|use| HS3["Plutus Pioneer Program<br/>IOG core team"]
    HS3 -->|become| HS4[("Core protocol<br/>contributor")]

    DEVOPS["DevOps / SRE<br/>Linux · Docker · K8s"] -->|learn| DO2["Node setup · relays<br/>KES rotation · topology"]
    DO2 -->|use| DO3["cardano-cli · Demeter<br/>SPO setup guides"]
    DO3 -->|become| DO4[("SPO operator<br/>Infra engineer")]

    UIUX["UI/UX Designer<br/>Figma · CSS · motion"] -->|learn| UX2["Wallet UX patterns<br/>Web3 mental models<br/>tx pending states"]
    UX2 -->|use| UX3["MeshJS starter kits<br/>React + CIP-30"]
    UX3 -->|become| UX4[("dApp UX designer<br/>NFT marketplace")]

    FIN["Finance / business<br/>no-code background"] -->|learn| FIN2["Smart contract logic<br/>DeFi primitives"]
    FIN2 -->|use| FIN3["Marlowe Pioneer<br/>Playground · no-code"]
    FIN3 -->|become| FIN4[("DeFi product<br/>FinSC builder")]

    SOL["Solidity / EVM<br/>Ethereum · Hardhat"] -->|learn| SOL2["UTxO vs accounts<br/>eUTxO patterns<br/>no msg.sender"]
    SOL2 -->|use| SOL3["Aiken fast track<br/>Lucid / Blaze<br/>familiar syntax"]
    SOL3 -->|become| SOL4[("dApp dev<br/>fastest entry path")]
```

---

### Career outcomes

```mermaid
flowchart TD
    DEV(["Cardano developer"])

    DEV --> SC_DEV["Smart contract dev<br/>Aiken · Plutus<br/>$80k–$180k+"]
    DEV --> FE_DEV["Frontend dApp engineer<br/>TS · React · MeshJS<br/>$70k–$150k"]
    DEV --> INFRA_DEV["Infrastructure engineer<br/>Node · DB-Sync · Ogmios<br/>$90k–$170k"]
    DEV --> SPO_OUT["Stake pool operator<br/>Linux · monitoring<br/>margin income"]
    DEV --> GOV_OUT["Governance contributor<br/>DRep · Intersect<br/>CIP author"]

    SC_DEV --> CORE_OUT["Core protocol contributor<br/>Haskell · IOG / CF<br/>open source"]
    FE_DEV --> FOUNDER["Startup founder / CTO<br/>Catalyst-funded<br/>VC / bootstrap"]
    INFRA_DEV --> AUDITOR["Security auditor<br/>Smart contract audit<br/>$120k–$200k+"]
    SPO_OUT --> EDUCATOR["Educator / content<br/>Gimbalabs · YouTube<br/>Catalyst-funded"]
    GOV_OUT --> UXDESIGN["UI/UX designer<br/>dApp · NFT market<br/>$60k–$130k"]

    subgraph VERTICALS["dApp verticals"]
        V1["DeFi<br/>DEX · lending"]
        V2["NFT<br/>Art · market"]
        V3["Gaming<br/>GameFi · P2E"]
        V4["RWA<br/>Real assets"]
        V5["Identity<br/>DID · Atala"]
        V6["DAO<br/>Governance"]
    end

    subgraph EMPLOYERS["Who's hiring"]
        E1["IOG<br/>Haskell · research"]
        E2["Cardano Foundation<br/>Education · tools"]
        E3["Emurgo<br/>Commercial · Africa"]
        E4["DeFi protocols<br/>Minswap · Liqwid"]
        E5["Catalyst DAOs<br/>Freelance · grants"]
        E6["Startups<br/>TxPipe · dcSpark"]
    end

    CORE_OUT --> VERTICALS
    FOUNDER --> VERTICALS
    AUDITOR --> EMPLOYERS
    EDUCATOR --> EMPLOYERS
```

For the full explication (entry profiles, tracks, tools, careers, Web2 to Web3, and more), see [Resources](../session-resources/readme.md).

