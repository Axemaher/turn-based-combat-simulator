import store from '../../store/store'

import {
    enemyEffectAdd,
    playerEffectAdd
} from "../../store/actions";

const props = {
    enemyEffectAdd: state => store.dispatch(enemyEffectAdd(state)),
    playerEffectAdd: state => store.dispatch(playerEffectAdd(state)),
}


export const addEffects = (effectsArr, playerTurn) => {
    if (effectsArr) {
        effectsArr.forEach(effect => {
            if (Math.random() * 100 < effect.chance) {

                const effectData = {
                    name: effect.name,
                    turns: effect.turns
                }

                if (playerTurn) {
                    props.enemyEffectAdd(effectData)
                } else if (!playerTurn) {
                    props.playerEffectAdd(effectData)
                }
            }
        });
    }
}

export default addEffects;