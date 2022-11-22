class Database {
    constructor() {
        this.App = firebase.initializeApp(config.db);
        this.Storage = firebase.firestore();
    }

    Add(data){
        db.Storage.collection("scoreboard").add(data);
    }

    Get(callback){
        db.Storage.collection("scoreboard")
        .orderBy("time").limit(config.scoreboardCount)
        .onSnapshot(function (snapshot) {
            callback(snapshot);
        });
    }
}