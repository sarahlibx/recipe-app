import React, { useState } from "react";
import EditRecipeForm from "./EditRecipeForm";

const RecipeFull = ({ selectedRecipe, handleUnselectRecipe, handleDeleteRecipe, onUpdateForm, handleUpdateRecipe }) => {
  const [editing, setEditing] = useState(false);

  const handleCancel = () => {
    setEditing(false);
  };
  return (
    <div className='recipe-details'>
      {editing ? (
        <EditRecipeForm
          selectedRecipe={selectedRecipe}
          onUpdateForm={onUpdateForm}
          handleDeleteRecipe={handleDeleteRecipe}
          handleCancel={handleCancel}
          handleUpdateRecipe={handleUpdateRecipe}
        />
      ) : (
        <article>
          <h2>{selectedRecipe.title}</h2>

          <button onClick={() => setEditing(true)}>Edit</button>
          <button className='close-button' onClick={() => handleUnselectRecipe(selectedRecipe)}>
            Close
          </button>

          <p>Ingredients</p>

          <ul>
            {selectedRecipe.ingredients.split(",").map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p>{selectedRecipe.instructions}</p>
          <p>Servings: {selectedRecipe.servings}</p>
        </article>
      )}
    </div>
  );
};

export default RecipeFull;
