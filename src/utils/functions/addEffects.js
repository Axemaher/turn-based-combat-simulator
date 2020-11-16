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
    let effectData = [];
    if (effectsArr) {
        effectsArr.forEach(effect => {
            if (Math.random() * 100 < effect.chance) {

                const data = {
                    id: effect.id,
                    turns: effect.turns
                }

                if (playerTurn) {
                    props.enemyEffectAdd(data)
                } else if (!playerTurn) {
                    props.playerEffectAdd(data)
                }
                effectData = [...effectData, {
                    id: effect.id,
                    turns: effect.turns
                }]
            }
        });
    }
    return effectData
}

export default addEffects;