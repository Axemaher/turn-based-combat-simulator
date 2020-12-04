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
    background-size: cover;
    background-position: center;
    width: 120px;
    height: 28px;
    padding: 0 13px;
    margin: 4px;
    color: ${({ theme }) => theme.colors.font};
    &:hover ${StyledButtonText}{
        color: ${({ theme }) => theme.colors.fontHover};
    }
`;


const Button = ({ children, onClick, disabled }) => {
    return (
        <StyledButton
            onClick={onClick}
        >
            <StyledButtonText disabled={disabled}>
                {children}
            </StyledButtonText>
        </StyledButton>
    );
}

export default Button;