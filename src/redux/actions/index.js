import {
    SET_TURN,
    PLAYER_RESET_STATS,
    PLAYER_HP_SUBSTRACT,
    PLAYER_AP_SUBSTRACT,
    PLAYER_AP_RESET,
    ENEMY_HP_SUBSTRACT,
    ENEMY_AP_SUBSTRACT,
    ENEMY_AP_RESET,
}
    from "../constants/action-types";

export const setTurn = (payload) => {
    return { type: SET_TURN, payload }
};

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

export const enemyHpSubstract = (payload) => {
    return { type: ENEMY_HP_SUBSTRACT, payload }
}

export const enemyApSubstract = (payload) => {
    return { type: ENEMY_AP_SUBSTRACT, payload }
};
export const enemyApReset = (payload) => {
    return { type: ENEMY_AP_RESET, payload }
};