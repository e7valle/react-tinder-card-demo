import React from "react";
import "./App.css";
import BusinessList from "../BusinessList/BusinessList";
import SearchBar from "../SearchBar/SearchBar";
import Yelp from "../../util/yelp";
// attempt to implement advanced
import Advanced from "../../examples/Advanced";


// Anaananananananana
class App extends React.Component {
constructor(props) {
    super(props);
    this.state = {
    businesses: [],
    };

    this.searchYelp = this.searchYelp.bind(this);
}
searchYelp(term, location, sortBy, price, radius) {
    Yelp.search(term, location, sortBy, price, radius).then((businesses) => {
    this.setState({ businesses: businesses });
    });
}

render() {
    return (
    <div className="App">
        <h1>Yelp</h1>
        <SearchBar searchYelp={this.searchYelp} />
        <BusinessList businesses={this.state.businesses} />
        <Advanced 
            // term={this.state.term}
            // location={this.state.location}
            // sortBy={this.state.sortBy}
            // price={this.state.price}
            // radius={this.state.radius}
            businesses={this.state.businesses}
        />
    </div>
    );
}
}

export default App;