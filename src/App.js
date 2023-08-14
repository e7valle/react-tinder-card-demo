import React, { useState } from "react";
import "./App.css";
import io from 'socket.io-client';
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import Advanced from "./examples/Advanced";
import SearchBar from "./components/SearchBar/SearchBar";
import Yelp from "./util/yelp";
import ResultsPage from "../src/components/ResultsPage/ResultsPage";
import LandingPage from '../src/components/LandingPage';

// Create a Socket.IO instance and connect to the server
const socket = io('http://localhost:3001'); 

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [roomCode, setRoomCode] = useState(""); // To store the room code
  const [swipedRestaurants, setSwipedRestaurants] = useState({})

  // Function to handle room creation
  const handleCreateRoom = () => {
    // Emit a 'createRoom' event to the server
    socket.emit('createRoom', (generatedCode) => {
      setRoomCode(generatedCode);
    });
  };

  // Function to handle joining a room
  const handleJoinRoom = (code) => {
    setRoomCode(code);
  };

  // Function to initiate Yelp search
  const searchYelp = (term, location, sortBy) => {
    Yelp.search(term, location, sortBy).then((fetchedBusinesses) => {
      setBusinesses(fetchedBusinesses);
    });
  };

  return (
    <Router>
      <div>
        <h1>Tastebudssssss in App.js</h1>
        <Routes>
          <Route 
            path="/" 
            element={<LandingPage handleCreateRoom={handleCreateRoom} handleJoinRoom={handleJoinRoom} />} />
          <Route 
            path="/search" 
            element={<SearchBar searchYelp={searchYelp} />} 
          />
          <Route 
            path="/advanced" 
            element={<Advanced businesses={businesses} swipedRestaurants={swipedRestaurants} setSwipedRestaurants={setSwipedRestaurants} />} 
          />
          <Route 
            path='/results/:swipedRestaurants' element={<ResultsPage  />} /> 
        </Routes>
      </div>
    </Router>
  );
}
export default App;
