import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./RecipeInfo.css";

export default function RecipeDetailsDialog({ open, onClose, recipe }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="dialog-header">
        <DialogTitle className="title">{recipe.label} Details</DialogTitle>
        <HighlightOffIcon className="close-icon" onClick={onClose} />
      </div>

      <DialogContent className="dialog-content">
        <div className="recipe-main-info">
          <div className="image-banner">
            <img
              src={recipe.images?.REGULAR?.url}
              alt={recipe.label}
              className="recipe-img"
            />
          </div>

          <div className="type-cards">
            <div className="cusine-card info-card">
              <p className="type-title">Cuisine</p>
              <p className="type-value">{recipe.cuisineType.join(", ")}</p>
            </div>
            <div className="cusine-card info-card">
              <p className="type-title">Meal Type</p>
              <p className="type-value">{recipe.mealType.join(", ")}</p>
            </div>
            <div className="cusine-card info-card">
              <p className="type-title">Dish Type</p>
              <p className="type-value">{recipe.dishType.join(", ")}</p>
            </div>
          </div>
        </div>

        <Divider />
        <div className="ingredients">
          <Typography variant="h6" className="sub-title">Ingredients Needed</Typography>
          <Typography variant="p">
            {recipe.ingredientLines.join("\n")}
          </Typography>
        </div>

        <div className="ingredients-steps">
          <Typography variant="h6" className="sub-title">Follow the steps</Typography>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                <p style={{ fontSize: "13px" }}>{`Step ${index + 1}: Add ${
                  ingredient.quantity
                } ${ingredient.measure} ${ingredient.text}`}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* <Divider />
        <Typography variant="h6">Ingredients</Typography>
        <List>
          {recipe.ingredients.map((ingredient, index) => (
            <ListItem key={index}>
              
              <ListItemText
                primary={`${ingredient.quantity} ${ingredient.measure} ${ingredient.text}`}
              />
            </ListItem>
          ))}
        </List> */}
      </DialogContent>
    </Dialog>
  );
}
