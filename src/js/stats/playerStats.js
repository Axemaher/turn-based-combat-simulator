const playerStats = {
    name: "Axemaher",
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
        chanceToMiss: 30,
        poisonDamage: 4,
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
                { id: "BLEEDING", label: "bleeding", turns: 2, chance: 50 },
                { id: "POISON", label: "poison", turns: 2, chance: 50 }
            ],
        },
        {
            id: 'SPEC_POISON_FOG',
            name: 'Poison fog',
            description: "Lorem ipsumlore magna aliqua. Ut enim ad minim veniam",
            damageMin: 20,
            damageMax: 30,
            apCost: 5,
            usesPerBattle: 1,
            effects: [
                { id: "POISON", label: "poison", turns: 1, chance: 100 },
                { id: "LOOSE_NEXT_TURN", label: "lose next turn", turns: 1, chance: 30 },
            ],
        },
        {
            id: "EMPTY",
            name: "Empty slot",
            ico: 'emptyIco'
        },
        {
            id: "EMPTY",
            name: "Empty slot",
            ico: 'emptyIco'
        },
        {
            id: "EMPTY",
            name: "Empty slot",
            ico: 'emptyIco'
        }
    ]
}

export default playerStats

