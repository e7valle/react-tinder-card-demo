import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar"; // Import your original SearchBar component

function SearchBarWrapper() {
    const navigate = useNavigate();

    return <SearchBar navigate={navigate} />;
}

export default SearchBarWrapper;
