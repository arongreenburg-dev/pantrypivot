import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { validRecipes, validInput } from '../lib/apiValidation.js';
const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' });
after(() => vite.close());
const { makeSlots, shopping, schedule, usableStorage } =
  await vite.ssrLoadModule('/lib/thanksgiving.ts');
const { catalog } = await vite.ssrLoadModule('/affiliateCatalog.ts');
const base = {
  guests: 8,
  cuisine: 0,
  subtle: false,
  twist: false,
  diet: [],
  other: [],
  mixed: 0,
  kosher: 'Meat',
  exclude: [],
  oven: 1,
  burners: 1,
  must: '',
  effort: 'Moderate',
};
test('traditional meal covers the whole table and every dish has a complete method', () => {
  const slots = makeSlots(base);
  assert.deepEqual(
    slots.map((s) => s.course),
    ['Main', 'Vegetable', 'Side', 'Dessert'],
  );
  for (const slot of slots) {
    assert.equal(slot.people, 8);
    for (const dish of slot.options) {
      assert.ok(dish.steps.length >= 2);
      assert.ok(Object.values(dish.food).every((n) => n > 0));
    }
  }
});
test('cuisine and strength influence the menu', () => {
  const full = makeSlots({ ...base, cuisine: 1 });
  assert.match(full[0].options[0].name, /Pomegranate/);
  assert.notEqual(full[1].options[0].name, makeSlots(base)[1].options[0].name);
  assert.equal(
    makeSlots({ ...base, cuisine: 1, subtle: true })[1].options[0].name,
    makeSlots(base)[1].options[0].name,
  );
});
test('plant-based, combined requirements, exclusions and swaps', () => {
  for (const diet of [['Vegan'], ['Kosher', 'Vegan', 'Gluten-free', 'Dairy-free']]) {
    const slots = makeSlots({ ...base, kosher: 'Pareve', diet, exclude: ['sweet potato'] });
    for (const s of slots)
      for (const d of s.options) {
        assert.ok(!d.meat);
        assert.ok(!('sweet potato' in d.food));
        assert.doesNotMatch(
          Object.keys(d.food).join(' '),
          /turkey|milk|butter|flour|bread|cream|cheese/,
        );
      }
  }
});
test('kosher meat dinner, shared pareve dishes and mixed-group portions', () => {
  const slots = makeSlots({
    ...base,
    diet: ['Kosher', 'Dairy-free'],
    other: ['Vegan', 'Gluten-free'],
    mixed: 3,
  });
  assert.equal(slots[0].people, 5);
  assert.ok(slots[0].options.every((d) => d.meat));
  assert.equal(slots[1].course, 'Alternate main');
  assert.equal(slots[1].people, 3);
  for (const s of slots.slice(1)) for (const d of s.options) assert.ok(!d.meat);
  assert.ok(slots.slice(2).every((s) => s.people === 8));
  assert.throws(() => makeSlots({ ...base, diet: ['Kosher', 'Vegan'] }), /pareve/);
});
test('swaps recalculate equipment, shopping and schedule and preserve other dishes', () => {
  const s = makeSlots(base);
  const original = s.map(() => 0);
  const swap = [1, ...original.slice(1)];
  assert.notEqual(s[0].options[0].tool, s[0].options[1].tool);
  assert.notDeepEqual(shopping(s, original, {}), shopping(s, swap, {}));
  assert.notDeepEqual(schedule(s, original, 1, 1), schedule(s, swap, 1, 1));
  assert.equal(
    shopping(s, original, { 'turkey cutlets': 100 }).find((x) => x.name === 'turkey cutlets').grams,
    1260,
  );
  assert.ok(!shopping(s, original, { 'turkey cutlets': 2000 }).some((x) => x.name === 'turkey cutlets'));
});
test('equipment and must-haves hold across all offered swaps', () => {
  const s = makeSlots({ ...base, oven: 0, must: 'potatoes' });
  assert.ok(s.every((slot) => slot.options.every((d) => d.tool !== 'Oven')));
  assert.ok(s.some((slot) => slot.options.every((d) => 'potatoes' in d.food)));
  assert.throws(() => makeSlots({ ...base, oven: 0, burners: 0 }), /compatible/);
});
test('leftover storage gates reject unknown, future and old batches', () => {
  const now = Date.parse('2026-11-28T12:00Z');
  assert.ok(usableStorage('2026-11-26T12:00Z', 'Refrigerated promptly', '', now));
  for (const date of ['2026-11-22T12:00Z', '2026-11-29T12:00Z', ''])
    assert.ok(!usableStorage(date, 'Refrigerated promptly', '', now));
  assert.ok(!usableStorage('2026-11-26T12:00Z', 'Unsure', '', now));
  assert.ok(
    usableStorage(
      '2026-11-05T12:00Z',
      'Frozen promptly, thawed in refrigerator',
      '2026-11-27T12:00Z',
      now,
    ),
  );
});
test('affiliate catalog consists of 30 distinct full tagged destinations', () => {
  const all = Object.values(catalog);
  assert.equal(new Set(all.map((x) => x.url)).size, 30);
  assert.equal(all.filter((x) => x.kind === 'Product').length, 19);
  for (const p of all) {
    const u = new URL(p.url);
    assert.equal(u.origin, 'https://www.amazon.com');
    assert.equal(u.searchParams.get('tag'), 'pantrypivot09-20');
  }
});
test('invalid requests and model payloads fail validation', () => {
  assert.ok(!validInput({ userPrompt: 'x'.repeat(2001) }));
  assert.ok(!validInput({ ingredientPhoto: 'url' }));
  assert.ok(!validRecipes({ selectedRecipe: { name: 'Dinner' }, recipeCards: [] }));
});

test('six-guest starter card uses practical US kitchen measures and dish-specific directions', async () => {
  const { usAmount, measureFor } = await vite.ssrLoadModule('/lib/kitchenMeasures.ts');
  const slots = makeSlots({ ...base, guests: 6 });
  const turkey = slots[0].options[0];
  assert.equal(usAmount('turkey cutlets', turkey.food['turkey cutlets'] * 6), '2 ¼ lb');
  assert.equal(usAmount('cranberries', turkey.food.cranberries * 6), '¾ cup');
  assert.equal(usAmount('olive oil', turkey.food['olive oil'] * 6), '2 tbsp');
  assert.equal(usAmount('sage', turkey.food.sage * 6), '1 tsp');
  assert.match(turkey.steps.join(' '), /cranberries/);
  assert.doesNotMatch(turkey.steps.join(' '), /ginger/);
  const pantry = { 'turkey cutlets': measureFor('turkey cutlets').grams };
  const left = shopping(slots, slots.map(() => 0), pantry).find(x => x.name === 'turkey cutlets');
  assert.equal(usAmount(left.name,left.grams), '1 ¼ lb');
});

test('mixed delimiters, duplicate names and aliases preserve all must-haves across swaps', () => {
  const slots = makeSlots({...base, cuisine:4, diet:['Kosher'], must:' WHOLE turkey ; mashed potatoes, Cranberries; whole roast turkey, '});
  assert.ok(slots[0].options.every(d=>d.wholeBird));
  assert.ok(slots.find(s=>s.course==='Side').options.every(d=>/potato mash/i.test(d.name)));
  assert.ok(slots.some(s=>s.options.every(d=>'cranberries' in d.food)));
  const choices = slots.map(()=>0);
  assert.ok(shopping(slots,choices,{}).some(x=>x.name==='whole turkey' && Math.abs(x.grams/453.59237-10)<0.001));
  assert.match(schedule(slots,choices,1,1).join(' '), /220 minutes before serving · Sage-roasted whole turkey/);
});
test('whole turkey respects diets, ingredient exclusions and oven availability', () => {
  for(const prefs of [{diet:['Vegan']},{oven:0},{diet:['Kosher'],kosher:'Dairy'},{exclude:['whole turkey']}])
    assert.throws(()=>makeSlots({...base,...prefs,must:'whole turkey'}),/No compatible recipe for “whole turkey”/);
  assert.throws(()=>makeSlots({...base,must:'whole turkey, pecan pie'}),/pecan pie/);
  assert.throws(()=>makeSlots({...base,must:'whole turkey; turkey cutlets'}),/cannot all fit/);
  assert.deepEqual(makeSlots({...base,must:' , ; '}),makeSlots(base));
});

test('AI selection is schema-limited to real dishes and tolerates model drift', async () => {
  const { validCourses, selectionSchema, parseChoices } = await import('../lib/thanksgivingAi.js');
  // Same payload the planner sends for the kosher Southern menu in the bug report.
  const slots = makeSlots({ ...base, guests: 6, cuisine: 4, diet: ['Kosher'] });
  const courses = slots.map((s) => JSON.stringify(s.options.map((o) => o.name)));
  assert.ok(validInput({ courses, influence: 'Southern', effort: 'Moderate' }));
  const lists = validCourses(courses);
  assert.equal(lists.length, slots.length);
  const schema = selectionSchema(lists);
  assert.deepEqual(schema.required, lists.map((_, i) => 'course' + i));
  lists.forEach((items, i) => assert.deepEqual(schema.properties['course' + i].enum, items));
  const last = lists.map((items) => items.length - 1);
  assert.deepEqual(parseChoices(Object.fromEntries(lists.map((x, i) => ['course' + i, x.at(-1)])), lists), last);
  assert.deepEqual(parseChoices({ choices: last }, lists), last);
  assert.deepEqual(parseChoices({ choices: lists.map((x) => x[0].toUpperCase() + '.') }, lists), lists.map(() => 0));
  assert.equal(parseChoices({ choices: lists.map((x) => x.length) }, lists), null);
  assert.equal(parseChoices({ course0: 'Pecan pie' }, lists), null);
  assert.equal(parseChoices(null, lists), null);
  for (const bad of [courses.slice(0, 3), [...courses.slice(0, 3), '{oops'], [...courses.slice(0, 3), '[]']])
    assert.equal(validCourses(bad), null);
});
