import store from '../../store/store'

//actions
import {
    playerEffectSubstract,
    enemyEffectSubstract,
    setTurn,
    playerEffectTurnSubstract,
    playerHpSubstract,
    enemyEffectTurnSubstract,
    enemyHpSubstract,
} from "../../store/actions";

//effects
import {
    LOOSE_NEXT_TURN,
    POISON,
    BLEEDING
} from '../constans';


const actions = {
    playerEffectSubstract: state => store.dispatch(playerEffectSubstract(state)),
    enemyEffectSubstract: state => store.dispatch(enemyEffectSubstract(state)),
    setTurn: state => store.dispatch(setTurn(state)),
    playerEffectTurnSubstract: state => store.dispatch(playerEffectTurnSubstract(state)),
    playerHpSubstract: state => store.dispatch(playerHpSubstract(state)),
    enemyEffectTurnSubstract: state => store.dispatch(enemyEffectTurnSubstract(state)),
    enemyHpSubstract: state => store.dispatch(enemyHpSubstract(state)),
}


export const checkEffects = (personData, playerTurn) => {

    const { playerEffectSubstract,
        enemyEffectSubstract,
        setTurn,
        playerEffectTurnSubstract,
        playerHpSubstract,
        enemyEffectTurnSubstract,
        enemyHpSubstract, } = actions

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