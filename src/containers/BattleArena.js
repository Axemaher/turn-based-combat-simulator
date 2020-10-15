import React from "react";
import styled from 'styled-components';
import { connect } from "react-redux";
import {
    hideInfo
} from "../redux/actions";
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

const StyledBattleInfo = styled.div`
    position: absolute;
    left: 50%;
    top: ${({ info }) => info ? '0px' : '-100px'};
    transform: translateX(-50%);
    width:100px;
    height: 100px;
    background-color: red;
    z-index: 2;
    transition: all .4s;
`;

const ConnectedBattleArena = ({ state }) => {
    return (
        <Layout>
            <StyledBattleAreaWrapper>
                <StyledBattleInfo info={state.info} />
                <PlayerSide />
                <EnemySide />
            </StyledBattleAreaWrapper>
        </Layout>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: {
            hideInfo: state => dispatch(hideInfo(state)),
        }
    };
}

function mapStateToProps(state) {
    return {
        state: {
            info: state.battle.info
        }
    };
};

const BattleArena = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConnectedBattleArena);

export default BattleArena;