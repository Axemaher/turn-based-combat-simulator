import { BLEEDING, POISON } from '../../utils/constans';
import slashIco from '../../assets/attacks/DOUBLE_STRIKE.png'
import cycloneIco from '../../assets/attacks/CYCLONE.png'
import specPoisonFogIco from '../../assets/attacks/SPEC_POISON_FOG.png'
import poisonIco from '../../assets/effectsBar/POISON.png';
import bleedingIco from '../../assets/effectsBar/BLEEDING.png';
import emptyIco from '../../assets/attacks/EMPTY.png';

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
        chanceToMiss: 70,
        poisonDamage: 4,
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
            ico: slashIco,
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
                { name: BLEEDING, turns: 3, chance: 100, url: bleedingIco },
                { name: POISON, turns: 3, chance: 100, url: poisonIco }
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
                { name: POISON, turns: 3, chance: 100, url: poisonIco },
            ],
        },
        {
            id: "EMPTY",
            name: "Empty slot",
            ico: emptyIco
        },
        {
            id: "EMPTY",
            name: "Empty slot",
            ico: emptyIco
        },
        {
            id: "EMPTY",
            name: "Empty slot",
            ico: emptyIco
        }
    ]
}

export default playerStats

