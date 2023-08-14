import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JoinRoom() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [code, setCode] = useState('');

    const handleJoin = () => {
        // Implement the logic to handle joining the session
        // This could include sending the username and code to a server
        // and displaying a message that the user is waiting to enter
        navigate('/waiting');
    };

    return (
        <div>
        <h1>Join a Room</h1>
        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Room Code"
        />
        <button onClick={handleJoin}>Join</button>
        </div>
    );
}

export default JoinRoom;
