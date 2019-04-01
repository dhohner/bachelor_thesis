pragma solidity ^0.5.0;

interface Bounty {
    function deposit(address payable) external payable;
    function claimBounty(address payable) external returns (address);
    function provideSolution(string calldata, address) external;
    function resetClaimee() external returns (bool);
    function markSolutionAsValid() external;
    function transferReward() external;
    function getParameters() external view returns (uint256, uint256, address payable, address payable, string memory, uint256);
}

interface Poll {
    function vote(bool, address) external returns (bool, bool);
    function bountyAddress() external returns (address);
    function kill() external;
    function getParameters() external view returns (address, string memory);
}

interface BountyFactory {
    function createBounty(uint256 _issue) external returns (Bounty);
    function createPoll(address, uint256, uint256, string calldata) external returns (Poll);
}

contract Company {
    BountyFactory bountyFactory;

    mapping(address => uint256) public memberId;
    mapping(address => bool) public validMember;
    mapping(address => bool) private validPolls;
    mapping(address => bool) private validBounty;
    address[] public members;
    address[] private bounties;
    address[] private polls;

    uint256 public minimumNumberOfVotes = 1;
    uint256 public majorityMargin = 50;

    modifier onlyMembers() {
        require(validMember[msg.sender], "you need to be a member");
        _;
    }

    event BountyCreated(address bountyAddress);
    event BountyClaimed(address bountyAddress);
    event RewardAvailable(address bountyAddress);
    event RewardTransfered(address bountyAddress);
    
    event PollCreated(address ppllAddress);
    event PollExecuted(address executedPoll);

    event MembershipChanged(address memberAddress, bool memberStatus);

    constructor(address _factory) public {
        memberId[msg.sender] = members.length;
        validMember[msg.sender] = true;
        members.push(msg.sender);
        bountyFactory = BountyFactory(_factory);
    }

    /**
     * @notice creates a bounty for the specified issue
     * @param _issue the number of the issue to be solved
     */
    function createBounty(uint256 _issue) public payable {
        // validate input
        require(_issue != 0, "provide a vaild issue");
        
        Bounty bounty = bountyFactory.createBounty(_issue);
        bounty.deposit.value(msg.value)(msg.sender);
        
        bounties.push(address(bounty));
        validBounty[address(bounty)] = true;
        emit BountyCreated(address(bounty));
    }

    /**
     * @notice lets freelancer claim a bounty
     * @param _bountyAddress the address of the bounty to claim
     */
    function claimBounty(address _bountyAddress) public {
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
    function provideSolution(string memory _solution, address _bountyAddress) public {
        // validate input
        require(validBounty[_bountyAddress], "invalid bounty address");
        require(bytes(_solution).length == 7, "invalid commit format for solution");

        Bounty(_bountyAddress).provideSolution(_solution, msg.sender);
        
        createPoll(_bountyAddress, _solution);
    }

    /**
     * @notice transfers the reward of the bounty to the freelancer
     * @param _bountyAddress the address of the bounty to withdraw from
     */
    function withdraw(address _bountyAddress) public {
        // validate input
        require(validBounty[_bountyAddress], "invalid bounty address");

        Bounty(_bountyAddress).transferReward();
        removeBounty(_bountyAddress);
        emit RewardTransfered(_bountyAddress);
    }

    /**
     * @notice vote for a poll at the specified address
     * @param _stance true if you want to cast a positive vote, false otherwise
     * @param _pollAddress the address of the poll you want to vote for
     * @dev only callable by registered members
     */
    function vote(bool _stance, address _pollAddress) public onlyMembers {
        // validate input
        require(validPolls[_pollAddress], "invalid poll input");

        /// vote for poll at _pollAddress
        (bool pollPassed, bool pollExecuted) = Poll(_pollAddress).vote(_stance, msg.sender);
        // handle return values of voting call
        if (pollExecuted) {
            emit PollExecuted(_pollAddress);
            handleVoteReturn(_pollAddress, pollPassed);
        }
    }

    /**
     * @dev adds the member at the specified address to current members
     * @param _memberAddress the address of the member to add
     */
    function addMember(address _memberAddress) public onlyMembers {
        // validate input
        require(_memberAddress != address(0), "invalid address");
        require(!validMember[_memberAddress], "already a member");

        memberId[_memberAddress] = members.length;
        validMember[_memberAddress] = true;
        members.push(_memberAddress);

        // if necessary: update voting parameters
        if ((members.length / 2) >= minimumNumberOfVotes) {
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
        validMember[_memberAddress] = false;

        // if necessary: update voting parameters
        if ((members.length / 2) <= minimumNumberOfVotes) {
            minimumNumberOfVotes--;
        }
        emit MembershipChanged(_memberAddress, false);
    }

    /**
     * @notice returns all saved polls
     * @return all currently openpolls
     */
    function getPolls() public view returns (address[] memory) {
        return polls;
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

    function getBountyParameters(address _bounty) public view returns (address bountyAddress, uint256 bounty, uint256 issue, address claimee, address creator, string memory commit, uint256 withdrawAmount) {
        (bounty, issue, claimee, creator, commit, withdrawAmount) = Bounty(_bounty).getParameters();
        bountyAddress = _bounty;
    }

    function getPollParameters(address _poll) public view returns (address pollAddress, address bountyAddress, string memory commit) {
        (bountyAddress, commit) = Poll(_poll).getParameters();
        pollAddress = _poll;
    }


    /**
     * @notice creates a poll to validate the solution of a bounty
     * @param _bountyAddress the address of the solved bounty to validate
     * @dev only callable by registered members
     */
    function createPoll(address _bountyAddress, string memory _commit) private {
        // validate input
        require(validBounty[_bountyAddress], "invalid input");

        Poll bountyPoll = bountyFactory.createPoll(_bountyAddress, minimumNumberOfVotes, majorityMargin, _commit);

        // add created poll to management structure and update poll as valid
        polls.push(address(bountyPoll));
        validPolls[address(bountyPoll)] = true;
        emit PollCreated(address(bountyPoll));
    }

    /**
     * @notice updates the internal state of the bounty the poll was for
     * @param _pollAddress the address of the poll that was used to validate the bounty solution
     * @param _pollPassed true if the bounty soultion could be verified - false otherwise
     */

    function handleVoteReturn(address _pollAddress, bool _pollPassed) private {
        // validate input
        require(validPolls[_pollAddress], "invalid poll input");

        /// get the address of the bounty the poll was for
        address bountyAddress = Poll(_pollAddress).bountyAddress();

        // trigger unlock of funds for freelancer
        if(_pollPassed) {
            /// mark solution as valid and mark reward as available
            Bounty(bountyAddress).markSolutionAsValid();
            emit RewardAvailable(bountyAddress);
        } else {
            /// mark solution as invalid and reset claimee
            Bounty(bountyAddress).resetClaimee();
            emit BountyCreated(bountyAddress);
        }
        /// call selfdestruct for poll validating the bounty
        Poll(_pollAddress).kill();
        // remove poll from management structures
        removepoll(_pollAddress);
    }

    /**
     * @notice removes the poll from the management structures
     * @param _poll the poll that will be removed
     */
    function removepoll(address _poll) private {
        // validate input
        require(validPolls[_poll], "invalid input");

        // remove _poll from the management contract
        for(uint256 i = 0; i < polls.length; i++) {
            // get index of _poll in polls array
            address currentpoll = polls[i];
            if(currentpoll == _poll) {
                // move _poll to the end of the array
                for(uint256 j = i; j < polls.length - 1; j++) {
                    polls[j] = polls[j + 1];
                }
                // removes last element of storage array
                polls.pop();
                break;
            }
        }
        // mark poll as invalid
        validPolls[_poll] = false;
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
            address currentBounty = bounties[i];
            if(currentBounty == _bounty) {
                // move _bounty to the end of the array
                for(uint256 j = i; j < bounties.length - 1; j++) {
                    bounties[j] = bounties[j + 1];
                }
                // removes last element of storage array
                bounties.pop();
                break;
            }
        }
        // mark poll as invalid
        validBounty[_bounty] = false;
    }
}
