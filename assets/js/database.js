class Database {
    constructor() {
        this.App = firebase.initializeApp(config.db);
        this.Storage = firebase.firestore();
    }

    Add(data) {
        Factory.DB.Storage.collection("scoreboard").add(data);
    }

    Get(callback) {
        Factory.DB.Storage.collection("scoreboard")
            .orderBy("time")
            .onSnapshot(function (snapshot) {
                if (this.updateTimeout) {
                    clearTimeout(this.updateTimeout);
                }

                this.updateTimeout = setTimeout(() => {
                    callback(snapshot);
                }, 500);

            });
    }
}