import React, { useState } from "react";

// TODO - create form to edit

// TODO - on submit for the form, fire the updateRecipe function and make selectedRecipe null so we are back to viewing all of them.
function RecipeFull({ recipe, updateRecipe }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({ ...recipe });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    updateRecipe(recipe.id, formData);
    setShowEditForm(false);
    // call updateRecipe and pass it the info it needs
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='recipe'>
      <h2>{recipe.title}</h2>
      {showEditForm && (
        <form className='edit-form' onSubmit={handleSubmit}>
          <h2>Edit Recipe</h2>
          <button type='button' onClick={() => setShowEditForm(false)}>
            Cancel
          </button>
          <div className='form-control'>
            <label htmlFor='name'>Title</label>
            <input required id='title' name='title' value={formData.title} onChange={handleChange} />
          </div>
          <div className='form-control'>
            <label htmlFor='ingredients'>Ingredients</label>
            <textarea required id='ingredients' name='ingredients' value={formData.ingredients} onChange={handleChange} />
          </div>
          <div className='form-control'>
            <label htmlFor='instructions'>Instructions</label>
            <textarea required id='instructions' name='instructions' value={formData.instructions} onChange={handleChange} />
          </div>
          <div className='form-control'>
            <label htmlFor='servings'>Servings</label>
            <input required id='servings' name='servings' value={formData.servings} onChange={handleChange} />
          </div>
          <button type='submit'>Update Recipe</button>
        </form>
      )}
      <button type='button' onClick={() => setShowEditForm(true)}>
        Edit
      </button>
      <h3>Ingredients</h3>
      <p>{formData.ingredients}</p>
      <h3>Instructions</h3>
      <p>{formData.instructions}</p>
      <h4>Servings</h4>
      <p>{formData.servings}</p>
    </div>
  );
}

export default RecipeFull;
