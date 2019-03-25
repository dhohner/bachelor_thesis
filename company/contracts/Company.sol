pragma solidity ^0.5.0;

import "./BountyFactory/BountyFactory.sol";

contract Company {
    BountyFactory bountyFactory;

    mapping(address => uint256) public memberId;
    mapping(address => bool) private validProposals;
    mapping(address => bool) private validBounty;
    address[] public members;
    address[] private bounties;
    address[] private proposals;

    uint256 public minimumNumberOfVotes = 1;
    uint256 public majorityMargin = 50;

    modifier onlyMembers() {
        require(memberId[msg.sender] != 0, "you need to be a member");
        _;
    }

    event BountyCreated(address bountyAddress, uint256 reward, uint256 issue);
    event BountyProvided(address bountyAddress);
    event BountyClaimed(address bountyAddress);
    event BountyCanceled(address bountyAddress);
    event SolutionProvided(address bountyAddress);
    event ProposalCreated(address proposalAddress);
    event Voted(address proposalAddress, bool stance, address from);
    event ProposalExecuted(address executedProposal);
    event RewardAvailable(address bountyAddress);
    event RewardTransfered(address bountyAddress);
    event MembershipChanged(address memberAddress, bool memberStatus);

    constructor() public {
        members.push(address(0));
        memberId[msg.sender] = members.length;
        members.push(msg.sender);
        bountyFactory = new BountyFactory();
    }

    /**
     * @notice creates a bounty for the specified issue
     * @param _amount the bounty to be paid to the freelancer who solves the issue
     * @param _issue the number of the issue to be solved
     */
    function createBounty(uint256 _amount, uint256 _issue) public payable {
        // validate input
        require(_amount != 0, "provide a bounty");
        require(_issue != 0, "provide a vaild issue");
        
        Bounty bounty = bountyFactory.createBounty(_amount, _issue);
        bounty.deposit.value(msg.value)(msg.sender);
        
        bounties.push(address(bounty));
        validBounty[address(bounty)] = true;
        emit BountyCreated(address(bounty), _amount, _issue);
    }

    /**
     * @notice lets freelancer claim a bounty
     * @param _bountyAddress the address of the bounty to claim
     */
    function claimBounty(address payable _bountyAddress) public {
        // validate input
        require(validBounty[_bountyAddress], "invalid bounty address");

        address claimee = Bounty(_bountyAddress).claimBounty(msg.sender);
        require(claimee == msg.sender, "claiming failed");
        emit BountyClaimed(_bountyAddress);
    }

    /**
     * @notice lets the freelancer provide the solution for the bounty
     * @param _solution the commit id for the solution
     * @param _bountyAddress the address of the bounty the solution is for
     */
    function provideSolution(string memory _solution, address payable _bountyAddress) public {
        // validate input
        require(validBounty[_bountyAddress], "invalid bounty address");
        require(bytes(_solution).length == 7, "invalid commit format for solution");

        Bounty(_bountyAddress).provideSolution(_solution, msg.sender);
        
        createBountyProposal(_bountyAddress);
    }

    /**
     * @notice transfers the reward of the bounty to the freelancer
     * @param _bountyAddress the address of the bounty to withdraw from
     */
    function withdraw(address payable _bountyAddress) public {
        // validate input
        require(validBounty[_bountyAddress], "invalid bounty address");

        Bounty(_bountyAddress).transferReward();
        removeBounty(_bountyAddress);
        emit RewardTransfered(_bountyAddress);
    }

    /**
     * @notice tries to cancel the Bounty provided
     * @param _bountyAddress the address of the bounty to cancel
     * @dev only callable by company members
     */
    function cancelBounty(address payable _bountyAddress) public onlyMembers {
        // validate input
        require(validBounty[_bountyAddress], "invalid bounty address");

        /// try to cancel the bounty
        Bounty(_bountyAddress).cancelBounty();
        // remove bounty from management structures
        removeBounty(_bountyAddress);
        emit BountyCanceled(_bountyAddress);
    }

    /**
     * @notice vote for a proposal at the specified address
     * @param _stance true if you want to cast a positive vote, false otherwise
     * @param _proposalAddress the address of the proposal you want to vote for
     * @dev only callable by registered members
     */
    function vote(bool _stance, address payable _proposalAddress) public onlyMembers {
        // validate input
        require(validProposals[_proposalAddress], "invalid proposal input");

        /// vote for proposal at _proposalAddress
        (bool proposalPassed, bool proposalExecuted) = BountyProposal(_proposalAddress).vote(_stance, msg.sender);
        // handle return values of voting call
        if (proposalExecuted) {
            emit ProposalExecuted(_proposalAddress);
            handleVoteReturn(_proposalAddress, proposalPassed);
        }
    }

    /**
     * @dev adds the member at the specified address to current members
     * @param _memberAddress the address of the member to add
     */
    function addMember(address _memberAddress) public onlyMembers {
        // validate input
        require(_memberAddress != address(0), "invalid address");
        require(memberId[_memberAddress] == 0, "already a member");

        memberId[_memberAddress] = members.length;
        members.push(_memberAddress);

        // if necessary: update voting parameters
        if (((members.length / 2) - 1) >= minimumNumberOfVotes) {
            minimumNumberOfVotes++;
        }
        emit MembershipChanged(_memberAddress, true);
    }

    /**
     * @dev removes the member at the specified address from current members
     * @param _memberAddress the address of the member to remove
     */
    function removeMember(address _memberAddress) public onlyMembers {
        // validate input
        uint256 mId = memberId[_memberAddress];
        require(mId != 0, "the member you want to remove does not exist");

        // move member to the end of members array
        for(uint256 i = mId; i < members.length - 1; i++) {
            memberId[members[i + 1]]--;
            members[i] = members[i + 1];
        }
        // removes last element of storage array
        members.pop();
        // mark memberId as invalid
        memberId[_memberAddress] = 0;

        // if necessary: update voting parameters
        if (((members.length / 2) - 1) <= minimumNumberOfVotes) {
            minimumNumberOfVotes--;
        }
        emit MembershipChanged(_memberAddress, false);
    }

    /**
     * @notice returns all saved proposals
     * @return all currently openProposals
     */
    function getProposals() public view returns (address[] memory) {
        return proposals;
    }

    /**
     * @notice returns all saved bounties
     * @return all currently open bounties
     */
    function getBounties() public view returns (address[] memory) {
        return bounties;
    }

    /**
     * @notice returns the number of current members - only callable by members
     * @return length of the members array
     */
    function getMembersLength() public view onlyMembers returns (uint256) {
        return members.length;
    }

    function getBountyParameters(address payable _bounty) public view returns (address bountyAddress, uint256 bounty, uint256 issue, address claimee, address creator) {
        (bounty, issue, claimee, creator) = Bounty(_bounty).getParameters();
        bountyAddress = _bounty;
    }


    /**
     * @notice creates a proposal to validate the solution of a bounty
     * @param _bountyAddress the address of the solved bounty to validate
     * @dev only callable by registered members
     */
    function createBountyProposal(address payable _bountyAddress) private {
        // validate input
        require(validBounty[_bountyAddress], "invalid input");

        BountyProposal proposal = bountyFactory.createProposal(_bountyAddress, minimumNumberOfVotes, majorityMargin);

        // add created proposal to management structure and update proposal as valid
        proposals.push(address(proposal));
        validProposals[address(proposal)] = true;
        emit ProposalCreated(address(proposal));
    }

    /**
     * @notice updates the internal state of the bounty the proposal was for
     * @param _proposalAddress the address of the proposal that was used to validate the bounty solution
     * @param _proposalPassed true if the bounty soultion could be verified - false otherwise
     */

    function handleVoteReturn(address payable _proposalAddress, bool _proposalPassed) private {
        // validate input
        require(validProposals[_proposalAddress], "invalid proposal input");

        /// get the address of the bounty the proposal was for
        address payable bountyAddress = BountyProposal(_proposalAddress).bountyAddress();

        // trigger unlock of funds for freelancer
        if(_proposalPassed) {
            /// mark solution as valid and mark reward as available
            Bounty(bountyAddress).markSolutionAsValid();
            emit RewardAvailable(bountyAddress);
        } else {
            /// mark solution as invalid and reset claimee
            Bounty(bountyAddress).resetClaimee();
            emit BountyProvided(bountyAddress);
        }
        /// call selfdestruct for proposal validating the bounty
        BountyProposal(_proposalAddress).kill();
        // remove proposal from management structures
        removeProposal(_proposalAddress);
    }

    /**
     * @notice removes the proposal from the management structures
     * @param _proposal the proposal that will be removed
     */
    function removeProposal(address _proposal) private {
        // validate input
        require(validProposals[_proposal], "invalid input");

        // remove _proposal from the management contract
        for(uint256 i = 0; i < proposals.length; i++) {
            // get index of _proposal in proposals array
            address currentProposal = proposals[i];
            if(currentProposal == _proposal) {
                // move _proposal to the end of the array
                for(uint256 j = i; j < proposals.length - 1; j++) {
                    proposals[j] = proposals[j + 1];
                }
                // removes last element of storage array
                proposals.pop();
                break;
            }
        }
        // mark proposal as invalid
        validProposals[_proposal] = false;
    }

    /**
     * @notice removes the bounty from the management structures
     * @param _bounty the address of the bounty that will be removed
     */
    function removeBounty(address _bounty) private {
        // validate input
        require(validBounty[_bounty], "invalid input");

        // remove _bounty from the management contract
        for(uint256 i = 0; i < bounties.length; i++) {
            // get index of _bounty in bounties array
            address currentProposal = bounties[i];
            if(currentProposal == _bounty) {
                // move _bounty to the end of the array
                for(uint256 j = i; j < bounties.length - 1; j++) {
                    bounties[j] = bounties[j + 1];
                }
                // removes last element of storage array
                bounties.pop();
                break;
            }
        }
        // mark proposal as invalid
        validBounty[_bounty] = false;
    }
}
