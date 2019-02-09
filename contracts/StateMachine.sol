pragma solidity ^0.5.0;

contract StateMachine {
    enum States {
        BountyCreated,
        RewardSupplied,
        BountyClaimed,
        HashSubmitted,
        BountyChecked,
        BountyDestroyed,
        NumberOfStates
    }

    States private state;

    modifier atState(States _state) {
        require(state == _state, "contract is in wrong state");
        _;
    }

    modifier atTwoStates(States _firstState, States _secondState) {
        require(
            state == _firstState || state == _secondState,
            "contract is not in either state provided"
        );
        _;
    }

    modifier atThreeStates(States _firstState, States _secondState, States _thirdState) {
        require(
            state == _firstState || state == _secondState || state == _thirdState,
            "contract is not in either state provided"
        );
        _;
    }

    function switchState(States _state)
        internal
    {
        require(
            uint256(_state) < uint256(States.NumberOfStates),
            "incorrect state index"
        );
        state = _state;
    }

    function checkState(States _state)
        internal
        view
        returns (bool)
    {
        return state == _state ? true : false;
    }
}