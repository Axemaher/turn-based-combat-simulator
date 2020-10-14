import React from 'react';
import styled from 'styled-components';
import FrameLight from './FrameLight';

const StyledHpBarWrapper = styled.div`
    width: 100%;
    height: 10px;
    display: flex;
    justify-content: ${({ float }) => float === 'left' ? 'flex-start' : 'flex-end'};
`;

const StyledHpBar = styled.div`
    width: ${({ width }) => width};
    height: 10px;
    background-color: ${({ theme }) => theme.colors.hpBar};
    transition: all .2s;
    position: absolute;
    top: 1px;
`;

const StyledHpBarTextInfo = styled.p`
    position: absolute;
    font-size: .6em;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    transition: all .2s;
`;

const HpBar = ({ hp, maxHp, float }) => {
    return (
        <FrameLight>
            <StyledHpBarWrapper float={float}>
                <StyledHpBar width={`${(hp / maxHp) * 100}%`} />
                <StyledHpBarTextInfo>
                    {hp} / {maxHp}
                </StyledHpBarTextInfo>
            </StyledHpBarWrapper>
        </FrameLight>
    );
}

export default HpBar;