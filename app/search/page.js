"use client"
import React, { useState } from 'react';
import RecipePage from '../RecipePage';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);

    const handleSearch = async () => {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
            .then(response => response.json())
            .then(data => setRecipes(data.meals))
        // .catch(error => console.error('Error fetching data:', error));
    };

    return (
        <>
            <div>
                <div className='search-page'>
                    <div className='main_div'>
                        <input
                            className='inputTag'
                            placeholder='Search Your Menu'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button className="search-btn" onClick={handleSearch}>Search</button>
                    </div>
                    <RecipePage recipes={recipes} />
                </div>
            </div>
        </>
    );
};
export default SearchBar;
