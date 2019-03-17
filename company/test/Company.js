const BountyFactory = artifacts.require('BountyFactory');
const Company = artifacts.require('Company');

contract("Company", accounts => {
    beforeEach(async () => {
        issuer = accounts[0];
        claimee = accounts[1];
        dummyAddress = accounts[9];
        bountyFactory = await BountyFactory.new({ from: issuer })
        company = await Company.new(bountyFactory.address, { from: issuer })
    })

    it("can create a bounty proposal", async () => {
        console.log(bountyFactory.address)
        await company.createBountyProposal(dummyAddress, { from: issuer })
    })
})