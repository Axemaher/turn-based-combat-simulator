import React from 'react';
import styled from 'styled-components';
import FrameLight from './FrameLight';

const StyledAvatarContainer = styled.div`
    width: 160px;
    @media ${({ theme }) => theme.device.tablet} {
        width: 120px;
    }
    @media ${({ theme }) => theme.device.mobileL} {
        width: 90px;
    }
`;

const StyledAvatarImage = styled.img`
    width: 100%;
    height: 160px;
    border: none;
    @media ${({ theme }) => theme.device.tablet} {
        width: 100%;
        height: auto;
    }
    @media ${({ theme }) => theme.device.mobileL} {
        width: 100%;
        height: auto;
    }
`;

const StyledP = styled.p`
    text-align: center;
    @media ${({ theme }) => theme.device.mobileL} {
        font-size: .6em;
    }
`;

const Avatar = ({ name, src }) => {
    return (
        <StyledAvatarContainer src={src}>
            <FrameLight>
                <StyledAvatarImage src={src} />
                <StyledP>{name}</StyledP>
            </FrameLight>
        </StyledAvatarContainer>
    );
}

export default Avatar;