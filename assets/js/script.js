const app = firebase.initializeApp({
  apiKey: "AIzaSyBJqkd5prqIw2stFursCeaGzRdhxGtQzAg",
  authDomain: "keyboard-destroyer.firebaseapp.com",
  databaseURL:
    "https://keyboard-destroyer-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "keyboard-destroyer",
  storageBucket: "keyboard-destroyer.appspot.com",
  messagingSenderId: "1079935422611",
  appId: "1:1079935422611:web:4020739ff76387d40b3d66",
});
const db = firebase.firestore();

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
