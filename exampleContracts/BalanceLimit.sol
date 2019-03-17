pragma solidity ^0.5.0;

contract BalanceLimit {
    uint256 public limit;
    mapping(address => uint256) public balances;

    constructor(uint256 _limit) public {
        limit = _limit;
    }

    // deny all transfers over limit
    function() external payable {
        require(address(this).balance + msg.value <= limit, "contract holds too much ETH");
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(amount);
    }
}