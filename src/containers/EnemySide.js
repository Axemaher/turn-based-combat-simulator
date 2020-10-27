import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    setTurn,
    battleStart,
    battleEnd,
    setWinner,
    showInfo,
    hideInfo,
    setBattleInfoData,
    playerHpSubstract,
    playerApReset,
    playerEffectAdd,
    enemyApSubstract,
    enemyHpSubstract,
    enemyApReset,
    enemyEffectTurnSubstract,
    enemyEffectSubstract,
} from "../redux/actions";
//effects
import { LOOSE_NEXT_TURN, POISON, BLEEDING } from '../js/constans';

import styled from 'styled-components';
import { sleep } from '../utils/sleep';
import { animationsDelay } from '../js/animationsDelay';
import { battleInfoHandler } from '../js/battleInfoHandler';
import damageCalculation from '../js/damageCalculation';

import Avatar from "../components/Avatar";
import HpBar from "../components/HpBar";

const StyledSide = styled.div`
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    float: right;
    grid-area: enemySide;
    @media ${({ theme }) => theme.device.mobileL} {
        flex-direction: column-reverse;
    }
`;

const StyledRow = styled.div`
    display: block;
`;

const StyledRowRight = styled(StyledRow)`
    display: flex;
    justify-content: flex-end;
`;


const ConnectedEnemySide = ({ state, dispatch }) => {

    const { player, enemy, turn } = state;
    const { setTurn, playerApReset, enemyApReset, playerHpSubstract, enemyApSubstract, enemyHpSubstract, battleEnd, setWinner, showInfo, hideInfo, setBattleInfoData, playerEffectAdd, enemyEffectTurnSubstract, enemyEffectSubstract } = dispatch;
    const [attackStarted, setAttackStarted] = useState(false)

    const handleCheckTurn = () => {
        setTurn();
        playerApReset();
        enemyApReset();
    }

    const enemyAttack = () => {
        // checking negative effects first (only one time on turn)
        if (enemy.ap === enemy.maxAp) {
            if (enemy.effects.length !== 0) {
                enemy.effects.forEach(effect => {
                    if (effect.turns === 0) {
                        enemyEffectSubstract(effect.name)
                    }
                    switch (effect.name) {
                        case LOOSE_NEXT_TURN:
                            enemyEffectSubstract(LOOSE_NEXT_TURN)
                            setTurn()
                            break;
                        case POISON:
                            enemyEffectTurnSubstract(POISON)
                            enemyHpSubstract(enemy.stats.poisonDamage)

                            break;
                        case BLEEDING:
                            enemyEffectTurnSubstract(BLEEDING)
                            enemyHpSubstract(enemy.stats.poisonDamage)
                            break;
                        default:
                            break;
                    }
                });
            }
        }
        // enemy loose this turn negative effect check
        let looseThisTurn = null;
        enemy.effects.forEach(effect => {
            if (effect.name === LOOSE_NEXT_TURN) {
                looseThisTurn = true;
            }
        })
        // enemy NOT loose this turn 
        if (!looseThisTurn) {
            handleAttack()
        }
    }

    // normal attack
    async function handleAttack() {
        setAttackStarted(true);

        const availableAttacks = () => enemy.attacks.filter(e => e.apCost <= enemy.ap);
        const availableAttacksLength = availableAttacks().length;
        if (!availableAttacksLength) {
            setAttackStarted(false);
            handleCheckTurn();
        } else {
            const enemyAttackIndex = Math.floor(Math.random() * availableAttacksLength);
            const enemyAttackData = {
                name: enemy.attacks[enemyAttackIndex].name,
                damageMax: enemy.attacks[enemyAttackIndex].damageMax,
                damageMin: enemy.attacks[enemyAttackIndex].damageMin,
                apCost: enemy.attacks[enemyAttackIndex].apCost,
                effects: enemy.attacks[enemyAttackIndex].effects
            }

            //calculating damage
            const damageData = damageCalculation(
                {
                    damageMax: enemyAttackData.damageMax,
                    damageMin: enemyAttackData.damageMin,
                    criticalChance: enemy.stats.criticalChance,
                    criticalMod: enemy.stats.criticalMod,
                    chanceToMiss: enemy.stats.chanceToMiss
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
                damage: damageData.damage
            }
            //adding negative effects to player
            if (enemyAttackData.effects) {
                enemyAttackData.effects.forEach(effect => {
                    if (Math.random() * 100 < effect.chance) {
                        playerEffectAdd(
                            {
                                name: effect.name,
                                turns: effect.turns
                            })
                    }
                });
            }

            setBattleInfoData(
                battleInfoHandler(messageData)
            );

            //animation started
            await sleep(animationsDelay.beforeShowInfo);
            showInfo();
            await sleep(animationsDelay.beforeChangeData);
            playerHpSubstract(damageData.damage);
            enemyApSubstract(enemyAttackData.apCost);
            await sleep(animationsDelay.beforeHideInfo);
            hideInfo();
            //animation ended
            setAttackStarted(false);
            if (!availableAttacksLength) {
                setAttackStarted(false);
                handleCheckTurn();
            }
            if (player.hp - damageData.damage <= 0) {
                battleEnd();
                setWinner(enemy.name);
                await sleep(animationsDelay.beforeBattleEndInfo);
                alert("enemy win")
            }
        }
    }



    useEffect(() => {
        if (!turn && !attackStarted) {
            enemyAttack();

        }
        return () => { }
    }, [turn, attackStarted])

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
            showInfo: state => dispatch(showInfo(state)),
            hideInfo: state => dispatch(hideInfo(state)),
            setBattleInfoData: state => dispatch(setBattleInfoData(state)),
            playerHpSubstract: state => dispatch(playerHpSubstract(state)),
            playerEffectAdd: state => dispatch(playerEffectAdd(state)),
            playerApReset: state => dispatch(playerApReset(state)),
            enemyApSubstract: state => dispatch(enemyApSubstract(state)),
            enemyHpSubstract: state => dispatch(enemyHpSubstract(state)),
            enemyApReset: state => dispatch(enemyApReset(state)),
            enemyEffectTurnSubstract: state => dispatch(enemyEffectTurnSubstract(state)),
            enemyEffectSubstract: state => dispatch(enemyEffectSubstract(state)),
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