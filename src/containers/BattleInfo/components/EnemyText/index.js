import React from 'react';
import styled, { keyframes } from 'styled-components';
import { StyledMessageBox, StyledBoxText } from '../../../../Layout/messageBoxStyles';

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
    top: 90px;
    right: 0;
    width: auto;
    min-width: 100px;
    max-width: 300px;
    max-height: 30px;
    @media ${({ theme }) => theme.device.tablet} {
      left: calc(100% - 320px);
      top: 40px;
    }
    @media ${({ theme }) => theme.device.mobileL} {
      max-width: 90vw;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: -30px;
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