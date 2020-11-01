import { checkEffects } from './battleInfoHandler';
import * as effects from '../constans';

describe('effect message check', () => {
    it('effects exists?', () => {
        const effectData = [];
        const expectedState = ""
        expect(checkEffects(effectData)).toEqual(expectedState)
    })

    it('one effect', () => {
        const effectData = [{ name: effects.POISON, turns: 4 }];
        const expectedState = ". Additionaly, he was poisoned for 4 turns."
        expect(checkEffects(effectData)).toEqual(expectedState)
    })

    it('2 effects', () => {
        const effectData = [{ name: effects.POISON, turns: 4 }, { name: effects.BLEEDING, turns: 3 }];
        const expectedState = ". Additionaly, he was poisoned for 4 turns, bleeding for 3 turns."
        expect(checkEffects(effectData)).toEqual(expectedState)
    })

    it('3 effects', () => {
        const effectData = [{ name: effects.POISON, turns: 4 }, { name: effects.BLEEDING, turns: 3 }, { name: effects.LOOSE_NEXT_TURN, turns: 1 }];
        const expectedState = ". Additionaly, he was poisoned for 4 turns, bleeding for 3 turns, loses next turns."
        expect(checkEffects(effectData)).toEqual(expectedState)
    })
})