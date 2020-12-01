import { randomFromInterval } from './randomFromInterval';
import { percentSubstract } from './percentSubstract';


export const damageCalculation = (
    { damageMax,
        damageMin,
        criticalChance,
        criticalMod,
        chanceToMiss,
        damageType,
        defense }
) => {

    const percentCheck = percent => {
        return (Math.random() * 100) < percent
    }

    let calculatedDamage = 0;
    let criticalCheck = percentCheck(criticalChance);
    let missCheck = percentCheck(chanceToMiss);


    if (!missCheck) {
        const basicDamage = randomFromInterval(damageMin, damageMax);

        if (criticalCheck) {
            calculatedDamage = basicDamage * criticalMod;
        } else {
            calculatedDamage = basicDamage;
        }
        switch (damageType) {
            case 'PHYSICAL':
                calculatedDamage = percentSubstract(calculatedDamage, defense.physical)
                break;

            case 'MAGIC':
                calculatedDamage = percentSubstract(calculatedDamage, defense.magic)
                break;

            default:
                break;
        }
    } else {
        if (missCheck) {
            calculatedDamage = 0;
        }
    }


    return {
        miss: missCheck,
        critical: criticalCheck,
        damage: Math.floor(calculatedDamage)
    };
};

export default damageCalculation;