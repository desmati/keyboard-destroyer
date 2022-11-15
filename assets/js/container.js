class Container {
    constructor() {
        this.container = document.querySelector("#gameboard__container progress");
    }

    Initialize(startValue) {
        this.Percentage = startValue;
        this.UpdateContent();
    }

    Increase(value) {
        this.Percentage += value;
        if (this.Percentage >= 100) {
            this.callbackFull();
        }
        this.UpdateContent();
    }

    Decrease(value) {
        this.Percentage -= value;
        if (this.Percentage <= 0) {
            this.callbackEmpty();
        }
        this.UpdateContent();
    }

    UpdateContent() {
        this.container.value = this.Percentage;
    }

    OnContainerFull(callbackFull) {
        this.callbackFull = callbackFull;
    }

    OnContainerEmpty(callbackEmpty) {
        this.callbackEmpty = callbackEmpty;
    }
}