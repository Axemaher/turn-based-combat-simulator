import { BLEEDING, POISON, LOOSE_NEXT_TURN } from '../../utils/constans';

const playerStats = {
    name: "Axemaher",
    lvl: 12,
    hp: 160,
    maxHp: 160,
    ap: 14,
    maxAp: 14,
    stats: {
        criticalMod: 1.5,
        criticalChance: 30,
        chanceToMiss: 30,
        poisonDamage: 4,
    },
    effects: [],
    attacks: [
        {
            id: 84956,
            name: 'slash',
            damageMin: 10,
            damageMax: 20,
            apCost: 4,
            usesPerBattle: Infinity,
            effects: [
                { name: BLEEDING, turns: 4, chance: 50 },
            ],
        },
        {
            id: 234324,
            name: 'force slash',
            damageMin: 20,
            damageMax: 30,
            apCost: 10,
            usesPerBattle: Infinity,
            effects: [{ name: POISON, turns: 2, chance: 50 },],

        },
        {
            id: 234322,
            name: 'blow',
            damageMin: 20,
            damageMax: 30,
            apCost: 10,
            usesPerBattle: 1,
            effects: [{ name: POISON, turns: 2, chance: 10 },],

        }
    ]
}

export default playerStats

