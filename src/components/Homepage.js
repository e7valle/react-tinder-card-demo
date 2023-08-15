import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import randomCodeGenerator from '../util/randomCodeGenerator'
import io from 'socket.io-client';

const Homepage = () => {
    const [roomCode, setRoomCode] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Create a new Socket.io instance and connect to the server only if socket doesn't exist
        if (!socket) {
            const newSocket = io('http://localhost:3001'); // Change the URL to match your server's address
            setSocket(newSocket);

            // Clean up the socket connection on component unmount
            return () => {
                newSocket.disconnect();
            };
        }
    }, [socket]); 

    const handleJoinGame = () => {
        if (socket) {
            // Emit a joinGame event to the server using the socket instance
            socket.emit('join', { room: roomCode }, (error) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(`Joining game with code: ${roomCode}`);
                }
            });
        }
    };

    const handleCreateGame = () => {
        const generatedCode = randomCodeGenerator(5);
        if (socket) {
            // Emit a createGame event to the server using the socket instance
            socket.emit('createGame', { room: generatedCode }, (error) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(`Creating game with code: ${generatedCode}`);
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
                        <Link to={`/play?roomCode=${roomCode}`}><button className="game-button green" onClick={handleJoinGame}>JOIN GAME</button></Link>
                    </div>
                    <h1>OR</h1>
                    <div className='homepage-create'>
                        <Link to={`/play?roomCode=${randomCodeGenerator(5)}`}><button className="game-button orange" onClick={handleCreateGame}>CREATE GAME</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;
