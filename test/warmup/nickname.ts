import { ethers } from "hardhat";
import { BigNumber, Contract, Signer } from "ethers";
import { expect } from "chai";

let accounts: Signer[];
let eoa: Signer;
let contract: Contract; // challenge contract

before(async () => {
  accounts = await ethers.getSigners();
  eoa = accounts[0];
  const factory =  await ethers.getContractFactory("CaptureTheEther")
  console.log('before deploy');
  contract = await factory.deploy(eoa.getAddress());
  console.log('contract address is ', contract.address);
  // contract = factory.attach(`0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee`)
});

it("solves the challenge", async function () {
  const nickname = ethers.utils.formatBytes32String(`xiabing`)
  const tx = await contract.setNickname(nickname);
  const txHash = tx && tx.hash
  expect(txHash).to.not.be.undefined
});
