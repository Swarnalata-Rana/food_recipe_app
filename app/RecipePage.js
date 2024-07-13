import React from 'react';
import Link from 'next/link';

const RecipePage = ({ recipes }) => {
    if (!recipes) {
        return <div className='Not-found'>Sorry, This Recipe Is Not Available</div>;
    }

    return (
        <div className="box">
            {recipes.map((recipe) => (
                <div className="recipe-card" key={recipe.idMeal} >
                    <img className='img' src={recipe.strMealThumb} alt={recipe.strMeal} />
                    <div className="recipe-info">
                        <p>Name:- {recipe.strMeal}</p>
                        <p>Country:- {recipe.strArea}</p>
                        <p>Category:- {recipe.strCategory}</p>
                        <Link className='view' href="/recipe">View Recipe</Link>
                    </div>
                    {/* <p className=''>{recipe.strInstructions}</p> */}
                </div>
            ))}
        </div>
    );
};

export default RecipePage;

        