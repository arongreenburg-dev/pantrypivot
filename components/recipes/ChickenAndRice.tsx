import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'classic' | 'soup' | 'casserole' | 'bowl';

interface Recipe {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

const recipes: Record<Tab, Recipe> = {
  classic: {
    title: 'Classic Chicken and Rice',
    description: 'Tender chicken thighs slow-simmered with seasoned rice — a one-pot comfort meal.',
    time: '45 min',
    servings: '4 servings',
    ingredients: [
      '4 bone-in, skin-on chicken thighs',
      '1½ cups long-grain white rice',
      '2½ cups chicken broth',
      '1 small onion, diced',
      '3 cloves garlic, minced',
      '1 tbsp olive oil',
      '1 tsp smoked paprika',
      '1 tsp garlic powder',
      '½ tsp onion powder',
      '½ tsp dried thyme',
      '1 tsp salt',
      '½ tsp black pepper',
    ],
    instructions: [
      'Season chicken thighs on both sides with paprika, garlic powder, onion powder, salt, and pepper.',
      'Heat olive oil in a large, deep skillet or Dutch oven over medium-high heat.',
      'Sear chicken skin-side down for 5–6 minutes until golden. Flip and sear 3 more minutes. Remove and set aside.',
      'In the same pan, add onion and cook 3 minutes. Add garlic and cook 30 seconds.',
      'Add rice and stir to coat in the pan drippings for 1 minute.',
      'Pour in chicken broth and add thyme. Stir and bring to a boil.',
      'Nestle the chicken thighs on top of the rice, skin-side up.',
      'Reduce heat to low, cover tightly, and cook 25 minutes until rice is tender and chicken is cooked through.',
      'Let rest 5 minutes before serving.',
    ],
  },
  soup: {
    title: 'Chicken and Rice Soup',
    description: 'A rich, warming chicken soup with tender rice — made from scratch in under an hour.',
    time: '50 min',
    servings: '6 servings',
    ingredients: [
      '1.5 lbs boneless, skinless chicken breasts or thighs',
      '¾ cup long-grain white rice',
      '6 cups chicken broth',
      '3 medium carrots, sliced',
      '3 stalks celery, sliced',
      '1 medium onion, diced',
      '3 cloves garlic, minced',
      '1 tbsp olive oil',
      '1 tsp dried thyme',
      '1 tsp dried parsley',
      '1 bay leaf',
      '1 tsp salt',
      '½ tsp black pepper',
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat.',
      'Add onion, carrots, and celery. Cook 5 minutes until softened.',
      'Add garlic and cook 30 seconds.',
      'Add whole chicken breasts or thighs, chicken broth, thyme, parsley, bay leaf, salt, and pepper.',
      'Bring to a boil, then reduce heat to a simmer. Cook 20 minutes.',
      'Remove chicken and shred with two forks.',
      'Add rice to the pot and cook 15–18 minutes until tender.',
      'Return shredded chicken to the pot. Remove bay leaf.',
      'Taste, adjust seasoning, and serve.',
    ],
  },
  casserole: {
    title: 'Chicken and Rice Casserole',
    description: 'A hearty baked casserole with juicy chicken and fluffy rice — no canned soup, all from scratch.',
    time: '1 hr 15 min',
    servings: '6 servings',
    ingredients: [
      '4 boneless, skinless chicken breasts',
      '1½ cups long-grain white rice (uncooked)',
      '2½ cups chicken broth',
      '1 small onion, finely diced',
      '3 cloves garlic, minced',
      '2 tbsp olive oil',
      '1 tsp garlic powder',
      '1 tsp onion powder',
      '1 tsp smoked paprika',
      '½ tsp dried thyme',
      '1½ tsp salt, divided',
      '½ tsp black pepper, divided',
    ],
    instructions: [
      'Preheat oven to 375°F (190°C). Grease a 9x13-inch baking dish.',
      'Heat 1 tbsp olive oil in a skillet over medium heat. Sauté onion 3 minutes, add garlic and cook 30 seconds.',
      'Spread uncooked rice evenly in the baking dish. Scatter sautéed onion and garlic over the rice.',
      'Pour chicken broth over the rice mixture. Add ½ tsp salt and ¼ tsp pepper to the broth.',
      'Season chicken breasts on both sides with garlic powder, onion powder, paprika, thyme, 1 tsp salt, and ¼ tsp pepper.',
      'Drizzle remaining 1 tbsp olive oil over chicken and nestle on top of the rice.',
      'Cover tightly with foil and bake 50 minutes.',
      'Remove foil and bake 10–15 more minutes until chicken is golden and rice is fully cooked.',
      'Rest 5 minutes before serving.',
    ],
  },
  bowl: {
    title: 'Chicken Rice Bowl',
    description: 'Grilled or pan-seared chicken over seasoned rice with fresh toppings — better than takeout.',
    time: '30 min',
    servings: '2 servings',
    ingredients: [
      '2 boneless, skinless chicken breasts',
      '1½ cups cooked white or brown rice',
      '1 tbsp olive oil',
      '1 tsp garlic powder',
      '1 tsp smoked paprika',
      '½ tsp cumin',
      '½ tsp onion powder',
      '1 tsp salt',
      '¼ tsp black pepper',
      '1 lime, juiced',
      '1 avocado, sliced',
      '½ cup cucumber, sliced',
      '2 tbsp fresh cilantro (optional)',
    ],
    instructions: [
      'Mix garlic powder, paprika, cumin, onion powder, salt, and pepper.',
      'Rub the spice mixture over both sides of each chicken breast.',
      'Heat olive oil in a skillet over medium-high heat.',
      'Cook chicken 6–7 minutes per side until internal temperature reaches 165°F.',
      'Rest 5 minutes, then slice against the grain.',
      'Divide cooked rice between two bowls.',
      'Top with sliced chicken, avocado, and cucumber.',
      'Squeeze lime juice over everything and garnish with cilantro if using.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'classic', label: 'Classic Chicken and Rice' },
  { key: 'soup', label: 'Chicken and Rice Soup' },
  { key: 'casserole', label: 'Chicken and Rice Casserole' },
  { key: 'bowl', label: 'Chicken Rice Bowl' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const ChickenAndRice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('classic');
  const recipe = recipes[activeTab];
  useEffect(() => {
    document.title = 'Chicken and Rice Recipes | PantryPivot';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Easy chicken and rice recipes — classic, soup, creamy casserole, and rice bowls. Simple meat-only dinners the whole family loves.');
    return () => {
      document.title = 'Recipes for Ingredients You Have | AI Recipe Generator';
      if (meta) meta.setAttribute('content', 'Stop staring at the fridge. Find recipes for the ingredients you already have. AI generates a custom recipe in under 30 seconds.');
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-orange-600 flex items-center gap-2">
            <img src="/apple-touch-icon.png" className="h-8 w-8 rounded-lg" alt="PantryPivot" /> PantryPivot
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Chicken and Rice Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Classic comfort food made easy — juicy chicken and perfectly cooked rice in four delicious ways.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap justify-center mb-8">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm border transition-all ${
                activeTab === tab.key
                  ? 'bg-orange-600 border-orange-600 text-white shadow-md'
                  : 'border-slate-200 text-slate-600 bg-white hover:border-orange-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-orange-50 border-b border-orange-100 px-8 py-6">
            <h2 className="text-2xl font-black text-slate-900 mb-1">{recipe.title}</h2>
            <p className="text-slate-500 mb-4">{recipe.description}</p>
            <div className="flex gap-4 text-sm font-semibold text-slate-600">
              <span>⏱ {recipe.time}</span>
              <span>👥 {recipe.servings}</span>
            </div>
          </div>

          <div className="p-8 grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-sm font-black text-orange-600 uppercase tracking-wide mb-4">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black text-orange-600 uppercase tracking-wide mb-4">Instructions</h3>
              <ol className="space-y-4">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-600 text-white text-xs font-black flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-slate-700 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="px-8 pb-8 flex flex-col sm:flex-row gap-3">
            <a
              href={AMAZON_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-2xl text-center transition-all shadow-md"
            >
              Order Ingredients on Amazon Fresh
            </a>
            <a
              href={PANTRYPIVOT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-slate-900 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-2xl text-center transition-all shadow-md"
            >
              Generate More Recipes on PantryPivot →
            </a>
          </div>
        </div>

        {/* More Recipes */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">More Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/recipes/air-fryer-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍗</span> Air Fryer Chicken
            </Link>
            <Link to="/recipes/crockpot-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍲</span> Crockpot Chicken
            </Link>
            <Link to="/recipes/instant-pot-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">⚡</span> Instant Pot Chicken
            </Link>
          </div>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto px-4 py-8 border-t border-slate-200 mt-12 text-center">
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed">
          Disclosure: PantryPivot participates in the Amazon Associates Program. <br />
          As an Amazon Associate, we may earn from qualifying purchases at no additional cost to you.
        </p>
      </footer>
    </div>
  );
};

export default ChickenAndRice;
