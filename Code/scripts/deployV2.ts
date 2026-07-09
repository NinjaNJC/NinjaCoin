import { network } from "hardhat";

async function main() {

  const { ethers } = await network.connect("sepolia");

  console.log("CONNECTED TO SEPOLIA");


  const net = await ethers.provider.getNetwork();

  console.log(
    "CHAIN ID:",
    net.chainId
  );


  const NinjaCoinV2 =
    await ethers.getContractFactory(
      "NinjaCoinV2"
    );


  const coin =
    await NinjaCoinV2.deploy();


  await coin.waitForDeployment();


  console.log(
    "NinjaCoinV2 deployed:",
    await coin.getAddress()
  );

}


main().catch((error)=>{

  console.error(error);

  process.exitCode = 1;

});