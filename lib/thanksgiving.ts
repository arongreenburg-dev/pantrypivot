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
  description: string;
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
  description: string,
  extra: Partial<Dish> = {},
): Dish {
  return { name: name[0].toUpperCase() + name.slice(1), description, food, tool, minutes, steps, ...extra };
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
  const greenAmount = green === 'thyme' ? 0.3 : 2;
  const seasoning = herb === 'sage' ? 0.12 : 0.4;
  const finishingStep = [
    'Crush the cranberries lightly. Spoon them around the turkey with the maple syrup and a splash of water.',
    'Spoon the pan juices over the cutlets and scatter the pomegranate seeds on top just before serving.',
    'Squeeze the lime juice into the warm pan and stir to loosen the browned juices.',
    'Grate the ginger finely. Stir it into the pan juices with a splash of water.',
    'Dice the apple finely. Tuck the pieces around the turkey with a splash of water.',
  ][index];
  const turkeyNames = ['Sage turkey cutlets with maple cranberries', 'Oregano turkey with pomegranate',
    'Cumin turkey cutlets with lime', 'Coriander turkey with fresh ginger', 'Smoky turkey cutlets with apple'];
  const turkey = (oven: boolean) => recipe(
    (oven ? 'Oven-roasted' : 'Skillet-seared') + ' ' + turkeyNames[index][0].toLowerCase() + turkeyNames[index].slice(1),
    { 'turkey cutlets': 170, [herb]: seasoning, [oil]: 4.5, [accent]: index === 3 ? 1.5 : 12.5,
      salt: 0.5, ...(index === 0 ? { 'maple syrup': 5 } : {}) },
    oven ? 'Oven' : 'Burner', oven ? 35 : 25,
    [
      (oven ? 'Heat the oven to 400°F. ' : 'Set a wide skillet over medium heat. ') +
        'Pat the cutlets dry. Rub both sides with the olive oil, salt and ' + herb + '.',
      oven ? 'Arrange the cutlets in a shallow roasting pan in a single layer.' :
        'Lay the cutlets in the hot skillet without crowding. Sear until golden underneath, about 4 minutes, then turn.',
      ...(index === 1 ? [] : [finishingStep]),
      oven ? 'Roast until a thermometer inserted sideways into the thickest cutlet reads 165°F. Start checking after 12 minutes.' :
        'Cook the second side until the center reaches 165°F, about 4–6 minutes. Transfer the cutlets to a warm platter.',
      index === 1 ? finishingStep : 'Let the cutlets rest briefly. Stir the pan juices and spoon them over each serving.',
    ],
    index === 0 ? 'Thin cutlets give you the flavor of a holiday roast on a weeknight timetable. Cranberries soften in the pan with just enough maple syrup to balance their tartness.' :
      'A quick turkey centerpiece finished with ' + accent + ' and its own pan juices.', { meat: true });
  const beans = recipe(
    bean + ' with ' + green + ' and sweet potato',
    { [legume]: 150, 'sweet potato': 100, [green]: greenAmount, [oil]: 5 },
    'Burner',
    30,
    [
      'Peel and dice the sweet potato. Soften in the oil over medium heat for 5 minutes.',
      'Add drained beans and water halfway up the vegetables. Cover and simmer 15–20 minutes until tender. Crush a few beans to thicken and finish with the chopped herbs.',
    ],
    'The sweet potato softens into the beans as they simmer, giving the pot a creamy finish.',
  );
  const salad = recipe(
    bean + ' and ' + veg + ' salad',
    { [legume]: 160, [veg]: 70, [green]: greenAmount, 'lemon juice': 8, [oil]: 5 },
    'Bowl',
    18,
    [
      'Drain and rinse ready-to-eat beans. Thinly slice or grate the vegetable and chop the herbs.',
      'Gently toss everything with the lemon juice and oil. Cover and refrigerate until serving.',
    ],
    'A substantial chilled main with tender beans, crunchy vegetables and a bright lemon dressing.',
    { cold: true },
  );
  const slaw = recipe(
    (veg === 'carrots' ? 'Carrot' : veg) + ' ribbon slaw with ' + green,
    { [veg]: 85, [green]: greenAmount, 'lemon juice': 6, [oil]: 4 },
    'Bowl',
    15,
    [
      veg === 'cabbage' ? 'Cut out the cabbage core. Slice the leaves into fine shreds.' : 'Trim the ' + veg + ' and draw a vegetable peeler along the length to cut wide ribbons.',
      'Whisk the lemon juice and olive oil together. Finely chop the ' + green + ' and fold it into the dressing. Toss with the ribbons just before serving.',
    ],
    'Thin ribbons keep the salad crisp. Dress them just before bringing the bowl to the table.',
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
    'Finely chopped fruit gives this chilled cranberry relish a fresh crunch alongside the main.',
    { cold: true },
  );
  const potatoes = recipe('Fluffy olive oil potato mash', { potatoes: 150, [oil]: 8, salt: 0.5 }, 'Burner', 35, [
    'Peel the potatoes, cut into 1-inch chunks and put them in a saucepan. Cover with cold water. Bring to a boil, then reduce to a simmer until a fork slides through easily, about 15–20 minutes.',
    'Scoop out a cup of cooking water before draining. Return the potatoes to the warm pan for a minute to let excess moisture steam off.',
    'Mash while hot. Fold in the olive oil and salt, then stir in reserved cooking water a spoonful at a time until the mash holds soft peaks.',
  ], 'Reserved potato water and olive oil make a silky mash with a clean potato flavor.');
  const roots = recipe(
    'Roasted sweet potato wedges',
    { 'sweet potato': 150, [oil]: 5, [herb]: seasoning },
    'Oven',
    40,
    [
      'Heat oven to 425°F. Scrub and slice the sweet potatoes into thin wedges.',
      'Toss with the olive oil and ' + herb + '. Spread on a sheet pan and roast 25–30 minutes, turning once, until tender.',
    ],
    'Give the wedges room on the sheet pan so the cut sides turn golden and the centers stay soft.',
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
    'A little maple syrup draws out the fruit juices for a lightly spiced, make-ahead dessert.',
    { cold: true },
  );
  const compote = recipe(
    'Spiced apple and ' + dessert + ' compote',
    { apple: 75, [dessert]: 75, [spice]: 0.3 },
    'Burner',
    25,
    [
      'Core the apples and dice into half-inch pieces. Cut the ' + dessert + ' flesh into similar pieces. Place both in a saucepan with the ' + spice + ' and a splash of water.',
      'Simmer covered for 15–20 minutes, stirring occasionally until soft. Chill in shallow containers and serve cold.',
    ],
    'The apples soften into a spoonable sauce while pieces of fruit hold their shape. Serve chilled in small bowls.',
    { cold: true },
  );
  const bakedPears = recipe(
    'Maple-baked pears with cinnamon cranberries',
    { pear: 150, cranberries: 12.5, 'maple syrup': 10, cinnamon: 0.15 },
    'Oven', 45,
    ['Heat the oven to 375°F. Cut the pears in half from stem to base and scoop out the cores. Set the halves cut side up in a shallow baking dish.',
     'Fill the hollows with cranberries. Stir the cinnamon into the maple syrup and drizzle over the fruit. Add a thin layer of water to the bottom of the dish.',
     'Cover and bake for 20 minutes. Uncover, spoon the pan juices over the pears, and bake for another 10–15 minutes until the edges are golden and a knife slips easily into the flesh.',
     'Set the pear halves in serving bowls and spoon the warm cranberry syrup over the top.'],
    'These pears make their own dessert sauce. The tart berries burst as the fruit bakes, tinting the maple syrup a deep red.');
  const sliced = recipe(
    'Autumn fruit platter with ' + green,
    { [fruit]: fruit.includes('juice') ? 6 : 50, pear: 75, apple: 60, [green]: greenAmount / 2 },
    'Bowl',
    15,
    [
      'Core the apples and pears and slice thinly. Prepare the remaining fruit or juice.',
      'Arrange on a platter, scatter with finely chopped herbs, and chill until serving.',
    ],
    'A cold fruit course with thin slices you can arrange on a platter just before serving.',
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
    { ...braiseFood, ...pairings[index], [herb]: seasoning },
    'Burner',
    40,
    [
      'Cut the turkey into bite-size pieces. Warm the oil in a deep pan, brown the turkey in batches, then return it to the pan.',
      'Add the ' + Object.keys(pairings[index]).join(' and ') + ', chopping any large pieces first. Stir in the ' + herb + ' and add enough water to reach halfway up the turkey.',
      'Cover and simmer gently, stirring occasionally, until the vegetables are tender and the turkey reaches 165°F. Uncover briefly to thicken the sauce.',
    ],
    'Brown the turkey first, then simmer it gently. The browned bits dissolve into the sauce.',
    { meat: true },
  );
  const peppers = recipe(
    'Sweet pepper and herb salad',
    { 'sweet pepper': 85, [green]: greenAmount, 'lemon juice': 5, [oil]: 3 },
    'Bowl',
    15,
    [
      'Seed the peppers and slice into thin strips. Finely chop the herbs.',
      'Toss everything together and chill covered until serving.',
    ],
    'A crisp, colorful side that leaves the oven and stovetop free for the mains.',
    { cold: true },
  );
  const beanSide = recipe(
    bean + ' with ' + fruit,
    { [legume]: 65, [fruit]: fruit.includes('juice') ? 5 : 25, [green]: greenAmount / 2, [oil]: 3 },
    'Bowl',
    12,
    [
      'Drain and rinse the cooked beans. Dice any whole fruit and chop the herbs.',
      'Fold the ingredients together with the oil. Chill covered and serve as a small side.',
    ],
    'Creamy beans and a bright fruit dressing make an easy side to prepare ahead.',
    { cold: true },
  );
  const dairyMain = recipe(
    'Warm ' + bean + ' with herbed ricotta',
    { [legume]: 140, ricotta: 65, [green]: greenAmount, [oil]: 4 },
    'Burner',
    20,
    [
      'Rinse and drain the beans. Warm them gently with the oil and a splash of water until steaming.',
      'Finely chop the herbs and fold them into the ricotta. Spoon the beans into bowls and top with herbed ricotta.',
    ],
    'Warm beans soften the herbed ricotta as you fold the two together at the table.',
  );
  return {
    dairy: [dairyMain],
    main: index === 0 ? [turkey(true), braise, turkey(false)] : [braise, turkey(true), turkey(false)],
    plant: [beans, salad],
    vegetable: [slaw, relish, peppers],
    side: [potatoes, roots, beanSide],
    dessert: index === 0 ? [bakedPears, compote, fruitCup, sliced] : [compote, fruitCup, sliced],
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
    .map(([name, g]) => ({ name, grams: Math.max(0, g - (pantry[name] || 0)) }))
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
