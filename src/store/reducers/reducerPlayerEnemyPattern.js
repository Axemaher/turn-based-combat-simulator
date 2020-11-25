const find = (arr, search) => {
    return arr.findIndex(e => e.id === search);
}

const reducerPlayerEnemyPattern = (name, stateInitial) => {
    return (state = stateInitial, action) => {
        switch (action.type) {
            case `${name}_RESET_STATS`:
                return state;
            case `${name}_HP_SUBSTRACT`:
                const hpMin = state.hp - action.payload;
                if (hpMin <= 0) {
                    return { ...state, hp: 0 }
                } else {
                    return { ...state, hp: state.hp - action.payload }
                }
            case `${name}_HP_ADD`:
                return { ...state, hp: state.hp + action.payload > state.maxHp ? state.maxHp : state.hp + action.payload }
            case `${name}_AP_SUBSTRACT`:
                return { ...state, ap: state.ap - action.payload }
            case `${name}_AP_RESET`:
                return { ...state, ap: state.maxAp }
            case `${name}_EFFECT_ADD`:
                if (find(state.effects, action.payload.id) === -1) {
                    return {
                        ...state,
                        effects: [...state.effects, action.payload]
                    }
                } else {
                    return {
                        ...state,
                        effects: state.effects.map((effect, index) => {
                            if (index === find(state.effects, action.payload.id)) {
                                return {
                                    ...effect,
                                    turnsDuration: action.payload.turnsDuration
                                }
                            }
                            return effect
                        })
                    }
                }
            case `${name}_EFFECT_TURN_SUBSTRACT`:
                return {
                    ...state,
                    effects: state.effects.map((effect, index) => {
                        if (index === find(state.effects, action.payload)) {
                            return {
                                ...effect,
                                turnsDuration: effect.turnsDuration - 1
                            }
                        }
                        return effect
                    })
                }
            case `${name}_EFFECT_SUBSTRACT`:
                return { ...state, effects: state.effects.filter(effect => effect.id !== action.payload) }
            case `${name}_ABILITY_USES_PER_BATTLE_SUBSTRACT`:
                return {
                    ...state,
                    abilities: state.abilities.map((ability, index) => {
                        if (index === find(state.abilities, action.payload)) {
                            return {
                                ...ability,
                                usesPerBattle: ability.usesPerBattle - 1
                            }
                        }
                        return ability
                    })
                }
            // UTILITIES
            case `${name}_UTILITY_USES_PER_BATTLE_SUBSTRACT`:
                return {
                    ...state,
                    abilities: state.abilities.map((ability, index) => {
                        if (index === find(state.abilities, action.payload)) {
                            if (state.abilities[index].usesPerBattle - 1 <= 0) {
                                return {
                                    id: "EMPTY",
                                    name: "Empty slot"
                                }
                            } else {
                                return {
                                    ...ability,
                                    usesPerBattle: ability.usesPerBattle - 1
                                }
                            }
                        }
                        return ability
                    })
                }
            case `${name}_UTILITY_EFFECT_ADD`:
                if (find(state.utilityEffects, action.payload.id) === -1) {
                    return {
                        ...state,
                        utilityEffects: [...state.utilityEffects, action.payload]
                    }
                } else {
                    return {
                        ...state,
                        utilityEffects: state.utilityEffects.map((effect, index) => {
                            if (index === find(state.utilityEffects, action.payload.id)) {
                                return {
                                    ...effect,
                                    turnsDuration: action.payload.turnsDuration
                                }
                            }
                            return effect
                        })
                    }
                }
            case `${name}_UTILITY_EFFECT_TURN_SUBSTRACT`:
                return {
                    ...state,
                    utilityEffects: state.utilityEffects.map((utilityEffect, index) => {
                        if (index === find(state.utilityEffects, action.payload)) {
                            return {
                                ...utilityEffect,
                                turnsDuration: utilityEffect.turnsDuration - 1
                            }
                        }
                        return utilityEffect
                    })
                }
            case `${name}_UTILITY_EFFECT_SUBSTRACT`:
                return { ...state, utilityEffects: state.utilityEffects.filter(utilityEffect => utilityEffect.id !== action.payload) }
            case `${name}_CHANGE_STATS`:
                return { ...state, stats: action.payload }
            default: return state
        }
    };
};

export default reducerPlayerEnemyPattern;