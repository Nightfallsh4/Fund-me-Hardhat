# Basic Funding contract using Hardhat Project
 
 This is a funding smart contract used to receive funds of minimum $50. The funds deposited into the contract can only be withdrawn by the deployer of the contract. The contract uses Chainlink's decentralised oracle to get the price of ETH.
 
 The contract is deployed in the Rinkeby testnet at the address - [0x5d9c4b42022D50629FB86fDB993d1d95f550B3B0](https://rinkeby.etherscan.io/address/0x5d9c4b42022D50629FB86fDB993d1d95f550B3B0)

 This contract was made as a part of the [Freecodecamp tutorial by Patrick Collins.](https://www.youtube.com/watch?v=gyMwXuJrbJQ)

Try running some of the following tasks:

```shell
yarn hardhat accounts
yarn hardhat compile
yarn hardhat deploy
yarn hardhat deploy --network rinkeby
yarn hardhat clean

```

