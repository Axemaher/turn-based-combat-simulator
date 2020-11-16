const DOUBLE_STRIKE = {
    id: 'DOUBLE_STRIKE',
    damageMin: 10,
    damageMax: 20,
    apCost: 4,
    usesPerBattle: Infinity,
};

const CYCLONE = {
    id: 'CYCLONE',
    damageMin: 20,
    damageMax: 30,
    apCost: 5,
    usesPerBattle: Infinity,
    effects: [
        { id: "BLEEDING", label: "bleeding", turns: 3, chance: 50 },
        { id: "POISON", label: "poison", turns: 3, chance: 50 }
    ],
};

const SPEC_POISON_FOG = {
    id: 'SPEC_POISON_FOG',
    damageMin: 20,
    damageMax: 30,
    apCost: 5,
    usesPerBattle: 1,
    effects: [
        { id: "POISON", label: "poison", turns: 3, chance: 50 },
    ],
};

