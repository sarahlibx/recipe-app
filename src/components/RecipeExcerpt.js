import React from "react";

const RecipeExcerpt = ({ recipe, handleSelectRecipe }) => {
  return (
    <div key={recipe.id} className='RecipeItem'>
      <h2>{recipe.title}</h2>
      <button onClick={() => handleSelectRecipe(recipe)}>Edit</button>
      <p>Servings: {recipe.servings}</p>
      <p>Ingredients: {recipe.ingredients}</p>
    </div>
  );
};

export default RecipeExcerpt;
