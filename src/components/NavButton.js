import React from 'react';
import styled from "styled-components";
import bg from '../assets/BUTTON_LONGXL_dark.png';
import { Link } from "react-router-dom";

const StyledNavButtonText = styled.span`
    padding: 0 10px;
    vertical-align: super;
    transition: all .2s;
    font-size: 1rem;
`;

const StyledNavButton = styled(Link)`
    background-color: transparent;
    border: none;
    cursor: pointer;
    background-image: url(${bg});
    background-size: cover;
    background-position: center;
    width: 230px;
    height: 28px;
    padding: 0 13px;
    margin: 4px;
    display: flex;
    justify-content: center;
    color: ${({ theme }) => theme.colors.font};
    text-decoration: none;
    &:hover ${StyledNavButtonText}{
        color: ${({ theme }) => theme.colors.fontHover};
    }
`;


const NavButton = ({ children, to }) => {
    return (
        <StyledNavButton to={to}>
            <StyledNavButtonText>
                {children}
            </StyledNavButtonText>
        </StyledNavButton>
    );
}

export default NavButton;