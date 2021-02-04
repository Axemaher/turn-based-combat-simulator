const attacks = [
    {
        id: 'ATTACK_NECROTIC_SLASH',
        type: 'ATTACK',
        name: 'Necrotic Slash',
        description: "Slashes the opponent",
        damageMin: 10,
        damageMax: 20,
        apCost: 4,
        usesPerBattle: Infinity,
    },
    {
        id: 'ATTACK_CROSS_SLASH',
        type: 'ATTACK',
        name: 'Cross slash',
        description: "Charge your weapon and hurl poisoned projectile slashes.",
        damageMin: 20,
        damageMax: 30,
        apCost: 5,
        usesPerBattle: Infinity,
        effects: [
            { id: "BLEEDING", label: "bleeding", turnsDuration: 2, chance: 50, useValue: 13, use: "ENEMY" },
            { id: "POISON", label: "poison", turnsDuration: 2, chance: 50, useValue: 7, use: "ENEMY" }
        ],
    },
]

const specialAttacks = [
    {
        id: 'SPEC_WAMPIRISM',
        type: 'SPEC_ATTACK',
        name: 'Wampirism',
        description: "Drain the life of your opponent and get a long-lasting healing effect.",
        damageMin: 15,
        damageMax: 30,
        apCost: 7,
        usesPerBattle: 2,
        effects: [
            { id: "HEALING", label: "healing", turnsDuration: 2, chance: 100, useValue: 20, use: "SELF" },
        ],
    },
    {
        id: 'SPEC_CURSE',
        type: 'SPEC_ATTACK',
        name: 'Curse',
        description: "Curses your opponent, loses another turn, and is poisoned.",
        damageMin: 15,
        damageMax: 30,
        apCost: 7,
        usesPerBattle: 1,
        effects: [
            { id: "POISON", label: "poison", turnsDuration: 4, chance: 100, useValue: 7, use: "ENEMY" },
        ],
    },
]