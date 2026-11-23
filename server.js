import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { validInput, validRecipes, validIdeas } from './lib/apiValidation.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json({ limit: '6mb' }));
app.use(express.static(path.join(__dirname, 'dist')));

function buildRecipePrompt(input) {
  const lines = [
    'You are an expert chef and nutritionist. Generate personalized recipes based on the user preferences below.',
    'Return ONLY valid JSON with no markdown fences, no explanation — just the raw JSON object.',
    '',
    `User Request: ${input.userPrompt || 'Create a delicious recipe'}`,
    `Meal Type: ${input.mealType}`,
    `Servings: ${input.servings}`,
    `Time Available: ${input.timeAvailable} minutes`,
    `Effort Level: ${input.effortLevel}`,
    `Spice Level: ${input.spiceLevel}`,
    `Leftovers Desired: ${input.leftovers}`,
    `Skill Level: ${input.skillLevel || 'Intermediate'}`,
    `Unit System: ${input.unitSystem || 'Imperial'}`,
    `Household: ${input.household}`,
    `Dietary Restrictions: ${input.dietaryRestrictions?.join(', ') || 'None'}`,
    `Allergies: ${[...(input.allergies || []), input.customAllergies].filter(Boolean).join(', ') || 'None'}`,
    `Cuisine Preferences: ${input.cuisines?.join(', ') || 'Any'}`,
    `Available Equipment: ${input.equipment?.join(', ') || 'Standard kitchen'}`,
    `Pantry Staples: ${input.pantryStaples?.join(', ') || 'Standard pantry'}`,
    `Convenience Filters: ${input.convenienceFilters?.join(', ') || 'None'}`,
    `Health Goals: ${input.customHealthGoals || 'None'}`,
    `Religious/Dietary Notes: ${input.customReligious || 'None'}`,
    `Avoid: ${input.avoidList?.join(', ') || 'None'}`,
    `Kosher: ${input.isKosher ? `Yes (${input.kosherType?.join(', ') || 'General'})` : 'No'}`,
    input.kosherForPassover
      ? 'This recipe must be strictly Kosher for Passover. No chametz (no wheat, barley, oats, rye, spelt in any leavened form). No kitniyot (no rice, corn, beans, lentils, peas, sesame, mustard, peanuts). Use only Passover-compliant ingredients and substitutions such as matzo meal, potato starch, and almond flour. Label the recipe as Kosher for Passover.'
      : '',
    input.healthConditions?.length
      ? `Health Condition Dietary Constraints: ${[
          input.healthConditions.includes('Diabetes') ? 'low added sugar, complex carbs preferred' : '',
          input.healthConditions.includes('Heart Disease') ? 'low saturated fat, lean proteins' : '',
          input.healthConditions.includes('Hypertension') ? 'low sodium' : '',
          input.healthConditions.includes('Gastrointestinal')
            ? 'low FODMAP friendly, avoid common irritants'
            : '',
        ]
          .filter(Boolean)
          .join('; ')}`
      : '',
    input.favoriteChef ? `Style Inspiration: ${input.favoriteChef}` : '',
    input.kidFriendly
      ? 'Kid-Friendly: Yes — mild flavors, simple textures, fun presentation, no spicy ingredients'
      : '',
    '',
    'Return exactly this JSON shape (3 recipe cards and 3 complete recipeDetails in the same order, with identical names. Apply restrictions to every ingredient, step and substitution):',
    `{
  "recipeCards": [
    {
      "id": "string",
      "name": "string",
      "rationale": "string",
      "timeMinutes": 0,
      "difficulty": "Easy|Medium|Hard",
      "ingredientsUsed": ["string"],
      "extraNeeded": ["string"]
    }
  ],
  "recipeDetails": [{
    "name": "string",
    "servings": 0,
    "timeMinutes": 0,
    "ingredients": [{"item": "string", "amount": "string"}],
    "steps": ["string"],
    "substitutions": ["string"],
    "leftovers": ["string"],
    "nutritionEstimate": {
      "calories": 0,
      "protein_g": 0,
      "carbs_g": 0,
      "fat_g": 0,
      "sodium_mg": 0,
      "disclaimer": "string"
    }
  }]
}`,
  ];

  return lines.filter((l) => l !== null).join('\n');
}

async function callGemini(prompt, imageBase64, maxOutputTokens = 7000) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY environment variable is not set');

  const ai = new GoogleGenAI({ apiKey });

  const contents = imageBase64
    ? [
        { text: prompt },
        {
          inlineData: {
            mimeType: imageBase64.split(';')[0].slice(5),
            data: imageBase64.replace(/^data:image\/\w+;base64,/, ''),
          },
        },
      ]
    : prompt;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents,
    config: {
      responseMimeType: 'application/json',
      maxOutputTokens,
      httpOptions: { timeout: 55000, retryOptions: { attempts: 1 } },
    },
  });

  const text = response.text;
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error('AI returned invalid JSON');
  }
}

app.use('/api', (req, res, next) => {
  if (req.method === 'POST' && !validInput(req.body))
    return res.status(400).json({ error: 'Check the size and format of your ingredients or photo.' });
  next();
});

function generationFailure(res, err) {
  const status = Number(err?.status);
  console.warn('Generation unavailable', { status: Number.isFinite(status) ? status : 'unknown' });
  res
    .status(status === 429 ? 429 : 503)
    .json({
      error:
        'Recipe generation is temporarily unavailable. Your inputs are still here. Try again later.',
    });
}

app.get('/api/version', (_req, res) =>
  res.set('Cache-Control', 'no-store').json({ revision: process.env.K_REVISION || 'local' }),
);

app.post('/api/generateRecipes', async (req, res) => {
  try {
    const prompt = buildRecipePrompt(req.body);
    const data = await callGemini(prompt, req.body.ingredientPhoto);
    data.selectedRecipe = data.recipeDetails?.[0];
    if (!validRecipes(data)) throw Error('Invalid recipe response');
    delete data.recommendedProducts;
    if (req.body.kosherForPassover) data.kosherForPassover = true;
    res.json(data);
  } catch (err) {
    generationFailure(res, err);
  }
});

app.post('/api/generateIdeas', async (req, res) => {
  try {
    const input = req.body;
    const prompt = [
      'You are an expert chef. Generate 5 quick meal ideas based on the request below.',
      'Return ONLY valid JSON with no markdown — just the raw JSON object.',
      '',
      `Request: ${input.userPrompt || 'Suggest creative meal ideas'}`,
      `Dietary restrictions: ${input.dietaryRestrictions?.join(', ') || 'None'}`,
      `Cuisine preferences: ${input.cuisines?.join(', ') || 'Any'}`,
      '',
      'Return exactly: {"ideas": [{"id": "string", "name": "string", "description": "string"}]}',
    ].join('\n');

    const data = await callGemini(prompt, null);
    if (!validIdeas(data)) throw Error('Invalid ideas response');
    res.json(data);
  } catch (err) {
    generationFailure(res, err);
  }
});

// Gemini selects indices only. Recipes, quantities and restrictions remain in the planner.
app.post('/api/thanksgiving', async (req, res) => {
  const { courses, influence, effort } = req.body;
  if (
    !Array.isArray(courses) ||
    courses.length < 4 ||
    courses.length > 5 ||
    !courses.every((x) => typeof x === 'string' && x.length <= 800) ||
    typeof influence !== 'string' ||
    influence.length > 100
  )
    return res.status(400).json({ error: 'Check the menu choices.' });
  try {
    const lists = courses.map((x) => JSON.parse(x));
    if (
      !lists.every(
        (items) =>
          Array.isArray(items) &&
          items.length > 0 &&
          items.length <= 6 &&
          items.every((x) => typeof x === 'string' && x.length <= 120),
      )
    )
      return res.sendStatus(400);
    const data = await callGemini(
      'Choose one dish per course for a cohesive Thanksgiving menu. Return JSON {"choices":[zero-based index per course]}. Preferences and candidate lists: ' +
        JSON.stringify({ influence, effort, lists }),
      null,
      1200,
    );
    if (
      !Array.isArray(data.choices) ||
      data.choices.length !== lists.length ||
      !data.choices.every((n, i) => Number.isInteger(n) && n >= 0 && n < lists[i].length)
    )
      throw Error('Invalid choices');
    res.json({ choices: data.choices });
  } catch (err) {
    generationFailure(res, err);
  }
});
app.use('/api', (err, req, res, next) =>
  res
    .status(err.status === 413 ? 413 : 400)
    .json({ error: 'Check the size and format of your request.' }),
);

app.get('/thanksgiving', async (_req, res, next) => {
  try {
    const html = await readFile(path.join(__dirname, 'dist/index.html'), 'utf8');
    const title = 'Thanksgiving, Your Way | PantryPivot';
    const desc =
      'Plan a coordinated Thanksgiving menu for your table, build a shopping list and turn leftovers into another meal.';
    res.type('html').send(
      html
        .replace(/<title>.*?<\/title>/, '<title>' + title + '</title>')
        .replace(
          /((?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]+/g,
          '$1' + desc,
        )
        .replace(/((?:name|property)="(?:og:title|twitter:title)" content=")[^"]+/g, '$1' + title)
        .replace(
          /((?:rel="canonical" href|property="og:url" content)="https:\/\/pantrypivot.com)"/g,
          '$1/thanksgiving"',
        ),
    );
  } catch (err) {
    next(err);
  }
});
// SPA fallback — serve index.html for all non-API routes
app.get('/{*splat}', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
