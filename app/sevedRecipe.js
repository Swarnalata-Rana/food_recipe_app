import React from 'react';

const SavedRecipes = ({ recipes }) => {
    if (recipes.length === 0) {
        return <div>No saved recipes.</div>;
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
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SavedRecipes;
