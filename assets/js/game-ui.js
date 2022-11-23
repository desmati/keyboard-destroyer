class GameUI {
    constructor() {
        this.gameboardkey = document.getElementById("gameboard__key");
        this.yourSpeedElement = document.getElementById("gameboard__your-speed");

        this.KeyList = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
        this.MaxKeyPress = 0;

        this.CurrentKey = "";

        this.CurrentKeyPressesCount = 0;
        this.RemainedKeyStrokes = 1;
        this.KeyPressesCount = 0;
    }

    HandleUserInput(container, timer, increaseAmount, decreaseAmount) {
        window.addEventListener("keyup", (e) => {
            if (!container.isFreezed) {
                var key = e.key.toUpperCase();

                if (this.CurrentKey === key) {
                    container.Increase(increaseAmount);
                    this.RemainedKeyStrokes--;
                    this.KeyPressesCount++;

                    let media = config.media.eating[Math.floor(Math.random() * (config.media.eating.length - 1))];
                    let player = new AudioPlayer();
                    player.Play(media);
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
                this.yourSpeedElement.innerHTML = this.KeySpeed = (
                    (this.KeyPressesCount / timer.HowMuchPassed) * 1000
                ).toFixed(2);
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

        let startButtonElement = document.getElementById("start-game-btn");
        startButtonElement.addEventListener("click", () => {
            dialog.Close();
        });

        startButtonElement.addEventListener('mouseenter', () => {
            let player = new AudioPlayer();
            player.Play(config.media.hover);
        });

        startButtonElement.addEventListener('mousedown', () => {
            let player = new AudioPlayer();
            player.Play(config.media.click);
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

        let restartButtonElement = document.getElementById("restart-game-btn");
        restartButtonElement.addEventListener("click", () => {
            dialog.Close();
            game.Restart();
        });

        let scoreboardContentElement = document.getElementById(
            "score-board-content"
        );
        scoreboardContentElement.innerHTML = document.getElementById(
            "gameboard__scoreboard"
        ).innerHTML;
    }
    DisplayWinDialog(game, timer) {
        let dialog = new Dialog();
        dialog.Display(`
            <div id="start-game-intro">
                <h2>You Win</h2>
            </div>
            <h3>Type your name:</h3>
            <input id = "nameInput" type = "text">
            <button id="submit-name-btn">Submit Game</button>
        `);
        let scoreboard = new Scoreboard();

        let nameInput = document.getElementById("nameInput");
        let submitGameButton = document.getElementById("submit-name-btn");
        submitGameButton.addEventListener("click", () => {
            scoreboard.AddUser(nameInput.value, timer.HowMuchPassed, this.KeySpeed);
            this.DisplayScoreboard(game, nameInput.value);
        });
    }

    DisplayScoreboard(game, name) {
        let database = new Database();

        database.Get((data) => {
            let place = 0;
            let isPlayerInTop = false;
            let listElementsHtml = '';
            for (let i = 0; i < Math.min(data.docs.length, config.scoreboardCount); i++) {
                var record = data.docs[i].data();
                console.log({ i, record });
                if (record.name === name) {
                    isPlayerInTop = true;
                    place = i + 1;
                }

                listElementsHtml += `<li>${i + 1} - ${record.name} (${record.time}s, ${record.speed}k/s)</li>`;
            }

            if (!isPlayerInTop) {
                console.log('is not on top');
                // <li>23 - Player (10 k/s)</li>
                for (let i = 0; i < data.docs.length; i++) {
                    var record = data.docs[i].data();
                    console.log({ i, record });
                    if (record.name === name) {
                        place = i + 1;
                        break;
                    }
                }
            }

            let dialog = new Dialog();
            dialog.Display(`
          
                <div id="score-board-content">
                    <div id="gameboard__scoreboard">
                        <h2>Scoreboard</h2>
                        <ul id="gameboard__scores">
                            ${listElementsHtml}
                        </ul>
                        `+ (isPlayerInTop ? '' : `Your Rank is ${place}, (${record.time}s, ${record.speed}k/s)`) + `
                    </div>
                </div>
                <button id="restart-game-btn">Restart Game</button>
            `);

            let restartButtonElement = document.getElementById("restart-game-btn");
            restartButtonElement.addEventListener("click", () => {
                dialog.Close();
                game.Restart();
            });

        });


    }
}
