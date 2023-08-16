import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Advanced from "./examples/Advanced";
import SearchBar from "./components/SearchBar/SearchBar";
import Yelp from "./util/yelp";
import Homepage from "./components/Homepage";

// You can listen to socket events from the app, too
import socket from "./components/socket";

//**********for rendering a different page
// import LikedResults from "./components/LikedResults/LikedResults";
import ResultsPage from "./components/ResultsPage/ResultsPage";

function App() {
  const [businesses, setBusinesses] = useState([]);

  //********for rendering a difff page
  // const [likedRestaurants, setLikedRestaurants] = useState({});
  const [swipedRestaurants, setSwipedRestaurants] = useState({});
  const [currentPrivateRoomCode, setCurrentPrivateRoomCode] = useState(null); 

  const searchYelp = (term, location, sortBy, price, radius) => {
    Yelp.search(term, location, sortBy, price, radius).then((fetchedBusinesses) => {
      setBusinesses(fetchedBusinesses);
    });
  };

  useEffect(() => {
    // Register for socket events in here.
    // See remarks docs page: https://socket.io/how-to/use-with-react#remarks-about-the-useeffect-hook
  }, [])

  return (
    <Router>
      <div>
        {/* <h1>Tastebuds</h1> */}
        <Routes>
          <Route 
            path="/" 
              element={<Homepage setCurrentPrivateRoomCode={setCurrentPrivateRoomCode}/>} // Render the HomePage component at the root path
            />
            <Route 
              path="/play" 
              element={<SearchBar searchYelp={searchYelp} privateRoomCode={currentPrivateRoomCode}/>} // Render the SearchBar component at the /search path
          />
          <Route 
            path="/advanced" 
            element={<Advanced businesses={businesses} swipedRestaurants={swipedRestaurants} setSwipedRestaurants={setSwipedRestaurants} />} 
          />
          <Route 
              path='/results/:swipedRestaurants' 
              element={<ResultsPage />} 
            />
        </Routes>
      </div>
    </Router>
  );
}
export default App;


