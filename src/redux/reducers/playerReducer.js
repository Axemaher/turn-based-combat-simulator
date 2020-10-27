import playerStats from '../../js/playerStats';
import {
    PLAYER_RESET_STATS,
    PLAYER_HP_SUBSTRACT,
    PLAYER_AP_SUBSTRACT,
    PLAYER_AP_RESET,
    PLAYER_EFFECT_ADD,
    PLAYER_EFFECT_SUBSTRACT,
    PLAYER_EFFECT_TURN_SUBSTRACT,
} from "../constants/action-types";


const initialState = playerStats;

function playerReducer(state = initialState, action) {
    if (action.type === PLAYER_RESET_STATS) {
        return initialState;
    }
    if (action.type === PLAYER_HP_SUBSTRACT) {
        const hp = state.hp - action.payload;
        if (hp <= 0) {
            return { ...state, hp: 0 }
        } else {
            return { ...state, hp: state.hp - action.payload }
        }
    }
    if (action.type === PLAYER_AP_SUBSTRACT) {
        return { ...state, ap: state.ap - action.payload }
    }
    if (action.type === PLAYER_AP_RESET) {
        return { ...state, ap: playerStats.maxAp }
    }
    if (action.type === PLAYER_EFFECT_ADD) {
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
    if (action.type === PLAYER_EFFECT_TURN_SUBSTRACT) {
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
    if (action.type === PLAYER_EFFECT_SUBSTRACT) {
        return { ...state, effects: state.effects.filter(effect => effect.name !== action.payload) }
    }
    return state;
}

export default playerReducer;