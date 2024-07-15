import React from 'react'

function Navbar() {
    return (
        <div className='navbar'>
            <a className='search-page' href='/'>
                <h1>Food Recipe App</h1>
            </a>
            <a className='aTageSearch' href='./search'>Search</a>
        </div>
    )
}
export default Navbar;