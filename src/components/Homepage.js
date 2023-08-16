import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import randomCodeGenerator from '../util/randomCodeGenerator'
import socket from './socket'

import './Homepage.css';

const Homepage = () => {
    const [roomCode, setRoomCode] = useState('');
    const [privateRoomCode, setPrivateRoomCode] = useState(null);
    const navigate = useNavigate();

    const handleJoinGame = () => {
        if (socket && roomCode) {
            socket.emit('join', { roomCode }, (error) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(`Joining game with code: ${roomCode}`);
                    navigate(`/play?roomCode=${roomCode}`);
                }
            });
        }
    };

    const handleCreateGame = () => {
        console.log("handleCreateGame function called",socket);
        if (socket) {
            // Emit a createGame event to the server using the socket instance
            socket.emit('createGame', (error, privateRoomCode) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(`Creating game with code: ${privateRoomCode}`);
                    setRoomCode(privateRoomCode);
                    console.log("Room code state set:", privateRoomCode);
                    navigate(`/play?roomCode=${privateRoomCode}`);
                }
            });
        }
    };

    return (
        <div className='HomePage'>
            <div className='homepage-menu'>
                <div className='homepage-form'>
                    <div className='homepage-join'>
                        <input type='text' placeholder='Game Code' onChange={(event) => setRoomCode(event.target.value)} />
                        <button className="btn1" onClick={handleJoinGame}>JOIN SESH</button>
                    </div>
                    <h1>OR</h1>
                    <div className='homepage-create'>
                        <button className="btn1" onClick={handleCreateGame}>CREATE SESH</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Homepage;
