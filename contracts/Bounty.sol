pragma solidity ^0.5.0;

import "./StateMachine.sol";

contract dCompany {
    function createBountyProposal(address) external pure {}
}

contract Bounty is StateMachine {

    modifier onlyCompany() {
        require(msg.sender == dCompanyInstance, "needs to come from the company");
        _;
    }
    
    /// events

    event RewardSupplied( address bountyAddress );
    event BountyClaimed( address bountyAddress, address claimee );
    event BountySolved( address bountyAddress, string commitHash );
    event BountyChecked( address bountyAddress, address election );
    event RewardPaid( address bountyAddress, address paymentRecipient );
    event BountyCancelled( address bountyAddress );
    event ClaimeeChanged(address bountyAddress, address oldClaimee, address newClaimee);

    /// variables

    address payable dCompanyInstance;
    address payable claimee;
    address payable bountyOrigin = address(0);
    
    string public commitHash;
    string public bountyDescription;

    bool public claimed = false;
    bool public solved = false;
    bool paid = false;

    uint256 public creationTime;
    uint256 public claimedAt;
    uint256 public bounty;

    bool private hasBounty;
    bool public cancel = false;

    /// fallback
    // prevent all payments exept those using deposit

    function() external payable {
        revert("Use Deposit instead");
    }

    /// constructor

    constructor(string memory _description, uint256 _bounty)
        public
    {
        dCompanyInstance = msg.sender;
        bountyDescription = _description;
        creationTime = now;
        bounty = _bounty;
        hasBounty = false;

        switchState(States.BountyCreated);
    }

    /// external

    function bountyWasChecked(address _election)
        external
        atState(States.HashSubmitted)
    {
        switchState(States.BountyChecked);
        emit BountyChecked(address(this), _election);
        payClaimee();
    }

    /// public

    function deposit(address payable _origin)
        public
        payable
        onlyCompany
        atState(States.BountyCreated)
    {

        require(msg.value == bounty, "provide bounty in one payment");
        switchState(States.RewardSupplied);
        hasBounty = true;
        bountyOrigin = _origin;

        emit RewardSupplied(address(this));
    }

    function cancelBounty(address payable _origin)
        public
        onlyCompany
        atStates(States.BountyCreated, States.BountyClaimed)
    {
        if (checkState(States.BountyCreated)) {
            switchState(States.BountyDestroyed);
            emit BountyCancelled(address(this));
            selfdestruct(_origin);
        }
        else {
            require(_origin == bountyOrigin, "Only bountyOrigin can cancel");
            switchState(States.BountyDestroyed);
            emit BountyCancelled(address(this));
            selfdestruct(bountyOrigin);
        }
    }

    function claimBounty(address payable _origin)
        public
        onlyCompany
        atStates(States.RewardSupplied, States.BountyClaimed)
    {
        require(_origin != bountyOrigin, "cannot be claimed by bountyOrigin");

        if (checkState(States.BountyClaimed)) {
            require(now >= (claimedAt + 1 days), "Can only be reclaimed after 1 Day");
            emit ClaimeeChanged(address(this), claimee, _origin);
        }

        switchState(States.BountyClaimed);
        claimed = true;
        claimedAt = now;
        claimee = _origin;

        emit BountyClaimed(address(this), _origin);
    }

    function submitHash(string memory _hash, address _origin)
        public
        onlyCompany
        atState(States.BountyClaimed)
    {
        require(_origin == claimee, "Hash can only be submitted by Claimee");

        switchState(States.HashSubmitted);
        solved = true;
        commitHash = _hash;

        emit BountySolved( address(this), commitHash);
    }

    /// internal

    /// private

    function createBountyProposal()
        private
        view
        atState(States.HashSubmitted)
    {
        dCompany(dCompanyInstance).createBountyProposal(address(this));
    }

    function payClaimee()
        private
        atState(States.BountyChecked)
    {
        switchState(States.BountyDestroyed);
        emit RewardPaid(address(this), claimee);
        selfdestruct(claimee);
    }
}