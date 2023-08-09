import React from "react";
import "./SearchBar.css";
import { Link } from 'react-router-dom';
import './SearchBar.css';

class SearchBar extends React.Component {
constructor(props) {
super(props);

this.state = {
    term: "",
    location: "",
    sortBy: "best_match",
    price: "",
    radius: ""
};

this.handleTermChange = this.handleTermChange.bind(this);
this.handleLocationChange = this.handleLocationChange.bind(this);
this.handleSearch = this.handleSearch.bind(this);

this.sortByOptions = {
    // "Best Match": "best_match",
    // "Highest Rated": "rating",
    // "Most Reviewed": "review_count",
    "Best Match": "best_match",
    "Highest Rated": "rating",
    "Most Reviewed": "review_count",
};

// for price list
this.priceOptions = {
    "$": "1",
    "$$": "2",
    "$$$": "3",
    "$$$$": "4"
};

this.radiusOptions = {
    "5 miles": "8047",
    "10 miles": "16093",
    "15 miles": "24140",
    "20 miles": "32187"
}
}

getRadiusClass(radiusOption) {
    if (this.state.radius === radiusOption) {
        return "active";
    }
    return "";
}

handleSortByChange(sortByOption) {
    this.setState({ sortBy: sortByOption });
    }
    
    handleTermChange(event) {
    this.setState({ term: event.target.value });
    }
    
    handleLocationChange(event) {
    this.setState({ location: event.target.value });
    }
    // for a list price
    handlePriceChange(priceOption) {
        this.setState({ price: priceOption });
        }
    
    handleRadiusChange(radiusOption) {
        this.setState({ radius: radiusOption });
    }

handleSearch(event) {
this.props.searchYelp(
    this.state.term,
    this.state.location,
    this.state.sortBy
);

event.preventDefault();
}

renderSortByOptions() {
return Object.keys(this.sortByOptions).map((sortByOption) => {
    let sortByOptionValue = this.sortByOptions[sortByOption];
    return (
    <li
        className={this.getSortByClass(sortByOptionValue)}
        key={sortByOptionValue}
        onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
    >
        {sortByOption}
    </li>
    );
});
}

// for a list of price options
renderPriceOptions() {
    return Object.keys(this.priceOptions).map((priceOption) => {
        let priceOptionValue = this.priceOptions[priceOption];
        return (
        <li
            className={this.getPriceClass(priceOptionValue)}
            key={priceOptionValue}
            onClick={this.handlePriceChange.bind(this, priceOptionValue)}
        >
            {priceOption}
        </li>
        );
    });
    }
    
    renderRadiusOptions() {
    return Object.keys(this.radiusOptions).map((radiusOption) => {
        let radiusOptionValue = this.radiusOptions[radiusOption];
        return (
        <li
            className={this.getRadiusClass(radiusOptionValue)}
            key={radiusOptionValue}
            onClick={this.handleRadiusChange.bind(this, radiusOptionValue)}
        >
            {radiusOption}
        </li>
        );
    });
    }

render() {
return (
    <div className="SearchBar">
    <div className="SearchBar-sort-options">
        <ul>{this.renderSortByOptions()}</ul>
    </div>
    <div className="SearchBar-fields">
        <input
        placeholder="Search Businesses"
        onChange={this.handleTermChange}
        />
        <input placeholder="Where?" onChange={this.handleLocationChange} />
    </div>
    <div className="SearchBar-submit">
    <Link
    to={{
    pathname: '/advanced',
    state: {
        term: this.state.term,
        location: this.state.location,
        sortBy: this.state.sortBy,
    },
    }}
    onClick={this.handleSearch}
    >
    Let's Go
    </Link>
    <div className="SearchBar-sort-options">
            <ul>{this.renderSortByOptions()}</ul>
            <ul>{this.renderPriceOptions()}</ul>
            <ul>{this.renderRadiusOptions()}</ul>
        </div>
    </div>
    </div>
);
}
}

export default SearchBar;