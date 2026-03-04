import { useParams } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === parseInt(recipeId))
  );
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const handleFavoriteToggle = () => {
    if (favorites.includes(recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe.id);
    }
  };

  return (
    <div>
      <h1>
        {recipe.title}
        <button
          onClick={handleFavoriteToggle}
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
      </h1>
      <p>{recipe.description}</p>
      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton recipeId={recipe.id} />
    </div>
  );
};

export default RecipeDetails;