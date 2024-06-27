const express = require("express");
const path = require("path");
const app = express();
const cors = require('cors');

app.use(cors({
    origin: (origin, callback) => {
        callback(null, true);
    },
    credentials: true,
}));

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: '*',
    }
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "/public")));

// Handle WebSocket connections
io.on("connection", function (socket) {
    // When a new user joins
    socket.on("newuser", function (username) {
        console.log("new user joined", username)
        socket.broadcast.emit("update", username + " joined the conversation");
    });

    // When a user exits
    socket.on("exituser", function (username) {
        socket.broadcast.emit("update", username + " left the conversation");
    });

    // When a user sends a chat message
    socket.on("chat", function (message) {
        console.log("new message", message);
        socket.broadcast.emit("chat", message);
    });
});

// Start the server on port 5000
server.listen(8001, function () {
    console.log('Server listening for Quantum');
});
