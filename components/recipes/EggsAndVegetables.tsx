import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare const window: Window & { gtag: (...args: unknown[]) => void };

type Tab = 'frittata' | 'scramble' | 'shakshuka' | 'friedrice';

interface Recipe {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

const recipes: Record<Tab, Recipe> = {
  frittata: {
    title: 'Vegetable Frittata',
    description: 'Oven-baked frittata with zucchini, bell pepper, spinach, and cherry tomatoes — protein-packed and endlessly customizable.',
    time: '30 min',
    servings: '6 servings',
    ingredients: [
      '8 large eggs',
      '1 medium zucchini, diced',
      '1 red bell pepper, diced',
      '2 cups fresh spinach',
      '1 cup cherry tomatoes, halved',
      '1 small onion, diced',
      '3 cloves garlic, minced',
      '2 tbsp olive oil',
      '1 tsp dried Italian seasoning',
      '½ tsp salt',
      '¼ tsp black pepper',
      '2 tbsp fresh basil, chopped',
    ],
    instructions: [
      'Preheat oven to 400°F.',
      'Whisk eggs with Italian seasoning, salt, and pepper in a large bowl. Set aside.',
      'Heat olive oil in a 10-inch oven-safe skillet over medium heat. Add onion; cook 3 minutes.',
      'Add bell pepper and zucchini; cook 4 minutes until softened.',
      'Add garlic; cook 1 minute. Add spinach; stir until wilted, 60 seconds.',
      'Add cherry tomatoes; stir briefly.',
      'Pour egg mixture evenly over the vegetables. Cook on the stovetop 2–3 minutes until edges start to set.',
      'Transfer to the oven; bake 8–10 minutes until center is just set with a slight jiggle. Rest 3 minutes before slicing. Garnish with fresh basil.',
    ],
  },
  scramble: {
    title: 'Veggie Scrambled Eggs',
    description: 'Soft scrambled eggs with spinach, mushrooms, bell pepper, and garlic — a healthy, dairy-free breakfast or dinner in 15 minutes.',
    time: '15 min',
    servings: '2 servings',
    ingredients: [
      '4 large eggs',
      '1 cup fresh spinach',
      '6 oz cremini mushrooms, sliced',
      '½ red bell pepper, diced',
      '½ small onion, diced',
      '2 cloves garlic, minced',
      '1 tbsp olive oil',
      '1 tbsp water',
      '¼ tsp salt',
      '¼ tsp black pepper',
      '¼ tsp dried thyme',
      '1 tbsp fresh chives, chopped',
    ],
    instructions: [
      'Whisk eggs with 1 tbsp water, salt, pepper, and thyme until completely combined.',
      'Heat olive oil in a non-stick skillet over medium heat.',
      'Add onion; cook 2 minutes. Add mushrooms; cook 3–4 minutes undisturbed until browned.',
      'Add bell pepper and garlic; cook 2 minutes.',
      'Add spinach; stir until wilted, 60 seconds.',
      'Reduce heat to medium-low. Pour egg mixture over the vegetables.',
      'Using a silicone spatula, gently fold the eggs from the edges toward the center every 20–30 seconds.',
      'Remove from heat when eggs are just barely set — they continue cooking off-heat. Garnish with chives and serve immediately.',
    ],
  },
  shakshuka: {
    title: 'Shakshuka',
    description: 'Eggs poached directly in a spiced tomato sauce with onion, garlic, cumin, and paprika — a Middle Eastern classic in 30 minutes.',
    time: '30 min',
    servings: '4 servings',
    ingredients: [
      '6 large eggs',
      '1 can (28 oz) crushed tomatoes',
      '1 medium onion, diced',
      '1 red bell pepper, diced',
      '4 cloves garlic, minced',
      '1 tsp cumin',
      '1 tsp smoked paprika',
      '½ tsp coriander',
      '¼ tsp cayenne (optional)',
      '½ tsp salt',
      '2 tbsp olive oil',
      '¼ cup fresh cilantro or parsley, chopped',
    ],
    instructions: [
      'Heat olive oil in a large deep skillet over medium heat. Add onion and bell pepper; cook 6 minutes until softened.',
      'Add garlic, cumin, smoked paprika, coriander, and cayenne; cook 1 minute until fragrant.',
      'Add crushed tomatoes; stir and season with salt. Bring to a simmer.',
      'Simmer sauce 10–12 minutes, stirring occasionally, until slightly thickened.',
      'Use a spoon to make 6 wells in the sauce. Crack one egg into each well.',
      'Cover the pan and cook on medium-low 7–9 minutes until whites are set but yolks are still runny (or longer if you prefer fully set yolks).',
      'Remove from heat. Garnish generously with fresh cilantro or parsley.',
      'Serve directly from the pan with pita bread or crusty bread for dipping.',
    ],
  },
  friedrice: {
    title: 'Egg Fried Rice with Vegetables',
    description: 'Classic egg fried rice with peas, carrots, garlic, soy sauce, and sesame oil — the best use of day-old rice.',
    time: '20 min',
    servings: '4 servings',
    ingredients: [
      '3 cups day-old cooked white rice',
      '3 large eggs, beaten',
      '1 cup frozen peas',
      '2 medium carrots, diced small',
      '3 cloves garlic, minced',
      '4 scallions, sliced',
      '3 tbsp soy sauce',
      '1 tsp sesame oil',
      '2 tbsp vegetable oil',
      '½ tsp white pepper',
      '1 tsp fresh ginger, grated (optional)',
      '1 tbsp rice vinegar (optional)',
    ],
    instructions: [
      'Break up cold day-old rice with your hands to separate any clumps.',
      'Heat vegetable oil in a wok or large skillet over high heat.',
      'Add carrots and frozen peas; stir-fry 3 minutes until peas thaw and carrots are just tender.',
      'Add garlic (and ginger if using); stir-fry 30 seconds.',
      'Add rice; press flat and cook undisturbed 2 minutes for a lightly toasted bottom. Stir and continue cooking 2 more minutes.',
      'Push rice to one side. Pour beaten eggs into the empty space; scramble until just set, then fold into the rice.',
      'Add soy sauce, sesame oil, white pepper, and rice vinegar if using. Toss everything together.',
      'Add scallions; toss briefly and serve immediately.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'frittata', label: 'Vegetable Frittata' },
  { key: 'scramble', label: 'Veggie Scramble' },
  { key: 'shakshuka', label: 'Shakshuka' },
  { key: 'friedrice', label: 'Egg Fried Rice' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const EggsAndVegetables: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('frittata');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Eggs and Vegetables Recipes (Frittata, Scramble, Shakshuka) | PantryPivot';
    const PAGE_DESC = 'Easy eggs and vegetables recipes — frittata, scrambled eggs with veggies, shakshuka, and vegetable fried rice. Quick vegetarian dinners.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/eggs-and-vegetables';
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
      "name": "Vegetable Frittata",
      "description": "Oven-baked frittata with zucchini, bell pepper, spinach, and cherry tomatoes — protein-packed and endlessly customizable.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT20M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "Italian",
      "keywords": "eggs and vegetables, vegetable frittata, shakshuka, veggie scrambled eggs, vegetarian dinner",
      "url": "https://pantrypivot.com/recipes/eggs-and-vegetables",
      "recipeIngredient": [
        "8 large eggs",
        "1 medium zucchini, diced",
        "1 red bell pepper, diced",
        "2 cups fresh spinach",
        "1 cup cherry tomatoes, halved",
      ],
      "recipeYield": "6 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Preheat oven to 400°F. Whisk eggs with seasonings." },
        { "@type": "HowToStep", "text": "Sauté vegetables in an oven-safe skillet over medium heat." },
        { "@type": "HowToStep", "text": "Pour eggs over vegetables; cook on stovetop 2–3 minutes until edges set." },
        { "@type": "HowToStep", "text": "Transfer to oven; bake 8–10 minutes until just set. Rest 3 minutes before slicing." },
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
        { "@type": "Question", "name": "What vegetables work best in a frittata?", "acceptedAnswer": { "@type": "Answer", "text": "Zucchini, bell peppers, spinach, mushrooms, and cherry tomatoes are classics. Avoid watery vegetables (cucumber, raw tomato) unless pre-cooked." } },
        { "@type": "Question", "name": "How do I keep eggs from getting rubbery?", "acceptedAnswer": { "@type": "Answer", "text": "Use medium heat (not high), remove from heat just before fully cooked, and let residual heat finish them. Overcooking is the main cause of rubbery eggs." } },
        { "@type": "Question", "name": "Can I make frittata without an oven-safe skillet?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — cook the frittata on low heat with the lid on for 12–15 minutes until fully set. It won't brown on top but will cook through." } },
        { "@type": "Question", "name": "Is shakshuka healthy?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — it's high in protein (eggs), rich in lycopene (tomatoes), and packed with vegetables. It's naturally gluten-free and low-carb." } },
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
      "name": "Eggs and Vegetables Recipes",
      "description": "Four kosher pareve egg and vegetable recipes — frittata, scramble, shakshuka-style, and vegetable fried rice.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "eggs and vegetables, kosher eggs, pareve eggs, vegetable frittata, healthy egg dinner",
      "suitableForDiet": "https://schema.org/KosherDiet",
      "recipeIngredient": [
        "6 large eggs",
        "2 cups mixed vegetables (spinach, bell pepper, zucchini)",
        "1 medium onion, diced",
        "3 cloves garlic, minced",
        "2 tbsp olive oil",
        "salt and black pepper"
      ],
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Sauté onion and vegetables in olive oil 5–6 minutes until softened. Add garlic and cook 30 seconds." },
        { "@type": "HowToStep", "text": "Whisk eggs with salt and pepper. Pour over the vegetables in an oven-safe skillet." },
        { "@type": "HowToStep", "text": "Cook on stovetop 2–3 minutes until edges set, then transfer to a 375°F oven for 8–10 minutes until fully set and lightly golden on top." }
      ],
      "prepTime": "PT10M",
      "cookTime": "PT20M",
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
            <li className="text-slate-600 font-medium">Eggs and Vegetables</li>
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
          <span className="inline-block bg-yellow-100 text-yellow-700 font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">🥚 Vegetarian</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Eggs and Vegetables Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Simple, satisfying egg and vegetable dishes — protein-packed and ready in 20 minutes.</p>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">What Can I Make With Eggs and Vegetables?</h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto text-center mb-8 leading-relaxed">This page contains 4 kosher pareve egg and vegetable recipes — frittata, scramble, shakshuka, and fried rice. All recipes are pareve with no meat or dairy. Ingredients are simple pantry staples with no specialty items required.</p>

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
              'For scrambled eggs without milk: use a splash of water instead — it makes them lighter and fluffier.',
              'Cook frittata on the stovetop first to set the edges, then finish in a 400°F oven for 8–10 minutes.',
              'Shakshuka: let the tomato sauce simmer at least 10 minutes before adding eggs to develop depth.',
              'For fried rice, use day-old refrigerated rice — fresh rice is too wet and will clump together.',
              'Remove frittata from the oven while the center still jiggles slightly — it sets as it rests and won\'t overcook.',
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
              'Fresh spinach ↔ frozen spinach: Thaw and squeeze completely dry — frozen spinach has excess water that will make eggs watery.',
              'Bell pepper ↔ any color bell pepper or poblano pepper: All work well in egg dishes.',
              'Eggs ↔ Just Egg (vegan): Works well in scrambles and fried rice; frittata texture will differ slightly.',
              'Soy sauce ↔ tamari: A gluten-free swap with nearly identical flavor for fried rice.',
              'Crushed tomatoes ↔ diced tomatoes: Use diced for a chunkier shakshuka; blend slightly if you prefer a smoother sauce.',
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
              'Frittata keeps 4 days in the fridge — slice and reheat individual pieces in a skillet or microwave.',
              'Scrambled eggs are best eaten fresh — they become rubbery when refrigerated.',
              'Shakshuka keeps 3 days in the fridge; reheat sauce in the pan and poach fresh eggs for best results. Fried rice keeps 3 days — reheat in a hot skillet.',
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
              { q: 'What vegetables work best in a frittata?', a: 'Zucchini, bell peppers, spinach, mushrooms, and cherry tomatoes are classics. Avoid watery vegetables (cucumber, raw tomato) unless pre-cooked.' },
              { q: 'How do I keep eggs from getting rubbery?', a: 'Use medium heat (not high), remove from heat just before fully cooked, and let residual heat finish them. Overcooking is the main cause of rubbery eggs.' },
              { q: 'Can I make frittata without an oven-safe skillet?', a: "Yes — cook the frittata on low heat with the lid on for 12–15 minutes until fully set. It won't brown on top but will cook through." },
              { q: 'Is shakshuka healthy?', a: "Yes — it's high in protein (eggs), rich in lycopene (tomatoes), and packed with vegetables. It's naturally gluten-free and low-carb." },
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
              { to: '/recipes/lentil-soup', label: '🌿 Lentil Soup' },
              { to: '/recipes/salmon-and-vegetables', label: '🐟 Salmon and Vegetables' },
              { to: '/recipes/chicken-and-vegetables', label: '🥦 Chicken and Vegetables' },
              { to: '/recipes/ground-turkey', label: '🦃 Ground Turkey' },
              { to: '/recipes/beef-and-vegetables', label: '🥦 Beef and Vegetables' },
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
            { to: '/recipes/lentil-soup', label: '🌿 Lentil Soup' },
            { to: '/recipes/salmon-and-vegetables', label: '🐟 Salmon and Vegetables' },
            { to: '/recipes/chicken-and-vegetables', label: '🥦 Chicken and Vegetables' },
            { to: '/recipes/ground-turkey', label: '🦃 Ground Turkey' },
            { to: '/recipes/beef-and-vegetables', label: '🥦 Beef and Vegetables' },
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

export default EggsAndVegetables;
