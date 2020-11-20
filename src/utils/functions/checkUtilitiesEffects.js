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

const state = store.getState()

export const checkUtilitiesEffects = (ap, maxAp, utilityEffects, playerTurn) => {

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
                                criticalMod: state.player.baseStats.criticalMod
                            })
                    }
                    playerUtilityEffectSubstract(id);
                }
                playerUtilityEffectTurnSubstract(id)
            });
        }
    }
}

export default checkUtilitiesEffects;