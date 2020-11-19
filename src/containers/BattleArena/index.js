import React from "react";
import styled from 'styled-components';
import Layout from '../../Layout'
import EnemySide from '../EnemySide';
import PlayerSide from '../PlayerSide';
import BattleInfo from '../BattleInfo';
import ApBar from "../ApBar";
import AttacksList from "../AttacksList";
import TurnButton from "../TurnButton/TurnButton";
import GameLog from "../GameLog/GameLog";
import UtilitiesList from "../UtilitiesList/UtilitiesList";

const StyledBattleAreaWrapper = styled.div`
    max-width: 900px;
    display: block;
    margin: 0 auto;
`;

const StyledContainerHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas:
    "playerSide enemySide";
    @media ${({ theme }) => theme.device.mobileL} {
        grid-template-areas:
        "enemySide"
        "playerSide" ;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
        gap: 0px 0px;
    }
`;

const BattleArena = () => {
    return (
        <Layout>
            <StyledBattleAreaWrapper>
                <StyledContainerHeader>
                    <BattleInfo />
                    <PlayerSide />
                    <EnemySide />
                </StyledContainerHeader>
                <ApBar />
                <AttacksList />
                <UtilitiesList />
                <TurnButton />
                <GameLog />
            </StyledBattleAreaWrapper>
        </Layout>
    );
}

export default BattleArena;