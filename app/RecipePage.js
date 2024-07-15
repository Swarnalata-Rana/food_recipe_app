import React, { useState } from 'react';
import './RecipePage.css';

const RecipePage = ({ recipes }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
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
                        <p>Dish:- {recipe.strMeal}</p>
                        <p>Country:- {recipe.strArea}</p>
                        <p>Category:- {recipe.strCategory}</p>
                        <button className='recipe_click' onClick={() => handleRecipeClick(recipe)}>ViewRecipe</button>
                        <button className="save_click" onClick={''}>Save</button>
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
