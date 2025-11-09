import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middlewares/socketAuth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ENV.CLIENT_URL,
    credentials: true,
  },
});

//authentication middleware for socket connection
io.use(socketAuthMiddleware);

//to check if the user is online or not
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

//for storing the online users
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log(
    `New client connected: ${socket.userId} for user ${socket.user.fullname}`
  );

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.user.fullname}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
