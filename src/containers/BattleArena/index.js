import React, { useState } from "react";
import styled from 'styled-components';
import Layout from '../../Layout'
import EnemySide from '../EnemySide';
import PlayerSide from '../PlayerSide';
import BattleInfo from '../BattleInfo';
import ApBar from "../ApBar";
import TurnButton from "../TurnButton/TurnButton";
import GameLog from "../GameLog/GameLog";
import AbilitiesList from "../AbilitiesList/AbilitiesList";
import bg from '../../assets/lightBg.png';
import Stats from '../Stats/Stats';
import Button from '../../components/Button';

const StyledBattleAreaWrapper = styled.div`
    max-width: 900px;
    min-height: 100vh;
    display: block;
    margin: 0 auto;
    background-image: url(${bg});
    background-size: 100% 100%;
    padding: 0;
    position: relative;
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

const StyledButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    @media ${({ theme }) => theme.device.mobileL} {
        justify-content: space-around;
    }
`;

const BattleArena = () => {

    const [statsModal, setStatsModal] = useState(false)

    return (
        <Layout>
            <StyledBattleAreaWrapper>
                <StyledContainerHeader>
                    <BattleInfo />
                    <PlayerSide />
                    <EnemySide />
                </StyledContainerHeader>
                <ApBar />
                <AbilitiesList />
                <StyledButtonsContainer>
                    <TurnButton />
                    <Button onClick={() => setStatsModal(true)}>stats</Button>
                </StyledButtonsContainer>
                <GameLog />
            </StyledBattleAreaWrapper>
            {statsModal && <Stats setStatsModal={setStatsModal} />}
        </Layout>
    );
}

export default BattleArena;