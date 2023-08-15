import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import randomCodeGenerator from '../util/randomCodeGenerator'
import io from 'socket.io-client';

const Homepage = () => {
    const [roomCode, setRoomCode] = useState('');
    const [socket, setSocket] = useState(null);
    const [privateRoomCode, setPrivateRoomCode] = useState(null);
    

    useEffect(() => {
        //connect to socket if it doesn't exist
        if (!socket) {
            const newSocket = io('http://localhost:3001'); 
            setSocket(newSocket);
            
            // Clean up the socket connection on component unmount
            return () => {
                newSocket.disconnect();
            };
        }
    }, [socket]); 

    const handleJoinGame = () => {
        if (socket && roomCode) {
            socket.emit('join', { roomCode }, (error) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(`Joining game with code: ${roomCode}`);
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
                }
            });
        }
    };

    return (
        <div className='Homepage'>
            <div className='homepage-menu'>
                <div className='homepage-form'>
                    <div className='homepage-join'>
                        <input type='text' placeholder='Game Code' onChange={(event) => setRoomCode(event.target.value)} />
                        <Link to={`/play?roomCode=${privateRoomCode}`}><button className="game-button green" onClick={handleJoinGame}>JOIN GAME</button></Link>
                    </div>
                    <h1>OR</h1>
                    <div className='homepage-create'>
                        <Link to={`/play?roomCode=${privateRoomCode}`}><button className="game-button orange" onClick={handleCreateGame}>CREATE GAME</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Homepage;
