import * as dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomiclabs/hardhat-etherscan";
import { ethers } from "ethers";
import { MyERC20 } from "./typechain";



task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

task("transfer", "Transfer tokens")
  .addParam("addressto", "address to transfer")
  .addParam("amount", "Amount tokens to transfer")
  .setAction(async ({addressto, amount, hre}, { ethers: { getSigners } }) => {
    let myToken: MyERC20;
    const TOKEN = await hre.ethers.getContractFactory("MyREC20");
    myToken = TOKEN.attach("0x09350A6aa0eEA3e4188D7666f7DE2fcA6e519d04");
    const success = await myToken.transfer(addressto, amount);
    console.log("Transfered", amount, " tokens to ", addressto);
    return success;
  });

task("transferfrom", "Transfer tokens from another address")
  .addParam("from", "address from")
  .addParam("to", "address to")
  .addParam("amount", "Amount tokens to transfer")
  .setAction(async ({ from, to, amount, hre }, { ethers: { getSigners } }) => {
    const TOKEN = await hre.ethers.getContractFactory("MyREC20");
    const myToken = TOKEN.attach("0x09350A6aa0eEA3e4188D7666f7DE2fcA6e519d04");
    const user = await hre.ethers.getSigners();
    const success = await myToken.transferFrom(from, to, amount);
    return success;
  });

task("mint", "Mint tokens")
  .addParam("amount", "Amount tokens to mint")
  .setAction(async ({ amount, hre }, { ethers: { getSigners } }) => {
    const TOKEN = await hre.ethers.getContractFactory("MyREC20");
    const myToken = TOKEN.attach("0x09350A6aa0eEA3e4188D7666f7DE2fcA6e519d04");
    const user = await hre.ethers.getSigners();
    const success = await myToken.mint(amount);
    return success;
  });

task("burn", "Burn tokens")
  .addParam("amount", "Amount tokens to burn")
  .setAction(async ({ amount, hre }, { ethers: { getSigners } }) => {
    const TOKEN = await hre.ethers.getContractFactory("MyREC20");
    const myToken = TOKEN.attach("0x09350A6aa0eEA3e4188D7666f7DE2fcA6e519d04");
    const user = await hre.ethers.getSigners();
    const success = await myToken.burn(amount);
    return success;
  });

task("approve", "Approve tokens to spend from another address")
  .addParam("spender", "address spender")
  .addParam("amount", "Amount tokens to approve")
  .setAction(async ({ spender, amount, hre }, { ethers: { getSigners } }) => {
    const TOKEN = await hre.ethers.getContractFactory("MyREC20");
    const myToken = TOKEN.attach("0x09350A6aa0eEA3e4188D7666f7DE2fcA6e519d04");
    const user = await hre.ethers.getSigners();
    const success = await myToken.approve(spender, amount);
    return success;
  });

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
