import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'classic' | 'crockpot' | 'instantpot' | 'veggie';

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
    title: 'Classic Beef Stew',
    description: 'Rich, hearty beef stew simmered low and slow on the stovetop — tender chunks of beef and vegetables in a deep savory broth.',
    time: '2.5 hrs',
    servings: '6 servings',
    ingredients: [
      '2 lbs beef chuck, cut into 1½-inch cubes',
      '3 tbsp olive oil, divided',
      '1 large onion, diced',
      '4 cloves garlic, minced',
      '3 medium carrots, sliced',
      '3 stalks celery, sliced',
      '3 medium Yukon Gold potatoes, cubed',
      '2½ cups beef broth',
      '1 can (14 oz) diced tomatoes',
      '2 tbsp tomato paste',
      '2 tbsp all-purpose flour',
      '1 tsp dried thyme',
      '1 tsp dried rosemary',
      '1 tsp smoked paprika',
      '1 tsp salt',
      '½ tsp black pepper',
      '2 bay leaves',
    ],
    instructions: [
      'Pat beef dry with paper towels. Toss with flour, salt, pepper, and paprika until coated.',
      'Heat 2 tbsp oil in a large Dutch oven over medium-high heat. Brown beef in batches without crowding, 3–4 min per side. Remove and set aside.',
      'Add remaining oil to pot. Sauté onion 3 minutes until softened. Add garlic and cook 1 minute.',
      'Stir in tomato paste and cook 1 minute.',
      'Return beef to pot. Pour in beef broth and diced tomatoes. Scrape up any browned bits.',
      'Add carrots, celery, potatoes, thyme, rosemary, and bay leaves. Bring to a boil.',
      'Reduce heat to low, cover, and simmer 1.5–2 hours until beef is fork-tender.',
      'Remove bay leaves. Taste and adjust seasoning before serving.',
    ],
  },
  crockpot: {
    title: 'Crockpot Beef Stew',
    description: 'Set-it-and-forget-it slow cooker beef stew — tender beef and hearty vegetables in a rich, thick broth after a long, lazy cook.',
    time: '8 hrs (low) or 4–5 hrs (high)',
    servings: '6 servings',
    ingredients: [
      '2 lbs beef chuck, cut into 1½-inch cubes',
      '2 tbsp all-purpose flour',
      '3 medium carrots, sliced',
      '3 stalks celery, sliced',
      '3 medium potatoes, cubed',
      '1 large onion, diced',
      '4 cloves garlic, minced',
      '2 cups beef broth',
      '1 can (14 oz) diced tomatoes',
      '2 tbsp tomato paste',
      '1 tsp dried thyme',
      '1 tsp dried rosemary',
      '1 tsp salt',
      '½ tsp black pepper',
      '2 bay leaves',
    ],
    instructions: [
      'Toss beef cubes with flour, salt, and pepper until evenly coated.',
      'Layer vegetables in the bottom of the crockpot: onion, garlic, carrots, celery, and potatoes.',
      'Place floured beef on top of the vegetables.',
      'Whisk tomato paste into beef broth until smooth. Pour over beef.',
      'Add diced tomatoes, thyme, rosemary, and bay leaves.',
      'Cook on LOW for 7–8 hours or HIGH for 4–5 hours, until beef is very tender.',
      'Remove bay leaves. Stir to combine and adjust seasoning.',
      'If you want a thicker stew, mash a few of the potatoes into the broth before serving.',
    ],
  },
  instantpot: {
    title: 'Instant Pot Beef Stew',
    description: 'All the depth of a slow-simmered stew in under an hour — tender beef and vegetables from your pressure cooker.',
    time: '55 min',
    servings: '6 servings',
    ingredients: [
      '2 lbs beef chuck, cut into 1½-inch cubes',
      '2 tbsp olive oil',
      '1 large onion, diced',
      '4 cloves garlic, minced',
      '3 medium carrots, sliced',
      '3 medium potatoes, cubed',
      '2 cups beef broth',
      '1 can (14 oz) diced tomatoes',
      '2 tbsp tomato paste',
      '1 tsp dried thyme',
      '1 tsp smoked paprika',
      '1 tsp salt',
      '½ tsp black pepper',
      '2 tbsp cornstarch + 2 tbsp cold water (slurry)',
      '2 bay leaves',
    ],
    instructions: [
      'Set Instant Pot to Sauté. Heat oil and brown beef in batches 2–3 min per side. Remove and set aside.',
      'Sauté onion 2 minutes, add garlic 30 seconds. Stir in tomato paste and cook 30 seconds.',
      'Pour in beef broth and scrape up any browned bits from the bottom.',
      'Add beef, carrots, potatoes, tomatoes, thyme, paprika, salt, pepper, and bay leaves.',
      'Seal the lid. Set valve to Sealing. Cook on Manual (High Pressure) for 35 minutes.',
      'Natural release for 10 minutes, then carefully quick-release remaining pressure.',
      'Remove bay leaves. Switch to Sauté mode. Stir in cornstarch slurry and cook 2–3 minutes until thickened.',
      'Adjust seasoning and serve hot.',
    ],
  },
  veggie: {
    title: 'Beef & Vegetable Stew',
    description: 'A loaded beef stew packed with hearty root vegetables — colorful, deeply satisfying, and meat-only.',
    time: '2.5 hrs',
    servings: '6 servings',
    ingredients: [
      '2 lbs beef chuck, cut into 1½-inch cubes',
      '2 tbsp olive oil',
      '1 large onion, diced',
      '4 cloves garlic, minced',
      '2 large carrots, sliced',
      '2 parsnips, peeled and sliced',
      '2 medium turnips, cubed',
      '2 medium potatoes, cubed',
      '1 cup frozen peas',
      '2½ cups beef broth',
      '1 can (14 oz) diced tomatoes',
      '1 tbsp tomato paste',
      '1 tsp dried thyme',
      '1 tsp dried rosemary',
      '1 tsp salt',
      '½ tsp black pepper',
      '2 bay leaves',
    ],
    instructions: [
      'Season beef with salt and pepper. Heat oil in a large Dutch oven over medium-high heat. Brown beef in batches, 3–4 min per side. Set aside.',
      'In the same pot, sauté onion 3 minutes. Add garlic and cook 1 minute.',
      'Return beef to pot. Add broth, diced tomatoes, and tomato paste. Stir to combine.',
      'Add carrots, parsnips, turnips, potatoes, thyme, rosemary, and bay leaves.',
      'Bring to a boil, then reduce heat to low. Cover and simmer 1.5–2 hours until beef is fork-tender.',
      'Add frozen peas in the last 5 minutes of cooking.',
      'Remove bay leaves. Adjust seasoning and serve.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'classic', label: 'Classic Beef Stew' },
  { key: 'crockpot', label: 'Crockpot Beef Stew' },
  { key: 'instantpot', label: 'Instant Pot Beef Stew' },
  { key: 'veggie', label: 'Beef & Vegetable Stew' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const BeefStew: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('classic');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Beef Stew Recipes | PantryPivot';
    const PAGE_DESC = 'Hearty beef stew recipes — classic stovetop, crockpot, Instant Pot, and beef vegetable stew. Meat-only, no dairy, rich and comforting.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/beef-stew';
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
      "name": "Beef Stew",
      "description": "Hearty beef stew recipes — classic stovetop, crockpot, Instant Pot, and beef vegetable stew. Meat-only, no dairy, rich and comforting.",
      "image": "https://pantrypivot.com/og-image.png",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT180M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "beef stew, easy beef stew, homemade beef stew",
      "url": "https://pantrypivot.com/recipes/beef-stew",
      "recipeIngredient": [
        "2 lbs beef chuck, cut into 1\u00bd-inch cubes",
        "3 tbsp olive oil, divided",
        "1 large onion, diced",
        "4 cloves garlic, minced",
        "3 medium carrots, sliced"
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
            <img src="/apple-touch-icon.png" className="h-8 w-8 rounded-lg" alt="PantryPivot" loading="lazy" /> PantryPivot
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
            <li className="text-slate-600 font-medium">Beef Stew</li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Beef Stew Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Rich, hearty beef stew for every cooking method — stovetop, slow cooker, Instant Pot, and loaded with vegetables.
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
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="flex-1 border-2 border-slate-200 hover:border-orange-300 text-slate-700 font-bold py-3 px-6 rounded-2xl text-center transition-all"
            >
              {copied ? '✓ Link copied!' : 'Share this recipe'}
            </button>
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
            <Link to="/recipes/ground-beef-pasta" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍝</span> Ground Beef Pasta
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
          <Link to="/recipes/instant-pot-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Instant Pot Chicken</Link>
          <Link to="/recipes/roast-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Roast Chicken</Link>
          <Link to="/recipes/chicken-soup" className="text-slate-500 hover:text-orange-600 transition-colors">Chicken Soup</Link>
        </div>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed text-center">
          Disclosure: PantryPivot participates in the Amazon Associates Program. <br />
          As an Amazon Associate, we may earn from qualifying purchases at no additional cost to you.
        </p>
      </footer>
    </div>
  );
};

export default BeefStew;
