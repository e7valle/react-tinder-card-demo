const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

// Create Express app and server
const app = express();
const server = http.createServer(app);

// Create a Socket.IO instance and attach it to the server
const io = socketIO(server);

// Function to generate a unique room code
function generateRoomCode() {
    // Implement your code generation logic here
    // Return a unique room code
}

// Event handlers for Socket.IO connections and events
io.on("connection", (socket) => {
    if (socket.handshake.headers.referer === "http://localhost:3001/") {
        console.log("User connected:", socket.id);

        // Function to create a new game room
        function hostCreateNewGame(socket) {
            const thisGameId = generateRoomCode(); // Generate a unique room code
            const mySocketId = socket.id;
            socket.join(thisGameId.toString()); // Join the room with the generated code
            return { gameId: thisGameId, mySocketId };
        }

        // Event to create a room and emit the generated code
        socket.on("createGame", () => {
            const { gameId, mySocketId } = hostCreateNewGame(socket);
            socket.emit("newGameCreated", { gameId, mySocketId });
        });

        // Event to start a search in the specified room
        socket.on("startSearch", ({ roomCode, term, location, sortBy }) => {
            socket.to(roomCode).emit("searchStarted", { term, location, sortBy });
        });
    }
});

// Start the server on a specific port
const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
