pragma solidity ^0.5.0;

contract SpeedBump {
    mapping(address => uint256) public balances;
    mapping(address => uint256) public requestedWithdrawalAt;
    uint256 public waitTime = 4 hours;

    function transfer() public payable {
        balances[msg.sender] += msg.value;
    }

    // announce msg.sender wants to withdraw money
    function requestWithdrawal() public {
        requestedWithdrawalAt[msg.sender] = now;
    }

    function withdraw() public {
        // check if msg.sender has waited long enough to withdraw
        require(requestedWithdrawalAt[msg.sender] >= now + waitTime, "did not wait long enough");
        // get balance of msg.sender and transfer
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(amount);
    }
}