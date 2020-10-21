import {
    SET_TURN,

    BATTLE_END,
    BATTLE_START,
    SET_WINNER,
    SHOW_INFO,
    HIDE_INFO,
    SET_BATTLE_INFO_DATA,

    PLAYER_RESET_STATS,
    PLAYER_HP_SUBSTRACT,
    PLAYER_AP_SUBSTRACT,
    PLAYER_AP_RESET,

    ENEMY_HP_SUBSTRACT,
    ENEMY_AP_SUBSTRACT,
    ENEMY_AP_RESET,
}
    from "../constants/action-types";

// turn
export const setTurn = (payload) => {
    return { type: SET_TURN, payload }
};

//battle status
export const battleEnd = (payload) => {
    return { type: BATTLE_END, payload }
};

export const battleStart = (payload) => {
    return { type: BATTLE_START, payload }
};

export const setWinner = (payload) => {
    return { type: SET_WINNER, payload }
};

export const showInfo = (payload) => {
    return { type: SHOW_INFO, payload }
};

export const hideInfo = (payload) => {
    return { type: HIDE_INFO, payload }
};

export const setBattleInfoData = (payload) => {
    return { type: SET_BATTLE_INFO_DATA, payload }
};

//player
export const playerResetStats = (payload) => {
    return { type: PLAYER_RESET_STATS, payload }
};

export const playerHpSubstract = (payload) => {
    return { type: PLAYER_HP_SUBSTRACT, payload }
};

export const playerApSubstract = (payload) => {
    return { type: PLAYER_AP_SUBSTRACT, payload }
};

export const playerApReset = (payload) => {
    return { type: PLAYER_AP_RESET, payload }
};

//enemy
export const enemyHpSubstract = (payload) => {
    return { type: ENEMY_HP_SUBSTRACT, payload }
}

export const enemyApSubstract = (payload) => {
    return { type: ENEMY_AP_SUBSTRACT, payload }
};
export const enemyApReset = (payload) => {
    return { type: ENEMY_AP_RESET, payload }
};