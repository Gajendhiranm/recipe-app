//src/services/recipeService.js
import axios from 'axios';

const API_URL = 'https://api.edamam.com/api/recipes/v2';
const APP_ID = 'c8a9801e';
const APP_KEY = 'a5a6ed143b7606045a9c8253b2c3e479';

const getRecipesByIngredients = async (query) => {
  try {
    const response = await axios.get(`${API_URL}?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

const populateInitialList = async (query) => {
  try {
    const response = await axios.get(`${API_URL}?type=public&q=chocolate&app_id=${APP_ID}&app_key=${APP_KEY}`);
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};




export default {
    getRecipesByIngredients,
    populateInitialList
};
