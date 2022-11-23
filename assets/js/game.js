class Game {

  StartGame() {

    Factory.Container.Initialize();

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
  }
}
