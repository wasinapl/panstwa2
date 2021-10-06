class Player {
  constructor(socket) {
    this.id = socket.id;
    this.name = socket.name;
    this.avatar = socket.avatar;
  }
}

export default Player
