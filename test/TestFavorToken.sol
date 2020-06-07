pragma solidity ^0.5.10;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/FavorToken.sol";

contract TestFavorToken {

  function testInitialBalanceUsingDeployedContract() public {
    FavorToken meta = FavorToken(DeployedAddresses.FavorToken());

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 FavorToken initially");
  }

  function testInitialBalanceWithNewFavorToken() public {
    FavorToken meta = new FavorToken();

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 FavorToken initially");
  }

}
