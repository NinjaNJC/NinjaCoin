import { expect } from "chai";
import { network } from "hardhat";

describe("NinjaCoinV2", function () {

  async function deployCoin() {

    const { ethers } = await network.connect();

    const NinjaCoinV2 =
      await ethers.getContractFactory("NinjaCoinV2");

    const coin =
      await NinjaCoinV2.deploy();

    await coin.waitForDeployment();

    return {
      coin,
      ethers
    };
  }


  it("Should have fixed total supply", async function () {

    const { coin, ethers } = await deployCoin();

    const supply =
      await coin.totalSupply();

    expect(supply)
      .to.equal(
        ethers.parseEther("210000000")
      );

  });



  it("Should give total supply to the creator", async function () {

    const { coin, ethers } =
      await deployCoin();

    const [owner] =
      await ethers.getSigners();


    const balance =
      await coin.balanceOf(owner.address);


    expect(balance)
      .to.equal(
        await coin.totalSupply()
      );

  });



  it("Should transfer NJC between users", async function () {

    const { coin, ethers } =
      await deployCoin();


    const [owner, user] =
      await ethers.getSigners();


    const amount =
      ethers.parseEther("100");


    await coin.transfer(
      user.address,
      amount
    );


    expect(
      await coin.balanceOf(user.address)
    )
    .to.equal(amount);

  });



  it("Should approve and transferFrom NJC", async function () {

    const { coin, ethers } =
      await deployCoin();


    const [owner, user] =
      await ethers.getSigners();


    const amount =
      ethers.parseEther("50");


    await coin.approve(
      user.address,
      amount
    );


    await coin.connect(user).transferFrom(
      owner.address,
      user.address,
      amount
    );


    expect(
      await coin.balanceOf(user.address)
    )
    .to.equal(amount);

  });



  it("Should burn NJC and reduce total supply", async function () {

    const { coin, ethers } =
      await deployCoin();


    const amount =
      ethers.parseEther("100");


    const oldSupply =
      await coin.totalSupply();


    await coin.burn(amount);


    const newSupply =
      await coin.totalSupply();


    expect(newSupply)
      .to.equal(
        oldSupply - amount
      );

  });



  it("Should transfer ownership", async function () {

    const { coin, ethers } =
      await deployCoin();


    const [, newOwner] =
      await ethers.getSigners();


    await coin.transferOwnership(
      newOwner.address
    );


    expect(
      await coin.owner()
    )
    .to.equal(
      newOwner.address
    );

  });


});