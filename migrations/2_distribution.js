// deployed fourth
const YAM_ETHPool = artifacts.require("YAMETHPool");
const YAM = artifacts.require("YAM");
// ============ Main Migration ============

const migration = async (deployer, network, accounts) => {
  await Promise.all([
    // deployTestContracts(deployer, network),
    deployDistribution(deployer, network, accounts),
    // deploySecondLayer(deployer, network)
  ]);
}

module.exports = migration;

// ============ Deploy Functions ============


async function deployDistribution(deployer, network, accounts) {
  const yamAddress = '0x2FfE61437d65B123eCD04b9161f4C5b44Bb49CEd'
  const honeyAddress = '0x3d3eF5Dff46A03a35b7522287eaF5D0CE57cB5B6'
  const ownerAddress = '0x0d8E708F9CfF2634169D7c221CF6bfA0C5731d63'
  console.log(network)
  if (network != "test") {
    await deployer.deploy(YAM_ETHPool);
    // YAM_ETHPool.address
    let eth_pool = new web3.eth.Contract(YAM_ETHPool.abi, YAM_ETHPool.address);
    let yam = new web3.eth.Contract(YAM.abi, yamAddress);
    let honey = new web3.eth.Contract(YAM.abi, honeyAddress);

    console.log("setting distributor");
    await Promise.all([
      eth_pool.methods.setRewardDistribution(ownerAddress).send({from: ownerAddress, gas: 100000}),
    ]);

    let two_fifty = web3.utils.toBN(10**3).mul(web3.utils.toBN(10**18)).mul(web3.utils.toBN(250)); // 250k
 
    console.log("transfering and notifying", two_fifty.toString());
    console.log("eth");
    await Promise.all([
      yam.methods.transfer(YAM_ETHPool.address, two_fifty.toString()).send({from: ownerAddress}),
      honey.methods.transfer(YAM_ETHPool.address, two_fifty.toString()).send({from: ownerAddress}),
    ]);

    await Promise.all([
      eth_pool.methods.notifyRewardAmount(two_fifty.toString()).send({from: ownerAddress}),
    ]);
  }
}
