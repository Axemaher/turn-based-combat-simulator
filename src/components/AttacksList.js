import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import {
    setTurn,
    playerApSubstract,
    playerHpSubstract,
    playerEffectTurnSubstract,
    playerEffectSubstract,
    enemyHpSubstract,
    battleEnd,
    setWinner,
    showInfo,
    hideInfo,
    setBattleInfoData,
    enemyEffectAdd
} from "../redux/actions";
//effects
import { LOOSE_NEXT_TURN, POISON, BLEEDING } from '../js/constans';

import FrameLight from '../components/FrameLight';
import { sleep } from '../utils/sleep';
import { animationsDelay } from '../js/animationsDelay';
import { battleInfoHandler } from '../js/battleInfoHandler';
import damageCalculation from '../js/damageCalculation';

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
    color: ${({ theme }) => theme.colors.font};
`;

const StyledAttacksList = styled.ul`
    padding: 0;
`;

const StyledAttack = styled.li`
    display: inline-block;
`;

const ConnectedAttacksList = ({ state, dispatch, attacks }) => {

    const { player, enemy, turn } = state;
    const { setTurn, playerApSubstract, enemyHpSubstract, showInfo, hideInfo, battleEnd, setWinner, setBattleInfoData, enemyEffectAdd, playerEffectTurnSubstract, playerEffectSubstract,
        playerHpSubstract, } = dispatch;

    const [attackDisabled, setAttackDisabled] = useState(false)

    async function handleAttack({ damageMin, damageMax, apCost, effects }) {
        setAttackDisabled(true);
        //adding negative effects to enemy
        if (effects) {
            effects.forEach(effect => {
                if (Math.random() * 100 < effect.chance) {
                    enemyEffectAdd(
                        {
                            name: effect.name,
                            turns: effect.turns
                        })
                }
            });
        }
        //calculating damage
        const damageData = damageCalculation(
            {
                damageMax,
                damageMin,
                criticalChance: player.stats.criticalChance,
                criticalMod: player.stats.criticalMod,
                chanceToMiss: player.stats.chanceToMiss
            }
        )

        const messageData = {
            playerTurn: turn,
            playerName: player.name,
            playerHp: player.hp,
            playerMaxHp: player.maxHp,
            playerAp: player.ap,
            playerMaxAp: player.maxAp,
            enemyName: enemy.name,
            enemyHp: enemy.hp,
            enemyMaxHp: enemy.maxHp,
            critical: damageData.critical,
            missed: damageData.miss,
            damage: damageData.damage,
        }

        setBattleInfoData(
            battleInfoHandler(messageData)
        );
        //animation started
        await sleep(animationsDelay.beforeShowInfo);
        showInfo();
        await sleep(animationsDelay.beforeChangeData);
        enemyHpSubstract(damageData.damage);
        playerApSubstract(apCost);
        await sleep(animationsDelay.beforeHideInfo);
        hideInfo();
        //animation ended
        setAttackDisabled(false);

        if (enemy.hp - damageData.damage <= 0) {
            battleEnd();
            setWinner(player.name);
            await sleep(animationsDelay.beforeBattleEndInfo);
            alert("player win")
        }
    }

    useEffect(() => {
        // checking negative effects first (only one time on turn)
        if (player.ap === player.maxAp && turn) {
            if (player.effects.length !== 0) {
                player.effects.forEach(effect => {
                    if (effect.turns === 0) {
                        playerEffectSubstract(effect.name)
                    }
                    switch (effect.name) {
                        case LOOSE_NEXT_TURN:
                            playerEffectSubstract(LOOSE_NEXT_TURN)
                            setTurn()
                            break;
                        case POISON:
                            playerEffectTurnSubstract(POISON)
                            playerHpSubstract(player.stats.poisonDamage)

                            break;
                        case BLEEDING:
                            playerEffectTurnSubstract(BLEEDING)
                            playerHpSubstract(player.stats.poisonDamage)
                            break;
                        default:
                            break;
                    }
                });
            }
        }
        return () => { }
    }, [turn])

    return (
        <StyledAttacksList>
            {attacks.map(attack => (
                <StyledAttack key={attack.name}>
                    <FrameLight>
                        <StyledButtonAttack
                            disabled={attackDisabled || attack.apCost > player.ap || !turn}
                            onClick={() => handleAttack(
                                {
                                    damageMin: attack.damageMin,
                                    damageMax: attack.damageMax,
                                    apCost: attack.apCost,
                                    effects: attack.effects
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
            setTurn: state => dispatch(setTurn(state)),
            playerApSubstract: state => dispatch(playerApSubstract(state)),
            playerHpSubstract: state => dispatch(playerHpSubstract(state)),
            playerEffectTurnSubstract: state => dispatch(playerEffectTurnSubstract(state)),
            playerEffectSubstract: state => dispatch(playerEffectSubstract(state)),
            enemyHpSubstract: state => dispatch(enemyHpSubstract(state)),
            battleEnd: state => dispatch(battleEnd(state)),
            setWinner: state => dispatch(setWinner(state)),
            showInfo: state => dispatch(showInfo(state)),
            hideInfo: state => dispatch(hideInfo(state)),
            setBattleInfoData: state => dispatch(setBattleInfoData(state)),
            enemyEffectAdd: state => dispatch(enemyEffectAdd(state)),
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

const AttacksList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConnectedAttacksList);

export default AttacksList;