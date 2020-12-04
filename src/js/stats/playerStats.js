const playerStats = {
    name: "Axemaher",
    lvl: 12,
    hp: 160,
    maxHp: 160,
    ap: 14,
    maxAp: 14,
    attributes: {
        str: 10,
        dex: 5,
        int: 4,
        wis: 2,
        ten: 7,
        luc: 4,
    },
    stats: {
        criticalMod: 2.5,
        criticalChance: 30,
        chanceToMiss: 30,
    },
    defense: {
        physical: 20,
        magic: 10,
        poison: 0,
        bleeding: 0,
    },
    effects: [],
    utilityEffects: [],
    abilities: [
        {
            id: 'ATTACK_DOUBLE_STRIKE',
            type: 'ATTACK',
            damageType: 'PHYSICAL',
            name: 'Double strike',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            damageMin: 10,
            damageMax: 20,
            apCost: 4,
            usesPerBattle: Infinity,
        },
        {
            id: 'ATTACK_CYCLONE',
            type: 'ATTACK',
            damageType: 'PHYSICAL',
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
            id: 'SPEC_ATTACK_POISON_FOG',
            type: 'SPEC_ATTACK',
            damageType: 'MAGIC',
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
            id: 'SPEC_ATTACK_DIVINE_LIGHT',
            type: 'SPEC_ATTACK',
            damageType: 'MAGIC',
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
        {
            id: 'UTILITY_POTION_HEAL',
            type: 'UTILITY',
            name: 'Potion of Healing',
            label: "healing",
            description: "You regain health points when you drink this potion.",
            useValue: 40,
            apCost: 2,
            usesPerBattle: 3,
            turnsDuration: 1,
            effects: [
                { id: "HEALING", label: "healing", turnsDuration: 2, chance: 100, useValue: 20, use: "SELF" }
            ],
        },
        {
            id: 'UTILITY_POTION_CRITICAL_INCREASE',
            type: 'UTILITY',
            name: 'Potion of critical increase',
            label: "critical increase",
            description: "You increase critical modificator when you drink this potion.",
            useValue: 0.8,
            apCost: 2,
            usesPerBattle: 1,
            turnsDuration: 2,
        }
    ],
    baseStatsCopy: {
        stats: {
            criticalMod: 2.5,
            criticalChance: 30,
            chanceToMiss: 30,
        },
        defense: {
            physical: 20,
            magic: 10,
            poison: 0,
            bleeding: 0,
        },
    }
}

export default playerStats
