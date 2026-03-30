import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare const window: Window & { gtag: (...args: unknown[]) => void };

type Tab = 'sheetpan' | 'roasted' | 'skillet' | 'crispypotatoes';

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
    title: 'Sheet Pan Chicken Thighs and Potatoes',
    description: 'Chicken thighs and potatoes roasted together with olive oil, garlic, rosemary, and paprika — minimal cleanup, maximum flavor.',
    time: '50 min',
    servings: '4 servings',
    ingredients: [
      '4 bone-in, skin-on chicken thighs',
      '1.5 lbs baby potatoes, halved',
      '4 cloves garlic, minced',
      '3 tbsp olive oil',
      '1 tsp smoked paprika',
      '1 tsp dried rosemary',
      '1 tsp garlic powder',
      '½ tsp onion powder',
      '½ tsp salt',
      '¼ tsp black pepper',
      '1 lemon, sliced into rounds',
      '2 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'Preheat oven to 425°F. Line a large sheet pan with foil and lightly oil it.',
      'Toss halved baby potatoes with 2 tbsp olive oil, garlic, smoked paprika, salt, and pepper. Spread on the pan.',
      'Pat chicken thighs completely dry with paper towels — this is key for crispy skin.',
      'Rub chicken with remaining 1 tbsp olive oil, rosemary, garlic powder, onion powder, salt, and pepper.',
      'Nestle chicken skin-side up on top of the potatoes. Tuck lemon slices around and under the chicken.',
      'Roast 40–45 minutes until chicken skin is golden and crispy and potatoes are tender.',
      'Check chicken reaches 165°F internal temperature at the thickest part.',
      'Rest 5 minutes before serving. Garnish with fresh parsley.',
    ],
  },
  roasted: {
    title: 'Oven-Roasted Chicken and Potatoes',
    description: 'Bone-in chicken pieces with baby potatoes, lemon, garlic, and fresh thyme — a classic Sunday roast made simple.',
    time: '1 hr 15 min',
    servings: '6 servings',
    ingredients: [
      '3 lbs bone-in chicken pieces (thighs and drumsticks)',
      '2 lbs baby potatoes or Yukon Gold, quartered',
      '6 cloves garlic, smashed',
      '1 large onion, cut into wedges',
      '3 tbsp olive oil',
      '1 lemon, juiced and zested',
      '1 tbsp fresh thyme leaves',
      '1 tsp dried oregano',
      '1 tsp salt',
      '½ tsp black pepper',
      '½ cup chicken broth',
      '2 tbsp fresh parsley, for serving',
    ],
    instructions: [
      'Preheat oven to 400°F. Pat chicken pieces completely dry with paper towels.',
      'In a large roasting pan, toss potatoes and onion wedges with 2 tbsp olive oil, garlic, salt, and pepper.',
      'Rub chicken pieces with remaining olive oil, lemon zest, thyme, oregano, salt, and pepper.',
      'Nestle chicken pieces skin-side up over the potatoes and onions.',
      'Pour lemon juice and chicken broth around the base of the pan.',
      'Roast 60–70 minutes until chicken is golden brown and potatoes are fork-tender.',
      'Check chicken reaches 165°F internal temperature. If skin isn\'t browned, broil 3–4 minutes.',
      'Rest 5 minutes, garnish with fresh parsley, and serve with pan juices.',
    ],
  },
  skillet: {
    title: 'One-Skillet Chicken and Potatoes',
    description: 'Chicken thighs and diced potatoes cooked in one skillet with onion, garlic, and smoked paprika — quick and hearty.',
    time: '40 min',
    servings: '4 servings',
    ingredients: [
      '4 boneless, skinless chicken thighs',
      '1.5 lbs Yukon Gold potatoes, cut into ¾-inch cubes',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '2 tbsp olive oil',
      '1 tsp smoked paprika',
      '½ tsp cumin',
      '½ tsp dried thyme',
      '½ tsp salt',
      '¼ tsp black pepper',
      '¼ cup chicken broth',
      '2 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'Season chicken thighs with smoked paprika, cumin, thyme, salt, and pepper on both sides.',
      'Heat olive oil in a large skillet over medium-high heat. Sear chicken 5–6 minutes per side until golden. Remove and set aside.',
      'Add diced onion to the same skillet; cook 3 minutes until softened.',
      'Add potatoes; cook undisturbed 3–4 minutes to develop a golden crust, then stir.',
      'Add garlic; cook 1 minute. Pour in chicken broth and scrape up any brown bits from the pan.',
      'Return chicken on top of the potatoes. Reduce heat to medium, cover, and cook 15 minutes.',
      'Uncover and cook 5 more minutes until potatoes are tender and liquid has reduced.',
      'Check chicken reaches 165°F. Garnish with parsley and serve.',
    ],
  },
  crispypotatoes: {
    title: 'Crispy Chicken and Potatoes',
    description: 'High-heat roasted chicken and potatoes that come out crackling crispy — better than fried, half the effort.',
    time: '45 min',
    servings: '4 servings',
    ingredients: [
      '4 bone-in, skin-on chicken thighs',
      '1.5 lbs small potatoes, halved',
      '3 tbsp olive oil',
      '4 cloves garlic, minced',
      '1 tsp garlic powder',
      '1 tsp smoked paprika',
      '½ tsp onion powder',
      '½ tsp dried thyme',
      '½ tsp salt',
      '¼ tsp black pepper',
      '1 tbsp apple cider vinegar',
      '2 tbsp fresh chives, chopped',
    ],
    instructions: [
      'Preheat oven to 450°F. Place a rimmed sheet pan in the oven while it heats — this ensures a hot surface.',
      'Pat chicken thighs completely dry. Mix garlic powder, smoked paprika, onion powder, thyme, salt, and pepper.',
      'Rub chicken all over with 1.5 tbsp olive oil and the spice mixture.',
      'Toss potatoes with remaining 1.5 tbsp olive oil, minced garlic, and apple cider vinegar.',
      'Carefully remove the hot pan from the oven. Place potatoes cut-side down on the pan.',
      'Place chicken skin-side up on the pan, not touching the potatoes.',
      'Roast 35–40 minutes until skin is deep golden-brown and potatoes are crispy on the bottom.',
      'Check chicken reaches 165°F. Rest 5 minutes, garnish with chives, and serve.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'sheetpan', label: 'Sheet Pan' },
  { key: 'roasted', label: 'Roasted' },
  { key: 'skillet', label: 'Skillet' },
  { key: 'crispypotatoes', label: 'Crispy Chicken & Potatoes' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const ChickenAndPotatoes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('sheetpan');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Chicken and Potatoes Recipes (Sheet Pan, Roasted, One-Pan) | PantryPivot';
    const PAGE_DESC = 'Easy chicken and potatoes recipes — sheet pan, roasted, one-pan skillet, and more. Simple weeknight dinners the whole family loves.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/chicken-and-potatoes';
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
      "name": "Sheet Pan Chicken Thighs and Potatoes",
      "description": "Chicken thighs and potatoes roasted together with olive oil, garlic, rosemary, and paprika — minimal cleanup, maximum flavor.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT45M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "chicken and potatoes, sheet pan chicken, roasted chicken potatoes, one pan dinner, dairy-free chicken",
      "url": "https://pantrypivot.com/recipes/chicken-and-potatoes",
      "recipeIngredient": [
        "4 bone-in, skin-on chicken thighs",
        "1.5 lbs baby potatoes, halved",
        "4 cloves garlic, minced",
        "3 tbsp olive oil",
        "1 tsp smoked paprika",
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Preheat oven to 425°F. Line a large sheet pan with foil and lightly oil it." },
        { "@type": "HowToStep", "text": "Toss potatoes with olive oil, garlic, smoked paprika, salt, and pepper. Spread on the pan." },
        { "@type": "HowToStep", "text": "Pat chicken dry. Rub with olive oil, rosemary, garlic powder, onion powder, salt, and pepper." },
        { "@type": "HowToStep", "text": "Nestle chicken skin-side up on potatoes. Roast 40–45 minutes until golden and cooked through." },
        { "@type": "HowToStep", "text": "Check chicken reaches 165°F. Rest 5 minutes and serve garnished with parsley." },
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
        { "@type": "Question", "name": "How do I stop potatoes from getting soggy?", "acceptedAnswer": { "@type": "Answer", "text": "Make sure the pan isn't overcrowded, potatoes are dry before seasoning, and the oven is hot (400°F+). A drizzle of oil helps crisp the exterior." } },
        { "@type": "Question", "name": "Can I use sweet potatoes instead of regular potatoes?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — sweet potatoes cook faster, so check them at 25–30 minutes. They pair especially well with chicken, smoked paprika, and cumin." } },
        { "@type": "Question", "name": "What temperature should I bake chicken and potatoes?", "acceptedAnswer": { "@type": "Answer", "text": "400–425°F (200–220°C) for most recipes. High heat crisps the chicken skin and caramelizes the potatoes." } },
        { "@type": "Question", "name": "Do I need to pre-cook potatoes before adding chicken?", "acceptedAnswer": { "@type": "Answer", "text": "Only if using large whole potatoes. Diced 1-inch potatoes roast at the same rate as bone-in chicken thighs — both take about 40–50 minutes." } },
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
            <li className="text-slate-600 font-medium">Chicken and Potatoes</li>
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
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Chicken and Potatoes Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">One-pan chicken and potatoes dinners — minimal cleanup, maximum flavor.</p>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">What Can I Make With Chicken and Potatoes?</h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto text-center mb-8 leading-relaxed">This page contains 4 kosher meat chicken and potato recipes — sheet pan, roasted, skillet, and crispy potato variations. All recipes are dairy-free. Ingredients are simple pantry staples with no specialty items required.</p>

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
              'Cut potatoes into uniform pieces so they cook evenly — 1-inch cubes work best for sheet pan dinners.',
              'Pat chicken dry with paper towels before seasoning — moisture on the skin prevents browning.',
              'Start potatoes 10 minutes before the chicken on a sheet pan if using large chunks — potatoes take longer.',
              "Don't crowd the pan. Use two sheet pans if needed so everything roasts rather than steams.",
              'Deglaze the skillet with 2–3 tbsp chicken broth after searing — the fond (brown bits) adds enormous flavor.',
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
              'Chicken thighs ↔ chicken drumsticks: Same cook time. Drumsticks are budget-friendly and stay juicy.',
              'Russet potatoes ↔ Yukon Gold: Yukon Golds have a creamier texture and thinner skin (no need to peel).',
              'Fresh rosemary ↔ dried rosemary: Use ½ the amount — dried herbs are more concentrated.',
              'Olive oil ↔ avocado oil: Both work well at high heat for roasting.',
              'Fresh garlic ↔ garlic powder: Use ¼ tsp garlic powder per clove when short on time.',
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
              'Refrigerate in an airtight container for up to 3–4 days.',
              'Reheat in 375°F oven for 12–15 minutes to re-crisp the potatoes and skin.',
              'Microwave works but potatoes lose their crispiness — oven reheating is strongly preferred.',
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
              { q: 'How do I stop potatoes from getting soggy?', a: "Make sure the pan isn't overcrowded, potatoes are dry before seasoning, and the oven is hot (400°F+). A drizzle of oil helps crisp the exterior." },
              { q: 'Can I use sweet potatoes instead of regular potatoes?', a: 'Yes — sweet potatoes cook faster, so check them at 25–30 minutes. They pair especially well with chicken, smoked paprika, and cumin.' },
              { q: 'What temperature should I bake chicken and potatoes?', a: '400–425°F (200–220°C) for most recipes. High heat crisps the chicken skin and caramelizes the potatoes.' },
              { q: 'Do I need to pre-cook potatoes before adding chicken?', a: 'Only if using large whole potatoes. Diced 1-inch potatoes roast at the same rate as bone-in chicken thighs — both take about 40–50 minutes.' },
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
              { to: '/recipes/roast-chicken', label: '🍗 Roast Chicken' },
              { to: '/recipes/air-fryer-chicken', label: '🍗 Air Fryer Chicken' },
              { to: '/recipes/chicken-and-rice', label: '🍚 Chicken and Rice' },
              { to: '/recipes/baked-chicken-thighs', label: '🍗 Baked Chicken Thighs' },
              { to: '/recipes/one-pan-chicken', label: '🍳 One-Pan Chicken' },
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
            { to: '/recipes/roast-chicken', label: '🍗 Roast Chicken' },
            { to: '/recipes/air-fryer-chicken', label: '🍗 Air Fryer Chicken' },
            { to: '/recipes/chicken-and-rice', label: '🍚 Chicken and Rice' },
            { to: '/recipes/baked-chicken-thighs', label: '🍗 Baked Chicken Thighs' },
            { to: '/recipes/one-pan-chicken', label: '🍳 One-Pan Chicken' },
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

export default ChickenAndPotatoes;
