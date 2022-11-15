class Timer {

    constructor() {

    }

    StartTimer() {
        this.Interval = setInterval(() => {
            this.CurrentValue -= 100;
            this.DisplayTimer();

            if (this.CurrentValue <= 0) {
                this.StopTimer();
                this.callback();
            }

        }, 100);
    }

    OnTimeUpEvent(callback) {
        this.callback = callback;
    }

    StopTimer() {
        clearInterval(this.Interval);
    }

    ResetTimer(startAmountInSeconds) {
        this.CurrentValue = startAmountInSeconds * 1000;
    }

    DisplayTimer() {
        let gameboard__timer = document.getElementById('gameboard__timer');
        gameboard__timer.innerHTML = (parseFloat(this.CurrentValue / 1000.0).toFixed(1)).padStart(4, '0');
    }
}