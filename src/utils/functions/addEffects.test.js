import { addEffects } from './addEffects';
import * as effects from '../constans/effects';

describe('add effects', () => {
    it('adding effect', () => {
        const effectsArr = [
            { id: effects.POISON, label: "poison", turnsDuration: 2, chance: 100, useValue: 7, use: "ENEMY" },
        ];
        const playerTurn = true;
        const expectedState = [
            { id: effects.POISON, turnsDuration: 2, useValue: 7, use: "ENEMY" },
        ];
        expect(addEffects(effectsArr, playerTurn)).toEqual(expectedState)
    })
})