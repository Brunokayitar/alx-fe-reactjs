import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const FavoritesList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const favorites = useRecipeStore(state => state.favorites);

  // Map favorite IDs to actual recipe objects
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>My Favorite Recipes</h2>
      {favoriteRecipes.length === 0 ? (
        <p>No favorites yet. Click the ♡ button on a recipe to add it!</p>
      ) : (
        favoriteRecipes.map(recipe => (
          <div key={recipe.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
            <h3>
              <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            </h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;