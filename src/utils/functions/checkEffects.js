import store from '../../store/store'

//actions
import {
    setTurn,
    playerHpSubstract,
    playerApReset,
    playerEffectSubstract,
    playerEffectTurnSubstract,
    enemyHpSubstract,
    enemyApReset,
    enemyEffectSubstract,
    enemyEffectTurnSubstract,
} from "../../store/actions";

//effects
import {
    LOOSE_NEXT_TURN,
    POISON,
    BLEEDING
} from '../constans';


const actions = {
    setTurn: state => store.dispatch(setTurn(state)),
    playerHpSubstract: state => store.dispatch(playerHpSubstract(state)),
    playerApReset: state => store.dispatch(playerApReset(state)),
    playerEffectTurnSubstract: state => store.dispatch(playerEffectTurnSubstract(state)),
    playerEffectSubstract: state => store.dispatch(playerEffectSubstract(state)),
    enemyHpSubstract: state => store.dispatch(enemyHpSubstract(state)),
    enemyApReset: state => store.dispatch(enemyApReset(state)),
    enemyEffectSubstract: state => store.dispatch(enemyEffectSubstract(state)),
    enemyEffectTurnSubstract: state => store.dispatch(enemyEffectTurnSubstract(state)),
}


export const checkEffects = (personData, playerTurn) => {

    const {
        setTurn,
        playerHpSubstract,
        playerApReset,
        playerEffectSubstract,
        playerEffectTurnSubstract,
        enemyHpSubstract,
        enemyApReset,
        enemyEffectSubstract,
        enemyEffectTurnSubstract
    } = actions

    if (personData.ap === personData.maxAp) {
        if (personData.effects.length !== 0) {
            personData.effects.forEach(effect => {
                if (effect.turns === 0) {
                    if (playerTurn) {
                        playerEffectSubstract(effect.name)
                    } else if (!playerTurn) {
                        enemyEffectSubstract(effect.name)
                    }
                }
                switch (effect.name) {
                    case LOOSE_NEXT_TURN:
                        if (playerTurn) {
                            playerEffectSubstract(LOOSE_NEXT_TURN)
                            setTurn()
                        } else if (!playerTurn) {
                            enemyEffectSubstract(LOOSE_NEXT_TURN)
                            setTurn()
                        }
                        playerApReset()
                        enemyApReset()
                        break;
                    case POISON:
                        if (playerTurn) {
                            playerEffectTurnSubstract(POISON)
                            playerHpSubstract(personData.stats.poisonDamage)
                        } else if (!playerTurn) {
                            enemyEffectTurnSubstract(POISON)
                            enemyHpSubstract(personData.stats.poisonDamage)
                        }
                        break;
                    case BLEEDING:
                        if (playerTurn) {
                            playerEffectTurnSubstract(BLEEDING)
                            playerHpSubstract(personData.stats.poisonDamage)
                        } else if (!playerTurn) {
                            enemyEffectTurnSubstract(BLEEDING)
                            enemyHpSubstract(personData.stats.poisonDamage)
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