class Dialog {
    constructor() {
        this.dialogElement = document.getElementById('dialog');
        this.dialogCloseElement = document.getElementById('dialog__close');
        this.dialogContentElement = document.getElementById('dialog__content');

        this.dialogCloseElement.addEventListener('click', () => {
            this.dialogContentElement = "";
            this.dialogElement.style.display = "none";
        });
    }

    Display(content, showClose = true) {
        this.dialogContentElement.innerHTML = content;
        this.dialogElement.style.display = "flex";

        if (showClose) {
            this.dialogCloseElement.style.display = "block";
        } else {
            this.dialogCloseElement.style.display = "none";
        }
    }
}