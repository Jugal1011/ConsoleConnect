"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(username, socket) {
        this.username = username;
        this.socket = socket;
    }
    sendMessage(data) {
        if (this.username !== data.username) {
            // Emit the message to the server
            this.socket.emit("message", data);
        }
    }
}
exports.default = User;
// export default User;
