import React from "react";

const Header = ({ showRecipeForm, updateSearchTerm, searchTerm }) => {
  return (
    <header>
      <h1>My Favorite Recipes</h1>
      <button onClick={showRecipeForm}>Add New Recipe</button>
      <input type='text' value={searchTerm} onChange={(e) => updateSearchTerm(e.target.value)} />
    </header>
  );
};

export default Header;
