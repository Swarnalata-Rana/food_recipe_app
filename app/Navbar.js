"use client";
import React, { useState } from 'react';
import Link from 'next/link';

function Navbar() {
    const [showModal, setShowModal] = useState(false);
    const [isSignIn, setIsSignIn] = useState(true); 
    const [showPassword, setShowPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

    const handleSignInClick = () => {
        setShowModal(true);
        setIsSignIn(true); 
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <div className='mainNavbar'>
            <div className='navbar'>
                <Link href='/' className='search-page'>
                    <h1>Food Recipe App</h1>
                </Link>
                <div className='seachSignin'>
                    <div>
                        <Link href='/search' className='aTageSearch'>Search</Link>
                    </div>
                    <div>
                        <a className='aTageSearch' href='#' onClick={handleSignInClick}>Sign In</a>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            <h2>{isSignIn ? 'Sign In' : 'Create Account'}</h2>
                            <form className="auth-form">
                                <label>
                                    Username:
                                    <input type="text" name="username" required />
                                </label>
                                <label>
                                    Password:
                                    <div className="password-wrapper">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="show-hide-btn"
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                </label>
                                {!isSignIn && (
                                    <label>
                                        Confirm Password:
                                        <div className="password-wrapper">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="show-hide-btn"
                                            >
                                                {showConfirmPassword ? "Hide" : "Show"}
                                            </button>
                                        </div>
                                    </label>
                                )}
                                <button type="submit">{isSignIn ? 'Login' : 'Create Account'}</button>
                            </form>
                            <p onClick={toggleForm} className="toggle-form">
                                {isSignIn ? "Don't have an account? Create one" : 'Already have an account? Sign In'}
                            </p>
                            <button className="close-modal" onClick={handleCloseModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;
