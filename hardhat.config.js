require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL

module.exports = {
	solidity: {
		compilers: [{ version: "0.8.9" }, { version: "0.6.6" }],
	},
	defaultNetwork: "hardhat",
	networks: {
		rinkeby: {
			url: RINKEBY_RPC_URL,
			accounts:
				process.env.ACCOUNT_PRIVATE_KEY !== undefined
					? [process.env.ACCOUNT_PRIVATE_KEY]
					: [],
          chainId: 4,
		},
	},
	// gasReporter: {
	//   enabled: true,
	//   currency: "USD",
	// },
	// etherscan: {
	//   apiKey: process.env.ETHERSCAN_API_KEY,
	// },
	namedAccounts: {
		deployer: {
			default: 0,
		},
		user: {
			default: 0,
		},
	},
};
