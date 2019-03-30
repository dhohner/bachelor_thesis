pragma solidity ^0.5.0;

import "./Poll.sol";
import "./Bounty.sol";

contract BountyFactory {
    Poll private proposalReturn;
    Bounty private bountyReturn;

    /**
     * @notice creates a new bounty
     * @param _issue projects issue id the bounty is for
     * @return address of the generated bounty
     */
    function createBounty(uint256 _issue) external returns (Bounty) {
        bountyReturn = new Bounty(_issue, msg.sender);
        return bountyReturn;
    }
    /**
     * @notice creates a new bounty proposal
     * @param _bountyAddress address of the bounty to validate
     * @param _minimumNumberOfVotes the minimum number of votes needed to execute the proposal
     * @param _majorityMargin the percentage of positive votes needed for proposal to pass
     * @return address of the generated proposal
     */
    function createPoll(address _bountyAddress, uint256 _minimumNumberOfVotes, uint256 _majorityMargin, string calldata _solution) external returns (Poll) {
        proposalReturn = new Poll(_bountyAddress, _minimumNumberOfVotes, _majorityMargin, msg.sender, _solution);
        return proposalReturn;
    }
}