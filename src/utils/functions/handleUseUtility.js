import store from '../../store/store'

//actions
import {
    playerUtilityEffectAdd,
    playerChangeStats,
    playerHpAdd,
} from "../../store/actions";

//utilities effects
import {
    UTILITY_POTION_CRITICAL_INCREASE,
    UTILITY_POTION_HEAL,
} from "../constans/utilities";

const actions = {
    playerUtilityEffectAdd: state => store.dispatch(playerUtilityEffectAdd(state)),
    playerChangeStats: state => store.dispatch(playerChangeStats(state)),
    playerHpAdd: state => store.dispatch(playerHpAdd(state)),
}

const state = store.getState()

export const handleUseUtility = (id, name, label, useValue, turnsDuration) => {

    const {
        playerUtilityEffectAdd,
        playerChangeStats,
        playerHpAdd,
    } = actions

    let utilityEffectData = {
        id,
        name,
        label,
        turnsDuration,
    }
    switch (id) {
        case UTILITY_POTION_CRITICAL_INCREASE:
            playerChangeStats({
                ...state.player.stats,
                criticalMod: state.player.baseStatsCopy.stats.criticalMod + useValue
            })
            playerUtilityEffectAdd(utilityEffectData);
            break;
        case UTILITY_POTION_HEAL:
            playerHpAdd(useValue)
            break;
        default: return
    }

    return
}

export default handleUseUtility;