const dCompany = artifacts.require('./dCompany.sol');
const BountyFactory = artifacts.require('./BountyFactory/BountyFactory.sol');

module.exports = function (deployer) {
	deployer.deploy(BountyFactory);
};
