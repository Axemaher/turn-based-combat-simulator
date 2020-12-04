import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import bg from '../../assets/STATSlight.png';
import circle from '../../assets/circle.png';
import closeIco from '../../assets/x.png';

const StyledWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.33);
    z-index: 10;
    overflow: auto;
    font-size: 1rem;
`;

const StyledStatsWrapper = styled.div`
    margin: 0 auto;
    max-width: 900px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    overflow: auto;
`;

const StyledStatsTab = styled.div`
    width: 300px;
    height: 500px;
    background-image: url(${bg});
    background-size: 100% 100%;
    padding: 66px 30px 66px 30px;
`;

const StyledStatsContainer = styled.div`
    width: 100%;
    display: block;
    margin-bottom: 10px;
`;

const StyledStatsRow = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const StyledStatsTitle = styled.span`
    text-align: center;
    font-size: 1.1em;
    width: 100%;
    color: ${({ theme }) => theme.colors.fontDark};
    font-weight: bold;
`;

const StyledSpan = styled.span`
    color: ${({ theme }) => theme.colors.fontDark};
    font-weight: bold;
    margin-left: 20px;
    position: relative;
`;

const StyledSpanWithIco = styled(StyledSpan)`
    &:before{
        position: absolute;
        content: "";
        width: 20px;
        height: 20px;
        left: -23px;
        top: 3px;
        background-image: url(${({ ico }) => ico});
        background-size: contain;
    }
`;

const StyledClose = styled.button`
    background-color: transparent;
    border: none;
    position: fixed;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
    background-image: url(${circle});
    background-size: contain;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledCloseIco = styled.div`
    width: 50%;
    height: 50%;
    background-image: url(${closeIco});
    background-size: contain;
`;

const ConnectedStats = ({ player, setStatsModal }) => {

    const {
        name,
        lvl,
        hp,
        maxHp,
        ap,
        maxAp,
        attributes,
        stats,
        defense,
        effects,
        utilityEffects,
        baseStatsCopy, } = player;

    const checkValues = (base, baseWithBuff) => {
        if (base === baseWithBuff) {
            return base;
        } else {
            return `${base} (${baseWithBuff})`;
        }
    }

    return (
        <StyledWrapper>
            <StyledClose onClick={() => setStatsModal(false)}>
                <StyledCloseIco />
            </StyledClose>
            <StyledStatsWrapper>
                <StyledStatsTab>
                    <StyledStatsContainer>
                        <StyledStatsRow>
                            <StyledStatsTitle>General</StyledStatsTitle>
                        </StyledStatsRow>
                        <StyledStatsRow>
                            <StyledSpanWithIco ico={require('../../assets/stats/NAME.png')}>name:</StyledSpanWithIco>
                            <StyledSpan>{name}</StyledSpan>
                        </StyledStatsRow>
                        <StyledStatsRow>
                            <StyledSpanWithIco ico={require('../../assets/stats/LVL.png')}>lvl:</StyledSpanWithIco>
                            <StyledSpan>{lvl}</StyledSpan>
                        </StyledStatsRow>
                        <StyledStatsRow>
                            <StyledSpanWithIco ico={require('../../assets/stats/HP.png')}>health points:</StyledSpanWithIco>
                            <StyledSpan>{hp}/{maxHp}</StyledSpan>
                        </StyledStatsRow>
                        <StyledStatsRow>
                            <StyledSpanWithIco ico={require('../../assets/stats/AP.png')}>action points:</StyledSpanWithIco>
                            <StyledSpan>{ap}/{maxAp}</StyledSpan>
                        </StyledStatsRow>
                    </StyledStatsContainer>
                    <StyledStatsContainer>
                        <StyledStatsRow>
                            <StyledStatsTitle>Attributes</StyledStatsTitle>
                        </StyledStatsRow>
                        <StyledStatsRow>
                            <StyledSpanWithIco ico={require('../../assets/stats/STR.png')}>strength:</StyledSpanWithIco>
                            <StyledSpan>{attributes.str}</StyledSpan>
                        </StyledStatsRow>
                        <StyledStatsRow>
                            <StyledSpanWithIco ico={require('../../assets/stats/DEX.png')}>dexterity:</StyledSpanWithIco>
                            <StyledSpan>{attributes.dex}</StyledSpan>
                        </StyledStatsRow>
                        <StyledStatsRow>
                            <StyledSpanWithIco ico={require('../../assets/stats/INT.png')}>intelligence:</StyledSpanWithIco>
                            <StyledSpan>{attributes.int}</StyledSpan>
                        </StyledStatsRow>
                        <StyledStatsRow>
                            <StyledSpanWithIco ico={require('../../assets/stats/WIS.png')}>wisdom:</StyledSpanWithIco>
                            <StyledSpan>{attributes.wis}</StyledSpan>
                        </StyledStatsRow>
                        <StyledStatsRow>
                            <StyledSpanWithIco ico={require('../../assets/stats/TEN.png')}>tenacity:</StyledSpanWithIco>
                            <StyledSpan>{attributes.ten}</StyledSpan>
                        </StyledStatsRow>
                        <StyledStatsRow>
                            <StyledSpanWithIco ico={require('../../assets/stats/LUC.png')}>luck:</StyledSpanWithIco>
                            <StyledSpan>{attributes.luc}</StyledSpan>
                        </StyledStatsRow>
                    </StyledStatsContainer>
                </StyledStatsTab>
                <StyledStatsTab>
                    <StyledStatsContainer>
                        <StyledStatsRow>
                            <StyledStatsTitle>Defense</StyledStatsTitle>
                        </StyledStatsRow>
                        <StyledStatsRow>
                            <StyledSpanWithIco ico={require('../../assets/stats/PHYSICAL.png')}>physical:</StyledSpanWithIco>
                            <StyledSpan>{checkValues(baseStatsCopy.defense.physical, defense.physical)}</StyledSpan>
                        </StyledStatsRow>
                        <StyledStatsRow>
                            <StyledSpanWithIco ico={require('../../assets/stats/MAGIC.png')}>magic:</StyledSpanWithIco>
                            <StyledSpan>{checkValues(baseStatsCopy.defense.magic, defense.magic)}</StyledSpan>
                        </StyledStatsRow>
                        <StyledStatsRow>
                            <StyledSpanWithIco ico={require('../../assets/stats/POISON.png')}>poison:</StyledSpanWithIco>
                            <StyledSpan>{checkValues(baseStatsCopy.defense.poison, defense.poison)}</StyledSpan>
                        </StyledStatsRow>
                        <StyledStatsRow>
                            <StyledSpanWithIco ico={require('../../assets/stats/BLEEDING.png')}>bleeding:</StyledSpanWithIco>
                            <StyledSpan>{checkValues(baseStatsCopy.defense.bleeding, defense.bleeding)}</StyledSpan>
                        </StyledStatsRow>
                    </StyledStatsContainer>
                    <StyledStatsContainer>
                        <StyledStatsRow>
                            <StyledStatsTitle>Critical hits</StyledStatsTitle>
                        </StyledStatsRow>
                        <StyledStatsRow>
                            <StyledSpanWithIco ico={require('../../assets/stats/CRITMOD.png')}>critical modificator:</StyledSpanWithIco>
                            <StyledSpan>{checkValues(baseStatsCopy.stats.criticalMod, stats.criticalMod)}</StyledSpan>
                        </StyledStatsRow>
                        <StyledStatsRow>
                            <StyledSpanWithIco ico={require('../../assets/stats/CRITCHANCE.png')}>critical chance:</StyledSpanWithIco>
                            <StyledSpan>{checkValues(baseStatsCopy.stats.criticalChance, stats.criticalChance)}</StyledSpan>
                        </StyledStatsRow>
                        <StyledStatsRow>
                            <StyledSpanWithIco ico={require('../../assets/stats/MISS.png')}>chance to miss:</StyledSpanWithIco>
                            <StyledSpan>{checkValues(baseStatsCopy.stats.chanceToMiss, stats.chanceToMiss)}</StyledSpan>
                        </StyledStatsRow>
                    </StyledStatsContainer>
                </StyledStatsTab>
                <StyledStatsTab>
                    <StyledStatsContainer>
                        <StyledStatsRow>
                            <StyledStatsTitle>Effects</StyledStatsTitle>
                        </StyledStatsRow>
                        {effects.map(effect => (
                            <StyledStatsRow key={effect.id}>
                                <StyledSpanWithIco ico={require(`../../assets/effectsBar/${effect.id}.png`)}>{effect.label}</StyledSpanWithIco>
                                <StyledSpan>{effect.turnsDuration} turns</StyledSpan>
                            </StyledStatsRow>
                        ))}
                    </StyledStatsContainer>
                    <StyledStatsContainer>
                        <StyledStatsRow>
                            <StyledStatsTitle>Utility effects</StyledStatsTitle>
                        </StyledStatsRow>
                        {utilityEffects.map(effect => (
                            <StyledStatsRow key={effect.id}>
                                <StyledSpanWithIco ico={require(`../../assets/abilities/${effect.id}.png`)}>{effect.label}</StyledSpanWithIco>
                                <StyledSpan>{effect.turnsDuration} turns</StyledSpan>
                            </StyledStatsRow>
                        ))}
                    </StyledStatsContainer>
                </StyledStatsTab>
            </StyledStatsWrapper>
        </StyledWrapper>
    );
}

function mapStateToProps(state) {
    return {
        player: state.player,
    };
};

const Stats = connect(
    mapStateToProps,
    null,
)(ConnectedStats);

export default Stats;