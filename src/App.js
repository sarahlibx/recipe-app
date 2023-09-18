import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const updateSearchTerm = (text) => {
    setSearchTerm(text);
  };

  const handleNewRecipe = async (e, newRecipe) => {
    e.preventDefault();

    const { title, ingredients, instructions, servings, description, image_url } = newRecipe;

    try {
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

        toast.success("Recipe added successfully!", {
          position: "bottom-right",
          autoClose: 3000
        });

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
        toast.error("Oops - could not add recipe!", {
          position: "bottom-right",
          autoClose: 3000
        });
      }
    } catch (e) {
      console.e("An error occurred during the request:", e);

      toast.error("An unexpected error occurred. Please try again later.", {
        position: "bottom-right",
        autoClose: 3000
      });
    }
  };

  const handleUpdateRecipe = async (e, selectedRecipe) => {
    e.preventDefault();
    const { id, title, ingredients, instructions, servings, image_url, description } = selectedRecipe;

    try {
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

        setRecipes(
          recipes.map((recipe) => {
            if (recipe.id === id) {
              // Return the saved data from the db
              return data.recipe;
            }
            return recipe;
          })
        );

        toast.success("Recipe updated!", {
          position: "bottom-right",
          autoClose: 3000
        });
      } else {
        console.error("Recipe update failed.");

        toast.error("Failed to update recipe. Please try again.", {
          position: "bottom-right",
          autoClose: 3000
        });
      }
    } catch (error) {
      console.error("An error occurred during the request:", error);

      toast.error("An unexpected error occurred. Please try again later.", {
        position: "bottom-right",
        autoClose: 3000
      });
    }

    setSelectedRecipe(null);
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      const response = await fetch(`/api/recipes/${selectedRecipe.id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
        setSelectedRecipe(null);
        toast.success("Recipe deleted successfully!", {
          position: "bottom-right",
          autoClose: 3000
        });
      } else {
        toast.error("Oops - could not delete recipe!", {
          position: "bottom-right",
          autoClose: 3000
        });
      }
    } catch (e) {
      console.error("Something went wrong during the request:", e);
      toast.error("An unexpected error occurred. Please try again later.", {
        position: "bottom-right",
        autoClose: 3000
      });
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
      <ToastContainer />
    </div>
  );
}

export default App;
