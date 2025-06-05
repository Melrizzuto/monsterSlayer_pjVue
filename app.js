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
            winner: null
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
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
        },
        superDamage() {
            this.currentRound++;
            const damage = getRandomValue(10, 30);
            this.monsterHealth -= damage;
            this.attackPlayer();
        },
        toHealPlayer() {
            this.currentRound++;
            const heal = getRandomValue(8, 20);
            this.playerHealth = Math.min(this.playerHealth + heal, 100);
            this.attackPlayer();
        },
        surrender() {
            this.winner = 'monster';
        }
    }
})

app.mount('#game')