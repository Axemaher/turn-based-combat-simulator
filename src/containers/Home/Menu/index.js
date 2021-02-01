import React from 'react';
import styled from 'styled-components'
import bg from '../../../assets/STATSlight.png';
import NavButton from '../../../components/NavButton';


const StyledMenu = styled.div`
    display: flex;
    justify-content: center;
    min-height: 100vh;
`;

const StyledMenuContainer = styled.div`
    width: 300px;
    height: 500px;
    background-image: url(${bg});
    background-size: 100% 100%;
    padding: 66px 30px 66px 30px;
    margin: 50px auto 0 auto;
    font-size: 1rem;
`;

const StyledDescription = styled.p`
    color: ${({ theme }) => theme.colors.primaryColor};
    text-align: center;
    margin-top: 30px;
`;

const StyledNav = styled.nav``;

const StyledNavList = styled.ul`
    list-style: none;
`;

const StyledNavLi = styled.li`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;


const Menu = () => {
    return (
        <StyledMenu>
            <StyledMenuContainer>
                <StyledDescription>
                    Welcome to TBCS - turn-based combat simulator.
            </StyledDescription>
                <StyledNav>
                    <StyledNavList>
                        <StyledNavLi>
                            <NavButton to="/characterSelect">Choose a character</NavButton>
                        </StyledNavLi>
                        <StyledNavLi>
                            <NavButton to="/fastBattle">Fast battle</NavButton>
                        </StyledNavLi>
                    </StyledNavList>
                </StyledNav>
            </StyledMenuContainer>
        </StyledMenu>
    );
}

export default Menu;