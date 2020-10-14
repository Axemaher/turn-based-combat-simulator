import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import {
    playerApSubstract,
    enemyHpSubstract,
    battleEnd,
    setWinner,
} from "../redux/actions";
import FrameLight from '../components/FrameLight'

const StyledP = styled.p`
    text-align: left;
    font-size: .9em;
`;

const StyledButtonAttack = styled.button`
    background-color: transparent;
    border: none;
    width: 40px;
    height: 40px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all .2s;
    opacity: ${({ disabled }) => disabled ? '.3' : '1'};
    color: ${({ theme }) => theme.colors.white};
`;

const StyledAttacksList = styled.ul`
    padding: 0;
`;

const StyledAttack = styled.li`
    display: inline-block;
`;

const ConnectedAttacksList = ({ state, dispatch, attacks }) => {

    const { player, turn } = state;

    const [attackDisabled, setAttackDisabled] = useState(false)

    const handleAttack = ({ damage, apCost }) => {
        setAttackDisabled(true)
        setTimeout(() => {
            dispatch.enemyHpSubstract(damage);
            dispatch.playerApSubstract(apCost);

            setAttackDisabled(false);
        }, 500);
    }


    return (
        <StyledAttacksList>
            {attacks.map(attack => (
                <StyledAttack key={attack.name}>
                    <FrameLight>
                        <StyledButtonAttack
                            disabled={attackDisabled || attack.apCost > player.ap || !turn}
                            onClick={() => handleAttack(
                                {
                                    damage: attack.damage,
                                    apCost: attack.apCost
                                }
                            )}>
                            <div>
                                <StyledP>{attack.name}</StyledP>
                                <StyledP>AP: {attack.apCost}</StyledP>
                            </div>
                        </StyledButtonAttack>
                    </FrameLight>
                </StyledAttack>
            ))}
        </StyledAttacksList>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: {
            playerApSubstract: state => dispatch(playerApSubstract(state)),
            enemyHpSubstract: state => dispatch(enemyHpSubstract(state)),
            battleEnd: state => dispatch(battleEnd(state)),
            setWinner: state => dispatch(setWinner(state)),
        }
    };
}

function mapStateToProps(state) {
    return {
        state: {
            turn: state.turn,
            battleStarted: state.battleStarted,
            player: state.player,
            enemy: state.enemy,
        }
    };
};

const AttacksList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConnectedAttacksList);

export default AttacksList;