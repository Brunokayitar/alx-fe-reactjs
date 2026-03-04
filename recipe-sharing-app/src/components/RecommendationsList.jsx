import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Recommended for You</h2>
      {recommendations.length === 0 ? (
        <p>Add some favorites to get personalized recommendations!</p>
      ) : (
        recommendations.map(recipe => (
          <div key={recipe.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px', backgroundColor: '#f9f9f9' }}>
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

export default RecommendationsList;