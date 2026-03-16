import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'classic' | 'spicy' | 'green' | 'chickpea';

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
    title: 'Classic Shakshuka',
    description: 'Eggs poached in a rich, spiced tomato and pepper sauce — a classic Middle Eastern one-pan dish that is quick, satisfying, and fully pareve.',
    time: '30 min',
    servings: '4 servings',
    ingredients: [
      '6 large eggs',
      '1 can (28 oz) crushed tomatoes',
      '1 medium onion, diced',
      '1 red bell pepper, diced',
      '4 cloves garlic, minced',
      '2 tbsp olive oil',
      '1 tsp cumin',
      '1 tsp smoked paprika',
      '½ tsp ground coriander',
      '¼ tsp cayenne pepper (optional)',
      '1 tsp salt',
      '½ tsp black pepper',
      'Fresh parsley or cilantro for garnish',
    ],
    instructions: [
      'Heat olive oil in a large skillet over medium heat.',
      'Add onion and bell pepper. Cook 5–6 minutes until softened.',
      'Add garlic, cumin, paprika, coriander, cayenne, salt, and black pepper. Cook 1 minute until fragrant.',
      'Pour in crushed tomatoes. Stir to combine and bring to a simmer.',
      'Cook sauce 8–10 minutes, stirring occasionally, until slightly thickened.',
      'Taste and adjust seasoning. Use a spoon to make 6 wells in the sauce.',
      'Crack one egg into each well. Cover the skillet and cook 6–8 minutes until whites are set but yolks are still runny (cook longer for firm yolks).',
      'Garnish with fresh herbs and serve directly from the pan.',
    ],
  },
  spicy: {
    title: 'Spicy Shakshuka',
    description: 'A fiery, bold shakshuka with harissa and chili for those who love the heat — deeply smoky and vibrant.',
    time: '30 min',
    servings: '4 servings',
    ingredients: [
      '6 large eggs',
      '1 can (28 oz) crushed tomatoes',
      '1 medium onion, diced',
      '1 jalapeño or serrano pepper, finely minced',
      '4 cloves garlic, minced',
      '2 tbsp harissa paste',
      '2 tbsp olive oil',
      '1 tsp cumin',
      '1 tsp smoked paprika',
      '½ tsp crushed red pepper flakes',
      '1 tsp salt',
      'Fresh cilantro for garnish',
      'Lemon wedges for serving',
    ],
    instructions: [
      'Heat olive oil in a large skillet over medium heat.',
      'Add onion and jalapeño. Cook 5 minutes until softened.',
      'Add garlic, harissa, cumin, paprika, and red pepper flakes. Cook 1 minute.',
      'Pour in crushed tomatoes. Stir and simmer 10 minutes until thickened.',
      'Taste and adjust heat level with more harissa or pepper flakes if desired.',
      'Make 6 wells in the sauce. Crack one egg into each.',
      'Cover and cook 6–8 minutes until whites are set.',
      'Garnish with cilantro. Serve with lemon wedges.',
    ],
  },
  green: {
    title: 'Green Shakshuka',
    description: 'A vibrant green shakshuka with spinach, zucchini, and fresh herbs — lighter than the classic but just as satisfying.',
    time: '25 min',
    servings: '4 servings',
    ingredients: [
      '6 large eggs',
      '4 cups fresh spinach or kale, roughly chopped',
      '2 medium zucchinis, diced',
      '1 medium onion, diced',
      '1 green bell pepper, diced',
      '4 cloves garlic, minced',
      '½ cup vegetable broth or water',
      '2 tbsp olive oil',
      '1 tsp cumin',
      '½ tsp ground coriander',
      '1 tsp salt',
      '½ tsp black pepper',
      'Fresh parsley and lemon wedges for serving',
    ],
    instructions: [
      'Heat olive oil in a large skillet over medium heat.',
      'Add onion and green bell pepper. Cook 4 minutes until softened.',
      'Add garlic and zucchini. Cook 3 minutes.',
      'Stir in cumin, coriander, salt, and pepper. Cook 30 seconds.',
      'Add spinach and vegetable broth. Cook 2–3 minutes, stirring, until spinach is wilted and mixture is combined.',
      'Make 6 wells in the greens. Crack one egg into each.',
      'Cover and cook 6–8 minutes until whites are set.',
      'Serve with a squeeze of lemon and fresh parsley.',
    ],
  },
  chickpea: {
    title: 'Shakshuka with Chickpeas',
    description: 'Protein-rich shakshuka with chickpeas in a hearty spiced tomato sauce — a complete, filling pareve meal.',
    time: '30 min',
    servings: '4 servings',
    ingredients: [
      '6 large eggs',
      '1 can (15 oz) chickpeas, drained and rinsed',
      '1 can (28 oz) crushed tomatoes',
      '1 medium onion, diced',
      '1 red bell pepper, diced',
      '4 cloves garlic, minced',
      '2 tbsp olive oil',
      '1 tsp cumin',
      '1 tsp smoked paprika',
      '½ tsp turmeric',
      '½ tsp ground coriander',
      '1 tsp salt',
      '½ tsp black pepper',
      'Fresh parsley for garnish',
    ],
    instructions: [
      'Heat olive oil in a large skillet over medium heat.',
      'Add onion and red bell pepper. Cook 5–6 minutes until softened.',
      'Add garlic, cumin, paprika, turmeric, and coriander. Cook 1 minute until fragrant.',
      'Add crushed tomatoes and chickpeas. Stir to combine.',
      'Simmer 10 minutes until sauce is thickened and chickpeas have absorbed the flavors.',
      'Taste and adjust seasoning.',
      'Make 6 wells in the sauce. Crack one egg into each. Cover and cook 6–8 minutes until whites are set.',
      'Garnish with fresh parsley and serve hot.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'classic', label: 'Classic Shakshuka' },
  { key: 'spicy', label: 'Spicy Shakshuka' },
  { key: 'green', label: 'Green Shakshuka' },
  { key: 'chickpea', label: 'Shakshuka with Chickpeas' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const Shakshuka: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('classic');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Shakshuka Recipes (Easy 30-Minute Pareve Meal) | PantryPivot';
    const PAGE_DESC = 'Easy shakshuka recipes — classic, spicy, green, and with chickpeas. All pareve, no meat, no dairy. Ready in 30 minutes.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/shakshuka';
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
      "name": "Classic Shakshuka",
      "description": "Easy shakshuka recipes — classic, spicy, green, and with chickpeas. All pareve, no meat, no dairy. Ready in 30 minutes.",
      "image": "https://images.pexels.com/photos/5409023/pexels-photo-5409023.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT30M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "Middle Eastern",
      "keywords": "shakshuka, easy shakshuka, shakshuka recipe, eggs in tomato sauce",
      "url": "https://pantrypivot.com/recipes/shakshuka",
      "recipeIngredient": [
        "6 large eggs",
        "1 can (28 oz) crushed tomatoes",
        "1 medium onion, diced",
        "1 red bell pepper, diced",
        "4 cloves garlic, minced"
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Heat olive oil in a large skillet over medium heat." },
        { "@type": "HowToStep", "text": "Add onion and bell pepper. Cook 5–6 minutes until softened." },
        { "@type": "HowToStep", "text": "Add garlic, cumin, paprika, coriander, cayenne, salt, and black pepper. Cook 1 minute until fragrant." },
        { "@type": "HowToStep", "text": "Pour in crushed tomatoes. Stir to combine and bring to a simmer." },
        { "@type": "HowToStep", "text": "Cook sauce 8–10 minutes, stirring occasionally, until slightly thickened." },
        { "@type": "HowToStep", "text": "Taste and adjust seasoning. Use a spoon to make 6 wells in the sauce." },
        { "@type": "HowToStep", "text": "Crack one egg into each well. Cover the skillet and cook 6–8 minutes until whites are set but yolks are still runny (cook longer for firm yolks)." },
        { "@type": "HowToStep", "text": "Garnish with fresh herbs and serve directly from the pan." }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById('recipe-schema');
      if (el) el.remove();
    };
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Is shakshuka kosher?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — shakshuka is a pareve dish (eggs and vegetables, no meat or dairy). It can be served at both meat and dairy meals. If you add cheese on top, it becomes dairy. All the standard versions on this page are strictly pareve." } },
        { "@type": "Question", "name": "Can I make shakshuka ahead of time?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — make the tomato sauce ahead (up to 3 days in advance) and refrigerate it. When ready to serve, reheat the sauce, make the wells, and add fresh eggs. The sauce improves overnight as the flavors meld." } },
        { "@type": "Question", "name": "What do you serve with shakshuka?", "acceptedAnswer": { "@type": "Answer", "text": "Shakshuka is traditionally served with bread for dipping — pita, challah, or crusty sourdough. For a Passover-friendly option, serve with matzo. It also pairs well with Israeli salad, hummus, or roasted vegetables." } },
        { "@type": "Question", "name": "Can shakshuka be frozen?", "acceptedAnswer": { "@type": "Answer", "text": "Freeze the tomato sauce only — not with eggs cooked in. The sauce freezes well for up to 3 months. Thaw overnight in the fridge, reheat, and add fresh eggs when serving." } }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById('faq-schema');
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
            <li className="text-slate-600 font-medium">Shakshuka</li>
          </ol>
        </nav>

        {/* Table of Contents */}
        <nav className="mb-8 overflow-x-auto">
          <div className="flex gap-2 text-sm font-semibold text-slate-500 whitespace-nowrap pb-1">
            <span className="text-slate-400 text-xs uppercase tracking-wider self-center">Jump to:</span>
            <a href="#recipe-ideas" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-orange-300 hover:text-orange-600 transition-colors">Recipes</a>
            <a href="#cooking-tips" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-orange-300 hover:text-orange-600 transition-colors">Cooking Tips</a>
            <a href="#substitutions" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-orange-300 hover:text-orange-600 transition-colors">Substitutions</a>
            <a href="#faq" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-orange-300 hover:text-orange-600 transition-colors">FAQ</a>
            <a href="https://pantrypivot.com" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-orange-300 hover:text-orange-600 transition-colors">✨ Custom Recipe</a>
          </div>
        </nav>

        <div className="text-center mb-10">
          <span className="inline-block bg-green-100 text-green-700 font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">✅ Pareve</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Shakshuka Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Eggs poached in spiced tomato sauce — easy, pareve one-pan meals ready in 30 minutes.
          </p>
        </div>

        {/* Tabs */}
        <div id="recipe-ideas" className="flex gap-2 flex-wrap justify-center mb-8">
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

        {/* Cooking Tips */}
        <div id="cooking-tips" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mt-10">
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">Cooking Tips</h2>
          <ul className="space-y-3">
            {[
              "Simmer the tomato sauce until it's thick and reduced before adding eggs. A thin, watery sauce means the egg whites won't set properly — they'll float rather than poach.",
              "Cover the pan after adding eggs. The trapped steam is what sets the egg whites from the top while the yolks stay runny below.",
              "Use a lid that fits tightly. If your lid doesn't fit, cover tightly with foil.",
              "Timing for the eggs: 6 minutes covered = runny yolks; 8 minutes = jammy yolks; 10 minutes = fully set. Check at 6 minutes and decide.",
              "Serve shakshuka directly from the pan — it looks dramatic and stays warm longer. Take it straight to the table.",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-orange-400 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Substitutions */}
        <div id="substitutions" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mt-6">
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">Substitutions</h2>
          <ul className="space-y-3">
            {[
              "Crushed tomatoes ↔ whole canned tomatoes: Crush whole tomatoes by hand directly into the pan for a more rustic, chunky texture.",
              "Cumin ↔ ras el hanout: This North African spice blend is traditional in some shakshuka recipes and adds complex warmth.",
              "Harissa ↔ sriracha + ½ tsp cumin: A reasonable substitute for harissa's smoky heat, though not identical.",
              "Red bell pepper ↔ roasted red peppers (from a jar): Drain well and add with the garlic. Saves sautéing time.",
              "Fresh herbs (parsley/cilantro) ↔ dried: Use dried sparingly — fresh herbs added at the end are far more impactful here.",
            ].map((sub, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-orange-400 flex-shrink-0" />
                {sub}
              </li>
            ))}
          </ul>
        </div>

        {/* Storage */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mt-6">
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">Storage</h2>
          <ul className="space-y-3">
            {[
              "Fridge: The tomato sauce keeps 4–5 days — don't store with cooked eggs inside.",
              "Freezer: Freeze the sauce only (without eggs) for up to 3 months.",
              "Reheat: Reheat the sauce and add fresh eggs when serving.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-orange-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div id="faq" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mt-6">
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "Is shakshuka kosher?",
                a: "Yes — shakshuka is a pareve dish (eggs and vegetables, no meat or dairy). It can be served at both meat and dairy meals. If you add cheese on top, it becomes dairy. All the standard versions on this page are strictly pareve.",
              },
              {
                q: "Can I make shakshuka ahead of time?",
                a: "Yes — make the tomato sauce ahead (up to 3 days in advance) and refrigerate it. When ready to serve, reheat the sauce, make the wells, and add fresh eggs. The sauce improves overnight as the flavors meld.",
              },
              {
                q: "What do you serve with shakshuka?",
                a: "Shakshuka is traditionally served with bread for dipping — pita, challah, or crusty sourdough. For a Passover-friendly option, serve with matzo. It also pairs well with Israeli salad, hummus, or roasted vegetables.",
              },
              {
                q: "Can shakshuka be frozen?",
                a: "Freeze the tomato sauce only — not with eggs cooked in. The sauce freezes well for up to 3 months. Thaw overnight in the fridge, reheat, and add fresh eggs when serving.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-5">
                <p className="font-bold text-slate-900 mb-2">{item.q}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* More Recipes */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">More Recipes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Link to="/recipes/salmon" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🐟</span> Salmon Recipes
            </Link>
            <Link to="/recipes/easter" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🐣</span> Easter Dinner
            </Link>
            <Link to="/recipes/passover" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍷</span> Passover Recipes
            </Link>
            <Link to="/recipes/ground-turkey" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🦃</span> Ground Turkey
            </Link>
            <Link to="/recipes/ground-turkey-sweet-potato" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍠</span> Turkey & Sweet Potato
            </Link>
            <Link to="/recipes/dairy-free-marry-me-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍗</span> Dairy-Free Marry Me Chicken
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

export default Shakshuka;
