const WETH = artifacts.require("WETH");

module.exports = function(deployer, network, accounts) {
  const _name = "Wrapped Ether";
  const _symbol = "WETH";
  const _decimals = 18;
  return deployer.then(() => {
    return deployer.deploy(WETH, _name, _symbol, _decimals);
  }).then(() => {
  }).then(async () => {
  })
};
