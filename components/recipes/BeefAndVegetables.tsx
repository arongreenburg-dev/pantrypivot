import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare const window: Window & { gtag: (...args: unknown[]) => void };

type Tab = 'stirfry' | 'sheetpan' | 'soup' | 'skillet';

interface Recipe {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

const recipes: Record<Tab, Recipe> = {
  stirfry: {
    title: 'Beef and Vegetable Stir-Fry',
    description: 'Thin-sliced flank steak with broccoli, bell pepper, and snap peas in garlic-ginger soy sauce — better than takeout in 25 minutes.',
    time: '25 min',
    servings: '4 servings',
    ingredients: [
      '1 lb flank steak, sliced thin against the grain',
      '2 cups broccoli florets',
      '1 red bell pepper, sliced',
      '1 cup sugar snap peas',
      '3 cloves garlic, minced',
      '1 tbsp fresh ginger, grated',
      '3 tbsp soy sauce',
      '1 tbsp oyster sauce',
      '1 tsp sesame oil',
      '1 tbsp cornstarch',
      '2 tbsp vegetable oil',
      '¼ cup beef or chicken broth',
    ],
    instructions: [
      'Freeze steak 20 minutes before slicing — it firms up and slices paper-thin much more easily.',
      'Toss sliced beef with ½ tbsp cornstarch and 1 tbsp soy sauce; marinate 15 minutes.',
      'Mix sauce: remaining soy sauce, oyster sauce, broth, and remaining cornstarch.',
      'Heat vegetable oil in a wok over high heat until smoking. Stir-fry beef in batches 2–3 minutes until browned. Remove.',
      'Add broccoli and bell pepper; stir-fry 3 minutes.',
      'Add snap peas; stir-fry 1 minute.',
      'Push vegetables to the side. Add garlic and ginger; stir-fry 30 seconds.',
      'Return beef to pan. Pour sauce over; toss until thickened, 1–2 minutes. Drizzle sesame oil and serve over rice.',
    ],
  },
  sheetpan: {
    title: 'Sheet Pan Beef and Vegetables',
    description: 'Steak bites with zucchini, bell pepper, onion, and cherry tomatoes roasted together with Italian seasoning — quick and colorful.',
    time: '35 min',
    servings: '4 servings',
    ingredients: [
      '1.5 lbs sirloin steak, cut into 1.5-inch pieces',
      '1 medium zucchini, sliced into half-moons',
      '2 bell peppers, cut into 1-inch pieces',
      '1 large red onion, cut into wedges',
      '1 cup cherry tomatoes',
      '3 cloves garlic, minced',
      '3 tbsp olive oil',
      '1.5 tsp Italian seasoning',
      '1 tsp smoked paprika',
      '½ tsp salt',
      '¼ tsp black pepper',
      '2 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'Preheat oven to 425°F. Line a large sheet pan with foil.',
      'Toss steak bites with 1.5 tbsp olive oil, smoked paprika, half the garlic, ¼ tsp salt, and pepper.',
      'Toss vegetables (except cherry tomatoes) with remaining olive oil, Italian seasoning, remaining garlic, remaining salt, and pepper.',
      'Spread vegetables on the sheet pan in a single layer. Scatter steak bites on top.',
      'Roast 15 minutes, then add cherry tomatoes.',
      'Roast 8–10 more minutes until steak reaches desired doneness (135°F for medium-rare, 145°F for medium) and vegetables are tender.',
      'Let rest 5 minutes. Garnish with parsley and serve.',
    ],
  },
  soup: {
    title: 'Beef and Vegetable Soup',
    description: 'Hearty beef chuck soup with carrots, celery, potatoes, and tomatoes — slow-simmered for rich, deep flavor.',
    time: '1 hr 15 min',
    servings: '6 servings',
    ingredients: [
      '1.5 lbs beef chuck, cut into 1-inch cubes',
      '3 large carrots, sliced',
      '3 stalks celery, sliced',
      '2 medium Yukon Gold potatoes, diced',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '1 can (14 oz) diced tomatoes',
      '4 cups beef broth',
      '1 tbsp tomato paste',
      '1 tsp dried thyme',
      '2 tbsp olive oil',
      '½ tsp salt',
      '¼ tsp black pepper',
    ],
    instructions: [
      'Pat beef cubes dry. Season with salt and pepper.',
      'Heat olive oil in a large pot over medium-high heat. Sear beef in batches 3–4 minutes per side until deeply browned. Remove and set aside.',
      'Add onion and celery; cook 4 minutes. Add garlic and tomato paste; cook 2 minutes, stirring.',
      'Return beef to pot. Add diced tomatoes, beef broth, and thyme. Bring to a boil.',
      'Reduce heat to low; cover and simmer 40 minutes.',
      'Add carrots and potatoes; simmer 25 more minutes until beef and vegetables are very tender.',
      'Season with salt and pepper.',
      'Ladle into bowls and serve with crusty bread.',
    ],
  },
  skillet: {
    title: 'Ground Beef and Vegetable Skillet',
    description: 'Ground beef with onion, garlic, zucchini, diced tomatoes, and spinach in Italian seasoning — a fast, wholesome one-pan dinner.',
    time: '25 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground beef (85/15)',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '1 medium zucchini, diced',
      '1 can (14 oz) diced tomatoes',
      '3 cups fresh spinach',
      '1.5 tsp Italian seasoning',
      '½ tsp smoked paprika',
      '½ tsp salt',
      '¼ tsp black pepper',
      '1 tbsp olive oil',
      '2 tbsp fresh basil, chopped',
    ],
    instructions: [
      'Heat olive oil in a large skillet over medium-high heat.',
      'Add ground beef; cook 6–7 minutes, breaking up, until well browned. Drain excess fat.',
      'Add onion; cook 3 minutes until softened.',
      'Add garlic, Italian seasoning, and smoked paprika; cook 1 minute.',
      'Add zucchini; cook 4 minutes until just tender.',
      'Add diced tomatoes; stir and simmer 5 minutes.',
      'Add spinach; stir until wilted, about 60–90 seconds.',
      'Season with salt and pepper. Garnish with fresh basil and serve over rice or pasta.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'stirfry', label: 'Stir-Fry' },
  { key: 'sheetpan', label: 'Sheet Pan' },
  { key: 'soup', label: 'Soup' },
  { key: 'skillet', label: 'Ground Beef Skillet' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const BeefAndVegetables: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('stirfry');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Beef and Vegetables Recipes (Stir-Fry, Sheet Pan, Stew) | PantryPivot';
    const PAGE_DESC = 'Easy beef and vegetable recipes — stir-fry, sheet pan, soup, and skillet. Hearty, satisfying dinners ready in 30–45 minutes.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/beef-and-vegetables';
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
      "name": "Beef and Vegetable Stir-Fry",
      "description": "Thin-sliced flank steak with broccoli, bell pepper, and snap peas in garlic-ginger soy sauce — better than takeout in 25 minutes.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT15M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "Chinese-American",
      "keywords": "beef and vegetables, beef stir-fry, flank steak stir-fry, beef with broccoli, dairy-free beef",
      "url": "https://pantrypivot.com/recipes/beef-and-vegetables",
      "recipeIngredient": [
        "1 lb flank steak, sliced thin against the grain",
        "2 cups broccoli florets",
        "1 red bell pepper, sliced",
        "1 cup sugar snap peas",
        "3 cloves garlic, minced",
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Freeze steak 20 minutes, then slice paper-thin against the grain. Marinate in soy sauce and cornstarch 15 minutes." },
        { "@type": "HowToStep", "text": "Stir-fry beef in a hot wok in batches 2–3 minutes until browned. Remove." },
        { "@type": "HowToStep", "text": "Stir-fry broccoli, bell pepper, and snap peas 3–4 minutes total." },
        { "@type": "HowToStep", "text": "Add garlic, ginger, return beef, pour sauce, and toss until thickened." },
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
        { "@type": "Question", "name": "What cut of beef is best for stir-fry?", "acceptedAnswer": { "@type": "Answer", "text": "Flank steak, skirt steak, or sirloin — all slice thin and cook quickly. Freeze 20 minutes before slicing for paper-thin cuts." } },
        { "@type": "Question", "name": "How do I keep beef tender in stir-fry?", "acceptedAnswer": { "@type": "Answer", "text": "Slice thin against the grain, marinate in soy sauce + cornstarch for 15 minutes, and cook on very high heat for just 2–3 minutes." } },
        { "@type": "Question", "name": "What vegetables go best with beef?", "acceptedAnswer": { "@type": "Answer", "text": "Broccoli, bell peppers, snap peas, bok choy, zucchini, and onions are classic pairings. Root vegetables like carrots and parsnips work well in soups and stews." } },
        { "@type": "Question", "name": "Can I use ground beef instead of steak for stir-fry?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — it won't have the same texture but will taste great. Brown it first, drain fat, then add vegetables and sauce." } },
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
            <li className="text-slate-600 font-medium">Beef and Vegetables</li>
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
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Beef and Vegetables Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Hearty beef and vegetable dinners — simple, satisfying, and loaded with flavor.</p>
        </div>

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
              'For stir-fry, freeze steak 20 minutes before slicing — it firms up and slices paper-thin much more easily.',
              'Marinate steak strips in soy sauce, garlic, and cornstarch for 15 minutes — it tenderizes and seasons simultaneously.',
              'Use a very hot skillet or wok for beef stir-fry — lower heat steams the meat instead of searing it.',
              'For soups, sear the beef in batches before adding liquid — the browning reaction creates rich, complex flavor.',
              'Add delicate vegetables (spinach, zucchini) in the last 2–3 minutes to prevent overcooking.',
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
              'Flank steak ↔ sirloin or skirt steak: Both slice thin and cook quickly for stir-fry.',
              'Flank steak ↔ ground beef: Easier and budget-friendly; brown first, drain fat, then proceed.',
              'Oyster sauce ↔ hoisin sauce: Slightly sweeter but similar savory depth.',
              'Fresh garlic ↔ garlic powder: Use ¼ tsp garlic powder per clove as a quick substitute.',
              'Beef broth ↔ chicken broth + ½ tsp Worcestershire sauce: Adds comparable depth to soups.',
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
              'Refrigerate skillet and sheet pan dishes 3–4 days in an airtight container.',
              'Soup keeps 5 days in the fridge and freezes up to 3 months.',
              'Stir-fry is best eaten the same day — reheating in a hot skillet works better than microwave.',
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
              { q: 'What cut of beef is best for stir-fry?', a: 'Flank steak, skirt steak, or sirloin — all slice thin and cook quickly. Freeze 20 minutes before slicing for paper-thin cuts.' },
              { q: 'How do I keep beef tender in stir-fry?', a: 'Slice thin against the grain, marinate in soy sauce + cornstarch for 15 minutes, and cook on very high heat for just 2–3 minutes.' },
              { q: 'What vegetables go best with beef?', a: 'Broccoli, bell peppers, snap peas, bok choy, zucchini, and onions are classic pairings. Root vegetables like carrots and parsnips work well in soups and stews.' },
              { q: 'Can I use ground beef instead of steak for stir-fry?', a: "Yes — it won't have the same texture but will taste great. Brown it first, drain fat, then add vegetables and sauce." },
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
              { to: '/recipes/ground-beef-and-potatoes', label: '🥔 Ground Beef and Potatoes' },
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
            { to: '/recipes/beef-stew', label: '🥩 Beef Stew' },
            { to: '/recipes/ground-beef-pasta', label: '🍝 Ground Beef Pasta' },
            { to: '/recipes/beef-and-potatoes', label: '🥔 Beef and Potatoes' },
            { to: '/recipes/ground-beef-and-rice', label: '🍚 Ground Beef and Rice' },
            { to: '/recipes/ground-beef-and-potatoes', label: '🥔 Ground Beef and Potatoes' },
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

export default BeefAndVegetables;
