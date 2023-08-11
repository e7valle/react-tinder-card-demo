import React, { useState,useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'


function Advanced ({ businesses  }) {
  console.log("Received businesses:", businesses);
  const [currentIndex, setCurrentIndex] = useState(businesses.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const [swipedRestaurants, setSwipedRestaurants] = useState({});

  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)


  // create an array of references for child components
  const childRefs = useMemo(
    () =>
      Array(businesses.length)
        .fill(0)
        .map((i) => React.createRef()),
    [businesses.length]
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  // these two const' calculate booleans to check if swiping  and going back are possible
  const canGoBack = currentIndex < businesses.length - 1

  const canSwipe = currentIndex >= 0

// this func handles swiping of cards
  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    console.log('nameToDelete: ', nameToDelete);
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    if (direction === 'right') {
      setSwipedRestaurants((prevSwipedRestaurants)=>({
        ...prevSwipedRestaurants,
        [nameToDelete]: (prevSwipedRestaurants[nameToDelete] || 0) + 1,
      }));
    }
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  // func to trigger the swipe action on a card
  const swipe = async (dir) => {
    if (canSwipe && currentIndex < businesses.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // funct to go back to the previous card
  // increase current index and show card
  // const goBack = async () => {
  //   if (!canGoBack) return
  //   const newIndex = currentIndex + 1
  //   updateCurrentIndex(newIndex)
  //   await childRefs[newIndex].current.restoreCard()
  // }

  return (
    <div>
      <link
        href='https://fonts.googleapis.com/css?family=Damion&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
        rel='stylesheet'
      />
      <h1>TasteBuds</h1>
      <div className='cardContainer'>
        {businesses.map((business, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={business.id}
            onSwipe={(dir) => swiped(dir, business.name, index)}
            onCardLeftScreen={() => outOfFrame(business.name, index)}
          >
            <div
              // style={{ backgroundImage: 'url(' + business.url + ')' }}
              style={{ backgroundImage: 'url(' + business.imageSrc + ')' }}
              className='card'
            >
              <div className='restContent'>
                <div className='transparentBlock'>
                  <h3>{business.name}</h3>
                  <p>Rating: {business.rating}</p>
                  <p>Price: {business.price}</p>
                  {/* <p>Address:{business.location.address1} </p> */}
                </div>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Not my Flavor!</button>
        {/* <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button> */}
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Tastebud Approved!</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe or click and decide together! 
        </h2>
      )}
      <div className='swiped-restuarants'>
        <h2>Swiped Restaurants:</h2>
        <ul>
          {Object.entries(swipedRestaurants).map(([restaurant, count])=>(
            <li key={restaurant}>
              {restaurant}: {count} times
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Advanced
