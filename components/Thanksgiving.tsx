import { foodLabel, measureFor, usAmount } from '../lib/kitchenMeasures';
import SeasonalRecipeBody from './SeasonalRecipeBody';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  cuisines,
  diets,
  ingredients,
  makeSlots,
  schedule,
  shopping,
  type Request,
  type Food,
  type Slot,
} from '../lib/thanksgiving';
import { getSettings } from '../lib/storage';
import { AmazonLink, PicksEntry, track } from './HolidayPicks';
import Leftovers from './ThanksgivingLeftovers';
import { DISCLOSURE, type PickId } from '../affiliateCatalog';

function chips(values: readonly string[], chosen: string[], change: (next: string[]) => void) {
  return (
    <div className="season-chips">
      {values.map((x) => (
        <button
          type="button"
          key={x}
          aria-pressed={chosen.includes(x)}
          onClick={() => change(chosen.includes(x) ? chosen.filter((v) => v !== x) : [...chosen, x])}
        >
          {x}
        </button>
      ))}
    </div>
  );
}
const directions = [
  'A twist on the classics',
  'Bring a cuisine to the table',
  'Fit everyone at the table',
];
function initial(): Request {
  const s = getSettings();
  return {
    guests: 6,
    cuisine: Math.max(
      0,
      cuisines.findIndex((c) => s.defaultCuisines.includes(c)),
    ),
    subtle: false,
    twist: false,
    diet: diets.filter(
      (d) =>
        s.defaultDietaryRestrictions.some((v) => v.toLowerCase() === d.toLowerCase()) ||
        (d === 'Kosher' && s.isKosher),
    ),
    mixed: 0,
    other: [],
    kosher: 'Meat',
    exclude: [],
    oven: s.defaultEquipment.includes('Oven') ? 1 : 0,
    burners: s.defaultEquipment.includes('Stovetop') ? 1 : 0,
    must: '',
    effort: 'Moderate',
  };
}
type Menu = { slots: Slot[]; choices: number[]; source: string };
const allergenGroups: Record<string, string[]> = {
  Milk: ['ricotta'],
  Eggs: [],
  Wheat: [],
  Soy: [],
  Peanuts: [],
  'Tree nuts': [],
  Fish: [],
  Shellfish: [],
  Sesame: [],
  Legumes: ingredients.filter((x) => x.startsWith('cooked ')),
};
export default function Thanksgiving() {
  const [r, set] = useState(initial),
    [mode, setMode] = useState('Plan my Thanksgiving'),
    [direction, setDirection] = useState<string[]>([]);
  const [allergens, setAllergens] = useState<string[]>([]),
    [custom, setCustom] = useState(''),
    [pantry, setPantry] = useState<Food>({}),
    [stock, setStock] = useState(ingredients[0]);
  const [menu, setMenu] = useState<Menu | null>(null),
    [notice, msg] = useState(''),
    [busy, wait] = useState(false),
    [owned, own] = useState<string[]>([]);
  const [saved, setSaved] = useState(''),
    [serving, serve] = useState('');
  const [savedMenu, setSavedMenu] = useState(() => {
    try {
      return localStorage.getItem('thanksgiving-saved-menu') || '';
    } catch {
      return '';
    }
  });
  const running = useRef(false),
    started = useRef(false),
    result = useRef<HTMLDivElement>(null);
  const normalized = {
    ...r,
    other: r.mixed ? r.other : [],
    exclude: [...r.exclude, ...allergens.flatMap((x) => allergenGroups[x])],
  };
  const kosher = [...normalized.diet, ...normalized.other].includes('Kosher');
  useEffect(() => {
    const prev = document.title;
    document.title = 'Thanksgiving, Your Way | PantryPivot';
    return () => {
      document.title = prev;
    };
  }, []);
  function clear() {
    setMenu(null);
    msg('');
    setSaved('');
  }
  function field<K extends keyof Request>(k: K, v: Request[K]) {
    clear();
    set((prev) => ({ ...prev, [k]: v }));
  }
  async function build(ai: boolean) {
    if (running.current) return;
    running.current = true;
    wait(true);
    msg('');
    setSaved('');
    try {
      const slots = makeSlots(normalized);
      let choices = slots.map(() => 0);
      if (ai) {
        const res = await fetch('/api/thanksgiving', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(65000),
          body: JSON.stringify({
            courses: slots.map((s) => JSON.stringify(s.options.map((o) => o.name))),
            influence: custom || cuisines[r.cuisine],
            effort: r.effort,
          }),
        });
        if (!res.ok)
          throw Error(
            'AI menu selection is unavailable. Choose “Build starter menu” for a meal from the PantryPivot collection.',
          );
        const data = await res.json();
        if (
          !Array.isArray(data.choices) ||
          data.choices.length !== slots.length ||
          !data.choices.every((v: number, i: number) => Number.isInteger(v) && slots[i].options[v])
        )
          throw Error('The menu response was incomplete. Try the starter menu.');
        choices = data.choices;
      }
      setMenu({
        slots,
        choices,
        source: ai ? 'AI-selected menu from the PantryPivot collection' : 'Curated starter menu',
      });
      track('thanksgiving_menu_generated', { source: ai ? 'ai' : 'curated' });
    } catch (e) {
      msg(
        e instanceof TypeError || e instanceof DOMException
          ? 'Couldn’t reach the service. Try the starter menu.'
          : (e as Error).message,
      );
    } finally {
      running.current = false;
      wait(false);
    }
  }
  const selections = menu?.slots.map((s, i) => s.options[menu.choices[i]]) || [];
  const list = menu ? shopping(menu.slots, menu.choices, pantry) : [];
  const timeline = menu ? schedule(menu.slots, menu.choices, r.burners, r.oven) : [];
  const picks: PickId[] = [];
  if (selections.some((d) => d.meat) && !owned.includes('Food thermometer'))
    picks.push('instant_read_thermometers');
  if (selections.some((d) => d.tool === 'Oven') && !owned.includes('Sheet pan'))
    picks.push('sheet_pans');
  if (selections.some((d) => d.name.includes('mash')) && !owned.includes('Masher'))
    picks.push('potato_mashers');
  function exportMenu() {
    return Array.from(result.current!.querySelectorAll('h2,h3,h4,p,small,li'))
      .map((el) => el.textContent?.trim())
      .filter(Boolean)
      .join('\n');
  }
  const checks = (
    <>
      <h3>Dietary requirements</h3>
      {chips(diets, r.diet, (v) => field('diet', v))}
      {kosher && (
        <label>
          Kosher meal direction
          <select value={r.kosher} onChange={(e) => field('kosher', e.target.value)}>
            {['Meat', 'Dairy', 'Pareve'].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
      )}
      <details>
        <summary>Allergies and ingredient exclusions</summary>
        {chips(Object.keys(allergenGroups), allergens, (v) => {
          clear();
          setAllergens(v);
        })}
        <label>
          Exclude an ingredient
          <select value="" onChange={(e) => {
            if (e.target.value) field('exclude', [...r.exclude, e.target.value]);
          }}>
            <option value="">{r.exclude.length ? 'Add another ingredient (optional)' : 'None selected (optional)'}</option>
            {[...ingredients, 'rice', 'green beans', 'lettuce', 'squash'].filter(x => !r.exclude.includes(x)).map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        {r.exclude.length > 0 && <button onClick={() => field('exclude', [])}>Clear ingredient exclusions</button>}
        {r.exclude.map((x) => (
          <button
            key={x}
            onClick={() =>
              field(
                'exclude',
                r.exclude.filter((f) => f !== x),
              )
            }
          >
            Remove exclusion · {x}
          </button>
        ))}
        <p>
          Check all package labels and cross-contact for your guests. Packaged ingredients and previously
          prepared foods can vary.
        </p>
      </details>
      {kosher && (
        <p>
          Check kosher certification, produce and kitchen practices with your guests. Use designated
          cookware. Plant-based sides and desserts can be prepared pareve.
        </p>
      )}
    </>
  );
  return (
    <main
      className="season"
      onClick={() => {
        if (!started.current) {
          started.current = true;
          track('thanksgiving_planner_started');
        }
      }}
    >
      <Link className="print:hidden" to="/">
        ← PantryPivot
      </Link>
      <h1>Thanksgiving, Your Way</h1>
      <p className="season-lede">A holiday menu for your people, your pantry and your kitchen.</p>
      <PicksEntry />
      <fieldset className="print:hidden" disabled={busy}>
        <nav aria-label="Thanksgiving mode">
          {['Plan my Thanksgiving', 'Use up my leftovers'].map((x) => (
            <button
              key={x}
              aria-pressed={mode === x}
              onClick={() => {
                setMode(x);
                msg('');
              }}
            >
              {x}
            </button>
          ))}
        </nav>
        {mode === 'Use up my leftovers' ? (
          <>
            {checks}
            <Leftovers
              key={JSON.stringify([normalized.diet, normalized.other, normalized.exclude, r.kosher])}
              kosher={kosher}
              plantOnly={
                normalized.diet
                  .concat(normalized.other)
                  .some((x) => x === 'Vegan' || x === 'Vegetarian') ||
                (kosher && r.kosher !== 'Meat')
              }
              exclude={normalized.exclude}
            />
          </>
        ) : (
          <section>
            <h2>What kind of Thanksgiving do you want?</h2>
            {chips(directions, direction, (v) => {
              clear();
              setDirection(v);
              set({ ...r, twist: v.includes(directions[0]) });
            })}
            <div className="season-grid">
              <label>
                Guests
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={r.guests || ''}
                  onChange={(e) => field('guests', +e.target.value)}
                />
              </label>
              <label>
                Cuisine influence
                <select value={r.cuisine} onChange={(e) => field('cuisine', +e.target.value)}>
                  {cuisines.map((c, i) => (
                    <option key={c} value={i}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {direction.includes(directions[1]) && (
              <label>
                Influence strength
                <select
                  value={r.subtle ? 'subtle' : 'full'}
                  onChange={(e) => field('subtle', e.target.value === 'subtle')}
                >
                  <option value="full">Full-menu direction</option>
                  <option value="subtle">Subtle touches on the main</option>
                </select>
              </label>
            )}
            {checks}
            <details open={direction.includes(directions[2]) || undefined}>
              <summary>Guest needs and optional refinements</summary>
              <label>
                <input
                  type="checkbox"
                  checked={!!r.mixed}
                  onChange={(e) => field('mixed', e.target.checked ? 1 : 0)}
                />{' '}
                Some guests have different needs
              </label>
              {!!r.mixed && (
                <>
                  <label>
                    Guests in the second group
                    <input
                      type="number"
                      min="1"
                      max={r.guests - 1}
                      value={r.mixed}
                      onChange={(e) => field('mixed', +e.target.value)}
                    />
                  </label>
                  {chips(diets, r.other, (v) => field('other', v))}
                </>
              )}
              <label>
                Custom influence for AI selection
                <input
                  maxLength={100}
                  value={custom}
                  placeholder="e.g. Lebanese family favorites"
                  onChange={(e) => {
                    clear();
                    setCustom(e.target.value);
                  }}
                />
              </label>
              <label>
                Must-have dishes or ingredients (optional)
                <input type="text" maxLength={240} value={r.must}
                  placeholder="e.g. whole turkey, mashed potatoes"
                  aria-describedby="must-have-help" onChange={(e) => field('must', e.target.value)} />
                <small id="must-have-help">Separate items with commas or semicolons. Leave blank for a flexible menu.</small>
              </label>
              <div className="season-grid">
                <label>
                  Effort
                  <select value={r.effort} onChange={(e) => field('effort', e.target.value)}>
                    {['Easy', 'Moderate', 'Ambitious'].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Serving time
                  <input type="time" value={serving} onChange={(e) => serve(e.target.value)} />
                </label>
                {(['burners', 'oven'] as const).map((k) => (
                  <label key={k}>
                    {k === 'oven' ? 'Available oven racks' : 'Available burners'}
                    <select value={r[k]} onChange={(e) => field(k, +e.target.value)}>
                      {[0, 1, 2, 3, 4].map((n) => (
                        <option key={n}>{n}</option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
              <label>
                Ingredient already on hand
                <select value={stock} onChange={(e) => setStock(e.target.value)}>
                  {ingredients.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
              <label>
                Amount on hand ({measureFor(stock).unit}) · {foodLabel(stock)}
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={pantry[stock] ? +(pantry[stock] / measureFor(stock).grams).toFixed(6) : ''}
                  onChange={(e) =>
                    setPantry({ ...pantry, [stock]: Math.max(0, +e.target.value) * measureFor(stock).grams })
                  }
                />
              </label>
              <p>Tools I already own</p>
              {chips(['Food thermometer', 'Sheet pan', 'Masher'], owned, own)}
            </details>
            <div className="actions">
              <button
                className="primary"
                disabled={busy || menu?.source.startsWith('Curated')}
                onClick={() => build(false)}
              >
                Build starter menu
              </button>
              <button disabled={busy || menu?.source.startsWith('AI')} onClick={() => build(true)}>
                {busy ? 'Selecting dishes…' : 'Personalize with AI'}
              </button>
            </div>
          </section>
        )}
      </fieldset>
      {notice && <p role="alert">{notice}</p>}
      {mode === 'Plan my Thanksgiving' && menu && (
        <div ref={result}>
          <section>
            <h2>{menu.source}</h2>
            <p>
              {cuisines[r.cuisine]} {r.subtle ? 'main with classic accompaniments' : 'menu'} for{' '}
              {r.guests}.{' '}
              {normalized.diet.concat(normalized.other).length
                ? 'Selected requirements: ' +
                  [...new Set(normalized.diet.concat(normalized.other))].join(', ') +
                  '. '
                : ''}
              Sides and dessert are shared.{' '}
              {kosher && 'Use kosher-certified ingredients and the appropriate kitchen equipment. '}Check
              labels and cross-contact for your guests. These recipe suggestions are untested.
              {custom && menu.source.startsWith('Curated')
                ? ' The starter collection uses the selected cuisine; custom influences apply to AI selection.'
                : ''}
            </p>
          </section>
          {menu.slots.map((s, i) => {
            const d = selections[i];
            return (
              <article key={s.course} className="season-recipe-card">
                <small>
                  {s.course} · {s.audience} · {s.people} servings
                </small>
                <h3>{d.name}</h3>
                <p>{d.description}</p>
                <p className="recipe-meta">{d.tool === "Burner" ? "Stovetop" : d.tool === "Bowl" ? "No cooking" : "Oven"} · About {d.minutes} minutes{d.wholeBird ? " including resting" : " per batch"}</p>
                <SeasonalRecipeBody ingredients={Object.entries(d.food).map(([name, grams]) => ({
                  item: foodLabel(name), amount: usAmount(name, grams * s.people),
                }))} steps={d.steps} />
                <button
                  className="print:hidden"
                  disabled={s.options.length < 2}
                  onClick={() => {
                    const choices = [...menu.choices];
                    choices[i] = (choices[i] + 1) % s.options.length;
                    setMenu({ ...menu, choices });
                    setSaved('');
                    track('thanksgiving_dish_swapped');
                  }}
                >
                  {s.options.length < 2 ? 'Only compatible choice' : 'Swap this dish'}
                </button>
              </article>
            );
          })}
          <section>
            <h2>Shopping list</h2>
            <p>Combined quantities after subtracting your pantry.</p>
            {list.length ? (
              <ul>
                {list.map((x) => (
                  <li key={x.name}>
                    {usAmount(x.name, x.grams)} {foodLabel(x.name)}
                  </li>
                ))}
              </ul>
            ) : (
              <p>You have all the ingredients.</p>
            )}
          </section>
          <section>
            <h2>Prep schedule{serving ? ' · serve at ' + serving : ''}</h2>
            <ol>
              {timeline.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ol>
          </section>
        </div>
      )}
      {mode === 'Plan my Thanksgiving' && menu && (
        <div className="print:hidden">
          <div className="actions">
            <button onClick={() => window.print()}>Print menu</button>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(exportMenu());
                  setSaved('Menu copied.');
                } catch {
                  setSaved('Copy unavailable. Use Print menu to save a PDF.');
                }
              }}
            >
              Copy menu to share
            </button>
            <button
              onClick={() => {
                try {
                  const text = exportMenu();
                  localStorage.setItem('thanksgiving-saved-menu', text);
                  setSavedMenu(text);
                  setSaved('Menu saved on this device.');
                } catch {
                  setSaved('Could not save on this device. Use Print menu.');
                }
              }}
            >
              Save menu
            </button>
          </div>
          <p role="status">{saved}</p>
          {picks.length > 0 && (
            <aside>
              <h3>Useful for this menu</h3>
              <p>Optional tools for the dishes above. {DISCLOSURE}</p>
              {picks.slice(0, 3).map((id) => (
                <p key={id}>
                  <AmazonLink id={id} placement="thanksgiving_menu" compact />
                </p>
              ))}
            </aside>
          )}
        </div>
      )}
      {savedMenu && (
        <details className="print:hidden">
          <summary>View saved menu</summary>
          <pre className="whitespace-pre-wrap">{savedMenu}</pre>
        </details>
      )}
    </main>
  );
}
