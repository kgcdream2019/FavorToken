module.exports = {
  networks: {
    42: {
      addressUrl: 'https://dashboard.tenderly.co/contract/kovan/',
      txUrl: 'https://dashboard.tenderly.co/tx/kovan/',
      // addressUrl: 'https://kovan.etherscan.io/address/',
      // txUrl: 'https://kovan.etherscan.io/tx/',
      favortoken: '0xC85629034Da7760254e85d1101eDA7B6f6121424',
      relayHub: '0x2E0d94754b348D208D64d52d78BcD443aFA9fa52',
      stakeManager: '0x0ecf783407C5C80D71CFEa37938C0b60BD255FF8',
      paymaster: '0x957F270d45e9Ceca5c5af2b49f1b5dC1Abb0421c',
    },
    3: {
      addressUrl: 'https://dashboard.tenderly.co/contract/ropsten/',
      txUrl: 'https://dashboard.tenderly.co/tx/ropsten/',
      // addressUrl: 'https://ropsten.etherscan.io/address/',
      // txUrl: 'https://ropsten.etherscan.io/tx/',
      favortoken: '0x577236acF8a1EBCc0121126d04Be983089DcDB71',
      relayHub: '0xEF46DD512bCD36619a6531Ca84B188b47D85124b',
      stakeManager: '0x41c7C7c1Bf501e2F43b51c200FEeEC87540AC925',
      paymaster: '0x9940c8e12Ca14Fe4f82646D6d00030f4fC3C7ad1',
    }
  }
}
