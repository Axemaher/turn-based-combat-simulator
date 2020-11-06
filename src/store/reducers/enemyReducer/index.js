import enemyStats from '../../../js/stats/enemyStats';
import reducerPlayerEnemyPattern from '../reducerPlayerEnemyPattern';


export const initialState = enemyStats;

const enemyReducer = reducerPlayerEnemyPattern('ENEMY', initialState)

export default enemyReducer;