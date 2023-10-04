const ChatRoom = require('./chatRoom');

class ChatRoomManager {
  constructor() {
    if (!ChatRoomManager.instance) {
      this.chatRooms = new Map();
      ChatRoomManager.instance = this;
    }
    return ChatRoomManager.instance;
  }

  createChatRoom(roomId) {
    if (!this.chatRooms.has(roomId)) {
      this.chatRooms.set(roomId, new ChatRoom(roomId));
    }
    return this.chatRooms.get(roomId);
  }

  getChatRoom(roomId) {
    return this.chatRooms.get(roomId);
  }
}

module.exports = ChatRoomManager;
