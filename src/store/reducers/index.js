import { combineReducers } from "redux";
import turnReducer from './turnReducer';
import battleStatusReducer from './battleStatusReducer';
import playerReducer from './playerReducer';
import enemyReducer from './enemyReducer';


const rootReducer = combineReducers({
    player: playerReducer,
    enemy: enemyReducer,
    turn: turnReducer,
    battle: battleStatusReducer
});

export default rootReducer;