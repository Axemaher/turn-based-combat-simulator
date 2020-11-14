import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';

//actions
import {
    setTurn,
    showInfo,
    hideInfo,
    setUiEnabled,
    setBattleInfoData,
    playerHpSubstract,
    playerApReset,
    playerEffectAdd,
    enemyApSubstract,
    enemyApReset,
    enemyUsesPerBattleSubstract,
} from "../../store/actions";

//effects
import {
    LOOSE_NEXT_TURN,
} from '../../utils/constans';

//utils
import { sleep } from '../../utils/sleep';
import { animationsDelay } from '../../utils/data/animationsDelay';
import { battleInfoHandler } from '../../utils/functions/battleInfoHandler';
import { damageCalculation } from '../../utils/functions/damageCalculation';
import { addEffects } from '../../utils/functions/addEffects';
import { checkEffects } from '../../utils/functions/checkEffects';
import { checkWinner } from '../../utils/functions/checkWinner';

//components
import Avatar from "../../components/Avatar";
import HpBar from "../../components/HpBar";
import EffectsBar from "../../components/EffectsBar";

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

    const { player, enemy, turn, battleStarted } = state;
    const { setTurn, playerApReset, enemyApReset, playerHpSubstract, enemyApSubstract, showInfo, hideInfo, setUiEnabled, setBattleInfoData, enemyUsesPerBattleSubstract } = dispatch;
    const [attackStarted, setAttackStarted] = useState(false)

    const handleCheckTurn = () => {
        setTurn();
        playerApReset();
        enemyApReset();
        setUiEnabled(true);
    }

    const enemyAttack = () => {
        // if enemy win stop attacking
        if (checkWinner().battleEnded) {
            //display end info
            return
        } else {
            if (battleStarted) {
                setUiEnabled(false);

                // checking negative effects first (only one time on turn)
                checkEffects(enemy, turn)

                // if negative effects kill enemy
                if (checkWinner().battleEnded) {
                    //display end info
                    return
                } else {
                    // checking winner after substract hp from negative effects
                    checkWinner()

                    // enemy not attacking if have effect LOOSE_NEXT_TURN
                    let looseThisTurn = null;
                    enemy.effects.forEach(effect => {
                        if (effect.name === LOOSE_NEXT_TURN) {
                            looseThisTurn = true;
                            setUiEnabled(true);
                        }
                    })

                    // enemy NOT loose this turn 
                    if (!looseThisTurn) {
                        handleAttack()
                    }
                }

            }
        }
    }

    // normal attack
    async function handleAttack() {
        setAttackStarted(true);

        const availableAttacks = () => enemy.attacks.filter(e => (e.apCost <= enemy.ap && e.usesPerBattle > 0));

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
                effects: enemy.attacks[enemyAttackIndex].effects,
                id: enemy.attacks[enemyAttackIndex].id
            }

            let effectData = [];

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

            //adding negative effects to enemy
            if (!damageData.miss) {
                effectData = addEffects(enemyAttackData.effects, turn);
            }

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
                effects: effectData
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
            enemyUsesPerBattleSubstract(enemyAttackData.id)
            await sleep(animationsDelay.beforeHideInfo);
            hideInfo();
            //animation ended
            await sleep(animationsDelay.beforeChangeData);

            setAttackStarted(false);
            if (!availableAttacksLength) {
                setAttackStarted(false);
                handleCheckTurn();
            }

            checkWinner()

        }
    }



    useEffect(() => {
        if (!turn && !attackStarted && battleStarted) {
            enemyAttack();
        }
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [turn, attackStarted, battleStarted])

    return (
        <StyledSide>
            <StyledRowRight>
                <EffectsBar effects={enemy.effects} reverse={true} />
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
            showInfo: state => dispatch(showInfo(state)),
            hideInfo: state => dispatch(hideInfo(state)),
            setUiEnabled: state => dispatch(setUiEnabled(state)),
            setBattleInfoData: state => dispatch(setBattleInfoData(state)),
            playerHpSubstract: state => dispatch(playerHpSubstract(state)),
            playerEffectAdd: state => dispatch(playerEffectAdd(state)),
            playerApReset: state => dispatch(playerApReset(state)),
            enemyApSubstract: state => dispatch(enemyApSubstract(state)),
            enemyApReset: state => dispatch(enemyApReset(state)),
            enemyUsesPerBattleSubstract: state => dispatch(enemyUsesPerBattleSubstract(state)),
        }
    };
}

function mapStateToProps(state) {
    return {
        state: {
            turn: state.turn,
            battleStarted: state.battle.battleStarted,
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