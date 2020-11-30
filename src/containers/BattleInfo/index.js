import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import {
    addLog
} from "../../store/actions";
import { animationsDelay } from '../../utils/data/animationsDelay';
import { sleep } from '../../utils/sleep';

import EnemyText from './components/EnemyText';
import AttackText from './components/AttackText';


const StyledBattleInfoWrapper = styled.div`
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 100%;
    max-width: 600px;
    height: 200px;
    z-index: 2;
    transition: all .2s;
    @media ${({ theme }) => theme.device.tablet} {
      width: 100vw;
      height: 150px;
    }
    @media ${({ theme }) => theme.device.mobileL} {
      width: 100vw;
      height: 240px;
    }
`;

const StyledBattleInfo = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const ConnectedBattleInfo = ({ infoStarted, infoData, addLog }) => {

    const [message, setMessage] = useState(null);
    const [attackText, setAttackText] = useState(null);

    async function runMessageAnimation() {

        //animation chain must be running {animationsDelay.beforeHideInfo}
        const times = { fromStart: 1000, beforeHide: 5000 }
        if (times.fromStart + times.beforeHide !== animationsDelay.beforeHideInfo) {
            console.log("wrong animation time")
        }
        await sleep(times.fromStart);
        addLog(`Enemy: ${infoData.enemyMessage}`);
        setMessage(<EnemyText>{infoData.enemyMessage}</EnemyText>);
        await sleep(times.beforeHide);
        setMessage(null)
    }

    async function runAttackInfo() {
        addLog(infoData.attackText);
        setAttackText(<AttackText>{infoData.attackText}</AttackText>)
        await sleep(animationsDelay.beforeHideInfo);
        setAttackText(null)
    }

    useEffect(() => {
        if (infoStarted) {
            runMessageAnimation();
            runAttackInfo();
        }
        return () => { };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [infoStarted])

    return (
        <>
            {infoData !== null &&
                <StyledBattleInfoWrapper infoStarted={infoStarted}>
                    <StyledBattleInfo>
                        {attackText}
                        {message}
                    </StyledBattleInfo>
                </StyledBattleInfoWrapper>
            }
        </>

    );
}

function mapDispatchToProps(dispatch) {
    return {
        addLog: state => dispatch(addLog(state)),
    };
}

function mapStateToProps(state) {
    return {
        infoStarted: state.battle.infoStarted,
        infoData: state.battle.battleInfoData,
    };
};

const BattleInfo = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConnectedBattleInfo);

export default BattleInfo;