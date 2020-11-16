import { addEffects } from './addEffects';
import * as effects from '../constans';

describe('add effects', () => {
    it('adding effect', () => {
        const effectsArr = [
            { id: effects.POISON, turns: 4, chance: 100 },
            { id: effects.LOOSE_NEXT_TURN, turns: 1, chance: 100 },
            { id: effects.BLEEDING, turns: 1, chance: 0 }];
        const playerTurn = true;
        const expectedState = [
            { id: effects.POISON, turns: 4 },
            { id: effects.LOOSE_NEXT_TURN, turns: 1 }
        ];
        expect(addEffects(effectsArr, playerTurn)).toEqual(expectedState)
    })
})