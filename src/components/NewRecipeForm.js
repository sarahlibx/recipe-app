import React from "react";

const NewRecipeForm = ({ newRecipe, handleNewRecipe, onUpdateForm, hideRecipeForm }) => {
  return (
    <div className='recipe-details'>
      <div className='recipe-form new-form'>
        <h2>New Recipe</h2>
        <button onClick={hideRecipeForm}>Close</button>
        <form onSubmit={(e) => handleNewRecipe(e, newRecipe)}>
          <label>Title</label>
          <input type='text' name='title' value={newRecipe.title} onChange={(e) => onUpdateForm(e, "new")} />

          <label>Ingredients</label>
          <textarea name='ingredients' value={newRecipe.ingredients} onChange={(e) => onUpdateForm(e, "new")} />

          <label>Instructions</label>
          <textarea
            name='instructions'
            placeholder='Add ingredients separated by commas - i.e. Flour, sugar, almonds'
            value={newRecipe.instructions}
            onChange={(e) => onUpdateForm(e, "new")}
          />

          <label>Description</label>
          <textarea name='description' value={newRecipe.description} onChange={(e) => onUpdateForm(e, "new")} />

          <label>
            Image <span>(optional)</span>
          </label>
          <input type='text' name='image_url' value={newRecipe.image_url} onChange={(e) => onUpdateForm(e, "new")} />

          <label>Servings</label>
          <input type='number' name='servings' value={newRecipe.servings} onChange={(e) => onUpdateForm(e, "new")} />

          <button type='submit'>Create New Recipe</button>
        </form>
      </div>
    </div>
  );
};

export default NewRecipeForm;
