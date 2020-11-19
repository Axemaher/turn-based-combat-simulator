import store from '../../store/store'

//actions
import {
    setTurn,
    addLog,
    playerHpSubstract,
    playerHpAdd,
    playerApReset,
    playerEffectSubstract,
    playerEffectTurnSubstract,
    enemyHpSubstract,
    enemyHpAdd,
    enemyApReset,
    enemyEffectSubstract,
    enemyEffectTurnSubstract,
} from "../../store/actions";

//effects
import {
    LOOSE_NEXT_TURN,
    POISON,
    BLEEDING,
    HEALING,
} from '../constans/effects';


const actions = {
    setTurn: state => store.dispatch(setTurn(state)),
    addLog: state => store.dispatch(addLog(state)),
    playerHpSubstract: state => store.dispatch(playerHpSubstract(state)),
    playerHpAdd: state => store.dispatch(playerHpAdd(state)),
    playerApReset: state => store.dispatch(playerApReset(state)),
    playerEffectTurnSubstract: state => store.dispatch(playerEffectTurnSubstract(state)),
    playerEffectSubstract: state => store.dispatch(playerEffectSubstract(state)),
    enemyHpSubstract: state => store.dispatch(enemyHpSubstract(state)),
    enemyHpAdd: state => store.dispatch(enemyHpAdd(state)),
    enemyApReset: state => store.dispatch(enemyApReset(state)),
    enemyEffectSubstract: state => store.dispatch(enemyEffectSubstract(state)),
    enemyEffectTurnSubstract: state => store.dispatch(enemyEffectTurnSubstract(state)),
}


export const checkEffects = (personData, playerTurn) => {

    const {
        setTurn,
        addLog,
        playerHpSubstract,
        playerHpAdd,
        playerApReset,
        playerEffectSubstract,
        playerEffectTurnSubstract,
        enemyHpSubstract,
        enemyHpAdd,
        enemyApReset,
        enemyEffectSubstract,
        enemyEffectTurnSubstract
    } = actions

    if (personData.ap === personData.maxAp) {
        if (personData.effects.length !== 0) {
            personData.effects.forEach(effect => {
                if (effect.turns === 1) {
                    if (playerTurn) {
                        playerEffectSubstract(effect.id);
                    } else if (!playerTurn) {
                        enemyEffectSubstract(effect.id);
                    }
                }
                switch (effect.id) {
                    case LOOSE_NEXT_TURN:
                        addLog(`${personData.name} loses this turn.`);
                        if (playerTurn) {
                            playerEffectSubstract(LOOSE_NEXT_TURN);
                            setTurn();
                        } else if (!playerTurn) {
                            enemyEffectSubstract(LOOSE_NEXT_TURN);
                            setTurn();
                        }
                        playerApReset();
                        enemyApReset();
                        break;
                    case POISON:
                        addLog(`${personData.name} loses ${effect.value} health points by poison.`);
                        if (playerTurn) {
                            playerEffectTurnSubstract(POISON);
                            playerHpSubstract(effect.value);
                        } else if (!playerTurn) {
                            enemyEffectTurnSubstract(POISON);
                            enemyHpSubstract(effect.value);
                        }
                        break;
                    case BLEEDING:
                        addLog(`${personData.name} loses ${effect.value} health points by bleeding.`);
                        if (playerTurn) {
                            playerEffectTurnSubstract(BLEEDING);
                            playerHpSubstract(effect.value);
                        } else if (!playerTurn) {
                            enemyEffectTurnSubstract(BLEEDING);
                            enemyHpSubstract(effect.value);
                        }
                        break;
                    case HEALING:
                        addLog(`${personData.name} recovers ${effect.value} helth points by healing.`);
                        if (playerTurn) {
                            playerEffectTurnSubstract(HEALING);
                            playerHpAdd(effect.value);
                        } else if (!playerTurn) {
                            enemyEffectTurnSubstract(HEALING);
                            enemyHpAdd(effect.value);
                        }
                        break;
                    default:
                        break;
                }
            });
        }
    }
}

export default checkEffects;