import { addEffects } from './addEffects';
import * as effects from '../constans';

describe('add effects', () => {
    it('adding effect', () => {
        const effectsArr = [
            { name: effects.POISON, turns: 4, chance: 100 },
            { name: effects.LOOSE_NEXT_TURN, turns: 1, chance: 100 },
            { name: effects.BLEEDING, turns: 1, chance: 0 }];
        const playerTurn = true;
        const expectedState = [
            { name: effects.POISON, turns: 4 },
            { name: effects.LOOSE_NEXT_TURN, turns: 1 }
        ];
        expect(addEffects(effectsArr, playerTurn)).toEqual(expectedState)
    })
})