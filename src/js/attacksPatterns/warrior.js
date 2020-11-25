const attacks = [
    {
        id: 'ATTACK_STRIKE',
        type: 'ATTACK',
        name: 'Strike',
        description: "Strong and fast attack.",
        damageMin: 10,
        damageMax: 20,
        apCost: 4,
        usesPerBattle: Infinity,
    },
    {
        id: 'ATTACK_CLEAVING',
        type: 'ATTACK',
        name: 'Cleaving',
        description: "A powerful punch that leaves a bleeding effect.",
        damageMin: 20,
        damageMax: 30,
        apCost: 5,
        usesPerBattle: Infinity,
        effects: [
            { id: "BLEEDING", label: "bleeding", turnsDuration: 2, chance: 100, useValue: 13, use: "ENEMY" },
        ],
    },
]

const specialAttacks = [
    {
        id: 'SPEC_BLADETRAIL',
        type: 'SPEC_ATTACK',
        name: 'Bladetrail',
        description: "Throw the weapon at the enemy and he will come back to you. The opponent gets a bleeding effect.",
        damageMin: 15,
        damageMax: 30,
        apCost: 7,
        usesPerBattle: 2,
        effects: [
            { id: "BLEEDING", label: "bleeding", turnsDuration: 2, chance: 100, useValue: 13, use: "ENEMY" },
        ],
    },
    // {
    //     id: 'SPEC_CURSE',
    //     type: 'SPEC_ATTACK',
    //     name: 'Curse',
    //     description: "Curses your opponent, loses another turn, and is poisoned.",
    //     damageMin: 15,
    //     damageMax: 30,
    //     apCost: 7,
    //     usesPerBattle: 1,
    //     effects: [
    //         { id: "POISON", label: "poison", turnsDuration: 4, chance: 100, useValue: 7, use: "ENEMY" },
    //     ],
    // },
]