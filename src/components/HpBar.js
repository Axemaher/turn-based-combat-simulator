import React from 'react';
import styled from 'styled-components';
import corner from '../assets/corner.png';
import cornerR from '../assets/cornerR.png';
import barElement from '../assets/barElement.png';

const Wrapper = styled.div`
    width: 100%;
    height: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 5px 0;
`;

const StyledBefore = styled.div`
    background: url(${corner});
    width: 10px;
    height: 20px;
    background-size: cover;
    top: -4px;
    left: 0;
    z-index: 2;
`;

const StyledAfter = styled.div`
    background: url(${cornerR});
    width: 10px;
    height: 20px;
    background-size: cover;
    top: -4px;
    left: 0;
    z-index: 2;
`;

const StyledHpBarWrapper = styled.div`
    width: 100%;
    height: 10px;
    display: flex;
    justify-content: ${({ float }) => float === 'left' ? 'flex-start' : 'flex-end'};
    &:before, &:after{
        content: "";
        height: 3px;
        width: 96%;
        background-image: url(${barElement});
        background-size: contain;
        position: absolute;
        z-index: 3;
    }
    &:before{
        top: -2px;
    }
    &:after{
        bottom: -3px;
    }
`;

const StyledHpBar = styled.div`
    width: ${({ width }) => width};
    height: 10px;
    background-color: ${({ theme }) => theme.colors.hpBar};
    transition: all .2s;
    top: 1px;
    z-index: 2;
`;

const HpBar = ({ hp, maxHp, float }) => {
    return (
        <Wrapper>
            <StyledBefore />
            <StyledHpBarWrapper float={float}>
                <StyledHpBar width={`${(hp / maxHp) * 100}%`} />
            </StyledHpBarWrapper>
            <StyledAfter />
        </Wrapper>
    );
}

export default HpBar;