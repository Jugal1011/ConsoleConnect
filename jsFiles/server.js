"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const chatRoomManager_1 = require("./modules/chatRoomManager");
const user_1 = __importDefault(require("./modules/user"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const chatRoomManager = new chatRoomManager_1.ChatRoomManager();
io.on("connection", (socket) => {
    let user;
    let roomId;
    socket.on("create-or-join-room", (roomIdParam, username) => {
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
            user = new user_1.default(username, socket);
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
    socket.on("send-message", (data) => {
        const chatRoom = chatRoomManager.getChatRoom(data.roomId);
        if (chatRoom) {
            chatRoom.broadcast(data);
        }
        else {
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
            }
            else {
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
