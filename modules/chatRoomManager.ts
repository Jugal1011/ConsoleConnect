import { ChatRoom } from "./chatRoom";

export class ChatRoomManager {
  private static instance: ChatRoomManager;
  public chatRooms: Map<string, ChatRoom>;

  public constructor() {
    this.chatRooms = new Map();
  }

  static getInstance() {
    if (!ChatRoomManager.instance) {
      ChatRoomManager.instance = new ChatRoomManager();
    }
    return ChatRoomManager.instance;
  }

  createChatRoom(roomId: string) {
    if (!this.chatRooms.has(roomId)) {
      this.chatRooms.set(roomId, new ChatRoom(roomId));
    }
    return this.chatRooms.get(roomId);
  }

  getChatRoom(roomId: string) {
    return this.chatRooms.get(roomId);
  }

  deleteEmptyChatRoom(roomId: string) {
    this.chatRooms.delete(roomId);
    console.log(`ChatRoom ${roomId} has been deleted as it became empty.`);
  }
}
