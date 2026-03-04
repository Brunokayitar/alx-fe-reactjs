import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>Recipe Sharing App</h1>
        <SearchBar />
        <AddRecipeForm />
        <Routes>
          <Route path="/" element={
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 2 }}>
                <h2>All Recipes</h2>
                <RecipeList />
              </div>
              <div style={{ flex: 1 }}>
                <FavoritesList />
                <RecommendationsList />
              </div>
            </div>
          } />
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;