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
  background-image: ${({ theme }) => theme.colors.globalBackground};
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