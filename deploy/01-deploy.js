// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// const hre = require("hardhat");

const { network } = require("hardhat");
const {
	networkConfig,
	developmentChains,
} = require("../helper-hardhat-config");

module.exports = async (hre) => {
	const { getNamedAccounts, deployments } = hre;
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();
	const chainId = network.config.chainId;

	// when going for localhost or hardhat network we want a mock price feed
	// const ethUsdPriceFeedAddress = networkConfig[chainId][ethUsdPriceFeed]
	let ethUsdPriceFeedAddress;
	if (developmentChains.includes(network.name)) {
		const ethUsdAggregator = await deployments.get("MockV3Aggregator");
		ethUsdPriceFeedAddress = ethUsdAggregator.address;
	} else {
		ethUsdPriceFeedAddress = networkConfig[chainId][ethUsdPriceFeed];
	}
	// If contract doesnt exist, we deploy a minimal verion of it.

	const fundMe = await deploy("FundMe", {
		from: deployer,
		args: [ethUsdPriceFeedAddress],
		log: true,
	});
	log("----------------------------------------");
};

module.exports.tags = ["all", "fundme"];
