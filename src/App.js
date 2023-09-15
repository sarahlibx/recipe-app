import React from "react";
import { useState, useEffect } from "react";
import RecipeFull from "./components/RecipeFull";
import NewRecipeForm from "./components/NewRecipeForm";
import RecipeExcerpt from "./components/RecipeExcerpt";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showNewRecipeForm, setShowNewRecipeForm] = useState(false);

  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    description: "",
    image_url: "https://via.placeholder.com/150/771796",
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

  const handleSearch = () => {
    const searchResults = recipes.filter((recipe) => {
      const valuesToSearch = [recipe.title, recipe.ingredients, recipe.description];
      // Check if the search term is included in any of the values and will return a boolean value
      return valuesToSearch.some((value) => value.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    return searchResults;
  };

  const updateSearchTerm = (text) => {
    setSearchTerm(text);
  };
  const handleUpdateRecipe = async (e, selectedRecipe) => {
    e.preventDefault();
    const { id, title, ingredients, instructions, servings, image_url, description } = selectedRecipe;
    const response = await fetch(`/api/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, ingredients, instructions, servings, description, image_url })
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

    const { title, ingredients, instructions, servings, description, image_url } = newRecipe;
    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, ingredients, instructions, servings, description, image_url })
    });

    if (response.ok) {
      const data = await response.json();

      console.log({ data });
      // Update the recipe in the frontend
      setRecipes([...recipes, data.recipe]);

      setShowNewRecipeForm(false);
      setNewRecipe({
        title: "",
        ingredients: "",
        instructions: "",
        description: "",
        imageUrl: "",
        servings: 1
      });
    } else {
      console.error("Recipe update failed.");
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      const response = await fetch(`/api/recipes/${selectedRecipe.id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
        setSelectedRecipe(null);
      } else {
        console.error("Welp - could not delete recipe.");
      }
    } catch (e) {
      console.error("Something went wrong:", e);
    }
  };

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleUnselectRecipe = () => {
    setSelectedRecipe(null);
  };

  const hideRecipeForm = () => {
    setShowNewRecipeForm(false);
  };

  const showRecipeForm = () => {
    setShowNewRecipeForm(true);
    setSelectedRecipe(null);
  };

  const displayedRecipes = searchTerm ? handleSearch() : recipes;

  return (
    <div className='recipe-app'>
      <Header
        showRecipeForm={showRecipeForm}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        updateSearchTerm={updateSearchTerm}
      />
      {showNewRecipeForm && (
        <NewRecipeForm
          newRecipe={newRecipe}
          hideRecipeForm={hideRecipeForm}
          handleNewRecipe={handleNewRecipe}
          onUpdateForm={onUpdateForm}
        />
      )}
      {selectedRecipe && (
        <RecipeFull
          selectedRecipe={selectedRecipe}
          onUpdateForm={onUpdateForm}
          handleDeleteRecipe={handleDeleteRecipe}
          handleUpdateRecipe={handleUpdateRecipe}
          handleUnselectRecipe={handleUnselectRecipe}
          handleSelectRecipe={handleSelectRecipe}
        />
      )}
      {!selectedRecipe && !showNewRecipeForm && (
        <div className='recipe-list'>
          {displayedRecipes.map((recipe) => (
            <RecipeExcerpt key={recipe.id} recipe={recipe} handleSelectRecipe={handleSelectRecipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
