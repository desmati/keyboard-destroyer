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


    HandleUserInput() {
        window.addEventListener("keyup", (e) => {
            if (!Factory.Container.isFreezed) {
                var key = e.key.toUpperCase();

                if (this.CurrentKey === key) {
                    Factory.Container.Increase(config.increaseAmount);
                    this.RemainedKeyStrokes--;
                    this.KeyPressesCount++;

                    let player = new AudioPlayer();
                    player.Play(PickRandom(config.media.eating));
                } else {
                    Factory.Container.Decrease(config.decreaseAmount);
                    let player = new AudioPlayer();
                    player.Play(PickRandom(config.media.angry));
                }

                if (this.RemainedKeyStrokes === 0) {
                    // this.MaxKeyPress = Math.floor(Math.random() * 3);
                    this.RandomChangeInput(this.MaxKeyPress);
                    this.DisplayKey();
                }
            }
        });
    }

    RandomChangeInput() {
        this.MaxKeyPress = config.maxKeyPress;
        this.RemainedKeyStrokes = config.maxKeyPress;

        let random = Math.floor(Math.random() * this.KeyList.length);
        this.CurrentKey = this.KeyList[random];
    }

    StartCountdown() {
        let dialog = new Dialog();

        dialog.Display(`
            <div id="countdown-container">
                <span id="countdown">3</span>
            </div>
        `);

        let countdownElement = document.getElementById('countdown');
        countdownElement.innerHTML = config.initialCountdown;
        let time = (config.initialCountdown - 1) * 1000;
        this.countdown = setInterval(() => {
            if (time % 1000 === 0) {
                countdownElement.innerHTML = (time / 1000);
            }

            time = time - 1000;

            if (time === 0) {
                clearInterval(this.countdown);
                dialog.Close();
                Factory.Game.Restart();
            }
        }, 1000);
        Factory.Game.Restart();
    }

    DisplayKey() {
        this.gameboardkey.innerHTML = this.CurrentKey;
    }

    DisplayKeySpeed() {
        if (this.keySpeedInterval) {
            clearInterval(this.keySpeedInterval);
        }

        this.keySpeedInterval = setInterval(() => {
            if (!Factory.Container.isFreezed) {
                this.yourSpeedElement.innerHTML = this.KeySpeed = (
                    (this.KeyPressesCount / Factory.Timer.HowMuchPassed) *
                    1000
                ).toFixed(2);
            }
        }, config.keySpeedInterval);
    }

    DisplayStart() {
        let dialog = new Dialog();
        dialog.Display(`
            <div id="start-game-intro">
            <img class ="img-meow" src="./assets/images/meow.gif" alt="Cat saying meaow">
            <img class ="img-eyes" src="./assets/images/eye.gif" alt="Cat eyes">
            <button id="start-game-btn">Start Game</button>
            </div>
            
        `);

        let startButtonElement = document.getElementById("start-game-btn");
        startButtonElement.addEventListener("click", () => {
            startButtonElement.classList.add("animate__fadeOut");
        });

        startButtonElement.addEventListener("animationend", () => {
            dialog.Close();
            this.StartCountdown();
        });

        startButtonElement.addEventListener("mouseenter", () => {
            let player = new AudioPlayer();
            player.Play(config.media.hover);
        });

        startButtonElement.addEventListener('mousedown', () => {
            let player = new AudioPlayer();
            player.Play(config.media.click);
        });

    }

    DisplayLossDialog() {
        let player = new AudioPlayer();
        player.Play(config.media.gameover);

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
            Factory.Game.Restart();
        });

        let scoreboardContentElement = document.getElementById(
            "score-board-content"
        );
        scoreboardContentElement.innerHTML = document.getElementById(
            "gameboard__scoreboard"
        ).innerHTML;
    }
    DisplayWinDialog() {
        let dialog = new Dialog();
        dialog.Display(`
            <div id="you-win-msg">
                <h2>Congrats!</h2>
            </div>
            <div id="input-container">
            <h3>Pick a name human!</h3>
            <input id = "nameInput" type = "text">
            <button id="submit-name-btn">Submit Game</button>
            </div>
        `);
        let scoreboard = new Scoreboard();

        let nameInput = document.getElementById("nameInput");
        let submitGameButton = document.getElementById("submit-name-btn");
        submitGameButton.addEventListener("click", () => {
            scoreboard.AddUser(nameInput.value, Factory.Timer.HowMuchPassed, this.KeySpeed);
            this.DisplayScoreboard(nameInput.value);
        });
    }

    DisplayScoreboard(name) {
        let database = new Database();

        database.Get((data) => {
            let place = 0;
            let isPlayerInTop = false;
            let listElementsHtml = "";
            for (
                let i = 0;
                i < Math.min(data.docs.length, config.scoreboardCount);
                i++
            ) {
                var record = data.docs[i].data();
                if (record.name === name) {
                    isPlayerInTop = true;
                    place = i + 1;
                }

                listElementsHtml += `
                <li>
                    <span class= "scoreboard-place">${i + 1}</span>
                    <span class= "scoreboard-name">${record.name}</span> 
                    <span class= "scoreboard-score">${record.time}s, ${record.speed}k/s)</span>
                </li>`;
            }

            if (!isPlayerInTop) {
                for (let i = 0; i < data.docs.length; i++) {
                    var record = data.docs[i].data();
                    if (record.name === name) {
                        place = i + 1;
                        break;
                    }
                }
            }

            let dialog = new Dialog();
            dialog.Display(`
            <div id="you-win-msg">
                <h2>Congrats!</h2>
            </div>
            <div id="score-board-content">
                <div id="gameboard__scoreboard">
                    <h2>Scoreboard</h2>
                    <ul id="gameboard__scores">
                        ${listElementsHtml}
                    </ul>
                    ` +
                (isPlayerInTop
                    ? ""
                    : `Your Rank is ${place}${record.time}s${record.speed}k/s`) +
                `
                </div>
            </div>
            <button id="restart-game-btn">Restart Game</button>
            `);

            let restartButtonElement = document.getElementById("restart-game-btn");
            restartButtonElement.addEventListener("click", () => {
                dialog.Close();
                Factory.Game.Restart();
            });
        });
    }

    DisplayInitialDialog() {
        let dialog = new Dialog();
        dialog.Display(`
            <div id="start-game-intro">
                Feed Frank as much as you can by pressing the specified key!
                <br/>
                <br/>
                <button class="btn" id="go-btn">Go!</button>
            </div>
        `);

        let goButtonElement = document.getElementById("go-btn");
        goButtonElement.addEventListener("click", () => {
            dialog.Close();
            this.DisplayStart();
        });
    }
}
