import React, { useState, useEffect } from "react";
import "./RecipeCard.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import RecipeDetailsDialog from "../RecipeInfo/RecipeInfo";

export default function RecipeCard(props) {
  // State for tracking favorite status
  const [isFavorited, setIsFavorited] = useState(false);
  // State for managing snackbar visibility
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // State for managing recipe details dialog visibility
  const [recipeDetailsOpen, setRecipeDetailsOpen] = useState(false);

  // Function to toggle the favorite status of the recipe
  const toggleFavorite = () => {
    // Toggle the favorite status
    const newFavoritedState = !isFavorited;
    setIsFavorited(newFavoritedState);

    // Retrieve existing favorites from local storage
    const existingFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    // Check if the recipe is already in favorites
    const isRecipeInFavorites = existingFavorites.some(
      (favorite) => favorite.recipe.label === props.recipe.recipe.label
    );

    if (newFavoritedState) {
      // If the recipe is favorited, add it to the array only if it's not already present
      if (!isRecipeInFavorites) {
        const updatedFavorites = [...existingFavorites, props.recipe];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        // Show snackbar
        setSnackbarOpen(true);
      }
    } else {
      // If the recipe is unfavorited, remove it from the array
      const updatedFavorites = existingFavorites.filter(
        (favorite) => favorite.recipe.label !== props.recipe.recipe.label
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  // Effect to check if the recipe is already in favorites when the component mounts
  useEffect(() => {
    const existingFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const isRecipeInFavorites = existingFavorites.some(
      (favorite) => favorite.recipe.label === props.recipe.recipe.label
    );
    // Update isFavorited state based on whether the recipe is in favorites
    setIsFavorited(isRecipeInFavorites);
  }, [props.recipe.recipe.label]);

  // Function to handle closing the snackbar
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Rounding the calories to the nearest integer
  const roundedCalories = Math.round(props.recipe.recipe.calories);

  // Function to handle opening the recipe details popup
  const handleViewRecipeClick = () => {
    setRecipeDetailsOpen(true);
  };

  // Function to handle closing the recipe details popup
  const handleRecipeDetailsClose = () => {
    setRecipeDetailsOpen(false);
  };

  return (
    <div className="card">
      <div className="banner-img">
        <img
          src={props.recipe.recipe.images?.REGULAR?.url}
          alt={props.recipe.recipe.label}
        />
      </div>
      <div className="card-body">
        {/* Recipe label */}
        <p className="label">{props.recipe.recipe.label}</p>

        {/* Calories information */}
        <div className="calories">
          <p className="calories-title">Calories </p>
          <p className="pointer"></p>
          <p className="calories-value">{roundedCalories}</p>
          <img
            src="./images/calories.png"
            height={20}
          />
        </div>

        {/* Recipe footer with 'View Recipe' link and badge */}
        <div className="recipe-card-footer">
          <p
            onClick={handleViewRecipeClick}
            style={{ cursor: "pointer", color: "blue" }}
          >
            View Recipe
          </p>
          <div className="badge">
            <p className="badge-text">{props.recipe.recipe.mealType[0]}</p>
          </div>
        </div>

        {/* Favorites icon */}
        <div className="favorites-icon" onClick={toggleFavorite}>
          <FavoriteIcon
            style={{
              fill: isFavorited ? "red" : "grey",
            }}
          />
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          style={{ backgroundColor: "green", color: "white" }}
          iconMapping={{
            success: <FavoriteIcon style={{ color: "white" }} />,
          }}
        >
          Recipe added to favorites!
        </Alert>
      </Snackbar>

      {/* Recipe Details Popup */}
      <RecipeDetailsDialog
        open={recipeDetailsOpen}
        onClose={() => setRecipeDetailsOpen(false)}
        recipe={props.recipe.recipe}
      />
    </div>
  );
}
