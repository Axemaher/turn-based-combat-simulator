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
        damage
    }
) => {


    let attackText = "";
    let enemyMessage = "";

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
            attackText = randomMessage(missedLog);
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
            attackText = randomMessage(missedLog);
            enemyMessage = randomMessage(enemyMissed);
        } else if (critical) {
            attackText = randomMessage(criticalLog) + randomMessage(criticalEnemyAttackPlayer);
            enemyMessage = randomMessage(enemyAttackPlayer);
        } else {
            attackText = randomMessage(normalLog);
            enemyMessage = randomMessage(enemyAttackPlayer);
        }
    }

    return {
        attackText,
        enemyMessage
    };

}
