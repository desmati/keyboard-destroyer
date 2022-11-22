class Scoreboard {
  AddUser(name, time) {
    let data = {
      name,
      time: (time / 1000).toFixed(2),
      date: new Date(),
    };
    let database = new Database();
    database.Add(data);
  }

  FetchData() {}

  SaveData() {}

  DrawScoreboard() {}

  PlayersList() {}

  SaveScore(userName, score) {}
}
