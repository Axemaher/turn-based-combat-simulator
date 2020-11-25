import {
    SET_TURN,

    BATTLE_END,
    BATTLE_START,
    SET_WINNER,
    SHOW_INFO,
    HIDE_INFO,
    SET_BATTLE_INFO_DATA,
    SET_UI_ENABLED,
    ADD_LOG,

    PLAYER_RESET_STATS,
    PLAYER_HP_SUBSTRACT,
    PLAYER_HP_ADD,
    PLAYER_AP_SUBSTRACT,
    PLAYER_AP_RESET,
    PLAYER_EFFECT_ADD,
    PLAYER_EFFECT_TURN_SUBSTRACT,
    PLAYER_EFFECT_SUBSTRACT,
    PLAYER_ABILITY_USES_PER_BATTLE_SUBSTRACT,
    PLAYER_UTILITY_USES_PER_BATTLE_SUBSTRACT,
    PLAYER_UTILITY_EFFECT_ADD,
    PLAYER_UTILITY_EFFECT_TURN_SUBSTRACT,
    PLAYER_UTILITY_EFFECT_SUBSTRACT,
    PLAYER_CHANGE_STATS,

    ENEMY_HP_SUBSTRACT,
    ENEMY_HP_ADD,
    ENEMY_AP_SUBSTRACT,
    ENEMY_AP_RESET,
    ENEMY_EFFECT_ADD,
    ENEMY_EFFECT_TURN_SUBSTRACT,
    ENEMY_EFFECT_SUBSTRACT,
    ENEMY_ABILITY_USES_PER_BATTLE_SUBSTRACT,
}
    from "../constants/action-types";

////////// TURN //////////
export const setTurn = (payload) => {
    return { type: SET_TURN, payload }
};

////////// BATTLE STATUS //////////
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
export const setUiEnabled = (payload) => {
    return { type: SET_UI_ENABLED, payload }
};
export const addLog = (payload) => {
    return { type: ADD_LOG, payload }
};

////////// PLAYER //////////
export const playerResetStats = (payload) => {
    return { type: PLAYER_RESET_STATS, payload }
};
export const playerHpSubstract = (payload) => {
    return { type: PLAYER_HP_SUBSTRACT, payload }
};
export const playerHpAdd = (payload) => {
    return { type: PLAYER_HP_ADD, payload }
};
export const playerApSubstract = (payload) => {
    return { type: PLAYER_AP_SUBSTRACT, payload }
};
export const playerApReset = (payload) => {
    return { type: PLAYER_AP_RESET, payload }
};
export const playerEffectAdd = (payload) => {
    return { type: PLAYER_EFFECT_ADD, payload }
};
export const playerEffectTurnSubstract = (payload) => {
    return { type: PLAYER_EFFECT_TURN_SUBSTRACT, payload }
};
export const playerEffectSubstract = (payload) => {
    return { type: PLAYER_EFFECT_SUBSTRACT, payload }
};
export const playerAbilityUsesPerBattleSubstract = (payload) => {
    return { type: PLAYER_ABILITY_USES_PER_BATTLE_SUBSTRACT, payload }
};
export const playerUtilityUsesPerBattleSubstract = (payload) => {
    return { type: PLAYER_UTILITY_USES_PER_BATTLE_SUBSTRACT, payload }
};
export const playerUtilityEffectAdd = (payload) => {
    return { type: PLAYER_UTILITY_EFFECT_ADD, payload }
};
export const playerUtilityEffectTurnSubstract = (payload) => {
    return { type: PLAYER_UTILITY_EFFECT_TURN_SUBSTRACT, payload }
};
export const playerUtilityEffectSubstract = (payload) => {
    return { type: PLAYER_UTILITY_EFFECT_SUBSTRACT, payload }
};
export const playerChangeStats = (payload) => {
    return { type: PLAYER_CHANGE_STATS, payload }
};

////////// ENEMY //////////
export const enemyHpSubstract = (payload) => {
    return { type: ENEMY_HP_SUBSTRACT, payload }
}
export const enemyHpAdd = (payload) => {
    return { type: ENEMY_HP_ADD, payload }
};
export const enemyApSubstract = (payload) => {
    return { type: ENEMY_AP_SUBSTRACT, payload }
};
export const enemyApReset = (payload) => {
    return { type: ENEMY_AP_RESET, payload }
};
export const enemyEffectAdd = (payload) => {
    return { type: ENEMY_EFFECT_ADD, payload }
};
export const enemyEffectTurnSubstract = (payload) => {
    return { type: ENEMY_EFFECT_TURN_SUBSTRACT, payload }
};
export const enemyEffectSubstract = (payload) => {
    return { type: ENEMY_EFFECT_SUBSTRACT, payload }
};
export const enemyAbilityUsesPerBattleSubstract = (payload) => {
    return { type: ENEMY_ABILITY_USES_PER_BATTLE_SUBSTRACT, payload }
};