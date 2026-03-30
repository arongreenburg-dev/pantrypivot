import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare const window: Window & { gtag: (...args: unknown[]) => void };

type Tab = 'skillet' | 'hash' | 'soup' | 'stuffed';

interface Recipe {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

const recipes: Record<Tab, Recipe> = {
  skillet: {
    title: 'Ground Beef and Potato Skillet',
    description: 'Ground beef with diced potatoes, onion, garlic, smoked paprika, and Worcestershire — a hearty one-pan dinner.',
    time: '30 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground beef (85/15)',
      '1.5 lbs Yukon Gold potatoes, cut into ¾-inch cubes',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '1 tbsp Worcestershire sauce',
      '1 tsp smoked paprika',
      '½ tsp cumin',
      '½ tsp garlic powder',
      '½ tsp salt',
      '¼ tsp black pepper',
      '2 tbsp olive oil',
      '2 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'Parboil diced potatoes in salted boiling water for 5 minutes until just starting to soften. Drain and pat dry.',
      'Heat 1 tbsp olive oil in a large skillet over medium-high heat. Add ground beef and cook, breaking it up, 6–7 minutes until browned. Drain excess fat.',
      'Push beef to one side. Add remaining olive oil and onion; cook 3 minutes until softened.',
      'Add parboiled potatoes; press into the pan and cook undisturbed 3 minutes to develop a golden crust.',
      'Stir everything together. Add garlic, smoked paprika, cumin, and garlic powder; cook 1 minute.',
      'Add Worcestershire sauce; stir to combine. Season with salt and pepper to taste.',
      'Cook 5 more minutes, stirring occasionally, until potatoes are fully tender and everything is golden.',
      'Garnish with fresh parsley and serve hot.',
    ],
  },
  hash: {
    title: 'Ground Beef Breakfast Hash',
    description: 'Savory ground beef potato hash with onion, bell pepper, and garlic — a satisfying meal any time of day.',
    time: '25 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground beef (85/15)',
      '1.5 lbs russet potatoes, cut into ½-inch cubes',
      '1 medium onion, diced',
      '1 red bell pepper, diced',
      '4 cloves garlic, minced',
      '1 tsp smoked paprika',
      '½ tsp cumin',
      '½ tsp salt',
      '¼ tsp black pepper',
      '2 tbsp olive oil',
      '1 tbsp Worcestershire sauce',
      '2 tbsp fresh chives or parsley, chopped',
    ],
    instructions: [
      'Microwave diced potatoes with 2 tbsp water, covered, for 4 minutes to jump-start cooking. Drain and pat dry.',
      'Heat 1 tbsp olive oil in a large cast iron or non-stick skillet over medium-high heat.',
      'Add ground beef; cook 5–6 minutes, breaking up, until browned. Drain excess fat. Remove and set aside.',
      'Add remaining olive oil to the pan. Add potatoes and cook undisturbed 4 minutes until golden on the bottom.',
      'Add onion and bell pepper; cook 3 minutes, stirring occasionally.',
      'Add garlic, smoked paprika, and cumin; cook 1 minute until fragrant.',
      'Return beef to the pan. Add Worcestershire sauce; stir and cook 2 more minutes until everything is combined and heated through.',
      'Season with salt and pepper. Garnish with chives and serve.',
    ],
  },
  soup: {
    title: 'Ground Beef and Potato Soup',
    description: 'Hearty ground beef and potato soup with carrots, celery, and tomatoes — comfort food in 45 minutes.',
    time: '45 min',
    servings: '6 servings',
    ingredients: [
      '1 lb ground beef (85/15)',
      '1.5 lbs russet potatoes, peeled and diced',
      '3 medium carrots, sliced',
      '3 stalks celery, sliced',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '1 can (14 oz) diced tomatoes',
      '4 cups beef broth',
      '1 tsp dried thyme',
      '1 tsp smoked paprika',
      '½ tsp salt',
      '¼ tsp black pepper',
      '2 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'In a large pot over medium-high heat, brown ground beef 6–7 minutes, breaking it up. Drain excess fat.',
      'Add onion and celery to the pot; cook 3 minutes until softened.',
      'Add garlic, thyme, and smoked paprika; cook 1 minute until fragrant.',
      'Add carrots, potatoes, diced tomatoes, and beef broth. Stir to combine.',
      'Bring to a boil, then reduce heat to medium-low. Cover and simmer 20 minutes.',
      'Uncover and simmer 10 more minutes until potatoes are completely tender and soup has thickened slightly.',
      'Season with salt and pepper to taste.',
      'Ladle into bowls and garnish with fresh parsley.',
    ],
  },
  stuffed: {
    title: 'Stuffed Baked Potatoes with Ground Beef',
    description: 'Fluffy baked potatoes stuffed with seasoned ground beef, onion, tomato paste, and garlic — a satisfying complete meal.',
    time: '1 hr',
    servings: '4 servings',
    ingredients: [
      '4 large russet potatoes',
      '1 lb ground beef (85/15)',
      '1 medium onion, finely diced',
      '4 cloves garlic, minced',
      '2 tbsp tomato paste',
      '1 tsp smoked paprika',
      '½ tsp cumin',
      '½ tsp salt',
      '¼ tsp black pepper',
      '1 tbsp Worcestershire sauce',
      '2 tbsp olive oil',
      '2 tbsp fresh parsley or chives, chopped',
    ],
    instructions: [
      'Preheat oven to 400°F. Scrub potatoes and pierce all over with a fork.',
      'Rub potatoes with olive oil and a pinch of salt. Bake directly on the oven rack for 50–60 minutes until tender.',
      'Meanwhile, heat olive oil in a skillet over medium-high heat. Brown ground beef 6–7 minutes. Drain excess fat.',
      'Add onion; cook 3 minutes. Add garlic, smoked paprika, and cumin; cook 1 minute.',
      'Stir in tomato paste and Worcestershire sauce; cook 2 minutes until paste darkens slightly.',
      'Season beef filling with salt and pepper.',
      'Once potatoes are done, slice open lengthwise and fluff the inside with a fork.',
      'Pile seasoned beef filling into each potato. Garnish with parsley and serve immediately.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'skillet', label: 'Beef & Potato Skillet' },
  { key: 'hash', label: 'Breakfast Hash' },
  { key: 'soup', label: 'Soup' },
  { key: 'stuffed', label: 'Stuffed Potatoes' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const GroundBeefAndPotatoes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('skillet');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Ground Beef and Potatoes Recipes (Skillet, Hash, Soup) | PantryPivot';
    const PAGE_DESC = 'Easy ground beef and potatoes recipes — skillet hash, soup, stuffed potatoes, and one-pan dinners. Quick and filling weeknight meals.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/ground-beef-and-potatoes';
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
      "name": "Ground Beef and Potato Skillet",
      "description": "Ground beef with diced potatoes, onion, garlic, smoked paprika, and Worcestershire — a hearty one-pan dinner.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT20M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "ground beef and potatoes, beef potato skillet, ground beef hash, one pan dinner, dairy-free beef",
      "url": "https://pantrypivot.com/recipes/ground-beef-and-potatoes",
      "recipeIngredient": [
        "1 lb ground beef (85/15)",
        "1.5 lbs Yukon Gold potatoes, cut into ¾-inch cubes",
        "1 medium onion, diced",
        "4 cloves garlic, minced",
        "1 tbsp Worcestershire sauce",
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Parboil diced potatoes in salted boiling water for 5 minutes. Drain and pat dry." },
        { "@type": "HowToStep", "text": "Brown ground beef in a skillet over medium-high heat. Drain excess fat." },
        { "@type": "HowToStep", "text": "Add potatoes and cook undisturbed 3 minutes to develop a golden crust." },
        { "@type": "HowToStep", "text": "Add garlic, smoked paprika, cumin, and Worcestershire. Cook 5 more minutes until tender." },
        { "@type": "HowToStep", "text": "Season with salt and pepper. Garnish with parsley and serve." },
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
        { "@type": "Question", "name": "How do I make ground beef and potatoes not greasy?", "acceptedAnswer": { "@type": "Answer", "text": "After browning the beef, tilt the pan and spoon off excess fat, or use 90/10 lean ground beef." } },
        { "@type": "Question", "name": "Can I make this without pre-cooking the potatoes?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, dice them small (½-inch) and add a splash of water to the skillet; cover and cook 10 minutes to steam through before uncovering to crisp." } },
        { "@type": "Question", "name": "What spices work best with ground beef and potatoes?", "acceptedAnswer": { "@type": "Answer", "text": "Smoked paprika, garlic powder, onion powder, cumin, and Worcestershire sauce are the classic combo. Chili powder adds heat." } },
        { "@type": "Question", "name": "Can I use sweet potatoes instead?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — sweet potatoes add natural sweetness that balances savory beef. They cook slightly faster, so check at 7–8 minutes." } },
      ]
    });
    document.head.appendChild(script);
    return () => { const el = document.getElementById('faq-schema'); if (el) el.remove(); };
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'page-recipe-schema';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Recipe",
      "name": "Ground Beef and Potatoes Recipes",
      "description": "Four kosher meat ground beef and potato recipes — skillet, hash, hearty soup, and stuffed potatoes.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "ground beef potatoes, kosher beef dinner, dairy-free ground beef, skillet dinner, stuffed baked potato",
      "suitableForDiet": "https://schema.org/KosherDiet",
      "recipeIngredient": [
        "1 lb ground beef",
        "1.5 lbs potatoes, diced or whole",
        "1 medium onion, diced",
        "3 cloves garlic, minced",
        "2 tbsp olive oil",
        "1 tsp smoked paprika",
        "salt and black pepper"
      ],
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Dice potatoes and parboil 8 minutes until just tender. Drain well." },
        { "@type": "HowToStep", "text": "Brown ground beef in olive oil, breaking apart, until cooked through. Drain excess fat. Add onion and garlic, cook 3 minutes." },
        { "@type": "HowToStep", "text": "Add parboiled potatoes to the skillet. Cook undisturbed 3–4 minutes until potatoes develop a crust. Season and serve." }
      ],
      "prepTime": "PT15M",
      "cookTime": "PT35M",
      "recipeYield": "4 servings"
    });
    document.head.appendChild(script);
    return () => { const el = document.getElementById('page-recipe-schema'); if (el) el.remove(); };
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
            <li className="text-slate-600 font-medium">Ground Beef and Potatoes</li>
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
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Ground Beef and Potatoes Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Hearty, filling ground beef and potato dinners — simple ingredients, big flavor.</p>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">What Can I Make With Ground Beef and Potatoes?</h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto text-center mb-8 leading-relaxed">This page contains 4 kosher meat ground beef and potato recipes — skillet, hash, soup, and stuffed potatoes. All recipes are dairy-free. Ingredients are simple pantry staples with no specialty items required.</p>

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
              'Brown the ground beef first, then remove excess fat — leaving too much fat makes the dish greasy rather than rich.',
              'Parboil diced potatoes for 5 minutes before adding to the skillet — they\'ll cook through faster and more evenly.',
              'Use Worcestershire sauce to deepen the beef flavor — just 1 tablespoon makes a big difference.',
              'Let the potatoes sit undisturbed for 2–3 minutes before stirring to develop a golden crust.',
              'Season in layers — season the beef when browning, then taste and adjust again after adding potatoes.',
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
              'Ground beef ↔ ground turkey: Same technique, slightly leaner result. Brown the same way.',
              'Russet potatoes ↔ baby potatoes (halved): Baby potatoes hold their shape better in skillet dishes.',
              'Worcestershire sauce ↔ soy sauce: Use ½ tsp soy sauce for a similar umami depth.',
              'Canned diced tomatoes ↔ fresh tomatoes: 1 can (14 oz) equals about 2 medium fresh tomatoes, diced.',
              'Smoked paprika ↔ regular paprika + pinch of cumin: Achieves a similar smoky depth.',
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
              'Refrigerate in an airtight container for up to 4 days.',
              'Reheat in a skillet over medium heat or microwave — add a splash of broth if it seems dry.',
              'The hash tastes even better the next day as the flavors meld together.',
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
              { q: 'How do I make ground beef and potatoes not greasy?', a: 'After browning the beef, tilt the pan and spoon off excess fat, or use 90/10 lean ground beef.' },
              { q: 'Can I make this without pre-cooking the potatoes?', a: 'Yes, dice them small (½-inch) and add a splash of water to the skillet; cover and cook 10 minutes to steam through before uncovering to crisp.' },
              { q: 'What spices work best with ground beef and potatoes?', a: 'Smoked paprika, garlic powder, onion powder, cumin, and Worcestershire sauce are the classic combo. Chili powder adds heat.' },
              { q: 'Can I use sweet potatoes instead?', a: 'Yes — sweet potatoes add natural sweetness that balances savory beef. They cook slightly faster, so check at 7–8 minutes.' },
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
              { to: '/recipes/beef-stew', label: '🥩 Beef Stew' },
              { to: '/recipes/ground-beef-pasta', label: '🍝 Ground Beef Pasta' },
              { to: '/recipes/beef-and-potatoes', label: '🥔 Beef and Potatoes' },
              { to: '/recipes/ground-beef-and-rice', label: '🍚 Ground Beef and Rice' },
              { to: '/recipes/beef-and-vegetables', label: '🥦 Beef and Vegetables' },
              { to: '/recipes/chicken-and-potatoes', label: '🍗 Chicken and Potatoes' },
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
            { to: '/recipes/beef-stew', label: '🥩 Beef Stew' },
            { to: '/recipes/ground-beef-pasta', label: '🍝 Ground Beef Pasta' },
            { to: '/recipes/beef-and-potatoes', label: '🥔 Beef and Potatoes' },
            { to: '/recipes/ground-beef-and-rice', label: '🍚 Ground Beef and Rice' },
            { to: '/recipes/beef-and-vegetables', label: '🥦 Beef and Vegetables' },
            { to: '/recipes/chicken-and-potatoes', label: '🍗 Chicken and Potatoes' },
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

export default GroundBeefAndPotatoes;
