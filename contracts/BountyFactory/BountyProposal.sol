pragma solidity ^0.5.0;

contract BountyProposal {
    address private proposalFor = address(0);

    constructor() public {
        proposalFor = msg.sender;
    }

    function getCreatorAddress() public view returns (address) {
        return proposalFor;
    }
}