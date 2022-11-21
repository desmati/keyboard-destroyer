class Game {
    constructor() {

    }

    Initialize(timer, ui, container) {
        this.timer = timer;
        this.ui = ui;
        this.container = container;

        this.Restart();
    }

    StartGame() {
        if (this.started) {
            return;
        }

        this.timer.ResetTimer(config.startTime);
        this.timer.StartTimer();
        this.timer.OnTimeUpEvent(() => {
            ui.DisplayLossDialog(this);
            this.container.Freeze();
        });

        ui.RandomChangeInput(config.maxKeyPress);
        ui.DisplayKey();
        ui.DisplayKeySpeed(config.keySpeedInterval, this.container, this.timer);
        ui.HandleUserInput(this.container, this.timer, config.increaseAmount, config.decreaseAmount);

        this.started = true;
    }

    Restart() {
        this.started = false;
        this.container.Initialize(config.containerInitializeValue);
        this.timer.ResetTimer(config.startTime);
        window.addEventListener('keyup', this.StartGame.bind(this));
    }

}