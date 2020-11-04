import React from 'react';
import styled from 'styled-components';
import effectsImages from '../assets/effectsBar';

const StyledEffectsBar = styled.ul`
    list-style: none;
    height: 30px;
    display: flex;
    place-self: flex-end;
    @media ${({ theme }) => theme.device.mobileL} {
        place-self: auto;
    }
    flex-direction: ${({ reverse }) => reverse ? "row-reverse" : "unset"};
`;

const StyledEffect = styled.li`
`;

const StyledEffectImage = styled.img`
    transition: all .2s;
    opacity: ${({ active }) => active !== undefined ? "1" : "0"};
    width: ${({ active }) => active !== undefined ? "100%" : "0"};
`;


const EffectsBar = ({ effects, reverse, active }) => {



    return (
        <StyledEffectsBar reverse={reverse}>
            {effectsImages.map(image => (
                <StyledEffect key={image.name}>
                    <StyledEffectImage src={image.url} active={effects.find(effect => effect.name === image.name)} />
                </StyledEffect>
            ))}
        </StyledEffectsBar>
    );
}

export default EffectsBar;