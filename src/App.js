import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'; // Update this import
import SearchBar from './components/SearchBar/SearchBar';
import Advanced from './examples/Advanced';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/advanced" element={<Advanced />} />
      </Routes>
    </Router>
  );
}

export default App;


