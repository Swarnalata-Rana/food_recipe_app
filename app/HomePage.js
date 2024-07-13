"use client"
import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
            .then(response => response.json())
            .then(data => setRecipes(data.meals.slice(0, 12)));
    }, []);
    return (
        <>
            <div className='slider'>
                <h1>Welcome! Let's cook something delicious.</h1>
            </div>
            <div className='box'>
                <ul className='uiTag'>
                    {recipes.map((recipe) => (
                        <li className='litag' key={recipe.idMeal}>
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                            <div className='litaginfo'>
                            <h2>Name: {recipe.strMeal}</h2>
                            <p>Category: {recipe.strCategory}</p>
                            <p>Area: {recipe.strArea}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default HomePage;