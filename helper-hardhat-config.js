const networkConfig = {
	4: {
		name: "rinkeby",
		ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
	},
};

const developmentChains = ["hardhat", "localhost"];
const decimals = 8
const initialAnswer = 110000000000

module.exports = {
	networkConfig,
    developmentChains,
    decimals,
    initialAnswer
};
