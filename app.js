new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turn: {
             isPlayer: true,
              text: ''
            },
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function (min, max) {
            var damage = this.calculateDamage(min, max)
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                text: 'El jugador golpea al monstruo por: ' + damage
            });
            console.log(this.turns);

            if (this.checkwin()) {
                return
            }
            this.monsterAttacks()

        },
        specialAttack: function (min, max) {
            this.attack(min,max);

        },
        heal: function () {
            (this.playerHealth <= 90) ? (this.playerHealth += 10) : (this.playerHealth = 100);

            this.monsterAttacks();
        },
        giveUp: function () {
            this.gameIsRunning = false
        },

        monsterAttacks: function () {
            var damage = this.calculateDamage(5, 12)
            this.playerHealth -= damage
            this.turns.unshift({
                isPlayer: false,
                text: 'El monstruo golpea al jugador por: ' + damage
            });
            this.checkwin()

        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)

        },
        checkwin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('¡Ganaste! ¿Jugar de nuevo?')) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false
                }
                return true
            } else if (this.playerHealth <= 0) {
                if (confirm('¡Perdiste! ¿Jugar de nuevo?')) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false
                }
                return true
            }
            return false
        }

    }
})