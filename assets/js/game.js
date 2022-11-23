class Game {
  constructor() { }

  StartGame() {
    if (this.started) {
      return;
    }

    Factory.Timer.ResetTimer();
    Factory.Timer.StartTimer();
    Factory.Timer.OnTimeUpEvent(() => {
      Factory.UI.DisplayLossDialog();
      Factory.Container.Freeze();
    });

    Factory.UI.RandomChangeInput();
    Factory.UI.DisplayKey();
    Factory.UI.DisplayKeySpeed();
    Factory.UI.HandleUserInput();

    this.started = true;
  }

  Restart() {
    this.started = false;
    Factory.Container.Initialize();
    Factory.Timer.ResetTimer();
    window.addEventListener("keydown", this.StartGame.bind(this));
  }
}
