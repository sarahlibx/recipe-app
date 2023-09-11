import React from "react";
import { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import RecipeFull from "./RecipeFull";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showNewRecipeForm, setShowNewRecipeForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    servings: 1
  });

  useEffect(() => {
    const fetchAllRecipes = async () => {
      const response = await fetch("/api/recipes");
      const data = await response.json();
      setRecipes(data);
    };
    fetchAllRecipes();
  }, []);

  const handleUpdateRecipe = async (e, selectedRecipe) => {
    e.preventDefault();
    const { id, title, ingredients, instructions, servings } = selectedRecipe;
    const response = await fetch(`/api/recipes/${id}`, {
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
          if (recipe.id === id) {
            // Return the saved data from the db
            return data.recipe;
          }
          return recipe;
        })
      );
    } else {
      console.error("Recipe update failed.");
    }

    setSelectedRecipe(null);
  };

  const onUpdateForm = (e, action = "new") => {
    const { name, value } = e.target;
    if (action === "update") {
      setSelectedRecipe({
        ...selectedRecipe,
        [name]: value
      });
    } else if (action === "new") {
      setNewRecipe({ ...newRecipe, [name]: value });
      console.log(newRecipe);
    }
  };

  const handleNewRecipe = async (e, newRecipe) => {
    e.preventDefault();
    console.log("Adding recipe");

    const { title, ingredients, instructions, servings } = newRecipe;
    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, ingredients, instructions, servings })
    });
    if (response.ok) {
      const data = await response.json();

      console.log({ data });
      // Update the recipe in the frontend
      setRecipes([...recipes, data.recipe]);
      setNewRecipe({
        title: "",
        ingredients: "",
        instructions: "",
        servings: 1
      });
      setShowNewRecipeForm(false);
    } else {
      console.error("Recipe update failed.");
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    // hit the API with delete request
    try {
      const response = await fetch(`/api/recipes/${selectedRecipe.id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        // update state
        setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
        setSelectedRecipe(null);
      } else {
        console.error("Welp - could not delete recipe.");
      }
    } catch (e) {
      console.error("Something went wrong:", e);
    }
  };

  return (
    <div className='RecipeApp'>
      <h1>Recipe App</h1>
      <button onClick={() => setShowNewRecipeForm(true)}>Add New Recipe</button>
      {showNewRecipeForm && (
        <div className='RecipeDetail'>
          <h2>New Recipe</h2>
          <button onClick={() => setShowNewRecipeForm(false)}>Close</button>
          <form onSubmit={(e) => handleNewRecipe(e, newRecipe)}>
            <label>Title</label>
            <input type='text' name='title' value={newRecipe.title} onChange={(e) => onUpdateForm(e, "new")} />
            <label>Ingredients</label>
            <textarea name='ingredients' value={newRecipe.ingredients} onChange={(e) => onUpdateForm(e, "new")} />
            <label>Instructions</label>
            <textarea name='instructions' value={newRecipe.instructions} onChange={(e) => onUpdateForm(e, "new")} />
            <label>Servings</label>
            <input type='number' name='servings' value={newRecipe.servings} onChange={(e) => onUpdateForm(e, "new")} />
            <button type='submit'>Create New Recipe</button>
          </form>
        </div>
      )}
      <div className='RecipeList'>
        {recipes.map((recipe) => (
          <div key={recipe.id} className='RecipeItem'>
            {console.log(recipe)}
            <h2>{recipe.title}</h2>
            <button onClick={() => setSelectedRecipe(recipe)}>Edit</button>
            <p>Servings: {recipe.servings}</p>
            <p>Ingredients: {recipe.ingredients}</p>
          </div>
        ))}
      </div>
      {selectedRecipe && (
        <div className='RecipeDetail'>
          <h2>Edit Recipe</h2>
          <button onClick={() => setSelectedRecipe(null)}>Close</button>
          <button onClick={() => handleDeleteRecipe(selectedRecipe.id)}>Delete</button>
          <form onSubmit={(e) => handleUpdateRecipe(e, selectedRecipe)}>
            <label>Title</label>
            <input type='text' name='title' value={selectedRecipe.title} onChange={(e) => onUpdateForm(e, "update")} />
            <label>Ingredients</label>
            <textarea name='ingredients' value={selectedRecipe.ingredients} onChange={(e) => onUpdateForm(e, "update")} />
            <label>Instructions</label>
            <textarea name='instructions' value={selectedRecipe.instructions} onChange={(e) => onUpdateForm(e, "update")} />
            <label>Servings</label>
            <input type='number' name='servings' value={selectedRecipe.servings} onChange={(e) => onUpdateForm(e, "update")} />
            <button type='submit'>Update</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
