import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
    setTurn,
    battleStart,
    battleEnd,
    setWinner,
    playerHpSubstract,
    playerApReset,
    enemyApSubstract,
    enemyApReset,
} from "../redux/actions";
import styled from 'styled-components';

import Avatar from "../components/Avatar";
import HpBar from "../components/HpBar";

const StyledSide = styled.div`
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    float: right;
`;

const StyledRow = styled.div`
    display: block;
`;

const StyledRowRight = styled(StyledRow)`
    display: flex;
    justify-content: flex-end;
`;


const ConnectedEnemySide = ({ state, dispatch }) => {

    const { player, enemy, turn, battle } = state;
    const { setTurn, playerApReset, enemyApReset, playerHpSubstract, enemyApSubstract, battleEnd, setWinner } = dispatch;

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!turn) {
                const availableAttacks = () => enemy.attacks.filter(e => e.apCost <= enemy.ap);
                if (availableAttacks().length === 0) {
                    setTurn();
                    playerApReset();
                    enemyApReset();
                } else {
                    const enemyAttackIndex = Math.floor(Math.random() * availableAttacks().length);
                    const enemyAttackData = {
                        name: enemy.attacks[enemyAttackIndex].name,
                        damage: enemy.attacks[enemyAttackIndex].damage,
                        apCost: enemy.attacks[enemyAttackIndex].apCost,
                    }
                    playerHpSubstract(enemyAttackData.damage);
                    enemyApSubstract(enemyAttackData.apCost);

                    if (!availableAttacks().length) {
                        setTurn();
                        playerApReset();
                        enemyApReset();
                    }
                }
            }
        }, 500);
        if (battle.winner === null) {
            if (!player.hp) {
                setTimeout(() => {
                    battleEnd();
                    setWinner(enemy.name);
                    alert("enemy win")
                }, 500);

            } else if (!enemy.hp) {
                setTimeout(() => {
                    battleEnd();
                    setWinner(player.name);
                    alert("player win")
                }, 500);
            }
        }

        return () => clearTimeout(timer)
    }, [turn, enemy.ap, player.hp, enemy.hp])

    return (
        <StyledSide>
            <StyledRowRight>
                <Avatar name={enemy.name} />
            </StyledRowRight>
            <StyledRow>
                <HpBar
                    hp={enemy.hp}
                    maxHp={enemy.maxHp}
                    float='left' />
            </StyledRow>
        </StyledSide>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: {
            setTurn: state => dispatch(setTurn(state)),
            battleStart: state => dispatch(battleStart(state)),
            battleEnd: state => dispatch(battleEnd(state)),
            setWinner: state => dispatch(setWinner(state)),
            playerHpSubstract: state => dispatch(playerHpSubstract(state)),
            playerApReset: state => dispatch(playerApReset(state)),
            enemyApSubstract: state => dispatch(enemyApSubstract(state)),
            enemyApReset: state => dispatch(enemyApReset(state)),
        }
    };
}

function mapStateToProps(state) {
    return {
        state: {
            turn: state.turn,
            battle: state.battle,
            player: state.player,
            enemy: state.enemy,
        }
    };
};

const EnemySide = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConnectedEnemySide);

export default EnemySide;