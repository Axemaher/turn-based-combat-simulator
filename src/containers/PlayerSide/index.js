import React from "react";
import { connect } from "react-redux";
import styled from 'styled-components';

import Avatar from "../../components/Avatar";
import HpBar from "../../components/HpBar";
import EffectsBar from "../../components/EffectsBar";

const StyledSide = styled.div`
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    float: right;
    grid-area: playerSide;
`;

const StyledRow = styled.div`
    display: block;
`;

const StyledRowOneLine = styled(StyledRow)`
    display: flex;
    align-items: flex-end;
`;

const ConnectedPlayerSide = ({ name, avatar, effects, hp, maxHp }) => {

    return (
        <StyledSide>
            <StyledRowOneLine>
                <Avatar name={name} src={require(`../../assets/avatars/${avatar}.png`)} />
                <EffectsBar effects={effects} reverse={false} />
            </StyledRowOneLine>
            <StyledRow>
                <HpBar
                    hp={hp}
                    maxHp={maxHp}
                    float='right' />
            </StyledRow>
        </StyledSide>
    );
}

function mapStateToProps(state) {
    return {
        name: state.player.name,
        avatar: state.player.avatar,
        effects: state.player.effects,
        hp: state.player.hp,
        maxHp: state.player.maxHp,
        uiEnabled: state.battle.uiEnabled
    };
};

const PlayerSide = connect(
    mapStateToProps,
    null,
)(ConnectedPlayerSide);

export default PlayerSide;