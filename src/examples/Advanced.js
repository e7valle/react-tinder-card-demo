import React, { useState,useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'

// ************added useEffect and teh following, to start adding real data to ea card:************ DONT NEED FOR PART2
// import Yelp from '../util/yelp';

// const db = [
//   {
//     name: 'Dough Zone',
//     url: `${process.env.PUBLIC_URL}/img/doughzone.jpeg`,
//     rating: 4.1,
//     price: '$$'
//   },
//   // {
//   //   name: 'Richard Hendricks',
//   //   url: './img/richard.jpg'
//   // },
//   {
//     name: 'Due Cucina',
//     url: `${process.env.PUBLIC_URL}/img/duecucina.jpeg`,
//     rating: 4.3,
//     price: '$$'
//   },
//   {
//     name: 'Crawfish King',
//     url: `${process.env.PUBLIC_URL}/img/crawfishking.jpeg`,
//     rating: 3.5,
//     price: '$$'
//   },
//   {
//     name: 'Chengdu Memory',
//     url: `${process.env.PUBLIC_URL}/img/chengdumemory.png`,
//     rating: 4.3,
//     price: '$$$'
//   },
//   {
//     name: 'Jacksons Catfish Corner',
//     url: `${process.env.PUBLIC_URL}/img/catfishcorner.jpeg`,
//     rating: 4.5,
//     price: '$$'
//   }
// ]

// function Advanced ({term, location, sortBy}) {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [lastDirection, setLastDirection] = useState('')
//   // used for outOfFrame closure
//   const currentIndexRef = useRef(currentIndex)

//   // **********trying to add real time data************
//   const [restaurants, setRestaurants] = useState([]);

//   useEffect(()=>{
//     async function fetchRestaurants() {
//       try {
//         const response = await Yelp.search(
//           term,
//           location,
//           sortBy
//         );
//         console.log("api response anita:", response)
//         setRestaurants(response);
//         setCurrentIndex(response.length - 1);
//       } catch (error) {
//         console.error('Anita Error fetching restaurants:', error);
//       }
//     }
//     fetchRestaurants();
//   }, [term, location, sortBy]);



//   // create an array of references for child components
//   const childRefs = useMemo(
//     () =>
//       Array(restaurants.length)
//         .fill(0)
//         .map((i) => React.createRef()),
//     []
//   )

//   const updateCurrentIndex = (val) => {
//     setCurrentIndex(val)
//     currentIndexRef.current = val
//   }

//   // these two const' calculate booleans to check if swiping  and going back are possible
//   const canGoBack = currentIndex < restaurants.length - 1

//   const canSwipe = currentIndex >= 0

// // this func handles swiping of cards
//   // set last direction and decrease current index
//   const swiped = (direction, nameToDelete, index) => {
//     setLastDirection(direction)
//     updateCurrentIndex(index - 1)
//   }

//   const outOfFrame = (name, idx) => {
//     console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
//     // handle the case in which go back is pressed before card goes outOfFrame
//     currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
//     // TODO: when quickly swipe and restore multiple times the same card,
//     // it happens multiple outOfFrame events are queued and the card disappear
//     // during latest swipes. Only the last outOfFrame event should be considered valid
//   }

//   // func to trigger the swipe action on a card
//   const swipe = async (dir) => {
//     if (canSwipe && currentIndex < restaurants.length) {
//       await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
//     }
//   }

//   // funct to go back to the previous card
//   // increase current index and show card
//   // const goBack = async () => {
//   //   if (!canGoBack) return
//   //   const newIndex = currentIndex + 1
//   //   updateCurrentIndex(newIndex)
//   //   await childRefs[newIndex].current.restoreCard()
//   // }

//   return (
//     <div>
//       <link
//         href='https://fonts.googleapis.com/css?family=Damion&display=swap'
//         rel='stylesheet'
//       />
//       <link
//         href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
//         rel='stylesheet'
//       />
//       <h1>TasteBuds</h1>
//       <div className='cardContainer'>
//         {restaurants.map((restaurant, index) => (
//           <TinderCard
//             ref={childRefs[index]}
//             className='swipe'
//             key={restaurant.id}
//             onSwipe={(dir) => swiped(dir, restaurant.name, index)}
//             onCardLeftScreen={() => outOfFrame(restaurant.name, index)}
//           >
//             <div
//               // style={{ backgroundImage: 'url(' + restaurant.url + ')' }}
//               style={{ backgroundImage: 'url(' + restaurant.imageSrc + ')' }}
//               className='card'
//             >
//               <div className='restContent'>
//                 <div className='transparentBlock'>
//                   <h3>{restaurant.name}</h3>
//                   <p>Rating: {restaurant.rating}</p>
//                   <p>Price: {restaurant.price}</p>
//                 </div>
//               </div>
//             </div>
//           </TinderCard>
//         ))}
//       </div>
//       <div className='buttons'>
//         <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Not my Flavor!</button>
//         {/* <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button> */}
//         <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Tastebud Approved!</button>
//       </div>
//       {lastDirection ? (
//         <h2 key={lastDirection} className='infoText'>
//           You swiped {lastDirection}
//         </h2>
//       ) : (
//         <h2 className='infoText'>
//           Swipe or click and decide together! 
//         </h2>
//       )}
//     </div>
//   )
// }

// export default Advanced


// ----------------This is the regular one, in case it breaks-----------------

// function Advanced () {
//   const [currentIndex, setCurrentIndex] = useState(db.length - 1)
//   const [lastDirection, setLastDirection] = useState()
//   // used for outOfFrame closure
//   const currentIndexRef = useRef(currentIndex)

//   // **********tring to add real time data************

//   // create an array of references for child components
//   const childRefs = useMemo(
//     () =>
//       Array(db.length)
//         .fill(0)
//         .map((i) => React.createRef()),
//     []
//   )

//   const updateCurrentIndex = (val) => {
//     setCurrentIndex(val)
//     currentIndexRef.current = val
//   }

//   // these two const' calculate booleans to check if swiping  and going back are possible
//   const canGoBack = currentIndex < db.length - 1

//   const canSwipe = currentIndex >= 0

// // this func handles swiping of cards
//   // set last direction and decrease current index
//   const swiped = (direction, nameToDelete, index) => {
//     setLastDirection(direction)
//     updateCurrentIndex(index - 1)
//   }

//   const outOfFrame = (name, idx) => {
//     console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
//     // handle the case in which go back is pressed before card goes outOfFrame
//     currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
//     // TODO: when quickly swipe and restore multiple times the same card,
//     // it happens multiple outOfFrame events are queued and the card disappear
//     // during latest swipes. Only the last outOfFrame event should be considered valid
//   }

//   // func to trigger the swipe action on a card
//   const swipe = async (dir) => {
//     if (canSwipe && currentIndex < db.length) {
//       await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
//     }
//   }

//   // funct to go back to the previous card
//   // increase current index and show card
//   // const goBack = async () => {
//   //   if (!canGoBack) return
//   //   const newIndex = currentIndex + 1
//   //   updateCurrentIndex(newIndex)
//   //   await childRefs[newIndex].current.restoreCard()
//   // }

//   return (
//     <div>
//       <link
//         href='https://fonts.googleapis.com/css?family=Damion&display=swap'
//         rel='stylesheet'
//       />
//       <link
//         href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
//         rel='stylesheet'
//       />
//       <h1>TasteBuds</h1>
//       <div className='cardContainer'>
//         {db.map((character, index) => (
//           <TinderCard
//             ref={childRefs[index]}
//             className='swipe'
//             key={character.name}
//             onSwipe={(dir) => swiped(dir, character.name, index)}
//             onCardLeftScreen={() => outOfFrame(character.name, index)}
//           >
//             <div
//               style={{ backgroundImage: 'url(' + character.url + ')' }}
//               className='card'
//             >
//               <div className='restContent'>
//                 <div className='transparentBlock'>
//                   <h3>{character.name}</h3>
//                   <p>Rating: {character.rating}</p>
//                   <p>Price: {character.price}</p>
//                 </div>
//               </div>
//             </div>
//           </TinderCard>
//         ))}
//       </div>
//       <div className='buttons'>
//         <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Not my Flavor!</button>
//         {/* <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button> */}
//         <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Tastebud Approved!</button>
//       </div>
//       {lastDirection ? (
//         <h2 key={lastDirection} className='infoText'>
//           You swiped {lastDirection}
//         </h2>
//       ) : (
//         <h2 className='infoText'>
//           Swipe or click and decide together! 
//         </h2>
//       )}
//     </div>
//   )
// }

// export default Advanced

// PART 22222222

function Advanced ({ businesses  }) {
  console.log("Received businesses:", businesses);
  const [currentIndex, setCurrentIndex] = useState(businesses.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  // **********tring to add real time data************

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
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

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
    </div>
  )
}

export default Advanced
