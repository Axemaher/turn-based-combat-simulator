import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import FrameLight from '../../../components/FrameLight';

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
} from "../../../store/actions";

//utils
import { sleep } from '../../../utils/sleep';
import { animationsDelay } from '../../../utils/data/animationsDelay';
import { battleInfoHandler } from '../../../utils/functions/battleInfoHandler';
import { damageCalculation } from '../../../utils/functions/damageCalculation';
import { addEffects } from '../../../utils/functions/addEffects';
import { checkEffects } from '../../../utils/functions/checkEffects';
import { checkWinner } from '../../../utils/functions/checkWinner';


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

const ConnectedAttacksList = ({ state, dispatch }) => {

    const { player, enemy, turn, battle } = state;
    const { playerApSubstract, enemyHpSubstract, showInfo, hideInfo, setBattleInfoData, setUiEnabled, playerUsesPerBattleSubstract
    } = dispatch;

    async function handleAttack({ damageMin, damageMax, apCost, effects, id }) {
        setUiEnabled(false);

        //adding negative effects to enemy
        const effectData = addEffects(effects, turn);

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
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [turn])

    return (
        <StyledAttacksList>
            {player.attacks.map(attack => (
                <StyledAttack key={attack.name}>
                    <FrameLight>
                        <StyledButtonAttack
                            disabled={
                                !battle.uiEnabled ||
                                attack.apCost > player.ap ||
                                attack.usesPerBattle <= 0
                            }
                            onClick={() => handleAttack(
                                {
                                    damageMin: attack.damageMin,
                                    damageMax: attack.damageMax,
                                    apCost: attack.apCost,
                                    effects: attack.effects,
                                    id: attack.id
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