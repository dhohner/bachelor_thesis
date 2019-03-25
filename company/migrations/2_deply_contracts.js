const Company = artifacts.require("Company");

const fs = require("fs");
const path = require("path");
const configPath = path.join(
  __dirname,
  "..",
  "frontend",
  "deployed-config.json"
);

module.exports = async deployer => {
  await generateContractDeploymentConfig();

  await deployer.deploy(Company);

  await writeContractInfo("company", Company.abi, Company.address);
};

function generateContractDeploymentConfig() {
  const config = { contracts: {} };
  return new Promise(resolve => {
    fs.writeFile(configPath, JSON.stringify(config), "utf8", (err, data) =>
      resolve()
    );
  });
}

function writeContractInfo(contract, abi, address) {
  return new Promise((resolve, reject) => {
    fs.readFile(configPath, "utf8", (err, data) => {
      if (err) {
        console.log(err);
        reject();
      } else {
        obj = JSON.parse(data);
        obj.contracts[contract] = {
          abi,
          address
        };
        fs.writeFile(configPath, JSON.stringify(obj), "utf8", () => resolve());
      }
    });
  });
}
