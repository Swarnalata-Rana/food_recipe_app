"use client"
import React, { useState } from 'react';

const RecipePage = ({ recipes }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [rating, setRating] = useState(0);
    const [recipeRatings, setRecipeRatings] = useState({}); // State to store ratings for each recipe

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
        setShowModal(true);
        setRating(recipeRatings[recipe.idMeal] || 0); // Show saved rating if available
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleStarClick = (star) => {
        setRating(prevRating => (prevRating === star ? star - 1 : star));
    };

    const handleSaveRating = () => {
        setRecipeRatings(prevRatings => ({
            ...prevRatings,
            [selectedRecipe.idMeal]: rating, // Save rating for the current recipe
        }));
        setShowModal(false); // Close modal after saving rating
    };

    if (!recipes) {
        return <div className='Not-found'>Sorry, This Recipe Is Not Available</div>;
    }

    return (
        <div className="box">
            {recipes.map((recipe) => (
                <div className="recipe-card" key={recipe.idMeal}>
                    <img className='img' src={recipe.strMealThumb} alt={recipe.strMeal} />
                    <div className="recipe-info">
                        <p>Dish: {recipe.strMeal}</p>
                        <p>Country: {recipe.strArea}</p>
                        <p>Category: {recipe.strCategory}</p>
                        <p>Rating:  {recipeRatings[recipe.idMeal] || 'Not rated yet'}</p>
                        <button className='recipe_click' onClick={() => handleRecipeClick(recipe)}>View Recipe</button>
                    </div>
                </div>
            ))}
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
        </div>
    );
};

export default RecipePage;
