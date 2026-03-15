import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'classic' | 'lemonherb' | 'garlic' | 'thighs';

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
    title: 'Classic Roast Chicken',
    description: 'Golden-skinned, juicy whole roast chicken with a simple seasoning rub — a timeless Sunday dinner that feeds the whole family.',
    time: '1 hr 30 min',
    servings: '4 servings',
    ingredients: [
      '1 whole chicken (3.5–4.5 lbs)',
      '3 tbsp olive oil',
      '1 tsp garlic powder',
      '1 tsp onion powder',
      '1 tsp smoked paprika',
      '1 tsp dried thyme',
      '1 tsp salt',
      '½ tsp black pepper',
      '1 head garlic, halved crosswise',
      '1 onion, quartered (for cavity)',
      'A few sprigs fresh thyme or rosemary',
    ],
    instructions: [
      'Preheat oven to 425°F (220°C). Remove giblets and pat chicken dry inside and out with paper towels — this is key for crispy skin.',
      'Mix olive oil, garlic powder, onion powder, paprika, thyme, salt, and pepper into a paste.',
      'Rub the mixture all over the outside of the chicken and carefully work some under the breast skin.',
      'Stuff the cavity with the halved garlic head, quartered onion, and herb sprigs.',
      'Tie the legs together with kitchen twine and tuck the wing tips underneath.',
      'Place breast-side up in a cast iron skillet or roasting pan.',
      'Roast 1 hour 15 minutes to 1 hour 30 minutes, until juices run clear and the thigh reads 165°F on an instant-read thermometer.',
      'Rest 10–15 minutes before carving. Spoon the pan drippings over the top.',
    ],
  },
  lemonherb: {
    title: 'Lemon Herb Roast Chicken',
    description: 'Bright, herby roast chicken with lemon and fresh herbs — fragrant, light, and deeply flavorful.',
    time: '1 hr 30 min',
    servings: '4 servings',
    ingredients: [
      '1 whole chicken (3.5–4.5 lbs)',
      '3 tbsp olive oil',
      '2 lemons — 1 zested and juiced, 1 sliced for cavity',
      '4 cloves garlic, minced',
      '1 tbsp fresh rosemary, finely minced',
      '1 tbsp fresh thyme leaves',
      '1 tbsp fresh parsley, finely chopped',
      '1 tsp salt',
      '½ tsp black pepper',
      '1 small onion, quartered',
    ],
    instructions: [
      'Preheat oven to 425°F. Pat chicken completely dry.',
      'Mix olive oil, lemon zest, lemon juice, garlic, rosemary, thyme, parsley, salt, and pepper.',
      'Rub mixture generously all over the chicken, including under the breast skin and inside the cavity.',
      'Stuff the cavity with lemon slices and quartered onion.',
      'Tie legs together, tuck wing tips under.',
      'Place breast-side up in a roasting pan.',
      'Roast 1 hour 15 minutes to 1 hour 30 minutes until thigh reads 165°F.',
      'Rest 10 minutes before carving. Squeeze a fresh lemon half over the finished bird.',
    ],
  },
  garlic: {
    title: 'Garlic Roast Chicken',
    description: 'Bold, deeply savory roast chicken with a generous garlic crust and crispy golden skin.',
    time: '1 hr 30 min',
    servings: '4 servings',
    ingredients: [
      '1 whole chicken (3.5–4.5 lbs)',
      '3 tbsp olive oil',
      '8 cloves garlic, finely minced',
      '1 tsp garlic powder',
      '1 tsp smoked paprika',
      '1 tsp dried oregano',
      '½ tsp dried thyme',
      'Juice of ½ lemon',
      '1 tsp salt',
      '½ tsp black pepper',
      '1 whole head garlic, top ¼ cut off (for cavity)',
    ],
    instructions: [
      'Preheat oven to 425°F. Pat chicken thoroughly dry.',
      'Mix olive oil, minced garlic, garlic powder, paprika, oregano, thyme, lemon juice, salt, and pepper.',
      'Rub the mixture all over the chicken and under the breast skin, pressing firmly.',
      'Place whole garlic head (cut side up) inside the cavity.',
      'Place breast-side up in a roasting pan or cast iron skillet.',
      'Roast 1 hour 15 min to 1 hour 30 min, until thigh reads 165°F.',
      'Rest 10 minutes before carving.',
      'Squeeze the roasted garlic cloves out of their skins and spread over the chicken as you serve.',
    ],
  },
  thighs: {
    title: 'Roast Chicken Thighs',
    description: 'Crispy-skinned, juicy bone-in chicken thighs oven-roasted to perfection — faster than a whole bird, just as satisfying.',
    time: '45 min',
    servings: '4 servings',
    ingredients: [
      '6 bone-in, skin-on chicken thighs (about 3 lbs)',
      '2 tbsp olive oil',
      '1 tsp garlic powder',
      '1 tsp onion powder',
      '1 tsp smoked paprika',
      '½ tsp dried thyme',
      '½ tsp dried oregano',
      '1 tsp salt',
      '½ tsp black pepper',
      'Juice of 1 lemon',
    ],
    instructions: [
      'Preheat oven to 425°F.',
      'Pat chicken thighs completely dry with paper towels.',
      'Mix olive oil with all spices. Rub all over thighs, including under the skin.',
      'Place skin-side up in a single layer in a baking dish or cast iron skillet — do not crowd.',
      'Roast 35–45 minutes until skin is deep golden and crispy and thigh reads 165°F.',
      'Squeeze lemon over the finished thighs before serving.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'classic', label: 'Classic Roast Chicken' },
  { key: 'lemonherb', label: 'Lemon Herb' },
  { key: 'garlic', label: 'Garlic Roast Chicken' },
  { key: 'thighs', label: 'Roast Chicken Thighs' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const RoastChicken: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('classic');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Roast Chicken Recipes | PantryPivot';
    const PAGE_DESC = 'Perfect roast chicken recipes — classic, lemon herb, garlic, and easy roast chicken thighs. Meat-only, no dairy.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/roast-chicken';
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
      "name": "Roast Chicken",
      "description": "Perfect roast chicken recipes — classic, lemon herb, garlic, and easy roast chicken thighs. Meat-only, no dairy.",
      "image": "https://pantrypivot.com/og-image.png",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT90M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "roast chicken, whole roast chicken, easy roast chicken",
      "url": "https://pantrypivot.com/recipes/roast-chicken",
      "recipeIngredient": [
        "1 whole chicken (3.5\u20134.5 lbs)",
        "3 tbsp olive oil",
        "1 tsp garlic powder",
        "1 tsp onion powder",
        "1 tsp smoked paprika"
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Preheat oven to 425°F (220°C). Remove giblets and pat chicken dry inside and out with paper towels — this is key for crispy skin." },
        { "@type": "HowToStep", "text": "Mix olive oil, garlic powder, onion powder, paprika, thyme, salt, and pepper into a paste." },
        { "@type": "HowToStep", "text": "Rub the mixture all over the outside of the chicken and carefully work some under the breast skin." },
        { "@type": "HowToStep", "text": "Stuff the cavity with the halved garlic head, quartered onion, and herb sprigs." },
        { "@type": "HowToStep", "text": "Tie the legs together with kitchen twine and tuck the wing tips underneath." },
        { "@type": "HowToStep", "text": "Place breast-side up in a cast iron skillet or roasting pan." },
        { "@type": "HowToStep", "text": "Roast 1 hour 15 minutes to 1 hour 30 minutes, until juices run clear and the thigh reads 165°F on an instant-read thermometer." },
        { "@type": "HowToStep", "text": "Rest 10–15 minutes before carving. Spoon the pan drippings over the top." }
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
            <li className="text-slate-600 font-medium">Roast Chicken</li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Roast Chicken Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Golden-skinned, juicy roast chicken for every occasion — whole bird or thighs, simple or herb-packed.
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
            Shop Roasting Pans on Amazon →
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
          <Link to="/recipes/instant-pot-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Instant Pot Chicken</Link>
          <Link to="/recipes/beef-stew" className="text-slate-500 hover:text-orange-600 transition-colors">Beef Stew</Link>
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

export default RoastChicken;
