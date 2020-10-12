import { combineReducers } from "redux";
import turnReducer from './turnReducer';
import playerReducer from './playerReducer';
import enemyReducer from './enemyReducer';



const rootReducer = combineReducers({
    player: playerReducer,
    enemy: enemyReducer,
    turn: turnReducer
});

export default rootReducer;