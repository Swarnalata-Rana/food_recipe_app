"use client"
import React, { useState, useEffect } from 'react';

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [rating, setRating] = useState(0);
    const [recipeRatings, setRecipeRatings] = useState({}); // State to store ratings for each recipe

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
            .then(response => response.json())
            .then(data => setRecipes(data.meals.slice(0, 20)));
    }, []);

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
        setShowModal(true);
        setRating(recipeRatings[recipe.idMeal] || 0); // Show saved rating if available
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleStarClick = (star) => {
        // Toggle rating if the same star is clicked twice
        setRating(prevRating => (prevRating === star ? star - 1 : star));
    };

    const handleSaveRating = () => {
        setRecipeRatings(prevRatings => ({
            ...prevRatings,
            [selectedRecipe.idMeal]: rating, // Save rating for the current recipe
        }));
        setShowModal(false); // Close modal after saving rating
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
                                <p>Rating: {recipeRatings[recipe.idMeal] || 'Not rated yet'}</p>
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
                                <h3>Rate this Recipe:</h3>
                                <div className="star-rating">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={star <= rating ? "star filled" : "star"}
                                            onClick={() => handleStarClick(star)}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <p>Your Rating: {rating} Stars</p>
                                <button className="save-rating" onClick={handleSaveRating}>
                                    Save Rating
                                </button>
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
        </>
    );
}

export default HomePage;
