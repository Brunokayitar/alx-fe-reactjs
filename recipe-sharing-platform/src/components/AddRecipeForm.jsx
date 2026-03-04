import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.ingredients.trim()) newErrors.ingredients = 'Ingredients are required';
    if (!formData.instructions.trim()) newErrors.instructions = 'Instructions are required';
    // Optional: check if ingredients contain at least two items (split by commas)
    if (formData.ingredients.trim() && formData.ingredients.split(',').length < 2) {
      newErrors.ingredients = 'Please list at least two ingredients separated by commas';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Normally would send to API, but for now just alert and reset
    alert('Recipe submitted! (In a real app, this would be saved.)');
    setFormData({ title: '', ingredients: '', instructions: '' });
    // Optionally navigate back home
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">Add New Recipe</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        {/* Title field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Recipe Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.title ? 'border-red-500' : ''
            }`}
            placeholder="e.g., Spaghetti Carbonara"
          />
          {errors.title && <p className="text-red-500 text-xs italic mt-1">{errors.title}</p>}
        </div>

        {/* Ingredients field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ingredients">
            Ingredients (separate by commas)
          </label>
          <textarea
            name="ingredients"
            id="ingredients"
            rows="4"
            value={formData.ingredients}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.ingredients ? 'border-red-500' : ''
            }`}
            placeholder="e.g., 200g spaghetti, 2 eggs, 100g bacon"
          />
          {errors.ingredients && <p className="text-red-500 text-xs italic mt-1">{errors.ingredients}</p>}
        </div>

        {/* Instructions field */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructions">
            Preparation Steps
          </label>
          <textarea
            name="instructions"
            id="instructions"
            rows="6"
            value={formData.instructions}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.instructions ? 'border-red-500' : ''
            }`}
            placeholder="Describe how to prepare the recipe..."
          />
          {errors.instructions && <p className="text-red-500 text-xs italic mt-1">{errors.instructions}</p>}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Recipe
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipeForm;
