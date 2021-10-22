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

  socket.on("createRoom", callback => {
    let id = nanoid(10);
    rooms[id] = new Game(id, socket, io);
    callback(id);
  })

  socket.on("roomExist", (id, callback) => {
    if(!rooms[id]) callback({ok: false})
    else if(!rooms[id].isLobby()) callback({ok: false})
    else callback({ok: true, admin: rooms[id].adminCheck(socket)})
  })

  socket.on("joinRoom", ({id, player}, callback) => {
    socket.name = player.name;
    socket.avatar = player.avatar;
    socket.join(id);
    socket.room = id;
    rooms[id].join(socket, callback);
  })

  socket.on("getCategories", async callback => {
    const categories = await Category.find({});
    callback(categories);
  });

  socket.on("message", msg => {
    socket.to(socket.room).emit('message', msg);
  })

  socket.on('playerReady', () => {
    rooms[socket.room].setReadyStatus(socket.id);
    io.to(socket.room).emit('playerReady', socket.id);
  })

  socket.on("optionsChange", options => {
    socket.to(socket.room).emit("optionsChange", options);
  })
  socket.on("avalCatChange", avalCAt => {
    socket.to(socket.room).emit("avalCatChange", avalCAt);
  })

  socket.on("startGame", options => {
    rooms[socket.room].startGame(options);
  })

  socket.on("setStatus", (data) => {
    socket.to(socket.room).emit('setStatus', data);
  })

  socket.on('writingReady', () => {
    io.to(socket.room).emit('timeChange');
  })

  socket.on('words', words => {
    rooms[socket.room].addWords(words, socket);
  })

  socket.on('vote', data => {
    rooms[socket.room].vote(data);
    io.to(socket.room).emit("vote", data);
  })

  socket.on('voteReady', () => {
    io.to(socket.room).emit("voteReady", socket.id);
    rooms[socket.room].voteReady();
  })

  socket.on("disconnect", reason => {
    if(socket.room) rooms[socket.room].disconnect(socket);
  })
});