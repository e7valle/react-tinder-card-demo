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

  // THIIISSS works!!!!!
  // return (
  //   <Router>
  //     <div className="App">
  //       <h1>TasteBuds</h1>
  //       <SearchBar searchYelp={searchYelp} />
  //       <Routes>
  //         <Route
  //           path="/"
  //           element={<Advanced businesses={businesses} />} // Pass businesses here
  //         />
  //       </Routes>
  //     </div>
  //   </Router>
  // );

  // ^^^^^^^^^^^^^THIS ACTAULLY TAKES YOU TO A DIFF PAGE BUT WITH NO CARDS
  return (
    <Router>
      <div>
        <h1>Tastebudssssss in App.js</h1>
        <Routes>
          <Route 
            path="/" 
            element={<SearchBar searchYelp={searchYelp} />} 
          />
          <Route 
            path="/advanced" 
            element={<Advanced businesses={businesses} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}
export default App;



