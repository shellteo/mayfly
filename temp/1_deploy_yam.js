const YAM = artifacts.require("YAM");

module.exports = function(deployer, network, accounts) {
  const _name = "Yam finance";
  const _symbol = "YAM";
  const _decimals = 18;
  return deployer.then(() => {
    return deployer.deploy(YAM, _name, _symbol, _decimals);
  }).then(() => {
  }).then(async () => {
  })
};
