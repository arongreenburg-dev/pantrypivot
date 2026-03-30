import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare const window: Window & { gtag: (...args: unknown[]) => void };

type Tab = 'garlicoil' | 'tomato' | 'pesto' | 'soup';

interface Recipe {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

const recipes: Record<Tab, Recipe> = {
  garlicoil: {
    title: 'Garlic Oil Chicken Pasta (Aglio e Olio Style)',
    description: 'Spaghetti tossed with seared chicken, garlic, olive oil, red pepper flakes, lemon zest, and parsley — restaurant-level simple.',
    time: '25 min',
    servings: '4 servings',
    ingredients: [
      '12 oz spaghetti or linguine',
      '1 lb boneless, skinless chicken breast, cut into strips',
      '6 cloves garlic, thinly sliced',
      '½ cup olive oil',
      '1 tsp red pepper flakes',
      '1 tsp lemon zest',
      '2 tbsp fresh lemon juice',
      '½ cup pasta cooking water',
      '½ tsp salt',
      '¼ tsp black pepper',
      '¼ cup fresh parsley, chopped',
      '1 tbsp olive oil, for the chicken',
    ],
    instructions: [
      'Bring a large pot of heavily salted water to a boil. Cook spaghetti per package directions. Reserve 1 cup pasta water before draining.',
      'Season chicken with salt and pepper. Heat 1 tbsp olive oil in a large skillet over medium-high heat. Sear chicken strips 3–4 minutes per side until cooked through. Remove and rest.',
      'Reduce heat to medium-low. Add ½ cup olive oil and sliced garlic to the same pan. Cook 2–3 minutes, stirring often, until garlic is pale golden — watch carefully, it burns fast.',
      'Add red pepper flakes; cook 30 seconds.',
      'Add drained pasta to the pan. Pour in ½ cup reserved pasta water. Toss vigorously 1–2 minutes until pasta is coated in the silky sauce.',
      'Slice chicken and add back to the pan with lemon zest and lemon juice.',
      'Toss everything together, adding more pasta water if needed for consistency.',
      'Garnish with fresh parsley. Season with salt and pepper. Serve immediately.',
    ],
  },
  tomato: {
    title: 'Chicken Pasta in Tomato Sauce',
    description: 'Penne with pan-seared chicken breast in a quick crushed tomato sauce with garlic, onion, and fresh basil — comfort food made easy.',
    time: '30 min',
    servings: '4 servings',
    ingredients: [
      '12 oz penne or rigatoni',
      '1 lb boneless, skinless chicken breast, diced',
      '1 can (28 oz) crushed tomatoes',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '2 tbsp olive oil',
      '1 tsp dried Italian seasoning',
      '½ tsp smoked paprika',
      '½ tsp salt',
      '¼ tsp black pepper',
      '¼ tsp red pepper flakes',
      '¼ cup fresh basil leaves, torn',
    ],
    instructions: [
      'Cook pasta in heavily salted boiling water per package directions. Reserve ½ cup pasta water. Drain.',
      'Season chicken with salt, pepper, and smoked paprika.',
      'Heat olive oil in a large skillet over medium-high heat. Sear chicken 5–6 minutes until golden and cooked through. Remove.',
      'Add onion; cook 3 minutes. Add garlic and Italian seasoning; cook 1 minute.',
      'Add crushed tomatoes and red pepper flakes. Simmer 10 minutes, stirring occasionally.',
      'Return chicken to the sauce. Add cooked pasta; toss to combine, adding pasta water as needed.',
      'Season with salt and pepper.',
      'Serve topped with fresh basil.',
    ],
  },
  pesto: {
    title: 'Chicken Pasta with Dairy-Free Pesto',
    description: 'Rotini with grilled chicken and dairy-free basil pesto made with basil, garlic, pine nuts, olive oil, and lemon — no parmesan needed.',
    time: '25 min',
    servings: '4 servings',
    ingredients: [
      '12 oz rotini or fusilli',
      '1 lb boneless, skinless chicken breast',
      '2 cups fresh basil leaves, packed',
      '3 cloves garlic',
      '⅓ cup pine nuts (or walnuts)',
      '⅓ cup olive oil, plus more for chicken',
      '2 tbsp fresh lemon juice',
      '½ tsp salt',
      '¼ tsp black pepper',
      '¼ cup pasta cooking water',
      '1 cup cherry tomatoes, halved, for serving',
      '2 tbsp fresh basil, for garnish',
    ],
    instructions: [
      'Cook pasta in heavily salted boiling water per package directions. Reserve ½ cup pasta water. Drain.',
      'Make dairy-free pesto: blend basil, garlic, pine nuts, olive oil, lemon juice, salt, and pepper in a food processor until smooth. Taste and adjust seasoning.',
      'Season chicken with salt, pepper, and a drizzle of olive oil.',
      'Grill or pan-sear chicken 6–7 minutes per side until cooked through (165°F). Rest 5 minutes, then slice.',
      'In a large bowl, toss warm drained pasta with pesto, adding pasta water 1 tbsp at a time to reach desired consistency.',
      'Add sliced chicken; toss to combine.',
      'Top with cherry tomatoes and fresh basil.',
      'Serve immediately or at room temperature.',
    ],
  },
  soup: {
    title: 'Classic Chicken Noodle Soup',
    description: 'Homemade chicken noodle soup with tender chicken breast, egg noodles, carrots, celery, and thyme — the ultimate comfort food.',
    time: '50 min',
    servings: '6 servings',
    ingredients: [
      '1.5 lbs boneless, skinless chicken breast',
      '8 oz egg noodles',
      '3 medium carrots, sliced',
      '3 stalks celery, sliced',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '7 cups chicken broth',
      '1 tsp dried thyme',
      '1 bay leaf',
      '2 tbsp olive oil',
      '½ tsp salt',
      '¼ tsp black pepper',
      '3 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat. Add onion, carrots, and celery; cook 6 minutes until softened.',
      'Add garlic and thyme; cook 1 minute.',
      'Add chicken broth, bay leaf, and whole chicken breasts. Bring to a boil.',
      'Reduce heat to medium-low; simmer 20 minutes until chicken is cooked through.',
      'Remove chicken; shred with two forks. Remove and discard bay leaf.',
      'Bring broth back to a boil. Add egg noodles; cook per package directions (usually 6–8 minutes).',
      'Return shredded chicken to the pot. Season with salt and pepper.',
      'Ladle into bowls and garnish with fresh parsley.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'garlicoil', label: 'Garlic Oil' },
  { key: 'tomato', label: 'Tomato Sauce' },
  { key: 'pesto', label: 'Dairy-Free Pesto' },
  { key: 'soup', label: 'Chicken Noodle Soup' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const ChickenAndPasta: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('garlicoil');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Chicken and Pasta Recipes (Garlic Oil, Tomato, Pesto) | PantryPivot';
    const PAGE_DESC = 'Easy chicken and pasta recipes — garlic olive oil, tomato sauce, pesto, and chicken noodle soup. Dairy-free comfort food in 30 minutes.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/chicken-and-pasta';
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
      "name": "Garlic Oil Chicken Pasta (Aglio e Olio Style)",
      "description": "Spaghetti tossed with seared chicken, garlic, olive oil, red pepper flakes, lemon zest, and parsley — restaurant-level simple.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT5M",
      "cookTime": "PT20M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "Italian-American",
      "keywords": "chicken and pasta, chicken pasta garlic oil, chicken noodle soup, dairy-free pasta, chicken pasta recipe",
      "url": "https://pantrypivot.com/recipes/chicken-and-pasta",
      "recipeIngredient": [
        "12 oz spaghetti or linguine",
        "1 lb boneless, skinless chicken breast",
        "6 cloves garlic, thinly sliced",
        "½ cup olive oil",
        "1 tsp red pepper flakes",
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Cook pasta, reserve 1 cup pasta water before draining." },
        { "@type": "HowToStep", "text": "Sear chicken strips in olive oil until cooked through. Remove." },
        { "@type": "HowToStep", "text": "Cook sliced garlic in olive oil until pale golden. Add pasta and pasta water; toss vigorously." },
        { "@type": "HowToStep", "text": "Add chicken, lemon zest, and parsley. Season and serve." },
      ]
    });
    document.head.appendChild(script);
    return () => { const el = document.getElementById('recipe-schema'); if (el) el.remove(); };
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "How do I make chicken pasta dairy-free?", "acceptedAnswer": { "@type": "Answer", "text": "Use olive oil and reserved pasta water instead of butter and cream. The starchy pasta water creates a silky sauce that coats the pasta. Nutritional yeast can add a cheesy note without dairy." } },
        { "@type": "Question", "name": "How much pasta water should I add to the sauce?", "acceptedAnswer": { "@type": "Answer", "text": "Start with ¼ cup and add more as needed. The pasta water emulsifies with olive oil to create a creamy-looking sauce without any cream." } },
        { "@type": "Question", "name": "Can I use rotisserie chicken for pasta?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — shred and add in the last 2 minutes of cooking. It's a great shortcut that saves 15+ minutes." } },
        { "@type": "Question", "name": "What pasta shapes work best with chicken?", "acceptedAnswer": { "@type": "Answer", "text": "Penne, rigatoni, or rotini for chunky tomato sauces; spaghetti or linguine for garlic oil; egg noodles for soup." } },
      ]
    });
    document.head.appendChild(script);
    return () => { const el = document.getElementById('faq-schema'); if (el) el.remove(); };
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
        <nav aria-label="breadcrumb" className="text-xs text-slate-400 mb-8">
          <ol className="flex items-center gap-1.5">
            <li><a href="https://pantrypivot.com" className="hover:text-orange-500 transition-colors">Home</a></li>
            <li className="text-slate-300">›</li>
            <li>Recipes</li>
            <li className="text-slate-300">›</li>
            <li className="text-slate-600 font-medium">Chicken and Pasta</li>
          </ol>
        </nav>

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
          <span className="inline-block bg-red-100 text-red-700 font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">🥩 Meat</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Chicken and Pasta Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Satisfying chicken pasta dinners — all dairy-free, all ready in 30 minutes.</p>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">What Can I Make With Chicken and Pasta?</h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto text-center mb-8 leading-relaxed">This page contains 4 kosher meat chicken pasta recipes — garlic oil, tomato sauce, pesto-style, and soup. All recipes are dairy-free. Ingredients are simple pantry staples with no specialty items required.</p>

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
              href={AMAZON_LINK} onClick={() => window.gtag('event', 'affiliate_click', { link_url: 'https://amzn.to/40ZcXPs', link_text: 'amazon_fresh' })}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-2xl text-center transition-all shadow-md"
            >
              Order Ingredients on Amazon Fresh
            </a>
            <a
              href={PANTRYPIVOT_LINK} target="_blank" rel="noopener noreferrer"
              className="flex-1 bg-slate-900 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-2xl text-center transition-all shadow-md"
            >
              Generate More Recipes on PantryPivot →
            </a>
            <button
              onClick={() => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
              className="flex-1 border-2 border-slate-200 hover:border-orange-300 text-slate-700 font-bold py-3 px-6 rounded-2xl text-center transition-all"
            >
              {copied ? '✓ Link copied!' : 'Share this recipe'}
            </button>
          </div>
        </div>

        <div id="cooking-tips" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mt-10">
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">Cooking Tips</h2>
          <ul className="space-y-3">
            {[
              'Reserve 1 cup of starchy pasta water before draining — it\'s liquid gold for creating silky, cohesive sauce without dairy.',
              'Finish pasta in the sauce pan (not just poured over) — the pasta absorbs the sauce and becomes one unified dish.',
              'For dairy-free pasta: good olive oil, pasta water, and proper seasoning are all you need for a rich-tasting sauce.',
              'Sear chicken separately and rest before slicing — it keeps juicy and adds texture contrast to the pasta.',
              'Salt pasta water heavily — it should taste like mild seawater. This is your only chance to season the pasta itself.',
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-orange-400 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div id="substitutions" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mt-6">
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">Ingredient Substitutions</h2>
          <ul className="space-y-3">
            {[
              'Spaghetti ↔ any long pasta (linguine, fettuccine): All work for garlic oil pasta.',
              'Pine nuts ↔ walnuts or toasted sunflower seeds: Both work well in dairy-free pesto.',
              'Crushed tomatoes ↔ San Marzano tomatoes (blended): Sweeter and less acidic — worth the upgrade.',
              'Chicken breast ↔ chicken thighs: Thighs have more flavor; dice and cook the same way.',
              'Fresh basil ↔ arugula in pesto: Creates a peppery, slightly bitter pesto that\'s still delicious.',
            ].map((sub, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-orange-400 flex-shrink-0" />
                <span>{sub}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mt-6">
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">Storage &amp; Reheating</h2>
          <ul className="space-y-3">
            {[
              'Refrigerate pasta in an airtight container for 3–4 days.',
              'Pasta firms up when refrigerated — reheat with a splash of water or broth.',
              'Chicken noodle soup keeps 5 days in the fridge; noodles will soften further — add fresh noodles when reheating if you prefer firmer texture.',
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-orange-400 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div id="faq" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mt-6">
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'How do I make chicken pasta dairy-free?', a: 'Use olive oil and reserved pasta water instead of butter and cream. The starchy pasta water creates a silky sauce that coats the pasta. Nutritional yeast can add a cheesy note without dairy.' },
              { q: 'How much pasta water should I add to the sauce?', a: 'Start with ¼ cup and add more as needed. The pasta water emulsifies with olive oil to create a creamy-looking sauce without any cream.' },
              { q: 'Can I use rotisserie chicken for pasta?', a: "Yes — shred and add in the last 2 minutes of cooking. It's a great shortcut that saves 15+ minutes." },
              { q: 'What pasta shapes work best with chicken?', a: 'Penne, rigatoni, or rotini for chunky tomato sauces; spaghetti or linguine for garlic oil; egg noodles for soup.' },
            ].map(({ q, a }, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-5">
                <p className="font-bold text-slate-900 mb-2">{q}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">More Recipes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { to: '/recipes/ground-beef-pasta', label: '🍝 Ground Beef Pasta' },
              { to: '/recipes/chicken-and-rice', label: '🍚 Chicken and Rice' },
              { to: '/recipes/chicken-and-mushrooms', label: '🍄 Chicken and Mushrooms' },
              { to: '/recipes/chicken-and-spinach', label: '🌿 Chicken and Spinach' },
              { to: '/recipes/chicken-soup', label: '🍜 Chicken Soup' },
              { to: '/recipes/crockpot-chicken', label: '🍲 Crockpot Chicken' },
            ].map(({ to, label }) => (
              <Link key={to} to={to} className="bg-white border border-slate-200 rounded-2xl p-4 text-sm font-semibold text-slate-700 hover:border-orange-300 hover:text-orange-600 transition-colors text-center">
                {label}
              </Link>
            ))}
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
          {[
            { to: '/recipes/ground-beef-pasta', label: '🍝 Ground Beef Pasta' },
            { to: '/recipes/chicken-and-rice', label: '🍚 Chicken and Rice' },
            { to: '/recipes/chicken-and-mushrooms', label: '🍄 Chicken and Mushrooms' },
            { to: '/recipes/chicken-and-spinach', label: '🌿 Chicken and Spinach' },
            { to: '/recipes/chicken-soup', label: '🍜 Chicken Soup' },
            { to: '/recipes/crockpot-chicken', label: '🍲 Crockpot Chicken' },
          ].map(({ to, label }) => (
            <Link key={to} to={to} className="text-slate-500 hover:text-orange-600 transition-colors">{label}</Link>
          ))}
        </div>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed text-center">
          Disclosure: PantryPivot participates in the Amazon Associates Program. <br />
          As an Amazon Associate, we may earn from qualifying purchases at no additional cost to you.
        </p>
      </footer>
    </div>
  );
};

export default ChickenAndPasta;
