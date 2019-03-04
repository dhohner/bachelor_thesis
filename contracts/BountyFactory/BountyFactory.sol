pragma solidity ^0.5.0;

import "./BountyProposal.sol";

contract ProposalFactory {
    function() external payable {
        revert("ProposalFactory does not accept payments");
    }

    /**
     * @notice creates a new member proposal
     * @param _bountyAddress address of the bounty to validate
     * @param _minimumNumberOfVotes the minimum number of votes needed to execute the proposal
     * @param _majorityMargin the percentage of positive votes needed for proposal to pass
     */
    function newProposal(
        address _bountyAddress,
        uint256 _minimumNumberOfVotes,
        uint256 _majorityMargin
    ) external returns (address proposal) {
        proposal = address(
            new BountyProposal(
                _bountyAddress,
                _minimumNumberOfVotes,
                _majorityMargin
            )
        );
    }
}