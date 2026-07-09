import { network } from "hardhat";

async function main() {
  const connection = await network.connect({
    network: "sepolia",
  });

  const { ethers } = connection;

  const net = await ethers.provider.getNetwork();

  console.log("CHAIN ID:", net.chainId);

  const NinjaCoin = await ethers.getContractFactory("NinjaCoin");

  const coin = await NinjaCoin.deploy();

  await coin.waitForDeployment();

  console.log(
    "NinjaCoin deployed to:",
    await coin.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});