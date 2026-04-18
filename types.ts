
export type MealType = 'Main Dish' | 'Side Dish' | 'Salad' | 'Soup' | 'Appetizer' | 'Dessert' | 'Snack' | 'Breakfast';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type EffortLevel = 'Low' | 'Medium' | 'High';
export type SpiceLevel = 'None' | 'Mild' | 'Medium' | 'Hot';
export type HouseholdType = 'kids' | 'adults' | 'older adults' | 'mixed';
export type KosherType = 'Meat' | 'Dairy' | 'Pareve' | 'None';
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
export type ConvenienceFilter = 'One Pot' | 'Under 30 Minutes' | 'Budget-Friendly' | 'High-Protein' | 'Family-Friendly' | 'Minimal Prep';
export type UnitSystem = 'Imperial' | 'Metric';
export type HealthCondition = 'Diabetes' | 'Heart Disease' | 'Hypertension' | 'Gastrointestinal';

export interface RecipeCard {
  id: string;
  name: string;
  rationale: string;
  timeMinutes: number;
  difficulty: Difficulty;
  ingredientsUsed: string[];
  extraNeeded: string[];
}

export interface Ingredient {
  item: string;
  amount: string;
}

export interface NutritionEstimate {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  sodium_mg: number;
  disclaimer: string;
}

export interface DetailedRecipe {
  name: string;
  servings: number;
  timeMinutes: number;
  ingredients: Ingredient[];
  steps: string[];
  substitutions: string[];
  leftovers: string[];
  nutritionEstimate?: NutritionEstimate;
}

export interface MealIdea {
  id: string;
  name: string;
  description: string;
}

export interface GenerationResponse {
  recipeCards: RecipeCard[];
  selectedRecipe: DetailedRecipe;
  ideas?: MealIdea[];
  kosherForPassover?: boolean;
}

export interface AppSettings {
  name?: string;
  defaultDietaryRestrictions: string[];
  defaultHousehold: HouseholdType;
  defaultSpice: SpiceLevel;
  defaultCuisines: string[];
  defaultEquipment: string[];
  isKosher: boolean;
  skillLevel: SkillLevel;
  unitSystem: UnitSystem;
  favoriteChef?: string;
  hasOnboarded: boolean;
}

export interface WizardState {
  userPrompt: string;
  mealType: MealType;
  servings: number;
  leftovers: boolean;
  timeAvailable: number;
  effortLevel: EffortLevel;
  spiceLevel: SpiceLevel;
  cuisines: string[];
  household: HouseholdType;
  allergies: string[];
  customAllergies: string;
  dietaryRestrictions: string[];
  convenienceFilters: ConvenienceFilter[];
  customHealthGoals: string;
  customReligious: string;
  pantryStaples: string[];
  ingredientPhoto?: string;
  equipment: string[];
  avoidList: string[];
  isKosher: boolean;
  kosherType: KosherType[];
  skillLevel: SkillLevel;
  unitSystem: UnitSystem;
  kidFriendly?: boolean;
  favoriteChef?: string;
  kosherForPassover?: boolean;
  healthConditions: HealthCondition[];
}

export interface SavedRecipe {
  id: string;
  timestamp: number;
  data: DetailedRecipe;
}
