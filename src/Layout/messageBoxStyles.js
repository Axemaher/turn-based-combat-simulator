import styled from 'styled-components';
import bg from '../assets/MESSAGEdark.png';

export const StyledMessageBox = styled.div` 
    position: relative;
    font-size: 1rem;
    opacity: 0;
    top: 10px;
    left: 50%;
    min-height: 50px;
    max-width: 500px;
    padding: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media ${({ theme }) => theme.device.mobileL} {
      max-width: 100vw;
      bottom: 200px;
    }
    background-image: url(${bg});
    background-size: 100% 100%;
    padding: 20px;
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