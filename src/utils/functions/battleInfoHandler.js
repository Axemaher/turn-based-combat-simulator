import {
    missedLog,
    criticalLog,
    normalLog,
    playerMissed,
    enemyMissed,
    criticalPlayerAttackEnemy,
    criticalEnemyAttackPlayer,
    playerAttackEnemy,
    enemyAttackPlayer,
    playerAttackEnemyalmostDead,
    playerFirstAttackEnemy,
} from '../data/messages';

import {
    LOOSE_NEXT_TURN,
    POISON,
    BLEEDING
} from '../constans';

export const checkEffects = effects => {
    if (effects !== undefined && effects.length > 0) {
        let effectMessage = ". \n Additionaly, he";
        effects.forEach((effect, i) => {
            switch (effect.name) {
                case LOOSE_NEXT_TURN:
                    effectMessage = effectMessage + `${i > 0 ? "," : ""} loses next turn`; break
                case POISON:
                    effectMessage = effectMessage + `${i > 0 ? "," : ""} was poisoned for ${effect.turns} turns`; break;
                case BLEEDING:
                    effectMessage = effectMessage + `${i > 0 ? "," : ""} bleeding for ${effect.turns} turns`; break;
                default: return
            }
            if (i === effects.length - 1) {
                effectMessage = effectMessage + ".";
            }
        });
        return effectMessage
    }
    return ""
}


export const battleInfoHandler = (
    {
        playerTurn,
        playerName,
        playerHp,
        playerMaxHp,
        playerAp,
        playerMaxAp,
        enemyName,
        enemyHp,
        enemyMaxHp,
        critical,
        missed,
        damage,
        effects,
    }
) => {

    let attackText = "";
    let enemyMessage = "";

    const randomMessageMissed = (arr, personName) => arr[Math.floor(Math.random() * arr.length)].replaceAll("%u", personName);

    const randomMessage = (arr) => {
        let message = arr[Math.floor(Math.random() * arr.length)];
        if (playerTurn) {
            message = message.replaceAll("%u", enemyName);
        } else if (!playerTurn) {
            message = message.replaceAll("%u", playerName);
        }
        message = message.replaceAll("%d", damage);

        return message;
    };

    if (playerTurn) {
        if (missed) {
            attackText = randomMessageMissed(missedLog, playerName);
            enemyMessage = randomMessage(playerMissed);
        } else if (critical) {
            attackText =
                randomMessage(criticalLog) + randomMessage(criticalPlayerAttackEnemy);
            if (enemyHp / enemyMaxHp / 100 < 30) {
                enemyMessage = randomMessage(playerAttackEnemyalmostDead);
            } else {
                enemyMessage = randomMessage(playerAttackEnemy);
            }
        } else if (!missed && !critical && playerHp === playerMaxHp && playerAp === playerMaxAp) {
            attackText = randomMessage(normalLog);
            enemyMessage = randomMessage(playerFirstAttackEnemy);
        } else if (enemyHp / enemyMaxHp * 100 < 30) {
            attackText = randomMessage(normalLog);
            enemyMessage = randomMessage(playerAttackEnemyalmostDead);
        } else {
            attackText = randomMessage(normalLog);
            enemyMessage = randomMessage(playerAttackEnemy);
        }
    }

    if (!playerTurn) {
        if (missed) {
            attackText = randomMessageMissed(missedLog, enemyName);
            enemyMessage = randomMessage(enemyMissed);
        } else if (critical) {
            attackText = randomMessage(criticalLog) + randomMessage(criticalEnemyAttackPlayer);
            enemyMessage = randomMessage(enemyAttackPlayer);
        } else {
            attackText = randomMessage(normalLog);
            enemyMessage = randomMessage(enemyAttackPlayer);
        }
    }

    attackText = attackText + checkEffects(effects);

    return {
        attackText,
        enemyMessage
    };

}
