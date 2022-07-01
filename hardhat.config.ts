import * as dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomiclabs/hardhat-etherscan";


task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

task("transfer", "Transfer tokens")
  .addParam("addressto", "address to transfer")
  .addParam("amount", "Amount tokens to transfer")
  .setAction(
    async ( addressto, amount, hre ) => {
      const accounts = await hre.ethers.getSigners();
      const TOKEN = await hre.ethers.getContractFactory("MyToken");
      const myToken = TOKEN.attach(
        "0xC2544D5C72b44162561e4c1b336e06cD27CA93c8"
      );
      const user = await hre.ethers.getSigners();
      const success = await myToken.transfer(addressto, amount);
      console.log("Transfered", amount, " tokens to ", addressto);
      return success;
    }
  );







const config: HardhatUserConfig = {
  solidity: "0.8.15",

  networks: {
    rinkeby: {
      url: process.env.STAGING_ALCHEMY_KEY || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    coinmarketcap: process.env.COINMARKET_CAP_KEY,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
