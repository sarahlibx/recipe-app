import React from "react";
import { ReactComponent as Logo } from "../images/utensils.svg";

const Header = ({ showRecipeForm, updateSearchTerm, searchTerm }) => {
  return (
    <header>
      <div class='logo-search'>
        <Logo />
        <div className='search'>
          <label htmlFor='search'>Search</label>
          <input type='text' id='search' value={searchTerm} onChange={(e) => updateSearchTerm(e.target.value)} />
        </div>
      </div>
      <h1>My Favorite Recipes</h1>
      <button onClick={showRecipeForm}>Add New Recipe</button>
    </header>
  );
};

export default Header;
