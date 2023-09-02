import React from "react";

function RecipeExcerpt({ recipe, handleSelectedRecipe }) {
  return (
    <div className='recipe'>
      <h2 onClick={() => handleSelectedRecipe(recipe.id)}>{recipe.title}</h2>

      {/* Should be some kind of description here */}
      <h4>Servings</h4>
      <p>{recipe.servings}</p>
    </div>
  );
}

export default RecipeExcerpt;
