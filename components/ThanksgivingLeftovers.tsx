import SeasonalRecipeBody from './SeasonalRecipeBody';
import { kitchenNumber } from '../lib/kitchenMeasures';
import { usableStorage } from '../lib/thanksgiving';
import { useState } from 'react';
import { track } from './HolidayPicks';

const foods = [
  'Turkey',
  'Cooked beans',
  'Roasted potatoes',
  'Mashed potatoes',
  'Cooked squash',
  'Sweet potatoes',
  'Green beans',
  'Carrots',
  'Cooked rice',
];
export const guidance =
  'https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety';
export default function Leftovers({
  plantOnly,
  exclude,
  kosher,
}: {
  plantOnly: boolean;
  exclude: string[];
  kosher: boolean;
}) {
  const [amount, setAmount] = useState<Record<string, number>>({});
  const [storage, setStorage] = useState('Unsure'),
    [cooked, setCooked] = useState(''),
    [thawed, setThawed] = useState('');
  const [minutes, setMinutes] = useState(20),
    [tool, setTool] = useState('Stovetop'),
    [confirmed, confirm] = useState(false);
  const [show, setShow] = useState(false),
    [selected, select] = useState(''),
    [error, setError] = useState('');
  const used = Object.entries(amount).filter(([, v]) => v > 0);
  const portions = Math.max(1, Math.ceil(used.reduce((s, [, v]) => s + v, 0) / 1.5));
  const options =
    tool === 'Microwave' ? ['Steam bowl', 'Brothy bowl'] : ['Covered skillet', 'Quick soup'];
  if (!exclude.includes('lettuce')) options.push('Warm lettuce cups');
  function generate() {
    if (!used.length || Object.values(amount).some((v) => !Number.isFinite(v) || v < 0 || v > 12 || (v > 0 && v < 0.125)))
      throw Error('Enter ⅛ to 12 cups for each leftover you want to use.');
    if (!confirmed || !usableStorage(cooked, storage, thawed))
      throw Error(
        'Skip leftovers with uncertain handling or refrigeration beyond four days. Use only ingredients you can confirm meet everyone’s needs.',
      );
    if (plantOnly && amount.Turkey)
      throw Error('Remove turkey for the selected plant-based or kosher meal direction.');
    const aliases: Record<string, string[]> = {
      Turkey: ['turkey cutlets', 'whole turkey'],
      'Cooked beans': [
        'cooked white beans',
        'cooked chickpeas',
        'cooked black beans',
        'cooked black-eyed peas',
      ],
      'Roasted potatoes': ['potatoes'],
      'Mashed potatoes': ['potatoes'],
      'Cooked squash': ['squash'],
      'Sweet potatoes': ['sweet potato'],
      'Green beans': ['green beans'],
      Carrots: ['carrots'],
      'Cooked rice': ['rice'],
    };
    if (used.some(([name]) => aliases[name].some((x) => exclude.includes(x))))
      throw Error('Remove the leftover that conflicts with your exclusions.');
    setShow(true);
  }
  const soup = /soup|Brothy/.test(selected);
  const cups = selected === 'Warm lettuce cups';
  return (
    <section
      onChange={() => {
        setShow(false);
        select('');
        setError('');
      }}
    >
      <h2>Use up my leftovers</h2>
      <p>
        Estimate your leftovers in cups. Chop or shred larger pieces before measuring. Use the oldest safely stored batch for
        the dates below.
      </p>
      <div className="season-grid">
        {foods.map((f) => (
          <label key={f}>
            {f} (cups)
            <input
              type="number"
              min="0"
              max="12" step="0.125"
              value={amount[f] || ''}
              placeholder="0"
              onChange={(e) => setAmount({ ...amount, [f]: Number(e.target.value) })}
            />
          </label>
        ))}
      </div>
      <label>
        When cooked
        <input type="datetime-local" value={cooked} onChange={(e) => setCooked(e.target.value)} />
      </label>
      <label>
        Storage
        <select value={storage} onChange={(e) => setStorage(e.target.value)}>
          {['Unsure', 'Refrigerated promptly', 'Frozen promptly, thawed in refrigerator'].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </label>
      {storage.startsWith('Frozen') && (
        <label>
          When fully thawed
          <input type="datetime-local" value={thawed} onChange={(e) => setThawed(e.target.value)} />
        </label>
      )}
      <p>
        Refrigerate perishable food within two hours (one hour above 90°F). Keep the fridge at 40°F or
        below. Discard food if handling is uncertain. <a href={guidance}>USDA leftovers guidance</a>
      </p>
      <label>
        <input type="checkbox" checked={confirmed} onChange={(e) => confirm(e.target.checked)} /> I
        checked storage, every ingredient, seasonings and cross-contact for this group.
        {kosher && ' I checked kosher status and kitchen practices.'}
      </label>
      <div className="season-grid">
        <label>
          Equipment
          <select value={tool} onChange={(e) => setTool(e.target.value)}>
            <option>Stovetop</option>
            <option>Microwave</option>
          </select>
        </label>
        <label>
          Time available
          <select value={minutes} onChange={(e) => setMinutes(+e.target.value)}>
            {[10, 20, 30].map((v) => (
              <option key={v} value={v}>
                {v} minutes
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        onClick={() => {
          try {
            generate();
          } catch (e) {
            setError((e as Error).message);
          }
        }}
      >
        Find leftover recipes
      </button>
      {error && <p role="alert">{error}</p>}
      {show && (
        <>
          <h3>Choose a recipe</h3>
          <p>
            The bowls, skillet and soup use only your leftovers and water. Lettuce cups add one fresh ingredient. Work in batches of{' '}
            {minutes === 10 ? 'one' : 'one or two'} servings as time allows.
          </p>
          {options.map((x) => (
            <button
              key={x}
              disabled={selected === x}
              onClick={() => {
                select(x);
                track('thanksgiving_leftovers_recipe_generated', { source: 'curated' });
              }}
            >
              {x}
            </button>
          ))}
        </>
      )}
      {selected && (
        <article className="season-recipe-card">
          <h3>
            {selected} with {used.map(([x]) => x.toLowerCase()).join(' and ')}
          </h3>
          <p>
            About {portions} servings · {tool}
          </p>
          <SeasonalRecipeBody ingredients={[
            ...used.map(([name, volume]) => ({ item: name.toLowerCase(), amount: kitchenNumber(volume) + (volume > 1 ? ' cups' : ' cup') })),
            { item: 'water', amount: soup ? kitchenNumber(0.75 * portions) + (portions > 1 ? ' cups' : ' cup') : portions + ' tbsp' },
            ...(cups ? [{ item: 'large lettuce leaves, washed and dried', amount: String(portions * 3) }] : []),
          ]} steps={[
            'Cut large pieces into bite-size chunks. Divide the cooked leftovers and water evenly between batches.',
            tool === 'Microwave' ? 'Combine in a microwave-safe bowl and cover loosely. Microwave in one-minute bursts, stirring between bursts.' : 'Combine in a pan, cover and warm over medium heat, stirring frequently.',
            (soup ? 'Bring the liquid to a boil. ' : 'Add a splash more water if needed to prevent sticking. ') + 'Check several spots with a food thermometer. Serve when the leftovers reach 165°F throughout.',
            ...(cups ? ['Drain excess liquid and spoon the hot filling into the lettuce leaves just before serving.'] : []),
          ]} />
        </article>
      )}
    </section>
  );
}
