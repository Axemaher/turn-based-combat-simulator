import { SET_TURN } from "../../constants/action-types";


function turnReducer(state = true, action) {
    switch (action.type) {
        case SET_TURN:
            if (state) {
                return false;
            } else if (!state) {
                return true;
            }
            break;
        default:
            return state
    }
}

export default turnReducer;