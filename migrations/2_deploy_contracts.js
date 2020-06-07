const FavorToken = artifacts.require('FavorToken.sol')
const TrustedForwarder = artifacts.require('TrustedForwarder.sol')

module.exports = async function deployFunc (deployer, network) {
  const netid = await web3.eth.net.getId()

  // first, check if already deployed through truffle:
  let forwarder = await TrustedForwarder.deployed().then(c => c.address).catch(e => null)
  if (!forwarder) {
    if (netid > 100) {
      forwarder = (await deployer.deploy(TrustedForwarder)).address
    } else {
      // don't automatically install on other networks. should have entires here.
      const forwarders = {
        42: '0x6453D37248Ab2C16eBd1A8f782a2CBC65860E60B',
        3: '0xcC87aa60a6457D9606995C4E7E9c38A2b627Da88'
      }
      forwarder = forwarders[netid]
    }
    if (!forwarder) {
      throw new Error('no valid forwarder for network ', network)
    }
  }
  console.log('using forwarder: ', forwarder)
  await deployer.deploy(FavorToken, forwarder)
  console.log('Finished 2/3 migrations files')
}
