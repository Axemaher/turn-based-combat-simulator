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
    enemyAbilityUsesPerBattleSubstract,
} from "../../store/actions";

//effects
import {
    LOOSE_NEXT_TURN,
} from '../../utils/constans/effects';

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

    const { setTurn, playerApReset, enemyApReset, playerHpSubstract, enemyApSubstract, showInfo, hideInfo, setUiEnabled, setBattleInfoData, enemyAbilityUsesPerBattleSubstract } = dispatch;

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
                const { ap, maxAp, effects, name, defense } = enemy;
                // checking negative effects first (only one time on turn)
                checkEffects(ap, maxAp, effects, name, turn, defense);

                // if negative effects kill enemy
                if (checkWinner().battleEnded) {
                    //display end info
                    return
                } else {
                    // checking winner after substract hp from negative effects
                    checkWinner()

                    // enemy not attacking if have effect LOOSE_NEXT_TURN
                    let looseThisTurn = null;
                    effects.forEach(effect => {
                        if (effect.id === LOOSE_NEXT_TURN) {
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

        const availableAttacksFilter = () => enemy.abilities.filter(e => (e.apCost <= enemy.ap && e.usesPerBattle > 0));

        const availableAttacksLength = availableAttacksFilter().length;

        if (!availableAttacksLength) {
            setAttackStarted(false);
            handleCheckTurn();
        } else {
            const enemyAttackIndex = Math.floor(Math.random() * availableAttacksLength);

            const availableAttacks = availableAttacksFilter()

            const attack = availableAttacks[enemyAttackIndex];
            const enemyAttackData = {
                name: attack.name,
                damageType: attack.damageType,
                damageMax: attack.damageMax,
                damageMin: attack.damageMin,
                apCost: attack.apCost,
                effects: attack.effects,
                id: attack.id
            }

            let effectData = [];

            //calculating damage
            const damageData = damageCalculation(
                {
                    damageMax: enemyAttackData.damageMax,
                    damageMin: enemyAttackData.damageMin,
                    criticalChance: enemy.stats.criticalChance,
                    criticalMod: enemy.stats.criticalMod,
                    chanceToMiss: enemy.stats.chanceToMiss,
                    damageType: enemyAttackData.damageType,
                    defense: player.defense
                }
            )

            //adding effects to self/enemy
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
            enemyAbilityUsesPerBattleSubstract(enemyAttackData.id)
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
                <Avatar name={enemy.name} src={require(`../../assets/avatars/${enemy.avatar}.png`)} />
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
            enemyAbilityUsesPerBattleSubstract: state => dispatch(enemyAbilityUsesPerBattleSubstract(state)),
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