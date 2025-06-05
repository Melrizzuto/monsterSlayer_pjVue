//utilities
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}



//app
const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        };
    },
    computed: {
        isDisabled() {
            return this.winner !== null;
        },
        useSuperAttack() {
            return this.currentRound % 3 !== 0;
        },
        monsterBar() {
            return { width: Math.max(this.monsterHealth, 0) + '%' };
        },
        playerBar() {
            return { width: Math.max(this.playerHealth, 0) + '%' };
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'player';
            }
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.logMessage('player', 'attack', attackValue)
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            this.logMessage('monster', 'attack', attackValue)
        },
        superDamage() {
            this.currentRound++;
            const damage = getRandomValue(10, 30);
            this.monsterHealth -= damage;
            this.attackPlayer();
            this.logMessage('player', 'super-attack', damage)
        },
        toHealPlayer() {
            this.currentRound++;
            const heal = getRandomValue(8, 20);
            this.playerHealth = Math.min(this.playerHealth + heal, 100);
            this.attackPlayer();
            this.logMessage('player', 'heal', heal)
        },
        surrender() {
            this.winner = 'monster';
        },
        reset() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.currentRound = 0;
            this.winner = null
            this.logMessages = []
        },
        logMessage(who, what, value) {
            return this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    }
})

app.mount('#game')