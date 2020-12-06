import React from 'react';
import { connect } from "react-redux";
import Button from '../../components/Button';

import {
    setTurn,
} from "../../store/actions";

const ConnectedTurnButton = ({ uiEnabled, setTurn, turn }) => {

    const handleClick = () => {
        return !uiEnabled ? null : setTurn()
    };

    return (
        <Button
            disabled={!uiEnabled || !turn}
            onClick={() => handleClick()}
        >
            turn
        </Button>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        setTurn: state => dispatch(setTurn(state)),
    };
}

function mapStateToProps(state) {
    return {
        uiEnabled: state.battle.uiEnabled,
        turn: state.turn,
    };
};

const TurnButton = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConnectedTurnButton);

export default TurnButton;