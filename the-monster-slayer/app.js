new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() { // 攻擊
            // var max = 10;
            // var min = 3;
            // 隨機傷害 3 - 10 之間
            // var damage = Math.max(Math.floor(Math.random() * max) + 1, min); // 重複使用則重構此功能
            // this.monsterHealth -= damage;

            // if (this.monsterHealth <= 0) {
            //     alert('You won!');
            //     this.gameIsRunning = false;
            //     return;
            // }

            // monster 反擊
            // max = 12;
            // min = 5;
            // var damage = Math.max(Math.floor(Math.random() * max) + 1, min);
            // this.playerHealth -= damage;

            // if (this.playerHealth <= 0) {
            //     alert('You lost!');
            //     this.gameIsRunning = false;
            //     return;
            // }

            var damage = this.calculateDame(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage,
            });
            if (this.checkWin()) {
                return;
            }

            // this.playerHealth -= this.calculateDame(5, 12);
            // this.checkWin();
            this.monsterAttacks();

        },
        specialAttack: function() { // 特殊攻擊
            var damage = this.calculateDame(10, 20)
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster hard for ' + damage,
            });
            if (this.checkWin()) {
                return;
            }

            // 重複使用 拉出來一個方法
            // this.playerHealth -= this.calculateDame(5, 12);
            // this.checkWin();
            this.monsterAttacks();
        },
        heal: function() { // 治療
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }

            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10',
            });
            this.monsterAttacks(); // monster 攻擊
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        monsterAttacks: function() {
            var damage = this.calculateDame(5, 12);
            this.playerHealth -= damage;
            this.checkWin();

            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage,
            });
        },
        calculateDame: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min); // 重複使用則重構此功能
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('You Won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
            if (confirm('You Lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
            }
        }
    }
});