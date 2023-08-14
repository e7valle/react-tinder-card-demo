import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JoinRoom() {
    const navigate = useNavigate();
    const [roomCode, setRoomCode] = useState('');
    const [username, setUsername] = useState('');

    const handleJoinRoom = () => {
        navigate(`/search/${roomCode}/${username}`); // Route to SearchBar with the code and username
    };

    return (
        <div>
        <h1>Join Room</h1>
        <input
            type="text"
            placeholder="Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
        />
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleJoinRoom}>Join Room</button>
        </div>
    );
}

export default JoinRoom;
