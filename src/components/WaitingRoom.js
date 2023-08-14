import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const WaitingPage = () => {
    const { username, roomCode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const delay = setTimeout(() => {
            navigate(`/searchbar/${roomCode}`);
        }, 3000); // Change the delay time as needed

        return () => clearTimeout(delay);
    }, [roomCode, navigate]);

    return (
        <div>
            <h1>Waiting to Connect</h1>
            <p>Connecting as {username} to room {roomCode}</p>
        </div>
    );
};

export default WaitingPage;
