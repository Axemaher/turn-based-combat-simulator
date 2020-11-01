import reducer from './';
import * as types from '../../constants/action-types';

describe('turn reducer', () => {
    it('hp substract', () => {
        const initial = true
        const action = {
            type: types.SET_TURN
        };
        const expectedState = false

        expect(reducer(initial, action)).toEqual(expectedState)
    })
})

