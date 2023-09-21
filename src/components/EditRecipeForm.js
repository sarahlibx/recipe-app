import React from "react";

const EditRecipeForm = ({ selectedRecipe, onUpdateForm, handleCancel, handleUpdateRecipe }) => {
  return (
    <div className='recipe-form edit-form'>
      <h2>Edit "{selectedRecipe.title}"</h2>
      <div className='edit-form-buttons'>
        <button className='cancel-button' onClick={handleCancel}>
          Cancel
        </button>
      </div>
      <form onSubmit={(e) => handleUpdateRecipe(e, selectedRecipe)}>
        <label>Title</label>
        <input type='text' name='title' value={selectedRecipe.title} onChange={(e) => onUpdateForm(e, "update")} />

        <label>Ingredients</label>
        <textarea name='ingredients' value={selectedRecipe.ingredients} onChange={(e) => onUpdateForm(e, "update")} />

        <label>Instructions</label>
        <textarea name='instructions' value={selectedRecipe.instructions} onChange={(e) => onUpdateForm(e, "update")} />

        <label>Description</label>
        <textarea name='description' value={selectedRecipe.description} onChange={(e) => onUpdateForm(e, "update")} />

        <label>Image</label>
        <input type='text' name='image_url' value={selectedRecipe.image_url} onChange={(e) => onUpdateForm(e, "update")} />

        <label>Servings</label>
        <input type='number' name='servings' value={selectedRecipe.servings} onChange={(e) => onUpdateForm(e, "update")} />

        <button type='submit'>Update</button>
      </form>
    </div>
  );
};

export default EditRecipeForm;
