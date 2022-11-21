class GameUI {
    constructor() {
        this.gameboardkey = document.getElementById('gameboard__key');
        this.yourSpeedElement = document.getElementById('gameboard__your-speed');

        this.KeyList = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
        this.MaxKeyPress = 0;

        this.CurrentKey = "";

        this.CurrentKeyPressesCount = 0;
        this.RemainedKeyStrokes = 1;
        this.KeyPressesCount = 0;
    }

    HandleUserInput(container, timer, increaseAmount, decreaseAmount) {
        window.addEventListener('keyup', (e) => {

            if (!container.isFreezed) {
                var key = e.key.toUpperCase();


                if (this.CurrentKey === key) {
                    container.Increase(increaseAmount);
                    this.RemainedKeyStrokes--;
                    this.KeyPressesCount++;
                } else {
                    container.Decrease(decreaseAmount);
                }

                if (this.RemainedKeyStrokes === 0) {
                    // this.MaxKeyPress = Math.floor(Math.random() * 3);
                    this.RandomChangeInput(this.MaxKeyPress);
                    this.DisplayKey();
                }
            }
        });
    }

    RandomChangeInput(maxKeyPress) {
        this.MaxKeyPress = maxKeyPress;
        this.RemainedKeyStrokes = maxKeyPress;

        let random = Math.floor(Math.random() * this.KeyList.length);
        this.CurrentKey = this.KeyList[random];


    }

    DisplayKey() {
        this.gameboardkey.innerHTML = this.CurrentKey;
    }

    DisplayKeySpeed(interval, container, timer) {
        if (this.keySpeedInterval) {
            clearInterval(this.keySpeedInterval);
        }

        this.keySpeedInterval = setInterval(() => {
            if (!container.isFreezed) {
                this.yourSpeedElement.innerHTML = (this.KeyPressesCount / timer.HowMuchPassed * 1000).toFixed(2);
            }
        }, interval);
    }

    DisplayStart() {
        let dialog = new Dialog();
        dialog.Display(`
            <div id="start-game-intro">
                Hey welcome to the game stupid
                rules rules ruless ruuuuleeesss rules booooring ruuuiules
            </div>
            <button id="start-game-btn">Start Game</button>
        `);

        let startButtonElement = document.getElementById('start-game-btn');
        startButtonElement.addEventListener('click', () => {
            dialog.Close();
        });
    }

    DisplayLossDialog(game) {
        let dialog = new Dialog();
        dialog.Display(`
            <div id="start-game-intro">
                <h2>You Lost</h2>
            </div>
            <div id="score-board-content"></div>
            <button id="restart-game-btn">Restart Game</button>
        `);

        let restartButtonElement = document.getElementById('restart-game-btn');
        restartButtonElement.addEventListener('click', () => {
            dialog.Close();
            game.Restart();
        });

        let scoreboardContentElement = document.getElementById('score-board-content');
        scoreboardContentElement.innerHTML = document.getElementById('gameboard__scoreboard').innerHTML;
    }
}