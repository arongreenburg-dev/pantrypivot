import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare const window: Window & { gtag: (...args: unknown[]) => void };

type Tab = 'classic' | 'honeygarlic' | 'lemonherb' | 'spicy';

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
    title: 'Classic Crispy Baked Chicken Thighs',
    description: 'Bone-in, skin-on chicken thighs seasoned with smoked paprika, garlic, and onion powder — crispy skin, juicy meat, every time.',
    time: '45 min',
    servings: '4 servings',
    ingredients: [
      '4 bone-in, skin-on chicken thighs (about 2.5 lbs)',
      '2 tbsp olive oil',
      '1 tsp smoked paprika',
      '1 tsp garlic powder',
      '1 tsp onion powder',
      '½ tsp dried thyme',
      '½ tsp salt',
      '¼ tsp black pepper',
      '¼ tsp cayenne pepper (optional)',
      '1 lemon, cut into wedges, for serving',
      '2 tbsp fresh parsley, chopped, for serving',
    ],
    instructions: [
      'Preheat oven to 425°F. Line a rimmed baking sheet with foil and place a wire rack on top (optional, for maximum crispiness).',
      'Pat chicken thighs completely dry with paper towels — thoroughly dry skin is essential for crispiness.',
      'Mix smoked paprika, garlic powder, onion powder, thyme, salt, pepper, and cayenne.',
      'Rub chicken all over with olive oil, then coat evenly with the spice mixture.',
      'Place chicken skin-side up on the prepared pan. Do not overlap.',
      'Bake 40–45 minutes without flipping until skin is deep golden brown and crispy.',
      'Check that internal temperature reaches 165°F at the thickest part (not touching bone).',
      'Let rest 5 minutes — this is when the skin firms up fully. Serve with lemon wedges and parsley.',
    ],
  },
  honeygarlic: {
    title: 'Honey Garlic Baked Chicken Thighs',
    description: 'Chicken thighs glazed with honey, soy sauce, garlic, and apple cider vinegar — sticky, sweet, and irresistible.',
    time: '45 min',
    servings: '4 servings',
    ingredients: [
      '4 bone-in, skin-on chicken thighs',
      '3 tbsp honey',
      '2 tbsp soy sauce',
      '5 cloves garlic, minced',
      '1 tbsp apple cider vinegar',
      '1 tbsp olive oil',
      '1 tsp smoked paprika',
      '½ tsp garlic powder',
      '½ tsp salt',
      '¼ tsp black pepper',
      '1 tbsp fresh thyme leaves',
      '1 tbsp fresh parsley, for serving',
    ],
    instructions: [
      'Preheat oven to 425°F. Pat chicken thighs completely dry.',
      'Mix honey garlic sauce: honey, soy sauce, minced garlic, and apple cider vinegar.',
      'Season chicken with smoked paprika, garlic powder, salt, and pepper.',
      'Heat olive oil in an oven-safe skillet over medium-high heat. Sear chicken skin-side down 4–5 minutes until golden. Flip.',
      'Pour honey garlic sauce over the chicken. Scatter fresh thyme around.',
      'Transfer to the oven. Bake 25–30 minutes, basting with pan sauce halfway through.',
      'Check internal temperature reaches 165°F.',
      'Spoon pan juices over chicken, garnish with parsley, and serve.',
    ],
  },
  lemonherb: {
    title: 'Lemon Herb Baked Chicken Thighs',
    description: 'Chicken thighs marinated in lemon zest, fresh rosemary, thyme, and garlic — bright, aromatic, and completely dairy-free.',
    time: '45 min',
    servings: '4 servings',
    ingredients: [
      '4 bone-in, skin-on chicken thighs',
      '3 tbsp olive oil',
      '2 tbsp fresh lemon juice',
      '1 tsp lemon zest',
      '4 cloves garlic, minced',
      '1 tbsp fresh rosemary, finely chopped',
      '1 tbsp fresh thyme leaves',
      '½ tsp onion powder',
      '½ tsp salt',
      '¼ tsp black pepper',
      '1 lemon, sliced into rounds',
      '2 tbsp fresh parsley, for serving',
    ],
    instructions: [
      'Preheat oven to 425°F.',
      'Mix marinade: olive oil, lemon juice, lemon zest, garlic, rosemary, thyme, onion powder, salt, and pepper.',
      'Pat chicken thighs completely dry.',
      'Coat chicken all over with the herb marinade. (Marinate 30 minutes to overnight in the fridge for deeper flavor, or bake immediately.)',
      'Place chicken skin-side up in a baking dish or sheet pan. Lay lemon slices under and around the chicken.',
      'Bake 40–45 minutes until skin is golden and internal temperature reaches 165°F.',
      'Let rest 5 minutes.',
      'Spoon any pan juices over the chicken. Garnish with fresh parsley and serve with the roasted lemon slices.',
    ],
  },
  spicy: {
    title: 'Spicy Baked Chicken Thighs',
    description: 'Chicken thighs with hot sauce, smoked paprika, cayenne, brown sugar, and lime — sweet heat with a caramelized glaze.',
    time: '45 min',
    servings: '4 servings',
    ingredients: [
      '4 bone-in, skin-on chicken thighs',
      '2 tbsp hot sauce (Frank\'s or Tabasco)',
      '1 tbsp olive oil',
      '1 tbsp brown sugar',
      '1 tsp smoked paprika',
      '½ tsp cayenne pepper',
      '½ tsp garlic powder',
      '½ tsp onion powder',
      '½ tsp salt',
      '¼ tsp black pepper',
      '1 lime, juiced',
      '2 tbsp fresh cilantro, for serving',
    ],
    instructions: [
      'Preheat oven to 425°F. Pat chicken completely dry.',
      'Mix spice rub: brown sugar, smoked paprika, cayenne, garlic powder, onion powder, salt, and pepper.',
      'Mix hot sauce, olive oil, and lime juice.',
      'Brush chicken all over with the hot sauce mixture.',
      'Coat chicken evenly with the dry spice rub, pressing to adhere.',
      'Place skin-side up on a foil-lined baking sheet.',
      'Bake 40–45 minutes until skin is deep brown and caramelized, and internal temp reaches 165°F.',
      'Rest 5 minutes. Garnish with fresh cilantro and a squeeze of lime.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'classic', label: 'Classic Crispy' },
  { key: 'honeygarlic', label: 'Honey Garlic' },
  { key: 'lemonherb', label: 'Lemon Herb' },
  { key: 'spicy', label: 'Spicy' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const BakedChickenThighs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('classic');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Baked Chicken Thighs Recipes (Crispy, Honey Garlic, Lemon Herb) | PantryPivot';
    const PAGE_DESC = 'Easy baked chicken thigh recipes — crispy classic, honey garlic, lemon herb, and spicy. Juicy, flavorful chicken in 45 minutes.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/baked-chicken-thighs';
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
      "name": "Classic Crispy Baked Chicken Thighs",
      "description": "Bone-in, skin-on chicken thighs seasoned with smoked paprika, garlic, and onion powder — crispy skin, juicy meat, every time.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT5M",
      "cookTime": "PT45M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "baked chicken thighs, crispy baked chicken, honey garlic chicken thighs, oven chicken thighs, dairy-free chicken",
      "url": "https://pantrypivot.com/recipes/baked-chicken-thighs",
      "recipeIngredient": [
        "4 bone-in, skin-on chicken thighs",
        "2 tbsp olive oil",
        "1 tsp smoked paprika",
        "1 tsp garlic powder",
        "1 tsp onion powder",
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Preheat oven to 425°F. Pat chicken thighs completely dry." },
        { "@type": "HowToStep", "text": "Rub with olive oil and coat with spice mixture." },
        { "@type": "HowToStep", "text": "Bake skin-side up 40–45 minutes without flipping." },
        { "@type": "HowToStep", "text": "Check internal temp is 165°F. Rest 5 minutes and serve." },
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
        { "@type": "Question", "name": "What temperature should I bake chicken thighs?", "acceptedAnswer": { "@type": "Answer", "text": "425°F (220°C) for crispy skin and juicy meat. Bone-in thighs are done when they reach 165°F internal temperature — usually 40–45 minutes." } },
        { "@type": "Question", "name": "Do I need to flip chicken thighs while baking?", "acceptedAnswer": { "@type": "Answer", "text": "No — bake skin-side up the entire time. Flipping interrupts the skin crisping process and can tear it." } },
        { "@type": "Question", "name": "Why is my baked chicken skin not crispy?", "acceptedAnswer": { "@type": "Answer", "text": "The skin was wet before baking, the oven temperature was too low, or the pan was overcrowded. Pat dry, bake at 425°F, and don't crowd the pan." } },
        { "@type": "Question", "name": "Can I use boneless chicken thighs for these recipes?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — reduce the bake time by about 10 minutes. Boneless skinless thighs are done at 165°F, typically in 25–30 minutes at 425°F." } },
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
            <li className="text-slate-600 font-medium">Baked Chicken Thighs</li>
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
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Baked Chicken Thighs Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Juicy, crispy-skinned baked chicken thighs — four flavors, one foolproof method.</p>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">What Can I Make With Chicken Thighs?</h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto text-center mb-8 leading-relaxed">This page contains 4 kosher meat baked chicken thigh recipes — garlic herb, lemon, honey mustard, and spiced variations. All recipes are dairy-free. Ingredients are simple pantry staples with no specialty items required.</p>

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
              'Pat chicken completely dry before seasoning — this is the single most important step for crispy skin.',
              'Bake at 425°F (not 350°F) — high heat renders the fat and crisps the skin. Low heat steams it.',
              'Bone-in, skin-on thighs are far more forgiving than breasts — hard to overcook and stay juicy.',
              'Let chicken rest 5 minutes after baking — the juices redistribute and the skin firms up even more.',
              "Start skin-side up and don't flip — rotating creates uneven browning and tears the skin.",
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
              'Bone-in thighs ↔ boneless thighs: Reduce cook time by 10 minutes at the same temperature.',
              'Honey ↔ maple syrup: Works just as well for glazing and adds a slightly earthier sweetness.',
              'Fresh rosemary ↔ dried rosemary: Use ½ tsp dried for every 1 tbsp fresh.',
              'Olive oil ↔ avocado oil: Both perform well at high heat for roasting.',
              'Lemon ↔ orange: Orange zest and juice create a sweeter, slightly different citrus profile.',
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
              'Reheat in a 375°F oven for 12–15 minutes — skin re-crisps beautifully in the oven.',
              'Microwave reheating works but skin will lose its crispiness — oven is strongly preferred.',
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
              { q: 'What temperature should I bake chicken thighs?', a: '425°F (220°C) for crispy skin and juicy meat. Bone-in thighs are done when they reach 165°F internal temperature — usually 40–45 minutes.' },
              { q: 'Do I need to flip chicken thighs while baking?', a: 'No — bake skin-side up the entire time. Flipping interrupts the skin crisping process and can tear it.' },
              { q: 'Why is my baked chicken skin not crispy?', a: "The skin was wet before baking, the oven temperature was too low, or the pan was overcrowded. Pat dry, bake at 425°F, and don't crowd the pan." },
              { q: 'Can I use boneless chicken thighs for these recipes?', a: 'Yes — reduce the bake time by about 10 minutes. Boneless skinless thighs are done at 165°F, typically in 25–30 minutes at 425°F.' },
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
              { to: '/recipes/air-fryer-chicken', label: '🍗 Air Fryer Chicken' },
              { to: '/recipes/roast-chicken', label: '🍗 Roast Chicken' },
              { to: '/recipes/crockpot-chicken', label: '🍲 Crockpot Chicken' },
              { to: '/recipes/chicken-and-potatoes', label: '🥔 Chicken and Potatoes' },
              { to: '/recipes/one-pan-chicken', label: '🍳 One-Pan Chicken' },
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
            { to: '/recipes/air-fryer-chicken', label: '🍗 Air Fryer Chicken' },
            { to: '/recipes/roast-chicken', label: '🍗 Roast Chicken' },
            { to: '/recipes/crockpot-chicken', label: '🍲 Crockpot Chicken' },
            { to: '/recipes/chicken-and-potatoes', label: '🥔 Chicken and Potatoes' },
            { to: '/recipes/one-pan-chicken', label: '🍳 One-Pan Chicken' },
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

export default BakedChickenThighs;
