import React from 'react';
import styled from "styled-components";
import bg from '../assets/BUTTONdark.png';

const StyledButtonText = styled.span`
    opacity: ${({ disabled }) => disabled ? '.3' : '1'};
    padding: 0 10px;
    vertical-align: super;
    transition: all .2s;

`;

const StyledButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    background-image: url(${bg});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: ${({ size }) => size === 'small' ? '100px' : '120px'};
    height: ${({ size }) => size === 'small' ? '24px' : '28px'};
    padding: 0 13px;
    margin: 4px;
    line-height: 10px;
    color: ${({ theme }) => theme.colors.font};
    &:hover ${StyledButtonText}{
        color: ${({ theme }) => theme.colors.fontHover};
    }
`;


const Button = ({ children, onClick, disabled, size }) => {
    return (
        <StyledButton
            onClick={onClick}
            size={size}
        >
            <StyledButtonText disabled={disabled}>
                {children}
            </StyledButtonText>
        </StyledButton>
    );
}

export default Button;