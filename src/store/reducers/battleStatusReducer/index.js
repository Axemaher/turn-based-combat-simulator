import {
    BATTLE_START,
    BATTLE_END,
    SET_WINNER,
    SHOW_INFO,
    HIDE_INFO,
    SET_BATTLE_INFO_DATA,
    SET_UI_ENABLED,
    ADD_LOG,
} from "../../constants/action-types";

const initialState = {
    battleStarted: true,
    winner: null,
    infoStarted: false,
    battleInfoData: null,
    uiEnabled: true,
    log: []
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
        case SET_UI_ENABLED:
            return { ...state, uiEnabled: action.payload }
        case ADD_LOG:
            let lastIndex = state.log.length - 1;
            if (action.payload === state.log[lastIndex] &&
                state.log[lastIndex].search("win!") !== -1) {
                return state
            } else {
                return { ...state, log: [...state.log, action.payload] }
            }
        default:
            return state
    }
}

export default battleStatusReducer;