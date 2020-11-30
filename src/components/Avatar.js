import React from 'react';
import styled from 'styled-components';
import bg from '../assets/AVATARdark.png';

const StyledAvatarWrapper = styled.div`
    width: 160px;
    height: 200px;
    background-image: url(${bg});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    display: block;
    @media ${({ theme }) => theme.device.tablet} {
        width: 120px;
        height: 150px;
    }
    @media ${({ theme }) => theme.device.mobileL} {
        width: 90px;
        height: 110px;
    }
`;

const StyledImage = styled.div`
    margin: 0 auto;
    margin-top: 17%;
    width: 60%;
    height: 65%;
    background-image: url(${({ src }) => src});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
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
        <StyledAvatarWrapper>
            <StyledImage src={src} />
            <StyledP>{name}</StyledP>
        </StyledAvatarWrapper>
    );
}

export default Avatar;