class Player {
  constructor(socket) {
    this.id = socket.id;
    this.name = socket.name;
    this.avatar = socket.avatar;
    this.ready = false;
  }
}

export default Player
