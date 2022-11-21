let container = new Container();
let timer = new Timer();
let ui = new GameUI();
let dialog = new Dialog();

container.Initialize(30); // TODO: decide about the initial amount
container.OnContainerFull(() => {
    timer.StopTimer();
    dialog.Display("Won");
});
container.OnContainerEmpty(() => {
    timer.StopTimer();
    dialog.Display("Lost");
});

timer.ResetTimer(10);
timer.StartTimer();
timer.OnTimeUpEvent(() => {
    dialog.Display("Lost");
    container.Freeze();
});

ui.RandomChangeInput(1);
ui.DisplayKey();
ui.DisplayKeySpeed(500, container, timer);
ui.HandleUserInput(container, timer, 5, 1);
ui.DisplayStart();
