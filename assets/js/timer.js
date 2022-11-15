class Timer {
    constructor() {
        this.CurrentValue = 10 * 1000;
        this.Interval = setInterval(() => {
            this.CurrentValue -= 100;

            if (this.CurrentValue <= 0) {
                clearInterval(this.Interval);
            }
            this.DisplayTimer();
            console.log(this.CurrentValue);
        }, 100);
    }

    StartTimer() {

    }

    OnCountdown() {

    }

    OnTimeUpEvent() {

    }

    StopTimer() {

    }

    ResetTimer() {

    }

    DisplayTimer() {
        let gameboard__timer = document.getElementById('gameboard__timer');
        gameboard__timer.innerHTML = this.CurrentValue;
    }
}