# GSN-Based favortoken.

This a basic favortoken, with minimal modifications to support working through GSN, without the client paying for gas.
You still need a wallet, but only for signing transactions, not paying for them.

See https://github.com/opengsn/gsn for the GSN project.

The FavorToken itself pays for all transactions.

Other than supporting GSN, the project added links to [tenderly](https://dashboard.tenderly.dev/contract/kovan/0x2E0d94754b348D208D64d52d78BcD443aFA9fa52) and [etherscan](https://kovan.etherscan.io/address/0x2e0d94754b348d208d64d52d78bcd443afa9fa52), to ease seeing the various components on the blockchain

## Running the project
#### The "TL;DR"
1. Run `npm install`
2. Run `npm run ganache` to run local ethereum node
3. In another terminal, Run `npm run dev-with-gsn` to run favortoken demo on `http://localhost:8080`

#### The longer version
1. Run 1 and 2 as above.
2. Run `npx gsn deploy-relay-hub` - deploys and configures the RelayHub.sol contract and its dependencies.
3. Run `npx gsn fund-paymaster` - Deposits funds in RelayHub for the paymaster's balance so it can be charged later for the relayed transactions.
4. In another terminal, run `npx gsn run-relayer --DevMode --Workdir <workdir> --RelayHubAddress <address>` where workdir could be any temporary dir i.e. `/tmp/server/` and hub address as output in 2.
5. Run `npx gsn register-relayer ` - pings the relay url, stakes its manager address thus prompts it to register and serve user requests.
6. Run `npx truffle migrate && npm run dev` to deploy FavorToken.sol contract, webpack and run local site at `http://localhost:8080`. 
