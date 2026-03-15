import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'breast' | 'drumsticks' | 'dump' | 'thighs';

interface Recipe {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

const recipes: Record<Tab, Recipe> = {
  breast: {
    title: 'Classic Instant Pot Chicken Breast',
    description: 'Juicy, perfectly cooked chicken breast every time — no more dry chicken.',
    time: '25 min (includes pressure build)',
    servings: '4 servings',
    ingredients: [
      '4 boneless, skinless chicken breasts (6–8 oz each)',
      '1 cup chicken broth',
      '1 tbsp olive oil',
      '1 tsp garlic powder',
      '1 tsp onion powder',
      '1 tsp smoked paprika',
      '½ tsp dried thyme',
      '1 tsp salt',
      '¼ tsp black pepper',
    ],
    instructions: [
      'Mix garlic powder, onion powder, paprika, thyme, salt, and pepper. Rub over all sides of each chicken breast.',
      'Set Instant Pot to Sauté mode. Add olive oil and sear chicken breasts 2 minutes per side for color. Press Cancel.',
      'Remove chicken. Pour chicken broth into the pot and scrape up any browned bits.',
      'Place the trivet inside the pot and set chicken breasts on the trivet.',
      'Seal the lid and set the valve to Sealing.',
      'Cook on Manual (High Pressure) for 8 minutes for average-sized breasts (add 2 minutes for extra large).',
      'Let pressure naturally release for 5 minutes, then carefully quick-release the remaining pressure.',
      'Check internal temperature — it should read 165°F. Rest 5 minutes before slicing.',
    ],
  },
  drumsticks: {
    title: 'Instant Pot Chicken Drumsticks',
    description: 'Tender, fall-off-the-bone drumsticks cooked under pressure in under 30 minutes.',
    time: '30 min',
    servings: '4 servings',
    ingredients: [
      '8 chicken drumsticks (about 3 lbs)',
      '1 cup chicken broth',
      '1 tbsp olive oil',
      '1 tsp smoked paprika',
      '1 tsp garlic powder',
      '½ tsp onion powder',
      '½ tsp dried oregano',
      '1 tsp salt',
      '¼ tsp black pepper',
      '2 cloves garlic, minced',
    ],
    instructions: [
      'Mix paprika, garlic powder, onion powder, oregano, salt, and pepper. Rub over all drumsticks.',
      'Set Instant Pot to Sauté. Heat olive oil and sear drumsticks in batches, 2 minutes per side. Press Cancel.',
      'Add chicken broth and minced garlic to the pot, scraping up any browned bits.',
      'Place drumsticks in the pot (it is fine to stack them).',
      'Seal the lid, set valve to Sealing. Cook on Manual High Pressure for 15 minutes.',
      'Quick-release the pressure carefully.',
      'Optional: Transfer drumsticks to a foil-lined baking sheet and broil 3–5 minutes for crispy skin.',
      'Internal temperature should be at least 165°F before serving.',
    ],
  },
  dump: {
    title: 'Dump and Go Instant Pot Chicken',
    description: 'No searing, no prep — just add everything to the pot and press start.',
    time: '25 min',
    servings: '4 servings',
    ingredients: [
      '2 lbs boneless, skinless chicken breasts or thighs',
      '1 cup chicken broth',
      '1 can (14.5 oz) diced tomatoes, undrained',
      '3 cloves garlic, minced',
      '1 tsp Italian seasoning',
      '1 tsp garlic powder',
      '1 tsp smoked paprika',
      '1 tsp salt',
      '½ tsp black pepper',
      '½ tsp onion powder',
    ],
    instructions: [
      'Pour chicken broth into the Instant Pot.',
      'Add diced tomatoes and minced garlic.',
      'Mix all dry seasonings together and sprinkle over the liquid.',
      'Place chicken directly in the pot in a single layer (it is fine if pieces overlap slightly).',
      'Seal the lid and set the valve to Sealing.',
      'Cook on Manual High Pressure for 12 minutes for chicken breasts, or 10 minutes for thighs.',
      'Let pressure naturally release 5 minutes, then quick-release the rest.',
      'Shred the chicken with two forks and stir through the cooking liquid before serving over rice or vegetables.',
    ],
  },
  thighs: {
    title: 'Instant Pot Chicken Thighs',
    description: 'Bone-in or boneless chicken thighs cooked to fall-apart tenderness with a rich pan sauce.',
    time: '30 min',
    servings: '4 servings',
    ingredients: [
      '4 bone-in, skin-on chicken thighs (about 2.5 lbs)',
      '1 cup chicken broth',
      '1 tbsp olive oil',
      '4 cloves garlic, minced',
      '1 tsp smoked paprika',
      '1 tsp garlic powder',
      '½ tsp dried rosemary',
      '½ tsp dried thyme',
      '1 tsp salt',
      '½ tsp black pepper',
      '1 tbsp lemon juice',
    ],
    instructions: [
      'Mix paprika, garlic powder, rosemary, thyme, salt, and pepper. Rub over chicken thighs on all sides.',
      'Set Instant Pot to Sauté. Heat olive oil and sear thighs skin-side down for 4 minutes until golden. Flip and sear 2 minutes. Press Cancel.',
      'Remove thighs. Pour chicken broth into the pot and scrape up browned bits.',
      'Add minced garlic and lemon juice to the broth.',
      'Place trivet in the pot and set chicken thighs on top, skin-side up.',
      'Seal lid, set valve to Sealing. Cook on Manual High Pressure for 12 minutes.',
      'Natural release 5 minutes, then quick-release remaining pressure.',
      'Check that thighs reach 165°F (at the thickest point, away from bone). Rest 5 minutes before serving.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'breast', label: 'Classic Chicken Breast' },
  { key: 'drumsticks', label: 'Chicken Drumsticks' },
  { key: 'dump', label: 'Dump and Go' },
  { key: 'thighs', label: 'Chicken Thighs' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const InstantPotChicken: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('breast');
  const recipe = recipes[activeTab];
  useEffect(() => {
    const PAGE_TITLE = 'Instant Pot Chicken Recipes | PantryPivot';
    const PAGE_DESC = 'Fast Instant Pot chicken recipes — classic breast, drumsticks, dump and go, and thighs. Pressure cooker meals in under 30 minutes.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/instant-pot-chicken';
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

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'recipe-schema';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Recipe",
      "name": "Instant Pot Chicken",
      "description": "Fast Instant Pot chicken recipes — classic breast, drumsticks, dump and go, and thighs. Pressure cooker meals in under 30 minutes.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "instant pot chicken, pressure cooker chicken, easy instant pot recipes",
      "url": "https://pantrypivot.com/recipes/instant-pot-chicken"
    });
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById('recipe-schema');
      if (el) el.remove();
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
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="text-xs text-slate-400 mb-8">
          <ol className="flex items-center gap-1.5">
            <li><a href="https://pantrypivot.com" className="hover:text-orange-500 transition-colors">Home</a></li>
            <li className="text-slate-300">›</li>
            <li>Recipes</li>
            <li className="text-slate-300">›</li>
            <li className="text-slate-600 font-medium">Instant Pot Chicken</li>
          </ol>
        </nav>
        {/* TODO: Add recipe hero image here, e.g. <img src="..." alt="Instant Pot pressure cooker with chicken and seasoning" /> */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Instant Pot Chicken Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Pressure-cooked chicken that's juicy every time — quick weeknight dinners with almost no effort.
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
          <Link to="/recipes/crockpot-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Crockpot Chicken</Link>
          <Link to="/recipes/salmon" className="text-slate-500 hover:text-orange-600 transition-colors">Salmon Recipes</Link>
          <Link to="/recipes/ground-turkey" className="text-slate-500 hover:text-orange-600 transition-colors">Ground Turkey</Link>
          <Link to="/recipes/chicken-and-rice" className="text-slate-500 hover:text-orange-600 transition-colors">Chicken and Rice</Link>
          <Link to="/recipes/ground-beef-pasta" className="text-slate-500 hover:text-orange-600 transition-colors">Ground Beef Pasta</Link>
        </div>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed text-center">
          Disclosure: PantryPivot participates in the Amazon Associates Program. <br />
          As an Amazon Associate, we may earn from qualifying purchases at no additional cost to you.
        </p>
      </footer>
    </div>
  );
};

export default InstantPotChicken;
