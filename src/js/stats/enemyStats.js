const enemyStats = {
    name: "Darkwraith",
    lvl: 12,
    hp: 160,
    maxHp: 160,
    ap: 14,
    maxAp: 14,
    attributes: {

    },
    stats: {
        criticalMod: 1.5,
        criticalChance: 30,
        chanceToMiss: 10,
    },
    defense: {

    },
    effects: [],
    attacks: [
        {
            id: 'DOUBLE_STRIKE',
            name: 'Double strike',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            damageMin: 10,
            damageMax: 20,
            apCost: 4,
            usesPerBattle: Infinity,
        },
        {
            id: 'CYCLONE',
            name: 'Cyclone',
            description: "Lorem ipsum dolor sid tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            damageMin: 20,
            damageMax: 30,
            apCost: 5,
            usesPerBattle: Infinity,
            effects: [
                { id: "BLEEDING", label: "bleeding", turnsDuration: 2, chance: 50, useValue: 13, use: "ENEMY" },
            ],
        },
        {
            id: 'SPEC_POISON_FOG',
            name: 'Poison fog',
            description: "Lorem ipsumlore magna aliqua. Ut enim ad minim veniam",
            damageMin: 15,
            damageMax: 30,
            apCost: 7,
            usesPerBattle: 1,
            effects: [
                { id: "POISON", label: "poison", turnsDuration: 2, chance: 100, useValue: 7, use: "ENEMY" },
                { id: "LOOSE_NEXT_TURN", label: "lose next turn", turnsDuration: 1, chance: 40, use: "ENEMY" },
            ],
        },
        {
            id: 'SPEC_DIVINE_LIGHT',
            name: 'Divine Light',
            description: "Lorem ipsumlore magna aliqua. Ut enim ad minim veniam",
            damageMin: 10,
            damageMax: 15,
            apCost: 5,
            usesPerBattle: 1,
            effects: [
                { id: "HEALING", label: "healing", turnsDuration: 2, chance: 100, useValue: 20, use: "SELF" }
            ],
        },
    ]
}

export default enemyStats