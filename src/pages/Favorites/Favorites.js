import React, { useEffect, useState } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import './Favorites.css'; // Import your CSS file

export default function Favorites() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    // Retrieve array from local storage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteRecipes(storedFavorites);
  }, []);

  return (
    <div className="favorites-container">
      <h2 className="favorites-heading">Favorites</h2>
      {favoriteRecipes.length === 0 ? (
        <div className="no-recipes-container">
          <img
            src="./images/recipe-logo.png"
            alt="No recipes found"
            className="no-recipes-image"
          />
          <p className="no-favorites-msg">No favorite recipes yet.</p>
        </div>
      ) : (
        <div className="recipe-list">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.recipe.label} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
