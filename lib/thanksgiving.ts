// Quantities are grams per guest, including liquids. Every shopping and prep view
// is derived from the selected dishes, including after a swap.
export const cuisines = [
  'Traditional American',
  'Mediterranean / Middle Eastern',
  'Mexican',
  'Indian',
  'Southern',
] as const;
export const diets = ['Kosher', 'Vegan', 'Vegetarian', 'Gluten-free', 'Dairy-free'];
export type Food = Record<string, number>;
export type Dish = {
  name: string;
  food: Food;
  steps: string[];
  tool: 'Burner' | 'Oven' | 'Bowl';
  minutes: number;
  meat?: boolean;
  cold?: boolean;
};
type Course = 'Main' | 'Alternate main' | 'Vegetable' | 'Side' | 'Dessert';
export type Slot = { course: Course; people: number; audience: string; options: Dish[] };
export type Request = {
  guests: number;
  cuisine: number;
  subtle: boolean;
  twist: boolean;
  diet: string[];
  other: string[];
  mixed: number;
  kosher: string;
  exclude: string[];
  oven: number;
  burners: number;
  must: string;
  effort: string;
};
const oil = 'olive oil';
function recipe(
  name: string,
  food: Food,
  tool: Dish['tool'],
  minutes: number,
  steps: string[],
  extra: Partial<Dish> = {},
): Dish {
  return { name, food, tool, minutes, steps, ...extra };
}
const profiles = [
  ['sage', 'cranberries', 'apple', 'thyme', 'carrots', 'cinnamon', 'pear', 'white beans'],
  [
    'oregano',
    'pomegranate seeds',
    'lemon juice',
    'parsley',
    'cucumber',
    'cardamom',
    'orange',
    'chickpeas',
  ],
  [
    'ground cumin',
    'lime juice',
    'orange',
    'cilantro',
    'cabbage',
    'cinnamon',
    'pineapple',
    'black beans',
  ],
  ['ground coriander', 'ginger', 'lime juice', 'mint', 'carrots', 'cardamom', 'mango', 'chickpeas'],
  [
    'smoked paprika',
    'apple',
    'lemon juice',
    'chives',
    'cabbage',
    'cinnamon',
    'peach',
    'black-eyed peas',
  ],
];
function candidates(index: number) {
  const [herb, accent, fruit, green, veg, spice, dessert, bean] = profiles[index];
  const legume = 'cooked ' + bean;
  const turkey = (oven: boolean) =>
    recipe(
      (oven ? 'Roast' : 'Skillet') + ' turkey with ' + herb,
      { 'turkey cutlets': 170, [herb]: 0.5, [oil]: 5, [accent]: 10 },
      oven ? 'Oven' : 'Burner',
      oven ? 35 : 25,
      [
        'Pat the cutlets dry. Coat with the oil and seasoning. Arrange in one layer; cook in batches if needed.',
        oven
          ? 'Roast at 400°F, checking after 12 minutes, until the center reaches 165°F.'
          : 'Sear over medium heat, about 4–6 minutes per side, until the center reaches 165°F.',
        oven
          ? 'Finely chop any whole fruit or ginger. Add the garnish and a splash of water to the pan for the final few minutes of roasting.'
          : 'Finely chop any whole fruit or ginger. Warm the garnish in the skillet and spoon it over the turkey.',
      ],
      { meat: true },
    );
  const beans = recipe(
    bean + ' with ' + green + ' and sweet potato',
    { [legume]: 150, 'sweet potato': 100, [green]: 2, [oil]: 5 },
    'Burner',
    30,
    [
      'Peel and dice the sweet potato. Soften in the oil over medium heat for 5 minutes.',
      'Add drained beans and water halfway up the vegetables. Cover and simmer 15–20 minutes until tender. Crush a few beans to thicken and finish with the chopped herbs.',
    ],
  );
  const salad = recipe(
    bean + ' and ' + veg + ' salad',
    { [legume]: 160, [veg]: 70, [green]: 2, 'lemon juice': 8, [oil]: 5 },
    'Bowl',
    18,
    [
      'Drain and rinse ready-to-eat beans. Thinly slice or grate the vegetable and chop the herbs.',
      'Gently toss everything with the lemon juice and oil. Cover and refrigerate until serving.',
    ],
    { cold: true },
  );
  const slaw = recipe(
    veg + ' ribbon slaw with ' + green,
    { [veg]: 85, [green]: 2, 'lemon juice': 6, [oil]: 4 },
    'Bowl',
    15,
    [
      'Wash the produce and shave the vegetable into fine ribbons. Chop the herbs.',
      'Toss with the juice and oil just before serving.',
    ],
    { cold: true },
  );
  const relish = recipe(
    'Cranberry and ' + dessert + ' relish',
    { cranberries: 35, [dessert]: 55, 'maple syrup': 8 },
    'Bowl',
    15,
    [
      'Rinse and mince the cranberries. Peel or core the fruit as needed and dice finely.',
      'Fold in the syrup and chill covered for at least 30 minutes.',
    ],
    { cold: true },
  );
  const potatoes = recipe('Olive oil potato mash', { potatoes: 150, [oil]: 8 }, 'Burner', 35, [
    'Peel and cube the potatoes. Cover with water and simmer until fork-tender, about 20 minutes.',
    'Reserve a cup of cooking water and drain. Mash with olive oil and enough cooking water for a soft texture.',
  ]);
  const roots = recipe(
    'Roasted sweet potato wedges',
    { 'sweet potato': 150, [oil]: 5, [herb]: 0.5 },
    'Oven',
    40,
    [
      'Heat oven to 425°F. Scrub and slice the sweet potatoes into thin wedges.',
      'Toss with oil and seasoning. Spread on a sheet pan and roast 25–30 minutes, turning once, until tender.',
    ],
  );
  const fruitCup = recipe(
    dessert + ' cups with ' + spice,
    { [dessert]: 130, [spice]: 0.25, 'maple syrup': 5 },
    'Bowl',
    12,
    [
      'Peel, pit or core the fruit as needed and slice into bite-size pieces.',
      'Toss with syrup and spice. Portion into small bowls and chill covered.',
    ],
    { cold: true },
  );
  const compote = recipe(
    'Spiced apple and ' + dessert + ' compote',
    { apple: 75, [dessert]: 75, [spice]: 0.3 },
    'Burner',
    25,
    [
      'Peel or core fruit as needed and dice. Add to a saucepan with the spice and a splash of water.',
      'Simmer covered for 15–20 minutes, stirring occasionally until soft. Chill in shallow containers and serve cold.',
    ],
    { cold: true },
  );
  const sliced = recipe(
    'Autumn fruit platter with ' + green,
    { [fruit]: fruit.includes('juice') ? 6 : 50, pear: 75, apple: 60, [green]: 1 },
    'Bowl',
    15,
    [
      'Core the apples and pears and slice thinly. Prepare the remaining fruit or juice.',
      'Arrange on a platter, scatter with finely chopped herbs, and chill until serving.',
    ],
    { cold: true },
  );
  const mainNames = [
    'Cranberry-braised turkey',
    'Pomegranate turkey braise',
    'Turkey and black bean guisado',
    'Turkey and chickpea stew',
    'Smothered turkey and sweet potatoes',
  ];
  const braiseFood: Food = { 'turkey cutlets': 150, [oil]: 5 };
  const pairings: Food[] = [
    { cranberries: 25, apple: 45 },
    { 'pomegranate juice': 55, onion: 40 },
    { 'cooked black beans': 60, 'crushed tomatoes': 60 },
    { 'cooked chickpeas': 65, 'crushed tomatoes': 50 },
    { 'sweet potato': 90, onion: 35 },
  ];
  const braise = recipe(
    mainNames[index],
    { ...braiseFood, ...pairings[index], [herb]: 0.5 },
    'Burner',
    40,
    [
      'Cut the turkey into bite-size pieces. Warm the oil in a deep pan, brown the turkey in batches, then return it to the pan.',
      'Chop any whole produce into small pieces. Stir in the remaining ingredients and enough water to reach halfway up the turkey.',
      'Cover and simmer gently, stirring occasionally, until the vegetables are tender and the turkey reaches 165°F. Uncover briefly to thicken the sauce.',
    ],
    { meat: true },
  );
  const peppers = recipe(
    'Sweet pepper and herb salad',
    { 'sweet pepper': 85, [green]: 2, 'lemon juice': 5, [oil]: 3 },
    'Bowl',
    15,
    [
      'Seed the peppers and slice into thin strips. Finely chop the herbs.',
      'Toss everything together and chill covered until serving.',
    ],
    { cold: true },
  );
  const beanSide = recipe(
    bean + ' with ' + fruit,
    { [legume]: 65, [fruit]: fruit.includes('juice') ? 5 : 25, [green]: 1, [oil]: 3 },
    'Bowl',
    12,
    [
      'Drain and rinse the cooked beans. Dice any whole fruit and chop the herbs.',
      'Fold the ingredients together with the oil. Chill covered and serve as a small side.',
    ],
    { cold: true },
  );
  const dairyMain = recipe(
    'Warm ' + bean + ' with herbed ricotta',
    { [legume]: 140, ricotta: 65, [green]: 2, [oil]: 4 },
    'Burner',
    20,
    [
      'Rinse and drain the beans. Warm them gently with the oil and a splash of water until steaming.',
      'Finely chop the herbs and fold them into the ricotta. Spoon the beans into bowls and top with herbed ricotta.',
    ],
  );
  return {
    dairy: [dairyMain],
    main: index === 0 ? [turkey(true), braise, turkey(false)] : [braise, turkey(true), turkey(false)],
    plant: [beans, salad],
    vegetable: [slaw, relish, peppers],
    side: [potatoes, roots, beanSide],
    dessert: [compote, fruitCup, sliced],
  };
}
export const ingredients = [
  ...new Set(
    cuisines.flatMap((_, i) =>
      Object.values(candidates(i))
        .flat()
        .flatMap((d) => Object.keys(d.food)),
    ),
  ),
].sort();
export const dishNames = [
  ...new Set(
    cuisines.flatMap((_, i) =>
      Object.values(candidates(i))
        .flat()
        .map((d) => d.name),
    ),
  ),
].sort();
export function makeSlots(r: Request): Slot[] {
  if (
    !Number.isInteger(r.guests) ||
    r.guests < 1 ||
    r.guests > 12 ||
    !Number.isInteger(r.mixed) ||
    r.mixed < 0 ||
    r.mixed >= r.guests
  )
    throw Error('Choose 1–12 guests and a smaller number for the alternate group.');
  const all = [...r.diet, ...r.other];
  const plant = (d: string[]) => d.some((x) => ['Vegan', 'Vegetarian'].includes(x));
  const kosher = all.includes('Kosher');
  const plantMain = plant(r.diet) || (kosher && r.kosher !== 'Meat');
  if (kosher && r.kosher === 'Meat' && plant(r.diet))
    throw Error('Choose a pareve direction for a vegetarian or vegan kosher table.');
  if (kosher && r.kosher === 'Dairy' && all.some((d) => ['Dairy-free', 'Vegan'].includes(d)))
    throw Error('Choose pareve to accommodate everyone avoiding dairy.');
  const main = candidates(r.cuisine);
  const shared = candidates(r.subtle ? 0 : r.cuisine);
  const alternate = !plantMain && r.mixed > 0 && plant(r.other);
  function slot(course: Course, options: Dish[], people = r.guests, audience = 'Everyone'): Slot {
    let result = options.filter(
      (d) =>
        (d.tool === 'Bowl' || (d.tool === 'Oven' ? r.oven : r.burners) > 0) &&
        !Object.keys(d.food).some((f) => r.exclude.includes(f)),
    );
    if (r.effort === 'Easy') result.sort((a, b) => a.minutes - b.minutes);
    if (r.effort === 'Ambitious') result.sort((a, b) => b.minutes - a.minutes);
    if (r.twist && result.length > 1) result = [...result.slice(1), result[0]];
    if (!result.length)
      throw Error(
        'No compatible ' +
          course.toLowerCase() +
          ' in this collection. Review equipment or choose another cuisine.',
      );
    return { course, options: result, people, audience };
  }
  const slots = [
    slot(
      'Main',
      kosher && r.kosher === 'Dairy'
        ? [...main.dairy, ...main.plant]
        : plantMain
          ? main.plant
          : main.main,
      alternate ? r.guests - r.mixed : r.guests,
      alternate ? 'Main group' : 'Everyone',
    ),
  ];
  if (alternate)
    slots.push(slot('Alternate main', main.plant, r.mixed, 'Guests requesting a plant-based main'));
  slots.push(
    slot('Vegetable', shared.vegetable),
    slot('Side', shared.side),
    slot('Dessert', shared.dessert),
  );
  if (r.must) {
    const matches = (d: Dish) => r.must === d.name || Object.keys(d.food).includes(r.must);
    const target = slots.find((s) => s.options.some(matches));
    if (!target)
      throw Error('The requested ingredient cannot fit this menu. Change the cuisine or must-have.');
    target.options = target.options.filter(matches);
  }
  return slots;
}
export function shopping(slots: Slot[], choices: number[], pantry: Food) {
  const totals: Food = {};
  slots.forEach((s, i) =>
    Object.entries(s.options[choices[i]].food).forEach(
      ([k, v]) => (totals[k] = (totals[k] || 0) + v * s.people),
    ),
  );
  return Object.entries(totals)
    .map(([name, g]) => ({ name, grams: Math.max(0, Math.ceil(g - (pantry[name] || 0))) }))
    .filter((x) => x.grams);
}
export function schedule(slots: Slot[], choices: number[], burners: number, oven: number) {
  const day: string[] = [];
  const ahead: string[] = [];
  const lanes: Record<string, number[]> = { Burner: Array(burners).fill(0), Oven: [0], Bowl: [0] };
  slots.forEach((s, i) => {
    const d = s.options[choices[i]];
    if (d.cold) {
      ahead.push(
        'Prepare ' +
          d.name +
          ' up to one day ahead. Refrigerate covered; dress raw vegetables at serving.',
      );
      return;
    }
    const lane = lanes[d.tool];
    const j = lane.indexOf(Math.min(...lane));
    const end = lane[j] + 5;
    lane[j] = end + d.minutes * Math.ceil(s.people / (d.tool === 'Oven' ? 6 * Math.max(1, oven) : 6));
    day.push(
      lane[j] +
        ' minutes before serving · ' +
        d.name +
        ' (' +
        d.tool.toLowerCase() +
        '). Allow extra time for batches; hold hot until serving.',
    );
  });
  return [
    ...ahead,
    ...day.sort((a, b) => parseInt(b) - parseInt(a)),
    'At serving time · plate the mains and set out the shared dishes.',
  ];
}

export function usableStorage(cooked: string, stored: string, thawed: string, now = Date.now()) {
  const days = (date: string) => (now - new Date(date).getTime()) / 86400000;
  if (!cooked || !(days(cooked) >= 0)) return false;
  if (stored === 'Refrigerated promptly') return days(cooked) <= 4;
  return (
    stored === 'Frozen promptly, thawed in refrigerator' &&
    days(thawed) >= 0 &&
    days(thawed) <= 4 &&
    days(cooked) >= days(thawed)
  );
}
