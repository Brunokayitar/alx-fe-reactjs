import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  const handleFavoriteToggle = (recipeId) => {
    if (favorites.includes(recipeId)) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  return (
    <div>
      {filteredRecipes.map(recipe => (
        <div key={recipe.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
          <h3>
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            <button
              onClick={() => handleFavoriteToggle(recipe.id)}
              style={{
                marginLeft: '10px',
                backgroundColor: favorites.includes(recipe.id) ? 'gold' : 'lightgray',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2em'
              }}
            >
              {favorites.includes(recipe.id) ? '★' : '☆'}
            </button>
          </h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;