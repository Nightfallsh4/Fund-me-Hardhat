const { inputToConfig } = require("@ethereum-waffle/compiler");
const { assert, expect } = require("chai");
const { deployments, ethers, getNamedAccounts } = require("hardhat");

describe("FundMe", function () {
	let fundMe;
	let deployer;
	let mockV3Aggregator;
	const sendValue = ethers.utils.parseEther("1");
	beforeEach(async function () {
		// deploy fund me contract using hardhat deploy
		deployer = (await getNamedAccounts()).deployer; //Gets the specified named accounts in hardhat.config,js to act as deployer
		// const accounts = await ethers.getSigners() // Will return a list of whatever account is in the accounts section of the network specified in hardhat.config.js
		await deployments.fixture(["all"]); // Goes through the deployment folder and runs all deploy scripts with 'all' tag.
		fundMe = await ethers.getContract("FundMe", deployer); // Gets the most recent deployment of the contract name given
		mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);
	});

	describe("constructor", function () {
		it("Sets the aggregator addresses correctly", async () => {
			const response = await fundMe.priceFeed();
			assert.equal(response, mockV3Aggregator.address);
		});
	});

	describe("fund", function () {
		it("Fails if you dont send enough eth", async function () {
			await expect(fundMe.fund()).to.be.revertedWith(
				"You need to spend more ETH!",
			);
		});

		it("updated the amount funded data structure", async function () {
			await fundMe.fund({ value: sendValue });
			const response = await fundMe.addressToAmountFunded(deployer);
			assert.equal(response.toString(), sendValue.toString());
		});

		it("Adds funder to array of funders", async function () {
			await fundMe.fund({ value: sendValue });
			const funder = await fundMe.funders(0);
			assert.equal(funder, deployer);
		});
	});

	describe("withdraw", function () {
		beforeEach(async function () {
			await fundMe.fund({ value: sendValue });
		});
		it("withdraw eth from a single founder", async function () {
			// Arrange
			const startingFundMeBalance = await ethers.provider.getBalance(
				fundMe.address,
			);
			const startingDeployerBalance = await ethers.provider.getBalance(
				deployer,
			);
			// Act
			const transactionResponse = await fundMe.withdraw();
			const transactionReceipt = await transactionResponse.wait(1);
			const { gasUsed, effectiveGasPrice } = transactionReceipt;
			const gasCost = gasUsed.mul(effectiveGasPrice)

			const endingFundMeBalance = await ethers.provider.getBalance(
				fundMe.address,
			);
			const endingDeloyerBalance = await ethers.provider.getBalance(deployer);
			// Assert
			assert.equal(endingFundMeBalance, 0);
			assert.equal(
				startingFundMeBalance.add(startingDeployerBalance).toString(),
				endingDeloyerBalance.add(gasCost).toString()
			);
		});
	});
});
