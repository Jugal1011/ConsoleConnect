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
  
    getChatHistory() {
      return this.messages;
    }
  }
  
module.exports = ChatRoom;
  