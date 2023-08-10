// import React, {useState} from 'react';
// import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'; // Update this import
// import SearchBar from './components/SearchBar/SearchBar';
// import Advanced from './examples/Advanced';
// import './App.css';
// // More breaking stuff pt 2
// import Yelp from './util/yelp';

// function App() {
//   // changing to pass states
//   // const [term, setTerm] = useState('');
//   // const [location, setLocation] = useState('');
//   // const [sortBY, setSortBy] = useState('best_match');

//   // part two:
//   const [businesses, setBusinesses] = useState([])

//   const searchYelp = (term, location, sortBy) => {
//     Yelp.search(term, location, sortBy).then((fetchedBusinesses)=>{
//       setBusinesses(fetchedBusinesses);
//     });
//   };

//   // return (
//   //   <Router>
//   //     <Routes>
//   //       <Route 
//   //       path="/" 
//   //       element={<SearchBar setTerm={setTerm} setLocation={setLocation} setSortBy={setSortBy} />} 
//   //       />
//   //       <Route 
//   //       path="/advanced" 
//   //       element={<Advanced term={term} location={location} sortBy={sortBY} />} 
//   //       />
//   //     </Routes>
//   //   </Router>
//   // );


//   // For part 2
//   return (
//     <Router>
//       <div className="App">
//         <h1>TasteBuds</h1>
//         <SearchBar searchYelp={searchYelp} />
//         <Routes>
//           <Route path="/" element={<Advanced businesses={businesses} />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


// For part 2222:
import React, { useState } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Advanced from "./examples/Advanced";
import SearchBar from "./components/SearchBar/SearchBar";
import Yelp from "./util/yelp";

function App() {
  const [businesses, setBusinesses] = useState([]);

  const searchYelp = (term, location, sortBy) => {
    Yelp.search(term, location, sortBy).then((fetchedBusinesses) => {
      setBusinesses(fetchedBusinesses);
    });
  };

  return (
    <Router>
      <div className="App">
        <h1>TasteBuds</h1>
        <SearchBar searchYelp={searchYelp} />
        <Routes>
          <Route
            path="/"
            element={<Advanced businesses={businesses} />} // Pass businesses here
          />
        </Routes>
      </div>
    </Router>
  );
}
export default App;

//   return (
//   <Router>
//     <Routes>
//       <Route 
//       path="/" 
//       element={<SearchBar />} 
//       />
//       <Route 
//       path="/advanced" 
//       element={<Advanced busnesses={businesses} />} 
//       />
//     </Routes>
//   </Router>
// );

