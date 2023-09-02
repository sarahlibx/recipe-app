import React from "react";
import RecipeExcerpt from "./RecipeExcerpt";

const RecipeList = ({ recipes, handleSelectedRecipe }) => {
  return (
    <div className='recipes'>
      {recipes.map((recipe) => (
        <RecipeExcerpt key={recipe.id} recipe={recipe} handleSelectedRecipe={handleSelectedRecipe} />
      ))}
    </div>
  );
};

export default RecipeList;
