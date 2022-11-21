class Dialog {
    constructor() {
        this.dialogElement = document.getElementById('dialog');
        this.dialogCloseElement = document.getElementById('dialog__close');
        this.dialogContentElement = document.getElementById('dialog__content');

        this.dialogCloseElement.addEventListener('click', () => {
            this.Close();
        });
    }

    Display(content, showClose) {
        this.dialogContentElement.innerHTML = content;
        this.dialogElement.style.display = "flex";

        if (showClose) {
            this.dialogCloseElement.style.display = "block";
        } else {
            this.dialogCloseElement.style.display = "none";
        }
    }

    Close(){
        this.dialogContentElement = "";
            this.dialogElement.style.display = "none";
    }
}