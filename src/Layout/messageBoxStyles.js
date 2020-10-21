import styled from 'styled-components';
import messageFrame from '../images/messageFrame.png';
import ropeBorder from '../images/ropeBorder.png';

export const StyledMessageBox = styled.div` 
    position: relative;
    font-size: 1rem;
    opacity: 0;
    top: 10px;
    left: 50%;
    min-height: 50px;
    max-width: 500px;
    background-image: url(${messageFrame});
    background-size: cover;
    background-position: center;
    padding: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media ${({ theme }) => theme.device.mobileL} {
      max-width: 100vw;
      bottom: 200px;
    }
    &::before, &::after{
      position: absolute;
      content: "";
      background-image: url(${ropeBorder});
      background-position: center;
      background-size: contain;
      width:97%;
      height:9px;
    }
    &::before{
      top: -7px;
    }
    &::after{
      bottom: -7px;
    }
`;

export const StyledBoxText = styled.p`
    text-align: center;
    white-space: pre-line;
    font-size: .7em;
    color: ${({ theme }) => theme.colors.font};
    padding: 5px;
    width: 400px;
    @media ${({ theme }) => theme.device.mobileL} {
      width: auto;
    }
`;

export default StyledMessageBox;