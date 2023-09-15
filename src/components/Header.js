import React from "react";

const Header = ({ showRecipeForm, updateSearchTerm, searchTerm }) => {
  return (
    <header>
      <h1>My Favorite Recipes</h1>
      <div className='header-actions'>
        <button onClick={showRecipeForm}>Add New Recipe</button>
        <div className='search'>
          <label htmlFor='search'>Search</label>
          <input type='text' id='search' value={searchTerm} onChange={(e) => updateSearchTerm(e.target.value)} />
        </div>
      </div>
    </header>
  );
};

export default Header;
