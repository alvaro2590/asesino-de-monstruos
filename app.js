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
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function(min, max, char) {
            var damage = this.calculateDamage(min, max)
            this.monsterHealth -= damage
            if (char == 'S') {
                this.turns.unshift({
                    isPlayer: true,
                    text: 'El jugador golpea fuerte al monstruo por: ' + damage
                });
            } else {
                this.turns.unshift({
                    isPlayer: true,
                    text: 'El jugador golpea al monstruo por: ' + damage
                });
            }
            if (this.checkwin()) {
                return
            }
            if (this.monsterHealth != 100) {
                this.monsterAttacks()
            }
        },
        specialAttack: function(min, max) {
            this.attack(min, max, 'S');
        },
        heal: function() {
            (this.playerHealth <= 90) ? (this.playerHealth += 10) : (this.playerHealth = 100);
            this.monsterAttacks();
        },
        giveUp: function() {
            this.startGame()
            this.gameIsRunning = false
        },
        monsterAttacks: function() {
            var damage = this.calculateDamage(5, 12)
            this.playerHealth -= damage
            this.turns.unshift({
                isPlayer: false,
                text: 'El monstruo golpea al jugador por: ' + damage
            });
            this.checkwin()
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },
        checkwin: function() {
            if (this.monsterHealth <= 0) {
                this.check('¡Ganaste!')
            } else if (this.playerHealth <= 0) {
                this.check('¡Perdiste!')
            }
            return false
        },
        check: function(text) {
            if (confirm(text + ' ¿Jugar de nuevo?')) {
                this.startGame()
            } else {
                this.giveUp()
            }
            return true
        }
    }
})