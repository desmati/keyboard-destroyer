//let db = new Database();
let container = new Container();
let timer = new Timer();
let ui = new GameUI();
let dialog = new Dialog();
let game = new Game();

container.Initialize(config.containerInitializeValue); // TODO: decide about the initial amount
container.OnContainerFull(() => {
    timer.StopTimer();
    ui.DisplayWinDialog();
});
container.OnContainerEmpty(() => {
    timer.StopTimer();
    ui.DisplayLossDialog();
});

game.Initialize(timer, ui, container);

ui.DisplayStart();

let app = firebase.initializeApp({

    apiKey: "AIzaSyAx8r9nI-wHx7GvXfTaemm8FVDBo7PTATI",
    authDomain: "keyboard-destoryer-2.firebaseapp.com",
    projectId: "keyboard-destoryer-2",
    storageBucket: "keyboard-destoryer-2.appspot.com",
    messagingSenderId: "958605190160",
    appId: "1:958605190160:web:c50732c8332776b15a5695"
});
let db = firebase.firestore();

db.collection("scoreboard")
    //   .orderBy("created")
    .onSnapshot(function (snapshot) {
        console.log(snapshot);
    });

// await db.Storage.collection("scoreboard").add({
//     test: "kzsdghfajdshf"
// });