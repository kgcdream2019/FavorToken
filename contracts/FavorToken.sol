pragma solidity ^0.5.16;

import "./ConvertLib.sol";
import "@opengsn/gsn/contracts/BaseRelayRecipient.sol";
/*
======================= Quick Stats ===================
    => Name        : Favor Token
    => Symbol      : FVR
    => Total supply: 70,000,000 (70 Million)
    => Decimals    : 3
*/
contract FavorToken is BaseRelayRecipient {

    string public symbol = "FVR";
    string public description = "Favor Token";
    uint public decimals = 3;
    uint public totalSupply = 70000000 * (10**decimals);      //70 million tokens

    mapping(address => uint) balances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    constructor(address forwarder) public {
        balances[tx.origin] = totalSupply;
        trustedForwarder = forwarder;
    }

    function transfer(address receiver, uint amount) public returns (bool sufficient) {
        if (balances[_msgSender()] < amount) return false;
        balances[_msgSender()] -= amount;
        balances[receiver] += amount;
        emit Transfer(_msgSender(), receiver, amount);
        return true;
    }

    function getBalanceInEth(address addr) public view returns (uint){
        return ConvertLib.convert(balanceOf(addr), 2);
    }

    function balanceOf(address addr) public view returns (uint) {
        return balances[addr];
    }


    mapping(address => bool) minted;

    /**
     * mint some coins for this caller.
     * (in a real-life application, minting is protected for admin, or by other mechanism.
     * but for our sample, any user can mint some coins - but just once..
     */
    function mint() public {
        require(!minted[_msgSender()], "already minted");
        minted[_msgSender()] = true;
        balances[_msgSender()] += 10000 * (10**decimals);
    }
}
