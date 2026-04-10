const { ethers } = require("hardhat");
const deployment = require("../deployment.json");

// Role values: 1=Manufacturer, 2=Distributor, 3=Pharmacy, 4=Regulator
const TARGET_ADDRESS = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; // 0x7099...79c8
const ROLE = 1; // Manufacturer

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Admin:", deployer.address);

  const contract = await ethers.getContractAt(
    "PharmaSupplyChain",
    deployment.contractAddress,
    deployer
  );

  const tx = await contract.assignRole(TARGET_ADDRESS, ROLE);
  await tx.wait();

  const assigned = await contract.roles(TARGET_ADDRESS);
  console.log(`Role assigned to ${TARGET_ADDRESS}: ${assigned} (1=Manufacturer, 2=Distributor, 3=Pharmacy, 4=Regulator)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
