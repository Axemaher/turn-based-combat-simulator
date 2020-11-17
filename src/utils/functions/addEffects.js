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
                    turns: effect.turns,
                    value: effect.value,
                    use: effect.use,
                }

                if (playerTurn) {
                    if (effect.use === "self") {
                        props.playerEffectAdd(data);
                    } else {
                        props.enemyEffectAdd(data);
                    }
                } else if (!playerTurn) {
                    if (effect.use === "self") {
                        props.enemyEffectAdd(data);
                    } else {
                        props.playerEffectAdd(data);
                    }
                }
                effectData = [...effectData, {
                    id: effect.id,
                    turns: effect.turns,
                    value: effect.value,
                    use: effect.use,
                }]
            }
        });
    }
    return effectData
}

export default addEffects;