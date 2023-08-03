import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'

const db = [
  {
    name: 'Dough Zone',
    url: `${process.env.PUBLIC_URL}/img/doughzone.jpeg`,
    rating: 4.1,
    price: '$$'
  },
  // {
  //   name: 'Richard Hendricks',
  //   url: './img/richard.jpg'
  // },
  {
    name: 'Due Cucina',
    url: `${process.env.PUBLIC_URL}/img/duecucina.jpeg`,
    rating: 4.3,
    price: '$$'
  },
  {
    name: 'Crawfish King',
    url: `${process.env.PUBLIC_URL}/img/crawfishking.jpeg`,
    rating: 3.5,
    price: '$$'
  },
  {
    name: 'Chengdu Memory',
    url: `${process.env.PUBLIC_URL}/img/chengdumemory.png`,
    rating: 4.3,
    price: '$$$'
  },
  {
    name: 'Jacksons Catfish Corner',
    url: `${process.env.PUBLIC_URL}/img/catfishcorner.jpeg`,
    rating: 4.5,
    price: '$$'
  }
]

function Advanced () {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  // create an array of references for child components
  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  // these two const' calculate booleans to check if swiping  and going back are possible
  const canGoBack = currentIndex < db.length - 1

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
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // funct to go back to the previous card
  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

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
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: 'url(' + character.url + ')' }}
              className='card'
            >
              <h3>{character.name}</h3>
              <p>Rating: {character.rating}</p>
              <p>Price: {character.price}</p>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Hail No!</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Yum!</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  )
}

export default Advanced
