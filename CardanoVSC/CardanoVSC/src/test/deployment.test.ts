import { generateScriptAddress } from "../implementation/deployment";
import { initializeLucid } from "../implementation/implementation";

import("chai").then((chai) => {
    const expect = chai.expect;

suite("deployment Test Suite", function () {
  test("should return Lucid object with expected properties", async function () {
    const apiKey = "preprod8Z6zi3DPfkbN32xpZPmzBUGaMLobSEU0";
    const network = "Preprod";

    const result = await initializeLucid(network, apiKey);

    expect(result).to.include({
      wallet: undefined,
      network: "Preprod"
    });

    expect(result).to.have.property("txBuilderConfig");
    expect(result).to.have.property("provider");
  });
  test("should return address ",async ()=>{
    const apiKey = "preprod8Z6zi3DPfkbN32xpZPmzBUGaMLobSEU0";
    const network = "Preprod";

    const lucid = await initializeLucid(network, apiKey);
       const address="addr_test1wqag3rt979nep9g2wtdwu8mr4gz6m4kjdpp5zp705km8wys6t2kla";
       const cborHex="49480100002221200101";
       const result= await generateScriptAddress(lucid,cborHex);
       expect(result).to.equal(address);
  });
});
});