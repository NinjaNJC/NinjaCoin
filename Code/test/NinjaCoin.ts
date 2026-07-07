import { expect } from "chai";
import hre from "hardhat";

describe("NinjaCoin", function () {

  it("Should give total supply to the creator", async function () {
    const { ethers } = await hre.network.connect();

    const [owner] = await ethers.getSigners();

    const NinjaCoin = await ethers.getContractFactory("NinjaCoin");
    const coin = await NinjaCoin.deploy();

    const balance = await coin.balances(owner.address);

    expect(balance).to.equal(210000000n * 10n ** 18n);
  });


  it("Should transfer NJC between users", async function () {
    const { ethers } = await hre.network.connect();

    const [owner, user] = await ethers.getSigners();

    const NinjaCoin = await ethers.getContractFactory("NinjaCoin");
    const coin = await NinjaCoin.deploy();

    await coin.transfer(user.address, 1000);

    const userBalance = await coin.balances(user.address);

    expect(userBalance).to.equal(1000);
  });

});