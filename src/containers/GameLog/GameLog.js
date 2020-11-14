import React, { useEffect, useRef } from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import ScrollToBottom from 'react-scroll-to-bottom';
import FrameLight from '../../components/FrameLight';
import point from '../../assets/apBar/point.png';


const StyledGameLogWrapper = styled.div`
    max-width: 500px;
    margin: 0 auto;
    text-align: left;
`;

const StyledUl = styled(ScrollToBottom)`
    height: 120px;
    overflow-y: scroll;
    padding-left: 12px;
    list-style: none;
    /* &::-webkit-scrollbar {
    width: 8px;
    }
    &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.scrollbarTrack};
    border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.scrollbarThumb};
    border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.scrollbarHover};
    } */
`;

const StyledLi = styled.li`
    margin-bottom: 3px;
    display: flex;
    align-items: center;
    position: relative;
    &:before{
        content: "";
        position: absolute;
        width: 7px;
        height: 7px;
        background-image: url(${point});
        background-size: cover;
        left: -10px;
    }
`;

const StyledRefLi = styled.li``;

const ConnectedGameLog = ({ log }) => {

    useEffect(() => {
        // I was not using an li but may work to keep your div scrolled to the bottom as li's are getting pushed to the div
        const lastLi = document.getElementById('lastId');
        lastLi.scrollTop = lastLi.scrollHeight;
        return () => { }
    }, [log])

    return (
        <StyledGameLogWrapper>
            <FrameLight>
                <StyledUl>
                    {log.map((e, i) =>
                        <StyledLi key={i}>
                            {e}
                        </StyledLi>
                    )}
                    <StyledRefLi id="lastId" ></StyledRefLi>
                </StyledUl>
            </FrameLight>
        </StyledGameLogWrapper>
    );
}

function mapStateToProps(state) {
    return {
        log: state.battle.log
    };
};

const GameLog = connect(
    mapStateToProps,
    null,
)(ConnectedGameLog);

export default GameLog;