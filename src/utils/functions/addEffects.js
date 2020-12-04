import store from '../../store/store';

import {
    enemyEffectAdd,
    playerEffectAdd
} from "../../store/actions";

import {
    SELF,
} from '../constans';

const actions = {
    enemyEffectAdd: state => store.dispatch(enemyEffectAdd(state)),
    playerEffectAdd: state => store.dispatch(playerEffectAdd(state)),
}


export const addEffects = (effects, playerTurn) => {

    const {
        enemyEffectAdd,
        playerEffectAdd,
    } = actions;

    let effectData = [];
    if (effects) {
        effects.forEach(effect => {

            const { id, turnsDuration, useValue, use, label } = effect;

            if (Math.random() * 100 < effect.chance) {

                const newEffectData = {
                    id,
                    label,
                    turnsDuration,
                    useValue,
                    use,
                }

                if (playerTurn) {
                    if (use === SELF) {
                        playerEffectAdd(newEffectData);
                    } else {
                        enemyEffectAdd(newEffectData);
                    }
                } else if (!playerTurn) {
                    if (use === SELF) {
                        enemyEffectAdd(newEffectData);
                    } else {
                        playerEffectAdd(newEffectData);
                    }
                }
                effectData = [...effectData, newEffectData]
            }
        });
    }
    return effectData
}

export default addEffects;