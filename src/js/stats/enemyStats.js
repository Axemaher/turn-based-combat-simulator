import { POISON, BLEEDING } from '../../utils/constans';


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
            id: 'DOUBLE_STRIKE',
            damageMin: 10,
            damageMax: 20,
            apCost: 4,
            usesPerBattle: Infinity,
        },
        {
            id: 'CYCLONE',
            damageMin: 20,
            damageMax: 30,
            apCost: 5,
            usesPerBattle: Infinity,
            effects: [
                { name: BLEEDING, turns: 3, chance: 50 },
                { name: POISON, turns: 3, chance: 50 }
            ],
        },
        {
            id: 'SPEC_POISON_FOG',
            damageMin: 20,
            damageMax: 30,
            apCost: 5,
            usesPerBattle: 1,
            effects: [
                { name: POISON, turns: 3, chance: 50 },
            ],
        },
    ]
}

export default enemyStats