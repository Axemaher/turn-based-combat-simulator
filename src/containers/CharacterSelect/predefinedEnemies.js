const predefinedCharacters = [
    {
        name: "Gremantis",
        gender: "male",
        className: "warrior",
        avatar: "MALE1",
        lvl: 4,
        hp: 257,
        maxHp: 257,
        ap: 10,
        maxAp: 10,
        attributes: {
            str: 11,
            dex: 11,
            int: 2,
            wis: 6,
            ten: 7,
            luc: 3,
        },
        stats: {
            criticalMod: 1.6,
            criticalChance: 16,
            chanceToMiss: 29,
        },
        defense: {
            physical: 6,
            magic: 12,
            poison: 14,
            bleeding: 6,
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
                damageMin: 21,
                damageMax: 42,
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

        ],
    },
    ////////////////////////////////////////////////////////////////////////////
    {
        name: "Deathly Mea",
        gender: "female",
        className: "sorcerer",
        avatar: "FEMALE1",
        lvl: 3,
        hp: 230,
        maxHp: 230,
        ap: 11,
        maxAp: 11,
        attributes: {
            str: 3,
            dex: 13,
            int: 11,
            wis: 6,
            ten: 5,
            luc: 2,
        },
        stats: {
            criticalMod: 1.5,
            criticalChance: 14,
            chanceToMiss: 28,
        },
        defense: {
            physical: 3.2,
            magic: 12,
            poison: 10,
            bleeding: 4,
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
                damageType: 'MAGIC',
                name: 'Cyclone',
                description: "Lorem ipsum dolor sid tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
                damageMin: 40,
                damageMax: 70,
                apCost: 5,
                usesPerBattle: Infinity,
                effects: [
                    { id: "BLEEDING", label: "bleeding", turnsDuration: 2, chance: 50, useValue: 23, use: "ENEMY" },
                ],
            },
            {
                id: 'SPEC_ATTACK_POISON_FOG',
                type: 'SPEC_ATTACK',
                damageType: 'MAGIC',
                name: 'Poison fog',
                description: "Lorem ipsumlore magna aliqua. Ut enim ad minim veniam",
                damageMin: 35,
                damageMax: 70,
                apCost: 7,
                usesPerBattle: 1,
                effects: [
                    { id: "POISON", label: "poison", turnsDuration: 2, chance: 100, useValue: 30, use: "ENEMY" },
                    { id: "LOOSE_NEXT_TURN", label: "lose next turn", turnsDuration: 1, chance: 50, use: "ENEMY" },
                ],
            },
            {
                id: 'SPEC_ATTACK_DIVINE_LIGHT',
                type: 'SPEC_ATTACK',
                damageType: 'MAGIC',
                name: 'Divine Light',
                description: "Lorem ipsumlore magna aliqua. Ut enim ad minim veniam",
                damageMin: 23,
                damageMax: 46,
                apCost: 5,
                usesPerBattle: 1,
                effects: [
                    { id: "HEALING", label: "healing", turnsDuration: 2, chance: 100, useValue: 20, use: "SELF" }
                ],
            },
        ],
    }
]

export default predefinedCharacters;