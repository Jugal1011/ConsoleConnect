import User from "./user";

export class ChatRoom {
  private roomId: string;
  private users: Set<User>;
  private messages: any[]; // Define a more specific type for messages if possible

  constructor(roomId: string) {
    this.roomId = roomId;
    this.users = new Set<User>();
    this.messages = [];
  }

  addObserver(observer: User) {
    this.users.add(observer);
  }

  removeObserver(observer: User) {
    this.users.delete(observer);
  }

  notifyObservers(message: any) {
    for (const observer of this.users) {
      observer.sendMessage(message);
    }
  }

  broadcast(message: any) {
    this.messages.push(message);
    this.notifyObservers(message);
  }

  // Check if a user with the given username exists in the chat room
  hasUser(username: string) {
    for (const user of this.users) {
      if (user.username === username) {
        return true; // User with the same username found
      }
    }
    return false; // User not found
  }

  getChatHistory() {
    return this.messages;
  }

  getUsers() {
    // Convert Set of users to an array and return
    return Array.from(this.users);
  }
}

// export default ChatRoom;
