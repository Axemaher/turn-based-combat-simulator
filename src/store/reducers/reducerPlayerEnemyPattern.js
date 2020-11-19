const findBy = (arr, by, search) => {
    switch (by) {
        case "id":
            return arr.findIndex(e => e.id === search);
        default: return
    }
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
                const checkIndex = findBy(state.effects, "id", action.payload.id)
                if (checkIndex === -1) {
                    return {
                        ...state,
                        effects: [...state.effects, action.payload]
                    }
                } else {
                    return {
                        ...state,
                        effects: state.effects.map((effect, index) => {
                            if (index === checkIndex) {
                                return {
                                    ...effect,
                                    turns: action.payload.turns
                                }
                            }
                            return effect
                        })
                    }
                }
            case `${name}_EFFECT_TURN_SUBSTRACT`:
                const effectIndex = findBy(state.effects, "id", action.payload)
                return {
                    ...state,
                    effects: state.effects.map((effect, index) => {
                        if (index === effectIndex) {
                            return {
                                ...effect,
                                turns: effect.turns - 1
                            }
                        }
                        return effect
                    })
                }
            case `${name}_EFFECT_SUBSTRACT`:
                return { ...state, effects: state.effects.filter(effect => effect.id !== action.payload) }
            case `${name}_ATTACK_USES_PER_BATTLE_SUBSTRACT`:
                const attackIndex = findBy(state.attacks, "id", action.payload)
                return {
                    ...state,
                    attacks: state.attacks.map((attack, index) => {
                        if (index === attackIndex) {
                            return {
                                ...attack,
                                usesPerBattle: attack.usesPerBattle - 1
                            }
                        }
                        return attack
                    })
                }
            // UTILITIES
            case `${name}_UTILITY_USES_PER_BATTLE_SUBSTRACT`:
                const utilityIndex = findBy(state.utilities, "id", action.payload)
                return {
                    ...state,
                    utilities: state.utilities.map((utility, index) => {
                        if (index === utilityIndex) {
                            if (state.utilities[index].usesPerBattle - 1 <= 0) {
                                return {
                                    id: "EMPTY",
                                    name: "Empty slot"
                                }
                            } else {
                                return {
                                    ...utility,
                                    usesPerBattle: utility.usesPerBattle - 1
                                }
                            }
                        }
                        return utility
                    })
                }
            case `${name}_UTILITY_EFFECT_ADD`:
                const checkIn = findBy(state.utilityEffects, "id", action.payload.id)
                if (checkIn === -1) {
                    return {
                        ...state,
                        utilityEffects: [...state.utilityEffects, action.payload]
                    }
                } else {
                    return {
                        ...state,
                        utilityEffects: state.utilityEffects.map((effect, index) => {
                            if (index === checkIn) {
                                return {
                                    ...effect,
                                    turns: action.payload.turns
                                }
                            }
                            return effect
                        })
                    }
                }
            case `${name}_UTILITY_EFFECT_TURN_SUBSTRACT`:
                const effectI = findBy(state.utilityEffects, "id", action.payload)
                console.log("action.payload")
                return {
                    ...state,
                    utilityEffects: state.utilityEffects.map((utilityEffect, index) => {
                        if (index === effectI) {
                            return {
                                ...utilityEffect,
                                turns: utilityEffect.turns - 1
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