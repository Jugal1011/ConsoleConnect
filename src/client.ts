import socketIo from "socket.io-client";
import readline  from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const socket = socketIo("https://real-time-chat-app-itlm.onrender.com");

// Define types for username and roomId
let username: string;
let roomId: string;

const alignCenter = (message: string): string  => {
  // Get the terminal's width
  const terminalWidth = process.stdout.columns;
  // Calculate the number of spaces needed to align the message in between
  const numSpaces = terminalWidth / 2 - message.length / 2;
  // Create a string with the calculated number of spaces
  const padding = " ".repeat(Math.max(numSpaces, 0));
  return padding + message;
};

const alignRight = (message: string): string => {
  // Get the terminal's width
  const terminalWidth = process.stdout.columns;
  // Calculate the number of spaces needed to align the message to the right
  const numSpaces = terminalWidth - message.length;
  // Create a string with the calculated number of spaces
  const padding = " ".repeat(Math.max(numSpaces, 0));
  return padding + message;
};

// Function to handle disconnection from server
const handleDisconnect = (reason: string, user: string | null): void=> {
  if (reason === "server") {
    const message = "Server has been closed.";
    const alignedMessage = alignCenter(message);
    console.log(alignedMessage);
    // Close the readline interface (user's input stream)
    rl.close();
    // Wait for a short delay to ensure cleanup completion (if needed)
    setTimeout(() => {
      // Exit the client process if the flag is set
      process.exit(0);
    }, 1000); // Adjust the delay as needed for cleanup to complete
  }
  else if (reason === "user") {
    const message = `${user} left the room.`;
    const alignedMessage = alignCenter(message);
    console.log(alignedMessage);
    // Perform actions or logic specifically for user disconnection
  } else {
    console.log("Disconnected from the server for an unknown reason.");
    // Perform default actions or logic for unknown disconnection reasons
  }
};


console.log(alignCenter("✨  Welcome to Console Connect App ✨"));
console.log(alignCenter("Easy to use console based chat app for creating and joining rooms"));
console.log(alignCenter("Made With ❤️  By Jugal Soni"));
rl.question("Enter your username :- ", (name) => {
  username = name;
  rl.question("To create or join chat room enter chat room ID :- ", (id) => {
    roomId = id;

    socket.emit("create-or-join-room", roomId, username);

    socket.on("room-created", () => {
      const message = `Joined room ${roomId}`;
      const alignedMessage = alignCenter(message);
      console.log(alignedMessage);
    });

    socket.on("user-joined", (user) => {
      const message = `${user} joined the room.`;
      const alignedMessage = alignCenter(message);
      console.log(alignedMessage);
    });

    socket.on("user-left", (user) => {
      handleDisconnect("user", user);
    });

    socket.on("message", (data) => {
      const message = `[${data.username}] -> [${data.input}]`;
      const alignedMessage = alignRight(message);
      console.log(alignedMessage);
    });

    socket.on("username-exists", (existingUsername) => {
      const message = `Username '${existingUsername}' already exists. Please choose a different username.`;
      const alignedMessage = alignCenter(message);
      console.log(alignedMessage);
      rl.close();
      setTimeout(() => {
        // Exit the client process if the flag is set
        process.exit(0);
      }, 1000);
    });

    socket.on("server-stopping", () => {
      handleDisconnect("server", null);
    });

    rl.on("line", (input) => {
      console.log(`[You] -> [${input}]`);
      socket.emit("send-message", {
        input: input,
        username: username,
        roomId: roomId,
      });
    });
  });
});
