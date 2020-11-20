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


export const checkEffects = (ap, maxAp, effects, name, playerTurn) => {

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

    if (ap === maxAp) {
        if (effects && effects.length) {
            effects.forEach(effect => {

                const { id, useValue, turnsDuration } = effect;

                if (turnsDuration <= 1) {
                    if (playerTurn) {
                        playerEffectSubstract(id);
                    } else if (!playerTurn) {
                        enemyEffectSubstract(id);
                    }
                }
                switch (id) {
                    case LOOSE_NEXT_TURN:
                        addLog(`${name} loses this turn.`);
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
                        addLog(`${name} loses ${useValue} health points by poison.`);
                        if (playerTurn) {
                            playerEffectTurnSubstract(POISON);
                            playerHpSubstract(useValue);
                        } else if (!playerTurn) {
                            enemyEffectTurnSubstract(POISON);
                            enemyHpSubstract(useValue);
                        }
                        break;
                    case BLEEDING:
                        addLog(`${name} loses ${useValue} health points by bleeding.`);
                        if (playerTurn) {
                            playerEffectTurnSubstract(BLEEDING);
                            playerHpSubstract(useValue);
                        } else if (!playerTurn) {
                            enemyEffectTurnSubstract(BLEEDING);
                            enemyHpSubstract(useValue);
                        }
                        break;
                    case HEALING:
                        addLog(`${name} recovers ${useValue} helth points by healing.`);
                        if (playerTurn) {
                            playerEffectTurnSubstract(HEALING);
                            playerHpAdd(useValue);
                        } else if (!playerTurn) {
                            enemyEffectTurnSubstract(HEALING);
                            enemyHpAdd(useValue);
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