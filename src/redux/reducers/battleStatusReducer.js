import { BATTLE_START, BATTLE_END, SET_WINNER } from "../constants/action-types";

const initialState = {
    battleStarted: false,
    winner: null,
}

function battleStatusReducer(state = initialState, action) {
    switch (action.type) {
        case BATTLE_START:
            return { ...state, battleStarted: true }

        case BATTLE_END:
            return { ...state, battleStarted: false }

        case SET_WINNER:
            return { ...state, winner: action.payload }

        default:
            return state
    }
}

export default battleStatusReducer;