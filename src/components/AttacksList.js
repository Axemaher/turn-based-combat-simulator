import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import {
    playerApSubstract,
    enemyHpSubstract,
    battleEnd,
    setWinner,
    showInfo,
    hideInfo,
    setBattleInfoData,
} from "../redux/actions";
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
    const { playerApSubstract, enemyHpSubstract, showInfo, hideInfo, battleEnd, setWinner, setBattleInfoData } = dispatch;

    const [attackDisabled, setAttackDisabled] = useState(false)

    async function handleAttack({ damageMin, damageMax, apCost }) {
        setAttackDisabled(true);

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
            showInfo: state => dispatch(showInfo(state)),
            hideInfo: state => dispatch(hideInfo(state)),
            setBattleInfoData: state => dispatch(setBattleInfoData(state)),
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