import React from 'react';
import useRecipeStore from './recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);
  const filterRecipes = useRecipeStore(state => state.filterRecipes);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    filterRecipes(); // Apply filter immediately when search term changes
  };

  return (
    <input
      type="text"
      placeholder="Search recipes by title..."
      onChange={handleChange}
      style={{ padding: '8px', width: '300px', marginBottom: '20px' }}
    />
  );
};

export default SearchBar;