import React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { theme } from './theme'


const GlobalStyle = createGlobalStyle`
  *, *::before, *::after{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Texturina', serif;
    color: ${({ theme }) => theme.colors.font};
  }
`;

const StyledGlobalWrapper = styled.div`
  font-size:62.5%;
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background-image: url(${require(`../assets/backgrounds/WINTER_BACKGROUND.jpg`)});
  background-size: 100% 100%;
  background-position: center;
`;

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <StyledGlobalWrapper>
        {children}
      </StyledGlobalWrapper>
    </>
  </ThemeProvider>
)

export default Layout