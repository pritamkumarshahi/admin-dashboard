import React, { useState } from 'react';

import "./SearchBar.css";

const SearchBar = ({ search, setSearch }) => {
    const [searchResult, setNewSearchResult] = useState("");

    const handleSearch = () => {
        setSearch(searchResult)
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setSearch(searchResult)
        }
    };

    return (
        <div className='searchbar'>
            <input
                type="text"
                value={search}
                onChange={(e) => setNewSearchResult(e.target.value)}
                placeholder="Search..."
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch} className='search-button'>
                <i className="fas fa-search search-icon"></i>
            </button>
        </div>
    );
}

export default SearchBar;
