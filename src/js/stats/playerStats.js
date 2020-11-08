import { BLEEDING, POISON, LOOSE_NEXT_TURN } from '../../utils/constans';
import * as attacks from './attacks/attacks';

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
        chanceToMiss: 30,
        poisonDamage: 4,
    },
    effects: [],
    attacks: [
        attacks.DOUBLE_STRIKE,
        attacks.CYCLONE,
        attacks.SPEC_POISON_FOG,
    ]
}

export default playerStats

