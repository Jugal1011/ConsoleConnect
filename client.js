const socketIo = require("socket.io-client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = socketIo("http://localhost:8000"); // Replace with your server URL

let username, roomId;

rl.question("Enter your username: ", (name) => {
  username = name;
  rl.question("Enter chat room ID: ", (id) => {
    roomId = id;

    socket.emit("create-or-join-room", roomId, username);

    socket.on("room-created", () => {
      console.log(`Joined room ${roomId}`);
    });

    socket.on("user-joined", (user) => {
      console.log(`${user} joined the room.`);
    });

    socket.on("user-left", (user) => {
      console.log(`${user} left the room.`);
    });

    socket.on("message", (data) => {
      const message = `[${data.username}] : [${data.input}]`;
      // Get the terminal's width
      const terminalWidth = process.stdout.columns;
      // Calculate the number of spaces needed to align the message to the right
      const numSpaces = terminalWidth - message.length;
      // Create a string with the calculated number of spaces
      const padding = " ".repeat(Math.max(numSpaces, 0));
      // Print the message with the padding to align it to the right
      console.log(padding + message);
    });

    rl.on("line", (input) => {
      console.log(`[You] : [${input}]`);
      socket.emit("send-message", {
        input: input,
        username: username,
        roomId: roomId,
      });
    });
  });
});