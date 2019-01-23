const dCompany = artifacts.require('./dCompany.sol');

const minNumVotes = 1;
const debateTime = 0;
const majority = 50;

module.exports = function(deployer) {
	deployer.deploy(dCompany, minNumVotes, debateTime, majority);
};
