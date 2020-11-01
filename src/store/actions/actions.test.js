import * as actions from './';
import * as types from '../constants/action-types';

describe('actions', () => {
    it('creating set turn action', () => {
        const expectedAction = {
            type: types.SET_TURN
        }
        expect(actions.setTurn()).toEqual(expectedAction)
    })
})