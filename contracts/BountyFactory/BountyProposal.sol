pragma solidity ^0.5.0;

contract BountyProposal {
    address public bountyAddress = address(0);
    address private company;
    uint256 public minimumNumberOfVotes;
    uint256 public majorityMargin;

    mapping(address => bool) private voted;
    uint256 public numberOfVotes;
    uint256 public positiveVotes;
    bool public proposalPassed = false;
    bool public proposalExecuted = false;

    constructor(
        address _bountyAddress,
        uint256 _minimumNumberOfVotes,
        uint256 _majorityMargin,
        address _company
    ) public {
        bountyAddress = _bountyAddress;
        minimumNumberOfVotes = _minimumNumberOfVotes;
        majorityMargin = _majorityMargin;
        company = _company;
    }

    /**
     * @notice registers a vote for the proposal and triggers execution if conditions are met
     * @param _stance true for a positive vote - false otherwise
     * @param _origin the address of the voter
     * @return propPassed true if proposal met required positive votes - false otherwise
     * @return propExecuted true if proposal met the required minimum number of votes - false otherwise
     */
    function vote(bool _stance, address _origin) external returns (bool propPassed, bool propExecuted) {
        // check input parameters
        require(msg.sender == company, "invalid caller");
        require(!proposalExecuted, "proposal was executed");
        require(!voted[_origin], "can only vote once");

        voted[_origin] = true;
        numberOfVotes++;

        if (_stance) positiveVotes++;

        if (numberOfVotes >= minimumNumberOfVotes) {
            execute();
            if (proposalPassed) {
                propPassed = true;
                propExecuted = true;
            } else {
                propPassed = false;
                propExecuted = true;
            }
        } else {
            propPassed = false;
            propExecuted = false;
        }
    }

    /**
     * @notice removes contract from the blockchain
     */
    function kill() external {
        require(proposalExecuted, "cannot selfdestruct before finished");
        require(msg.sender == company, "can only be called by company");
        selfdestruct(msg.sender);
    }

    /**
     * @notice tries to execute the proposal and updates the internal state
     */

    function execute() private {
        require(!proposalExecuted, "proposal was executed");
        require(numberOfVotes >= minimumNumberOfVotes, "requirements for execution not met");

        proposalExecuted = true;

        if ((positiveVotes * 100) / numberOfVotes >= majorityMargin) {
            proposalPassed = true;
        } else {
            proposalPassed = false;
        }
    }
}