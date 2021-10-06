import socket from "socket.io";
import { nanoid } from 'nanoid'
const io = socket(3000, {
  cors: {
    origin: '*',
  }
});

import Category from "./models/Category";
import Game from "./models/Game";

const rooms = {};

io.on("connection", socket => {
  
  console.log(`user connected id=${socket.id}`)

  socket.on("createRoom", (player, callback) => {
    let id = nanoid(10);
    socket.name = player.name;
    socket.avatar = player.avatar;
    rooms[id] = new Game(id, socket);
    callback(id);
  })

  socket.on("roomExist", (id, callback) => {
    if(!rooms[id]) callback({ok: false})
    else callback({ok: true, admin: rooms[id].adminCheck(socket)})
  })

  socket.on("joinRoom", (id, callback) => {
    rooms[id].join(socket, callback);
  })

  socket.on("getCategories", async callback => {
    const categories = await Category.find({});
    callback(categories);
  });
});