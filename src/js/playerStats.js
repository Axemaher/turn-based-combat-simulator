import { BLEEDING, POISON, LOOSE_NEXT_TURN } from '../js/constans';

const playerStats = {
    name: "Axemaher",
    lvl: 12,
    hp: 300,
    maxHp: 300,
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
            effects: [{ name: POISON, turns: 3, chance: 100 }]
        },
        {
            id: 234324,
            name: 'force slash',
            damageMin: 30,
            damageMax: 50,
            apCost: 7,
        }
    ]
}

export default playerStats

