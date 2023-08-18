
# Project Name: Tastebuds

A react application that lets friends decide where to eat, when no one can decide where to eat! One user creates a session and enters in the cuisine type, location, radius and price range option and can share the code with their friends. On their own device, each friend can swipe left or right to vote for each restaurant. Finally, you'll be directed to the results page showcasing the most voted restaurant. 

## To install 
On Local network:
1. Ensure Node.js is installed
2. Install the dependences:
    `npm install`
    `npm install socket.io socket.io-client express`
4. Start the server: `node server.js`
5. Run the client: `npm start`

### Setup
1. Ensure devices are on a local network, or that the application server(where you deployed) is accessable by those devices.
2. Start the Tastebuds application 
3. Visit http://your.ip.address:8080 on a PC, Tablet, SmartTV or other large screen device
4. Click CREATE
5. On a mobile device, visit http://your.ip.address:8080
6. Click JOIN on the mobile device screen.
7. Follow the on-screen instructions to join a game.
8. Find a tastebud/s and have him/her/other repeat steps 5-7 on another mobile device.

### Session 
1. On the creator screen (the Session Host), parameters for restaurants will appear, zip, radius, location, prices and cuisine type. Submit and session will begin.
2. Session host sends the unique to their tastbuds.
3. Tastbuds click 'join' and enter in the unique code.
4. On each users' screen, 5 cards will appear populated with restaurants. Card displays address, price and rating. 
5. After each card is swiped, the card with the most likes will be chosen as winner.

## Try the demo

![](demo.gif)

Try the demo on the gh-pages site [here!](https://3djakob.github.io/react-tinder-card-demo/)

## The code

Feel free to check out the code in [react-tinder-card-demo/src/examples](https://github.com/3DJakob/react-tinder-card-demo/tree/master/src/examples) for a usage example of how this application uses the module.

### Simple
The simple example is the minimum code needed to get you started.

### Advanced
The advanced example implements a state with references to swipe and restore cards using buttons.

## Demo
Both code examples can be tested on the [demo page.](https://3djakob.github.io/react-tinder-card-demo/)
