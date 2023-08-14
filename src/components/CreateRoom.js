import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateRoom = ({ setRoomCode }) => {
    const navigate = useNavigate();
    const [roomCode, setRoomCodeState] = useState('');

    const generateRandomCode = () => {
        const code = Math.floor(Math.random() * 100000).toString();
        setRoomCodeState(code);
    };

    const handleCreate = () => {
        generateRandomCode();
        setRoomCode(roomCode); // Set the roomCode in App.js state
        navigate('/searchbar'); // Navigate to SearchBar
    };

    return (
        <div>
        <h1>Create a Room</h1>
        <button onClick={handleCreate}>Create</button>
        </div>
    );
    };

    export default CreateRoom;
