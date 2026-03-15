import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'classic' | 'parmesan' | 'tenderloins' | 'thighs';

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
    title: 'Classic Air Fryer Chicken Breast',
    description: 'Juicy, golden chicken breasts cooked to perfection in the air fryer. Ready in under 20 minutes.',
    time: '18 min',
    servings: '2 servings',
    ingredients: [
      '2 boneless, skinless chicken breasts (6–8 oz each)',
      '1 tbsp olive oil',
      '1 tsp garlic powder',
      '1 tsp onion powder',
      '1 tsp smoked paprika',
      '½ tsp dried oregano',
      '½ tsp salt',
      '¼ tsp black pepper',
    ],
    instructions: [
      'Preheat the air fryer to 375°F (190°C) for 3 minutes.',
      'Pat the chicken breasts dry with paper towels — this helps them brown evenly.',
      'Drizzle olive oil over both sides of each breast.',
      'Mix garlic powder, onion powder, paprika, oregano, salt, and pepper. Rub evenly over both sides of the chicken.',
      'Place chicken in the air fryer basket in a single layer, not touching.',
      'Cook at 375°F for 10 minutes, then flip and cook another 6–8 minutes until internal temperature reaches 165°F.',
      'Rest for 5 minutes before slicing to keep the juices locked in.',
    ],
  },
  parmesan: {
    title: 'Air Fryer Chicken Parmesan',
    description: 'Crispy breaded chicken with marinara — all the flavor of classic chicken parm, dairy-free.',
    time: '22 min',
    servings: '2 servings',
    ingredients: [
      '2 boneless, skinless chicken breasts',
      '½ cup breadcrumbs (plain or Italian-style)',
      '1 tsp garlic powder',
      '1 tsp Italian seasoning',
      '½ tsp salt',
      '¼ tsp black pepper',
      '1 egg, beaten',
      '½ cup marinara sauce (dairy-free)',
      '1 tbsp olive oil',
    ],
    instructions: [
      'Preheat air fryer to 400°F (200°C).',
      'Pound the chicken breasts to an even ¾-inch thickness.',
      'Mix breadcrumbs, garlic powder, Italian seasoning, salt, and pepper in a shallow bowl.',
      'Dip each breast in beaten egg, letting excess drip off, then coat thoroughly in the breadcrumb mixture.',
      'Lightly spray or brush both sides with olive oil.',
      'Air fry at 400°F for 8 minutes, flip carefully, then cook another 6 minutes.',
      'Spoon marinara sauce on top of each breast. Cook 2 more minutes until sauce is hot and chicken reads 165°F.',
      'Rest 3 minutes before serving.',
    ],
  },
  tenderloins: {
    title: 'Air Fryer Chicken Tenderloins',
    description: 'Tender strips with a flavorful seasoning crust — perfect for a quick weeknight meal.',
    time: '14 min',
    servings: '2–3 servings',
    ingredients: [
      '1 lb chicken tenderloins',
      '1 tbsp olive oil',
      '1 tsp garlic powder',
      '1 tsp smoked paprika',
      '½ tsp cumin',
      '½ tsp chili powder',
      '½ tsp salt',
      '¼ tsp black pepper',
    ],
    instructions: [
      'Preheat air fryer to 400°F (200°C).',
      'Remove the white tendon from each tenderloin if present — grip with a paper towel and pull.',
      'Toss tenderloins in olive oil until coated.',
      'Combine all spices and sprinkle over the tenderloins, tossing to coat evenly.',
      'Arrange in a single layer in the air fryer basket (work in batches if needed).',
      'Air fry for 5 minutes, flip, then cook another 4–5 minutes until internal temperature reaches 165°F.',
      'Serve immediately with your favorite dipping sauce.',
    ],
  },
  thighs: {
    title: 'Air Fryer Chicken Thighs',
    description: 'Bone-in, skin-on thighs with impossibly crispy skin and juicy meat inside.',
    time: '25 min',
    servings: '4 servings',
    ingredients: [
      '4 bone-in, skin-on chicken thighs',
      '1 tbsp olive oil',
      '1 tsp garlic powder',
      '1 tsp onion powder',
      '1 tsp smoked paprika',
      '½ tsp dried thyme',
      '1 tsp salt',
      '½ tsp black pepper',
    ],
    instructions: [
      'Preheat air fryer to 400°F (200°C).',
      'Pat chicken thighs completely dry — critical for crispy skin.',
      'Rub olive oil all over the thighs, including under the skin.',
      'Mix all spices together and rub evenly over each thigh, including under the skin for maximum flavor.',
      'Place thighs skin-side down in the air fryer basket.',
      'Cook at 400°F for 13 minutes, flip skin-side up, then cook another 10–12 minutes.',
      'Check internal temperature — thighs need to reach 165°F at the thickest part, away from the bone.',
      'Rest 5 minutes before serving.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'classic', label: 'Classic Breast' },
  { key: 'parmesan', label: 'Chicken Parmesan' },
  { key: 'tenderloins', label: 'Tenderloins' },
  { key: 'thighs', label: 'Thighs' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const AirFryerChicken: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('classic');
  const recipe = recipes[activeTab];
  useEffect(() => {
    const PAGE_TITLE = 'Air Fryer Chicken Breast Recipes | PantryPivot';
    const PAGE_DESC = 'Easy air fryer chicken breast recipes — classic, tenderloins, thighs, and crispy chicken. Meat-only, ready in 25 minutes.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/air-fryer-chicken';
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
      "name": "Air Fryer Chicken Breast",
      "description": "Easy air fryer chicken breast recipes — classic, tenderloins, thighs, and crispy chicken. Meat-only, ready in 25 minutes.",
      "image": "https://pantrypivot.com/og-image.png",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT25M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "air fryer chicken, air fryer chicken breast, easy chicken recipes",
      "url": "https://pantrypivot.com/recipes/air-fryer-chicken",
      "recipeIngredient": [
        "2 boneless, skinless chicken breasts (6\u20138 oz each)",
        "1 tbsp olive oil",
        "1 tsp garlic powder",
        "1 tsp onion powder",
        "1 tsp smoked paprika"
      ]
    });
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById('recipe-schema');
      if (el) el.remove();
    };
  }, []);

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
            <li className="text-slate-600 font-medium">Air Fryer Chicken</li>
          </ol>
        </nav>
        {/* Hero */}
        {/* TODO: Add recipe hero image here, e.g. <img src="..." alt="Juicy air fryer chicken breast on a plate with seasoning" /> */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Air Fryer Chicken Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Quick, juicy, and full of flavor — these air fryer chicken recipes are ready in under 25 minutes.
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
          {/* Recipe Header */}
          <div className="bg-orange-50 border-b border-orange-100 px-8 py-6">
            <h2 className="text-2xl font-black text-slate-900 mb-1">{recipe.title}</h2>
            <p className="text-slate-500 mb-4">{recipe.description}</p>
            <div className="flex gap-4 text-sm font-semibold text-slate-600">
              <span>⏱ {recipe.time}</span>
              <span>👥 {recipe.servings}</span>
            </div>
          </div>

          <div className="p-8 grid md:grid-cols-2 gap-10">
            {/* Ingredients */}
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-wide text-sm text-orange-600">
                Ingredients
              </h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-wide text-sm text-orange-600">
                Instructions
              </h3>
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

          {/* CTAs */}
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
            <Link to="/recipes/crockpot-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍲</span> Crockpot Chicken
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
          <Link to="/recipes/crockpot-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Crockpot Chicken</Link>
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

export default AirFryerChicken;
