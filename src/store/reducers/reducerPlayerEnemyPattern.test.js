import reducer from './playerReducer';
import * as types from '../constants/action-types';
import *  as effects from '../../utils/constans'

describe('player reducer', () => {
    it('hp substract', () => {
        const initial = { hp: 100 }
        const action = {
            type: types.PLAYER_HP_SUBSTRACT,
            payload: 2
        };
        const expectedState = { hp: 98 }

        expect(reducer(initial, action)).toEqual(expectedState)
    })

    it('hp substract < 0', () => {
        const initial = { hp: 100 }
        const action = {
            type: types.PLAYER_HP_SUBSTRACT,
            payload: 2000
        };
        const expectedState = { hp: 0 }

        expect(reducer(initial, action)).toEqual(expectedState)
    })

    it('player effect add', () => {
        const initialState = { effects: [] }
        const action = {
            type: types.PLAYER_EFFECT_ADD,
            payload: { id: effects.LOOSE_NEXT_TURN, turns: 1 }
        };
        const expectedState1 = { effects: [{ id: effects.LOOSE_NEXT_TURN, turns: 1 }] }
        const expectedState2 = { effects: [{ id: effects.LOOSE_NEXT_TURN, turns: 1 }] }

        const state1 = reducer(initialState, action);
        expect(state1).toEqual(expectedState1);
        const state2 = reducer(state1, action);
        expect(state2).toEqual(expectedState2);
    })

    it('player effect turn substract', () => {
        const initial = {
            effects: [
                { id: effects.LOOSE_NEXT_TURN, turns: 1 },
                { id: effects.POISON, turns: 4 }
            ]
        }
        const action = {
            type: types.PLAYER_EFFECT_TURN_SUBSTRACT,
            payload: effects.POISON
        };
        const expected = {
            effects: [
                { id: effects.LOOSE_NEXT_TURN, turns: 1 },
                { id: effects.POISON, turns: 3 }
            ]
        }

        expect(reducer(initial, action)).toEqual(expected)
    })

    it('player effect substract', () => {
        const initial = {
            effects: [
                { id: effects.LOOSE_NEXT_TURN, turns: 1 },
                { id: effects.POISON, turns: 4 }
            ]
        }
        const action = {
            type: types.PLAYER_EFFECT_SUBSTRACT,
            payload: effects.LOOSE_NEXT_TURN
        };
        const expected = {
            effects: [
                { id: effects.POISON, turns: 4 }
            ]
        }

        expect(reducer(initial, action)).toEqual(expected)
    })
    it('player attack uses per battle substract', () => {
        const initial = {
            attacks: [
                {
                    id: 84956,
                    usesPerBattle: Infinity,
                    effects: [
                        { id: effects.BLEEDING, turns: 4, chance: 0 },
                    ],
                },
                {
                    id: 234324,
                    usesPerBattle: Infinity,
                    effects: [{ id: effects.POISON, turns: 2, chance: 50 },],

                },
                {
                    id: 234322,
                    usesPerBattle: 1,
                    effects: [{ id: effects.POISON, turns: 2, chance: 100 },],

                }
            ]
        }
        const action = {
            type: types.PLAYER_ATTACK_USES_PER_BATTLE_SUBSTRACT,
            payload: 234322
        };
        const expected = {
            attacks: [
                {
                    id: 84956,
                    usesPerBattle: Infinity,
                    effects: [
                        { id: effects.BLEEDING, turns: 4, chance: 0 },
                    ],
                },
                {
                    id: 234324,
                    usesPerBattle: Infinity,
                    effects: [{ id: effects.POISON, turns: 2, chance: 50 },],

                },
                {
                    id: 234322,
                    usesPerBattle: 0,
                    effects: [{ id: effects.POISON, turns: 2, chance: 100 },],

                }
            ]
        }

        expect(reducer(initial, action)).toEqual(expected)
    })
    it('player attack uses per battle substract from Infinity', () => {
        const initial = {
            attacks: [
                {
                    id: 84956,
                    usesPerBattle: Infinity,
                    effects: [
                        { id: effects.BLEEDING, turns: 4, chance: 0 },
                    ],
                },
                {
                    id: 234324,
                    usesPerBattle: Infinity,
                    effects: [{ id: effects.POISON, turns: 2, chance: 50 },],

                },
                {
                    id: 234322,
                    usesPerBattle: 1,
                    effects: [{ id: effects.POISON, turns: 2, chance: 100 },],

                }
            ]
        }
        const action = {
            type: types.PLAYER_ATTACK_USES_PER_BATTLE_SUBSTRACT,
            payload: 234324
        };
        const expected = {
            attacks: [
                {
                    id: 84956,
                    usesPerBattle: Infinity,
                    effects: [
                        { id: effects.BLEEDING, turns: 4, chance: 0 },
                    ],
                },
                {
                    id: 234324,
                    usesPerBattle: Infinity,
                    effects: [{ id: effects.POISON, turns: 2, chance: 50 },],

                },
                {
                    id: 234322,
                    usesPerBattle: 1,
                    effects: [{ id: effects.POISON, turns: 2, chance: 100 },],

                }
            ]
        }

        expect(reducer(initial, action)).toEqual(expected)
    })

    it('player utility uses per battle substract with deleting', () => {
        const initial = {
            utilities: [
                {
                    id: 'HEAL_POTION',
                    usesPerBattle: 3,
                },
                {
                    id: 'CRITICAL_INCREASE_POTION',
                    usesPerBattle: 1,
                },
            ]
        }
        const action = {
            type: types.PLAYER_UTILITY_USES_PER_BATTLE_SUBSTRACT,
            payload: "CRITICAL_INCREASE_POTION"
        };
        const expected = {
            utilities: [
                {
                    id: 'HEAL_POTION',
                    usesPerBattle: 3,
                },
                {
                    id: "EMPTY",
                    name: "Empty slot",
                }
            ]
        }

        expect(reducer(initial, action)).toEqual(expected)
    })
})

