import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import RecipeExcerpt from "./components/RecipeExcerpt";
import RecipeFull from "./components/RecipeFull";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await fetch("/api/recipes");
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        } else {
          console.log("Oops, could not fetch recipes!")
        }
      } catch (error) {
        console.log("Something went wrong", error);
    }
  };
  fetchAllRecipes();
}, []);

const handleSelectRecipe = (recipe) => {
  setSelectedRecipe(recipe);
};

const handleUnselectRecipe = () => {
  setSelectedRecipe(null);
};

return (
  <div className='recipe-app'>
    <Header />
    {selectedRecipe && (
    <RecipeFull 
    selectedRecipe={selectedRecipe} 
    handleUnselectRecipe={handleUnselectRecipe} />
    )}
    {!selectedRecipe && (
    <div className='recipe-list'>
      {recipes.map((recipe) => (
        <RecipeExcerpt 
        key={recipe.id} 
        recipe={recipe}
        handleSelectRecipe={handleSelectRecipe} />
      ))}
    </div>
    )}
  </div>
);
}

export default App;
