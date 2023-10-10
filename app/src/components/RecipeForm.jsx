import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Recipe.css";

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    steps: [{ id: uuidv4(), text: "" }],
  });
  const [recipes, setRecipes] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStepChange = (e, stepId) => {
    const { value } = e.target;
    setFormData((prevState) => {
      const newSteps = prevState.steps.map((step) =>
        step.id === stepId ? { ...step, text: value } : step
      );
      return {
        ...prevState,
        steps: newSteps,
      };
    });
  };

  const handleAddStep = () => {
    setFormData((prevState) => ({
      ...prevState,
      steps: [...prevState.steps, { id: uuidv4(), text: "" }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = { ...formData, id: uuidv4() };
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
    setSubmittedData(newRecipe);
    setFormData({
      title: "",
      imageUrl: "",
      steps: [{ id: uuidv4(), text: "" }],
    });
  };

  return (
    <>
      <div className="container">
        <div className="item">
          <h2>Create a Recipe</h2>
          <form className="total" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="imageUrl">Image URL:</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="steps">Steps:</label>
              {formData.steps.map((step, index) => (
                <div key={step.id}>
                  <input
                    type="text"
                    value={step.text}
                    onChange={(e) => handleStepChange(e, step.id)}
                  />
                </div>
              ))}
            </div>
            <div>
              <button
                type="button"
                className="add-step-button"
                onClick={handleAddStep}
              >
                Add Step
              </button>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div>
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h2>Recipe Cards</h2>
            <h3>{recipe.title}</h3>
            <p>Steps:</p>
            <ul>
              {recipe.steps.map((step) => (
                <li key={step.id}>{step.text}</li>
              ))}
            </ul>
            <div>
              <img src={recipe.imageUrl} alt="Recipe" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecipeForm;
