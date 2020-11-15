import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import FrameLight from '../../components/FrameLight';
import AttackInfo from '../../components/AttackInfo';
//actions
import {
    playerApSubstract,
    playerUsesPerBattleSubstract,
    enemyHpSubstract,
    showInfo,
    hideInfo,
    setUiEnabled,
    setBattleInfoData,
    enemyEffectAdd
} from "../../store/actions";

//utils
import { sleep } from '../../utils/sleep';
import { animationsDelay } from '../../utils/data/animationsDelay';
import { battleInfoHandler } from '../../utils/functions/battleInfoHandler';
import { damageCalculation } from '../../utils/functions/damageCalculation';
import { addEffects } from '../../utils/functions/addEffects';
import { checkEffects } from '../../utils/functions/checkEffects';
import { checkWinner } from '../../utils/functions/checkWinner';

import longPressEvent from '../../utils/useLongPress';

const StyledButtonAttack = styled.button`
    background-color: transparent;
    border: none;
    max-width: 40px;
    max-height: 40px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all .2s;
    opacity: ${({ disabled }) => disabled ? '.3' : '1'};
    color: ${({ theme }) => theme.colors.font};
    cursor: pointer;
`;

const StyledAttacksList = styled.ul`
    padding: 0;
    display: flex;
    flex-basis: auto;
`;

const StyledAttack = styled.li`
    display: inline-block;
    position: relative;
    cursor: pointer;
`;

const StyledAttackImg = styled.img`
    width: 100%;
    pointer-events: none;
`;

const ConnectedAttacksList = ({ state, dispatch }) => {

    const { player, enemy, turn, battle } = state;
    const { playerApSubstract, enemyHpSubstract, showInfo, hideInfo, setBattleInfoData, setUiEnabled, playerUsesPerBattleSubstract
    } = dispatch;

    const [hoverIndex, setHoverIndex] = useState(null);



    async function handleAttack({ damageMin, damageMax, apCost, effects, id }) {
        setUiEnabled(false);
        let effectData = [];
        //calculating damage
        const damageData = damageCalculation(
            {
                damageMax,
                damageMin,
                criticalChance: player.stats.criticalChance,
                criticalMod: player.stats.criticalMod,
                chanceToMiss: player.stats.chanceToMiss,
            }
        )

        //adding negative effects to enemy
        if (!damageData.miss) {
            effectData = addEffects(effects, turn);
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

        //send data to battle info
        setBattleInfoData(
            battleInfoHandler(messageData)
        );

        //animation started
        await sleep(animationsDelay.beforeShowInfo);
        showInfo();
        await sleep(animationsDelay.beforeChangeData);
        enemyHpSubstract(damageData.damage);
        playerApSubstract(apCost);
        playerUsesPerBattleSubstract(id);
        await sleep(animationsDelay.beforeHideInfo);
        hideInfo();
        //animation ended

        setUiEnabled(true)

        checkWinner()

    }

    useEffect(() => {

        // checking negative effects first (only one time on turn)
        if (turn) {
            setUiEnabled(true);

            checkEffects(player, turn)

            // checking winner after substract hp from negative effects
            checkWinner()

        }

        // disable long press context menu 
        window.oncontextmenu = function (event) {
            event.preventDefault();
            event.stopPropagation();
            return false
        }

        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [turn])

    //handling press
    const onLongPress = (index) => {
        setHoverIndex(index)
    };

    const onClick = (attack) => {
        if (!battle.uiEnabled ||
            attack.apCost > player.ap ||
            attack.usesPerBattle <= 0 ||
            attack.id === "EMPTY") {
        } else {
            handleAttack(
                {
                    damageMin: attack.damageMin,
                    damageMax: attack.damageMax,
                    apCost: attack.apCost,
                    effects: attack.effects,
                    id: attack.id
                }
            )
        }
        setHoverIndex(null)

    }

    return (
        <StyledAttacksList>
            {player.attacks.map((attack, index) => (
                <StyledAttack
                    key={attack.id + index}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                >
                    <FrameLight>
                        <StyledButtonAttack
                            disabled={
                                !battle.uiEnabled ||
                                attack.apCost > player.ap ||
                                attack.usesPerBattle <= 0
                            }
                            {...longPressEvent(() => onLongPress(index), () => onClick(attack))}
                        >
                            <StyledAttackImg src={attack.ico} />
                        </StyledButtonAttack>
                    </FrameLight>
                    <AttackInfo
                        visible={hoverIndex === index}
                        attackInfo={attack}
                        setHoverIndex={setHoverIndex}
                    />
                </StyledAttack>
            ))}
        </StyledAttacksList>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: {
            playerApSubstract: state => dispatch(playerApSubstract(state)),
            playerUsesPerBattleSubstract: state => dispatch(playerUsesPerBattleSubstract(state)),
            enemyHpSubstract: state => dispatch(enemyHpSubstract(state)),
            showInfo: state => dispatch(showInfo(state)),
            hideInfo: state => dispatch(hideInfo(state)),
            setUiEnabled: state => dispatch(setUiEnabled(state)),
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