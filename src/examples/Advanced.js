import React, { useState, useMemo, useRef, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import Yelp from '../../src/util/yelp'; // Import your Yelp module
import { useLocation } from 'react-router-dom';

function Advanced() {
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [businesses, setBusinesses] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);
  const childRefs = useMemo(
    () =>
      Array(businesses.length)
        .fill(0)
        .map(() => React.createRef()),
    [businesses.length]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBusinesses = await Yelp.search(
          location.state.term,
          location.state.location,
          location.state.sortBy
        );
        setBusinesses(fetchedBusinesses);
      } catch (error) {
        console.error('Error fetching data from Yelp:', error);
      }
    };
  
    fetchData();
  }, [location.state]);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0 && currentIndex < businesses.length;

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index + 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // Handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: Handle when quickly swipe and restore multiple times the same card
  };

  const swipe = async (dir) => {
    if (canSwipe) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  return (
    <div>
      <h1>TasteBuds</h1>
      <div className="cardContainer">
        {businesses.map((business, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={business.id}
            onSwipe={(dir) => swiped(dir, business.id, index)}
            onCardLeftScreen={() => outOfFrame(business.id, index)}
          >
            <div
              style={{ backgroundImage: `url(${business.imageSrc})` }}
              className="card"
            >
              <div className="restContent">
                <div className="transparentBlock">
                  <h3>{business.name}</h3>
                  <p>Rating: {business.rating}</p>
                  <p>Price: {business.price}</p>
                </div>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="buttons">
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>
          Not my Flavor!
        </button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>
          Tastebud Approved!
        </button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">Swipe or click and decide together!</h2>
      )}
    </div>
  );
}

export default Advanced;
