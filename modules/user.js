class User {
  constructor(username, socket) {
    this.username = username;
    this.socket = socket;
  }

  sendMessage(data) {

    if(this.username!= data.username){    // Emit the message to the server
      this.socket.emit('message', data);
    }
  }
}

module.exports = User;

  