import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare const window: Window & { gtag: (...args: unknown[]) => void };

type Tab = 'skillet' | 'sheetpan' | 'stirfry' | 'soup';

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
    title: 'Ground Turkey and Vegetable Skillet',
    description: 'Ground turkey with zucchini, bell pepper, onion, and tomatoes in Italian seasoning — a quick, lean one-pan dinner.',
    time: '25 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground turkey (93% lean)',
      '1 medium zucchini, diced',
      '1 red bell pepper, diced',
      '1 medium onion, diced',
      '3 cloves garlic, minced',
      '1 can (14 oz) diced tomatoes, drained',
      '1.5 tsp Italian seasoning',
      '½ tsp smoked paprika',
      '½ tsp salt',
      '¼ tsp black pepper',
      '1 tbsp olive oil',
      '2 tbsp fresh basil or parsley, chopped',
    ],
    instructions: [
      'Heat olive oil in a large skillet over medium-high heat.',
      'Add ground turkey; cook 7–8 minutes, breaking up, until well browned. Do not rush this step — brown equals flavor.',
      'Add onion and bell pepper; cook 3 minutes until softened.',
      'Add garlic, Italian seasoning, and smoked paprika; cook 1 minute until fragrant.',
      'Add zucchini and diced tomatoes; stir to combine.',
      'Cook 5–6 minutes until zucchini is just tender and sauce has reduced slightly.',
      'Season with salt and pepper to taste.',
      'Garnish with fresh basil or parsley and serve over rice, pasta, or with crusty bread.',
    ],
  },
  sheetpan: {
    title: 'Sheet Pan Turkey Meatballs and Vegetables',
    description: 'Juicy turkey meatballs baked on the same pan as broccoli, carrots, and bell pepper — all roasted together for easy cleanup.',
    time: '40 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground turkey (93% lean)',
      '2 cups broccoli florets',
      '2 medium carrots, sliced diagonally',
      '1 red bell pepper, cut into 1-inch pieces',
      '1 egg',
      '3 cloves garlic, minced (divided)',
      '2 tbsp breadcrumbs',
      '1 tsp Italian seasoning',
      '½ tsp onion powder',
      '½ tsp salt',
      '¼ tsp black pepper',
      '2 tbsp olive oil',
    ],
    instructions: [
      'Preheat oven to 425°F. Line a large sheet pan with foil.',
      'In a bowl, combine ground turkey, egg, breadcrumbs, half the garlic, Italian seasoning, onion powder, ¼ tsp salt, and pepper.',
      'Mix gently — do not overmix or meatballs will be dense.',
      'Form into 16 meatballs (about 1.5 inches each) and place on one side of the sheet pan.',
      'Toss broccoli, carrots, and bell pepper with olive oil, remaining garlic, remaining salt, and pepper. Spread on the other side.',
      'Roast 25–28 minutes until meatballs are cooked through (165°F) and vegetables are tender with slightly charred edges.',
      'Serve with marinara sauce for dipping if desired.',
    ],
  },
  stirfry: {
    title: 'Ground Turkey Vegetable Stir-Fry',
    description: 'Ground turkey with bok choy, snap peas, and carrots in a ginger-soy sauce — lean, light, and ready in 20 minutes.',
    time: '20 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground turkey (93% lean)',
      '2 cups baby bok choy, chopped',
      '1 cup sugar snap peas',
      '2 medium carrots, julienned',
      '3 cloves garlic, minced',
      '1 tbsp fresh ginger, grated',
      '3 tbsp soy sauce',
      '1 tbsp oyster sauce',
      '1 tsp sesame oil',
      '2 tbsp vegetable oil',
      '1 tsp cornstarch',
      '2 tbsp water',
    ],
    instructions: [
      'Mix sauce: soy sauce, oyster sauce, cornstarch, and water. Set aside.',
      'Heat vegetable oil in a wok or large skillet over high heat.',
      'Add ground turkey; cook 6–7 minutes, breaking up, until browned and cooked through.',
      'Push turkey to one side. Add carrots and stir-fry 2 minutes.',
      'Add snap peas and bok choy; stir-fry 2 minutes.',
      'Add garlic and ginger; stir-fry 30 seconds.',
      'Pour sauce over everything; toss 1–2 minutes until sauce thickens and coats everything evenly.',
      'Drizzle with sesame oil and serve over rice or noodles.',
    ],
  },
  soup: {
    title: 'Turkey and Vegetable Soup',
    description: 'A hearty, clean turkey soup packed with celery, carrots, zucchini, and tomatoes — comforting and ready in 45 minutes.',
    time: '45 min',
    servings: '6 servings',
    ingredients: [
      '1 lb ground turkey (93% lean)',
      '3 stalks celery, sliced',
      '3 medium carrots, sliced',
      '1 medium zucchini, diced',
      '1 can (14 oz) diced tomatoes',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '5 cups chicken broth',
      '1 tsp dried thyme',
      '1 tsp dried Italian seasoning',
      '½ tsp salt',
      '¼ tsp black pepper',
      '2 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'In a large pot over medium-high heat, brown ground turkey 7 minutes, breaking up well. Remove and set aside.',
      'In the same pot, add a drizzle of oil and sauté onion, celery, and carrots for 5 minutes.',
      'Add garlic, thyme, and Italian seasoning; cook 1 minute.',
      'Return turkey to the pot. Add diced tomatoes, chicken broth, and bring to a boil.',
      'Reduce heat to medium-low; simmer 20 minutes.',
      'Add zucchini; simmer 8 more minutes until just tender.',
      'Season with salt and pepper.',
      'Ladle into bowls and garnish with fresh parsley.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'skillet', label: 'Turkey & Veggie Skillet' },
  { key: 'sheetpan', label: 'Turkey Meatballs & Veggies' },
  { key: 'stirfry', label: 'Stir-Fry' },
  { key: 'soup', label: 'Turkey Veggie Soup' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const TurkeyAndVegetables: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('skillet');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Ground Turkey and Vegetables Recipes (Skillet, Sheet Pan) | PantryPivot';
    const PAGE_DESC = 'Easy ground turkey and vegetable recipes — skillet, sheet pan, stir-fry, and soup. Lean, healthy weeknight dinners ready in 30 minutes.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/turkey-and-vegetables';
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
      "name": "Ground Turkey and Vegetable Skillet",
      "description": "Ground turkey with zucchini, bell pepper, onion, and tomatoes in Italian seasoning — a quick, lean one-pan dinner.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT5M",
      "cookTime": "PT20M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "turkey and vegetables, ground turkey skillet, healthy turkey dinner, lean ground turkey, dairy-free turkey",
      "url": "https://pantrypivot.com/recipes/turkey-and-vegetables",
      "recipeIngredient": [
        "1 lb ground turkey (93% lean)",
        "1 medium zucchini, diced",
        "1 red bell pepper, diced",
        "1 medium onion, diced",
        "3 cloves garlic, minced",
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Brown ground turkey in olive oil over medium-high heat, 7–8 minutes." },
        { "@type": "HowToStep", "text": "Add onion, bell pepper, and garlic. Cook 3–4 minutes." },
        { "@type": "HowToStep", "text": "Add zucchini and diced tomatoes with Italian seasoning." },
        { "@type": "HowToStep", "text": "Cook 5–6 minutes until tender. Season and serve." },
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
        { "@type": "Question", "name": "Why does my ground turkey come out dry?", "acceptedAnswer": { "@type": "Answer", "text": "Cook over medium heat (not high), don't overcook past 165°F internal temp, and add a splash of broth or olive oil if it looks dry in the pan." } },
        { "@type": "Question", "name": "Can I substitute ground turkey for ground beef in these recipes?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Use the same quantities. Turkey is leaner, so add 1 extra tbsp olive oil and season slightly more." } },
        { "@type": "Question", "name": "What vegetables work best with ground turkey?", "acceptedAnswer": { "@type": "Answer", "text": "Zucchini, bell peppers, onions, spinach, and mushrooms absorb turkey's mild flavor well. Avoid watery vegetables like cucumber." } },
        { "@type": "Question", "name": "Is ground turkey healthier than ground beef?", "acceptedAnswer": { "@type": "Answer", "text": "Ground turkey (93% lean) has less fat and calories than most ground beef. It's a great swap for those watching fat intake." } },
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
            <li className="text-slate-600 font-medium">Turkey and Vegetables</li>
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
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Turkey and Vegetables Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Lean ground turkey with fresh vegetables — quick, healthy dinners for any night of the week.</p>
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
              'Ground turkey can be dry — add a tablespoon of olive oil when browning to keep it moist.',
              "Don't overmix ground turkey when making meatballs — it becomes dense and tough.",
              'Turkey browns slower than beef — be patient and let it develop color before breaking it up.',
              'Add a splash of chicken broth or water when turkey looks dry in the pan.',
              'Season aggressively — turkey has a milder flavor than beef and needs more seasoning.',
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
              'Ground turkey ↔ ground chicken: Same technique and cook time, similar mild flavor.',
              'Ground turkey ↔ lean ground beef (90/10): More fat means richer flavor; reduce added oil by 1 tbsp.',
              'Italian seasoning ↔ taco seasoning: Instantly transforms the dish into a Mexican-style skillet.',
              'Zucchini ↔ yellow squash or eggplant: Both absorb flavors well and cook in similar time.',
              'Oyster sauce ↔ hoisin sauce: A good swap in stir-fry — slightly sweeter but similar umami.',
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
              'Freeze cooked turkey and vegetable dishes for up to 3 months.',
              'Reheat on the stovetop with a splash of broth to restore moisture.',
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
              { q: 'Why does my ground turkey come out dry?', a: 'Cook over medium heat (not high), don\'t overcook past 165°F internal temp, and add a splash of broth or olive oil if it looks dry in the pan.' },
              { q: 'Can I substitute ground turkey for ground beef in these recipes?', a: 'Yes. Use the same quantities. Turkey is leaner, so add 1 extra tbsp olive oil and season slightly more.' },
              { q: 'What vegetables work best with ground turkey?', a: "Zucchini, bell peppers, onions, spinach, and mushrooms absorb turkey's mild flavor well. Avoid watery vegetables like cucumber." },
              { q: 'Is ground turkey healthier than ground beef?', a: "Ground turkey (93% lean) has less fat and calories than most ground beef. It's a great swap for those watching fat intake." },
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
              { to: '/recipes/ground-turkey', label: '🦃 Ground Turkey' },
              { to: '/recipes/ground-turkey-sweet-potato', label: '🍠 Turkey & Sweet Potato' },
              { to: '/recipes/ground-turkey-and-rice', label: '🍚 Ground Turkey and Rice' },
              { to: '/recipes/chicken-and-vegetables', label: '🥦 Chicken and Vegetables' },
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
            { to: '/recipes/ground-turkey', label: '🦃 Ground Turkey' },
            { to: '/recipes/ground-turkey-sweet-potato', label: '🍠 Turkey & Sweet Potato' },
            { to: '/recipes/ground-turkey-and-rice', label: '🍚 Ground Turkey and Rice' },
            { to: '/recipes/chicken-and-vegetables', label: '🥦 Chicken and Vegetables' },
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

export default TurkeyAndVegetables;
