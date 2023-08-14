import React from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function LandingPage() {
    const handleCreateRoom = () => {
        socket.emit("createRoom", (generatedCode) => {
        // Navigate to SearchBar with generated code
        window.location.href = `/search/${generatedCode}`;
        });
    };

    return (
        <div>
        <h1>Welcome to TasteBuds</h1>
        <button onClick={handleCreateRoom}>Create Room</button>
        <Link to="/join">Join Room</Link>
        </div>
    );
}

export default LandingPage;
