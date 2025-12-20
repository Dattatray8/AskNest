import http from "http";
import express from "express";
import { Server } from "socket.io";
import User from "./models/user.model.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://querysphere.vercel.app/",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

export const getSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", async (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId != undefined) {
    userSocketMap[userId] = socket.id;
  }
  const user = await User.findById(userId).select("role isTeacher");
  if (user?.role === "teacher" && user?.isTeacher === true) {
    socket.join("verified-teachers");
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
