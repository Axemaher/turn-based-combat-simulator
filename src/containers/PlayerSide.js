import React from "react";
import { connect } from "react-redux";
import {
    setTurn,
} from "../redux/actions";
import styled from 'styled-components';

import Avatar from "../components/Avatar";
import HpBar from "../components/HpBar";
import AttacksList from "../components/AttacksList";

const StyledSide = styled.div`
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    float: right;
`;

const StyledRow = styled.div`
    display: block;
`;


const ConnectedPlayerSide = ({ state, dispatch }) => {

    const { player } = state;
    const { setTurn } = dispatch;

    return (
        <StyledSide>
            <StyledRow>
                <Avatar name={player.name} />
            </StyledRow>
            <StyledRow>
                <HpBar
                    hp={player.hp}
                    maxHp={player.maxHp}
                    float='right' />
            </StyledRow>
            <AttacksList
                attacks={player.attacks}
            />
            <button onClick={() => setTurn()}>turn</button>
        </StyledSide>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: {
            setTurn: state => dispatch(setTurn(state)),
        }
    };
}

function mapStateToProps(state) {
    return {
        state: {
            turn: state.turn,
            player: state.player,
        }
    };
};

const PlayerSide = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConnectedPlayerSide);

export default PlayerSide;