import create from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes(); // re-filter after setting term
  },
  filterRecipes: () => set(state => ({
    filteredRecipes: state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    )
  })),
  addRecipe: (newRecipe) => {
    set(state => ({ recipes: [...state.recipes, newRecipe] }));
    get().filterRecipes(); // re-filter after adding
  },
  deleteRecipe: (recipeId) => {
    set(state => ({
      recipes: state.recipes.filter(recipe => recipe.id !== recipeId)
    }));
    get().filterRecipes(); // re-filter after deletion
  },
  updateRecipe: (updatedRecipe) => {
    set(state => ({
      recipes: state.recipes.map(recipe =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    }));
    get().filterRecipes(); // re-filter after update
  },
  setRecipes: (recipes) => {
    set({ recipes });
    get().filterRecipes(); // re-filter after initial load
  }
}));

export default useRecipeStore;