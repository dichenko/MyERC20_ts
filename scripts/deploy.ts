import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { MyERC20 } from "../typechain";

async function main() {
  const [deployer] = await ethers.getSigners();
  const accountBalance = await deployer.getBalance();
  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  let myToken: MyERC20;
  let name = "RewardToken";
  let symbols = "RWD";
  let decimals = 18;
  let initialSupply = ethers.utils.parseEther("1000000");

  let MyTokenFactory = await ethers.getContractFactory("MyERC20");
  myToken = await MyTokenFactory.deploy(name, symbols, decimals, initialSupply);

  await myToken.deployed();

  console.log("MyToken deployed to:", myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });