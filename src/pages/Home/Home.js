import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Home.css';
import recipeService from '../../services/recipeService';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import Loader from '../../components/Loader/Loader';

export default function Home() {

  // State variables
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Event handler for search
  const handleSearch = async (query) => {
    setSearchTerm(query);
  };

  const getInitialData = async() => {
    const recipes = await recipeService.populateInitialList();
    setRecipes(recipes);
  }

  // Fetch recipes when searchTerm changes
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);

      // Fetch recipes based on the search term
      const recipes = await recipeService.getRecipesByIngredients(searchTerm);
      setRecipes(recipes);

      setLoading(false);
    };

    // Check if search term is not empty before fetching recipes
    if (searchTerm !== '') {
      fetchRecipes();
    }

    if(recipes.length == 0){
      getInitialData();
    }

  }, [searchTerm]);

  return (
    <div className='home'>
      <div className='search-bar'>
        {/* SearchBar component for user input */}
        <SearchBar onSearch={handleSearch}/>
      </div>
      <div className='recipe-body'>
        {/* Display loader while recipes are being fetched */}
        {loading && <Loader/> }

        {/* Display message when no recipes are found */}
        {!loading && recipes.length === 0 && (
          <div className='no-recipes'>
            <img
              src="https://media.istockphoto.com/id/1387270202/vector/food-blogger-cooking-caprese-salad-and-explain-on-camera-how-to-cook-italian-dish-female.jpg?s=612x612&w=0&k=20&c=xfFbMfxUt1JbJ_7rDh-QXXQ26ju7RIjSe9FTGhjs4Kg="
              alt="No recipes found"
              className='no-recipes-image'
            />
            <p>No recipes found.</p>
          </div>
        )}

        {/* Display the list of recipes */}
        {!loading && recipes.length > 0 && (
          <div className='recipe-list'>
            {recipes.map((recipe) => (
              // Render RecipeCard component for each recipe
              <RecipeCard recipe={recipe} key={recipe.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
