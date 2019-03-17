pragma solidity ^0.5.0;

contract Company {
    address private bountyFactory;

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

    event BountyCreated(address bountyAddress);
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

    constructor(address _bountyFactoryAddress) public {
        members.push(address(0));
        memberId[msg.sender] = members.length;
        members.push(msg.sender);
        bountyFactory = _bountyFactoryAddress;
    }

    /**
     * @notice creates a bounty for the specified issue
     * @param _amount the bounty to be paid to the freelancer who solves the issue
     * @param _issue the number of the issue to be solved
     */
    function createBounty(uint256 _amount, uint256 _issue) public {
        // validate input
        require(_amount != 0, "provide a bounty");
        require(_issue != 0, "provide a vaild issue");
        
        /// create bounty for company issue
        // prepare payload: bytes4 representation of the hashed function signature
        bytes memory payload = abi.encodeWithSignature("create(uint256,uint256)", _amount, _issue);
        // execute and get encoded return value of function call
        (bool success, bytes memory encodedReturnValue) = bountyFactory.call(payload);
        // check if bounty creation was successfull
        require(success, "bounty creation failed");
        // decode return value to get address of created bounty
        address bounty = abi.decode(encodedReturnValue, (address));
        // add bounty address to management structures
        bounties.push(bounty);
        validBounty[bounty] = true;
        emit BountyCreated(bounty);
    }

    /**
     * @notice provide bounty reward
     * @param _bountyAddress the bounty address to send the reward to
     * @dev only callable by company members
     */
    function depositReward(address _bountyAddress) public payable onlyMembers {
        // validate input
        require(validBounty[_bountyAddress], "invalid bounty address");

        /// get required reward amount
        // prepare payload: bytes4 representation of the hashed function signature
        bytes memory payload = abi.encodeWithSignature("bountyAmount()");
        // execute and get encoded return value of function call
        (bool success, bytes memory encodedReturnValue) = _bountyAddress.call(payload);
        // check if getter call was successfull
        require(success, "could not get bountyAmount");
        // decode return value to get bountyAmount for provided address
        uint256 bountyAmount = abi.decode(encodedReturnValue, (uint256));

        // validate if msg.value equals expected bounty reward
        require(bountyAmount == msg.value, "invalid reward provided"); 

        /// deposit msg.value to provided bounty address
        // prepare payload: bytes4 representation of the hashed function signature
        payload = abi.encodeWithSignature("deposit(address)", msg.sender);
        // execute and get encoded return value of function call
        (success, ) = _bountyAddress.call.value(msg.value)(payload);
        // check if deposit was successfull
        require(success, "deposit failed");

        /// get current bounty state
        // prepare payload: bytes4 representation of the hashed function signature
        payload = abi.encodeWithSignature("state()");
        // execute and get encoded return value of function call
        (success, encodedReturnValue) = _bountyAddress.call(payload);
        // check if getter call was successfull
        require(success, "could not get bounty state");
        // decode return value to get bounty state
        uint256 state = abi.decode(encodedReturnValue, (uint256));

        // emit event if state == 1 (RewardSupplied) else revert
        if (state == 1) {
            emit BountyProvided(_bountyAddress);
        } else {
            revert("something went wrong in deposit");
        }
    }

    /**
     * @notice lets freelancer claim a bounty
     * @param _bountyAddress the address of the bounty to claim
     */
    function claimBounty(address _bountyAddress) public {
        // validate input
        require(validBounty[_bountyAddress], "invalid bounty address");

        /// try to claim the bounty
        // prepare payload: bytes4 representation of the hashed function signature
        bytes memory payload = abi.encodeWithSignature("claimBounty(address)", msg.sender);
        // execute and get encoded return value of function call
        (bool success, bytes memory encodedReturnValue) = _bountyAddress.call(payload);
        // check if getter call was successfull
        require(success, "could not claim bounty");
        // decode return value to get registered claimee
        address claimee = abi.decode(encodedReturnValue, (address));
        // check if msg.sender and claimee are equal
        require(claimee == msg.sender, "wrong claimee registered");

        /// get current bounty state
        // prepare payload: bytes4 representation of the hashed function signature
        payload = abi.encodeWithSignature("state()");
        // execute and get encoded return value of function call
        (success, encodedReturnValue) = _bountyAddress.call(payload);
        // check if getter call was successfull
        require(success, "could not get bounty state");
        // decode return value to get bounty state
        uint256 state = abi.decode(encodedReturnValue, (uint256));

        // emit event if state == 2 (BountyClaimed) else revert
        require(state == 2, "something went wrong while claiming bounty");
        emit BountyClaimed(_bountyAddress);
        
    }

    /**
     * @notice lets the freelancer provide the solution for the bounty
     * @param _solution the commit id for the solution
     * @param _bountyAddress the address of the bounty the solution is for
     */
    function provideSolution(string memory _solution, address _bountyAddress) public {
        // validate input
        require(validBounty[_bountyAddress], "invalid bounty address");
        require(bytes(_solution).length == 7, "invalid commit format for solution");

        /// transmit the solution
        // prepare payload: bytes4 representation of the hashed function signature
        bytes memory payload = abi.encodeWithSignature("provideSolution(string,address)", _solution, msg.sender);
        // execute and get encoded return value of function call
        (bool success, bytes memory encodedReturnValue) = _bountyAddress.call(payload);
        // check if submit was successfull
        require(success, "could not submit solution");
        emit SolutionProvided(_bountyAddress);
        
        /// get current bounty state
        // prepare payload: bytes4 representation of the hashed function signature
        payload = abi.encodeWithSignature("state()");
        // execute and get encoded return value of function call
        (success, encodedReturnValue) = _bountyAddress.call(payload);
        // check if getter call was successfull
        require(success, "could not get bounty state");
        // decode return value to get bounty state
        uint256 state = abi.decode(encodedReturnValue, (uint256));

        require(state == 3, "something went wrong while providing the solution");
        createBountyProposal(_bountyAddress);
    }

    /**
     * @notice transfers the reward of the bounty to the freelancer
     * @param _bountyAddress the address of the bounty to withdraw from
     */
    function withdraw(address _bountyAddress) public {
        // validate input
        require(validBounty[_bountyAddress], "invalid bounty address");

        /// withdraw the reward of the bounty
        // prepare payload: bytes4 representation of the hashed function signature
        bytes memory payload = abi.encodeWithSignature("transferReward()");
        // execute and get encoded return value of function call
        (bool success, ) = _bountyAddress.call(payload);
        // check if transfer was successfull
        require(success, "could not transfer the reward");
        removeBounty(_bountyAddress);
        emit RewardTransfered(_bountyAddress);
    }

    /**
     * @notice tries to cancel the Bounty provided
     * @param _bountyAddress the address of the bounty to cancel
     * @dev only callable by company members
     */
    function cancelBounty(address _bountyAddress) public onlyMembers {
        // validate input
        require(validBounty[_bountyAddress], "invalid bounty address");

        /// try to cancel the bounty
        // prepare payload: bytes4 representation of the hashed function signature
        bytes memory payload = abi.encodeWithSignature("cancelBounty()");
        // execute and get encoded return value of function call
        (bool success, ) = _bountyAddress.call(payload);
        // check if cancellation was successfull
        require(success, "could not cancel bounty");

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
    function vote(bool _stance, address _proposalAddress) public onlyMembers {
        // validate input
        require(validProposals[_proposalAddress], "invalid proposal input");

        /// vote for proposal at _proposalAddress
        // prepare payload: bytes4 representation of the hashed function signature
        bytes memory payload = abi.encodeWithSignature("vote(bool,address)", _stance, msg.sender);
        // execute and get encoded return value of function call
        (bool success, bytes memory encodedReturnValue) = _proposalAddress.call(payload);
        // check if voting was successfull
        require(success, "voting failed");
        emit Voted(_proposalAddress, _stance, msg.sender);
        // decode return values to check if proposal was executed and if proposal passed
        (bool proposalPassed, bool proposalExecuted) = abi.decode(encodedReturnValue, (bool, bool));

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

    /**
     * @notice creates a proposal to validate the solution of a bounty
     * @param _bountyAddress the address of the solved bounty to validate
     * @dev only callable by registered members
     */
    function createBountyProposal(address _bountyAddress) private {
        // validate input
        require(validBounty[_bountyAddress], "invalid input");

        // prepare payload: bytes4 representation of the hashed function signature - no spaces between parameters
        bytes memory payload = abi.encodeWithSignature(
            "create(address,uint256,uint256)",
            _bountyAddress, minimumNumberOfVotes, majorityMargin
        );
        // execute and get encoded return value of function call
        (bool success, bytes memory encodedReturnValue) = bountyFactory.call(payload);
        // check if function call was successful
        require(success, "creation of bounty proposal failed");
        // decode return value to get the address of the created proposal
        address proposal = abi.decode(encodedReturnValue, (address));

        // add created proposal to management structure and update proposal as valid
        proposals.push(proposal);
        validProposals[proposal] = true;
        emit ProposalCreated(proposal);
    }

    /**
     * @notice updates the internal state of the bounty the proposal was for
     * @param _proposalAddress the address of the proposal that was used to validate the bounty solution
     * @param _proposalPassed true if the bounty soultion could be verified - false otherwise
     */

    function handleVoteReturn(address _proposalAddress, bool _proposalPassed) private {
        // validate input
        require(validProposals[_proposalAddress], "invalid proposal input");

        /// get the address of the bounty the proposal was for
        // prepare payload: bytes4 representation of the hashed function signature
        bytes memory payload = abi.encodeWithSignature("bountyAddress()");
        // execute and get encoded return value of function call
        (bool success, bytes memory encodedReturn) = _proposalAddress.call(payload);
        // validate if function call was successful
        require(success, "get bounty address failed");

        // decode return value of function call
        address bountyAddress = abi.decode(encodedReturn, (address));

        // trigger unlock of funds for freelancer
        if(_proposalPassed) {
            /// mark solution as valid and mark reward as available
            // prepare payload: bytes4 representation of the hashed function signature
            payload = abi.encodeWithSignature("markSolutionAsValid()");
            // execute
            (success, ) = bountyAddress.call(payload);
            // validate if function call was successfull
            require(success, "unlocking of reward failed");

            /// get current bounty state
            // prepare payload: bytes4 representation of the hashed function signature
            payload = abi.encodeWithSignature("state()");
            // execute and get encoded return value of function call
            (success, encodedReturn) = bountyAddress.call(payload);
            // check if getter call was successfull
            require(success, "could not get bounty state");
            // decode return value to get bounty state
            uint256 state = abi.decode(encodedReturn, (uint256));
            
            // validate bounty state
            if (state == 4) {
                emit RewardAvailable(bountyAddress);
            } else {
                revert("unlocking of funds failed");
            }
        } else {
            /// mark solution as invalid and reset claimee
            // prepare payload: bytes4 representation of the hashed function signature
            payload = abi.encodeWithSignature("resetClaimee()");
            // execute
            (success, ) = bountyAddress.call(payload);
            // validate if function call was successfull
            require(success, "reset of claimee failed");

            /// get current bounty state
            // prepare payload: bytes4 representation of the hashed function signature
            payload = abi.encodeWithSignature("state()");
            // execute and get encoded return value of function call
            (success, encodedReturn) = bountyAddress.call(payload);
            // check if getter call was successfull
            require(success, "could not get bounty state");
            // decode return value to get bounty state
            uint256 state = abi.decode(encodedReturn, (uint256));
            
            // validate bounty state
            if (state == 1) {
                emit BountyProvided(bountyAddress);
            } else {
                revert("reset of claimee failed");
            }
        }
        

        /// call selfdestruct for proposal validating the bounty
        // prepare payload: bytes4 representation of the hashed function signature
        payload = abi.encodeWithSignature("kill()");
        // execute function call and ignore return value
        (success, ) = _proposalAddress.call(payload);
        // validate if function call was successful
        require(success, "deletion of proposal contract failed");
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
