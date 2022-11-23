class AudioPlayer {
  constructor() {
    this.body = document.getElementsByTagName("body")[0];
  }

  Play(file) {
    let random = (Math.random() * 10000000).toFixed(0);
    this.id = `audio_${random}`;
    this.audioElement = document.getElementById(this.id);
    if (!this.audioElement) {
      this.audioElement = document.createElement("audio");
      this.body.append(this.audioElement);

      this.audioElement.id = this.id;
      this.audioElement.muted = true;
      this.audioElement.src = file;
      this.audioElement.autoplay = true;
      this.audioElement.preload = "auto";
      this.audioElement.addEventListener("ended", () => {
        this.audioElement.remove();
      });
      setTimeout(
        function () {
          this.audioElement.muted = false;
          this.audioElement.play();
        }.bind(this),
        10
      );
    }
  }

  Stop(file) {
    this.audioElement.src = file;
    this.audioElement.pause();
  }
}
