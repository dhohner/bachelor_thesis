const dCompany = artifacts.require('./dCompany.sol');

module.exports = function (deployer) {
	deployer.deploy(dCompany);
};
