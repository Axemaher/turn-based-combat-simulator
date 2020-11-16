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

    it('add log', () => {
        const initial = {
            log: []
        }
        const action = {
            type: types.ADD_LOG,
            payload: "log"
        };
        const expected = {
            log: ["log"]
        }
        expect(reducer(initial, action)).toEqual(expected)
    })

    it('add log for duplicated winner info', () => {
        const initial = {
            log: ["log", "Dendralius win!"]
        }
        const action = {
            type: types.ADD_LOG,
            payload: "Dendralius win!"
        };
        const expected = {
            log: ["log", "Dendralius win!"]
        }
        expect(reducer(initial, action)).toEqual(expected)
    })
})