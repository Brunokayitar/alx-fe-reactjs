import create from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [], // array of recipe IDs
  recommendations: [],

  // Search and filter actions
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes();
  },
  filterRecipes: () => set(state => ({
    filteredRecipes: state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    )
  })),

  // CRUD actions
  addRecipe: (newRecipe) => {
    set(state => ({ recipes: [...state.recipes, newRecipe] }));
    get().filterRecipes();
    get().generateRecommendations(); // update recs after recipe change
  },
  deleteRecipe: (recipeId) => {
    set(state => ({
      recipes: state.recipes.filter(recipe => recipe.id !== recipeId)
    }));
    get().filterRecipes();
    get().generateRecommendations(); // update recs after recipe change
  },
  updateRecipe: (updatedRecipe) => {
    set(state => ({
      recipes: state.recipes.map(recipe =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    }));
    get().filterRecipes();
    get().generateRecommendations(); // update recs after recipe change
  },
  setRecipes: (recipes) => {
    set({ recipes });
    get().filterRecipes();
    get().generateRecommendations(); // update recs after initial load
  },

  // Favorites actions
  addFavorite: (recipeId) => {
  set(state => ({ favorites: [...state.favorites, recipeId] }));
  get().generateRecommendations(); // update recs after adding favorite
},
removeFavorite: (recipeId) => {
  set(state => ({ favorites: state.favorites.filter(id => id !== recipeId) }));
  get().generateRecommendations(); // update recs after removing favorite
},
  // Generate recommendations based on favorites
  generateRecommendations: () => {
    // Simple recommendation: recommend random recipes that are not in favorites,
    // but if there are favorites, recommend recipes that share keywords with them.
    const state = get();
    const { recipes, favorites } = state;
    
    // If no favorites, recommend random 3 recipes
    if (favorites.length === 0) {
      const shuffled = [...recipes].sort(() => 0.5 - Math.random());
      const recommended = shuffled.slice(0, 3);
      set({ recommendations: recommended });
      return;
    }

    // Get favorite recipe objects
    const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));
    
    // Extract keywords from favorite titles (split by spaces, lowercase)
    const keywords = favoriteRecipes.flatMap(recipe => 
      recipe.title.toLowerCase().split(' ')
    );
    
    // Score each non-favorite recipe by keyword matches
    const nonFavoriteRecipes = recipes.filter(recipe => !favorites.includes(recipe.id));
    const scored = nonFavoriteRecipes.map(recipe => {
      const titleWords = recipe.title.toLowerCase().split(' ');
      const matchCount = keywords.filter(word => titleWords.includes(word)).length;
      return { recipe, score: matchCount };
    });
    
    // Sort by score descending and take top 3
    const recommended = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.recipe);
    
    set({ recommendations: recommended });
  }
}));

export default useRecipeStore;