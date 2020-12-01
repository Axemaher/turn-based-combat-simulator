import reducer from './playerReducer';
import * as types from '../constants/action-types';
import * as effects from '../../utils/constans/effects'

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
            payload: { id: effects.LOOSE_NEXT_TURN, turnsDuration: 1, use: "ENEMY" }
        };
        const expectedState1 = { effects: [{ id: effects.LOOSE_NEXT_TURN, turnsDuration: 1, use: "ENEMY" }] }
        const expectedState2 = { effects: [{ id: effects.LOOSE_NEXT_TURN, turnsDuration: 1, use: "ENEMY" }] }

        const state1 = reducer(initialState, action);
        expect(state1).toEqual(expectedState1);
        const state2 = reducer(state1, action);
        expect(state2).toEqual(expectedState2);
    })

    it('player effect turn substract', () => {
        const initial = {
            effects: [
                { id: effects.LOOSE_NEXT_TURN, turnsDuration: 1 },
                { id: effects.POISON, turnsDuration: 4 }
            ]
        }
        const action = {
            type: types.PLAYER_EFFECT_TURN_SUBSTRACT,
            payload: effects.POISON
        };
        const expected = {
            effects: [
                { id: effects.LOOSE_NEXT_TURN, turnsDuration: 1 },
                { id: effects.POISON, turnsDuration: 3 }
            ]
        }

        expect(reducer(initial, action)).toEqual(expected)
    })

    it('player effect substract', () => {
        const initial = {
            effects: [
                { id: effects.LOOSE_NEXT_TURN, turnsDuration: 1 },
                { id: effects.POISON, turnsDuration: 4 }
            ]
        }
        const action = {
            type: types.PLAYER_EFFECT_SUBSTRACT,
            payload: effects.LOOSE_NEXT_TURN
        };
        const expected = {
            effects: [
                { id: effects.POISON, turnsDuration: 4 }
            ]
        }

        expect(reducer(initial, action)).toEqual(expected)
    })


    it('player attack uses per battle substract', () => {
        const initial = {
            abilities: [
                {
                    id: 'DOUBLE_STRIKE',
                    usesPerBattle: Infinity,
                },
                {
                    id: 'SPEC_POISON_FOG',
                    usesPerBattle: 2,
                    effects: [
                        { id: "POISON", label: "poison", turnsDuration: 2, chance: 100, useValue: 7, use: "ENEMY" },
                    ],
                },
            ]
        }
        const action = {
            type: types.PLAYER_ABILITY_USES_PER_BATTLE_SUBSTRACT,
            payload: "SPEC_POISON_FOG"
        };
        const expected = {
            abilities: [
                {
                    id: 'DOUBLE_STRIKE',
                    usesPerBattle: Infinity,
                },
                {
                    id: 'SPEC_POISON_FOG',
                    usesPerBattle: 1,
                    effects: [
                        { id: "POISON", label: "poison", turnsDuration: 2, chance: 100, useValue: 7, use: "ENEMY" },
                    ],
                },
            ]
        }

        expect(reducer(initial, action)).toEqual(expected)
    })

    it('player attack uses per battle substract from Infinity', () => {
        const initial = {
            abilities: [
                {
                    id: 'DOUBLE_STRIKE',
                    usesPerBattle: Infinity,
                },
                {
                    id: 'SPEC_POISON_FOG',
                    usesPerBattle: 1,
                    effects: [
                        { id: "POISON", label: "poison", turnsDuration: 2, chance: 100, useValue: 7, use: "ENEMY" },
                    ],
                },
            ]
        }
        const action = {
            type: types.PLAYER_ABILITY_USES_PER_BATTLE_SUBSTRACT,
            payload: "DOUBLE_STRIKE"
        };
        const expected = {
            abilities: [
                {
                    id: 'DOUBLE_STRIKE',
                    usesPerBattle: Infinity,
                },
                {
                    id: 'SPEC_POISON_FOG',
                    usesPerBattle: 1,
                    effects: [
                        { id: "POISON", label: "poison", turnsDuration: 2, chance: 100, useValue: 7, use: "ENEMY" },
                    ],
                },
            ]
        }

        expect(reducer(initial, action)).toEqual(expected)
    })

    it('player utility uses per battle substract with deleting', () => {
        const initial = {
            abilities: [
                {
                    id: 'UTILITY_POTION_HEAL',
                    usesPerBattle: 3,
                },
                {
                    id: 'CRITICAL_INCREASE_POTION',
                    usesPerBattle: 0,
                },
            ]
        }
        const action = {
            type: types.PLAYER_UTILITY_USES_PER_BATTLE_SUBSTRACT,
            payload: "CRITICAL_INCREASE_POTION"
        };
        const expected = {
            abilities: [
                {
                    id: 'UTILITY_POTION_HEAL',
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

