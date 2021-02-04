import store from '../../store/store'

//actions
import {
    playerUtilityEffectSubstract,
    playerUtilityEffectTurnSubstract,
    playerChangeStats,
} from "../../store/actions";

//utilities effects
import {
    UTILITY_POTION_CRITICAL_INCREASE
} from "../constans/utilities";

const actions = {
    playerUtilityEffectSubstract: state => store.dispatch(playerUtilityEffectSubstract(state)),
    playerUtilityEffectTurnSubstract: state => store.dispatch(playerUtilityEffectTurnSubstract(state)),
    playerChangeStats: state => store.dispatch(playerChangeStats(state)),
}


export const checkUtilitiesEffects = (ap, maxAp, utilityEffects, playerTurn) => {

    const state = store.getState()


    const {
        playerUtilityEffectSubstract,
        playerUtilityEffectTurnSubstract,
        playerChangeStats,
    } = actions

    if (ap === maxAp && playerTurn) {
        if (utilityEffects && utilityEffects.length) {
            utilityEffects.forEach(utilityEffect => {

                const { turnsDuration, id } = utilityEffect;

                if (turnsDuration <= 1) {
                    switch (id) {
                        case UTILITY_POTION_CRITICAL_INCREASE:
                            playerChangeStats({
                                ...state.player.stats,
                                criticalMod: state.player.baseStatsCopy.stats.criticalMod
                            })
                            break;
                        default: return null
                    }
                    playerUtilityEffectSubstract(id);
                }
                playerUtilityEffectTurnSubstract(id)
            });
        }
    }
}

export default checkUtilitiesEffects;