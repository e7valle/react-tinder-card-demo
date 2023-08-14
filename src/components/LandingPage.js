import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';

function LandingPage() {
    const generateRandomCode = () => {
        const code = Math.floor(Math.random() * 100000).toString();
        return code.padStart(6, '0'); // Pads the code to have 6 digits
    };

    const [generatedCode] = useState(generateRandomCode());

    return (
        <div className="LandingPage">
            <h1>Welcome to TasteBuds</h1>
            <Link to="/searchbar">
                <button>Create</button>
            </Link>
            <Link to="/join">
                <button>Join</button>
            </Link>
            <SearchBar generatedCode={generatedCode} />
        </div>
    );
}

export default LandingPage;
