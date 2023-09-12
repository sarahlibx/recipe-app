import React from "react";

const RecipeExcerpt = ({ recipe, handleSelectRecipe }) => {
  return (
    <article key={recipe.id} className='recipe-item'>
      <h2>{recipe.title}</h2>
      <button onClick={() => handleSelectRecipe(recipe)}>View</button>
      <p>Servings: {recipe.servings}</p>
    </article>
  );
};

export default RecipeExcerpt;
