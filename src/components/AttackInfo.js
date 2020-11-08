import React from 'react';
import styled from 'styled-components';
import FrameLight from './FrameLight';
import Button from '../components/Button';

const StyledAttackWrapper = styled.div`
    width: 300px;
    height: 100px;
    top: 100%;
    left: 0;
    display:${({ visible }) => visible ? "block" : "none"};
    position: absolute;
    font-size: .6rem;
    z-index: 5;
    @media ${({ theme }) => theme.device.tablet} {
        position: fixed;
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

const AttackInfo = ({ attackInfo, visible, handleAttack, setHoverIndex, mobileVer }) => {
    return (
        <StyledAttackWrapper visible={visible}>
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
                        <StyledRow>
                            <StyledImgWrapper>
                                <StyledEffectIco src={effect.url} />
                            </StyledImgWrapper>
                            <StyledP>{`${effect.chance}% chance ${effect.name} for ${effect.turns} turns`}</StyledP>
                        </StyledRow>
                    ))}
                </StyledContainer>
                {mobileVer &&
                    <StyledContainer>
                        <StyledRow justify={"center"}>
                            <Button
                                disabled={attackInfo.usesPerBattle <= 0}
                                setHoverIndex={() => setHoverIndex(null)}
                                onClick={() => {
                                    handleAttack(
                                        {
                                            damageMin: attackInfo.damageMin,
                                            damageMax: attackInfo.damageMax,
                                            apCost: attackInfo.apCost,
                                            effects: attackInfo.effects,
                                            id: attackInfo.id
                                        }
                                    );
                                    setHoverIndex(null);
                                }}
                            >
                                use
                                    </Button>
                            <Button
                                onClick={() => setHoverIndex(null)}
                            >
                                close
                                    </Button>
                        </StyledRow>
                    </StyledContainer>
                }
            </FrameLight>
        </StyledAttackWrapper>
    );
}

export default AttackInfo;