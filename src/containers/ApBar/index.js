import React from 'react';
import styled from 'styled-components';
import point from '../../assets/apBar/point.png';
import randomCircles from '../../assets/apBar';
import { connect } from "react-redux";


const StyledApBarWrapper = styled.div`
    padding: 5px 0;
    width: 100%;
    display: flex;
    flex-basis: auto;
`;

const StyledApContainer = styled.div`
    box-sizing: content-box;
    padding: 1px;
    width: 20px;
    height: 20px;
    margin: 1px 2px;
    background-image: url(${({ background }) => background});
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    @media ${({ theme }) => theme.device.tablet} {
        width: 16px;
        height: 16px;
    }
`;

const StyledApPoint = styled.div`
    opacity: ${({ active }) => active ? 1 : 0}; 
    width: 14px;
    height: 14px;
    background-image: url(${point});
    background-size: cover;
    background-position: center;
    transition: opacity .4s;
    @media ${({ theme }) => theme.device.tablet} {
        width: 11px;
        height: 11px;
    }
`;


const ConnectedApBar = ({ ap, maxAp }) => {

    return (
        <StyledApBarWrapper>
            {[...Array(maxAp)].map((e, i) =>
                <StyledApContainer
                    key={i}
                    background={randomCircles[i]}>
                    <StyledApPoint active={i < ap} />
                </StyledApContainer>)}
        </StyledApBarWrapper>
    );
}

function mapStateToProps(state) {
    return {
        ap: state.player.ap,
        maxAp: state.player.maxAp
    };
};

const ApBar = connect(
    mapStateToProps,
    null,
)(ConnectedApBar);

export default ApBar;