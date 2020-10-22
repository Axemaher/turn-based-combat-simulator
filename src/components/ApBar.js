import React from 'react';
import styled from 'styled-components';
import point from '../images/apBar/point.png';
import randomCircles from '../images/apBar';


const StyledApBarWrapper = styled.div`
    padding: 5px 0;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

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


const ApBar = ({ ap, maxAp }) => {

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

export default ApBar;