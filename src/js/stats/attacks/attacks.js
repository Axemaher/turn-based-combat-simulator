import slashIco from '../../../assets/attacks/DOUBLE_STRIKE.png'
import cycloneIco from '../../../assets/attacks/CYCLONE.png'
import specPoisonFogIco from '../../../assets/attacks/SPEC_POISON_FOG.png'
import poisonIco from '../../../assets/effectsBar/POISON.png';
import bleedingIco from '../../../assets/effectsBar/BLEEDING.png';



export const DOUBLE_STRIKE = {
    id: 'DOUBLE_STRIKE',
    name: 'Double strike',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    damageMin: 10,
    damageMax: 20,
    apCost: 4,
    usesPerBattle: Infinity,
    ico: slashIco,

}

export const CYCLONE = {
    id: 'CYCLONE',
    name: 'Cyclone',
    description: "Lorem ipsum dolor sid tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    damageMin: 20,
    damageMax: 30,
    apCost: 5,
    usesPerBattle: Infinity,
    ico: cycloneIco,
    effects: [
        { name: "BLEEDING", turns: 3, chance: 50, url: bleedingIco },
        { name: "POISON", turns: 3, chance: 50, url: poisonIco }
    ],
}

export const SPEC_POISON_FOG = {
    id: 'SPEC_POISON_FOG',
    name: 'Poison fog',
    description: "Lorem ipsumlore magna aliqua. Ut enim ad minim veniam",
    damageMin: 20,
    damageMax: 30,
    apCost: 5,
    usesPerBattle: 1,
    ico: specPoisonFogIco,
    effects: [
        { name: "POISON", turns: 3, chance: 50, url: poisonIco },
    ],
}

export default DOUBLE_STRIKE;