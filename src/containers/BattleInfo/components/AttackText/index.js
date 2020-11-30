import React from 'react';
import styled, { keyframes } from 'styled-components';
import { StyledMessageBox, StyledBoxText } from '../../../../Layout/messageBoxStyles';

const AttackTextAnimation = keyframes`
  0% {
    transform: rotateX(-10deg) translateX( calc(-50% - 20px) ) skewX(-10deg);
    opacity: 0;
  }
  10%{
    transform: rotateX(0deg) translateX(-50%) skewX(0deg);
    opacity: 1;
  }
  90%{
    opacity: 1;
    transform: rotateX(0deg) translateX(-50%) skewX(0deg);
  }
  100% {
    opacity: 0; 
    transform: rotateX(10deg) translateX(calc(-50% + 20px)) skewX(10deg);
  }
`;

const AttackTextWrapper = styled(StyledMessageBox)` 
    //nimation must be running {animationsDelay.beforeHideInfo}
    animation: ${AttackTextAnimation} 6.0s; 
    left: 50%;
    width: 90vw;
    padding: 0;
    height: fit-content;
    @media ${({ theme }) => theme.device.mobileL} {
      top: 160px;
    }
`;

const AttackInfo = ({ children }) => {
  return (
    <AttackTextWrapper>
      <StyledBoxText>{children}</StyledBoxText>
    </AttackTextWrapper>

  );
}

export default AttackInfo;