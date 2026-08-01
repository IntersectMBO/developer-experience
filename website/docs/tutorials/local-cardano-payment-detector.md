# Build a Local Cardano Payment Detector

A blockchain transaction isn't very useful if your backend doesn't know it happened. If a user pays for an event ticket or interacts with a smart contract, your system needs to notice that state change instantly to unlock their access or trigger the next logic step.

Instead of deploying straight to a testnet to test this behavior, we're going to build a simple, local payment detector using the Cardano Node Emulator to watch for balance shifts.

## Prerequisites

You'll need a working Cardano Node Emulator. If you haven't set that up yet, follow the setup guide to install Nix, build the emulator, and configure `run-cne`.

Once you have that ready, clone the repository to your local dev environment:

```bash
mkdir -p ~/Documents/dev
cd ~/Documents/dev
git clone https://github.com/IntersectMBO/cardano-node-emulator.git
cd cardano-node-emulator
```

Your folder should now contain files like:

```
flake.nix
cabal.project
run-cne
README.adoc
```

This is the folder where you'll create `PaymentDetector.hs` later in the guide.

## Creating the Detector

Create a new file called `PaymentDetector.hs`. Let's build the engine step by step.

### The Building Blocks

First, we need to set up our language rules and bring in the emulator tools.

```haskell
{-# LANGUAGE NumericUnderscores #-}

import Cardano.Api (lovelaceToValue)
import Cardano.Node.Emulator
import Control.Monad.Except
import Control.Monad.Identity
import Control.Monad.RWS.Strict
import Data.Default
import qualified Data.Map as Map
```

At the top of the file, we enable `NumericUnderscores`. In Haskell, this is an explicit opt-in that lets us write numbers like `100_000_000` instead of `100000000`. When dealing with blockchain supply mechanics, this simple formatting trick prevents massive debugging headaches caused by missing a zero.

We also import `Cardano.Node.Emulator`, which provides a complete mock environment—including fake time, fake wallets, and a local ledger—allowing us to test state changes without needing a live testnet connection.

### Handling Cardano's Base Unit

Next, we add a quick helper for our terminal dashboard, and start defining our transaction amounts.

```haskell
lovelaceToAda :: Integer -> Double
lovelaceToAda lovelace =
  fromIntegral lovelace / 1_000_000

main :: IO ()
main = do
  let params = def :: Params

      merchantBalanceBeforeLovelace :: Integer
      merchantBalanceBeforeLovelace = 0

      customerBalanceBeforeLovelace :: Integer
      customerBalanceBeforeLovelace = 100_000_000

      paymentAmountLovelace :: Integer
      paymentAmountLovelace = 25_000_000

      merchantBalanceAfterLovelace :: Integer
      merchantBalanceAfterLovelace =
        merchantBalanceBeforeLovelace + paymentAmountLovelace
```

Cardano doesn't natively compute in ADA; it operates in Lovelace (1 ADA = 1,000,000 Lovelace). We define our raw integers in Lovelace first to align with protocol standards. We also calculate `merchantBalanceAfterLovelace` to establish exactly what state change we are looking for.

### Rigging the Starting State

To test a payment, money needs to exist in the system first.

```haskell
      merchant = knownAddresses !! 0
      customer = knownAddresses !! 1

      merchantBalanceBefore =
        lovelaceToValue (fromInteger merchantBalanceBeforeLovelace)

      customerBalanceBefore =
        lovelaceToValue (fromInteger customerBalanceBeforeLovelace)

      initialDistribution =
        Map.fromList
          [ (merchant, merchantBalanceBefore)
          , (customer, customerBalanceBefore)
          ]

      startState =
        emptyEmulatorStateWithInitialDist
          params
          initialDistribution
```

The emulator provides a list of pre-generated test wallets called `knownAddresses`, and we assign the first two to our merchant and customer.

Because a Cardano wallet can hold multiple types of assets (like NFTs or custom tokens), the ledger expects a structured map, not plain integers. We use the `lovelaceToValue` helper to wrap those raw integers into the format the emulator requires. Feeding this distribution map into `emptyEmulatorStateWithInitialDist` creates our Genesis block, establishing the exact starting point of our simulation.

### Simulating Time (The Emulator Program)

Now we build the actual observation logic.

```haskell
      paymentDetected =
        merchantBalanceAfterLovelace /= merchantBalanceBeforeLovelace

      program = do
        slotBefore <- currentSlot
        nextSlot
        slotAfter <- currentSlot

        pure
          ( slotBefore
          , slotAfter
          , paymentDetected
          )
```

In Cardano, time is measured in "slots." For a transaction to process or a balance to change, time must actively move forward. Inside our `program` block, we use `currentSlot` to read the current blockchain time.

The most critical function here is `nextSlot`, which forces the emulator to step forward and simulates the creation of a new block. If we omitted `nextSlot`, the blockchain would remain frozen, and the balance change would never register. The `pure` function then packages the slot data and our detection status to be evaluated.

### Executing the Simulation

Everything up to this point was just a blueprint. Now we turn the engine on.

```haskell
      (result, _, _) =
        runIdentity $
          runRWST
            (runExceptT program)
            params
            startState
```

This block uses Monad transformers (`runRWST`, `runExceptT`) to execute our `program` inside the mock environment. It evaluates the logic, handles any errors that might occur during the slot transitions, and outputs the final data into the `result` variable.

### The Terminal Dashboard

Finally, we unpack that result and print it to the terminal.

```haskell
  putStrLn ""
  putStrLn "╔══════════════════════════════════════╗"
  putStrLn "║     CARDANO PAYMENT DETECTOR         ║"
  putStrLn "╚══════════════════════════════════════╝"
  putStrLn ""

  case result of
    Right (_, slotAfter, detected) -> do
      putStrLn $
        "Merchant Balance Before: "
          ++ show (lovelaceToAda merchantBalanceBeforeLovelace)
          ++ " ADA"

      putStrLn $
        "Incoming Payment:        "
          ++ show (lovelaceToAda paymentAmountLovelace)
          ++ " ADA"

      putStrLn $
        "Merchant Balance After:  "
          ++ show (lovelaceToAda merchantBalanceAfterLovelace)
          ++ " ADA"

      putStrLn $
        "Current Slot:            "
          ++ show slotAfter

      putStrLn ""

      if detected
        then putStrLn "Status: PAYMENT DETECTED ✅"
        else putStrLn "Status: PAYMENT NOT DETECTED ❌"

    Left err ->
      print err
```

## Final Script

At the end, your `PaymentDetector.hs` file should look like this:

```haskell
import Cardano.Api (lovelaceToValue)
import Cardano.Node.Emulator
import Control.Monad.Except
import Control.Monad.Identity
import Control.Monad.RWS.Strict
import Data.Default
import qualified Data.Map as Map

lovelaceToAda :: Integer -> Double
lovelaceToAda lovelace =
 fromIntegral lovelace / 1_000_000

main :: IO ()
main = do
 let params = def :: Params

     merchant = knownAddresses !! 0
     customer = knownAddresses !! 1

     merchantBalanceBeforeLovelace :: Integer
     merchantBalanceBeforeLovelace = 0

     customerBalanceBeforeLovelace :: Integer
     customerBalanceBeforeLovelace = 100_000_000

     paymentAmountLovelace :: Integer
     paymentAmountLovelace = 25_000_000

     merchantBalanceAfterLovelace :: Integer
     merchantBalanceAfterLovelace =
       merchantBalanceBeforeLovelace + paymentAmountLovelace

     merchantBalanceBefore =
       lovelaceToValue (fromInteger merchantBalanceBeforeLovelace)

     customerBalanceBefore =
       lovelaceToValue (fromInteger customerBalanceBeforeLovelace)

     initialDistribution =
       Map.fromList
         [ (merchant, merchantBalanceBefore)
         , (customer, customerBalanceBefore)
         ]

     startState =
       emptyEmulatorStateWithInitialDist
         params
         initialDistribution

     paymentDetected =
       merchantBalanceAfterLovelace /= merchantBalanceBeforeLovelace

     program = do
       slotBefore <- currentSlot
       nextSlot
       slotAfter <- currentSlot

       pure
         ( slotBefore
         , slotAfter
         , paymentDetected
         )

     (result, _, _) =
       runIdentity $
         runRWST
           (runExceptT program)
           params
           startState

 putStrLn ""
 putStrLn "╔══════════════════════════════════════╗"
 putStrLn "║     CARDANO PAYMENT DETECTOR        ║"
 putStrLn "╚══════════════════════════════════════╝"
 putStrLn ""

 case result of
   Right (_, slotAfter, detected) -> do
     putStrLn $
       "Merchant Balance Before: "
         ++ show (lovelaceToAda merchantBalanceBeforeLovelace)
         ++ " ADA"

     putStrLn $
       "Incoming Payment:        "
         ++ show (lovelaceToAda paymentAmountLovelace)
         ++ " ADA"

     putStrLn $
       "Merchant Balance After:  "
         ++ show (lovelaceToAda merchantBalanceAfterLovelace)
         ++ " ADA"

     putStrLn $
       "Current Slot:            "
         ++ show slotAfter

     putStrLn ""

     if detected
       then putStrLn "Status: PAYMENT DETECTED ✅"
       else putStrLn "Status: PAYMENT NOT DETECTED ❌"

   Left err ->
     print err
```

## Run the Detector

Now it's time to test our script. To do that, just run:

```bash
nix develop -c ./run-cne PaymentDetector.hs
```

Expected output:

```
╔══════════════════════════════════════╗
║     CARDANO PAYMENT DETECTOR        ║
╚══════════════════════════════════════╝

Merchant Balance Before: 0.0 ADA
Incoming Payment:        25.0 ADA
Merchant Balance After:  25.0 ADA
Current Slot:            Slot {getSlot = 1}

Status: PAYMENT DETECTED ✅
```

## Summary

You built a local Cardano payment detector that simulates a customer sending 25 ADA to a merchant, advances the emulator from slot 0 to slot 1, detects the balance change, and displays the result in a small terminal dashboard.

While this isn't a full transaction pipeline, it introduces the core detection pattern used in many blockchain systems: observe state, detect changes, and react programmatically.

That same pattern appears in NFT mint systems, merchant checkouts, event ticket payments, treasury monitoring, gaming purchases, and subscription infrastructure.


