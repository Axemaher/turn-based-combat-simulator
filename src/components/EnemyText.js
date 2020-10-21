import React from 'react';
import styled, { keyframes } from 'styled-components';
import { StyledMessageBox, StyledBoxText } from '../Layout/messageBoxStyles';

const StyledEnemyTextAnimation = keyframes`
  0% {
    transform: rotateX(-10deg) translateX(-20px) skewX(-10deg);
    opacity: 0;
  }
  10%{
    transform: rotateX(0deg) translateX(0) skewX(0deg);
    opacity: 1;
  }
  90%{
    opacity: 1;
    transform: rotateX(0deg) translateX(0) skewX(0deg);
  }
  100% {
    opacity: 0; 
    transform: rotateX(10deg) translateX(20px) skewX(10deg);
  }
`;

const StyledEnemyTextWrapper = styled(StyledMessageBox)` 
    //animation must be running {animationsDelay.beforeHideInfo}
    animation: ${StyledEnemyTextAnimation} 5.0s; 
    top: 100px;
    right: 0;
    width: auto;
    min-width: 100px;
    max-width: 300px;
    @media ${({ theme }) => theme.device.mobileL} {
      max-width: 100vw;
      left: 0;
      top: 50px;
    }
`;

const EnemyText = ({ children }) => {
  return (
    <StyledEnemyTextWrapper>
      <StyledBoxText>{children}</StyledBoxText>
    </StyledEnemyTextWrapper>
  );
}

export default EnemyText;