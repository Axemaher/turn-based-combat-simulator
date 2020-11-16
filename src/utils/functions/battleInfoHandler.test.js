import { checkEffects } from './battleInfoHandler';
import * as effects from '../constans';

describe('effect message check', () => {
    it('effects exists?', () => {
        const effectData = [];
        const expectedState = ""
        expect(checkEffects(effectData)).toEqual(expectedState)
    })

    it('one effect', () => {
        const effectData = [{ id: effects.POISON, turns: 4 }];
        const expectedState = ". \n Additionaly, he was poisoned for 4 turns."
        expect(checkEffects(effectData)).toEqual(expectedState)
    })

    it('2 effects', () => {
        const effectData = [{ id: effects.POISON, turns: 4 }, { id: effects.BLEEDING, turns: 3 }];
        const expectedState = ". \n Additionaly, he was poisoned for 4 turns, bleeding for 3 turns."
        expect(checkEffects(effectData)).toEqual(expectedState)
    })

    it('3 effects', () => {
        const effectData = [{ id: effects.POISON, turns: 4 }, { id: effects.BLEEDING, turns: 3 }, { id: effects.LOOSE_NEXT_TURN, turns: 1 }];
        const expectedState = ". \n Additionaly, he was poisoned for 4 turns, bleeding for 3 turns, loses next turn."
        expect(checkEffects(effectData)).toEqual(expectedState)
    })

    it('effect with one turn', () => {
        const effectData = [{ id: effects.POISON, turns: 1 }, { id: effects.BLEEDING, turns: 3 }, { id: effects.LOOSE_NEXT_TURN, turns: 1 }];
        const expectedState = ". \n Additionaly, he was poisoned for 1 turn, bleeding for 3 turns, loses next turn."
        expect(checkEffects(effectData)).toEqual(expectedState)
    })
})