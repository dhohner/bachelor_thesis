pragma solidity ^0.5.0;

contract CircuitBreaker {
    bool public isStopped = false;

    // modifier to check if code execution is frozen
    modifier frozen {
        require(!isStopped, "execution was frozen");
        _;
    }

    // modifier to enable function call if contract is frozen
    modifier enableIfFrozen {
        require(isStopped, "ony executable if contract is frozen");
        _;
    }

    mapping(address => uint256) public balances;
    address private owner;

    constructor() public {
        owner = msg.sender;
    }

    function transfer() public payable frozen {
        balances[msg.sender] = msg.value;
    }

    function withdraw(uint256 _withdrawAmount) public frozen {
        uint256 amount = balances[msg.sender];

        /*
            transfer _withdrawAmount to msg.sender if less
            or equal to balances[msg.sender] else locks contract
        */
        if (_withdrawAmount <= amount) {
            balances[msg.sender] = amount - _withdrawAmount;
            msg.sender.transfer(_withdrawAmount);
        } else {
            isStopped = true;
        }
    }

    function unlockContract() public enableIfFrozen {
        require(msg.sender == owner, "has to come from contract owner");
        isStopped = false;
    }
}