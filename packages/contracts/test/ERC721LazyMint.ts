import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ERC721LazyMint", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {


    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const ERC721LazyMint = await ethers.getContractFactory("ERC721LazyMint");
    const erc721LazyMint = await ERC721LazyMint.deploy("TEST", "TEST");

    return { erc721LazyMint, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should work", async function () {
      const { erc721LazyMint } = await loadFixture(deployOneYearLockFixture);

      expect(await erc721LazyMint.name()).to.equal("TEST");
    });
  });
});
