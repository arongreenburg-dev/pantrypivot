import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare const window: Window & { gtag: (...args: unknown[]) => void };

type Tab = 'lemonherb' | 'garlic' | 'mediterranean' | 'harvest';

interface Recipe {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

const recipes: Record<Tab, Recipe> = {
  lemonherb: {
    title: 'One-Pan Lemon Herb Chicken',
    description: 'Chicken thighs, potatoes, lemon, rosemary, and thyme all cooked in one skillet — a complete dinner with almost no cleanup.',
    time: '50 min',
    servings: '4 servings',
    ingredients: [
      '4 bone-in, skin-on chicken thighs',
      '1 lb baby potatoes, halved',
      '1 head garlic, cloves smashed',
      '1 lemon, sliced into rounds',
      '2 tbsp fresh rosemary, chopped',
      '1 tbsp fresh thyme leaves',
      '3 tbsp olive oil',
      '½ tsp smoked paprika',
      '½ tsp salt',
      '¼ tsp black pepper',
      '½ cup chicken broth',
      '2 tbsp fresh parsley, for serving',
    ],
    instructions: [
      'Preheat oven to 400°F. Pat chicken thighs completely dry.',
      'Season chicken with smoked paprika, salt, and pepper.',
      'Heat 2 tbsp olive oil in a large oven-safe skillet over medium-high heat.',
      'Sear chicken skin-side down 5–6 minutes until deep golden brown. Remove and set aside.',
      'Add potatoes and smashed garlic to the skillet; toss with remaining olive oil, rosemary, and thyme.',
      'Pour in chicken broth and nestle lemon slices among the potatoes.',
      'Return chicken skin-side up on top of the potatoes.',
      'Transfer to the oven; roast 30–35 minutes until chicken reaches 165°F and potatoes are tender.',
      'Rest 5 minutes. Garnish with fresh parsley and serve directly from the pan.',
    ],
  },
  garlic: {
    title: 'One-Pan Garlic Chicken and Green Beans',
    description: 'Chicken thighs with crispy green beans and a garlic-soy glaze — a fast, clean, complete meal in one pan.',
    time: '40 min',
    servings: '4 servings',
    ingredients: [
      '4 bone-in, skin-on chicken thighs',
      '1 lb green beans, trimmed',
      '6 cloves garlic, minced',
      '2 tbsp soy sauce',
      '1 tbsp honey',
      '2 tbsp olive oil',
      '1 tsp smoked paprika',
      '½ tsp garlic powder',
      '½ tsp salt',
      '¼ tsp black pepper',
      '½ cup chicken broth',
      '2 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'Preheat oven to 425°F.',
      'Pat chicken thighs dry. Season with smoked paprika, garlic powder, salt, and pepper.',
      'Heat olive oil in a large oven-safe skillet over medium-high heat.',
      'Sear chicken skin-side down 5 minutes until golden. Flip and cook 2 more minutes. Remove.',
      'Add garlic to the pan; cook 30 seconds. Add soy sauce, honey, and chicken broth; scrape up any brown bits.',
      'Add green beans; toss to coat.',
      'Return chicken skin-side up on top of the green beans.',
      'Roast 20–25 minutes until chicken reaches 165°F and green beans are tender.',
      'Garnish with parsley and serve.',
    ],
  },
  mediterranean: {
    title: 'One-Pan Mediterranean Chicken',
    description: 'Chicken with cherry tomatoes, olives, artichoke hearts, and garlic — a vibrant Mediterranean dinner in one pan.',
    time: '50 min',
    servings: '4 servings',
    ingredients: [
      '4 bone-in, skin-on chicken thighs',
      '1 cup cherry tomatoes',
      '½ cup kalamata olives, pitted',
      '1 can (14 oz) artichoke hearts, drained and halved',
      '1 large onion, sliced',
      '4 cloves garlic, minced',
      '3 tbsp olive oil',
      '1 tsp dried oregano',
      '½ tsp smoked paprika',
      '½ tsp salt',
      '¼ tsp black pepper',
      '¼ cup chicken broth',
      '2 tbsp fresh parsley, for serving',
    ],
    instructions: [
      'Preheat oven to 400°F.',
      'Pat chicken thighs dry. Season with smoked paprika, oregano, salt, and pepper.',
      'Heat 2 tbsp olive oil in a large oven-safe skillet over medium-high heat.',
      'Sear chicken skin-side down 5–6 minutes until golden. Remove.',
      'Add sliced onion to the pan; cook 3 minutes. Add garlic; cook 1 minute.',
      'Add cherry tomatoes, olives, and artichoke hearts; stir to combine. Add chicken broth.',
      'Nestle chicken skin-side up on top of the vegetable mixture.',
      'Roast 30–35 minutes until chicken reaches 165°F and tomatoes have burst.',
      'Drizzle remaining olive oil over the top. Garnish with parsley and serve.',
    ],
  },
  harvest: {
    title: 'One-Pan Harvest Chicken',
    description: 'Chicken thighs with apples, sweet potato, red onion, and cranberries with rosemary and maple — a stunning fall dinner.',
    time: '55 min',
    servings: '4 servings',
    ingredients: [
      '4 bone-in, skin-on chicken thighs',
      '1 large sweet potato, cut into 1-inch cubes',
      '2 medium apples (Honeycrisp or Granny Smith), cut into wedges',
      '1 large red onion, cut into wedges',
      '¼ cup dried cranberries',
      '2 tbsp olive oil',
      '1 tbsp maple syrup',
      '1 tsp fresh rosemary, chopped',
      '½ tsp cinnamon',
      '½ tsp smoked paprika',
      '½ tsp salt',
      '¼ tsp black pepper',
      '2 tbsp fresh thyme leaves, for serving',
    ],
    instructions: [
      'Preheat oven to 400°F.',
      'Pat chicken thighs completely dry. Season with smoked paprika, cinnamon, salt, and pepper.',
      'Toss sweet potato, apples, and red onion with olive oil, maple syrup, rosemary, and a pinch of salt.',
      'Spread the vegetable and apple mixture on a large sheet pan or in a roasting pan.',
      'Nestle chicken skin-side up on top of the mixture.',
      'Scatter dried cranberries around the pan.',
      'Roast 45–50 minutes until chicken is golden and cooked through (165°F) and sweet potato is tender.',
      'Rest 5 minutes. Garnish with fresh thyme and serve.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'lemonherb', label: 'Lemon Herb' },
  { key: 'garlic', label: 'Garlic & Green Beans' },
  { key: 'mediterranean', label: 'Mediterranean' },
  { key: 'harvest', label: 'Harvest' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const OnePanChicken: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('lemonherb');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'One-Pan Chicken Recipes (Easy Weeknight Dinners) | PantryPivot';
    const PAGE_DESC = 'Easy one-pan chicken recipes — lemon herb, garlic, Mediterranean, and harvest. Simple weeknight dinners with minimal cleanup.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/one-pan-chicken';
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
      "name": "One-Pan Lemon Herb Chicken",
      "description": "Chicken thighs, potatoes, lemon, rosemary, and thyme all cooked in one skillet — a complete dinner with almost no cleanup.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT40M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "one pan chicken, easy chicken dinner, skillet chicken, lemon herb chicken, dairy-free chicken",
      "url": "https://pantrypivot.com/recipes/one-pan-chicken",
      "recipeIngredient": [
        "4 bone-in, skin-on chicken thighs",
        "1 lb baby potatoes, halved",
        "1 head garlic, cloves smashed",
        "1 lemon, sliced into rounds",
        "2 tbsp fresh rosemary, chopped",
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Sear chicken skin-side down in an oven-safe skillet 5–6 minutes. Remove." },
        { "@type": "HowToStep", "text": "Toss potatoes and garlic in the pan. Add broth and lemon slices." },
        { "@type": "HowToStep", "text": "Return chicken skin-side up on top of potatoes." },
        { "@type": "HowToStep", "text": "Roast at 400°F for 30–35 minutes until chicken is 165°F." },
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
        { "@type": "Question", "name": "What pan is best for one-pan chicken dinners?", "acceptedAnswer": { "@type": "Answer", "text": "A 12-inch oven-safe cast iron skillet is ideal — excellent heat retention and goes from stovetop to oven. A large stainless steel skillet works equally well." } },
        { "@type": "Question", "name": "How do I prevent vegetables from getting soggy in one-pan chicken?", "acceptedAnswer": { "@type": "Answer", "text": "Add denser vegetables (potatoes, carrots) at the start, and quick-cooking vegetables (cherry tomatoes, green beans) in the last 15–20 minutes." } },
        { "@type": "Question", "name": "Can I make one-pan chicken ahead?", "acceptedAnswer": { "@type": "Answer", "text": "You can prep everything (season chicken, cut vegetables) up to 24 hours ahead and refrigerate. Cook just before serving for best results." } },
        { "@type": "Question", "name": "How do I make a sauce from the one-pan drippings?", "acceptedAnswer": { "@type": "Answer", "text": "After removing chicken, heat the pan on the stovetop, add 2–3 tbsp chicken broth or water, and scrape up all the brown bits. The fond creates an instant pan sauce." } },
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
            <li className="text-slate-600 font-medium">One-Pan Chicken</li>
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
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">One-Pan Chicken Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Complete chicken dinners cooked in a single pan — minimal cleanup, maximum flavor.</p>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">What Can I Make With Chicken in One Pan?</h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto text-center mb-8 leading-relaxed">This page contains 4 kosher meat one-pan chicken recipes — lemon herb, garlic, Mediterranean, and harvest. All recipes are dairy-free. Ingredients are simple pantry staples with no specialty items required.</p>

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
              'Sear chicken skin-side down in an oven-safe skillet first, then add vegetables and transfer the whole pan to the oven.',
              'An oven-safe cast iron or stainless skillet is ideal — they go from stovetop to oven seamlessly.',
              'Add any high-moisture vegetables (tomatoes, zucchini) in the last 15–20 minutes to prevent them becoming mushy.',
              'Nestle vegetables under the chicken so they\'re basted by drippings during roasting.',
              'One-pan meals benefit from resting 5 minutes before serving — the juices pool in the pan and make a natural sauce.',
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
              'Chicken thighs ↔ drumsticks: Same cook time and similar flavor profile.',
              'Rosemary ↔ thyme: Both are classic herb partners for chicken; thyme is slightly more delicate.',
              'Green beans ↔ asparagus: Asparagus cooks a bit faster — add in the last 10–12 minutes.',
              'Kalamata olives ↔ capers: Capers are saltier; start with 2 tbsp and adjust to taste.',
              'Sweet potato ↔ butternut squash: Similar sweetness and texture; cut to the same size.',
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
              'Reheat in a 375°F oven for 15 minutes — the pan drippings help keep everything moist.',
              'The Mediterranean and lemon herb versions also reheat well on the stovetop over medium-low heat.',
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
              { q: 'What pan is best for one-pan chicken dinners?', a: 'A 12-inch oven-safe cast iron skillet is ideal — excellent heat retention and goes from stovetop to oven. A large stainless steel skillet works equally well.' },
              { q: 'How do I prevent vegetables from getting soggy in one-pan chicken?', a: 'Add denser vegetables (potatoes, carrots) at the start, and quick-cooking vegetables (cherry tomatoes, green beans) in the last 15–20 minutes.' },
              { q: 'Can I make one-pan chicken ahead?', a: 'You can prep everything (season chicken, cut vegetables) up to 24 hours ahead and refrigerate. Cook just before serving for best results.' },
              { q: 'How do I make a sauce from the one-pan drippings?', a: 'After removing chicken, heat the pan on the stovetop, add 2–3 tbsp chicken broth or water, and scrape up all the brown bits. The fond creates an instant pan sauce.' },
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
              { to: '/recipes/baked-chicken-thighs', label: '🍗 Baked Chicken Thighs' },
              { to: '/recipes/chicken-and-potatoes', label: '🥔 Chicken and Potatoes' },
              { to: '/recipes/air-fryer-chicken', label: '🍗 Air Fryer Chicken' },
              { to: '/recipes/chicken-and-rice', label: '🍚 Chicken and Rice' },
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
            { to: '/recipes/baked-chicken-thighs', label: '🍗 Baked Chicken Thighs' },
            { to: '/recipes/chicken-and-potatoes', label: '🥔 Chicken and Potatoes' },
            { to: '/recipes/air-fryer-chicken', label: '🍗 Air Fryer Chicken' },
            { to: '/recipes/chicken-and-rice', label: '🍚 Chicken and Rice' },
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

export default OnePanChicken;
