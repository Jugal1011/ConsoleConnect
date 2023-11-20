import { Socket } from "socket.io";

export default class User {
  public username: string;
  private socket: Socket;

  constructor(username: string, socket: Socket) {
    this.username = username;
    this.socket = socket;
  }

  sendMessage(data: { username: string; input: string }) {
    if (this.username !== data.username) {
      // Emit the message to the server
      this.socket.emit("message", data);
    }
  }
}

// export default User;