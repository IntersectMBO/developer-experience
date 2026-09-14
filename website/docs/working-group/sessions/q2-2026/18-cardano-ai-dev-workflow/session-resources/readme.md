---
title: "Session 18: Using AI in Your Cardano Dev Workflow - Resources"
sidebar_label: Session Resources
slug: /working-group/q2-2026/sessions/18-cardano-ai-dev-workflow/session-resources
---

# Session 18: Using AI in Your Cardano Dev Workflow - Resources

Curated tools and references for building on Cardano with AI assistance.

## AI Coding Assistants

- **[Claude Code](https://www.anthropic.com/claude-code)**: CLI/agent assistant with support for skills, rules, and sub-agents.
- **[Cursor](https://cursor.com)**: AI-native editor with rules and MCP support.
- **[Kiro](https://kiro.dev)**: Agentic IDE used in the live demo for adding skills and MCP servers (per project, per user, or global).
- **[Gemini](https://gemini.google.com)**: Often produces an implementation plan before writing code.

## MCP & Skills

- **[Model Context Protocol](https://modelcontextprotocol.io)**: The open standard that lets assistants query live, version-accurate documentation and tools.
- **[Mesh SDK](https://meshjs.dev)**: Ships installable skills, an MCP server, and a downloadable skills file for AI-assisted Mesh development.
- **[Aiken](https://aiken-lang.org)**: On-chain language used in the test-driven validator workflow described in the notes.

## Cardano SDKs & Languages Referenced

- **Off-chain / SDKs**: [Mesh](https://meshjs.dev), [Lucid Evolution](https://github.com/Anastasia-Labs/lucid-evolution), [Blaze](https://github.com/butaneprotocol/blaze-cardano)
- **On-chain**: [Aiken](https://aiken-lang.org), [Plutus / Plinth](https://github.com/IntersectMBO/plutus), plus higher-level approaches [TX3](https://github.com/txpipe/tx3) and [Scalus](https://scalus.org)

## Local Models (Token Savings)

- **[Ollama](https://ollama.com)**: Run open models locally.
- **[Qwen](https://github.com/QwenLM)** and **[Gemma](https://ai.google.dev/gemma)**: Open models suitable for simpler, lower-cost tasks.

## Emerging Tools

- **Git Nexus**: Bring-your-own-LLM tool that connects multiple MCP servers and builds Obsidian-style mind maps of a codebase. (Mentioned as a lead to explore.)

## Security & Cost Concepts

- **[CIP-30 (Wallet Bridge)](https://cips.cardano.org/cips/cip30/)**: How dApps talk to wallets.
- **[CIP-68 (Datum Metadata Standard)](https://cips.cardano.org/cip/CIP-0068)**: Datum metadata token standard, useful when modeling on-chain state.
- **Double satisfaction & common vulnerabilities**: Review every AI-generated validator for signatory checks, output pinning (address, quantity, policy ID), and execution-unit cost before production.

---

*These resources belong to the Q2 2026 Developer Experience Working Group.*
