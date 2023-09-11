import React, { useState } from "react";
import EditRecipeForm from "./EditRecipeForm";

const RecipeFull = ({
  selectedRecipe,
  handleSelectRecipe,
  handleUnselectRecipe,
  handleDeleteRecipe,
  onUpdateForm,
  handleUpdateRecipe
}) => {
  const [editing, setEditing] = useState(false);

  const handleCancel = () => {
    setEditing(false);
  };
  return (
    <div className='RecipeDetails'>
      {editing ? (
        <EditRecipeForm
          selectedRecipe={selectedRecipe}
          onUpdateForm={onUpdateForm}
          handleDeleteRecipe={handleDeleteRecipe}
          handleUnselectRecipe={handleUnselectRecipe}
          handleUpdateRecipe={handleUpdateRecipe}
        />
      ) : (
        <>
          <h2>{selectedRecipe.title}</h2>
          <button onClick={() => setEditing(true)}>Edit</button>

          <button onClick={() => handleUnselectRecipe(selectedRecipe)}>Close</button>
          <p>Ingredients</p>

          <ul>
            {selectedRecipe.ingredients.split(",").map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p>{selectedRecipe.instructions}</p>
          <p>Servings: {selectedRecipe.servings}</p>
        </>
      )}
    </div>
  );
};

export default RecipeFull;
