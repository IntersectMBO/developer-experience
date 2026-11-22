# Repository Walkthrough & Demo

## Introduction

This session provides a comprehensive walkthrough of a production-ready smart contract project, demonstrating the complete development lifecycle from architecture design to property-based testing. We'll explore real code, real documentation, and real testing practices used in professional Cardano development.

**What you'll learn:**
- How to architect a multi-validator smart contract system
- Why design specification documents matter (and save time)
- How to structure Aiken code for maintainability
- Property-based testing with fuzzy tests
- Development best practices from real-world experience

---

## The Payment Subscription Smart Contract

### What It Does

The payment subscription smart contract enables blockchain-based subscription services on Cardano. Think Netflix, Spotify, or any recurring payment service, but decentralized and trustless.

**Key Features:**
- Merchants can create subscription services with custom fees and intervals
- Subscribers pay upfront and funds are locked in the contract
- Merchants withdraw earned fees after each interval period
- Subscribers can extend, cancel, or reclaim unused funds
- Optional penalty system for early cancellations

**Real-world use cases:**
- SaaS subscriptions
- Content creator memberships
- Insurance premium payments
- Recurring donations

---

## Smart Contract Architecture

The system uses a **multi-validator pattern** with three specialized validators working together. This separation of concerns makes the code more maintainable and testable.

### 1. Account Multi-Validator
**Purpose:** User authentication and identity management

**How it works:**
- Uses the **CIP-68 token standard** to mint paired NFTs
- **Reference Token** lives in the validator (for on-chain tracking)
- **User Token** lives in the subscriber's wallet (for authentication)
- Both tokens share the same policy ID, creating a verifiable link

**Endpoints:**
- **Mint:** Create account, Delete account
- **Spend:** Update account details, Remove account

**Why this matters:** The CIP-68 pattern allows the contract to track users on-chain while giving them a wallet token for easy authentication. It's like a blockchain-native login system.

### 2. Service Multi-Validator
**Purpose:** Service creation and management by merchants

**How it works:**
- Merchants mint a service NFT to create a new subscription service
- Service datum stores all the subscription parameters
- Merchants can update fees, intervals, or deactivate services

**Service Parameters:**
- **Service fee:** Amount and asset type (ADA or native tokens)
- **Interval length:** How often payments occur (e.g., 30 days)
- **Number of intervals:** Tracks payment periods for merchant withdrawals
- **Penalty fee:** Optional fee for early cancellation
- **Active status:** Enable/disable the service

**Example:** A merchant creates "Premium Content Access" with a 10 ADA monthly fee, 30-day intervals, and a 2 ADA early cancellation penalty.

### 3. Payment Multi-Validator (Treasury)
**Purpose:** Manages subscription payments using linear vesting

**What is linear vesting?**
It's a time-locked payment system where funds unlock periodically. In this case, the merchant can withdraw earned fees after each interval passes (e.g., every 30 days).

**Parameters:**
- Service Policy ID (which service this payment is for)
- Subscription Account Policy ID (which subscriber is paying)

**Endpoints:**
- **Mint:** Initiate subscription, Terminate subscription
- **Spend:** Extend subscription, Merchant withdraw, Unsubscribe, Subscriber withdraw

**Payment flow example:**
1. Subscriber pays 120 ADA for 12 months (10 ADA/month)
2. After 30 days, merchant can withdraw 10 ADA
3. After 60 days, merchant can withdraw another 10 ADA
4. Subscriber can extend by adding more funds
5. Subscriber can unsubscribe and reclaim unused funds (minus penalties)

---

## Design Specification Documents

### Why They're Essential

> "After writing the design spec, I felt like I had already built it even though I had not written a single line of code." - Harun

Design specs are the blueprint for your smart contract. They force you to think through:
- All possible user interactions
- Edge cases and failure scenarios
- Validation logic for each endpoint
- How validators interact with each other

**Time saved:** Writing a design spec might take a few hours, but it saves days of refactoring and debugging later.

### What Goes in a Design Spec

**1. System Actors**
- Who can interact with the contract?
- How do they gain permissions? (e.g., by holding specific NFTs)

**2. Validator Specifications**
For each validator, document:
- Parameters (what data is baked into the validator)
- Minting purposes (what can be minted and when)
- Spending purposes (what can be spent and when)
- Datum structures (what data is stored on-chain)
- Redeemer types (what actions users can take)

**3. Validation Logic**
For each redeemer, list all the checks:
```
Example: Initiate Subscription
✓ Reference input must provide valid service datum
✓ Subscriber's transaction must contain correct account NFT
✓ Payment amount must match service fee × number of intervals
✓ Subscription start/end dates must be valid
✓ Payment NFT must be minted with correct token name
```

**4. Transaction Diagrams**
Visual representations showing:
- Input UTXOs (what goes in)
- Validator interactions (what gets validated)
- Output UTXOs (what comes out)
- Tokens minted or burned

---

## On-Chain Code Implementation

### Project Structure

The codebase is organized for clarity and testability:

```
payment-subscription/
├── validators/          # Entry points (thin layer)
│   ├── account_multi_validator.ak
│   ├── service_multi_validator.ak
│   └── payment_multi_validator.ak
├── lib/                 # Business logic (thick layer)
│   └── payment_subscription/
│       ├── account.ak
│       ├── service.ak
│       └── payment.ak
└── tests/              # Property-based tests
    ├── account_multi_validator_test.ak
    ├── service_multi_validator_test.ak
    └── payment_multi_validator_test.ak
```

### Code Organization Pattern

**Validators (thin layer):**
- Extract transaction context
- Parse redeemers
- Call library functions

**Libraries (thick layer):**
- Contain all validation logic
- Reusable across validators
- Easy to test in isolation

**Why this pattern?**
- Validators are compiled to Plutus scripts (expensive on-chain)
- Libraries are pure functions (easy to test off-chain)
- Separation makes code easier to understand and maintain

---

## Property-Based Testing

### The Testing Approach

This project uses **Aiken's fuzzy testing framework** to achieve comprehensive test coverage.

**Test Results:**
- **838 total automated checks** across all validators
- **13 tests** for Account Multi-Validator ✅
- **19 tests** for Payment Multi-Validator ✅
- **Tests** for Service Multi-Validator ✅
- **Execution time:** ~5 minutes

### What Are Fuzzy Tests?

Traditional testing:
```aiken
test create_account_works() {
  // Test with one hardcoded example
  // If this passes, you're 1% confident
}
```

Fuzzy testing:
```aiken
test create_account_fuzzer() via fuzzer {
  // Runs 100 times with random valid inputs
  // Tests edge cases automatically
  // If this passes, you're 99% confident
}
```

**Why this matters for smart contracts:**
- Smart contracts handle real money
- One edge case bug can drain funds
- Manual testing can't cover all scenarios
- Fuzzy tests catch bugs you didn't think of

### Test Categories

**Success Cases (the happy path):**
- Create account with valid data
- Initiate subscription with correct payment
- Extend subscription with additional funds
- Merchant withdraws earned fees
- Subscriber cancels and reclaims funds

**Failure Cases (security checks):**
- Reject subscription with insufficient funds
- Reject withdrawal before interval passes
- Reject invalid date ranges
- Reject missing service reference
- Reject unauthorized token burns

### Running the Tests

```bash
aiken check
```

**What you'll see:**
- ✓ Pass/fail status for each test
- Memory usage per test
- CPU consumption
- Total checks executed (including fuzzer iterations)

---

## Key Takeaways

### ✅ Best Practices

**1. Design First, Code Second**
Write architecture diagrams and design specs before writing any validator code. This helps you think through edge cases and makes coding faster.

**2. Test-Driven Development**
Write tests as you develop each feature, not after all features are complete. This catches bugs early and gives you confidence to move forward.

> "I myself fell into that trap. I built the features and then did testing afterwards, and it took me even more time than if I had done it when writing each feature." - Harun

**3. Property-Based Testing is Essential**
Use fuzzy tests to run 100+ arbitrary test cases per function. Smart contracts handle real funds—you can't afford to miss edge cases.

**4. Separation of Concerns**
Keep validators thin (entry points) and libraries thick (business logic). This makes code more testable and maintainable.

**5. Document for Humans**
Write documentation that helps future you, your team, and the community. Good docs are as important as good code.

### ❌ Common Pitfalls to Avoid

- Jumping straight into coding without planning the architecture
- Building all features first, then writing tests
- Relying on only 1-2 manual test examples
- Skipping documentation because "the code is self-explanatory"
- Not considering edge cases in validation logic

---

## Resources

### GitHub Repositories

**Payment Subscription Smart Contract**  
https://github.com/Anastasia-Labs/payment-subscription-sc  
*The complete Aiken smart contract code covered in this session*

**What to explore:**
- `/validators` - See the multi-validator pattern in action
- `/lib` - Study the validation logic
- `/tests` - Learn property-based testing
- Design spec document (if available in repo)

### Documentation

**Aiken Language**  
https://aiken-lang.org  
*Official documentation and standard library reference*

**Key sections:**
- Language tour (syntax and features)
- Standard library (built-in functions)
- Testing guide (fuzzy tests)
- Examples (real-world patterns)

**CIP-68: Datum Metadata Standard**  
https://cips.cardano.org/cip/CIP-0068  
*Token standard for reference/user NFT pairs*

**Why read this:** Understanding CIP-68 is essential for building authentication systems and tracking on-chain relationships.

### Get Help

**Developer Experience Repository**  
https://github.com/IntersectMBO/developer-experience  
*Schedule 1-on-1 sessions with Developer Advocates*

**Community Support:**
- **Cardano Stack Exchange** - Technical Q&A
- **Intersect Discord** - #developer-experience channel
- **Aiken Discord** - Language-specific help

---

*This session is part of the Q1 2025 Developer Experience Working Group: "Laying the Foundations"*
