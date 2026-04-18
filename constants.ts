
import { MealType, Difficulty, EffortLevel, SpiceLevel, HouseholdType, KosherType, SkillLevel, ConvenienceFilter, UnitSystem } from './types';

export const MEAL_TYPES: MealType[] = ['Main Dish', 'Side Dish', 'Salad', 'Soup', 'Appetizer', 'Dessert', 'Snack', 'Breakfast'];
export const EFFORT_LEVELS: EffortLevel[] = ['Low', 'Medium', 'High'];
export const SPICE_LEVELS: SpiceLevel[] = ['None', 'Mild', 'Medium', 'Hot'];
export const HOUSEHOLD_TYPES: HouseholdType[] = ['kids', 'adults', 'older adults', 'mixed'];
export const KOSHER_TYPES: KosherType[] = ['Meat', 'Dairy', 'Pareve'];
export const SKILL_LEVELS: SkillLevel[] = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];
export const UNIT_SYSTEMS: UnitSystem[] = ['Imperial', 'Metric'];

export const CONVENIENCE_FILTERS: ConvenienceFilter[] = [
  'One Pot', 'Under 30 Minutes', 'Budget-Friendly', 'High-Protein', 'Family-Friendly', 'Minimal Prep'
];

export const RELIGIOUS_DIETS = [
  'Kosher', 'Halal', 'Hindu (No Beef)', 'Buddhist (Temple Style)', 'Jain'
];

export const COMMON_ALLERGENS = [
  'Peanuts', 'Tree Nuts', 'Dairy', 'Eggs', 'Soy', 'Wheat', 'Fish', 'Shellfish', 'Sesame', 'Gluten'
];

export const HEALTH_DIETS = [
  'Vegan', 'Vegetarian', 'Keto', 'Paleo', 'Heart-Healthy', 
  'Low-Sodium', 'Anti-Inflammatory', 'Diabetic-Friendly', 'Low-Carb'
];

export const CUISINE_REGIONS = {
  'Mediterranean': ['Mediterranean (General)', 'Greek', 'Italian (Southern)', 'Italian (Northern)', 'Spanish (Tapas)', 'French (Bistro)'],
  'Middle Eastern': ['Israeli', 'Persian', 'Yemeni', 'Lebanese', 'Libyan', 'Turkish', 'Middle Eastern (General)'],
  'American': ['California (Fresh)', 'American (Southern)', 'American (Midwest)', 'Tex-Mex'],
  'Asian': ['Vietnamese', 'Thai', 'Japanese', 'Chinese (Cantonese)', 'Chinese (Szechuan)', 'Indian (North)', 'Indian (South)', 'Korean'],
  'Latin American': ['Mexican (Oaxacan)', 'Argentine', 'Colombian', 'Peruvian (Fusion)', 'Brazilian'],
  'European': ['British', 'German', 'Eastern European', 'Scandinavian'],
  'African': ['Ethiopian', 'Moroccan', 'West African', 'South African']
};

export const CUISINES = Object.values(CUISINE_REGIONS).flat();

export const COMMON_EQUIPMENT = [
  'Oven', 'Stovetop', 'Air Fryer', 'Slow Cooker', 'Pressure Cooker/Multicooker', 'Blender', 'Food Processor', 'Cast Iron', 'Dutch Oven'
];

export const PANTRY_STAPLES = [
  'Olive oil', 'Kosher salt', 'Black Pepper', 'Canned tomatoes', 'Beans', 'Rice', 'Pasta', 'Flour', 'Sugar'
];

export const AFFILIATE_LINKS = {
  ORDER_INGREDIENTS: 'https://amzn.to/3N4KdS6',
  AMAZON_GROCERY: 'https://amzn.to/470PgK2',
  AMAZON_FRESH: 'https://amzn.to/46ydB9T',
  PANTRY_ITEMS: 'https://amzn.to/401EJdJ',
};

export const STAPLE_LINKS: Record<string, string> = {
  'Olive oil': 'https://amzn.to/3MYvtnE',
  'Kosher salt': 'https://amzn.to/46s7ZhA',
  'Black Pepper': 'https://amzn.to/4aGJYpx',
  'Canned tomatoes': 'https://amzn.to/4rJSQRc',
  'Beans': 'https://amzn.to/4rJSQRc',
  'Rice': 'https://amzn.to/46rT7Qb',
  'Pasta': 'https://amzn.to/4tWL9sk',
  'Flour': 'https://amzn.to/47cFu7C',
  'Sugar': 'https://amzn.to/4se0l2w',
};

export const KITCHEN_TOOL_LINKS: Record<string, string> = {
  'Chef’s Knife': 'https://amzn.to/4kXVKPD',
  'Cast Iron': 'https://amzn.to/46QGA9h',
  'Dutch Oven': 'https://amzn.to/47cGCbm',
  'Sheet Pan': 'https://amzn.to/400wEWS',
  'Mixing Bowls': 'https://amzn.to/4u00B74',
  'Measuring Cups': 'https://amzn.to/4be6je7',
  'Immersion Blender': 'https://amzn.to/4skVn4h',
  'Food Processor': 'https://amzn.to/4qWrJkB',
  'Air Fryer': 'https://amzn.to/3N3GPXE',
  'Multicooker': 'https://amzn.to/4u0oU4Q',
  'Stand Mixer': 'https://amzn.to/4013erv',
};

export const DEFAULT_SETTINGS = {
  name: '',
  defaultDietaryRestrictions: [],
  defaultHousehold: 'adults' as HouseholdType,
  defaultSpice: 'Medium' as SpiceLevel,
  defaultCuisines: [],
  defaultEquipment: ['Stovetop', 'Oven'],
  isKosher: false,
  skillLevel: 'Intermediate' as SkillLevel,
  unitSystem: 'Imperial' as UnitSystem,
  favoriteChef: '',
  hasOnboarded: false
};

export const SHOW_KOSHER_FOR_PASSOVER = false;

export const HEALTH_CONDITIONS = [
  'Diabetes',
  'Heart Disease',
  'Hypertension',
  'Gastrointestinal',
] as const;

type HealthConditionKey = typeof HEALTH_CONDITIONS[number];

export const HEALTH_CONDITION_PROMPTS: Record<HealthConditionKey, string> = {
  'Diabetes':         'low added sugar, complex carbs preferred',
  'Heart Disease':    'low saturated fat, lean proteins',
  'Hypertension':     'low sodium',
  'Gastrointestinal': 'low FODMAP friendly, avoid common irritants',
};

export const HEALTH_CONDITION_DEFINITIONS: Record<HealthConditionKey, string> = {
  'Diabetes':         'Recipes lower in added sugar with complex carbs preferred.',
  'Heart Disease':    'Recipes lower in saturated fat with lean proteins.',
  'Hypertension':     'Recipes lower in sodium.',
  'Gastrointestinal': 'Recipes friendlier to sensitive stomachs (low FODMAP, fewer common irritants).',
};
