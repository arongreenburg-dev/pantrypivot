// Mass is used for pantry arithmetic. Volume measures refer to the named form
// (e.g. drained beans, chopped herbs), since a cup weighs differently for each food.
const ounce = 28.349523125;
export type Measure = { unit: 'lb' | 'oz' | 'cup' | 'tbsp' | 'tsp'; grams: number; label?: string };
const pound: Measure = { unit: 'lb', grams: 16 * ounce };
const cup = (grams: number, label?: string): Measure => ({ unit: 'cup', grams, label });
const spoon = (grams: number, label?: string): Measure => ({ unit: 'tsp', grams, label });
const measures: Record<string, Measure> = {
  'turkey cutlets': pound, potatoes: pound, 'sweet potato': pound, carrots: pound, cabbage: pound,
  apple: pound, pear: pound, orange: pound, pineapple: pound, mango: pound, peach: pound,
  cucumber: pound, onion: pound, 'sweet pepper': pound,
  'olive oil': { unit: 'tbsp', grams: 13.5 }, 'maple syrup': { unit: 'tbsp', grams: 20 },
  'lemon juice': { unit: 'tbsp', grams: 15 }, 'lime juice': { unit: 'tbsp', grams: 15 },
  'pomegranate juice': cup(249), 'crushed tomatoes': cup(242), cranberries: cup(100),
  'pomegranate seeds': cup(174), ricotta: cup(246),
  'cooked white beans': cup(179), 'cooked chickpeas': cup(164), 'cooked black beans': cup(172),
  'cooked black-eyed peas': cup(171), sage: spoon(0.7, 'rubbed sage'), oregano: spoon(1, 'dried oregano'),
  thyme: spoon(0.8, 'fresh thyme leaves'), parsley: cup(60, 'chopped fresh parsley'),
  mint: cup(40, 'chopped fresh mint'), cilantro: cup(16, 'chopped cilantro'), chives: cup(48, 'snipped chives'),
  ginger: spoon(2, 'grated fresh ginger'), cinnamon: spoon(2.6, 'ground cinnamon'),
  cardamom: spoon(2, 'ground cardamom'), 'ground cumin': spoon(2.1), 'ground coriander': spoon(1.8),
  'smoked paprika': spoon(2.3), salt: spoon(6, 'fine salt'),
};
export function measureFor(name: string): Measure {
  return measures[name] ?? { unit: 'oz', grams: ounce };
}
const fractions = new Map([[0,''],[1/8,'⅛'],[1/4,'¼'],[1/3,'⅓'],[1/2,'½'],[2/3,'⅔'],[3/4,'¾'],[7/8,'⅞'],[1,'']]);
export function kitchenNumber(value: number) {
  const whole = Math.floor(value);
  const remainder = value - whole;
  const closest = [...fractions.keys()].reduce((a,b)=>Math.abs(remainder-a)<=Math.abs(remainder-b)?a:b);
  const n = whole + Number(closest === 1);
  return [n || '', fractions.get(closest)].filter(Boolean).join(' ') || '0';
}
export function usAmount(name: string, grams: number) {
  const measure = measureFor(name);
  let amount = grams / measure.grams;
  let unit = measure.unit;
  if (unit === 'lb' && amount < 0.5) { unit = 'oz'; amount *= 16; }
  if (unit === 'cup' && amount < 0.25) { unit = 'tbsp'; amount *= 16; }
  if (unit === 'tbsp' && amount < 1) { unit = 'tsp'; amount *= 3; }
  if (unit === 'tsp' && amount >= 3) { unit = 'tbsp'; amount /= 3; }
  if (unit === 'tsp' && amount < 0.125) return 'a pinch';
  const number = kitchenNumber(amount);
  if (number === '0') return 'less than ⅛ ' + unit;
  return number + ' ' + (unit === 'cup' && amount > 1 && number !== '1' ? 'cups' : unit);
}
export function foodLabel(name:string) {
  return measureFor(name).label ?? name;
}
