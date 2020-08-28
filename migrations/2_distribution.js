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
  console.log(network)
  if (network != "test") {
    await deployer.deploy(YAM_ETHPool);
    // YAM_ETHPool.address
    let eth_pool = new web3.eth.Contract(YAM_ETHPool.abi, YAM_ETHPool.address);
    let yam = new web3.eth.Contract(YAM.abi, '0x6e803e1E57e9b1e7331aAbC74b3e8eAe10B57546');

    console.log("setting distributor");
    await Promise.all([
        eth_pool.methods.setRewardDistribution('0x0d8E708F9CfF2634169D7c221CF6bfA0C5731d63').send({from: '0x0d8E708F9CfF2634169D7c221CF6bfA0C5731d63', gas: 100000}),
    ]);

    let two_fifty = web3.utils.toBN(10**3).mul(web3.utils.toBN(10**18)).mul(web3.utils.toBN(250)); // 250k
 
    console.log("transfering and notifying", two_fifty.toString());
    console.log("eth");
    await Promise.all([
      yam.methods.transfer(YAM_ETHPool.address, two_fifty.toString()).send({from: '0x0d8E708F9CfF2634169D7c221CF6bfA0C5731d63'}),
    ]);

    await Promise.all([
      eth_pool.methods.notifyRewardAmount(two_fifty.toString()).send({from:'0x0d8E708F9CfF2634169D7c221CF6bfA0C5731d63'}),
    ]);
  }
}
