import reducer from './'
import * as types from '../../constants/action-types'

describe('battle status reducer', () => {
    it('set battle data', () => {
        const action = {
            type: types.SET_BATTLE_INFO_DATA,
            payload: {
                playerTurn: true,
                PlayerName: "Axemaher"
            }
        };
        const expectedState = {
            ...expectedState,
            battleInfoData: {
                playerTurn: true,
                PlayerName: "Axemaher"
            }
        };
        expect(reducer({}, action)).toEqual(expectedState)
    })
})