import store from '../../store/store'

//actions
import {
    playerUtilityEffectAdd,
    playerChangeStats,
} from "../../store/actions";

//utilities effects
import {
    CRITICAL_MOD_ADD
} from "../constans/utilitiesEffects";

const actions = {
    playerUtilityEffectAdd: state => store.dispatch(playerUtilityEffectAdd(state)),
    playerChangeStats: state => store.dispatch(playerChangeStats(state)),
}

const state = store.getState()

export const addUtilityEffect = (effect) => {

    const {
        playerUtilityEffectAdd,
        playerChangeStats,
    } = actions

    let data = {
        id: effect.id,
        bonusValue: null,
        turns: effect.turns
    }
    switch (effect.id) {
        case CRITICAL_MOD_ADD:
            data.bonusValue = state.player.baseStats.criticalMod + effect.value;
            console.log("add utility")

            playerChangeStats({
                ...state.player.stats,
                criticalMod: data.bonusValue
            })
            break;
        default: return
    }
    playerUtilityEffectAdd(data);

    return data
}

export default addUtilityEffect;