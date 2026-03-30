import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare const window: Window & { gtag: (...args: unknown[]) => void };

type Tab = 'teriyaki' | 'baked' | 'friedrice' | 'bowl';

interface Recipe {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

const recipes: Record<Tab, Recipe> = {
  teriyaki: {
    title: 'Teriyaki Salmon Bowl',
    description: 'Pan-seared salmon with homemade teriyaki sauce over steamed rice with fresh cucumber — restaurant quality in 25 minutes.',
    time: '25 min',
    servings: '2 servings',
    ingredients: [
      '2 salmon fillets (6 oz each), skin-on',
      '1 cup jasmine rice, cooked',
      '1 Persian cucumber, sliced thin',
      '3 tbsp soy sauce',
      '2 tbsp mirin',
      '1 tbsp honey',
      '2 cloves garlic, minced',
      '1 tsp fresh ginger, grated',
      '1 tsp sesame oil',
      '1 tbsp vegetable oil',
      '1 tsp sesame seeds, for garnish',
      '2 scallions, sliced, for garnish',
    ],
    instructions: [
      'Mix teriyaki sauce: combine soy sauce, mirin, honey, garlic, and ginger in a small bowl.',
      'Pat salmon completely dry with paper towels.',
      'Heat vegetable oil in a skillet over medium-high heat.',
      'Place salmon skin-side up; cook 4 minutes until golden. Flip to skin side down; cook 3–4 minutes.',
      'Pour teriyaki sauce into the pan; let it bubble and reduce 1–2 minutes, spooning over the salmon.',
      'Drizzle sesame oil over the salmon.',
      'Serve salmon over steamed rice with sliced cucumber on the side.',
      'Garnish with sesame seeds and sliced scallions.',
    ],
  },
  baked: {
    title: 'Baked Salmon Over Rice',
    description: 'Perfectly baked salmon with garlic, lemon, and herbs served over fluffy white rice — simple, healthy, and foolproof.',
    time: '35 min',
    servings: '4 servings',
    ingredients: [
      '4 salmon fillets (6 oz each)',
      '2 cups jasmine or basmati rice, cooked',
      '4 cloves garlic, minced',
      '2 tbsp olive oil',
      '2 tbsp lemon juice',
      '1 tsp lemon zest',
      '1 tsp dried dill',
      '½ tsp dried parsley',
      '½ tsp smoked paprika',
      '½ tsp salt',
      '¼ tsp black pepper',
      '1 lemon, sliced into rounds',
    ],
    instructions: [
      'Preheat oven to 400°F. Line a baking sheet with foil.',
      'Pat salmon fillets completely dry.',
      'Mix olive oil, garlic, lemon juice, lemon zest, dill, parsley, paprika, salt, and pepper.',
      'Brush salmon generously with the herb mixture.',
      'Place salmon on the prepared baking sheet. Lay lemon slices under and around fillets.',
      'Bake 12–15 minutes until salmon flakes easily with a fork and the thickest part looks just opaque.',
      'Let rest 2 minutes.',
      'Serve over fluffy rice with pan juices spooned over.',
    ],
  },
  friedrice: {
    title: 'Salmon Fried Rice',
    description: 'Day-old rice stir-fried with flaked salmon, egg, soy sauce, sesame oil, and scallions — the best way to use leftover salmon.',
    time: '20 min',
    servings: '2 servings',
    ingredients: [
      '8 oz cooked salmon, flaked (leftover or freshly poached)',
      '2 cups day-old cooked white rice',
      '2 large eggs, beaten',
      '2 tbsp soy sauce',
      '1 tsp sesame oil',
      '2 cloves garlic, minced',
      '1 tsp fresh ginger, grated',
      '2 scallions, sliced',
      '½ cup frozen peas',
      '1 tbsp vegetable oil',
      '¼ tsp white pepper',
      '1 tbsp sriracha (optional)',
    ],
    instructions: [
      'Break up day-old rice with your hands to separate any clumps.',
      'Heat vegetable oil in a wok or large skillet over high heat.',
      'Add garlic and ginger; stir-fry 30 seconds.',
      'Add rice; press flat and cook undisturbed 2 minutes for a crispy bottom, then stir.',
      'Push rice to the side. Pour beaten eggs into the empty space; scramble until just set, then fold into rice.',
      'Add frozen peas; stir-fry 2 minutes.',
      'Add soy sauce, sesame oil, and white pepper; toss everything together.',
      'Gently fold in flaked salmon so it stays in chunks. Add scallions, serve immediately with sriracha if desired.',
    ],
  },
  bowl: {
    title: 'Sushi-Style Salmon Rice Bowl',
    description: 'Soy-marinated salmon with avocado, cucumber, and sesame seeds over sushi rice — a restaurant-quality bowl at home.',
    time: '30 min',
    servings: '2 servings',
    ingredients: [
      '2 salmon fillets (6 oz each), cubed',
      '1.5 cups short-grain sushi rice, cooked and seasoned',
      '1 avocado, sliced',
      '1 Persian cucumber, sliced thin',
      '3 tbsp soy sauce',
      '1 tbsp rice vinegar',
      '1 tsp sesame oil',
      '1 tsp honey',
      '1 clove garlic, minced',
      '1 tbsp vegetable oil',
      '1 tbsp sesame seeds',
      '2 sheets nori, cut into strips (optional)',
    ],
    instructions: [
      'Mix marinade: soy sauce, rice vinegar, sesame oil, honey, and garlic.',
      'Toss salmon cubes in half the marinade; marinate 10 minutes.',
      'Season sushi rice with remaining marinade or a splash of rice vinegar.',
      'Heat vegetable oil in a non-stick skillet over medium-high heat.',
      'Sear marinated salmon cubes 2 minutes per side until golden outside and just cooked through. Do not overcook.',
      'Divide seasoned rice between two bowls.',
      'Top each bowl with seared salmon, avocado slices, and cucumber.',
      'Sprinkle with sesame seeds and nori strips. Serve immediately.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'teriyaki', label: 'Teriyaki Salmon Bowl' },
  { key: 'baked', label: 'Baked Salmon & Rice' },
  { key: 'friedrice', label: 'Salmon Fried Rice' },
  { key: 'bowl', label: 'Sushi-Style Bowl' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const SalmonAndRice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('teriyaki');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Salmon and Rice Recipes (Bowls, Teriyaki, Baked) | PantryPivot';
    const PAGE_DESC = 'Easy salmon and rice recipes — teriyaki bowls, baked salmon over rice, salmon fried rice, and more. Healthy dinners in 30 minutes.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/salmon-and-rice';
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
      "name": "Teriyaki Salmon Bowl",
      "description": "Pan-seared salmon with homemade teriyaki sauce over steamed rice with fresh cucumber — restaurant quality in 25 minutes.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT15M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "Japanese-American",
      "keywords": "salmon and rice, teriyaki salmon, salmon rice bowl, healthy salmon dinner, dairy-free salmon",
      "url": "https://pantrypivot.com/recipes/salmon-and-rice",
      "recipeIngredient": [
        "2 salmon fillets (6 oz each), skin-on",
        "1 cup jasmine rice, cooked",
        "1 Persian cucumber, sliced thin",
        "3 tbsp soy sauce",
        "2 tbsp mirin",
      ],
      "recipeYield": "2 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Mix teriyaki sauce: soy sauce, mirin, honey, garlic, and ginger." },
        { "@type": "HowToStep", "text": "Pat salmon dry. Sear skin-side up 4 minutes, then flip and cook 3–4 minutes." },
        { "@type": "HowToStep", "text": "Pour teriyaki sauce into pan; reduce 1–2 minutes, spooning over salmon." },
        { "@type": "HowToStep", "text": "Serve over rice with cucumber and sesame seeds." },
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
        { "@type": "Question", "name": "What rice goes best with salmon?", "acceptedAnswer": { "@type": "Answer", "text": "Short-grain white rice (sushi rice) for bowls, long-grain jasmine for teriyaki, and brown rice for a nuttier, healthier option." } },
        { "@type": "Question", "name": "How do I know when salmon is cooked?", "acceptedAnswer": { "@type": "Answer", "text": "It flakes easily with a fork and the color changes from translucent to opaque light pink. Internal temp: 125–130°F for medium, 145°F for well-done." } },
        { "@type": "Question", "name": "Can I use frozen salmon for these recipes?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — thaw overnight in the fridge or under cold running water. Pat dry thoroughly before cooking." } },
        { "@type": "Question", "name": "How long does cooked salmon keep?", "acceptedAnswer": { "@type": "Answer", "text": "2 days in the fridge in an airtight container. Salmon dries out quickly when reheated — best eaten fresh or the next day." } },
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
      "name": "Salmon and Rice Recipes",
      "description": "Four kosher pareve salmon and rice recipes — teriyaki, baked lemon herb, fried rice, and salmon grain bowl.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "salmon and rice, kosher salmon dinner, pareve fish, teriyaki salmon, salmon rice bowl",
      "suitableForDiet": "https://schema.org/KosherDiet",
      "recipeIngredient": [
        "4 salmon fillets (6 oz each)",
        "1.5 cups long-grain white rice",
        "3 cups water or vegetable broth",
        "2 tbsp soy sauce",
        "1 tbsp sesame oil",
        "2 cloves garlic, minced",
        "1 tsp ginger"
      ],
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Cook rice in broth until tender. Fluff with a fork and keep warm." },
        { "@type": "HowToStep", "text": "Marinate salmon in soy sauce, sesame oil, garlic, and ginger for 10 minutes. Sear in a hot pan 4 minutes per side, or bake at 400°F for 12–15 minutes." },
        { "@type": "HowToStep", "text": "Serve salmon over rice. Garnish with sesame seeds, sliced scallions, or a drizzle of extra soy sauce." }
      ],
      "prepTime": "PT15M",
      "cookTime": "PT30M",
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
            <li className="text-slate-600 font-medium">Salmon and Rice</li>
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
          <span className="inline-block bg-blue-100 text-blue-700 font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">🐟 Fish</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Salmon and Rice Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Healthy, flavor-packed salmon and rice dinners — weeknight-easy and restaurant-worthy.</p>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">What Can I Make With Salmon and Rice?</h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto text-center mb-8 leading-relaxed">This page contains 4 kosher pareve salmon and rice recipes — teriyaki, baked, fried rice, and grain bowl. All recipes are dairy-free and pareve. Ingredients are simple pantry staples with no specialty items required.</p>

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
              'Pat salmon completely dry before cooking — moisture prevents a good sear or roast.',
              'Remove salmon from the fridge 15 minutes before cooking — cold fish cooks unevenly and can be raw in the center.',
              'For baked salmon, 400°F for 12–15 minutes is the sweet spot (1 inch thick). It\'s done when it flakes easily.',
              "Don't overcook salmon — it should still be slightly translucent in the center when you pull it from the oven.",
              'Day-old rice works best for fried rice — fresh rice is too wet and clumps.',
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
              'Soy sauce ↔ tamari: Tamari is gluten-free and slightly less salty — a perfect 1:1 swap.',
              'Mirin ↔ dry rice wine + 1 tsp sugar: Adds the same sweet-savory balance to teriyaki sauce.',
              'Fresh salmon ↔ canned salmon: Drain and flake canned salmon for fried rice — works great and is more affordable.',
              'White rice ↔ brown rice: Adds more fiber and a nuttier flavor; cook separately per package directions.',
              'Rice vinegar ↔ apple cider vinegar (half the amount): A good backup with similar acidity.',
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
              'Cooked salmon keeps 2 days in the fridge — best eaten fresh or the next day.',
              'Reheat salmon in a 300°F oven for 10 minutes — microwave makes it rubbery and overpowering.',
              'Fried rice keeps 3 days in the fridge; reheat in a hot skillet with a splash of soy sauce.',
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
              { q: 'What rice goes best with salmon?', a: 'Short-grain white rice (sushi rice) for bowls, long-grain jasmine for teriyaki, and brown rice for a nuttier, healthier option.' },
              { q: 'How do I know when salmon is cooked?', a: 'It flakes easily with a fork and the color changes from translucent to opaque light pink. Internal temp: 125–130°F for medium, 145°F for well-done.' },
              { q: 'Can I use frozen salmon for these recipes?', a: 'Yes — thaw overnight in the fridge or under cold running water. Pat dry thoroughly before cooking.' },
              { q: 'How long does cooked salmon keep?', a: '2 days in the fridge in an airtight container. Salmon dries out quickly when reheated — best eaten fresh or the next day.' },
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
              { to: '/recipes/salmon', label: '🐟 Salmon Recipes' },
              { to: '/recipes/salmon-and-vegetables', label: '🥦 Salmon and Vegetables' },
              { to: '/recipes/chicken-and-rice', label: '🍚 Chicken and Rice' },
              { to: '/recipes/ground-turkey-and-rice', label: '🦃 Ground Turkey and Rice' },
              { to: '/recipes/shakshuka', label: '🍳 Shakshuka' },
              { to: '/recipes/lentil-soup', label: '🌿 Lentil Soup' },
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
            { to: '/recipes/salmon', label: '🐟 Salmon Recipes' },
            { to: '/recipes/salmon-and-vegetables', label: '🥦 Salmon and Vegetables' },
            { to: '/recipes/chicken-and-rice', label: '🍚 Chicken and Rice' },
            { to: '/recipes/ground-turkey-and-rice', label: '🦃 Ground Turkey and Rice' },
            { to: '/recipes/shakshuka', label: '🍳 Shakshuka' },
            { to: '/recipes/lentil-soup', label: '🌿 Lentil Soup' },
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

export default SalmonAndRice;
