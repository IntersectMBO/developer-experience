import * as impl from "../implementation/implementation";

import("chai").then((chai) => {
    const expect = chai.expect;

suite("wallet management test suite ", () => {
 
  test("returns a non-empty encrypted string in correct format", () => {
    const mnemonic = "test seed phrase that is exactly twenty four words long";
    const password = "securePassword123";

    const encrypted = impl.encryptMnemonic(mnemonic, password);

    // Should be in salt:iv:encrypted format
    const parts = encrypted.split(":");

    expect(parts.length).to.equal(3);
    expect(parts[0]).to.match(/^[a-f0-9]{32}$/); // salt: 16 bytes hex
    expect(parts[1]).to.match(/^[a-f0-9]{32}$/); // iv: 16 bytes hex
    expect(parts[2]).to.match(/^[a-f0-9]+$/);    // encrypted: any hex string
  });

  test("produces different outputs for different passwords", () => {
    const mnemonic = "test seed phrase that is exactly twenty four words long";

    const encrypted1 = impl.encryptMnemonic(mnemonic, "passwordOne");
    const encrypted2 = impl.encryptMnemonic(mnemonic, "passwordTwo");

    expect(encrypted1).to.not.equal(encrypted2);
  });

  test("produces different outputs for same password due to random salt/iv", () => {
    const mnemonic = "test seed phrase that is exactly twenty four words long";
    const password = "samePassword";

    const encrypted1 = impl.encryptMnemonic(mnemonic, password);
    const encrypted2 = impl.encryptMnemonic(mnemonic, password);

    expect(encrypted1).to.not.equal(encrypted2);
  });

  
   
test("should return correct address when restoring/creating wallet with valid seed", async () => {
    const apiKey = "preprod8Z6zi3DPfkbN32xpZPmzBUGaMLobSEU0";
    const network = "Preprod";
    const mnemonic =
      "oval bench gravity frost food fuel entry security west sugar canyon ball stuff coyote air milk patch lesson undo stable dial room mass song";
  
    const expectedAddress =
      "addr_test1qpwczgwpyzwhxll2fgxgnsf23ej7s2hq8pyjw6v7dcrydhueh8ww5peagt3v2lkk8paamf0pg22ez330ep896u0mmqzqrd3cd0";
  
    const lucid = await impl.initializeLucid(network, apiKey);
    lucid.selectWalletFromSeed(mnemonic);
    const resultAddress = await lucid.wallet.address();
  
    expect(resultAddress).to.equal(expectedAddress);
  });

  test("should throw error or fail when restoring with invalid seed", async () => {
    const apiKey = "preprod8Z6zi3DPfkbN32xpZPmzBUGaMLobSEU0";
    const network = "Preprod";
    const invalidMnemonic = "this is an invalid seed phrase that is not valid";
  
    const lucid = await impl.initializeLucid(network, apiKey);
  
    try {
      lucid.selectWalletFromSeed(invalidMnemonic);
      await lucid.wallet.address(); 
      throw new Error("Expected error for invalid seed was not thrown");
    } catch (error:any) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.match(/invalid|mnemonic|seed/i);
    }
  });
  
  test("should correctly check  balance through address ", async () => {
    const result = await impl.checkBalance("Preprod", "preprod8Z6zi3DPfkbN32xpZPmzBUGaMLobSEU0", "addr_test1qrmfrlpfkn80jcqjxnsm2d8shsmzrvyk0cjrkkr2ppceazzysga6ul0et0kuspdcfwkr6z80q0a8s2rtlhqvwl623azq0ay9du");

    expect(result).to.be.property("balance");
    expect(result).to.be.property("balanceInLovelace");
  });


});
});