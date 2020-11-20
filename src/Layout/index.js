import React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { theme } from './theme'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'montserrat';
  }
  *, *::before, *::after{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const StyledGlobalWrapper = styled.div`
  font-size:62.5%;
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background-image: url(${require(`../assets/backgrounds/CITY_BACKGROUND.jpg`)});
  background-size: cover;
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