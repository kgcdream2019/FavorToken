// Allows us to use ES6 in our migrations and tests.
require('babel-register')
var HDWalletProvider = require('truffle-hdwallet-provider')
var mnemonic = 'give cancel discover junk point despair woman piece cart typical void bench hub tenant winter'
var infuraProjectId="47d0397f2c8644e8ae13bf09a066155e"

function readFile(name) {

  const fs = require('fs')
  // if (fs.existsSync(secretMnemonicFile)) {
    return fs.readFileSync('.secret-mnemonic.txt', { encoding: 'utf8' })
  // }
}
module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/'+ infuraProjectId)
      },
      network_id: 4
    },
    ropsten: {
      provider: function() {
        // Or, pass an array of private keys, and optionally use a certain subset of addresses
        var privateKeys = [
          "8008E5E33716A9C99374A45E6BF2C23A8C9BA419459E2E4E617538CDD243A68C",
        
        ];
        return new HDWalletProvider(privateKeys, "https://ropsten.infura.io/v3/" + infuraProjectId)
      },
      // provider: () => new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/v3/' + infuraProjectID),
      network_id: 3, // eslint-disable-line camelcase
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
    kovan: {
      provider: function() {
        // Or, pass an array of private keys, and optionally use a certain subset of addresses
        var privateKeys = [
          "8008E5E33716A9C99374A45E6BF2C23A8C9BA419459E2E4E617538CDD243A68C",
        
        ];
        return new HDWalletProvider(privateKeys, "https://kovan.infura.io/v3/" + infuraProjectId);
      },
      network_id: 42, // eslint-disable-line camelcase
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
    kotti: {
      provider: function () {
        const wallet = new HDWalletProvider(mnemonic, 'https://www.ethercluster.com/kotti')
        return wallet
      },
      network_id: 6
    },
    ethereum_classic_mainnet: {
      provider: function () {
        const wallet = new HDWalletProvider(mnemonic, 'https://www.ethercluster.com/etc')
        return wallet
      },
      network_id: 1
    }
  },
  compilers: {
    solc: {
      version: '0.5.16'
    }
  }
}
