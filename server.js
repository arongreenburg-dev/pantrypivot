import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json({ limit: '10mb' }));
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
    input.favoriteChef ? `Style Inspiration: ${input.favoriteChef}` : '',
    '',
    'Return exactly this JSON shape (3 recipe cards, selectedRecipe is the first card in full detail):',
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
  "selectedRecipe": {
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
  }
}`,
  ];

  return lines.filter(l => l !== null).join('\n');
}

async function callGemini(prompt, imageBase64) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY environment variable is not set');

  const ai = new GoogleGenAI({ apiKey });

  const contents = imageBase64
    ? [
        { text: prompt },
        { inlineData: { mimeType: 'image/jpeg', data: imageBase64.replace(/^data:image\/\w+;base64,/, '') } },
      ]
    : prompt;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents,
    config: { responseMimeType: 'application/json' },
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

app.post('/api/generateRecipes', async (req, res) => {
  try {
    const prompt = buildRecipePrompt(req.body);
    const data = await callGemini(prompt, req.body.ingredientPhoto);
    res.json(data);
  } catch (err) {
    console.error('generateRecipes error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate recipes' });
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
    res.json(data);
  } catch (err) {
    console.error('generateIdeas error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate ideas' });
  }
});

// SPA fallback — serve index.html for all non-API routes
app.get('/{*splat}', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
