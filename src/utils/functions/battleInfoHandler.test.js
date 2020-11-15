import { checkEffects } from './battleInfoHandler';

describe('effect message check', () => {
    it('effects exists?', () => {
        const effectData = [];
        const expectedState = ""
        expect(checkEffects(effectData)).toEqual(expectedState)
    })

    it('one effect', () => {
        const effectData = [{ name: "POISON", turns: 4 }];
        const expectedState = ". \n Additionaly, he was poisoned for 4 turns."
        expect(checkEffects(effectData)).toEqual(expectedState)
    })

    it('2 effects', () => {
        const effectData = [{ name: "POISON", turns: 4 }, { name: "BLEEDING", turns: 3 }];
        const expectedState = ". \n Additionaly, he was poisoned for 4 turns, bleeding for 3 turns."
        expect(checkEffects(effectData)).toEqual(expectedState)
    })

    it('3 effects', () => {
        const effectData = [{ name: "POISON", turns: 4 }, { name: "BLEEDING", turns: 3 }, { name: "LOOSE_NEXT_TURN", turns: 1 }];
        const expectedState = ". \n Additionaly, he was poisoned for 4 turns, bleeding for 3 turns, loses next turn."
        expect(checkEffects(effectData)).toEqual(expectedState)
    })
})