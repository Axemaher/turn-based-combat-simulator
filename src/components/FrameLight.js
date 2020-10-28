import React from 'react'
import styled from 'styled-components'
import FrameLightBg from '../assets/FrameLightBg.png'

const StyledFrame = styled.div`
    border-style: solid;
    background: transparent;
    border-width: 12px 12px 12px 11px;
    border-image: url(${FrameLightBg}) 12 12 12 11 fill repeat stretch;
    color: ${({ theme }) => theme.colors.font};
    position: relative;
`;

const FrameLight = ({ children }) => {
    return (
        <StyledFrame>{children}</StyledFrame>
    );
}

export default FrameLight;