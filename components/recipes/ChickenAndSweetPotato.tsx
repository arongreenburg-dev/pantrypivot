import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare const window: Window & { gtag: (...args: unknown[]) => void };

type Tab = 'sheetpan' | 'stuffed' | 'soup' | 'bowl';

interface Recipe {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

const recipes: Record<Tab, Recipe> = {
  sheetpan: {
    title: 'Sheet Pan Chicken and Sweet Potato',
    description: 'Chicken thighs and cubed sweet potatoes with cumin, smoked paprika, garlic, and a hint of cinnamon — one pan, 50 minutes.',
    time: '50 min',
    servings: '4 servings',
    ingredients: [
      '4 bone-in, skin-on chicken thighs',
      '2 large sweet potatoes, peeled and cut into 1-inch cubes',
      '1 large red onion, cut into wedges',
      '4 cloves garlic, minced',
      '3 tbsp olive oil',
      '1.5 tsp cumin',
      '1 tsp smoked paprika',
      '½ tsp garlic powder',
      '¼ tsp cinnamon',
      '½ tsp salt',
      '¼ tsp black pepper',
      '2 tbsp fresh cilantro or parsley, chopped',
    ],
    instructions: [
      'Preheat oven to 425°F. Line a large sheet pan with foil.',
      'Pat chicken thighs completely dry with paper towels.',
      'Mix cumin, smoked paprika, garlic powder, cinnamon, salt, and pepper together.',
      'Toss sweet potatoes and onion with 2 tbsp olive oil and half the spice mixture. Spread on the sheet pan.',
      'Rub chicken with remaining olive oil and remaining spice mixture.',
      'Nestle chicken skin-side up on top of the sweet potatoes and onion.',
      'Roast 40–45 minutes until chicken is golden with crispy skin (165°F internal temp) and sweet potatoes are tender.',
      'Rest 5 minutes. Garnish with fresh cilantro or parsley and serve.',
    ],
  },
  stuffed: {
    title: 'Stuffed Sweet Potatoes with Chicken',
    description: 'Baked sweet potatoes stuffed with seasoned shredded chicken, onion, garlic, cumin, and lime — hearty and naturally sweet.',
    time: '1 hr',
    servings: '4 servings',
    ingredients: [
      '4 medium sweet potatoes',
      '1 lb boneless, skinless chicken breast',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '2 tsp cumin',
      '1 tsp smoked paprika',
      '½ tsp chili powder',
      '½ tsp salt',
      '¼ tsp black pepper',
      '2 tbsp olive oil',
      '2 tbsp fresh lime juice',
      '2 tbsp fresh cilantro, chopped',
    ],
    instructions: [
      'Preheat oven to 400°F. Pierce sweet potatoes all over with a fork. Rub with a little olive oil.',
      'Bake sweet potatoes directly on the rack for 50–60 minutes until tender.',
      'Meanwhile, season chicken with cumin, smoked paprika, chili powder, salt, and pepper.',
      'Heat olive oil in a skillet over medium-high heat. Cook chicken 6–7 minutes per side until cooked through (165°F). Rest 5 minutes, then shred.',
      'In the same skillet, cook onion 3 minutes. Add garlic; cook 1 minute.',
      'Return shredded chicken to the skillet; toss with onion and garlic. Add lime juice.',
      'Slice open baked sweet potatoes and fluff insides with a fork.',
      'Pile chicken filling into each potato. Garnish with fresh cilantro and serve.',
    ],
  },
  soup: {
    title: 'Chicken and Sweet Potato Soup',
    description: 'Warming chicken and sweet potato soup with ginger, garlic, cumin, and cinnamon — comforting and ready in 45 minutes.',
    time: '45 min',
    servings: '6 servings',
    ingredients: [
      '1.5 lbs boneless, skinless chicken breast',
      '2 large sweet potatoes, peeled and diced',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '1 tbsp fresh ginger, grated',
      '6 cups chicken broth',
      '1.5 tsp cumin',
      '½ tsp cinnamon',
      '½ tsp smoked paprika',
      '½ tsp salt',
      '¼ tsp black pepper',
      '2 tbsp olive oil',
      '2 tbsp fresh cilantro or parsley, chopped',
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat. Add onion; cook 4 minutes until softened.',
      'Add garlic and ginger; cook 1 minute. Add cumin, cinnamon, and smoked paprika; cook 1 minute more to bloom the spices.',
      'Add sweet potatoes and chicken broth. Bring to a boil.',
      'Add whole chicken breasts; reduce heat to medium-low. Simmer 20 minutes.',
      'Remove chicken and shred with two forks.',
      'Check sweet potatoes are very tender. Use an immersion blender to partially blend the soup for a thick, creamy texture if desired.',
      'Return shredded chicken to the pot. Season with salt and pepper.',
      'Ladle into bowls and garnish with cilantro.',
    ],
  },
  bowl: {
    title: 'Chicken and Sweet Potato Bowl',
    description: 'Roasted sweet potato and grilled chicken over rice with garlic-herb olive oil dressing — a bright, healthy bowl dinner.',
    time: '40 min',
    servings: '2 servings',
    ingredients: [
      '2 boneless, skinless chicken thighs',
      '1 large sweet potato, peeled and cubed',
      '1 cup cooked rice or quinoa',
      '2 cups mixed greens or arugula',
      '3 tbsp olive oil',
      '2 cloves garlic, minced',
      '1 tbsp lemon juice',
      '1 tsp cumin',
      '½ tsp smoked paprika',
      '½ tsp salt',
      '¼ tsp black pepper',
      '1 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'Preheat oven to 425°F. Toss sweet potato cubes with 1 tbsp olive oil, ½ tsp cumin, salt, and pepper. Roast 25 minutes until tender and caramelized.',
      'Season chicken thighs with remaining cumin, smoked paprika, salt, and pepper.',
      'Heat 1 tbsp olive oil in a skillet over medium-high heat. Cook chicken 6 minutes per side until cooked through (165°F). Rest 5 minutes, then slice.',
      'Make dressing: whisk remaining 1 tbsp olive oil, garlic, lemon juice, parsley, salt, and pepper.',
      'Divide rice or quinoa between two bowls.',
      'Top with roasted sweet potato, sliced chicken, and mixed greens.',
      'Drizzle garlic-herb dressing over each bowl and serve.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'sheetpan', label: 'Sheet Pan' },
  { key: 'stuffed', label: 'Stuffed Sweet Potato' },
  { key: 'soup', label: 'Soup' },
  { key: 'bowl', label: 'Bowl' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const ChickenAndSweetPotato: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('sheetpan');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Chicken and Sweet Potato Recipes (Sheet Pan, Bowl, Soup) | PantryPivot';
    const PAGE_DESC = 'Easy chicken and sweet potato recipes — sheet pan, stuffed sweet potato, soup, and bowls. Healthy, naturally sweet dinners for weeknights.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/chicken-and-sweet-potato';
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
      "name": "Sheet Pan Chicken and Sweet Potato",
      "description": "Chicken thighs and cubed sweet potatoes with cumin, smoked paprika, garlic, and a hint of cinnamon — one pan, 50 minutes.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT45M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "chicken and sweet potato, sheet pan chicken, healthy chicken dinner, chicken sweet potato recipe, dairy-free chicken",
      "url": "https://pantrypivot.com/recipes/chicken-and-sweet-potato",
      "recipeIngredient": [
        "4 bone-in, skin-on chicken thighs",
        "2 large sweet potatoes, peeled and cut into 1-inch cubes",
        "1 large red onion, cut into wedges",
        "4 cloves garlic, minced",
        "3 tbsp olive oil",
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Preheat oven to 425°F. Pat chicken dry. Mix spices." },
        { "@type": "HowToStep", "text": "Toss sweet potatoes and onion with olive oil and spices. Spread on sheet pan." },
        { "@type": "HowToStep", "text": "Rub chicken with olive oil and remaining spices. Nestle skin-side up on vegetables." },
        { "@type": "HowToStep", "text": "Roast 40–45 minutes until chicken is golden (165°F) and sweet potatoes are tender." },
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
        { "@type": "Question", "name": "Do I need to peel sweet potatoes before roasting?", "acceptedAnswer": { "@type": "Answer", "text": "Not necessarily — sweet potato skin is edible and gets nicely crispy in the oven. For soups and stuffed preparations, peeling gives a better texture." } },
        { "@type": "Question", "name": "What spices pair best with chicken and sweet potato?", "acceptedAnswer": { "@type": "Answer", "text": "Cumin, smoked paprika, cinnamon, garlic powder, and chili powder are classic. The spice combination gives it a warm, slightly smoky flavor." } },
        { "@type": "Question", "name": "How do I keep sweet potatoes from getting mushy?", "acceptedAnswer": { "@type": "Answer", "text": "Cut into uniform 1-inch cubes, don't overcrowd the pan, roast at 400°F+, and don't cover them." } },
        { "@type": "Question", "name": "Is chicken and sweet potato good for meal prep?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — both keep well refrigerated for 4 days and reheat easily. Make a double batch on Sunday for the week." } },
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
            <li className="text-slate-600 font-medium">Chicken and Sweet Potato</li>
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
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Chicken and Sweet Potato Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Naturally sweet, satisfying chicken and sweet potato dinners — healthy and weeknight-easy.</p>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">What Can I Make With Chicken and Sweet Potato?</h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto text-center mb-8 leading-relaxed">This page contains 4 kosher meat chicken and sweet potato recipes — sheet pan, stuffed, soup, and grain bowl. All recipes are dairy-free. Ingredients are simple pantry staples with no specialty items required.</p>

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
              'Sweet potatoes caramelize beautifully at 400°F — go hot for the best natural sweetness.',
              'Cumin and smoked paprika are the ideal spice pairing for chicken and sweet potato.',
              'Peel sweet potatoes for soups and bowls, leave skin on for sheet pan roasting for better texture.',
              'For stuffed potatoes, microwave the potato 8 minutes first, then finish in oven for crispy skin.',
              'A squeeze of lime juice at the end brightens the whole dish and balances the sweetness.',
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
              'Sweet potato ↔ butternut squash: Similar natural sweetness and texture; cook time is nearly identical.',
              'Chicken thighs ↔ chicken breasts: Reduce cook time by 5–8 minutes; breasts dry out faster.',
              'Cumin ↔ coriander: A milder, slightly citrusy alternative that still pairs beautifully with sweet potato.',
              'Lime ↔ lemon: Both add brightness; lemon works just as well if lime isn\'t available.',
              'Fresh cilantro ↔ fresh parsley: For those who don\'t enjoy cilantro, parsley is a clean, mild substitute.',
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
              'Refrigerate in an airtight container for up to 4 days — great for meal prep.',
              'Sweet potatoes freeze well in soups; reheat on stovetop with a splash of broth.',
              'Reheat sheet pan meals in a 375°F oven for 12 minutes to restore texture and warmth.',
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
              { q: 'Do I need to peel sweet potatoes before roasting?', a: "Not necessarily — sweet potato skin is edible and gets nicely crispy in the oven. For soups and stuffed preparations, peeling gives a better texture." },
              { q: 'What spices pair best with chicken and sweet potato?', a: 'Cumin, smoked paprika, cinnamon, garlic powder, and chili powder are classic. The spice combination gives it a warm, slightly smoky flavor.' },
              { q: 'How do I keep sweet potatoes from getting mushy?', a: "Cut into uniform 1-inch cubes, don't overcrowd the pan, roast at 400°F+, and don't cover them." },
              { q: 'Is chicken and sweet potato good for meal prep?', a: 'Yes — both keep well refrigerated for 4 days and reheat easily. Make a double batch on Sunday for the week.' },
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
              { to: '/recipes/chicken-and-rice', label: '🍚 Chicken and Rice' },
              { to: '/recipes/ground-turkey-sweet-potato', label: '🍠 Turkey & Sweet Potato' },
              { to: '/recipes/roast-chicken', label: '🍗 Roast Chicken' },
              { to: '/recipes/air-fryer-chicken', label: '🍗 Air Fryer Chicken' },
              { to: '/recipes/baked-chicken-thighs', label: '🍗 Baked Chicken Thighs' },
              { to: '/recipes/chicken-and-vegetables', label: '🥦 Chicken and Vegetables' },
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
            { to: '/recipes/chicken-and-rice', label: '🍚 Chicken and Rice' },
            { to: '/recipes/ground-turkey-sweet-potato', label: '🍠 Turkey & Sweet Potato' },
            { to: '/recipes/roast-chicken', label: '🍗 Roast Chicken' },
            { to: '/recipes/air-fryer-chicken', label: '🍗 Air Fryer Chicken' },
            { to: '/recipes/baked-chicken-thighs', label: '🍗 Baked Chicken Thighs' },
            { to: '/recipes/chicken-and-vegetables', label: '🥦 Chicken and Vegetables' },
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

export default ChickenAndSweetPotato;
