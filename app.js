//utilities
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}



//app
const app = Vue.createApp({
    data() {
        return {

            monsterHealth: 100,
            playerHealth: 100

        }
    },
    computed: {
        monsterBar() {
            return { width: this.monsterHealth + '%' }
        },
        playerBar() {
            return { width: this.playerHealth + '%' }
        }
    },
    methods: {
        attackMonster() {
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer()
        },
        attackPlayer() {
            const attackPlayer = getRandomValue(8, 15)
            this.playerHealth -= attackPlayer
        },
        superDamage() {
            const superDamage = getRandomValue(10, 30)
            this.monsterHealth -= superDamage
            this.attackPlayer()
        },
        toHeal() {
            const toHeal = getRandomValue(5, 10)
            this.playerHealth += toHeal
        }
    }
})

app.mount('#game')