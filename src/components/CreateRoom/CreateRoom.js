// CreateRoom.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

function CreateRoom() {
    const navigate = useNavigate();
    const [roomCode, setRoomCode] = useState('');

    const handleCreateRoom = () => {
        const generatedCode = uuidv4(); // Generate a unique code
        setRoomCode(generatedCode);
        navigate(`/search/${generatedCode}`); // Route to SearchBar with the code
    };

    return (
        <div>
        <h1>Create Room</h1>
        <button onClick={handleCreateRoom}>Create Room</button>
        {roomCode && <p>Your room code: {roomCode}</p>}
        </div>
    );
}

export default CreateRoom;
