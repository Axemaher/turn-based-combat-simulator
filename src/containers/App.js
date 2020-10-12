import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  setTurn,
  playerResetStats,
  playerHpSubstract,
  playerApSubstract,
  playerApReset,
  enemyHpSubstract,
  enemyApSubstract,
  enemyApReset,
} from "../redux/actions";
import styled from 'styled-components';

const StyledWrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const StyledSide = styled.div`
  background-color: #e3e3e3;
  margin: 0 2px;
  display: flex;
  flex-direction: column;
`;

const StyledAttackTile = styled.div`
  width: 60px;
  height: 60px;
  border: 2px solid black;
  border-radius: 2px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
`;

const StyledP = styled.p`
  padding: 0;
  margin: 0;
`;

const StyledUl = styled.ul`
  padding: 0;
`;

const StyledLi = styled.li`
  display: inline-block;
`;

const ConnectedApp = ({ state, dispatch }) => {
  const { player, enemy, turn } = state;

  const [attackDisabled, setAttackDisabled] = useState(false)

  useEffect(() => {
    if (!turn) {
      const checkEnemyAvailableAttacks = () => enemy.attacks.filter(e => e.apCost < enemy.ap);
      if (!checkEnemyAvailableAttacks().length) {
        dispatch.setTurn();
        dispatch.playerApReset();
        dispatch.enemyApReset();
      } else {
        const enemyAttackIndex = Math.floor(Math.random() * checkEnemyAvailableAttacks().length);
        const enemyAttackData = {
          name: enemy.attacks[enemyAttackIndex].name,
          damage: enemy.attacks[enemyAttackIndex].damage,
          apCost: enemy.attacks[enemyAttackIndex].apCost,
        }
        setTimeout(() => {
          dispatch.playerHpSubstract(enemyAttackData.damage);
          dispatch.enemyApSubstract(enemyAttackData.apCost);
          if (!checkEnemyAvailableAttacks().length) {
            dispatch.setTurn();
            dispatch.playerApReset();
            dispatch.enemyApReset();
          }
        }, 500);
      }
    }

    return () => {

    }
  }, [turn, enemy.ap])

  const handleAttack = ({ damage, apCost }) => {
    setAttackDisabled(true)
    setTimeout(() => {
      dispatch.enemyHpSubstract(damage);
      dispatch.playerApSubstract(apCost);
      setAttackDisabled(false)
    }, 500);
  }


  return (
    <StyledWrapper>
      <StyledSide>
        <h2>player</h2>
        <span>player name: {player.name}</span>
        <span>hp: {player.hp}</span>
        <span>ap: {player.ap}</span>
        <span>attacks:</span>
        <StyledUl>
          {player.attacks.map(attack => (
            <StyledLi key={attack.name}>
              <StyledButton
                disabled={attackDisabled || attack.apCost > player.ap}
                onClick={() => handleAttack(
                  {
                    damage: attack.damage,
                    apCost: attack.apCost
                  }
                )}>
                <StyledAttackTile>
                  <StyledP>{attack.name}</StyledP>
                  <StyledP>AP: {attack.apCost}</StyledP>
                </StyledAttackTile>
              </StyledButton>
            </StyledLi>
          ))}
        </StyledUl>
        <button onClick={() => dispatch.setTurn()}>turn</button>
      </StyledSide>
      <StyledSide>
        <h2>enemy</h2>
        <span>enemy name: {enemy.name}</span>
        <span>hp: {enemy.hp}</span>
      </StyledSide>
    </StyledWrapper>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: {
      setTurn: state => dispatch(setTurn(state)),
      playerResetStats: state => dispatch(playerResetStats(state)),
      playerHpSubstract: state => dispatch(playerHpSubstract(state)),
      playerApSubstract: state => dispatch(playerApSubstract(state)),
      playerApReset: state => dispatch(playerApReset(state)),
      enemyHpSubstract: state => dispatch(enemyHpSubstract(state)),
      enemyApSubstract: state => dispatch(enemyApSubstract(state)),
      enemyApReset: state => dispatch(enemyApReset(state)),
    }
  };
}

function mapStateToProps(state) {
  return {
    state: {
      player: state.player,
      enemy: state.enemy,
      turn: state.turn
    }
  };
};

const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedApp);

export default App;