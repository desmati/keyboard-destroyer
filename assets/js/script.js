let timer = new Timer();
timer.ResetTimer(10);
timer.StartTimer();
timer.OnTimeUpEvent(() => {
    console.log("You Lose");
});

let container = new Container();
container.Initialize(30); // TODO: decide about the initial amount
container.OnContainerFull(() => {
    console.log("Won");
});
container.OnContainerEmpty(() => {
    console.log("Loss");
});

let ui = new GameUI();
ui.RandomChangeInput(1);
ui.DisplayKey();
ui.HandleUserInput(container);

// timer.StartTimer();
// timer.DisplayTimer();