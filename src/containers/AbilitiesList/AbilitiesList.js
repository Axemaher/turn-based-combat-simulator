import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import AbilityInfo from '../../components/AbilityInfo';
import atkIco from '../../assets/ATKdark.png';

//actions
import {
    playerApSubstract,
    playerHpAdd,
    playerUtilityUsesPerBattleSubstract,
    playerAbilityUsesPerBattleSubstract,
    enemyHpSubstract,
    showInfo,
    hideInfo,
    setUiEnabled,
    setBattleInfoData,
} from "../../store/actions";

import {
    EMPTY,
    UTILITY,
    ATTACK,
    SPEC_ATTACK,
} from '../../utils/constans/';

//utils
import { sleep } from '../../utils/sleep';
import { animationsDelay } from '../../utils/data/animationsDelay';
import { battleInfoHandler } from '../../utils/functions/battleInfoHandler';
import { checkUtilitiesEffects } from '../../utils/functions/checkUtilitiesEffects';
import { checkEffects } from '../../utils/functions/checkEffects';
import { checkWinner } from '../../utils/functions/checkWinner';
import { handleUseUtility } from '../../utils/functions/handleUseUtility';
import { addEffects } from '../../utils/functions/addEffects';
import { damageCalculation } from '../../utils/functions/damageCalculation';

import longPressEvent from '../../utils/useLongPress';

const StyledAbilitiesList = styled.ul`
    padding: 0;
    display: flex;
    flex-basis: auto;
    list-style: none;
`;

const AbilityWrapper = styled.li``;

const StyledButtonUse = styled.button`
    background-color: transparent;
    border: none;
    text-align: left;
    display: flex; 
    justify-content: center;
    align-items: center;
    transition: all .2s;
    color: ${({ theme }) => theme.colors.font};
    background-image: url(${atkIco});
    background-size: cover;
    background-position: center;
    width: 56px;
    height: 56px;
    margin: 0 2px;
    position: relative;
    cursor: pointer;
    @media ${({ theme }) => theme.device.mobileL} {
        width: calc(92vw / 6);
        height: calc(92vw / 6);
    }
`;

const AbilityImg = styled.div`
    background-image: url(${({ img }) => img});
    opacity: ${({ disabled }) => disabled ? '.3' : '1'};
    background-position: center;
    background-size: cover;
    width: 70%;
    height: 70%;
`;

const ConnectedAbilitiesList = ({ state, dispatch }) => {

    const { player, enemy, turn, battle } = state;
    const { playerApSubstract, enemyHpSubstract, showInfo, hideInfo, setBattleInfoData, setUiEnabled, playerUtilityUsesPerBattleSubstract, playerAbilityUsesPerBattleSubstract
    } = dispatch;

    const [hoverIndex, setHoverIndex] = useState(null);


    async function handleUse(ability) {

        const {
            type,
            // damageType,
            useValue,
            name,
            label,
            apCost,
            damageMin,
            damageMax,
            effects,
            id,
            turnsDuration
        } = ability;

        setUiEnabled(false);
        let effectData = [];
        let damageData = null;
        let messageData = null;

        if (type === ATTACK || type === SPEC_ATTACK) {
            //calculating damage
            damageData = damageCalculation(
                {
                    damageMax,
                    damageMin,
                    criticalChance: player.stats.criticalChance,
                    criticalMod: player.stats.criticalMod,
                    chanceToMiss: player.stats.chanceToMiss,
                    damageType: ability.damageType,
                    defense: enemy.defense
                }
            )

            //adding effects to self/enemy
            if (!damageData.miss) {
                effectData = addEffects(effects, turn);
            }

            messageData = {
                type,
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

        } else if (type === UTILITY) {
            effectData = addEffects(effects, turn);

            messageData = {
                type,
                useValue,
                utilityName: name,
                playerTurn: turn,
                playerName: player.name,
                effects: effectData
            }
        }


        //send data to battle info
        setBattleInfoData(
            battleInfoHandler(messageData)
        );

        // animation started
        await sleep(animationsDelay.beforeShowInfo);
        showInfo();
        await sleep(animationsDelay.beforeChangeData);

        if (type === ATTACK || type === SPEC_ATTACK) {
            enemyHpSubstract(damageData.damage);
            playerAbilityUsesPerBattleSubstract(id);
        } else if (type === UTILITY) {
            handleUseUtility(id, name, label, useValue, turnsDuration)
            playerUtilityUsesPerBattleSubstract(id);
        }

        playerApSubstract(apCost);
        await sleep(animationsDelay.beforeHideInfo);
        hideInfo();
        // animation ended

        setUiEnabled(true)
        checkWinner()

    }

    useEffect(() => {
        // checking negative effects first (only one time on turn)
        if (turn) {
            setUiEnabled(true);

            const { ap, maxAp, effects, name, defense } = player;
            checkEffects(ap, maxAp, effects, name, turn, defense)

            // checking winner after substract hp from negative effects
            checkWinner()
        }

        checkUtilitiesEffects(
            player.ap,
            player.maxAp,
            player.utilityEffects,
            turn)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [turn])

    //handling press
    const handleOnLongPress = (index) => {
        setHoverIndex(index)
    };

    const handleOnClick = (ability) => {
        if (!battle.uiEnabled ||
            ability.apCost > player.ap ||
            ability.usesPerBattle <= 0 ||
            ability.id === EMPTY) {
        } else {
            handleUse(ability)
        }
        setHoverIndex(null)
    }

    const handleOnKeyDown = (index, ability, e) => {
        if (e.key === 'Enter') {
            handleOnClick(ability)
        }
        if (e.key === 'i') {
            setHoverIndex(hoverIndex === null ? index : null)
        }
    }

    return (
        <StyledAbilitiesList>
            {player.abilities.map((ability, index) => (
                <AbilityWrapper
                    key={ability.id + index}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                >
                    <StyledButtonUse
                        disabled={
                            !battle.uiEnabled ||
                            ability.apCost > player.ap ||
                            ability.usesPerBattle <= 0
                        }
                        {...longPressEvent(() => handleOnLongPress(index), () => handleOnClick(ability))}
                        onKeyDown={(e) => handleOnKeyDown(index, ability, e)}

                    >
                        <AbilityImg
                            disabled={
                                !battle.uiEnabled ||
                                ability.apCost > player.ap ||
                                ability.usesPerBattle <= 0
                            }
                            img={require(`../../assets/abilities/${ability.id}.png`)}
                        />
                        <AbilityInfo
                            visible={hoverIndex === index}
                            abilityInfo={ability}
                            setHoverIndex={setHoverIndex}
                        />
                    </StyledButtonUse>
                </AbilityWrapper>

            ))}
        </StyledAbilitiesList>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: {
            playerApSubstract: state => dispatch(playerApSubstract(state)),
            playerHpAdd: state => dispatch(playerHpAdd(state)),
            playerUtilityUsesPerBattleSubstract: state => dispatch(playerUtilityUsesPerBattleSubstract(state)),
            playerAbilityUsesPerBattleSubstract: state => dispatch(playerAbilityUsesPerBattleSubstract(state)),
            enemyHpSubstract: state => dispatch(enemyHpSubstract(state)),
            showInfo: state => dispatch(showInfo(state)),
            hideInfo: state => dispatch(hideInfo(state)),
            setUiEnabled: state => dispatch(setUiEnabled(state)),
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

const AbilitiesList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConnectedAbilitiesList);

export default AbilitiesList;