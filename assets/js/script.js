let db = new Database();
let container = new Container();
let timer = new Timer();
let ui = new GameUI();
let dialog = new Dialog();
let game = new Game();

container.Initialize(config.containerInitializeValue); // TODO: decide about the initial amount
container.OnContainerFull(() => {
  timer.StopTimer();
  ui.DisplayWinDialog(game, timer);
});
container.OnContainerEmpty(() => {
  timer.StopTimer();
  ui.DisplayLossDialog();
});

game.Initialize(timer, ui, container);

ui.DisplayStart();
