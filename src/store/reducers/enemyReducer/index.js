import enemyStats from '../../../js/stats/enemyStats';
import {
    ENEMY_RESET_STATS,
    ENEMY_HP_SUBSTRACT,
    ENEMY_AP_SUBSTRACT,
    ENEMY_AP_RESET,
    ENEMY_EFFECT_ADD,
    ENEMY_EFFECT_TURN_SUBSTRACT,
    ENEMY_EFFECT_SUBSTRACT,
} from "../../constants/action-types";


const initialState = enemyStats;

function enemyReducer(state = initialState, action) {
    if (action.type === ENEMY_RESET_STATS) {
        return initialState;
    }
    if (action.type === ENEMY_HP_SUBSTRACT) {
        const hp = state.hp - action.payload;
        if (hp <= 0) {
            return { ...state, hp: 0 }
        } else {
            return { ...state, hp: state.hp - action.payload }
        }
    }
    if (action.type === ENEMY_AP_SUBSTRACT) {
        return { ...state, ap: state.ap - action.payload }
    }
    if (action.type === ENEMY_AP_RESET) {
        return { ...state, ap: enemyStats.ap }
    }
    if (action.type === ENEMY_EFFECT_ADD) {
        const itemIndex = (state, action) => state.effects.findIndex(effect => effect.name === action.payload.name)
        // effect is already in array?
        if (itemIndex(state, action) === -1) {
            return {
                ...state,
                effects: [...state.effects, action.payload]
            }
        } else {
            return state
        }

    }
    if (action.type === ENEMY_EFFECT_TURN_SUBSTRACT) {
        const findedItemIndex = state.effects.findIndex(effect => effect.name === action.payload)
        return {
            ...state,
            effects: state.effects.map((effect, index) => {
                if (index === findedItemIndex) {
                    return {
                        ...effect,
                        turns: effect.turns - 1
                    }
                }
                return effect
            })
        }
    }
    if (action.type === ENEMY_EFFECT_SUBSTRACT) {
        return { ...state, effects: state.effects.filter(effect => effect.name !== action.payload) }
    }
    return state;
}

export default enemyReducer;