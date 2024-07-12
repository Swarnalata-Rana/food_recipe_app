import React from 'react';
import RecipePage from './RecipePage';

const SearchBar = () => {
  return (
    <>
      <div className='main_div'>
        <input className='inputTag' placeholder='Search Your Menu' />
        <button className="search-btn">Search </button>
      </div>
      <RecipePage/>
    </>
  )
}

export default SearchBar;