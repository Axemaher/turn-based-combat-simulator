import React, { useEffect } from 'react';
import styled from 'styled-components';
import FrameLight from './FrameLight';

const StyledAttackWrapper = styled.div`
    width: 300px;
    height: 100px;
    top: 100%;
    left: 0;
    display:${({ visible }) => visible ? "block" : "none"};
    position: absolute;
    font-size: .6rem;
    z-index: 500;
    @media ${({ theme }) => theme.device.tablet} {
        position: fixed;
        width: 300px;
        height: 100px;
        top: 325px;
        left: 0; 
    }
`;

const StyledP = styled.p`
    margin-bottom: 5px;
`;

const StyledName = styled(StyledP)`
    font-size: .8rem;
`;

const StyledRow = styled.div`
    display: flex;
    justify-content: flex-start;
    justify-content: ${({ justify }) => justify === "right" ? "flex-end" : justify === "center" ? "space-around" : "flex-start"};
    align-items: center;
`;

const StyledContainer = styled.div`
    display: block;
    margin: 10px 0;
    padding-left: 10px;
`;

const StyledImgWrapper = styled.div`
    width: 20px;
    margin-right: 10px;
`;

const StyledEffectIco = styled.img`
    width: 100%;
    height: auto;
`;



const AttackInfo = ({ attackInfo, visible, setHoverIndex }) => {

    useEffect(() => {
        const handleClick = () => setHoverIndex(null)
        visible &&
            document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);


    return (
        <StyledAttackWrapper
            visible={visible}>
            <FrameLight >
                <StyledContainer>
                    <StyledName>{attackInfo.name}</StyledName>
                    <StyledP>AP cost: {attackInfo.apCost}</StyledP>
                    <StyledP>{attackInfo.usesPerBattle === Infinity ? null : `uses left: ${attackInfo.usesPerBattle}`}</StyledP>
                </StyledContainer>
                <StyledContainer>
                    <StyledP>{attackInfo.description}</StyledP>
                </StyledContainer>
                <StyledContainer>
                    <StyledP> damage: {attackInfo.damageMin} - {attackInfo.damageMax}</StyledP>
                </StyledContainer>
                <StyledContainer>
                    <StyledP>{attackInfo.effects && "additional effects:"}</StyledP>
                    {attackInfo.effects && attackInfo.effects.map(effect => (
                        <StyledRow key={effect.name}>
                            <StyledImgWrapper>
                                <StyledEffectIco src={effect.url} />
                            </StyledImgWrapper>
                            <StyledP>{`${effect.chance}% chance ${effect.name} for ${effect.turns} turns`}</StyledP>
                        </StyledRow>
                    ))}
                </StyledContainer>
            </FrameLight>
        </StyledAttackWrapper>
    );
}

export default AttackInfo;