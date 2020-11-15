import doubleStrikeIco from '../../assets/attacks/DOUBLE_STRIKE.png';
import cycloneIco from '../../assets/attacks/CYCLONE.png';
import looseNextTurnIco from '../../assets/effectsBar/LOOSE_NEXT_TURN.png';
import specPoisonFogIco from '../../assets/attacks/SPEC_POISON_FOG.png';
import poisonIco from '../../assets/effectsBar/POISON.png';
import bleedingIco from '../../assets/effectsBar/BLEEDING.png';

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
            name: 'Double strike',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            damageMin: 10,
            damageMax: 20,
            apCost: 4,
            usesPerBattle: Infinity,
            ico: doubleStrikeIco,
        },
        {
            id: 'CYCLONE',
            name: 'Cyclone',
            description: "Lorem ipsum dolor sid tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            damageMin: 20,
            damageMax: 30,
            apCost: 5,
            usesPerBattle: Infinity,
            ico: cycloneIco,
            effects: [
                { name: "BLEEDING", label: "bleeding", turns: 3, chance: 50, url: bleedingIco },
                { name: "POISON", label: "poison", turns: 3, chance: 50, url: poisonIco }
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
            ico: specPoisonFogIco,
            effects: [
                { name: "POISON", label: "poison", turns: 3, chance: 100, url: poisonIco },
                { name: "LOOSE_NEXT_TURN", label: "lose next turn", turns: 1, chance: 30, url: looseNextTurnIco },
            ],
        },
    ]
}

export default enemyStats