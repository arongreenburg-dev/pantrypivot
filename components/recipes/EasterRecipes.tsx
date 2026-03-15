import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'lamb' | 'glazedChicken' | 'frittata' | 'rootVeggies';

interface Recipe {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

const recipes: Record<Tab, Recipe> = {
  lamb: {
    title: 'Herb-Crusted Roast Lamb',
    description: 'Bone-in leg of lamb with a rosemary, garlic, and mustard crust — the classic Easter centerpiece. Meat only, no dairy, no pork, no shellfish.',
    time: '2 hrs 15 min',
    servings: '6–8 servings',
    ingredients: [
      '1 bone-in leg of lamb (4–5 lbs)',
      '3 tbsp olive oil',
      '3 tbsp Dijon mustard',
      '6 garlic cloves, minced',
      '2 tbsp fresh rosemary, finely chopped',
      '1 tbsp fresh thyme leaves',
      '1 tsp dried oregano',
      'Zest of 1 lemon',
      '1½ tsp salt',
      '½ tsp black pepper',
      '1 cup chicken or lamb broth (for pan)',
      '1 lemon, sliced (for pan)',
    ],
    instructions: [
      'Remove lamb from the fridge 45 minutes before cooking. Preheat oven to 425°F (220°C).',
      'Score the lamb all over with a small knife and make 10–12 shallow slits. Press a sliver of garlic and a sprig of rosemary into each slit.',
      'Mix olive oil, mustard, minced garlic, rosemary, thyme, oregano, lemon zest, salt, and pepper into a paste. Rub all over the lamb.',
      'Place lamb fat-side up in a roasting pan. Scatter lemon slices around the pan and add broth to the bottom.',
      'Roast at 425°F for 20 minutes to brown the crust, then reduce heat to 350°F (175°C).',
      'Continue roasting 1 hour 15 minutes to 1 hour 30 minutes for medium (145°F internal) — longer for well done.',
      'Transfer lamb to a board, tent with foil, and rest 20 minutes before carving. Serve with pan juices.',
    ],
  },
  glazedChicken: {
    title: 'Honey Glazed Easter Chicken',
    description: 'Juicy roasted chicken pieces with a honey-lemon glaze and fresh herbs — a family-friendly Easter dinner. Meat only, no dairy.',
    time: '1 hr',
    servings: '4–6 servings',
    ingredients: [
      '3 lbs bone-in, skin-on chicken pieces (thighs, drumsticks, or breasts)',
      '3 tbsp honey',
      '2 tbsp olive oil',
      '3 tbsp fresh lemon juice (about 1 large lemon)',
      '1 tsp lemon zest',
      '4 garlic cloves, minced',
      '1 tbsp fresh thyme leaves (or 1 tsp dried)',
      '1 tbsp fresh rosemary, minced (or 1 tsp dried)',
      '1 tsp sweet paprika',
      '1 tsp salt',
      '½ tsp black pepper',
    ],
    instructions: [
      'Preheat oven to 425°F (220°C). Pat chicken pieces completely dry with paper towels.',
      'Whisk together honey, olive oil, lemon juice, lemon zest, garlic, thyme, rosemary, paprika, salt, and pepper.',
      'Arrange chicken skin-side up in a single layer in a large baking dish. Pour glaze over and under the skin.',
      'Roast 40–50 minutes, basting with pan juices halfway through, until skin is deep golden and an instant-read thermometer reads 165°F.',
      'If glaze is browning too fast before chicken is cooked, tent loosely with foil.',
      'Rest 5 minutes before serving. Spoon pan juices generously over the chicken.',
    ],
  },
  frittata: {
    title: 'Spring Vegetable Frittata',
    description: 'A light, golden frittata packed with spring vegetables — asparagus, leeks, and bell peppers. Pareve: eggs and vegetables only, no dairy.',
    time: '35 min',
    servings: '4–6 servings',
    ingredients: [
      '8 large eggs',
      '3 tbsp olive oil, divided',
      '1 bunch asparagus, woody ends snapped off, cut into 1-inch pieces',
      '1 large leek, white and light green parts, thinly sliced',
      '1 red bell pepper, diced',
      '1 cup frozen peas, thawed',
      '3 garlic cloves, minced',
      '2 tbsp fresh parsley, chopped',
      '1 tbsp fresh dill or chives, chopped',
      '1 tsp salt',
      '½ tsp black pepper',
      '¼ tsp red pepper flakes (optional)',
    ],
    instructions: [
      'Preheat oven to 375°F (190°C). Whisk eggs with ½ tsp salt, ¼ tsp black pepper, parsley, and dill in a large bowl. Set aside.',
      'Heat 2 tbsp olive oil in a 10-inch oven-safe skillet over medium heat. Add leek and bell pepper; sauté 5 minutes until softened.',
      'Add garlic and asparagus; cook 3 minutes more until asparagus is bright green. Stir in peas and red pepper flakes.',
      'Spread vegetables evenly across the pan. Season lightly with remaining salt.',
      'Drizzle remaining 1 tbsp olive oil around the edges of the pan. Pour egg mixture evenly over the vegetables.',
      'Cook on the stovetop over medium-low heat for 3–4 minutes until edges are just set.',
      'Transfer to oven and bake 12–15 minutes until the center is puffed and set. Cool 5 minutes before slicing into wedges.',
    ],
  },
  rootVeggies: {
    title: 'Honey-Roasted Root Vegetables',
    description: 'A colorful medley of carrots, parsnips, beets, and potatoes roasted with honey and herbs — a simple, beautiful Easter side. Pareve.',
    time: '55 min',
    servings: '6 servings',
    ingredients: [
      '3 large carrots, cut into 2-inch pieces',
      '3 parsnips, cut into 2-inch pieces',
      '3 medium beets, peeled and cut into wedges',
      '1 lb baby potatoes, halved',
      '1 large red onion, cut into wedges',
      '3 tbsp olive oil',
      '2 tbsp honey',
      '1 tbsp fresh thyme leaves',
      '1 tsp fresh rosemary, minced',
      '1 tsp salt',
      '½ tsp black pepper',
      'Fresh parsley, for garnish',
    ],
    instructions: [
      'Preheat oven to 425°F (220°C). Line a large rimmed baking sheet (or two) with parchment paper.',
      'Note: if using beets, keep them separate from other vegetables to prevent bleeding — roast on one side of the pan.',
      'Toss carrots, parsnips, potatoes, and onion with 2 tbsp olive oil, honey, thyme, rosemary, ½ tsp salt, and ¼ tsp pepper. Spread in a single layer.',
      'Toss beets separately with remaining 1 tbsp olive oil, remaining salt and pepper. Place on the sheet without touching the other vegetables.',
      'Roast 40–45 minutes, flipping once halfway through, until all vegetables are tender and caramelized at the edges.',
      'Garnish with fresh parsley and a drizzle of honey just before serving.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'lamb',        label: 'Roast Lamb' },
  { key: 'glazedChicken', label: 'Honey Glazed Chicken' },
  { key: 'frittata',   label: 'Spring Frittata' },
  { key: 'rootVeggies', label: 'Roasted Root Vegetables' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';
const HERO_IMAGE = 'https://images.pexels.com/photos/29908554/pexels-photo-29908554.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

const EasterRecipes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('lamb');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Easter Dinner Recipes | PantryPivot';
    const PAGE_DESC = 'Easy Easter dinner recipes — roast lamb, glazed chicken, spring frittata, and roasted vegetables. Simple meals for the whole family.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/easter';
    document.title = PAGE_TITLE;
    const update = (sel: string, attr: string, val: string): string => {
      const el = document.querySelector(sel);
      const prev = el ? (el.getAttribute(attr) ?? '') : '';
      if (el) el.setAttribute(attr, val);
      return prev;
    };
    const prevDesc    = update('meta[name="description"]',       'content', PAGE_DESC);
    const prevOgTitle = update('meta[property="og:title"]',      'content', PAGE_TITLE);
    const prevOgDesc  = update('meta[property="og:description"]','content', PAGE_DESC);
    const prevOgUrl   = update('meta[property="og:url"]',        'content', PAGE_URL);
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
      update('meta[name="description"]',       'content', prevDesc);
      update('meta[property="og:title"]',      'content', prevOgTitle);
      update('meta[property="og:description"]','content', prevOgDesc);
      update('meta[property="og:url"]',        'content', prevOgUrl);
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
      "name": "Herb-Crusted Roast Lamb",
      "description": "Bone-in leg of lamb with a rosemary, garlic, and mustard crust — the classic Easter centerpiece. No pork, no shellfish, no dairy.",
      "image": HERO_IMAGE,
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT15M",
      "cookTime": "PT120M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "easter dinner, roast lamb, honey glazed chicken, spring frittata, easter recipes",
      "url": "https://pantrypivot.com/recipes/easter",
      "recipeIngredient": [
        "1 bone-in leg of lamb (4–5 lbs)",
        "3 tbsp olive oil",
        "3 tbsp Dijon mustard",
        "6 garlic cloves, minced",
        "2 tbsp fresh rosemary",
        "1 tbsp fresh thyme",
      ],
      "recipeYield": "6–8 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Remove lamb from fridge 45 minutes before cooking. Preheat oven to 425°F." },
        { "@type": "HowToStep", "text": "Score the lamb and press garlic and rosemary into slits." },
        { "@type": "HowToStep", "text": "Rub herb-mustard paste all over the lamb." },
        { "@type": "HowToStep", "text": "Roast at 425°F for 20 minutes, then reduce to 350°F for 1½ hours." },
        { "@type": "HowToStep", "text": "Rest 20 minutes before carving." },
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
            <li className="text-slate-600 font-medium">Easter Dinner</li>
          </ol>
        </nav>

        {/* Hero Image */}
        <div className="mb-8 rounded-2xl overflow-hidden">
          <img
            src={HERO_IMAGE}
            alt="Easter roast lamb dinner"
            width={800}
            height={500}
            loading="lazy"
            fetchPriority="high"
            className="w-full object-cover rounded-2xl"
          />
          <p className="text-xs text-slate-400 text-center mt-1">Photo by Snappr via Pexels</p>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Easter Dinner Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Simple, crowd-pleasing Easter meals — roast lamb, honey glazed chicken, a fresh spring frittata, and honey-roasted root vegetables.
          </p>
        </div>

        {/* Amazon CTA */}
        <div className="text-center mb-6">
          <a
            href={AMAZON_LINK}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-colors text-sm"
          >
            Shop Easter Ingredients on Amazon Fresh →
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
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                  : 'border-slate-200 text-slate-600 bg-white hover:border-emerald-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Recipe Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-emerald-50 border-b border-emerald-100 px-8 py-6">
            <h2 className="text-2xl font-black text-slate-900 mb-1">{recipe.title}</h2>
            <p className="text-slate-500 mb-4">{recipe.description}</p>
            <div className="flex gap-4 text-sm font-semibold text-slate-600">
              <span>⏱ {recipe.time}</span>
              <span>👥 {recipe.servings}</span>
            </div>
          </div>

          <div className="p-8 grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-sm font-black text-emerald-700 uppercase tracking-wide mb-4">
                Ingredients
              </h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black text-emerald-700 uppercase tracking-wide mb-4">
                Instructions
              </h3>
              <ol className="space-y-4">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center mt-0.5">
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
              className="flex-1 border-2 border-slate-200 hover:border-emerald-300 text-slate-700 font-bold py-3 px-6 rounded-2xl text-center transition-all"
            >
              {copied ? '✓ Link copied!' : 'Share this recipe'}
            </button>
          </div>
        </div>

        {/* More Recipes */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">More Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/recipes/passover" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍷</span> Passover Recipes
            </Link>
            <Link to="/recipes/roast-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍗</span> Roast Chicken
            </Link>
            <Link to="/recipes/shakshuka" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍳</span> Shakshuka
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
          <Link to="/recipes/roast-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Roast Chicken</Link>
          <Link to="/recipes/salmon" className="text-slate-500 hover:text-orange-600 transition-colors">Salmon Recipes</Link>
          <Link to="/recipes/chicken-and-rice" className="text-slate-500 hover:text-orange-600 transition-colors">Chicken and Rice</Link>
          <Link to="/recipes/beef-stew" className="text-slate-500 hover:text-orange-600 transition-colors">Beef Stew</Link>
          <Link to="/recipes/chicken-soup" className="text-slate-500 hover:text-orange-600 transition-colors">Chicken Soup</Link>
          <Link to="/recipes/shakshuka" className="text-slate-500 hover:text-orange-600 transition-colors">Shakshuka</Link>
          <Link to="/recipes/passover" className="text-slate-500 hover:text-orange-600 transition-colors">Passover Recipes</Link>
        </div>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed text-center">
          Disclosure: PantryPivot participates in the Amazon Associates Program. <br />
          As an Amazon Associate, we may earn from qualifying purchases at no additional cost to you.
        </p>
      </footer>
    </div>
  );
};

export default EasterRecipes;
