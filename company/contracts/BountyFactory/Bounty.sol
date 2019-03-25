pragma solidity ^0.5.0;

contract Bounty {
    enum States {
        BountyCreated,
        RewardSupplied,
        BountyClaimed,
        SolutionProvided,
        SolutionReviewed
    }

    address payable private company;
    address payable private bountyOrigin = address(0);
    address payable public claimee = address(0);

    States public state;
    uint256 public bountyAmount;
    uint256 public maximumAmount = 10 ether;
    uint256 public companyIssue;
    string public solutionCommit;
    uint256 private withdrawalAmount;

    function() external payable {
        revert("use deposit instead");
    }

    constructor(uint256 _bountyAmount, uint256 _companyIssue, address payable _company) public {
        state = States.BountyCreated;
        bountyAmount = _bountyAmount;
        companyIssue = _companyIssue;
        company = _company;
    }

    /**
     * @notice deposits reward for bounty in ETH
     * @param _origin the address of the original caller
     */
    function deposit(address payable _origin) external payable {
        // check input and internal state
        require(checkState(States.BountyCreated), "bounty is in wrong state (deposit)");
        require(msg.sender == company, "invalid caller");
        require(bountyOrigin == address(0), "bountyOrigin already known");
        require(msg.value <= maximumAmount, "storage is limited to 10 ETH");
        require(msg.value == bountyAmount, "provide the whole bounty");

        // update internal state
        state = States.RewardSupplied;
        bountyOrigin = _origin;
    }

    /**
     * @notice cancels bounty and transfers funds to bountyOrigin if set - if not set transfers to company
     */
    function cancelBounty() external {
        // check inputs and internal state
        require(msg.sender == company, "invalid caller");
        require(!checkState(States.SolutionProvided), "cannot cancel (SolutionProvided)");
        require(!checkState(States.SolutionReviewed), "cannot cancel (SolutionReviewed)");
        
        // destroy bounty contract
        bountyOrigin != address(0) ? selfdestruct(bountyOrigin) : selfdestruct(company);
    }

    /**
     * @notice claims bounty for the freelancer
     * @param _origin the address of the claiming freelancer
     * @return claimee: internal address of the freelancer
     */
    function claimBounty(address payable _origin) external returns (address) {
        // check input and internal state
        require(checkState(States.RewardSupplied), "bounty is in wrong state (claimBounty)");
        require(msg.sender == company, "invalid caller");
        require(claimee == address(0), "bounty was already claimed");

        // update internal state
        state = States.BountyClaimed;
        claimee = _origin;

        return claimee;
    }

    /**
     * @notice allows the claimee to provide a solution for the bounty
     * @param _solution the commit id for the solution
     * @param _origin the address of the freelancer - should be equal to claimee
     */
    function provideSolution(string calldata _solution, address _origin) external {
        // check input and internal state
        require(checkState(States.BountyClaimed), "bounty is in wrong state (provideSolution)");
        require(msg.sender == company, "invalid caller");
        require(claimee == _origin, "origin is not claimee");
        require(bytes(_solution).length == 7, "invalid commit format for solution");

        // update internal state
        state = States.SolutionProvided;
        solutionCommit = _solution;
    }

    /**
     * @notice solution was not accepted -> bounty can be claimed again
     * @return true if claimee was reset
     */
    function resetClaimee() external returns (bool) {
        // check input and internal state
        require(checkState(States.SolutionProvided), "bounty is in wrong state (markSolutionAsValid)");
        require(msg.sender == company, "invalid caller");

        // update internal state
        state = States.RewardSupplied;
        solutionCommit = "";
        claimee = address(0);

        return claimee == address(0) ? true : false;
    }

    /**
     * @notice solution was validated -> mark funds as available to withdraw
     */
    function markSolutionAsValid() external {
        // check input and internal state
        require(checkState(States.SolutionProvided), "bounty is in wrong state (markSolutionAsValid)");
        require(msg.sender == company, "invalid caller");

        // update internal state
        state = States.SolutionReviewed;
        withdrawalAmount = address(this).balance;
    }

    /**
     * @notice transfers the reward to the freelancer and deletes bounty
     */
    function transferReward() external {
        // check internal state
        require(checkState(States.SolutionReviewed), "bounty is in wrong state (markSolutionAsValid)");
        require(msg.sender == company, "invalid caller");

        // transfer funds (withdrawal pattern)
        uint256 _amount = withdrawalAmount;
        withdrawalAmount = 0;
        claimee.transfer(_amount);

        // delete bounty
        selfdestruct(company);
    }

    function getParameters() public view returns (uint256 amount, uint256 bountyIssue, address bountyClaimee, address bountyCreator) {
        return (bountyAmount, companyIssue, claimee, bountyOrigin);
    }

    /**
     * @notice checks if _state and internal state match
     * @param _state the state to check against
     * @return true if states match - false otherwise
     */
    function checkState(States _state) private view returns (bool) {
        return state == _state ? true : false;
    }
}