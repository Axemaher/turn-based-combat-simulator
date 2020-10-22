import playerStats from '../../js/playerStats';
import {
    PLAYER_RESET_STATS,
    PLAYER_HP_SUBSTRACT,
    PLAYER_AP_SUBSTRACT,
    PLAYER_AP_RESET
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
    return state;
}

export default playerReducer;