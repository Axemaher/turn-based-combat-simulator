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
    },
    attacks: [
        {
            id: 84956,
            name: 'slash',
            damageMin: 10,
            damageMax: 20,
            apCost: 4,
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

