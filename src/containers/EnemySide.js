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
    enemyApSubstract,
    enemyApReset,
} from "../redux/actions";
import styled from 'styled-components';
import { sleep } from '../utils/sleep';
import { animationsDelay } from '../js/animationsDelay';
import { battleInfoHandler } from '../js/battleInfoHandler';

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
    const { setTurn, playerApReset, enemyApReset, playerHpSubstract, enemyApSubstract, battleEnd, setWinner, showInfo, hideInfo, setBattleInfoData } = dispatch;
    const [attackStarted, setAttackStarted] = useState(false)


    const handleCheckTurn = () => {
        setTurn();
        playerApReset();
        enemyApReset();
    }

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
                damage: enemy.attacks[enemyAttackIndex].damage,
                apCost: enemy.attacks[enemyAttackIndex].apCost,
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
                critical: false,
                missed: false,
                damage: enemyAttackData.damage
            }

            setBattleInfoData(
                battleInfoHandler(messageData)
            );



            await sleep(animationsDelay.beforeShowInfo);
            showInfo();
            await sleep(animationsDelay.beforeChangeData);
            playerHpSubstract(enemyAttackData.damage);
            enemyApSubstract(enemyAttackData.apCost);
            await sleep(animationsDelay.beforeHideInfo);
            hideInfo();
            setAttackStarted(false);
            if (!availableAttacksLength) {
                setAttackStarted(false);
                handleCheckTurn();
            }
            if (player.hp - enemyAttackData.damage <= 0) {
                battleEnd();
                setWinner(enemy.name);
                await sleep(animationsDelay.beforeBattleEndInfo);
                alert("enemy win")
            }
        }
    }



    useEffect(() => {
        if (!turn && !attackStarted) {
            handleAttack();
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