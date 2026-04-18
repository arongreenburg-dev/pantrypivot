# Health Conditions Filter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the seasonal Kosher for Passover filter with a Health Conditions multi-select section in the PantryPivot Wizard, add a `ConditionInfoIcon` tooltip component, and wire health conditions into the Gemini prompt.

**Architecture:** Feature flag in `constants.ts` hides KFP. New `HealthCondition` type added to `types.ts`. `Wizard.tsx` gains a new section with a self-contained `ConditionInfoIcon` component. `server.js` maps selected conditions to dietary constraint strings appended to the Gemini prompt.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Express/Node.js (server.js), Google Gemini API.

---

## File Map

| File | Change |
|---|---|
| `constants.ts` | Add `SHOW_KOSHER_FOR_PASSOVER`, `HEALTH_CONDITIONS`, `HEALTH_CONDITION_PROMPTS`, `HEALTH_CONDITION_DEFINITIONS`, `HEALTH_CONDITION_TOOLTIP_POSITION` |
| `types.ts` | Add `HealthCondition` type; add `healthConditions` field to `WizardState` |
| `components/Wizard.tsx` | Add `ConditionInfoIcon` component; add `healthConditions` state; extend `toggleList`; wrap KFP button; add Health Conditions section |
| `server.js` | Add health conditions constraint line in `buildRecipePrompt` |

---

## Task 1: Add constants

**Files:**
- Modify: `constants.ts`

- [ ] **Step 1: Add the new constants block**

Open `constants.ts` and add the following at the end of the file (after the `DEFAULT_SETTINGS` block):

```ts
export const SHOW_KOSHER_FOR_PASSOVER = false;

export const HEALTH_CONDITIONS = [
  'Diabetes',
  'Heart Disease',
  'Hypertension',
  'Gastrointestinal',
] as const;

export const HEALTH_CONDITION_PROMPTS: Record<string, string> = {
  'Diabetes':         'low added sugar, complex carbs preferred',
  'Heart Disease':    'low saturated fat, lean proteins',
  'Hypertension':     'low sodium',
  'Gastrointestinal': 'low FODMAP friendly, avoid common irritants',
};

export const HEALTH_CONDITION_DEFINITIONS: Record<string, string> = {
  'Diabetes':         'Recipes lower in added sugar with complex carbs preferred.',
  'Heart Disease':    'Recipes lower in saturated fat with lean proteins.',
  'Hypertension':     'Recipes lower in sodium.',
  'Gastrointestinal': 'Recipes friendlier to sensitive stomachs (low FODMAP, fewer common irritants).',
};

export const HEALTH_CONDITION_TOOLTIP_POSITION: Record<string, string> = {
  'Diabetes':         'left-0',
  'Heart Disease':    'right-0',
  'Hypertension':     'left-0',
  'Gastrointestinal': 'right-0',
};
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run lint
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add constants.ts
git commit -m "feat: add health conditions constants and KFP feature flag"
```

---

## Task 2: Add TypeScript types

**Files:**
- Modify: `types.ts`

- [ ] **Step 1: Add `HealthCondition` type and update `WizardState`**

Open `types.ts`. After line 10 (`export type UnitSystem = ...`), add:

```ts
export type HealthCondition = 'Diabetes' | 'Heart Disease' | 'Hypertension' | 'Gastrointestinal';
```

Then in the `WizardState` interface (currently ending at line 101), add `healthConditions` as the last field before the closing brace:

```ts
  healthConditions: HealthCondition[];
```

The full updated bottom of the `WizardState` interface will look like:

```ts
  kosherForPassover?: boolean;
  healthConditions: HealthCondition[];
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run lint
```

Expected: TypeScript will now report an error in `Wizard.tsx` because `formData` doesn't yet include `healthConditions`. This is expected — it will be fixed in Task 3. The only error should be in `Wizard.tsx`, not in `types.ts` itself.

- [ ] **Step 3: Commit**

```bash
git add types.ts
git commit -m "feat: add HealthCondition type and healthConditions field to WizardState"
```

---

## Task 3: Update server.js prompt builder

**Files:**
- Modify: `server.js`

- [ ] **Step 1: Add health conditions constraint to `buildRecipePrompt`**

In `server.js`, locate `buildRecipePrompt`. The current lines near the end of the `lines` array are (approximately lines 38–41):

```js
    input.kosherForPassover ? 'This recipe must be strictly Kosher for Passover. No chametz (no wheat, barley, oats, rye, spelt in any leavened form). No kitniyot (no rice, corn, beans, lentils, peas, sesame, mustard, peanuts). Use only Passover-compliant ingredients and substitutions such as matzo meal, potato starch, and almond flour. Label the recipe as Kosher for Passover.' : '',
    input.favoriteChef ? `Style Inspiration: ${input.favoriteChef}` : '',
```

Add the following line immediately after the `kosherForPassover` line:

```js
    input.healthConditions?.length
      ? `Health Condition Dietary Constraints: ${[
          input.healthConditions.includes('Diabetes')         ? 'low added sugar, complex carbs preferred' : '',
          input.healthConditions.includes('Heart Disease')    ? 'low saturated fat, lean proteins' : '',
          input.healthConditions.includes('Hypertension')     ? 'low sodium' : '',
          input.healthConditions.includes('Gastrointestinal') ? 'low FODMAP friendly, avoid common irritants' : '',
        ].filter(Boolean).join('; ')}`
      : '',
```

The block should now read:

```js
    input.kosherForPassover ? 'This recipe must be strictly Kosher for Passover...' : '',
    input.healthConditions?.length
      ? `Health Condition Dietary Constraints: ${[
          input.healthConditions.includes('Diabetes')         ? 'low added sugar, complex carbs preferred' : '',
          input.healthConditions.includes('Heart Disease')    ? 'low saturated fat, lean proteins' : '',
          input.healthConditions.includes('Hypertension')     ? 'low sodium' : '',
          input.healthConditions.includes('Gastrointestinal') ? 'low FODMAP friendly, avoid common irritants' : '',
        ].filter(Boolean).join('; ')}`
      : '',
    input.favoriteChef ? `Style Inspiration: ${input.favoriteChef}` : '',
```

- [ ] **Step 2: Manual smoke test of prompt construction**

Start the dev server:

```bash
npm run dev
```

Open DevTools → Network → XHR. Select Diabetes + Hypertension in the wizard. Click "Generate My Recipe". In the POST to `/api/generateRecipes`, verify the request body contains:

```json
"healthConditions": ["Diabetes", "Hypertension"]
```

Stop the server.

- [ ] **Step 3: Commit**

```bash
git add server.js
git commit -m "feat: map health conditions to dietary constraint strings in Gemini prompt"
```

---

## Task 4: Update Wizard.tsx — state, KFP flag, ConditionInfoIcon, Health Conditions section

**Files:**
- Modify: `components/Wizard.tsx`

This is the largest task. Complete all steps before committing.

- [ ] **Step 1: Update imports at the top of Wizard.tsx**

The current import line 2 is:
```tsx
import { WizardState, GenerationResponse, AppSettings, ConvenienceFilter, UnitSystem, MealIdea } from '../types';
```

Change it to:
```tsx
import { WizardState, GenerationResponse, AppSettings, ConvenienceFilter, UnitSystem, MealIdea, HealthCondition } from '../types';
```

The current import line 3 is:
```tsx
import { MEAL_TYPES, EFFORT_LEVELS, SPICE_LEVELS, HOUSEHOLD_TYPES, RELIGIOUS_DIETS, HEALTH_DIETS, CUISINE_REGIONS, COMMON_EQUIPMENT, KOSHER_TYPES, PANTRY_STAPLES, COMMON_ALLERGENS, STAPLE_LINKS, CONVENIENCE_FILTERS, AFFILIATE_LINKS, UNIT_SYSTEMS } from '../constants';
```

Change it to:
```tsx
import { MEAL_TYPES, EFFORT_LEVELS, SPICE_LEVELS, HOUSEHOLD_TYPES, RELIGIOUS_DIETS, HEALTH_DIETS, CUISINE_REGIONS, COMMON_EQUIPMENT, KOSHER_TYPES, PANTRY_STAPLES, COMMON_ALLERGENS, STAPLE_LINKS, CONVENIENCE_FILTERS, AFFILIATE_LINKS, UNIT_SYSTEMS, SHOW_KOSHER_FOR_PASSOVER, HEALTH_CONDITIONS, HEALTH_CONDITION_DEFINITIONS, HEALTH_CONDITION_TOOLTIP_POSITION } from '../constants';
```

- [ ] **Step 2: Add the `ConditionInfoIcon` component**

Add the following component definition directly above the `const Wizard: React.FC` line (after the `VEGGIE_KEYWORDS` constant, before the Wizard component):

```tsx
const ConditionInfoIcon: React.FC<{
  condition: string;
  definition: string;
  positionClass: string;
  openKey: string | null;
  onOpen: (key: string | null) => void;
}> = ({ condition, definition, positionClass, openKey, onOpen }) => {
  const isOpen = openKey === condition;
  return (
    <span
      className="relative inline-flex"
      onClick={e => e.stopPropagation()}
    >
      <button
        type="button"
        aria-label={`What does ${condition} filter mean?`}
        aria-expanded={isOpen}
        onClick={() => onOpen(isOpen ? null : condition)}
        className="ml-1 text-slate-400 hover:text-slate-600 text-[11px] leading-none align-middle"
      >
        ⓘ
      </button>
      {isOpen && (
        <span
          className={`absolute top-full mt-1 z-20 w-52 bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-[11px] font-medium text-slate-600 leading-relaxed ${positionClass}`}
          onClick={e => e.stopPropagation()}
        >
          {definition}
        </span>
      )}
    </span>
  );
};
```

- [ ] **Step 3: Add `healthConditions` to the formData initial state**

Locate the `useState<WizardState>` call (around line 18). The last two fields before the closing `})` are:

```ts
    favoriteChef: settings.favoriteChef,
    kosherForPassover: false,
```

Add `healthConditions` after `kosherForPassover`:

```ts
    favoriteChef: settings.favoriteChef,
    kosherForPassover: false,
    healthConditions: [],
```

- [ ] **Step 4: Extend `toggleList` to include `healthConditions`**

The current `toggleList` signature (line ~48) is:

```tsx
const toggleList = (key: 'cuisines' | 'dietaryRestrictions' | 'equipment' | 'allergies' | 'pantryStaples' | 'convenienceFilters' | 'kosherType', item: string) => {
```

Change it to:

```tsx
const toggleList = (key: 'cuisines' | 'dietaryRestrictions' | 'equipment' | 'allergies' | 'pantryStaples' | 'convenienceFilters' | 'kosherType' | 'healthConditions', item: string) => {
```

- [ ] **Step 5: Add `openTooltip` state to the Wizard component**

After the existing `const [showStaples, setShowStaples] = useState(false);` line, add:

```tsx
const [openTooltip, setOpenTooltip] = useState<string | null>(null);
```

Also add the outside-click dismissal effect. Place it immediately after the new `useState` line:

```tsx
React.useEffect(() => {
  if (!openTooltip) return;
  const handler = () => setOpenTooltip(null);
  document.addEventListener('click', handler);
  return () => document.removeEventListener('click', handler);
}, [openTooltip]);
```

- [ ] **Step 6: Wrap the KFP button with the feature flag**

Locate the KFP `<button>` block inside the `{/* Kid-Friendly & Passover Toggles */}` section. It currently starts with:

```tsx
<button
  type="button"
  onClick={() => updateForm('kosherForPassover', !formData.kosherForPassover)}
  className={`flex items-center gap-3 px-5 py-3 rounded-2xl border-2 font-bold text-sm transition-all ${
    formData.kosherForPassover
      ? 'bg-indigo-50 border-indigo-400 text-indigo-700'
      : 'border-slate-200 text-slate-600 hover:border-indigo-300'
  }`}
>
  <span className="text-xl">🍽</span>
  {formData.kosherForPassover ? 'Kosher for Passover ON' : 'Kosher for Passover'}
</button>
```

Wrap it:

```tsx
{SHOW_KOSHER_FOR_PASSOVER && (
  <button
    type="button"
    onClick={() => updateForm('kosherForPassover', !formData.kosherForPassover)}
    className={`flex items-center gap-3 px-5 py-3 rounded-2xl border-2 font-bold text-sm transition-all ${
      formData.kosherForPassover
        ? 'bg-indigo-50 border-indigo-400 text-indigo-700'
        : 'border-slate-200 text-slate-600 hover:border-indigo-300'
    }`}
  >
    <span className="text-xl">🍽</span>
    {formData.kosherForPassover ? 'Kosher for Passover ON' : 'Kosher for Passover'}
  </button>
)}
```

- [ ] **Step 7: Add the Health Conditions section**

Locate the comment `{/* Cuisine Style */}` (currently after the Dietary & Health section, around line 194). Insert the following block immediately before it:

```tsx
{/* Health Conditions */}
<div className="space-y-4">
  <p className="text-xs font-bold text-slate-500">Health Conditions</p>
  <p className="text-[10px] font-medium text-slate-400">
    Not medical advice. Consult your doctor before changing your diet.
  </p>
  <div className="flex flex-wrap gap-2">
    {HEALTH_CONDITIONS.map(condition => (
      <button
        key={condition}
        type="button"
        onClick={() => toggleList('healthConditions', condition)}
        className={`flex items-center px-4 py-2 rounded-full text-xs font-bold border transition-all ${
          formData.healthConditions.includes(condition as HealthCondition)
            ? 'bg-violet-100 border-violet-400 text-violet-700 shadow-md'
            : 'border-slate-200 text-slate-600 hover:border-violet-300'
        }`}
      >
        {condition}
        <ConditionInfoIcon
          condition={condition}
          definition={HEALTH_CONDITION_DEFINITIONS[condition]}
          positionClass={HEALTH_CONDITION_TOOLTIP_POSITION[condition]}
          openKey={openTooltip}
          onOpen={setOpenTooltip}
        />
      </button>
    ))}
  </div>
</div>
```

- [ ] **Step 8: Verify TypeScript compiles**

```bash
npm run lint
```

Expected: 0 errors.

- [ ] **Step 9: Commit**

```bash
git add components/Wizard.tsx
git commit -m "feat: add Health Conditions filter section with ConditionInfoIcon and KFP feature flag"
```

---

## Task 5: Manual testing walkthrough (section 8 of spec)

Run `npm run dev` and work through every step. Report pass/fail for each.

- [ ] **Step 1: KFP hidden**

Load `http://localhost:5173`. Scroll to the Household section. Confirm "Kosher for Passover" button is absent.

Then in `constants.ts` temporarily set `SHOW_KOSHER_FOR_PASSOVER = true`, save, verify the button reappears and toggles. Revert to `false`.

- [ ] **Step 2: Health Conditions section present**

Confirm the "Health Conditions" section appears between "Dietary & Health" and "Cuisine Style". Confirm the disclaimer text reads "Not medical advice. Consult your doctor before changing your diet."

- [ ] **Step 3: Multi-select behavior**

Click Diabetes → activates (violet fill). Click Hypertension → both active. Click Diabetes again → only Hypertension remains active.

- [ ] **Step 4: Prompt content**

Open DevTools → Network tab. Select Diabetes + Hypertension. Click "Generate My Recipe". Inspect the POST to `/api/generateRecipes`. Confirm `healthConditions` in the request body is `["Diabetes","Hypertension"]`. Confirm the returned recipe reflects low-sugar and low-sodium cooking.

- [ ] **Step 5: Tooltip basic behavior**

Click ⓘ next to Diabetes → popup shows "Recipes lower in added sugar with complex carbs preferred." Click ⓘ next to Heart Disease → Diabetes popup closes, Heart Disease popup opens. Click anywhere outside → popup closes. Confirm that clicking ⓘ does not toggle the Diabetes button selection.

- [ ] **Step 6: Tooltip click propagation**

Open the Diabetes tooltip. Click inside the popup text area. Confirm the popup stays open (does not dismiss).

- [ ] **Step 7: Mobile overflow**

In DevTools, switch to responsive mode at 375px width. Click ⓘ next to "Heart Disease" (right-side button, `right-0`). Confirm the tooltip opens to the left and stays fully on screen. Click ⓘ next to "Diabetes" (left-side button, `left-0`). Confirm the tooltip opens to the right and stays fully on screen.

- [ ] **Step 8: Accessibility**

In DevTools Elements panel, inspect the ⓘ `<button>` for Diabetes. Confirm `aria-label="What does Diabetes filter mean?"`. Click ⓘ to open → confirm `aria-expanded="true"`. Click again → confirm `aria-expanded="false"`.

- [ ] **Step 9: Existing filters unchanged**

Verify: dietary restriction buttons (Vegetarian, Vegan, etc.) toggle correctly; Kosher sub-section (Meat/Dairy/Pareve) appears when Kosher is selected; Equipment buttons toggle; Allergies buttons toggle; Cuisines scroll and toggle.

- [ ] **Step 10: Commit passing results**

If all steps pass:

```bash
git add -p  # stage only if any lint/fix changes were made
npm run lint && npm run build
```

Expected: `npm run lint` — 0 errors. `npm run build` — build completes, outputs `dist/`.

```bash
git commit -m "chore: verify health conditions filter — all manual tests passing"
```

---

## Task 6: Final build verification and push

- [ ] **Step 1: Clean production build**

```bash
npm run lint && npm run build
```

Expected: TypeScript lint passes (0 errors), Vite build completes without errors, `dist/` is populated.

- [ ] **Step 2: Push to trigger deploy**

```bash
git push
```

Cloud Build triggers automatically: Docker build → Artifact Registry → `gcloud run deploy pantrypivot` in `us-central1`.

- [ ] **Step 3: Verify deployed app**

Load the production URL. Confirm Health Conditions section is present, KFP is hidden, tooltips work on mobile.
