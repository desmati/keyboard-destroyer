class Dialog {
  constructor() {
    this.dialogElement = document.getElementById("dialog");

    this.dialogContentElement = document.getElementById("dialog__content");
  }

  Display(content, showClose) {
    this.dialogContentElement.innerHTML = content;
    this.dialogElement.style.display = "flex";
  }

  Close() {
    this.dialogContentElement = "";
    this.dialogElement.style.display = "none";
  }
}
