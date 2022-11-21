class Timer {

    constructor() {
        this.HowMuchPassed = 0;
    }

    StartTimer() {
        this.Interval = setInterval(() => {
            this.CurrentValue -= 100;
            this.HowMuchPassed += 100;
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
        this.HowMuchPassed = 0;
    }

    DisplayTimer() {
        let gameboardTimer = document.getElementById('gameboard__timer');
        gameboardTimer.innerHTML = (parseFloat(this.CurrentValue / 1000.0).toFixed(1)).padStart(4, '0');
    }
}