import React, { useEffect } from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import ScrollToBottom from 'react-scroll-to-bottom';
import point from '../../assets/POINTlight.png';
import bg from '../../assets/LOGdark.png'

const StyledGameLogWrapper = styled.div`
    max-width: 500px;
    height: 130px;
    margin: 0 auto;
    text-align: left;
    background-image: url(${bg});
    background-size: 100% 100%;
    font-size: 1.1em;
    overflow: hidden;
`;

const StyledUl = styled(ScrollToBottom)`
    .scrollView {
        margin-top: 12px;
        height: 110px;
        overflow-y: scroll;
        padding: 12px 20px 12px 20px;
        list-style: none;
        &::-webkit-scrollbar {
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
        }
    }
    .followButton{
        background-color: ${({ theme }) => theme.colors.scrollbarThumb};
        width: auto;
        padding: 0 7px;
        font-size: .6rem;
        color: ${({ theme }) => theme.colors.font};
        &:before{
            content: "go bottom";
            vertical-align: super;
        }
    }
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

const ConnectedGameLog = ({ log }) => {

    useEffect(() => {
        return () => { }
    }, [log])

    return (
        <StyledGameLogWrapper>
            <StyledUl
                scrollViewClassName="scrollView"
                followButtonClassName="followButton">
                {log.map((e, i) =>
                    <StyledLi key={i}>
                        {e}
                    </StyledLi>
                )}
            </StyledUl>
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