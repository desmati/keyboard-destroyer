class GameUI {
    constructor() {
        this.gameboardkey = document.getElementById('gameboard__key');

        this.KeyList = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
        this.MaxKeyPress = 0;

        this.CurrentKey = "";

        this.CurrentKeyPressesCount = 0;
        this.RemainedKeyStrokes = 1;
    }

    HandleUserInput(container) {
        window.addEventListener('keydown', (e) => {
            var key = e.key.toUpperCase();

            if (this.CurrentKey === key) {
                container.Increase(1);
            } else {
                container.Decrease(1);
            }
        });
    }

    RandomChangeInput(maxKeyPress) {
        let random = Math.floor(Math.random() * this.KeyList.length);
        this.CurrentKey = this.KeyList[random];

        this.MaxKeyPress = maxKeyPress;
        this.RemainedKeyStrokes = maxKeyPress;
    }

    DisplayKey() {
        this.gameboardkey.innerHTML = this.CurrentKey;
    }

    DisplayKeySpeed() {

    }
}