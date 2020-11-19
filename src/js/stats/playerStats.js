const playerStats = {
    name: "Axemaher",
    lvl: 12,
    hp: 160,
    maxHp: 160,
    ap: 14,
    maxAp: 14,
    attributes: {

    },
    baseStats: {
        criticalMod: 2.5,
        criticalChance: 30,
        chanceToMiss: 30,
    },
    stats: {
        criticalMod: 2.5,
        criticalChance: 30,
        chanceToMiss: 30,
    },
    defense: {

    },
    effects: [],
    utilityEffects: [
        // {
        //     id: "CRITICAL_MOD_ADD",
        //     bonusValue: 1.7,
        //     turns: 2,
        // }
    ],
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
                { id: "BLEEDING", label: "bleeding", turns: 2, chance: 50, value: 13, use: "enemy" },
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
                { id: "POISON", label: "poison", turns: 1, chance: 100, value: 7, use: "enemy" },
                { id: "LOOSE_NEXT_TURN", label: "lose next turn", turns: 1, chance: 40, use: "enemy" },
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
                { id: "HEALING", label: "healing", turns: 2, chance: 100, value: 20, use: "self" }
            ],
        },
        {
            id: "EMPTY",
            name: "Empty slot",
        },
        {
            id: "EMPTY",
            name: "Empty slot",
        }
    ],
    utilities: [
        {
            id: 'HEAL_POTION',
            name: 'Healing potion',
            description: "Lorem ipsumlore magna aliqua. Ut enim ad minim veniam",
            value: 40,
            apCost: 2,
            usesPerBattle: 3,
            turns: 1,
            effects: [
                { id: "HEALING", label: "healing", turns: 1, chance: 100, value: 20, use: "self" }
            ],
        },
        {
            id: 'CRITICAL_MOD_ADD',
            name: 'Critical increased potion',
            description: "Lorem ipsumlore magna aliqua. Ut enim ad minim veniam",
            value: 1.1,
            apCost: 2,
            usesPerBattle: 2,
            turns: 2,
        },
    ]
}

export default playerStats

