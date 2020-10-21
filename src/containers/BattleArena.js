import React from "react";
import styled from 'styled-components';
import Layout from '../Layout'
import EnemySide from './EnemySide';
import PlayerSide from './PlayerSide';
import BattleInfo from './BattleInfo';

const StyledBattleAreaWrapper = styled.div`
    max-width: 900px;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas:
    "playerSide enemySide";
    margin: 0 auto;
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
                <BattleInfo />
                <PlayerSide />
                <EnemySide />
            </StyledBattleAreaWrapper>
        </Layout>
    );
}

export default BattleArena;