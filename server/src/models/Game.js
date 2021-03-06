import Player from "./Player";
import Round from "./Round";

class Game {
  constructor(id, socket, io) {
    this.id = id;
    this.io = io;
    this.admin = socket.id;
    this.options = {};
    this.options.rounds = 5;
    this.options.time = 50;
    this.options.categories = [];
    this.lobby = true;
    this.players = [];
    this.rounds = [];
    this.round = 0;
    this.alphabet = "abcdefghijklmnoprstuwz".toUpperCase().split("");
  }

  join(socket, callback) {
    let player = new Player(socket);
    this.players.push(player);
    socket.to(this.id).emit("newPlayer", this.players);
    callback({ options: this.options, players: this.players });
  }

  disconnect(socket) {
    let index = this.players.findIndex((el) => el.id === socket.id);
    this.players.splice(index, 1);
    socket.to(this.id).emit("playerLeft", this.players);
  }

  adminCheck(socket) {
    return this.admin === socket.id;
  }

  isLobby(){
    return this.lobby;
  }

  setReadyStatus(id) {
    const player = this.players.find((p) => p.id === id);
    player.ready = !player.ready;
    let count = 0;
    this.players.forEach((pl) => {
      if (pl.ready) count++;
    });
    this.io.to(this.id).emit("allReady", count == this.players.length);
  }

  startGame(options) {
    this.isLobby = false;
    this.options = options;
    const letter = this.alphabet.splice(
      Math.floor(Math.random() * this.alphabet.length),
      1
    )[0];
    const round = new Round(letter, this.options.categories, this.players);
    this.rounds.push(round);
    this.io.to(this.id).emit("startGame", { options: this.options, letter });
  }

  addWords(words, socket) {
    this.rounds[this.round].addWords(words, socket);
    if (this.rounds[this.round].playersWordsCount() == this.players.length) {
      this.io.to(this.id).emit("voting", this.rounds[this.round].getWords());
    }
  }

  vote(data) {
    this.rounds[this.round].vote(data);
  }

  voteReady() {
    this.rounds[this.round].voteReady();
    if (this.rounds[this.round].voteReadyCount() == this.players.length)
      this.nextRound();
  }

  nextRound() {
    this.round++;
    if (this.round == this.options.rounds) this.endGame();
    else {
      const letter = this.alphabet.splice(
        Math.floor(Math.random() * this.alphabet.length),
        1
      )[0];
      const round = new Round(letter, this.options.categories, this.players);
      this.rounds.push(round);
      this.io.to(this.id).emit("nextRound", letter);
    }
  }

  endGame() {
    this.rounds.forEach((round) => {
      round.calcPoints();
    });
    const results = JSON.parse(JSON.stringify(this.players));
    results.forEach((result) => (result.score = 0));
    this.rounds.forEach((round) => {
      const points = round.getPoints();
      Object.keys(points).forEach((playerId) => {
        const playerPoints = points[playerId];
        results.find((p) => p.id == playerId).score += playerPoints;
      });
    });
    results.sort((a, b) => {
      if (a.score < b.score) return 1;
      if (a.score > b.score) return -1;
      return 0;
    });

    this.io.to(this.id).emit("results", results);
  }

  
}

export default Game;
