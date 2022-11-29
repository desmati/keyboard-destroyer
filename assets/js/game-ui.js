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

    this.areEventsSetup = {};
  }

  HandleUserInput() {
    if (!this.areEventsSetup["window.keyup"]) {
      window.addEventListener("keyup", (e) => {
        this.areEventsSetup["window.keyup"] = true;
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
            // this.RandomChangeInput(this.MaxKeyPress);
            // this.DisplayKey();
          }
        }
      });
    }
  }

  RandomChangeInput() {
    if (this.keyTimeout) {
      clearTimeout(this.keyTimeout);
    }

    this.MaxKeyPress = config.maxKeyPress;
    this.RemainedKeyStrokes = config.maxKeyPress;

    let random = Math.floor(Math.random() * this.KeyList.length);
    this.CurrentKey = this.KeyList[random];
    this.DisplayKey();

    let timeout = Math.random() * 2000;
    this.keyTimeout = setTimeout(() => {
      this.RandomChangeInput();
    }, timeout);
  }

  StartCountdown() {
    let dialog = new Dialog();

    dialog.Display(`
            <div id="countdown-container">
                <span id="countdown">3</span>
            </div>
        `);

    let countdownElement = document.getElementById("countdown");
    countdownElement.innerHTML = config.initialCountdown;
    let player = new AudioPlayer();
    player.Play(config.media.countdown);
    let time = config.initialCountdown * 1000;
    this.countdown = setInterval(() => {
      if (time % 1000 === 0) {
        countdownElement.innerHTML = Math.floor((time - 1) / 1000);
      }

      time = time - 1000;

      if (time === 2000) {
        let player = new AudioPlayer();
        player.Play(config.media.countdown);
      }
      if (time === 1000) {
        let player = new AudioPlayer();
        player.Play(config.media.countdown);
      }

      if (time === 0) {
        let player = new AudioPlayer();
        player.Play(config.media.meow);
        clearInterval(this.countdown);
        dialog.Close();
        Factory.Game.StartGame();
      }
    }, 1000);
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
            <div id="start-game-intro" >
            <img class ="img-eyes" id ="img-eyes" src="./assets/images/eye.gif" alt="Cat eyes">
            <button id="start-game-btn" class = "btn">Start Game</button>
            </div>
            
        `);

    let startButtonElement = document.getElementById("start-game-btn");
    let imgEl = document.getElementById("img-eyes");
    startButtonElement.addEventListener("click", () => {
      startButtonElement.classList.add("animate__fadeOut");
      imgEl.classList.add("animate__fadeOut");
    });

    startButtonElement.addEventListener("animationend", () => {
      dialog.Close();
      this.DisplayInfoDialog();
    });

    startButtonElement.addEventListener("mouseenter", () => {
      let player = new AudioPlayer();
      player.Play(config.media.hover);
    });

    startButtonElement.addEventListener("mousedown", () => {
      let player = new AudioPlayer();
      player.Play(config.media.click);
    });
  }

  DisplayInfoDialog() {
    let dialog = new Dialog();
    dialog.Display(`
            <div id="start-game-intro">
            <div class = "game-instructions" id = "gameInstructions">
                Frank is hungry! Feed Frank until he explodes by pressing the displayed key as fast as possible!
                </div>
                <br/>
                <br/>
                <button class="btn" id="go-btn">OK</button>
            </div>
        `);

    let player = new AudioPlayer();
    player.Play(config.media.theame);
    let goButtonElement = document.getElementById("go-btn");
    let gameInstructoins = document.getElementById("gameInstructions");
    goButtonElement.addEventListener("click", () => {
      goButtonElement.classList.add("animate__fadeOut");
      gameInstructoins.classList.add("animate__fadeOut");
    });

    goButtonElement.addEventListener("mousedown", () => {
      let player = new AudioPlayer();
      player.Play(config.media.click);
    });

    goButtonElement.addEventListener("animationend", () => {
      dialog.Close();
      player.Stop(config.media.theame);
      this.StartCountdown();
    });
  }

  DisplayLossDialog() {
    let player = new AudioPlayer();
    player.Play(config.media.gameover);

    let dialog = new Dialog();
    dialog.Display(`
            <div id="start-game-intro" class = "msg">
                <h2>You Lost</h2>
            </div>
            <button id="restart-game-btn" class = "btn">Restart Game</button>
        `);

    let restartButtonElement = document.getElementById("restart-game-btn");
    restartButtonElement.addEventListener("click", () => {
      dialog.Close();
      Factory.UI.StartCountdown();
    });

    // let scoreboardContentElement = document.getElementById("score-board-content");
    // scoreboardContentElement.innerHTML = document.getElementById("gameboard__scoreboard").innerHTML;
  }
  DisplayWinDialog() {
    let dialog = new Dialog();
    dialog.Display(`
            <div id="you-win-msg" class = "msg">
                <h2>Congrats!</h2>
            </div>
            <div id="input-container" class = "container">
            <h3>Pick a name human!</h3>
            <input autocomplete="off" id = "nameInput" type = "text">
            <button id="submit-name-btn" class = "btn">Submit Game</button>
            </div>
        `);
    let scoreboard = new Scoreboard();

    let nameInput = document.getElementById("nameInput");
    let submitGameButton = document.getElementById("submit-name-btn");
    submitGameButton.addEventListener("click", () => {
      submitGameButton.disabled = true;
      scoreboard.AddUser(
        nameInput.value,
        Factory.Timer.HowMuchPassed,
        this.KeySpeed
      );
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
                    <span class= "scoreboard-score">${record.time}s, ${
          record.speed
        }k/s)</span>
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
      dialog.Display(
        `
            <div id="you-win-msg" class ="msg">
                <h2>Congrats!</h2>
            </div>
            <div id="score-board-content" class ="container">
                <div id="gameboard__scoreboard">
                    <h2>Scoreboard</h2>
                    <ul id="gameboard__scores">
                        ${listElementsHtml}
                    </ul>
                    ` +
          (isPlayerInTop
            ? ""
            : `Your Score 
            <div class="your-score-container">
            <span class= "scoreboard-place">${place}</span>  <span class= "scoreboard-name">${record.time}s</span>   <span class= "scoreboard-score">${record.speed}k/s</span>
            </div>`) +
          `
                </div>
            </div>
            <button id="restart-game-btn" class = "btn">Restart Game</button>
            `
      );

      let restartButtonElement = document.getElementById("restart-game-btn");
      restartButtonElement.addEventListener("click", () => {
        dialog.Close();
        Factory.UI.StartCountdown();
      });
    });
  }
}
