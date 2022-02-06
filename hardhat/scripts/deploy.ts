// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import * as hre from "hardhat";

const utils = ethers.utils;

const LINKAddress = "0x326c977e6efc84e512bb9c30f76e30c160ed06fb";
const oracleAddress = "0xc8D925525CA8759812d0c299B90247917d4d4b7C";
const jobId = "0x6137333330643062346239363463303561626336366132363330373034376330";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const _APIConsumer = await ethers.getContractFactory("APIConsumer");
  const apiConsumer = await _APIConsumer.deploy(LINKAddress, oracleAddress, jobId);

  await apiConsumer.deployed();
  console.log("Deployed address:", apiConsumer.address);

  await apiConsumer.setAPIEndpoint("https://contractlist.vercel.app/api");

  // let apiConsumer = _APIConsumer.attach("0x05d98BaD04f44aca5d96dc183624762f360DC111");

  // await apiConsumer.requestContractAddress("aave", "lendingcontract");

  // await delay(20000);

  // const addr = await apiConsumer.getRequestedContractAddress();
  // console.log(addr);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

async function verify(contractAddress:string, ...args:Array<any>) {
  console.log("verifying", contractAddress, ...args);
  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: [
      ...args
    ],
  });
}

async function verifySingle(){
  await verify("0x05d98BaD04f44aca5d96dc183624762f360DC111", "0x326c977e6efc84e512bb9c30f76e30c160ed06fb", "0xc8D925525CA8759812d0c299B90247917d4d4b7C", "0x6137333330643062346239363463303561626336366132363330373034376330"); 
}

verifySingle();