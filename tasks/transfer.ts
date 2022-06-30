
import { HardhatUserConfig, task } from "hardhat/config";
import "@typechain/hardhat";


task("transfer", "Transfer tokens")
  .addParam("addressto", "address to transfer")
  .addParam("amount", "Amount tokens to transfer")
  .setAction(
    async ({ addressto, amount }, { hre.ethers: { getSigners } }) => {
      const TOKEN = await hre.ethers.getContractFactory("MyToken");
      const myToken = TOKEN.attach(
        "0xC2544D5C72b44162561e4c1b336e06cD27CA93c8"
      );
      const user = await ethers.getSigners();
      const success = await myToken.transfer(addressto, amount);
      console.log("Transfered", amount, " tokens to ", addressto);
      return success;
    }
  );
