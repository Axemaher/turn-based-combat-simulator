import React from 'react';
import styled from 'styled-components';
import FrameLight from './FrameLight';

const StyledAvatarWrapper = styled.div`
    width: 160px;
    height: 200px;
    background-image: url(${({ src }) => src});
    background-size: cover;
    background-position: center;
    display: flex;
    @media ${({ theme }) => theme.device.tablet} {
        width: 120px;
        height: 150px;
    }
    @media ${({ theme }) => theme.device.mobileL} {
        width: 90px;
        height: 110px;
    }
`;

const StyledP = styled.p`
    text-align: center;
    width: 100%;
    place-self: flex-end;
    @media ${({ theme }) => theme.device.mobileL} {
        font-size: .6em;
    }
`;

const Avatar = ({ name, src }) => {
    return (
        <FrameLight>
            <StyledAvatarWrapper src={src}>
                <StyledP>{name}</StyledP>
            </StyledAvatarWrapper>
        </FrameLight>
    );
}

export default Avatar;