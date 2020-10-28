import { randomFromInterval } from './randomFromInterval';


export const damageCalculation = (
    { damageMax,
        damageMin,
        criticalChance,
        criticalMod,
        chanceToHit }
) => {

    const percentCheck = percent => {
        return (Math.random() * 100) < percent
    }

    let calculatedDamage = 0;
    let criticalCheck = percentCheck(criticalChance);
    let missCheck = percentCheck(chanceToHit);


    if (!missCheck) {
        const basicDamage = randomFromInterval(damageMin, damageMax);

        if (criticalCheck) {
            calculatedDamage = basicDamage * criticalMod;
        } else {
            calculatedDamage = basicDamage;
        }
    } else
        if (missCheck) {
            calculatedDamage = 0;
        }

    return {
        miss: missCheck,
        critical: criticalCheck,
        damage: Math.floor(calculatedDamage)
    };
};

export default damageCalculation;