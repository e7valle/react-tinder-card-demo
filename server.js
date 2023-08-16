const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')
const path = require('path')

const PORT = process.env.PORT || 3001

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
    autoConnect: false,
    cors: {
        origin: "*", 
        methods: ["GET", "POST"],
        allowedHeaders: ['Access-Control-Allow-Origin'],
        credentials: false
    }
});

app.use(cors())
const privateRooms = new Map();

io.on("connection", socket => {
    console.log(`Client ${socket.id} connected`);

    socket.on('join', (payload, callback) => {
        console.log(`Client ${socket.id} joined room ${payload.roomCode}`);
    
        const room = privateRooms.get(payload.roomCode);
        if (!room) {
            return callback('Invalid private room code');
        }
    
        let numberOfUsersInRoom = getUsersInRoom(payload.roomCode).length;
    
        const { error, newUser } = addUser({
            id: socket.id,
            name: numberOfUsersInRoom === 0 ? 'Player 1' : 'Player 2',
            room: payload.roomCode
        });
    
        if (error)
            return callback(error);
    
        socket.join(newUser.room);
    
        io.to(newUser.room).emit('roomData', { room: newUser.room, users: getUsersInRoom(newUser.room) });
        socket.emit('currentUserData', { name: newUser.name });
        callback();
    });

    socket.on('createGame', (callback) => {
        console.log("createGame event triggered");
        const newPrivateRoomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        const newRoomName = 'RoomName'; 

        privateRooms.set(newPrivateRoomCode, newRoomName);
        console.log(`New private room created: ${newPrivateRoomCode}`);

        callback(null, newPrivateRoomCode); // Send the private room code back to the client
    });


    socket.on('initGameState', gameState => {
        const user = getUser(socket.id)
        if(user)
            io.to(user.room).emit('initGameState', gameState)
    })

    socket.on('updateGameState', gameState => {
        const user = getUser(socket.id)
        if(user)
            io.to(user.room).emit('updateGameState', gameState)
    })

    socket.on('sendMessage', (payload, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', {user: user.name, text: payload.message})
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if(user)
            io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
    })
})

//serve static assets in production
if(process.env.NODE_ENV === 'production') {
	//set static folder
	app.use(express.static('src/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'src', 'build', 'index.html'))
	})
}

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})