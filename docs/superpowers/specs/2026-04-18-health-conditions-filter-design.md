# Health Conditions Filter — Design Spec

**Date:** 2026-04-18
**Status:** Approved

---

## Goal

Replace the seasonal Kosher for Passover (KFP) filter button with a Health Conditions multi-select filter section in the PantryPivot Wizard, while preserving all existing functionality and making the KFP button trivially re-enableable for Passover 2027.

---

## 1. Files to Change

| File | What changes |
|---|---|
| `constants.ts` | Add `SHOW_KOSHER_FOR_PASSOVER` flag, `HEALTH_CONDITIONS` array, `HEALTH_CONDITION_PROMPTS` map, `HEALTH_CONDITION_DEFINITIONS` map |
| `types.ts` | Add `HealthCondition` union type; add `healthConditions: HealthCondition[]` to `WizardState` |
| `components/Wizard.tsx` | Wrap KFP button with flag; add `healthConditions` to formData; extend `toggleList`; add Health Conditions section; add `ConditionInfoIcon` component |
| `server.js` | Add health conditions mapping in `buildRecipePrompt` |

No other files need changes. `GenerationResponse` does not need a new field — health conditions are constraints, not response labels.

---

## 2. KFP Hiding Mechanism

In **`constants.ts`**, add:

```ts
export const SHOW_KOSHER_FOR_PASSOVER = false;
```

In **`Wizard.tsx`**, wrap the existing KFP button (currently lines 248–260):

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

**To re-enable for Passover 2027:** flip `SHOW_KOSHER_FOR_PASSOVER = true` in `constants.ts`.

---

## 3. Medical Disclaimer

Rendered as a `<p>` directly above the condition buttons inside the Health Conditions section. Not inside any tooltip.

**Copy:** `"Not medical advice. Consult your doctor before changing your diet."`

**Styling:** `text-[10px] font-medium text-slate-400` — matches existing secondary-label tone.

---

## 4. Gemini Prompt Diff

**Before** (server.js `buildRecipePrompt`):
```js
input.kosherForPassover ? 'This recipe must be strictly Kosher for Passover...' : '',
```

**After** (add one line immediately after the KFP line):
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

When Diabetes + Hypertension are selected, the prompt line reads:
```
Health Condition Dietary Constraints: low added sugar, complex carbs preferred; low sodium
```

---

## 5. TypeScript Types

Health conditions use a **new type**, not merged into `dietaryRestrictions`. The prompt mapping, tooltip data, and UI section are distinct.

```ts
// types.ts
export type HealthCondition = 'Diabetes' | 'Heart Disease' | 'Hypertension' | 'Gastrointestinal';

// WizardState gets a new field:
healthConditions: HealthCondition[];
```

---

## 6. ConditionInfoIcon Component

Defined at the top of `Wizard.tsx` (not a separate file — used only in one place, ~35 lines).

```tsx
const ConditionInfoIcon: React.FC<{
  condition: string;
  definition: string;
  openKey: string | null;
  onOpen: (key: string | null) => void;
}> = ({ condition, definition, openKey, onOpen }) => {
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
          className="absolute top-full mt-1 z-20 w-52 bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-[11px] font-medium text-slate-600 leading-relaxed"
          onClick={e => e.stopPropagation()}
        >
          {definition}
        </span>
      )}
    </span>
  );
};
```

**Outside-click dismissal:** a `useEffect` on `openTooltip` attaches/removes a `document` click listener that calls `setOpenTooltip(null)`. Both the icon wrapper (`<span>`) and the popup `<span>` call `e.stopPropagation()`, so only clicks outside both elements fire the document listener.

**`aria-expanded`** is set on the icon `<button>` so screen readers announce the open/closed state.

---

## 7. Mobile Tooltip Overflow — Positional Logic

At 375px viewport, tooltips on rightmost buttons overflow off-screen with `absolute left-0`. `ConditionInfoIcon` accepts a `positionClass` prop (defaulting to `"left-0"`) which the parent overrides to `"right-0"` for buttons in the right half of the row.

Since there are exactly four conditions laid out in a wrapping flex row, the parent maps each condition to a position class:

```ts
const TOOLTIP_POSITION: Record<string, string> = {
  'Diabetes':        'left-0',
  'Heart Disease':   'right-0',
  'Hypertension':    'left-0',
  'Gastrointestinal':'right-0',
};
```

The `<span>` positioning class in `ConditionInfoIcon` uses `positionClass` instead of the hardcoded `left-0`.

---

## 8. Icon Placement Within Each Button

The ⓘ renders **inline right of the label text** as a sibling element within the button's flex content:

```
[ Diabetes ⓘ ]
```

Button palette: violet (`bg-violet-100 border-violet-400 text-violet-700` when active) to visually distinguish from dietary (blue), cuisine (orange), and convenience (emerald) filters.

---

## 9. Testing Plan

Run `npm run dev` and verify all of the following before `npm run build`:

1. **KFP hidden:** wizard loads → "Kosher for Passover" button absent. Flip flag locally → button reappears and toggles normally → revert.
2. **Health Conditions section present:** section appears between "Dietary & Health" and "Cuisine Style" with disclaimer above buttons.
3. **Multi-select:** Diabetes activates; add Hypertension → both active; deselect Diabetes → only Hypertension remains.
4. **Prompt content:** DevTools Network → generate with Diabetes + Hypertension → POST body has `healthConditions: ["Diabetes","Hypertension"]`; response recipes reflect low-sugar, low-sodium constraints.
5. **Tooltip — basic:** tap ⓘ on Diabetes → correct definition appears. Tap ⓘ on Heart Disease → Diabetes closes, Heart Disease opens (one at a time). Tap outside → popup closes. Tapping ⓘ does not toggle the filter.
6. **Tooltip — propagation:** tap inside the open popup (e.g., attempt to select text) → popup does not dismiss.
7. **Mobile overflow:** at 375px, tap ⓘ on "Heart Disease" (right-side button) → tooltip opens leftward (right-0), stays on screen. Tap ⓘ on "Diabetes" (left-side button) → tooltip opens rightward (left-0), stays on screen.
8. **Accessibility:** inspect icon `<button>` in DevTools → `aria-label` is `"What does [Condition] filter mean?"`, `aria-expanded` toggles `true`/`false`.
9. **Existing filters unchanged:** dietary restrictions, kosher sub-section, equipment, allergies, cuisines all function as before.

---

## 10. Deployment

Deployment is triggered by `git push`. Cloud Build (`cloudbuild.yaml`) handles: Docker build → Artifact Registry push → `gcloud run deploy pantrypivot`.

**Pre-push checklist:**
```bash
npm run lint   # TypeScript check — must pass with 0 errors
npm run build  # Vite production build — must complete without errors
git push
```
