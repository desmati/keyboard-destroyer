let container = new Container();
let timer = new Timer();
let ui = new GameUI();
let dialog = new Dialog();
let game = new Game();

container.Initialize(config.containerInitializeValue); // TODO: decide about the initial amount
container.OnContainerFull(() => {
    timer.StopTimer();
    dialog.Display("Won");
});
container.OnContainerEmpty(() => {
    timer.StopTimer();
    dialog.Display("Lost");
});

game.Initialize(timer, ui, container);

ui.DisplayStart();
