import React from "react";
import { connect } from "react-redux";
import {
    setTurn,
} from "../../store/actions";
import styled from 'styled-components';

import Avatar from "../../components/Avatar";
import HpBar from "../../components/HpBar";
import ApBar from "./ApBar";
import AttacksList from "./AttacksList";
import EffectsBar from "../../components/EffectsBar";

const StyledSide = styled.div`
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    float: right;
    grid-area: playerSide;
`;

const StyledRow = styled.div`
    display: block;
`;

const StyledRowOneLine = styled(StyledRow)`
    display: flex;
    align-items: flex-end;
`;


const ConnectedPlayerSide = ({ state, dispatch }) => {

    const { player, uiEnabled } = state;
    const { setTurn } = dispatch;

    return (
        <StyledSide>
            <StyledRowOneLine>
                <Avatar name={player.name} />
                <EffectsBar effects={player.effects} reverse={false} />
            </StyledRowOneLine>
            <StyledRow>
                <HpBar
                    hp={player.hp}
                    maxHp={player.maxHp}
                    float='right' />
            </StyledRow>
            <StyledRow>
                <ApBar
                    ap={player.ap}
                    maxAp={player.maxAp} />
            </StyledRow>
            <AttacksList />
            <button
                disabled={!uiEnabled}
                onClick={() => setTurn()}
            >
                turn
                </button>
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
            player: state.player,
            uiEnabled: state.battle.uiEnabled
        }
    };
};

const PlayerSide = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConnectedPlayerSide);

export default PlayerSide;