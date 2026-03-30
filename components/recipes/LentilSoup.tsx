import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare const window: Window & { gtag: (...args: unknown[]) => void };

type Tab = 'classic' | 'redlentil' | 'spiced' | 'vegetable';

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
    title: 'Classic Lentil Soup',
    description: 'Hearty green or brown lentil soup with carrots, celery, tomatoes, and warm spices — vegan, filling, and deeply comforting.',
    time: '50 min',
    servings: '6 servings',
    ingredients: [
      '1.5 cups green or brown lentils, rinsed',
      '2 large carrots, diced',
      '3 stalks celery, sliced',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '1 can (14 oz) diced tomatoes',
      '6 cups vegetable broth',
      '2 tsp cumin',
      '1 tsp coriander',
      '½ tsp turmeric',
      '2 tbsp olive oil',
      '2 tbsp fresh lemon juice',
      '½ tsp salt',
      '¼ tsp black pepper',
      '3 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat. Add onion, carrots, and celery; cook 6 minutes until softened.',
      'Add garlic; cook 1 minute. Add cumin, coriander, and turmeric; cook 60 seconds, stirring, to bloom the spices.',
      'Add rinsed lentils, diced tomatoes, and vegetable broth. Stir to combine.',
      'Bring to a boil. Reduce heat to medium-low; cover and simmer 35 minutes until lentils are very tender.',
      'If you like a thicker soup, use an immersion blender to partially blend — blend about ⅓ of the soup and stir back in.',
      'Add lemon juice; stir and taste. Season with salt and pepper.',
      'If soup is too thick, add ½–1 cup more broth or water.',
      'Ladle into bowls and garnish with fresh parsley. Serve with crusty bread.',
    ],
  },
  redlentil: {
    title: 'Red Lentil Soup',
    description: 'Silky smooth red lentil soup with cumin, turmeric, and smoked paprika — naturally creamy with a drizzle of chili oil on top.',
    time: '40 min',
    servings: '6 servings',
    ingredients: [
      '1.5 cups red lentils, rinsed',
      '2 large carrots, diced',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '6 cups vegetable broth',
      '2 tsp cumin',
      '1 tsp turmeric',
      '1 tsp smoked paprika',
      '2 tbsp olive oil',
      '2 tbsp fresh lemon juice',
      '½ tsp salt',
      '¼ tsp black pepper',
      '1 tbsp chili oil or red pepper flakes, for serving',
      '2 tbsp fresh parsley, for serving',
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat. Add onion and carrots; cook 5 minutes until softened.',
      'Add garlic; cook 1 minute. Add cumin, turmeric, and smoked paprika; cook 60 seconds to bloom spices.',
      'Add rinsed red lentils and vegetable broth. Bring to a boil.',
      'Reduce heat to medium-low; simmer uncovered 20–25 minutes, stirring occasionally, until lentils have dissolved into the broth.',
      'Use an immersion blender to blend the soup until completely smooth and creamy.',
      'Stir in lemon juice. Season with salt and pepper.',
      'Add more broth if the soup is too thick.',
      'Ladle into bowls. Drizzle with chili oil and garnish with parsley.',
    ],
  },
  spiced: {
    title: 'Spiced Moroccan Lentil Soup',
    description: 'Aromatic Moroccan-spiced lentil soup with ras el hanout, cinnamon, cumin, tomatoes, and fresh parsley — warming and complex.',
    time: '55 min',
    servings: '6 servings',
    ingredients: [
      '1.5 cups green lentils, rinsed',
      '1 can (14 oz) diced tomatoes',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '6 cups vegetable broth',
      '1.5 tsp ras el hanout',
      '1 tsp cumin',
      '½ tsp cinnamon',
      '½ tsp smoked paprika',
      '2 tbsp olive oil',
      '2 tbsp fresh lemon juice',
      '½ tsp salt',
      '¼ cup fresh parsley, chopped',
      '¼ cup fresh cilantro, chopped',
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat. Add onion; cook 5 minutes.',
      'Add garlic; cook 1 minute. Add ras el hanout, cumin, cinnamon, and smoked paprika; cook 60 seconds until fragrant.',
      'Add rinsed lentils, diced tomatoes, and vegetable broth.',
      'Bring to a boil. Reduce heat to low; cover and simmer 40 minutes until lentils are very tender.',
      'Stir soup and check consistency — partially blend if you prefer a thicker texture.',
      'Add lemon juice; season with salt. Taste and adjust spices.',
      'If soup is too thick, add ½ cup more broth.',
      'Ladle into bowls and garnish generously with fresh parsley and cilantro.',
    ],
  },
  vegetable: {
    title: 'Lentil and Vegetable Soup',
    description: 'Green lentils with kale, sweet potato, carrots, celery, and turmeric — a filling, nutrient-packed vegan soup.',
    time: '55 min',
    servings: '8 servings',
    ingredients: [
      '1.5 cups green lentils, rinsed',
      '2 cups kale, stems removed and chopped',
      '1 medium sweet potato, peeled and diced',
      '3 large carrots, sliced',
      '3 stalks celery, sliced',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '7 cups vegetable broth',
      '1 tsp turmeric',
      '1 tsp cumin',
      '2 tbsp olive oil',
      '2 tbsp fresh lemon juice',
      '½ tsp salt',
      '¼ tsp black pepper',
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat. Add onion, carrots, and celery; cook 6 minutes.',
      'Add garlic, turmeric, and cumin; cook 1 minute to bloom spices.',
      'Add rinsed lentils, sweet potato, and vegetable broth.',
      'Bring to a boil. Reduce to medium-low; cover and simmer 30 minutes.',
      'Add kale; stir and simmer 10–15 more minutes until lentils and sweet potato are very tender.',
      'Stir in lemon juice. Season with salt and pepper.',
      'Taste and adjust seasoning. Add more broth if too thick.',
      'Ladle into bowls and serve with crusty bread or crackers.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'classic', label: 'Classic' },
  { key: 'redlentil', label: 'Red Lentil' },
  { key: 'spiced', label: 'Moroccan Spiced' },
  { key: 'vegetable', label: 'Lentil & Vegetables' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const LentilSoup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('classic');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Lentil Soup Recipes (Classic, Red Lentil, Spiced) | PantryPivot';
    const PAGE_DESC = 'Hearty homemade lentil soup recipes — classic, spiced red lentil, vegetable, and Turkish-style. Vegan, high-protein, and ready in 45 minutes.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/lentil-soup';
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
      "name": "Classic Lentil Soup",
      "description": "Hearty green or brown lentil soup with carrots, celery, tomatoes, and warm spices — vegan, filling, and deeply comforting.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT40M",
      "recipeCategory": "Soup",
      "recipeCuisine": "Mediterranean",
      "keywords": "lentil soup, classic lentil soup, vegan soup, high protein soup, red lentil soup",
      "url": "https://pantrypivot.com/recipes/lentil-soup",
      "recipeIngredient": [
        "1.5 cups green or brown lentils, rinsed",
        "2 large carrots, diced",
        "3 stalks celery, sliced",
        "1 medium onion, diced",
        "4 cloves garlic, minced",
      ],
      "recipeYield": "6 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Sauté onion, carrots, and celery in olive oil 6 minutes. Add garlic and spices, cook 1 minute." },
        { "@type": "HowToStep", "text": "Add rinsed lentils, tomatoes, and broth. Bring to a boil." },
        { "@type": "HowToStep", "text": "Simmer 35 minutes until lentils are very tender." },
        { "@type": "HowToStep", "text": "Add lemon juice, season with salt and pepper. Garnish with parsley and serve." },
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
        { "@type": "Question", "name": "Do I need to soak lentils before cooking?", "acceptedAnswer": { "@type": "Answer", "text": "No — unlike dried beans, lentils don't require soaking. Just rinse and cook directly. Red lentils take 20–25 minutes; green/brown lentils take 35–45 minutes." } },
        { "@type": "Question", "name": "Why are my lentils not softening?", "acceptedAnswer": { "@type": "Answer", "text": "Adding acid (tomatoes, lemon) or salt too early prevents softening. Add these in the last 15 minutes of cooking. Also check that your lentils aren't too old — very old lentils can stay firm indefinitely." } },
        { "@type": "Question", "name": "How do I thicken lentil soup?", "acceptedAnswer": { "@type": "Answer", "text": "Use an immersion blender to blend 1/3 of the soup, then stir back in. This thickens without any added starch." } },
        { "@type": "Question", "name": "Is lentil soup complete protein?", "acceptedAnswer": { "@type": "Answer", "text": "Lentils alone are not complete protein, but pairing with rice or bread provides all essential amino acids. Lentils are high in protein (18g per cup cooked) and fiber." } },
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
            <li className="text-slate-600 font-medium">Lentil Soup</li>
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
          <span className="inline-block bg-green-100 text-green-700 font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">🌿 Vegan</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Lentil Soup Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Hearty, protein-rich lentil soups — vegan, warming, and ready in under an hour.</p>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">What Can I Make With Lentils?</h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto text-center mb-8 leading-relaxed">This page contains 4 kosher vegan lentil soup recipes — classic, red lentil, Moroccan spiced, and vegetable. All recipes are pareve and fully plant-based. Ingredients are simple pantry staples with no specialty items required.</p>

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
              'Rinse lentils under cold water before cooking — this removes surface starch and any debris.',
              'Red lentils dissolve into a creamy purée; green and brown lentils hold their shape. Choose based on your texture preference.',
              'Add acid (lemon juice, tomatoes) at the end of cooking — acid added early prevents lentils from softening properly.',
              'Bloom your spices in olive oil for 60 seconds before adding aromatics — it dramatically deepens the flavor.',
              'For a smooth red lentil soup, use an immersion blender after cooking for a thick, creamy consistency.',
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
              'Green lentils ↔ brown lentils: Same cook time and similar flavor — both hold their shape.',
              'Vegetable broth ↔ water: Water works but needs more seasoning to make up for the missing depth.',
              'Canned tomatoes ↔ fresh tomatoes: Use 2 medium fresh tomatoes, diced, for 1 can (14 oz).',
              'Cumin ↔ smoked cumin: A smoky version that adds an extra layer of depth.',
              'Ras el hanout ↔ cumin + coriander + cinnamon + turmeric (¼ tsp each): A simple DIY Moroccan blend.',
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
              'Refrigerate for up to 5 days in an airtight container.',
              'Freeze for up to 3 months in freezer-safe containers.',
              'Soup thickens considerably when chilled — add ½ cup water or broth when reheating on the stovetop.',
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
              { q: 'Do I need to soak lentils before cooking?', a: "No — unlike dried beans, lentils don't require soaking. Just rinse and cook directly. Red lentils take 20–25 minutes; green/brown lentils take 35–45 minutes." },
              { q: 'Why are my lentils not softening?', a: 'Adding acid (tomatoes, lemon) or salt too early prevents softening. Add these in the last 15 minutes of cooking. Also check that your lentils aren\'t too old — very old lentils can stay firm indefinitely.' },
              { q: 'How do I thicken lentil soup?', a: 'Use an immersion blender to blend 1/3 of the soup, then stir back in. This thickens without any added starch.' },
              { q: 'Is lentil soup complete protein?', a: 'Lentils alone are not complete protein, but pairing with rice or bread provides all essential amino acids. Lentils are high in protein (18g per cup cooked) and fiber.' },
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
              { to: '/recipes/shakshuka', label: '🍳 Shakshuka' },
              { to: '/recipes/eggs-and-vegetables', label: '🥚 Eggs and Vegetables' },
              { to: '/recipes/salmon-and-vegetables', label: '🐟 Salmon and Vegetables' },
              { to: '/recipes/chicken-soup', label: '🍜 Chicken Soup' },
              { to: '/recipes/beef-stew', label: '🥩 Beef Stew' },
              { to: '/recipes/ground-turkey', label: '🦃 Ground Turkey' },
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
            { to: '/recipes/shakshuka', label: '🍳 Shakshuka' },
            { to: '/recipes/eggs-and-vegetables', label: '🥚 Eggs and Vegetables' },
            { to: '/recipes/salmon-and-vegetables', label: '🐟 Salmon and Vegetables' },
            { to: '/recipes/chicken-soup', label: '🍜 Chicken Soup' },
            { to: '/recipes/beef-stew', label: '🥩 Beef Stew' },
            { to: '/recipes/ground-turkey', label: '🦃 Ground Turkey' },
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

export default LentilSoup;
