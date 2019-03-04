pragma solidity ^0.5.0;

contract BountyProposal {
    address public bountyAddress = address(0);
    uint256 public minimumNumberOfVotes;
    uint256 public majorityMargin;

    constructor(
        address _bountyAddress,
        uint256 _minimumNumberOfVotes,
        uint256 _majorityMargin
    ) public {
        bountyAddress = _bountyAddress;
        minimumNumberOfVotes = _minimumNumberOfVotes;
        majorityMargin = _majorityMargin;
    }
}