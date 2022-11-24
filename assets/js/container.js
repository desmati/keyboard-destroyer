class Container {
  constructor() {
    // this.container = document.querySelector("#gameboard__container progress");
    //this.container = document.getElementById("gameboard");
    this.container = document.getElementById("container-progress");
    this.explosion = document.getElementById("explosion-effect");
    this.isFreezed = false;
  }

  Initialize() {
    this.Percentage = config.containerInitializeValue;
    this.isFreezed = false;
    this.UpdateContent();
  }

  Increase(value) {
    this.Percentage += value;
    if (this.Percentage >= 100) {
      this.OnContainerFull();
      this.Freeze();
    }
    this.UpdateContent();
  }

  Decrease(value) {
    this.Percentage -= value;
    if (this.Percentage <= 0) {
      this.OnContainerEmpty();
      this.Freeze();
    }
    this.UpdateContent();
  }

  Freeze() {
    this.isFreezed = true;
    // TODO: freeze the cat some how
  }

  UpdateContent() {
    //this.container.value = this.Percentage;
    let frameNo = Math.floor(
      this.Percentage / (100 / (config.animationFramesCount - 1))
    );
    if (frameNo > config.animationFramesCount) {
      frameNo = config.animationFramesCount;
    }
    if (frameNo < 0) {
      frameNo = 0;
    }

    let media = `/assets/images/animation/f (${frameNo}).png`;

    // this.container.style.backgroundImage = `url('${media}')`;
    this.container.src = media;
  }

  OnContainerFull() {
    Factory.Timer.StopTimer();
    this.explosion.style.display = "block";
    let player = new AudioPlayer();
    player.Play(config.media.explosion);
    setTimeout(() => {
      this.explosion.style.display = "none";
      Factory.UI.DisplayWinDialog();
    }, 2000);
  }

  OnContainerEmpty() {
    Factory.Timer.StopTimer();
    Factory.UI.DisplayLossDialog();
  }
}
