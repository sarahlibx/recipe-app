import React from "react";
import { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import RecipeFull from "./RecipeFull";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [newRecipe, setNewRecipe] = useState(null);

  //TODO - Make new form for newRecipe -

  useEffect(() => {
    const fetchAllRecipes = async () => {
      const response = await fetch("/api/recipes");
      const data = await response.json();
      setRecipes(data);
    };
    fetchAllRecipes();
  }, []);

  const handleUpdateRecipe = async (e, updatedRecipe) => {
    e.preventDefault();
    const { title, ingredients, instructions, servings } = updatedRecipe;
    const response = await fetch(`/api/recipes/${updatedRecipe.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, ingredients, instructions, servings })
    });

    if (response.ok) {
      const data = await response.json();
      console.log({ data });
      // Update the recipe in the frontend
      setRecipes(
        recipes.map((recipe) => {
          if (recipe.id === updatedRecipe.id) {
            recipe.title = title;
            recipe.ingredients = ingredients;
            recipe.instructions = instructions;
            recipe.servings = servings;
          }
          return recipe;
        })
      );
    } else {
      console.error("Recipe update failed.");
    }

    setSelectedRecipe(null);
  };

  const onUpdateForm = (e) => {
    const { name, value } = e.target;
    setSelectedRecipe({
      ...selectedRecipe,
      [name]: value
    });
  };

  return (
    <div className='RecipeApp'>
      <h1>Recipe App</h1>
      <button onClick={() => setNewRecipe({})}>Add New Recipe</button>
      {newRecipe && (
        <div className='RecipeDetail'>
          <h2>New Recipe</h2>
          <button onClick={() => setNewRecipe(null)}>Close</button>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>Title</label>
            <input type='text' name='title' />
            <label>Ingredients</label>
            <textarea name='ingredients' />
            <label>Instructions</label>
            <textarea name='instructions' />
            <label>Servings</label>
            <input type='number' name='servings' />
            <button type='submit'>Update</button>
          </form>
        </div>
      )}
      <div className='RecipeList'>
        {recipes.map((recipe) => (
          <div key={recipe.id} className='RecipeItem'>
            {console.log(recipe)}
            <h2 onClick={() => setSelectedRecipe(recipe)}>{recipe.title}</h2>
            <p>Servings: {recipe.servings}</p>
            <p>Ingredients: {recipe.ingredients}</p>
          </div>
        ))}
      </div>
      {selectedRecipe && (
        <div className='RecipeDetail'>
          <h2>Edit Recipe</h2>
          <button onClick={() => setSelectedRecipe(null)}>Close</button>
          <form onSubmit={(e) => handleUpdateRecipe(e, selectedRecipe)}>
            <label>Title</label>
            <input type='text' name='title' value={selectedRecipe.title} onChange={onUpdateForm} />
            <label>Ingredients</label>
            <textarea name='ingredients' value={selectedRecipe.ingredients} onChange={onUpdateForm} />
            <label>Instructions</label>
            <textarea name='instructions' value={selectedRecipe.instructions} onChange={onUpdateForm} />
            <label>Servings</label>
            <input type='number' name='servings' value={selectedRecipe.servings} onChange={onUpdateForm} />
            <button type='submit'>Update</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
