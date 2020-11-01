import reducer from './';
import * as types from '../../constants/action-types';
import *  as effects from '../../../utils/constans'

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
            payload: { name: effects.LOOSE_NEXT_TURN, turns: 1 }
        };
        const expectedState1 = { effects: [{ name: effects.LOOSE_NEXT_TURN, turns: 1 }] }
        const expectedState2 = { effects: [{ name: effects.LOOSE_NEXT_TURN, turns: 1 }] }

        const state1 = reducer(initialState, action);
        expect(state1).toEqual(expectedState1);
        const state2 = reducer(state1, action);
        expect(state2).toEqual(expectedState2);
    })

    it('player effect turn substract', () => {
        const initial = {
            effects: [
                { name: effects.LOOSE_NEXT_TURN, turns: 1 },
                { name: effects.POISON, turns: 4 }
            ]
        }
        const action = {
            type: types.PLAYER_EFFECT_TURN_SUBSTRACT,
            payload: effects.POISON
        };
        const expected = {
            effects: [
                { name: effects.LOOSE_NEXT_TURN, turns: 1 },
                { name: effects.POISON, turns: 3 }
            ]
        }

        expect(reducer(initial, action)).toEqual(expected)
    })

    it('player effect substract', () => {
        const initial = {
            effects: [
                { name: effects.LOOSE_NEXT_TURN, turns: 1 },
                { name: effects.POISON, turns: 4 }
            ]
        }
        const action = {
            type: types.PLAYER_EFFECT_SUBSTRACT,
            payload: effects.LOOSE_NEXT_TURN
        };
        const expected = {
            effects: [
                { name: effects.POISON, turns: 4 }
            ]
        }

        expect(reducer(initial, action)).toEqual(expected)
    })
})

