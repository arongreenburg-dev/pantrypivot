import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare const window: Window & { gtag: (...args: unknown[]) => void };

type Tab = 'sheetpan' | 'stirfry' | 'roasted' | 'soup';

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
    title: 'Sheet Pan Chicken and Vegetables',
    description: 'Chicken thighs roasted with zucchini, bell pepper, onion, and cherry tomatoes — Italian seasoning, one pan, easy cleanup.',
    time: '45 min',
    servings: '4 servings',
    ingredients: [
      '4 bone-in, skin-on chicken thighs',
      '1 medium zucchini, sliced into half-moons',
      '2 bell peppers (any color), cut into 1-inch pieces',
      '1 large red onion, cut into wedges',
      '1 cup cherry tomatoes',
      '4 cloves garlic, minced',
      '3 tbsp olive oil',
      '1.5 tsp Italian seasoning',
      '1 tsp smoked paprika',
      '½ tsp garlic powder',
      '½ tsp salt',
      '¼ tsp black pepper',
    ],
    instructions: [
      'Preheat oven to 425°F. Line a large sheet pan with foil.',
      'Pat chicken thighs completely dry with paper towels.',
      'Toss zucchini, bell peppers, and red onion with 2 tbsp olive oil, Italian seasoning, half the garlic, salt, and pepper. Spread on the sheet pan.',
      'Rub chicken with remaining olive oil, smoked paprika, garlic powder, remaining garlic, salt, and pepper.',
      'Nestle chicken skin-side up on top of the vegetables.',
      'Roast 35 minutes, then scatter cherry tomatoes around the pan.',
      'Roast 8–10 more minutes until chicken skin is golden and internal temp reaches 165°F.',
      'Let rest 5 minutes and serve straight from the pan.',
    ],
  },
  stirfry: {
    title: 'Chicken and Vegetable Stir-Fry',
    description: 'Quick stir-fry with snap peas, carrots, and bell pepper in a garlic-ginger soy sauce — better than takeout in 25 minutes.',
    time: '25 min',
    servings: '4 servings',
    ingredients: [
      '1.5 lbs boneless skinless chicken breast, sliced thin',
      '1 cup sugar snap peas',
      '2 medium carrots, julienned',
      '1 red bell pepper, sliced',
      '1 yellow bell pepper, sliced',
      '3 cloves garlic, minced',
      '1 tbsp fresh ginger, grated',
      '3 tbsp soy sauce',
      '1 tbsp oyster sauce',
      '1 tsp sesame oil',
      '2 tbsp vegetable oil',
      '1 tbsp cornstarch',
    ],
    instructions: [
      'Mix sauce: combine soy sauce, oyster sauce, ½ tbsp cornstarch, and 2 tbsp water in a small bowl.',
      'Toss chicken with remaining cornstarch.',
      'Heat vegetable oil in a wok over high heat until smoking.',
      'Add chicken in a single layer; stir-fry 5–6 minutes until golden and cooked through. Remove and set aside.',
      'Add carrots to the wok; stir-fry 2 minutes.',
      'Add bell peppers and snap peas; stir-fry 2 minutes.',
      'Push vegetables to the side. Add garlic and ginger; cook 30 seconds.',
      'Return chicken to pan. Pour sauce over everything; toss 1–2 minutes until thickened. Drizzle with sesame oil and serve over rice.',
    ],
  },
  roasted: {
    title: 'Oven-Roasted Chicken with Root Vegetables',
    description: 'Chicken pieces roasted with carrots, parsnip, and sweet potato — hearty, earthy, and deeply satisfying.',
    time: '1 hr',
    servings: '6 servings',
    ingredients: [
      '3 lbs bone-in chicken pieces (thighs and drumsticks)',
      '3 large carrots, cut into 1-inch pieces',
      '2 medium parsnips, peeled and cut into 1-inch pieces',
      '1 large sweet potato, cubed',
      '1 large onion, cut into wedges',
      '5 cloves garlic, smashed',
      '3 tbsp olive oil',
      '1 tbsp fresh thyme leaves',
      '1 tsp dried rosemary',
      '1 tsp smoked paprika',
      '½ tsp salt',
      '¼ tsp black pepper',
    ],
    instructions: [
      'Preheat oven to 400°F.',
      'Pat chicken pieces completely dry. Season all over with smoked paprika, salt, and pepper.',
      'Toss carrots, parsnips, sweet potato, onion, and garlic with 2 tbsp olive oil, thyme, rosemary, salt, and pepper.',
      'Spread vegetables in a large roasting pan. Nestle chicken pieces skin-side up on top.',
      'Drizzle remaining olive oil over the chicken.',
      'Roast 55–65 minutes until chicken is deep golden brown and root vegetables are tender.',
      'Check chicken reaches 165°F internal temperature.',
      'Rest 5 minutes before serving with the pan juices spooned over.',
    ],
  },
  soup: {
    title: 'Light Chicken and Vegetable Soup',
    description: 'A clean, light chicken soup packed with zucchini, green beans, carrots, celery, and tomatoes — restorative and easy.',
    time: '50 min',
    servings: '6 servings',
    ingredients: [
      '1.5 lbs boneless, skinless chicken breast',
      '2 medium zucchini, diced',
      '1 cup green beans, trimmed and halved',
      '3 medium carrots, sliced',
      '3 stalks celery, sliced',
      '1 can (14 oz) diced tomatoes',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '6 cups chicken broth',
      '1 tsp dried Italian seasoning',
      '½ tsp dried thyme',
      '½ tsp salt',
      '¼ tsp black pepper',
      '2 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'In a large pot, bring chicken broth to a simmer. Add chicken breasts and cook 18–20 minutes until cooked through.',
      'Remove chicken, let cool slightly, and shred with two forks.',
      'In the same broth, add olive oil, onion, carrots, and celery. Simmer 8 minutes.',
      'Add garlic, Italian seasoning, and thyme; cook 1 minute.',
      'Add diced tomatoes and green beans; simmer 10 minutes.',
      'Add zucchini; simmer 5 minutes more until just tender.',
      'Return shredded chicken to the pot. Season with salt and pepper.',
      'Ladle into bowls and garnish with fresh parsley.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'sheetpan', label: 'Sheet Pan' },
  { key: 'stirfry', label: 'Stir-Fry' },
  { key: 'roasted', label: 'Roasted' },
  { key: 'soup', label: 'Soup' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const ChickenAndVegetables: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('sheetpan');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Chicken and Vegetables Recipes (Sheet Pan, Stir-Fry, Roasted) | PantryPivot';
    const PAGE_DESC = 'Easy chicken and vegetable recipes — sheet pan roasted, stir-fry, and one-pan dinners. Healthy weeknight meals in 30–45 minutes.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/chicken-and-vegetables';
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
      "name": "Sheet Pan Chicken and Vegetables",
      "description": "Chicken thighs roasted with zucchini, bell pepper, onion, and cherry tomatoes — Italian seasoning, one pan, easy cleanup.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT45M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "chicken and vegetables, sheet pan chicken, healthy chicken dinner, one pan chicken, dairy-free chicken",
      "url": "https://pantrypivot.com/recipes/chicken-and-vegetables",
      "recipeIngredient": [
        "4 bone-in, skin-on chicken thighs",
        "1 medium zucchini, sliced into half-moons",
        "2 bell peppers, cut into 1-inch pieces",
        "1 large red onion, cut into wedges",
        "1 cup cherry tomatoes",
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Preheat oven to 425°F. Pat chicken dry and season with smoked paprika, garlic powder, salt, and pepper." },
        { "@type": "HowToStep", "text": "Toss vegetables with olive oil, Italian seasoning, salt, and pepper. Spread on sheet pan." },
        { "@type": "HowToStep", "text": "Nestle chicken skin-side up on vegetables. Roast 35 minutes." },
        { "@type": "HowToStep", "text": "Add cherry tomatoes. Roast 8–10 more minutes until chicken reaches 165°F." },
        { "@type": "HowToStep", "text": "Rest 5 minutes and serve." },
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
        { "@type": "Question", "name": "What vegetables go best with chicken?", "acceptedAnswer": { "@type": "Answer", "text": "Broccoli, zucchini, bell peppers, carrots, and onions are classics. Root vegetables like parsnips and sweet potato work beautifully roasted." } },
        { "@type": "Question", "name": "How do I stop vegetables from getting soggy in the oven?", "acceptedAnswer": { "@type": "Answer", "text": "High heat (400°F+), a single layer, and don't cover the pan. Crowding causes steaming — use two pans if needed." } },
        { "@type": "Question", "name": "Can I use frozen vegetables for chicken and vegetable stir-fry?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, but thaw and pat dry first. Add them after the chicken is cooked since they cook faster than fresh." } },
        { "@type": "Question", "name": "How long does chicken and vegetables keep?", "acceptedAnswer": { "@type": "Answer", "text": "3–4 days refrigerated in an airtight container. Sheet pan meals reheat best in the oven to preserve crispiness." } },
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
            <li className="text-slate-600 font-medium">Chicken and Vegetables</li>
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
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Chicken and Vegetables Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Simple, healthy chicken and vegetable dinners — one pan, minimal cleanup.</p>
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
              'Cut vegetables to similar sizes so they cook evenly — small pieces for quick-cooking veggies, larger for dense ones.',
              'Roast vegetables at 425°F — lower temperatures steam rather than caramelize.',
              'For sheet pan meals, place chicken skin-side up directly on the vegetables so the drippings baste them during cooking.',
              'In stir-fries, add vegetables in order of density: carrots first, then peppers, then leafy greens last.',
              'Season both the chicken and vegetables separately before combining — it ensures even seasoning throughout.',
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
              'Seasonal swaps: use whatever vegetables are in season — asparagus in spring, squash in fall, snap peas in summer.',
              'Chicken thighs ↔ chicken breasts: Breasts dry out faster; reduce cook time by 5–8 minutes.',
              'Chicken broth ↔ water: Use broth for soup — water works but seasoning needs to be increased.',
              'Fresh vegetables ↔ frozen: Thaw and pat dry frozen vegetables before adding to avoid steaming.',
              'Fresh herbs ↔ dried: Use ½ the amount of dried herbs as fresh (dried are more concentrated).',
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
              'Refrigerate in an airtight container for 3–4 days.',
              'Sheet pan meals reheat best in a 375°F oven for 12–15 minutes to restore texture.',
              'Soups keep 5 days in the fridge and freeze well for up to 3 months.',
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
              { q: 'What vegetables go best with chicken?', a: 'Broccoli, zucchini, bell peppers, carrots, and onions are classics. Root vegetables like parsnips and sweet potato work beautifully roasted.' },
              { q: 'How do I stop vegetables from getting soggy in the oven?', a: "High heat (400°F+), a single layer, and don't cover the pan. Crowding causes steaming — use two pans if needed." },
              { q: 'Can I use frozen vegetables for chicken and vegetable stir-fry?', a: 'Yes, but thaw and pat dry first. Add them after the chicken is cooked since they cook faster than fresh.' },
              { q: 'How long does chicken and vegetables keep?', a: '3–4 days refrigerated in an airtight container. Sheet pan meals reheat best in the oven to preserve crispiness.' },
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
              { to: '/recipes/air-fryer-chicken', label: '🍗 Air Fryer Chicken' },
              { to: '/recipes/chicken-and-broccoli', label: '🥦 Chicken and Broccoli' },
              { to: '/recipes/chicken-soup', label: '🍜 Chicken Soup' },
              { to: '/recipes/chicken-stir-fry', label: '🥢 Chicken Stir-Fry' },
              { to: '/recipes/roast-chicken', label: '🍗 Roast Chicken' },
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
            { to: '/recipes/air-fryer-chicken', label: '🍗 Air Fryer Chicken' },
            { to: '/recipes/chicken-and-broccoli', label: '🥦 Chicken and Broccoli' },
            { to: '/recipes/chicken-soup', label: '🍜 Chicken Soup' },
            { to: '/recipes/chicken-stir-fry', label: '🥢 Chicken Stir-Fry' },
            { to: '/recipes/roast-chicken', label: '🍗 Roast Chicken' },
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

export default ChickenAndVegetables;
