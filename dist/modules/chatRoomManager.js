"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoomManager = void 0;
const chatRoom_1 = require("./chatRoom");
class ChatRoomManager {
    constructor() {
        this.chatRooms = new Map();
    }
    static getInstance() {
        if (!ChatRoomManager.instance) {
            ChatRoomManager.instance = new ChatRoomManager();
        }
        return ChatRoomManager.instance;
    }
    createChatRoom(roomId) {
        if (!this.chatRooms.has(roomId)) {
            this.chatRooms.set(roomId, new chatRoom_1.ChatRoom(roomId));
        }
        return this.chatRooms.get(roomId);
    }
    getChatRoom(roomId) {
        return this.chatRooms.get(roomId);
    }
    deleteEmptyChatRoom(roomId) {
        this.chatRooms.delete(roomId);
        console.log(`ChatRoom ${roomId} has been deleted as it became empty.`);
    }
}
exports.ChatRoomManager = ChatRoomManager;
