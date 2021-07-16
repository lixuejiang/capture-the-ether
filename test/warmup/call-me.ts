// https://capturetheether.com/challenges/warmup/call-me/
import { ethers } from "hardhat";
import { BigNumber, Contract, Signer } from "ethers";
import { expect } from "chai";
import { formatEtherscanTx } from "../utils/format";

let accounts: Signer[];
let eoa: Signer;
let contract: Contract; // challenge contract

before(async () => {
  accounts = await ethers.getSigners();
  eoa = accounts[0];
  // contract = new ethers.Contract(
  //   `0x7e53cBe1AE1D8BCc1e4273ED31eb61bC4513C509`,
  //   ``,
  //   accounts[0]
  // );
  const factory =  await ethers.getContractFactory("CallMeChallenge");
  console.log('before deploy');
  contract = await factory.deploy();
  console.log('contract address is ', contract.address);
  // contract = factory.attach(`0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee`)
});

it("solves the challenge", async function () {
  const tx = await contract.callme({
    // value: ethers.utils.parseEther(`1`),
    gasLimit: 1e5,
  });
  const txHash = tx && tx.hash;
  console.log(formatEtherscanTx(txHash));
  expect(txHash).to.not.be.undefined
});
