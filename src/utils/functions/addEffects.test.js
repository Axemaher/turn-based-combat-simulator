import { addEffects } from './addEffects';
import * as effects from '../constans/effects';

describe('add effects', () => {
    it('adding effect', () => {
        const effectsArr = [
            { id: effects.BLEEDING, label: "bleeding", turnsDuration: 2, chance: 50, useValue: 13, use: "ENEMY" },
        ];
        const playerTurn = true;
        const expectedState = [
            { id: effects.BLEEDING, turnsDuration: 2, use: "ENEMY", useValue: 13 },
        ];
        expect(addEffects(effectsArr, playerTurn)).toEqual(expectedState)
    })
})