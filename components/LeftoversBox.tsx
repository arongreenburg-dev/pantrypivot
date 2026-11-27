import { useRef, useState } from 'react';
import SeasonalRecipeBody from './SeasonalRecipeBody';
import { generateRecipes } from '../lib/recipeModel';
import { getSettings } from '../lib/storage';
import { COMMON_EQUIPMENT, PANTRY_STAPLES } from '../constants';
import { track } from './HolidayPicks';
import type { DetailedRecipe, GenerationResponse, RecipeCard, WizardState } from '../types';

const USDA =
  'https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety';
const EXAMPLE = 'e.g. about 3 cups turkey, 2 cups mashed potatoes, half a pan of stuffing, some cranberry sauce';

function request(leftovers: string): WizardState {
  const s = getSettings();
  return {
    userPrompt: leftovers,
    thanksgivingLeftovers: true,
    mealType: 'Main Dish',
    servings: 4,
    leftovers: false,
    timeAvailable: 45,
    effortLevel: 'Low',
    spiceLevel: s.defaultSpice,
    cuisines: s.defaultCuisines,
    household: s.defaultHousehold,
    allergies: [],
    customAllergies: '',
    dietaryRestrictions: s.defaultDietaryRestrictions,
    convenienceFilters: [],
    customHealthGoals: '',
    customReligious: '',
    pantryStaples: [...PANTRY_STAPLES],
    equipment: [...COMMON_EQUIPMENT],
    avoidList: [],
    isKosher: s.isKosher,
    kosherType: [],
    skillLevel: s.skillLevel,
    unitSystem: s.unitSystem,
    healthConditions: [],
  } as WizardState;
}

// One box: people type what is left and roughly how much; the AI returns recipes.
export default function LeftoversBox() {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ cards: RecipeCard[]; details: DetailedRecipe[] } | null>(null);
  const results = useRef<HTMLDivElement>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (text.trim().length < 3) {
      setError('Type what you have left over, like "3 cups turkey, 2 cups mashed potatoes".');
      return;
    }
    setBusy(true);
    setError('');
    setResult(null);
    try {
      const data: GenerationResponse = await generateRecipes(request(text.trim()));
      const details = data.recipeDetails?.length ? data.recipeDetails : [data.selectedRecipe];
      setResult({ cards: data.recipeCards, details });
      track('thanksgiving_leftovers_recipe_generated', { source: 'ai' });
      setTimeout(() => results.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <form onSubmit={submit} className="leftovers-box">
        <label htmlFor="leftovers-text">What do you have left over? Include rough amounts.</label>
        <textarea
          id="leftovers-text"
          rows={4}
          maxLength={1500}
          value={text}
          placeholder={EXAMPLE}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="primary" type="submit" disabled={busy}>
          {busy ? 'Cooking up ideas… (about 30 seconds)' : 'Get leftover recipes'}
        </button>
        <p className="leftovers-note">
          Eat refrigerated leftovers within 3–4 days and reheat to 165°F.{' '}
          <a href={USDA} target="_blank" rel="noreferrer">USDA leftovers guide</a>
        </p>
      </form>
      {error && <p role="alert">{error}</p>}
      {result && (
        <div ref={results}>
          <h2>Your leftover recipes</h2>
          {result.cards.map((card, i) => {
            const d = result.details[i];
            if (!d) return null;
            return (
              <details key={card.id + i} className="season-recipe-card" open={i === 0}>
                <summary>
                  <h3>{d.name}</h3>
                  <span className="recipe-meta">
                    About {d.timeMinutes} minutes · Serves {d.servings}
                    {card.extraNeeded.length ? ' · Also need: ' + card.extraNeeded.join(', ') : ''}
                  </span>
                </summary>
                <p>{card.rationale}</p>
                <SeasonalRecipeBody ingredients={d.ingredients} steps={d.steps} />
              </details>
            );
          })}
          <p className="leftovers-note">AI-generated recipes. Check ingredients for allergies and dietary needs.</p>
        </div>
      )}
    </>
  );
}
