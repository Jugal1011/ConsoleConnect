const socketIo = require("socket.io-client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false, // Disable echoing
});

const socket = socketIo("http://localhost:8000"); // Replace with your server URL

let username, roomId;

const alignCenter=(message)=>{
  // Get the terminal's width
  const terminalWidth = process.stdout.columns;
  // Calculate the number of spaces needed to align the message in between
  const numSpaces = (terminalWidth/2) - (message.length/2);
  // Create a string with the calculated number of spaces
  const padding = " ".repeat(Math.max(numSpaces, 0));
  return padding+message;
}

const alignRight=(message)=>{
  // Get the terminal's width
  const terminalWidth = process.stdout.columns;
  // Calculate the number of spaces needed to align the message to the right
  const numSpaces = terminalWidth - message.length;
  // Create a string with the calculated number of spaces
  const padding = " ".repeat(Math.max(numSpaces, 0));
  return padding+message;
}

rl.question("Enter your username: ", (name) => {
  username = name;
  rl.question("To create or join chat room enter chat room ID: ", (id) => {
    roomId = id;

    socket.emit("create-or-join-room", roomId, username);

    socket.on("room-created", () => {
      const message = `Joined room ${roomId}`;
      const alignedMessage=alignCenter(message);
      console.log(alignedMessage);
    });

    socket.on("user-joined", (user) => {
      const message = `${user} joined the room.`
      const alignedMessage=alignCenter(message);
      console.log(alignedMessage);
    });

    socket.on("user-left", (user) => {
      const message = `${user} left the room.`;
      const alignedMessage=alignCenter(message);
      console.log(alignedMessage);
    });

    socket.on("message", (data) => {
      const message = `[${data.username}] : [${data.input}]`;
      const alignedMessage=alignRight(message);
      console.log(alignedMessage);
    });

    socket.on("username-exists", (existingUsername) => {
      const message = `Username '${existingUsername}' already exists. Please choose a different username.`;
      const alignedMessage=alignCenter(message);
      console.log(alignedMessage);
      rl.close();
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