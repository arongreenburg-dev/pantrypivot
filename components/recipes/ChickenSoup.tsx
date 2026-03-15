import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'classic' | 'noodle' | 'rice' | 'lemon';

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
    title: 'Classic Chicken Soup',
    description: 'A rich, clear-broth chicken soup made from scratch — deeply comforting and soul-warming.',
    time: '1 hr 30 min',
    servings: '6 servings',
    ingredients: [
      '1 whole chicken (3–4 lbs) or 3 lbs bone-in chicken pieces',
      '3 medium carrots, sliced',
      '3 stalks celery with leaves, sliced',
      '1 large onion, quartered',
      '4 cloves garlic, smashed',
      '2 parsnips, sliced',
      '10 cups cold water',
      '2 tsp salt (plus more to taste)',
      '½ tsp black pepper',
      '1 tsp dried dill',
      '2 bay leaves',
      'Fresh parsley for garnish',
    ],
    instructions: [
      'Place chicken in a large stockpot. Cover with cold water.',
      'Bring to a boil over high heat, skimming foam and impurities from the surface for the first 10 minutes.',
      'Add onion, garlic, bay leaves, dill, salt, and pepper. Reduce heat to low.',
      'Simmer partially covered for 45 minutes.',
      'Add carrots, celery, and parsnips. Continue simmering 30 more minutes until vegetables are tender and chicken is falling off the bone.',
      'Remove chicken from pot and let cool slightly. Shred meat, discarding skin and bones.',
      'Remove and discard bay leaves. Skim excess fat from the surface if desired.',
      'Return shredded chicken to the pot. Adjust seasoning and serve garnished with fresh parsley.',
    ],
  },
  noodle: {
    title: 'Chicken Noodle Soup',
    description: 'Classic chicken noodle soup with egg noodles in a rich golden broth — hearty, comforting, and ready in an hour.',
    time: '1 hr',
    servings: '6 servings',
    ingredients: [
      '1.5 lbs boneless, skinless chicken breasts or thighs',
      '3 medium carrots, sliced',
      '3 stalks celery, sliced',
      '1 medium onion, diced',
      '3 cloves garlic, minced',
      '8 cups chicken broth',
      '3 cups wide egg noodles',
      '1 tbsp olive oil',
      '1 tsp dried thyme',
      '1 tsp salt',
      '½ tsp black pepper',
      'Fresh parsley, chopped, for garnish',
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat. Add onion and cook 3–4 minutes until softened. Add garlic and cook 1 minute.',
      'Add whole chicken pieces and chicken broth. Bring to a boil.',
      'Reduce heat and simmer 20 minutes until chicken is cooked through.',
      'Remove chicken, shred with two forks, and return to the pot.',
      'Add carrots, celery, thyme, salt, and pepper. Simmer 10 minutes until vegetables are tender.',
      'Add egg noodles and cook 7–8 minutes until al dente.',
      'Taste and adjust seasoning. Serve hot, garnished with fresh parsley.',
    ],
  },
  rice: {
    title: 'Chicken Rice Soup',
    description: 'Cozy chicken and rice soup with a light, savory broth — simple, nourishing, and endlessly satisfying.',
    time: '50 min',
    servings: '6 servings',
    ingredients: [
      '1.5 lbs boneless, skinless chicken breasts or thighs',
      '¾ cup long-grain white rice',
      '3 medium carrots, sliced',
      '3 stalks celery, sliced',
      '1 medium onion, diced',
      '3 cloves garlic, minced',
      '8 cups chicken broth',
      '1 tbsp olive oil',
      '1 tsp dried thyme',
      '1 tsp salt',
      '½ tsp black pepper',
      'Fresh dill or parsley for garnish',
    ],
    instructions: [
      'Heat olive oil over medium heat. Sauté onion 3 minutes, add garlic 1 minute.',
      'Add chicken and broth. Bring to a boil.',
      'Reduce heat and simmer 20 minutes until chicken is cooked through. Remove, shred with two forks, and return to pot.',
      'Add carrots, celery, rice, thyme, salt, and pepper.',
      'Simmer 20 minutes until rice and vegetables are tender.',
      'Adjust seasoning. Serve garnished with fresh dill or parsley.',
    ],
  },
  lemon: {
    title: 'Lemon Chicken Soup',
    description: 'A bright, zesty chicken soup with lemon and herbs — light and clean yet deeply flavorful.',
    time: '50 min',
    servings: '6 servings',
    ingredients: [
      '1.5 lbs boneless, skinless chicken breasts',
      '½ cup orzo or small pasta',
      '3 medium carrots, sliced',
      '1 medium onion, diced',
      '3 cloves garlic, minced',
      '8 cups chicken broth',
      'Juice of 2 lemons (about ¼ cup)',
      'Zest of 1 lemon',
      '1 tbsp olive oil',
      '1 tsp dried dill',
      '1 tsp salt',
      '½ tsp black pepper',
      'Fresh parsley or dill for garnish',
    ],
    instructions: [
      'Heat olive oil over medium. Sauté onion 3 minutes, add garlic 1 minute.',
      'Add chicken and broth. Bring to a boil. Reduce heat and simmer 20 minutes.',
      'Remove chicken, shred, and return to pot.',
      'Add carrots and orzo. Simmer 10 minutes until tender.',
      'Stir in lemon juice, lemon zest, dill, salt, and pepper.',
      'Simmer 5 more minutes. Taste and adjust acidity with more lemon if desired. Serve with fresh herbs.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'classic', label: 'Classic Chicken Soup' },
  { key: 'noodle', label: 'Chicken Noodle' },
  { key: 'rice', label: 'Chicken Rice Soup' },
  { key: 'lemon', label: 'Lemon Chicken Soup' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const ChickenSoup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('classic');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Chicken Soup Recipes | PantryPivot';
    const PAGE_DESC = 'Comforting chicken soup recipes — classic, chicken noodle, chicken rice, and lemon chicken soup. Meat-only, no dairy.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/chicken-soup';
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
      "name": "Classic Chicken Soup",
      "description": "Comforting chicken soup recipes — classic, chicken noodle, chicken rice, and lemon chicken soup. Meat-only, no dairy.",
      "image": "https://pantrypivot.com/og-image.png",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT90M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "chicken soup, chicken noodle soup, homemade chicken soup",
      "url": "https://pantrypivot.com/recipes/chicken-soup",
      "recipeIngredient": [
        "1 whole chicken (3\u20134 lbs) or 3 lbs bone-in chicken pieces",
        "3 medium carrots, sliced",
        "3 stalks celery with leaves, sliced",
        "1 large onion, quartered",
        "4 cloves garlic, smashed"
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Place chicken in a large stockpot. Cover with cold water." },
        { "@type": "HowToStep", "text": "Bring to a boil over high heat, skimming foam and impurities from the surface for the first 10 minutes." },
        { "@type": "HowToStep", "text": "Add onion, garlic, bay leaves, dill, salt, and pepper. Reduce heat to low." },
        { "@type": "HowToStep", "text": "Simmer partially covered for 45 minutes." },
        { "@type": "HowToStep", "text": "Add carrots, celery, and parsnips. Continue simmering 30 more minutes until vegetables are tender and chicken is falling off the bone." },
        { "@type": "HowToStep", "text": "Remove chicken from pot and let cool slightly. Shred meat, discarding skin and bones." },
        { "@type": "HowToStep", "text": "Remove and discard bay leaves. Skim excess fat from the surface if desired." },
        { "@type": "HowToStep", "text": "Return shredded chicken to the pot. Adjust seasoning and serve garnished with fresh parsley." }
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
            <li className="text-slate-600 font-medium">Chicken Soup</li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Chicken Soup Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Soul-warming chicken soup recipes for every craving — classic broth, noodles, rice, and bright lemon.
          </p>
        </div>

        {/* Amazon CTA */}
        <div className="text-center mb-6">
          <a
            href="https://amzn.to/4bvEX2h"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-colors text-sm"
          >
            Shop Soup Pots on Amazon →
          </a>
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
            <Link to="/recipes/chicken-and-rice" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍚</span> Chicken and Rice
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
          <Link to="/recipes/beef-stew" className="text-slate-500 hover:text-orange-600 transition-colors">Beef Stew</Link>
          <Link to="/recipes/roast-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Roast Chicken</Link>
        </div>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed text-center">
          Disclosure: PantryPivot participates in the Amazon Associates Program. <br />
          As an Amazon Associate, we may earn from qualifying purchases at no additional cost to you.
        </p>
      </footer>
    </div>
  );
};

export default ChickenSoup;
