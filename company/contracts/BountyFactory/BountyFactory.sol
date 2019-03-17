pragma solidity ^0.5.0;

import "./BountyProposal.sol";
import "./Bounty.sol";

contract BountyFactory {
    address private factoryReturn;

    function() external payable {
        revert("ProposalFactory does not accept payments");
    }

    /**
     * @notice creates a new bounty
     * @param _amount reward for the freelancer that solves the issue
     * @param _issue projects issue id the bounty is for
     * @return address of the generated bounty
     */
    function create(uint256 _amount, uint256 _issue) external returns (address) {
        factoryReturn = address(new Bounty(_amount, _issue, msg.sender));
        return factoryReturn;
    }
    /**
     * @notice creates a new bounty proposal
     * @param _bountyAddress address of the bounty to validate
     * @param _minimumNumberOfVotes the minimum number of votes needed to execute the proposal
     * @param _majorityMargin the percentage of positive votes needed for proposal to pass
     * @return address of the generated proposal
     */
    function create(
        address _bountyAddress,
        uint256 _minimumNumberOfVotes,
        uint256 _majorityMargin
    ) external returns (address) {
        factoryReturn = address(
            new BountyProposal(
                _bountyAddress,
                _minimumNumberOfVotes,
                _majorityMargin,
                msg.sender
            )
        );
        return factoryReturn;
    }
}