import {
    BATTLE_START,
    BATTLE_END,
    SET_WINNER,
    SHOW_INFO,
    HIDE_INFO,
    SET_BATTLE_INFO_DATA
} from "../constants/action-types";

const initialState = {
    battleStarted: false,
    winner: null,
    infoStarted: false,
    battleInfoData: null,
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
            return { ...state, infoStarted: true }
        case HIDE_INFO:
            return { ...state, infoStarted: false }
        case SET_BATTLE_INFO_DATA:
            return { ...state, battleInfoData: action.payload }
        default:
            return state
    }
}

export default battleStatusReducer;