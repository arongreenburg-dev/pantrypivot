
import { AppSettings, SavedRecipe } from '../types';
import { DEFAULT_SETTINGS } from '../constants';

const STORAGE_KEYS = {
  SETTINGS: 'pantrypilot_settings',
  SAVED_RECIPES: 'pantrypilot_saved_recipes',
};

// Check if we should use Firebase mode (placeholder for later integration)
const isFirebaseEnabled = (): boolean => {
  // In a real Vite app, you'd check import.meta.env.VITE_FIREBASE_API_KEY
  // For this XML environment, we focus on localStorage as requested.
  return false; 
};

export const getSettings = (): AppSettings => {
  if (isFirebaseEnabled()) {
    // TODO: Implement Firebase Firestore fetch
  }
  const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
};

export const saveSettings = (settings: AppSettings): void => {
  if (isFirebaseEnabled()) {
    // TODO: Implement Firebase Firestore save
  }
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};

export const getSavedRecipes = (): SavedRecipe[] => {
  if (isFirebaseEnabled()) {
     // TODO: Implement Firebase Firestore fetch
  }
  const stored = localStorage.getItem(STORAGE_KEYS.SAVED_RECIPES);
  return stored ? JSON.parse(stored) : [];
};

export const saveRecipe = (recipe: SavedRecipe): void => {
  const recipes = getSavedRecipes();
  const updated = [recipe, ...recipes.filter(r => r.id !== recipe.id)];
  if (isFirebaseEnabled()) {
    // TODO: Implement Firebase Firestore collection add
  }
  localStorage.setItem(STORAGE_KEYS.SAVED_RECIPES, JSON.stringify(updated));
};

export const deleteRecipe = (recipeId: string): void => {
  const recipes = getSavedRecipes();
  const updated = recipes.filter(r => r.id !== recipeId);
  localStorage.setItem(STORAGE_KEYS.SAVED_RECIPES, JSON.stringify(updated));
};
