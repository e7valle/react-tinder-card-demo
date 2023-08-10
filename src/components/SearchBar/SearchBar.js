import React from "react";
import { Link } from 'react-router-dom';
import Yelp from '../../util/yelp'; // Import your Yelp API module
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: "",
      location: "",
      sortBy: "best_match",
      dataFetched: false, // Add a state to track data fetching
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.sortByOptions = {
      "Best Match": "best_match",
      "Highest Rated": "rating",
      "Most Reviewed": "review_count",
    };
  }

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
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

  handleSearch() {
    const { term, location, sortBy } = this.state;

    // Fetch Yelp data using the provided search parameters
    Yelp.search(term, location, sortBy)
      .then((businesses) => {
        console.log("Fetched Yelp data:", businesses);

        // Update the component state to indicate successful data fetch
        this.setState({ dataFetched: true });
      })
      .catch((error) => {
        console.error("Error fetching Yelp data:", error);
      });
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

  render() {
    const { term, location, sortBy, dataFetched } = this.state;

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
          {/* Call handleSearch when the button is clicked */}
          <Link
            to={{
              pathname: '/advanced',
              state: {
                term,
                location,
                sortBy,
              },
            }}
            onClick={this.handleSearch}
          >
            {dataFetched ? "Let's Go" : "Fetching Data..."}
          </Link>
        </div>
      </div>
    );
  }
}

export default SearchBar;
