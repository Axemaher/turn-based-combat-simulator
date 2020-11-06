const findBy = (arr, by, search) => {
    switch (by) {
        case "id":
            return arr.findIndex(e => e.id === search);
        case "name":
            return arr.findIndex(e => e.name === search);
    }
}

const reducerPlayerEnemyPattern = (name, stateInitial) => {
    return (state = stateInitial, action) => {
        switch (action.type) {
            case `${name}_RESET_STATS`:
                return state;
            case `${name}_HP_SUBSTRACT`:
                const hp = state.hp - action.payload;
                if (hp <= 0) {
                    return { ...state, hp: 0 }
                } else {
                    return { ...state, hp: state.hp - action.payload }
                }
            case `${name}_AP_SUBSTRACT`:
                return { ...state, ap: state.ap - action.payload }
            case `${name}_AP_RESET`:
                return { ...state, ap: state.maxAp }
            case `${name}_EFFECT_ADD`:
                const effectIsNotInArr = findBy(state.effects, "name", action.payload.name)
                if (effectIsNotInArr === -1) {
                    return {
                        ...state,
                        effects: [...state.effects, action.payload]
                    }
                } else {
                    return state
                }
            case `${name}_EFFECT_TURN_SUBSTRACT`:
                const effectIndex = findBy(state.effects, "name", action.payload)
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
                return { ...state, effects: state.effects.filter(effect => effect.name !== action.payload) }
            case `${name}_USESPERBATTLE_SUBSTRACT`:
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
            default: return state
        }
    };
};

export default reducerPlayerEnemyPattern;