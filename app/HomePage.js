import React from 'react'
import SearchBar from './SearchBar';
import Navbar from './Navbar';
import Footer from './Footer';

const HomePage = () => {
    return (
        <>
            <div>
                <Navbar/>
                <SearchBar/>
                {/* <Footer/> */}
            </div>
        </>
    )
}

export default HomePage;