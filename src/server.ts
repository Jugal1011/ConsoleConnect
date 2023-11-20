import express from "express";
import http from "http";
import { Server } from "socket.io";

import { ChatRoomManager } from "./modules/chatRoomManager";
import User from "./modules/user";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const chatRoomManager = new ChatRoomManager();

io.on("connection", (socket) => {
  let user: User | undefined;
  let roomId: string | undefined;

  socket.on("create-or-join-room", (roomIdParam: string, username: string) => {
    roomId = roomIdParam;

    let chatRoom = chatRoomManager.getChatRoom(roomId);
    if (!chatRoom) {
      chatRoom = chatRoomManager.createChatRoom(roomId);
    }
    if (chatRoom) {
      if (chatRoom.hasUser(username)) {
        socket.emit("username-exists", username);
        return;
      }

      user = new User(username, socket);
      chatRoom.addObserver(user);
      socket.join(roomId);
      socket.emit("room-created", roomId);
      io.to(roomId).emit("user-joined", username);

      const messages = chatRoom.getChatHistory();
      messages.forEach((msg) => {
        socket.emit("message", msg);
      });
    }
    else {
      // Handle the case when chatRoom is undefined
      console.error("Chat room not found");
    }
  });

  socket.on("send-message", (data: { roomId: string; input: string; username: string }) => {
    const chatRoom = chatRoomManager.getChatRoom(data.roomId);
    if (chatRoom) {
      chatRoom.broadcast(data);
    } else {
      // Handle the case when chatRoom is undefined
      console.error("Chat room not found");
    }
  });

  socket.on("disconnect", () => {
    if (user && roomId) {
      const chatRoom = chatRoomManager.getChatRoom(roomId);
      if (chatRoom) {
        chatRoom.removeObserver(user);
        io.to(roomId).emit("user-left", user.username);

        if (chatRoom.getUsers().length === 0) {
          chatRoomManager.deleteEmptyChatRoom(roomId);
        }
      } else {
        // Handle the case when chatRoom is undefined
        console.error("Chat room not found");
      }
    }
  });
});

const handleServerShutdown = () => {
  console.log("Server is shutting down...");
  io.emit("server-stopping");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
};

process.on("SIGINT", handleServerShutdown);
process.on("SIGTERM", handleServerShutdown);

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
