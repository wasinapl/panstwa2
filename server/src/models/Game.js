import Player from "./Player";

class Game {
  constructor(id, socket, io) {
    this.id = id;
    this.io = io;
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

  setReadyStatus(id){
    const player = this.players.find(p => p.id === id);
    player.ready = !player.ready;
    let count = 0;
    this.players.forEach(pl => {
      if(pl.ready) count++;
    })
    this.io.to(this.id).emit("allReady", count == this.players.length);
  }
}

export default Game;
