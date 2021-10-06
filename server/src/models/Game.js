import Player from "./Player";

class Game {
  constructor(id, socket) {
    this.id = id;
    this.admin = socket.id;
    this.options = {};
    this.options.rounds = 5;
    this.options.time = 50;
    this.options.categories = [];
    this.players = [];
  }

  join(socket, callback) {
    let player = new Player(socket);
    this.players.push(player);
    callback({ options: this.options, players: this.players });
  }

  adminCheck(socket) {
    return this.admin === socket.id;
  }
}

export default Game;
