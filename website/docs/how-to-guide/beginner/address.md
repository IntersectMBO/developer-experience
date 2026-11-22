---
sidebar_label: "Addresses"
sidebar_position: 2
---

# Addresses

Let's use the vending machine analogy to explain how Cardano addresses work, focusing on the payment and delegation credentials.

To get something from the vending machine, you need to follow certain steps and meet specific conditions. Let's break down the components of a Cardano address using this analogy.

## 1. Header

The header in a Cardano address is like the label on the vending machine that tells you what kind of machine it is (e.g., snacks, drinks) and where it is located (e.g., mainnet or testnet). This helps you know if you're using the right machine for your needs.

## 2. Payment Credentials

The payment credentials are like the payment method you use to buy something from the vending machine.

There are two ways to pay:

    - `Verification Key Hash`: This is like using a specific coin or bill that the vending machine recognizes. You need to provide the exact coin or bill (verification key) and prove it's yours by showing a signature (like a signature on a check).

    - `Script Hash`: This is like using a special coupon or code that the vending machine accepts. The coupon (script) has specific rules (logic) that must be met for the transaction to go through. For example, the coupon might say, "Buy one Pepsi," and the vending machine will only dispense the items if this condition is met.

## 3. Delegation Credentials

The delegation credentials are like a loyalty program associated with the vending machine. If you join the program, you can earn points (stake) that can be used to get rewards. There are two ways to manage your loyalty points:

    - `Verification Key Hash`: This is like having a loyalty card that you can use to delegate your points to a specific group (stake pool). The group then uses your points to increase their chances of winning a prize (producing a block), and you get a share of the rewards.

    - `Script Hash`: This is like having a smart contract that manages your loyalty points. The contract can have complex rules for how your points are delegated and how rewards are distributed.

While the payment credentials control how to spend an output, delegation credentials control two separate operations:

    - how to **publish** a delegation certificate (e.g. to delegate stake to a stake pool);
    - how to **withdraw** rewards associated with the stake credentials.

## Take the Quiz!

Test your knowledge on Address in Cardano transactions by taking this quiz. Click the link below to get started:

[Cardano Address Quiz](https://docs.google.com/forms/d/1s7LRH1GYGS4um0rPYZexMh6WaDAjIkBeszmtkJUs-Qk/edit)

## Reading a real address

When you have an address in front of you, the header becomes the first few characters after `1`. [Numbers and Identifiers](numbers-and-identifiers.md) has a block you can paste one into: it reports the network and the credential kind, and it explains why an enterprise address cannot earn rewards.

