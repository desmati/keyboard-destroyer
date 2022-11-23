class Container {
    constructor() {
        this.container = document.querySelector("#gameboard__container progress");
        this.isFreezed = false;
    }

    Initialize() {
        this.Percentage = config.containerInitializeValue;
        this.UpdateContent();
    }

    Increase(value) {
        this.Percentage += value;
        if (this.Percentage >= 100) {
            this.callbackFull();
            this.Freeze();
        }
        this.UpdateContent();
    }

    Decrease(value) {
        this.Percentage -= value;
        if (this.Percentage <= 0) {
            this.callbackEmpty();
            this.Freeze();
        }
        this.UpdateContent();
    }

    Freeze() {
        this.isFreezed = true;
        // TODO: freeze the cat some how
    }

    UpdateContent() {
        this.container.value = this.Percentage;
    }

    OnContainerFull() {
        Factory.Timer.StopTimer();
        Factory.UI.DisplayWinDialog();
    }

    OnContainerEmpty() {
        Factory.Timer.StopTimer();
        Factory.UI.DisplayLossDialog();
    }
}