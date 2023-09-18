import React from "react";
import { truncateText } from "../helpers/utils.js";

const RecipeExcerpt = ({ recipe, handleSelectRecipe }) => {
  const styles = {
    backgroundImage: `url(${recipe.image_url})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  };

  return (
    <article style={styles} key={recipe.id} className='recipe-card'>
      <div className='recipe-text'>
        <h2>{recipe.title}</h2>
        <button onClick={() => handleSelectRecipe(recipe)}>View</button>
        <p>Description: {truncateText(recipe.description, 20)}</p>
        <p>Servings: {recipe.servings}</p>
      </div>
    </article>
  );
};

export default RecipeExcerpt;
