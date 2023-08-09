// // import React, { useState } from 'react'
// import './App.css'
// // import Switch from 'react-ios-switch'

// // import Advanced from './examples/Advanced'
// // import Simple from './examples/Simple'

// import SearchBar from './components/SearchBar/SearchBar';

// function App() {
//   return (
//     <div className='app'>
//         <SearchBar />
//         {/* <Advanced /> */}
//     </div>
//   );
// }

// export default App;

// import React from "react";
// import { Route } from "react-router-dom";
// import SearchBar from "./components/SearchBar/SearchBar";
// import Advanced from "./examples/Advanced";
// import "./App.css";

// function App() {
//   return (
//     <div className="app">
//       <Route exact path="/" component={SearchBar} />
//       <Route path="/advanced" component={Advanced} />
//     </div>
//   );
// }

// export default App;

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


