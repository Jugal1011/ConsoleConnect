const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const ChatRoomManager = require("./modules/chatRoomManager");
const User = require("./modules/user");

const chatRoomManager = new ChatRoomManager();

io.on("connection", (socket) => {
  let user; // Define user variable in a higher scope
  let roomId; // Define roomId variable in a higher scope

  socket.on("create-or-join-room", (roomIdParam, username) => {
    roomId = roomIdParam; // Assign roomId from the parameter

    let chatRoom = chatRoomManager.getChatRoom(roomId);
    if (!chatRoom) {
      chatRoom = chatRoomManager.createChatRoom(roomId);
    }

    // Check for duplicate username
    if (chatRoom.hasUser(username)) {
      socket.emit("username-exists", username);
      return; // Abort if the username already exists
    }

    user = new User(username, socket);
    chatRoom.addObserver(user);
    socket.join(roomId);
    socket.emit("room-created", roomId);
    io.to(roomId).emit("user-joined", username);

    messages = chatRoom.getChatHistory();
    messages.forEach((msg) => {
      socket.emit("message", msg);
    });
  });

  socket.on("send-message", (data) => {
    let chatRoom = chatRoomManager.getChatRoom(data.roomId);

    chatRoom.broadcast(data);
  });

  socket.on("disconnect", () => {
    if (user && roomId) {
      const chatRoom = chatRoomManager.getChatRoom(roomId);

      // Remove the user from the chatroom
      chatRoom.removeObserver(user);
      io.to(roomId).emit("user-left", user.username);

      // Check if the chatroom is empty after user removal
      if (chatRoom.getUsers().length === 0) {
        // Delete the empty chatroom
        chatRoomManager.deleteEmptyChatRoom(roomId);
      }
    }
  });
});

// Handle server shutdown
const handleServerShutdown = () => {
  console.log("Server is shutting down...");

  // Notify connected clients about the server stopping
  io.emit("server-stopping");

  // Close the server and perform necessary cleanup
  server.close(() => {
    console.log("Server closed.");
    process.exit(0); // Exiting the Node.js process
  });
};

// Intercept termination signals (e.g., Ctrl+C)
process.on("SIGINT", handleServerShutdown);
process.on("SIGTERM", handleServerShutdown);

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
