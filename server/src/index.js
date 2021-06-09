import socket from "socket.io";
const io = socket(3000, {
  cors: {
    origin: '*',
  }
});

import Category from "./models/Category";

io.on("connection", socket => {
  
  console.log(`user connected id=${socket.id}`)

  socket.on("getCategories", async callback => {
    const categories = await Category.find({});
    callback(categories);
  });
});