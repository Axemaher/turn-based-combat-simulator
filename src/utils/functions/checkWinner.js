import store from '../../store/store';

//actions
import {
    battleEnd,
    setWinner,
    setUiEnabled,
    addLog,
} from "../../store/actions";

const actions = {
    battleEnd: state => store.dispatch(battleEnd(state)),
    setWinner: state => store.dispatch(setWinner(state)),
    setUiEnabled: state => store.dispatch(setUiEnabled(state)),
    addLog: state => store.dispatch(addLog(state)),
}

export function checkWinner() {

    const state = store.getState();
    const { player, enemy } = state;
    let winnerName = "";
    let battleEnded = false;
    if (player.hp <= 0 || enemy.hp <= 0) {
        actions.battleEnd();

        if (player.hp <= 0) {
            winnerName = enemy.name;
        } else if (enemy.hp <= 0) {
            winnerName = player.name;
        }
        battleEnded = true;
        actions.addLog(`${winnerName} win!`);
        actions.setWinner(winnerName);
        actions.setUiEnabled(false);
    }
    return { battleEnded }
}

export default checkWinner;