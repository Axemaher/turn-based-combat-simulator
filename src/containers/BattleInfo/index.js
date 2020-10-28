import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import {
    hideInfo
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
    @media ${({ theme }) => theme.device.mobileL} {
      width: 100vw;
      height: 320px;
    }
`;

const StyledBattleInfo = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const ConnectedBattleInfo = ({ state }) => {

    const [message, setMessage] = useState(null);
    const [attackText, setAttackText] = useState(null);

    async function runMessageAnimation() {

        //animation chain must be running {animationsDelay.beforeHideInfo}
        const times = { fromStart: 1000, beforeHide: 5000 }
        if (times.fromStart + times.beforeHide !== animationsDelay.beforeHideInfo) {
            console.log("wrong animation time")
        }
        await sleep(times.fromStart);
        setMessage(<EnemyText>{infoData.enemyMessage}</EnemyText>);
        await sleep(times.beforeHide);
        setMessage(null)
    }

    async function runAttackInfo() {
        setAttackText(<AttackText>{infoData.attackText}</AttackText>)
        await sleep(animationsDelay.beforeHideInfo);
        setAttackText(null)
    }

    useEffect(() => {
        if (state.infoStarted) {
            runMessageAnimation();
            runAttackInfo();
        }
        return () => { };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.infoStarted])

    const { infoStarted, infoData } = state;
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
        dispatch: {
            hideInfo: state => dispatch(hideInfo(state)),
        }
    };
}

function mapStateToProps(state) {
    return {
        state: {
            infoStarted: state.battle.infoStarted,
            infoData: state.battle.battleInfoData,
        }
    };
};

const BattleInfo = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConnectedBattleInfo);

export default BattleInfo;