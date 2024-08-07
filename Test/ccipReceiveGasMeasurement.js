const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CCIP Gas Measurement", function () {
  let ccipLocalSimulator, routerAddress;
  let ccnsRegister, ccnsReceiver, ccnsLookup;
  let owner, alice;

  before(async function () {
    [owner, alice] = await ethers.getSigners();

    // Deploy the CCIPLocalSimulator contract
    const CCIPLocalSimulator = await ethers.getContractFactory("CCIPLocalSimulator");
    ccipLocalSimulator = await CCIPLocalSimulator.deploy(owner.address);
    await ccipLocalSimulator.deployed();

    // Call configuration() function to get Router contract address
    routerAddress = await ccipLocalSimulator.configuration();
    expect(routerAddress).to.not.be.null;

    // Deploy the CrossChainNameServiceRegister contract
    const CrossChainNameServiceRegister = await ethers.getContractFactory("CrossChainNameServiceRegister");
    ccnsRegister = await CrossChainNameServiceRegister.deploy(routerAddress);
    await ccnsRegister.deployed();

    // Deploy the CrossChainNameServiceReceiver contract
    const CrossChainNameServiceReceiver = await ethers.getContractFactory("CrossChainNameServiceReceiver");
    ccnsReceiver = await CrossChainNameServiceReceiver.deploy(routerAddress);
    await ccnsReceiver.deployed();

    // Deploy the CrossChainNameServiceLookup contract
    const CrossChainNameServiceLookup = await ethers.getContractFactory("CrossChainNameServiceLookup");
    ccnsLookup = await CrossChainNameServiceLookup.deploy(routerAddress);
    await ccnsLookup.deployed();

    // Enable chains (replace with actual chain IDs)
    const chainId1 = 1; // Example chain ID
    const chainId2 = 2; // Example chain ID
    await ccnsRegister.enableChain(chainId1);
    await ccnsReceiver.enableChain(chainId2);
  });

  it("should measure gas consumption of ccipReceive", async function () {
    // Measure the gas consumption of ccipReceive function
    const tx = await ccnsReceiver.ccipReceive();
    const receipt = await tx.wait();
    const gasUsed = receipt.gasUsed;

    console.log("Gas used by ccipReceive:", gasUsed.toString());

    // Calculate 10% more gas
    const gasLimit = gasUsed.mul(110).div(100);

    console.log("Gas limit (10% more):", gasLimit.toString());

    // Use the calculated gas limit in the transferUsdc function
    // This is an example, you should implement transferUsdc function in the respective contract
    // await ccnsRegister.transferUsdc(recipient, amount, { gasLimit: gasLimit });
  });
});
