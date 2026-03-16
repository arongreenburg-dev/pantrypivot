import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'classic' | 'penne' | 'casserole' | 'taco';

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
    title: 'Classic Ground Beef Pasta',
    description: 'A rich, hearty meat sauce tossed with spaghetti — simple ingredients, big flavor.',
    time: '35 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground beef (80/20 or 90/10)',
      '12 oz spaghetti or linguine',
      '1 can (28 oz) crushed tomatoes',
      '1 small onion, diced',
      '4 cloves garlic, minced',
      '1 tbsp olive oil',
      '1 tsp Italian seasoning',
      '½ tsp dried basil',
      '½ tsp smoked paprika',
      '1 tsp salt',
      '½ tsp black pepper',
      '½ tsp sugar (to balance acidity)',
    ],
    instructions: [
      'Bring a large pot of salted water to a boil. Cook pasta according to package directions until al dente. Reserve ½ cup pasta water before draining.',
      'Heat olive oil in a large skillet over medium-high heat.',
      'Add onion and cook 3–4 minutes until softened.',
      'Add garlic and cook 30 seconds.',
      'Add ground beef, breaking apart with a spatula. Cook 7–8 minutes until browned. Drain excess fat.',
      'Add Italian seasoning, basil, paprika, salt, pepper, and sugar. Stir to combine.',
      'Pour in crushed tomatoes. Stir and bring to a simmer. Cook 10 minutes, stirring occasionally.',
      'Add a splash of pasta water to loosen the sauce if needed.',
      'Toss drained pasta into the sauce and serve immediately.',
    ],
  },
  penne: {
    title: 'Penne with Ground Beef',
    description: 'Penne pasta with a bold, herb-forward ground beef tomato sauce — ready in 30 minutes.',
    time: '30 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground beef',
      '12 oz penne pasta',
      '1 can (14.5 oz) diced tomatoes',
      '1 can (15 oz) tomato sauce',
      '1 small onion, diced',
      '3 cloves garlic, minced',
      '1 tbsp olive oil',
      '1 tsp dried oregano',
      '1 tsp Italian seasoning',
      '½ tsp red pepper flakes (optional)',
      '1 tsp salt',
      '¼ tsp black pepper',
    ],
    instructions: [
      'Cook penne in salted boiling water until al dente. Reserve ¼ cup pasta water before draining.',
      'Heat olive oil in a large skillet over medium-high heat.',
      'Add onion, cook 3 minutes. Add garlic, cook 30 seconds.',
      'Add ground beef, breaking it apart. Cook until browned, about 7 minutes. Drain excess fat.',
      'Add oregano, Italian seasoning, red pepper flakes, salt, and pepper.',
      'Pour in diced tomatoes and tomato sauce. Stir and simmer 8–10 minutes.',
      'Add pasta water a little at a time to reach desired sauce consistency.',
      'Add cooked penne directly to the sauce and toss to coat.',
      'Serve immediately.',
    ],
  },
  casserole: {
    title: 'Ground Beef Casserole',
    description: 'A satisfying baked pasta casserole with seasoned beef and tomato sauce — perfect for meal prep.',
    time: '55 min',
    servings: '6 servings',
    ingredients: [
      '1 lb ground beef',
      '12 oz ziti or penne pasta, cooked',
      '1 can (28 oz) crushed tomatoes',
      '1 small onion, diced',
      '3 cloves garlic, minced',
      '1 tbsp olive oil',
      '1 tsp Italian seasoning',
      '1 tsp garlic powder',
      '½ tsp dried basil',
      '1 tsp salt',
      '½ tsp black pepper',
    ],
    instructions: [
      'Preheat oven to 375°F (190°C). Grease a 9x13-inch baking dish.',
      'Cook pasta until just under al dente (it will finish in the oven). Drain and set aside.',
      'Heat olive oil in a large skillet. Add onion and cook 3 minutes.',
      'Add garlic and cook 30 seconds. Add ground beef, cook until browned, about 7 minutes. Drain fat.',
      'Stir in Italian seasoning, garlic powder, basil, salt, and pepper.',
      'Add crushed tomatoes. Simmer 5 minutes.',
      'Combine pasta and meat sauce in the baking dish. Stir to mix well.',
      'Cover with foil and bake 25 minutes.',
      'Remove foil and bake 10 more minutes until bubbling around the edges. Rest 5 minutes before serving.',
    ],
  },
  taco: {
    title: 'Taco Pasta',
    description: 'All the flavors of taco night in one easy pasta skillet — done in under 30 minutes.',
    time: '28 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground beef',
      '10 oz rotini or elbow pasta',
      '1 can (14.5 oz) diced tomatoes with green chiles (like Rotel)',
      '1 can (15 oz) tomato sauce',
      '1½ cups beef broth',
      '1 small onion, diced',
      '2 cloves garlic, minced',
      '1 tbsp olive oil',
      '2 tsp chili powder',
      '1 tsp cumin',
      '1 tsp garlic powder',
      '½ tsp smoked paprika',
      '1 tsp salt',
      '¼ tsp black pepper',
    ],
    instructions: [
      'Heat olive oil in a large, deep skillet over medium-high heat.',
      'Add onion and cook 3 minutes. Add garlic and cook 30 seconds.',
      'Add ground beef, breaking apart as it cooks. Cook until browned, about 7 minutes. Drain excess fat.',
      'Stir in chili powder, cumin, garlic powder, paprika, salt, and pepper.',
      'Add diced tomatoes, tomato sauce, and beef broth. Stir to combine.',
      'Bring to a boil, then add uncooked pasta. Stir and reduce heat to medium.',
      'Cover and cook 12–14 minutes, stirring every few minutes, until pasta is tender and liquid is mostly absorbed.',
      'If the pasta is still too wet, cook uncovered 2–3 minutes. Serve immediately.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'classic', label: 'Classic Ground Beef Pasta' },
  { key: 'penne', label: 'Penne with Ground Beef' },
  { key: 'casserole', label: 'Ground Beef Casserole' },
  { key: 'taco', label: 'Taco Pasta' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const GroundBeefPasta: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('classic');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];
  useEffect(() => {
    const PAGE_TITLE = 'Ground Beef Pasta Recipes | PantryPivot';
    const PAGE_DESC = 'Easy ground beef pasta recipes — classic, penne, casserole, and taco pasta. Quick meat-only dinners ready in 30 minutes.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/ground-beef-pasta';
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
      "name": "Ground Beef Pasta",
      "description": "Easy ground beef pasta recipes — classic, penne, casserole, and taco pasta. Quick meat-only dinners ready in 30 minutes.",
      "image": "https://images.pexels.com/photos/6287525/pexels-photo-6287525.jpeg?auto=compresshttps://images.pexels.com/photos/6287525/pexels-photo-6287525.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT30M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "ground beef pasta, pasta with ground beef, easy pasta dinner",
      "url": "https://pantrypivot.com/recipes/ground-beef-pasta",
      "recipeIngredient": [
        "1 lb ground beef (80/20 or 90/10)",
        "12 oz spaghetti or linguine",
        "1 can (28 oz) crushed tomatoes",
        "1 small onion, diced",
        "4 cloves garlic, minced"
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Bring a large pot of salted water to a boil. Cook pasta according to package directions until al dente. Reserve ½ cup pasta water before draining." },
        { "@type": "HowToStep", "text": "Heat olive oil in a large skillet over medium-high heat." },
        { "@type": "HowToStep", "text": "Add onion and cook 3–4 minutes until softened." },
        { "@type": "HowToStep", "text": "Add garlic and cook 30 seconds." },
        { "@type": "HowToStep", "text": "Add ground beef, breaking apart with a spatula. Cook 7–8 minutes until browned. Drain excess fat." },
        { "@type": "HowToStep", "text": "Add Italian seasoning, basil, paprika, salt, pepper, and sugar. Stir to combine." },
        { "@type": "HowToStep", "text": "Pour in crushed tomatoes. Stir and bring to a simmer. Cook 10 minutes, stirring occasionally." },
        { "@type": "HowToStep", "text": "Add a splash of pasta water to loosen the sauce if needed." },
        { "@type": "HowToStep", "text": "Toss drained pasta into the sauce and serve immediately." }
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
            <li className="text-slate-600 font-medium">Ground Beef Pasta</li>
          </ol>
        </nav>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Ground Beef Pasta Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Hearty, crowd-pleasing ground beef pasta dinners — from classic meat sauce to one-pan taco pasta.
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
            <Link to="/recipes/ground-turkey" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🦃</span> Ground Turkey
            </Link>
            <Link to="/recipes/chicken-and-rice" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍚</span> Chicken and Rice
            </Link>
            <Link to="/recipes/salmon" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🐟</span> Salmon Recipes
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
          <Link to="/recipes/instant-pot-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Instant Pot Chicken</Link>
          <Link to="/recipes/beef-stew" className="text-slate-500 hover:text-orange-600 transition-colors">Beef Stew</Link>
        </div>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed text-center">
          Disclosure: PantryPivot participates in the Amazon Associates Program. <br />
          As an Amazon Associate, we may earn from qualifying purchases at no additional cost to you.
        </p>
      </footer>
    </div>
  );
};

export default GroundBeefPasta;
