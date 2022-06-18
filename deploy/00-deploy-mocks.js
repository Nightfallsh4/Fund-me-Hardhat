const { network } = require("hardhat");
const {developmentChains, decimals,initialAnswer} = require("../helper-hardhat-config")

module.exports = async (hre) => {
	const { getNamedAccounts, deployments } = hre;
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();
	const chainId = network.config.chainId;
    

    if (chainId === 31337){
        log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract:"MockV3Aggregator",
            from: deployer,
            log:true,
            args:[decimals,initialAnswer]
        })
        log("Mocks deployed!!!")
        log("-----------------------------------------")
    }
};

module.exports.tags = ["all","mocks"]