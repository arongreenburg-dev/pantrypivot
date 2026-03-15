import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'classic' | 'few' | 'legs' | 'thighs';

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
    title: 'Classic Crockpot Chicken',
    description: 'Slow-cooked seasoned chicken breast that falls apart with a fork — perfect over rice or in tacos.',
    time: '6–8 hrs (low) or 3–4 hrs (high)',
    servings: '4 servings',
    ingredients: [
      '2 lbs boneless, skinless chicken breasts',
      '1 cup chicken broth',
      '1 tsp garlic powder',
      '1 tsp onion powder',
      '1 tsp smoked paprika',
      '½ tsp dried thyme',
      '½ tsp dried oregano',
      '1 tsp salt',
      '½ tsp black pepper',
      '2 cloves garlic, minced',
    ],
    instructions: [
      'Place chicken breasts in the bottom of the crockpot in a single layer.',
      'Mix garlic powder, onion powder, paprika, thyme, oregano, salt, and pepper. Sprinkle evenly over the chicken.',
      'Add minced garlic around the chicken, then pour chicken broth over everything.',
      'Cook on LOW for 6–8 hours or HIGH for 3–4 hours, until chicken is completely tender and reads 165°F.',
      'Remove chicken and shred with two forks, then return to the pot and stir through the juices.',
      'Serve over rice, in tacos, or as-is with a side of roasted vegetables.',
    ],
  },
  few: {
    title: 'Few-Ingredient Crockpot Chicken',
    description: 'Just five pantry staples and your slow cooker does all the work.',
    time: '6 hrs (low)',
    servings: '4 servings',
    ingredients: [
      '2 lbs boneless, skinless chicken breasts or thighs',
      '1 packet (1 oz) dry onion soup mix',
      '1 cup chicken broth',
      '2 tbsp olive oil',
      '1 tsp garlic powder',
    ],
    instructions: [
      'Drizzle olive oil in the bottom of the crockpot.',
      'Place chicken in the crockpot.',
      'Sprinkle the dry onion soup mix and garlic powder evenly over the chicken.',
      'Pour chicken broth around the chicken (not directly over the seasoning).',
      'Cook on LOW for 6 hours or HIGH for 3 hours, until chicken is fork-tender.',
      'Shred with forks and toss through the cooking liquid before serving.',
    ],
  },
  legs: {
    title: 'Crockpot Chicken Legs',
    description: 'Fall-off-the-bone chicken drumsticks slow-cooked in a savory herb sauce.',
    time: '5–6 hrs (low)',
    servings: '4 servings',
    ingredients: [
      '8 chicken drumsticks (about 3 lbs)',
      '½ cup chicken broth',
      '2 tbsp olive oil',
      '3 cloves garlic, minced',
      '1 tsp smoked paprika',
      '1 tsp onion powder',
      '1 tsp dried rosemary',
      '½ tsp dried thyme',
      '1 tsp salt',
      '½ tsp black pepper',
    ],
    instructions: [
      'Pat the chicken legs dry with paper towels.',
      'Mix olive oil, garlic, paprika, onion powder, rosemary, thyme, salt, and pepper to form a paste.',
      'Rub the paste generously over each drumstick.',
      'Place drumsticks in the crockpot — it is fine to stack them.',
      'Pour chicken broth around the legs.',
      'Cook on LOW for 5–6 hours or HIGH for 2.5–3 hours, until meat is pulling away from the bone.',
      'Optional: Transfer legs to a baking sheet and broil for 3–5 minutes to crisp the skin.',
    ],
  },
  thighs: {
    title: 'Crockpot Chicken Thighs',
    description: 'Bone-in thighs slow-cooked until impossibly tender in a rich garlic herb broth.',
    time: '6 hrs (low)',
    servings: '4 servings',
    ingredients: [
      '4 bone-in, skin-on chicken thighs (about 2.5 lbs)',
      '¾ cup chicken broth',
      '1 tbsp olive oil',
      '4 cloves garlic, minced',
      '1 tsp dried thyme',
      '1 tsp dried rosemary',
      '1 tsp smoked paprika',
      '1 tsp salt',
      '½ tsp black pepper',
      '1 small onion, sliced',
    ],
    instructions: [
      'Sear the chicken thighs skin-side down in olive oil over medium-high heat for 3–4 minutes until golden (optional but adds flavor).',
      'Layer sliced onion on the bottom of the crockpot.',
      'Place thighs on top of the onion, skin-side up.',
      'Mix garlic, thyme, rosemary, paprika, salt, and pepper. Rub over the chicken.',
      'Pour chicken broth around the sides of the pot.',
      'Cook on LOW for 6 hours or HIGH for 3 hours, until internal temperature reaches 165°F.',
      'Let rest 5 minutes before serving.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'classic', label: 'Classic' },
  { key: 'few', label: 'Few Ingredients' },
  { key: 'legs', label: 'Chicken Legs' },
  { key: 'thighs', label: 'Chicken Thighs' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const thanksgivingRecipes = [
  {
    title: 'Crockpot Turkey Breast',
    description: 'A perfectly moist turkey breast slow-cooked with herbs — no oven required.',
    time: '6–8 hrs (low)',
    servings: '6–8 servings',
    ingredients: [
      '1 bone-in turkey breast (5–7 lbs)',
      '1 cup chicken or turkey broth',
      '3 tbsp olive oil',
      '4 cloves garlic, minced',
      '1 tsp dried sage',
      '1 tsp dried thyme',
      '1 tsp dried rosemary',
      '1 tsp smoked paprika',
      '1½ tsp salt',
      '½ tsp black pepper',
    ],
    instructions: [
      'Pat the turkey breast completely dry.',
      'Mix olive oil, garlic, sage, thyme, rosemary, paprika, salt, and pepper into a paste.',
      'Rub the paste all over the turkey breast, including under the skin.',
      'Pour broth into the crockpot, then place the turkey breast in.',
      'Cook on LOW for 6–8 hours until internal temperature at the thickest part reads 165°F.',
      'Optional: Transfer to a baking sheet and broil 5 minutes to brown the skin.',
      'Rest 15 minutes before carving.',
    ],
  },
  {
    title: 'Leftover Turkey Soup',
    description: 'A rich, comforting soup that turns Thanksgiving leftovers into a whole new meal.',
    time: '4–6 hrs (low)',
    servings: '6 servings',
    ingredients: [
      '2–3 cups cooked turkey, shredded or chopped',
      '6 cups turkey or chicken broth',
      '3 medium carrots, sliced',
      '3 stalks celery, sliced',
      '1 medium onion, diced',
      '3 cloves garlic, minced',
      '1 cup uncooked egg noodles or rice',
      '1 tsp dried thyme',
      '1 tsp dried parsley',
      '½ tsp sage',
      '1 tsp salt',
      '½ tsp black pepper',
    ],
    instructions: [
      'Add broth, carrots, celery, onion, garlic, thyme, parsley, sage, salt, and pepper to the crockpot.',
      'Cook on LOW for 4 hours or HIGH for 2 hours, until vegetables are tender.',
      'Add shredded turkey and egg noodles (or rice).',
      'Cook on HIGH for an additional 20–30 minutes until noodles are cooked through.',
      'Taste and adjust seasoning before serving.',
    ],
  },
];

const CrockpotChicken: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('classic');
  const recipe = recipes[activeTab];
  useEffect(() => {
    const PAGE_TITLE = 'Crockpot Chicken Recipes | PantryPivot';
    const PAGE_DESC = 'Set-it-and-forget-it crockpot chicken recipes. Classic, few ingredients, chicken legs, and thighs. Includes Thanksgiving turkey section.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/crockpot-chicken';
    document.title = PAGE_TITLE;
    const update = (sel: string, attr: string, val: string): string => {
      const el = document.querySelector(sel);
      const prev = el ? (el.getAttribute(attr) ?? '') : '';
      if (el) el.setAttribute(attr, val);
      return prev;
    };
    const prevDesc = update('meta[name="description"]', 'content', PAGE_DESC);
    const prevOgTitle = update('meta[property="og:title"]', 'content', PAGE_TITLE);
    const prevOgDesc = update('meta[property="og:description"]', 'content', PAGE_DESC);
    const prevOgUrl = update('meta[property="og:url"]', 'content', PAGE_URL);
    const existingCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const prevCanonical = existingCanonical ? existingCanonical.getAttribute('href') : null;
    const canonRef: HTMLLinkElement = existingCanonical || (() => {
      const el = document.createElement('link') as HTMLLinkElement;
      el.rel = 'canonical';
      document.head.appendChild(el);
      return el;
    })();
    canonRef.href = PAGE_URL;
    return () => {
      document.title = 'Recipes for Ingredients You Have | AI Recipe Generator';
      update('meta[name="description"]', 'content', prevDesc);
      update('meta[property="og:title"]', 'content', prevOgTitle);
      update('meta[property="og:description"]', 'content', prevOgDesc);
      update('meta[property="og:url"]', 'content', prevOgUrl);
      if (prevCanonical !== null) canonRef.href = prevCanonical;
      else canonRef.remove();
    };
  }, []);

  const currentMonth = new Date().getMonth(); // 0-indexed: Oct=9, Nov=10
  const showThanksgiving = currentMonth === 9 || currentMonth === 10;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-orange-600 flex items-center gap-2">
            <img src="/apple-touch-icon.png" className="h-8 w-8 rounded-lg" alt="PantryPivot" /> PantryPivot
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="text-xs text-slate-400 mb-8">
          <ol className="flex items-center gap-1.5">
            <li><a href="https://pantrypivot.com" className="hover:text-orange-500 transition-colors">Home</a></li>
            <li className="text-slate-300">›</li>
            <li>Recipes</li>
            <li className="text-slate-300">›</li>
            <li className="text-slate-600 font-medium">Crockpot Chicken</li>
          </ol>
        </nav>
        {/* Hero */}
        {/* TODO: Add recipe hero image here, e.g. <img src="..." alt="Crockpot chicken breast in slow cooker with herbs" /> */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Crockpot Chicken Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Set it and forget it — these slow cooker chicken recipes are tender, flavorful, and hands-off.
          </p>
        </div>

        {/* Tabs */}
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

        {/* Recipe Card */}
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

        {/* Thanksgiving Section — shown in October and November */}
        {showThanksgiving && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <span className="inline-block bg-amber-100 text-amber-700 font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
                Thanksgiving Season
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Holiday Crockpot Recipes</h2>
              <p className="text-slate-500 max-w-lg mx-auto">
                Free up your oven this Thanksgiving — these slow cooker recipes make the holidays easier.
              </p>
            </div>

            <div className="space-y-8">
              {thanksgivingRecipes.map((tr, idx) => (
                <div key={idx} className="bg-white rounded-3xl shadow-sm border border-amber-100 overflow-hidden">
                  <div className="bg-amber-50 border-b border-amber-100 px-8 py-6">
                    <h3 className="text-2xl font-black text-slate-900 mb-1">{tr.title}</h3>
                    <p className="text-slate-500 mb-4">{tr.description}</p>
                    <div className="flex gap-4 text-sm font-semibold text-slate-600">
                      <span>⏱ {tr.time}</span>
                      <span>👥 {tr.servings}</span>
                    </div>
                  </div>

                  <div className="p-8 grid md:grid-cols-2 gap-10">
                    <div>
                      <h4 className="text-sm font-black text-amber-600 uppercase tracking-wide mb-4">Ingredients</h4>
                      <ul className="space-y-2">
                        {tr.ingredients.map((ing, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-700">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-amber-600 uppercase tracking-wide mb-4">Instructions</h4>
                      <ol className="space-y-4">
                        {tr.instructions.map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-black flex items-center justify-center mt-0.5">
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
              ))}
            </div>
          </div>
        )}

        {/* More Recipes */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">More Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/recipes/air-fryer-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍗</span> Air Fryer Chicken
            </Link>
            <Link to="/recipes/instant-pot-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">⚡</span> Instant Pot Chicken
            </Link>
            <Link to="/recipes/chicken-and-rice" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍚</span> Chicken and Rice
            </Link>
          </div>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto px-4 pt-10 pb-8 border-t border-slate-200 mt-12">
        <div className="text-center mb-6">
          <a href="https://pantrypivot.com" className="inline-block bg-slate-900 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-2xl transition-all text-sm">
            Generate More Recipes on PantryPivot →
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-8 text-sm">
          <Link to="/recipes/air-fryer-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Air Fryer Chicken</Link>
          <Link to="/recipes/salmon" className="text-slate-500 hover:text-orange-600 transition-colors">Salmon Recipes</Link>
          <Link to="/recipes/ground-turkey" className="text-slate-500 hover:text-orange-600 transition-colors">Ground Turkey</Link>
          <Link to="/recipes/chicken-and-rice" className="text-slate-500 hover:text-orange-600 transition-colors">Chicken and Rice</Link>
          <Link to="/recipes/ground-beef-pasta" className="text-slate-500 hover:text-orange-600 transition-colors">Ground Beef Pasta</Link>
          <Link to="/recipes/instant-pot-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Instant Pot Chicken</Link>
        </div>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed text-center">
          Disclosure: PantryPivot participates in the Amazon Associates Program. <br />
          As an Amazon Associate, we may earn from qualifying purchases at no additional cost to you.
        </p>
      </footer>
    </div>
  );
};

export default CrockpotChicken;
