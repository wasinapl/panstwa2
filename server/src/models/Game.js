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
    socket.to(this.id).emit("newPlayer", this.players);
    callback({ options: this.options, players: this.players });
  }

  disconnect(socket){
    let index = this.players.findIndex(el => el.id === socket.id);
    this.players.splice(index, 1);
    socket.to(this.id).emit('playerLeft', this.players);
  }

  adminCheck(socket) {
    return this.admin === socket.id;
  }
}

export default Game;
