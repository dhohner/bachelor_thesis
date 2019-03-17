pragma solidity ^0.4.8;

contract HoneyPot {
    mapping (address => uint) public balances;

    function HoneyPot() public payable {
        put();
    }

    function put() public payable {
        balances[msg.sender] = msg.value;
    }

    function get() public {
        /* solium-disable-next-line security/no-call-value */
        if (!msg.sender.call.value(balances[msg.sender])()) {
            /* solium-disable-next-line security/no-throw */
            throw;
        }
        balances[msg.sender] = 0;
    }

    function() public {
        /* solium-disable-next-line security/no-throw */
        throw;
    }
}