import enemyStats from '../../js/enemyStats';
import { ENEMY_RESET_STATS, ENEMY_HP_SUBSTRACT, ENEMY_AP_SUBSTRACT, ENEMY_AP_RESET } from "../constants/action-types";


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
    return state;
}

export default enemyReducer;