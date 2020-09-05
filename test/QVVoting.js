const QVVoting = artifacts.require("./QVVoting.sol");
const web3 = require("web3");
const truffleAssert = require('truffle-assertions');

contract('QVVoting Tests', async (accounts) => {

  let instance

  beforeEach('setup a new contract for each test', async function () {
    instance = await QVVoting.deployed()
  })

  it("test sqrt", async () => {
    // let a = web3.utils.toBN(100).mul(web3.utils.toBN(10**18))
    let a = web3.utils.toBN(10**18).div(web3.utils.toBN(100))

    console.log(a.toString());
    const v = await instance.balanceOf.call(accounts[0]);
    console.log(v);
    // console.log(web3.utils.fromWei(v, "ether"));
    console.log(v.toString());
    await instance.updateVotes(1);
    const v2 = await instance.balanceOf.call(accounts[0]);
    console.log(v2.toString());
    const tx = await instance.testVotes();
    truffleAssert.eventEmitted(tx, 'test', (event) => {
      console.log(event.prev.toString())
      console.log(event.next.toString())
      return true;
    });
  })
})
