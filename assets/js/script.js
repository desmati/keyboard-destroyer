let timer = new Timer();
timer.ResetTimer(3);
timer.StartTimer();

timer.OnTimeUpEvent(() => {
    console.log("You Lose");
});
// timer.StartTimer();
// timer.DisplayTimer();