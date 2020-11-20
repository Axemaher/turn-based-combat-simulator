import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import FrameLight from '../../components/FrameLight';
import AbilityInfo from '../../components/AbilityInfo';
//actions
import {
    playerApSubstract,
    playerHpAdd,
    playerUtilityUsesPerBattleSubstract,
    showInfo,
    hideInfo,
    setUiEnabled,
    setBattleInfoData,
} from "../../store/actions";

import {
    UTILITY
} from '../../utils/constans/';

//utils
import { sleep } from '../../utils/sleep';
import { animationsDelay } from '../../utils/data/animationsDelay';
import { battleInfoHandler } from '../../utils/functions/battleInfoHandler';
import { checkUtilitiesEffects } from '../../utils/functions/checkUtilitiesEffects';
import { handleUseUtility } from '../../utils/functions/handleUseUtility';
import { addEffects } from '../../utils/functions/addEffects';

import longPressEvent from '../../utils/useLongPress';

const StyledButtonUse = styled.button`
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

const StyledUtilitiesList = styled.ul`
    padding: 0;
    display: flex;
    flex-basis: auto;
`;

const StyledUtility = styled.li`
    display: inline-block;
    position: relative;
    cursor: pointer;
`;

const StyledUtilityImg = styled.img`
    width: 100%;
    pointer-events: none;
`;

const ConnectedUtilitiesList = ({ state, dispatch }) => {

    const { player, turn, battle } = state;
    const { playerApSubstract, showInfo, hideInfo, setBattleInfoData, setUiEnabled, playerUtilityUsesPerBattleSubstract
    } = dispatch;

    const [hoverIndex, setHoverIndex] = useState(null);



    async function handleUse({ useValue, utilityName, apCost, effects, id, turnsDuration }) {
        setUiEnabled(false);
        let effectData = [];

        //adding effects
        effectData = addEffects(effects, turn);

        const messageData = {
            type: UTILITY,
            useValue,
            utilityName,
            playerTurn: turn,
            playerName: player.name,
            effects: effectData
        }

        //send data to battle info
        setBattleInfoData(
            battleInfoHandler(messageData)
        );

        // animation started
        await sleep(animationsDelay.beforeShowInfo);
        showInfo();
        await sleep(animationsDelay.beforeChangeData);
        handleUseUtility(id, useValue, turnsDuration)
        playerUtilityUsesPerBattleSubstract(id);
        playerApSubstract(apCost);
        await sleep(animationsDelay.beforeHideInfo);
        hideInfo();
        // animation ended

        setUiEnabled(true)

    }

    useEffect(() => {

        checkUtilitiesEffects(player.ap, player.maxAp, player.utilityEffects, turn)

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

    const onClick = (utility) => {
        if (!battle.uiEnabled ||
            utility.apCost > player.ap ||
            utility.usesPerBattle <= 0 ||
            utility.id === "EMPTY") {
        } else {
            handleUse(
                {
                    useValue: utility.useValue,
                    utilityName: utility.name,
                    apCost: utility.apCost,
                    effects: utility.effects,
                    id: utility.id,
                    turnsDuration: utility.turnsDuration
                }
            )
        }
        setHoverIndex(null)
    }

    return (
        <StyledUtilitiesList>
            {player.utilities.map((utility, index) => (
                <StyledUtility
                    key={utility.id + index}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                >
                    <FrameLight>
                        <StyledButtonUse
                            disabled={
                                !battle.uiEnabled ||
                                utility.apCost > player.ap ||
                                utility.usesPerBattle <= 0
                            }
                            {...longPressEvent(() => onLongPress(index), () => onClick(utility))}
                        >
                            <StyledUtilityImg src={require(`../../assets/utilities/${utility.id}.png`)} />
                        </StyledButtonUse>
                    </FrameLight>
                    <AbilityInfo
                        visible={hoverIndex === index}
                        abilityInfo={utility}
                        setHoverIndex={setHoverIndex}
                    />
                </StyledUtility>
            ))}
        </StyledUtilitiesList>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: {
            playerApSubstract: state => dispatch(playerApSubstract(state)),
            playerHpAdd: state => dispatch(playerHpAdd(state)),
            playerUtilityUsesPerBattleSubstract: state => dispatch(playerUtilityUsesPerBattleSubstract(state)),
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
        }
    };
};

const UtilitiesList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConnectedUtilitiesList);

export default UtilitiesList;