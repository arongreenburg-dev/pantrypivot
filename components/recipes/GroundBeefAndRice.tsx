import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare const window: Window & { gtag: (...args: unknown[]) => void };

type Tab = 'skillet' | 'bowl' | 'stuffedpeppers' | 'friedrice';

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
    title: 'One-Pan Ground Beef and Rice Skillet',
    description: 'Ground beef, uncooked rice, diced tomatoes, and beef broth all cooked together in one pan — easy, filling, and full of flavor.',
    time: '35 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground beef (85/15)',
      '1 cup long-grain white rice, uncooked',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '1 can (14 oz) diced tomatoes',
      '1.5 cups beef broth',
      '1 tsp cumin',
      '1 tsp smoked paprika',
      '½ tsp chili powder',
      '½ tsp salt',
      '¼ tsp black pepper',
      '2 tbsp fresh cilantro or parsley, chopped',
    ],
    instructions: [
      'In a large deep skillet or sauté pan, brown ground beef over medium-high heat, breaking up, 6–7 minutes. Drain excess fat.',
      'Add onion; cook 3 minutes until softened.',
      'Add garlic, cumin, smoked paprika, and chili powder; cook 1 minute until fragrant.',
      'Add uncooked rice; stir 1 minute to toast slightly.',
      'Add diced tomatoes (with their juice) and beef broth. Stir to combine.',
      'Bring to a boil. Reduce heat to low; cover tightly and cook 18–20 minutes — do not lift the lid.',
      'Remove from heat; let steam 5 minutes with lid on.',
      'Fluff with a fork. Season with salt and pepper. Garnish with cilantro and serve.',
    ],
  },
  bowl: {
    title: 'Korean-Inspired Ground Beef Rice Bowl',
    description: 'Seasoned ground beef with garlic-soy glaze over steamed rice with scallions and sesame seeds — fast and absolutely craveable.',
    time: '25 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground beef (85/15)',
      '2 cups cooked white rice',
      '4 cloves garlic, minced',
      '1 tbsp fresh ginger, grated',
      '3 tbsp soy sauce',
      '1 tbsp sesame oil',
      '2 tbsp brown sugar or honey',
      '1 tbsp rice vinegar',
      '½ tsp red pepper flakes',
      '1 tbsp vegetable oil',
      '4 scallions, sliced, for garnish',
      '1 tbsp sesame seeds, for garnish',
    ],
    instructions: [
      'Mix sauce: soy sauce, brown sugar, rice vinegar, and red pepper flakes. Set aside.',
      'Heat vegetable oil in a large skillet over medium-high heat.',
      'Add ground beef; cook 6–7 minutes, breaking up, until well browned. Drain most of the fat, leaving about 1 tsp.',
      'Add garlic and ginger; cook 1 minute until fragrant.',
      'Pour sauce over beef; toss and cook 2–3 minutes until the sauce reduces and coats the beef.',
      'Drizzle sesame oil; toss to combine.',
      'Divide rice between bowls. Spoon beef over rice.',
      'Garnish with scallions and sesame seeds. Serve immediately.',
    ],
  },
  stuffedpeppers: {
    title: 'Ground Beef Stuffed Bell Peppers',
    description: 'Bell peppers stuffed with seasoned ground beef, cooked rice, and tomato sauce — baked until tender and deeply satisfying.',
    time: '1 hr',
    servings: '4 servings',
    ingredients: [
      '4 large bell peppers (any color)',
      '1 lb ground beef (85/15)',
      '1.5 cups cooked white rice',
      '1 can (14 oz) tomato sauce',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '1 tsp Italian seasoning',
      '½ tsp smoked paprika',
      '½ tsp salt',
      '¼ tsp black pepper',
      '1 tbsp olive oil',
      '2 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'Preheat oven to 375°F.',
      'Cut tops off bell peppers and remove seeds. Place upright in a baking dish. If they don\'t stand, slice a thin piece off the bottom.',
      'Heat olive oil in a skillet over medium-high heat. Brown ground beef 6–7 minutes. Drain fat.',
      'Add onion; cook 3 minutes. Add garlic, Italian seasoning, and paprika; cook 1 minute.',
      'Add cooked rice and ¾ of the tomato sauce to the beef mixture. Stir to combine. Season with salt and pepper.',
      'Divide filling evenly among the peppers, packing tightly.',
      'Pour remaining tomato sauce over the filled peppers and into the baking dish.',
      'Cover tightly with foil. Bake 40–45 minutes until peppers are very tender. Uncover for the last 10 minutes. Garnish with parsley.',
    ],
  },
  friedrice: {
    title: 'Ground Beef Fried Rice',
    description: 'Day-old rice stir-fried with ground beef, egg, soy sauce, peas, carrots, and sesame oil — a complete meal in one pan.',
    time: '20 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground beef (85/15)',
      '3 cups day-old cooked white rice',
      '2 large eggs, beaten',
      '1 cup frozen peas',
      '2 medium carrots, diced small',
      '3 cloves garlic, minced',
      '3 tbsp soy sauce',
      '1 tsp sesame oil',
      '2 tbsp vegetable oil',
      '4 scallions, sliced',
      '½ tsp white pepper',
      '1 tbsp sriracha (optional)',
    ],
    instructions: [
      'Break up cold day-old rice with your hands to separate any clumps.',
      'Heat 1 tbsp vegetable oil in a wok over high heat. Brown ground beef 5–6 minutes. Drain fat and remove. Set aside.',
      'Add remaining oil to the wok. Add carrots and peas; stir-fry 3 minutes.',
      'Add garlic; stir-fry 30 seconds.',
      'Add rice; press flat and cook undisturbed 2 minutes. Stir and cook 2 more minutes.',
      'Push rice to one side. Pour beaten eggs into the space; scramble until just set, fold into rice.',
      'Return beef to pan. Add soy sauce, sesame oil, and white pepper; toss everything together.',
      'Add scallions; toss. Serve with sriracha if desired.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'skillet', label: 'One-Pan Skillet' },
  { key: 'bowl', label: 'Beef Rice Bowl' },
  { key: 'stuffedpeppers', label: 'Stuffed Peppers' },
  { key: 'friedrice', label: 'Beef Fried Rice' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const GroundBeefAndRice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('skillet');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Ground Beef and Rice Recipes (Skillet, Bowl, Stuffed Peppers) | PantryPivot';
    const PAGE_DESC = 'Easy ground beef and rice recipes — skillet, rice bowls, stuffed peppers, and beef fried rice. Quick, filling weeknight dinners.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/ground-beef-and-rice';
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
      "name": "One-Pan Ground Beef and Rice Skillet",
      "description": "Ground beef, uncooked rice, diced tomatoes, and beef broth all cooked together in one pan — easy, filling, and full of flavor.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT5M",
      "cookTime": "PT30M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "ground beef and rice, beef rice skillet, stuffed peppers, beef fried rice, one pan dinner",
      "url": "https://pantrypivot.com/recipes/ground-beef-and-rice",
      "recipeIngredient": [
        "1 lb ground beef (85/15)",
        "1 cup long-grain white rice, uncooked",
        "1 medium onion, diced",
        "4 cloves garlic, minced",
        "1 can (14 oz) diced tomatoes",
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Brown ground beef and drain fat. Add onion and cook 3 minutes." },
        { "@type": "HowToStep", "text": "Add garlic and spices. Add rice; toast 1 minute." },
        { "@type": "HowToStep", "text": "Add tomatoes and broth. Bring to a boil, cover, simmer 18–20 minutes." },
        { "@type": "HowToStep", "text": "Rest 5 minutes, fluff with fork, season and serve." },
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
        { "@type": "Question", "name": "Can I use uncooked rice in a ground beef skillet?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — add uncooked rice with broth (1:1.5 ratio), bring to a boil, then cover and simmer 18–20 minutes until rice absorbs the liquid." } },
        { "@type": "Question", "name": "How much rice per pound of ground beef?", "acceptedAnswer": { "@type": "Answer", "text": "1 cup dry rice (serves 4) per pound of ground beef is the standard ratio for one-pan dishes." } },
        { "@type": "Question", "name": "What can I add to ground beef and rice for more flavor?", "acceptedAnswer": { "@type": "Answer", "text": "Worcestershire sauce, tomato paste, smoked paprika, garlic, and a splash of soy sauce all add depth. Onion and garlic are non-negotiable." } },
        { "@type": "Question", "name": "Can I make ground beef and rice ahead?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — it's ideal for meal prep. Keeps 4 days in the fridge. Add a splash of broth when reheating to restore moisture." } },
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
      "name": "Ground Beef and Rice Recipes",
      "description": "Four kosher meat ground beef and rice recipes — one-skillet, rice bowl, stuffed peppers, and beef fried rice.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "ground beef and rice, kosher beef dinner, dairy-free ground beef, stuffed peppers with beef, beef rice bowl",
      "suitableForDiet": "https://schema.org/KosherDiet",
      "recipeIngredient": [
        "1 lb ground beef",
        "1.5 cups long-grain white rice",
        "1 medium onion, diced",
        "3 cloves garlic, minced",
        "2 tbsp olive oil",
        "2 cups beef broth or water",
        "1 tsp smoked paprika"
      ],
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Brown ground beef in olive oil, breaking apart, until cooked through. Drain excess fat. Add onion and garlic, cook 3 minutes." },
        { "@type": "HowToStep", "text": "Add rice and stir to coat in the beef fat. Pour in broth and bring to a boil." },
        { "@type": "HowToStep", "text": "Reduce heat to low, cover, and simmer 18–20 minutes until rice is tender and liquid is absorbed. Fluff and season to taste." }
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
            <li className="text-slate-600 font-medium">Ground Beef and Rice</li>
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
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Ground Beef and Rice Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Simple, filling ground beef and rice dinners — one pan, ready in 30 minutes.</p>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">What Can I Make With Ground Beef and Rice?</h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto text-center mb-8 leading-relaxed">This page contains 4 kosher meat ground beef and rice recipes — skillet, bowl, stuffed peppers, and fried rice. All recipes are dairy-free. Ingredients are simple pantry staples with no specialty items required.</p>

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
              'Brown the ground beef first before adding rice — the fond adds depth to the finished dish.',
              'For one-pan rice: use 1:1.5 ratio of rice to liquid. Add broth, not water, for more flavor.',
              "Don't stir the rice after adding liquid — cover and let it steam undisturbed.",
              'Season the beef generously: ground beef needs more seasoning than whole cuts.',
              'For stuffed peppers: pre-cook the rice and mix with beef filling so it\'s fully cooked by the time peppers are tender.',
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
              'Ground beef ↔ ground turkey: Same technique, slightly leaner. Add 1 extra tbsp olive oil.',
              'White rice ↔ brown rice: Add 10–15 extra minutes of cooking time and increase liquid by ¼ cup.',
              'Diced tomatoes ↔ tomato sauce: Use 1 cup tomato sauce instead of 1 can diced tomatoes.',
              'Cumin ↔ taco seasoning: 1 tbsp taco seasoning replaces cumin, smoked paprika, and chili powder.',
              'Beef broth ↔ chicken broth: Either works — beef broth gives richer flavor; chicken is more neutral.',
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
              'Stuffed peppers freeze well for up to 3 months.',
              'Reheat with a splash of broth in the microwave or on the stovetop to restore moisture.',
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
              { q: 'Can I use uncooked rice in a ground beef skillet?', a: 'Yes — add uncooked rice with broth (1:1.5 ratio), bring to a boil, then cover and simmer 18–20 minutes until rice absorbs the liquid.' },
              { q: 'How much rice per pound of ground beef?', a: '1 cup dry rice (serves 4) per pound of ground beef is the standard ratio for one-pan dishes.' },
              { q: 'What can I add to ground beef and rice for more flavor?', a: 'Worcestershire sauce, tomato paste, smoked paprika, garlic, and a splash of soy sauce all add depth. Onion and garlic are non-negotiable.' },
              { q: 'Can I make ground beef and rice ahead?', a: "Yes — it's ideal for meal prep. Keeps 4 days in the fridge. Add a splash of broth when reheating to restore moisture." },
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
              { to: '/recipes/beef-stew', label: '🥩 Beef Stew' },
              { to: '/recipes/beef-and-potatoes', label: '🥔 Beef and Potatoes' },
              { to: '/recipes/ground-beef-and-potatoes', label: '🥔 Ground Beef and Potatoes' },
              { to: '/recipes/beef-and-vegetables', label: '🥦 Beef and Vegetables' },
              { to: '/recipes/chicken-and-rice', label: '🍚 Chicken and Rice' },
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
            { to: '/recipes/beef-stew', label: '🥩 Beef Stew' },
            { to: '/recipes/beef-and-potatoes', label: '🥔 Beef and Potatoes' },
            { to: '/recipes/ground-beef-and-potatoes', label: '🥔 Ground Beef and Potatoes' },
            { to: '/recipes/beef-and-vegetables', label: '🥦 Beef and Vegetables' },
            { to: '/recipes/chicken-and-rice', label: '🍚 Chicken and Rice' },
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

export default GroundBeefAndRice;
