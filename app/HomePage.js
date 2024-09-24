"use client"
import React, { useState, useEffect } from 'react'
import Footer from './Footer';
import MenuShow from './MenuShow';

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
            .then(response => response.json())
            .then(data => setRecipes(data.meals.slice(0, 20)));
    }, []);

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className='greeting'>
                <h1>Welcome! Let's cook something delicious.</h1>
            </div>
            <div className='box'>
                <ul className='uiTag'>
                    {recipes.map((recipe) => (
                        <li className='litag' key={recipe.idMeal}>
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                            <div className='litaginfo'>
                                <h2>Dish: {recipe.strMeal}</h2>
                                <p>Category: {recipe.strCategory}</p>
                                <p>Area: {recipe.strArea}</p>
                                <button className='recipe_click' onClick={() => handleRecipeClick(recipe)}>View Recipe</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            <h2>{selectedRecipe.strMeal}</h2>
                            <div className="modal-body">
                                <h3>Ingredients:</h3>
                                <ul>
                                    {Object.keys(selectedRecipe).map((key) => {
                                        if (key.startsWith('strIngredient') && selectedRecipe[key]) {
                                            return (
                                                <li key={key}>
                                                    {selectedRecipe[key]} ({selectedRecipe[`strMeasure${key.slice(13)}`]})
                                                </li>
                                            );
                                        }
                                        return null;
                                    })}
                                    {Object.keys(selectedRecipe).filter((key) => key.startsWith('strIngredient')).length === 0 ? (
                                        <li>No ingredients available</li>
                                    ) : null}
                                </ul>
                                <h3>Instructions:</h3>
                                {selectedRecipe.strInstructions ? (
                                    <div>
                                        {selectedRecipe.strInstructions.split('\r\n').map((instruction, index) => (
                                            <p key={index}>{instruction}</p>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No instructions available</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button className="close-modal" onClick={handleCloseModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* <Footer/> */}
        </>
    )
}
export default HomePage;