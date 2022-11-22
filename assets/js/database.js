class Database {
    constructor() {
        this.App = firebase.initializeApp(config.db);
        this.Storage = firebase.firestore();
    }
}