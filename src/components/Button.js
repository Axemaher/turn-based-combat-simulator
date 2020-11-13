import React from 'react';
import styled from "styled-components";
import FrameLight from '../components/FrameLight';

const StyledButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

const StyledButtonText = styled.span`
    opacity: ${({ disabled }) => disabled ? '.3' : '1'};
    padding: 0 10px;
`;


const Button = ({ children, onClick, disabled }) => {
    return (
        <StyledButton
            onClick={onClick}
        >
            <FrameLight>
                <StyledButtonText disabled={disabled}>
                    {children}
                </StyledButtonText>
            </FrameLight>
        </StyledButton>
    );
}

export default Button;