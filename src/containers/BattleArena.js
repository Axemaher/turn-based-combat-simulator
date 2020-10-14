import React from "react";
import styled from 'styled-components';

import Layout from '../Layout'
import EnemySide from './EnemySide';
import PlayerSide from './PlayerSide';


const StyledBattleAreaWrapper = styled.div`
    max-width: 900px;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0 auto;
`;

const BattleArena = () => {

    return (
        <Layout>
            <StyledBattleAreaWrapper>
                <PlayerSide />
                <EnemySide />
            </StyledBattleAreaWrapper>
        </Layout>
    );
}

export default BattleArena;