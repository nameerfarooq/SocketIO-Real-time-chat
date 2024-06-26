import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import jwt from "jsonwebtoken";
const app = express();
const server = createServer(app);
const secretKeyJWT = "asdasdasdasdasdasf";
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.get("/login", (req, res) => {
  const token = jwt.sign({ _id: "asdasdasdavadv" }, secretKeyJWT);
  res
    .cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
    .json({ message: "Login Success" });
});
const user = false;
io.use((socket, next) => {
  if (user) next();
});
io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);
  socket.emit("welcome", `Welcome to the server `);
  socket.broadcast.emit("welcome", `${socket.id} joined the server`);
  socket.on("disconnect", () => {
    console.log("Socket disconnected successfully..", socket.id);
  });
  socket.on("message", ({ room, message }) => {
    io.to(room).emit("receive-message", message);
  });
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log("User joined :", room);
  });
});

server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
