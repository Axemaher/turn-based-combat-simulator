import playerStats from '../../../js/stats/playerStats';
import reducerPlayerEnemyPattern from '../reducerPlayerEnemyPattern';


export const initialState = playerStats;

const playerReducer = reducerPlayerEnemyPattern('PLAYER', initialState)

export default playerReducer;