class Database {
    constructor() {
        this.App = firebase.initializeApp(config.db);
        this.Storage = firebase.firestore();
    }

    Add(data) {
        db.Storage.collection("scoreboard").add(data);
    }

    Get(callback) {
        db.Storage.collection("scoreboard")
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