class ChatRoom {
  constructor(roomId) {
    this.roomId = roomId;
    this.users = new Set();
    this.messages = [];
  }

  addObserver(observer) {
    this.users.add(observer);
  }

  removeObserver(observer) {
    this.users.delete(observer);
  }

  notifyObservers(message) {
    for (const observer of this.users) {
      observer.sendMessage(message);
    }
  }

  broadcast(message) {
    this.messages.push(message);
    this.notifyObservers(message);
  }

  // Check if a user with the given username exists in the chat room
  hasUser(username) {
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

module.exports = ChatRoom;
