import React from "react";

const Header = ({ showRecipeForm }) => {
  return (
    <header>
      <h1>My Favorite Recipes</h1>
      <button onClick={showRecipeForm}>Add New Recipe</button>
    </header>
  );
};

export default Header;
