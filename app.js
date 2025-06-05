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
        }
    },
    computed: {
        monsterBar() {
            return { width: this.monsterHealth + '%' }
        },
        playerBar() {
            return { width: this.playerHealth + '%' }
        },
        useSuperAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer()
        },
        attackPlayer() {
            const attackPlayer = getRandomValue(8, 15)
            this.playerHealth -= attackPlayer
        },
        superDamage() {
            this.currentRound++
            const superDamage = getRandomValue(10, 30)
            this.monsterHealth -= superDamage
            this.attackPlayer()
        },
        toHealPlayer() {
            this.currentRound++
            const healValue = getRandomValue(8, 30)
            if (this.playerHealth + healValue > 100) {
                this.playerHealth === 100
            } else {
                this.playerHealth += healValue
            }
            this.attackPlayer()
        }
    }
})

app.mount('#game')