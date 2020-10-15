import { BATTLE_START, BATTLE_END, SET_WINNER, SHOW_INFO, HIDE_INFO } from "../constants/action-types";

const initialState = {
    battleStarted: false,
    winner: null,
    info: false,
}

function battleStatusReducer(state = initialState, action) {
    switch (action.type) {
        case BATTLE_START:
            return { ...state, battleStarted: true }
        case BATTLE_END:
            return { ...state, battleStarted: false }
        case SET_WINNER:
            return { ...state, winner: action.payload }
        case SHOW_INFO:
            return { ...state, info: true }
        case HIDE_INFO:
            return { ...state, info: false }
        default:
            return state
    }
}

export default battleStatusReducer;