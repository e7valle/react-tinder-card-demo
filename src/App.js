import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import SearchBar from '../src/components/SearchBar/SearchBar';
import Advanced from '../src/examples/Advanced'; // Make sure to provide the correct path
import './App.css';
import Yelp from '../src/util/yelp'
import { Link } from 'react-router-dom';
import BusinessList from '../src/components/BusinessList/BusinessList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
    };

    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy) {
    Yelp.search(term, location, sortBy).then((businesses) => {
      this.setState({ businesses: businesses });
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <h1>Yelp</h1>
          <Link
            to={{
              pathname: '/advanced',
              state: {
                term: '',
                location: '',
                sortBy: 'best_match',
              },
            }}
          >
            Go to Advanced Search
          </Link>
          <SearchBar searchYelp={this.searchYelp} />
          <BusinessList businesses={this.state.businesses} />
          <Routes>
            <Route path="/advanced" element={<Advanced />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
