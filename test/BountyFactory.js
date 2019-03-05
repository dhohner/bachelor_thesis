const BountyFactory = artifacts.require("./BountyFactory.sol");

contract("BountyFactory", accounts => {
    beforeEach(async () => {
        issuer = accounts[0];
        claimee = accounts[1];
        bountyFactory = await BountyFactory.new({ from: issuer })
        bounty = await bountyFactory.create.call(5, 1);
    })

    it("can create a bounty", async () => {
        console.log(bounty)
    })

    it("can create a bounty proposal", async () => {
        let proposal = await bountyFactory.create.call(bounty, 1, 50);
        console.log(proposal)
    })
})