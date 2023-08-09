import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar'; // Import your SearchBar component
import Advanced from './examples/Advanced'; // Import the Advanced (Tinder card) component


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<SearchBar />} />
        <Route path="/Advanced" element={<Advanced />} />
      </Routes>
    </Router>
  );
}

export default App;

// // import React, { useState } from 'react'
// import './App.css'
// // import Route from 'react-ios-Route'

// import Advanced from './examples/Advanced'
// // import Simple from './examples/Simple'

// function App() {
//   return (
//     <div className='app'>
//       <Advanced />
//     </div>
//   );
// }

// export default App;

// // function App () {
// //   const [showAdvanced, setShowAdvanced] = useState(true)

// //   return (
// //     <div className='app'>
// //       {showAdvanced ? <Advanced /> : <Simple />}
// //       <div className='row'>
// //         <p style={{ color: '#fff' }}>Show advanced example</p> <Switch checked={showAdvanced} onChange={setShowAdvanced} />
// //       </div>
// //     </div>
// //   )
// // }

// // export default App
