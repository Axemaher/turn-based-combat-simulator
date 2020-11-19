import store from '../../store/store'

//actions
import {
    playerUtilityEffectSubstract,
    playerUtilityEffectTurnSubstract,
    playerChangeStats,
} from "../../store/actions";

//utilities effects
import {
    CRITICAL_MOD_ADD
} from "../../utils/constans/utilitiesEffects";

const actions = {
    playerUtilityEffectSubstract: state => store.dispatch(playerUtilityEffectSubstract(state)),
    playerUtilityEffectTurnSubstract: state => store.dispatch(playerUtilityEffectTurnSubstract(state)),
    playerChangeStats: state => store.dispatch(playerChangeStats(state)),
}

const state = store.getState()

export const checkUtilitiesEffects = (personData, playerTurn) => {

    const {
        playerUtilityEffectSubstract,
        playerUtilityEffectTurnSubstract,
        playerChangeStats,
    } = actions

    if (personData.ap === personData.maxAp && playerTurn) {
        if (personData.utilityEffects.length !== 0) {
            personData.utilityEffects.forEach(utilityEffect => {
                if (utilityEffect.turns === 1) {
                    switch (utilityEffect.id) {
                        case CRITICAL_MOD_ADD:
                            playerChangeStats({
                                ...state.player.stats,
                                criticalMod: state.player.baseStats.criticalMod
                            })
                    }
                    playerUtilityEffectSubstract(utilityEffect.id);
                }
                playerUtilityEffectTurnSubstract(utilityEffect.id)
            });
        }
    }
}

export default checkUtilitiesEffects;