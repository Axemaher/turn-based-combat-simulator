import { LOOSE_NEXT_TURN, POISON, BLEEDING } from '../js/constans';


const enemyStats = {
    name: "Dendralius",
    lvl: 12,
    hp: 160,
    maxHp: 160,
    ap: 14,
    maxAp: 14,
    stats: {
        criticalMod: 1.5,
        criticalChance: 30,
        chanceToMiss: 30,
        poisonDamage: 7,
    },
    effects: [],
    attacks: [
        {
            id: 84956,
            name: 'slash',
            damageMin: 10,
            damageMax: 20,
            apCost: 4,
            effects: [{ name: BLEEDING, turns: 3, chance: 100 },],
        },
        {
            id: 234324,
            name: 'force slash',
            damageMin: 20,
            damageMax: 30,
            apCost: 10,
            effects: [{ name: POISON, turns: 2, chance: 100 },],

        }
    ]
}

export default enemyStats