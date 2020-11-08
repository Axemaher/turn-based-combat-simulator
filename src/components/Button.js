import React from 'react';
import styled from "styled-components";
import FrameLight from '../components/FrameLight';

const StyledButton = styled.button`
    background-color: transparent;
    border: none;
    opacity: ${({ disabled }) => disabled ? '.3' : '1'};
    cursor: pointer;
`;

const StyledButtonText = styled.span`
    padding: 0 10px;
`;


const Button = ({ children, onClick, disabled }) => {
    return (
        <StyledButton
            onClick={onClick}
            disabled={disabled}
        >
            <FrameLight>
                <StyledButtonText>
                    {children}
                </StyledButtonText>
            </FrameLight>
        </StyledButton>
    );
}

export default Button;