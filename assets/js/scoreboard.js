class Scoreboard {
    AddUser(name, time, keySpeed) {
        let data = {
            name,
            time: parseFloat((time / 1000).toFixed(2)),
            speed: keySpeed,
            date: new Date().getTime(),
        };
        let database = new Database();
        database.Add(data);
    }

    FetchData() { }

    SaveData() { }

    DrawScoreboard() { }

    PlayersList() { }

    SaveScore(userName, score) { }
}
