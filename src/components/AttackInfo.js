import React, { useEffect } from 'react';
import styled from 'styled-components';
import FrameLight from './FrameLight';

const StyledAttackWrapper = styled.div`
    width: 300px;
    top: 100%;
    left: 0;
    display:${({ visible }) => visible ? "block" : "none"};
    position: absolute;
    font-size: .6rem;
    z-index: 5;
    @media ${({ theme }) => theme.device.tablet} {
        position: fixed;
        top: 40px;
    }
    @media ${({ theme }) => theme.device.mobileL} {
        position: fixed;
        top: 130px;
        left: 0; 
    }
`;

const StyledAttack = styled.div`
    height: 200px;
    padding: 10px;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.5fr 2fr 0.5fr;
    gap: 10px 0px;
    grid-template-areas:
        "."
        "."
        ".";
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
    justify-content: ${({ justify }) => justify === "right" ? "flex-end" : justify === "space-around" ? "space-around" : "flex-start"};
    align-items: center;
`;

const StyledColumn = styled.div`
    display: block;
`;

const StyledHeader = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 0.5fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas:
        ". .";
    align-items: center;
`;

const StyledContainer = styled.div`
    display: flex;
    flex-flow: wrap;
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
            <FrameLight>
                <StyledAttack>
                    <StyledHeader>
                        <StyledName>{attackInfo.name}</StyledName>
                        <StyledColumn>
                            <StyledRow justify={"space-around"}>
                                <StyledP>AP cost:</StyledP>
                                <StyledP>{attackInfo.apCost}</StyledP>
                            </StyledRow>
                            {attackInfo.usesPerBattle !== Infinity &&
                                <StyledRow justify={"space-around"}>
                                    <StyledP>uses left:</StyledP>
                                    <StyledP>{attackInfo.usesPerBattle}</StyledP>
                                </StyledRow>
                            }
                        </StyledColumn>
                    </StyledHeader>


                    <StyledContainer>
                        <StyledP>{attackInfo.description}</StyledP>
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
                </StyledAttack>
            </FrameLight>
        </StyledAttackWrapper>
    );
}

export default AttackInfo;