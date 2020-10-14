import React from 'react';
import styled from 'styled-components';
import FrameLight from './FrameLight';

const StyledAvatarContainer = styled.div`
    width: 160px;
`;

const StyledAvatarImage = styled.img`
    width: 100%;
    height: 160px;
    border: none;
`;

const StyledP = styled.p`
    text-align: center;
    font-size: .9em;
`;

const Avatar = ({ name, imageUrl }) => {
    return (
        <StyledAvatarContainer>
            <FrameLight>
                <StyledAvatarImage />
                <StyledP>{name}</StyledP>
            </FrameLight>
        </StyledAvatarContainer>
    );
}

export default Avatar;