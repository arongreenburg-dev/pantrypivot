import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'classic' | 'soup' | 'casserole' | 'bowl';

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
    title: 'Classic Chicken and Rice',
    description: 'Tender chicken thighs slow-simmered with seasoned rice — a one-pot comfort meal.',
    time: '45 min',
    servings: '4 servings',
    ingredients: [
      '4 bone-in, skin-on chicken thighs',
      '1½ cups long-grain white rice',
      '2½ cups chicken broth',
      '1 small onion, diced',
      '3 cloves garlic, minced',
      '1 tbsp olive oil',
      '1 tsp smoked paprika',
      '1 tsp garlic powder',
      '½ tsp onion powder',
      '½ tsp dried thyme',
      '1 tsp salt',
      '½ tsp black pepper',
    ],
    instructions: [
      'Season chicken thighs on both sides with paprika, garlic powder, onion powder, salt, and pepper.',
      'Heat olive oil in a large, deep skillet or Dutch oven over medium-high heat.',
      'Sear chicken skin-side down for 5–6 minutes until golden. Flip and sear 3 more minutes. Remove and set aside.',
      'In the same pan, add onion and cook 3 minutes. Add garlic and cook 30 seconds.',
      'Add rice and stir to coat in the pan drippings for 1 minute.',
      'Pour in chicken broth and add thyme. Stir and bring to a boil.',
      'Nestle the chicken thighs on top of the rice, skin-side up.',
      'Reduce heat to low, cover tightly, and cook 25 minutes until rice is tender and chicken is cooked through.',
      'Let rest 5 minutes before serving.',
    ],
  },
  soup: {
    title: 'Chicken and Rice Soup',
    description: 'A rich, warming chicken soup with tender rice — made from scratch in under an hour.',
    time: '50 min',
    servings: '6 servings',
    ingredients: [
      '1.5 lbs boneless, skinless chicken breasts or thighs',
      '¾ cup long-grain white rice',
      '6 cups chicken broth',
      '3 medium carrots, sliced',
      '3 stalks celery, sliced',
      '1 medium onion, diced',
      '3 cloves garlic, minced',
      '1 tbsp olive oil',
      '1 tsp dried thyme',
      '1 tsp dried parsley',
      '1 bay leaf',
      '1 tsp salt',
      '½ tsp black pepper',
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat.',
      'Add onion, carrots, and celery. Cook 5 minutes until softened.',
      'Add garlic and cook 30 seconds.',
      'Add whole chicken breasts or thighs, chicken broth, thyme, parsley, bay leaf, salt, and pepper.',
      'Bring to a boil, then reduce heat to a simmer. Cook 20 minutes.',
      'Remove chicken and shred with two forks.',
      'Add rice to the pot and cook 15–18 minutes until tender.',
      'Return shredded chicken to the pot. Remove bay leaf.',
      'Taste, adjust seasoning, and serve.',
    ],
  },
  casserole: {
    title: 'Chicken and Rice Casserole',
    description: 'A hearty baked casserole with juicy chicken and fluffy rice — no canned soup, all from scratch.',
    time: '1 hr 15 min',
    servings: '6 servings',
    ingredients: [
      '4 boneless, skinless chicken breasts',
      '1½ cups long-grain white rice (uncooked)',
      '2½ cups chicken broth',
      '1 small onion, finely diced',
      '3 cloves garlic, minced',
      '2 tbsp olive oil',
      '1 tsp garlic powder',
      '1 tsp onion powder',
      '1 tsp smoked paprika',
      '½ tsp dried thyme',
      '1½ tsp salt, divided',
      '½ tsp black pepper, divided',
    ],
    instructions: [
      'Preheat oven to 375°F (190°C). Grease a 9x13-inch baking dish.',
      'Heat 1 tbsp olive oil in a skillet over medium heat. Sauté onion 3 minutes, add garlic and cook 30 seconds.',
      'Spread uncooked rice evenly in the baking dish. Scatter sautéed onion and garlic over the rice.',
      'Pour chicken broth over the rice mixture. Add ½ tsp salt and ¼ tsp pepper to the broth.',
      'Season chicken breasts on both sides with garlic powder, onion powder, paprika, thyme, 1 tsp salt, and ¼ tsp pepper.',
      'Drizzle remaining 1 tbsp olive oil over chicken and nestle on top of the rice.',
      'Cover tightly with foil and bake 50 minutes.',
      'Remove foil and bake 10–15 more minutes until chicken is golden and rice is fully cooked.',
      'Rest 5 minutes before serving.',
    ],
  },
  bowl: {
    title: 'Chicken Rice Bowl',
    description: 'Grilled or pan-seared chicken over seasoned rice with fresh toppings — better than takeout.',
    time: '30 min',
    servings: '2 servings',
    ingredients: [
      '2 boneless, skinless chicken breasts',
      '1½ cups cooked white or brown rice',
      '1 tbsp olive oil',
      '1 tsp garlic powder',
      '1 tsp smoked paprika',
      '½ tsp cumin',
      '½ tsp onion powder',
      '1 tsp salt',
      '¼ tsp black pepper',
      '1 lime, juiced',
      '1 avocado, sliced',
      '½ cup cucumber, sliced',
      '2 tbsp fresh cilantro (optional)',
    ],
    instructions: [
      'Mix garlic powder, paprika, cumin, onion powder, salt, and pepper.',
      'Rub the spice mixture over both sides of each chicken breast.',
      'Heat olive oil in a skillet over medium-high heat.',
      'Cook chicken 6–7 minutes per side until internal temperature reaches 165°F.',
      'Rest 5 minutes, then slice against the grain.',
      'Divide cooked rice between two bowls.',
      'Top with sliced chicken, avocado, and cucumber.',
      'Squeeze lime juice over everything and garnish with cilantro if using.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'classic', label: 'Classic Chicken and Rice' },
  { key: 'soup', label: 'Chicken and Rice Soup' },
  { key: 'casserole', label: 'Chicken and Rice Casserole' },
  { key: 'bowl', label: 'Chicken Rice Bowl' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const ChickenAndRice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('classic');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];
  useEffect(() => {
    const PAGE_TITLE = 'Chicken and Rice Recipes (One-Pan Family Dinners) | PantryPivot';
    const PAGE_DESC = 'Easy chicken and rice recipes — classic, soup, creamy casserole, and rice bowls. Simple meat-only dinners the whole family loves.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/chicken-and-rice';
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
      "name": "Chicken and Rice",
      "description": "Easy chicken and rice recipes — classic, soup, creamy casserole, and rice bowls. Simple meat-only dinners the whole family loves.",
      "image": "https://images.pexels.com/photos/9980765/pexels-photo-9980765.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT40M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "chicken and rice, chicken and rice recipe, easy chicken dinner",
      "url": "https://pantrypivot.com/recipes/chicken-and-rice",
      "recipeIngredient": [
        "4 bone-in, skin-on chicken thighs",
        "1\u00bd cups long-grain white rice",
        "2\u00bd cups chicken broth",
        "1 small onion, diced",
        "3 cloves garlic, minced"
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Season chicken thighs on both sides with paprika, garlic powder, onion powder, salt, and pepper." },
        { "@type": "HowToStep", "text": "Heat olive oil in a large, deep skillet or Dutch oven over medium-high heat." },
        { "@type": "HowToStep", "text": "Sear chicken skin-side down for 5–6 minutes until golden. Flip and sear 3 more minutes. Remove and set aside." },
        { "@type": "HowToStep", "text": "In the same pan, add onion and cook 3 minutes. Add garlic and cook 30 seconds." },
        { "@type": "HowToStep", "text": "Add rice and stir to coat in the pan drippings for 1 minute." },
        { "@type": "HowToStep", "text": "Pour in chicken broth and add thyme. Stir and bring to a boil." },
        { "@type": "HowToStep", "text": "Nestle the chicken thighs on top of the rice, skin-side up." },
        { "@type": "HowToStep", "text": "Reduce heat to low, cover tightly, and cook 25 minutes until rice is tender and chicken is cooked through." },
        { "@type": "HowToStep", "text": "Let rest 5 minutes before serving." }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById('recipe-schema');
      if (el) el.remove();
    };
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Can I use uncooked rice directly in chicken and rice?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — the rice cooks in the chicken broth during the recipe, absorbing all the flavor. Use raw long-grain white rice. Do not use pre-cooked or instant rice as it will become mushy." } },
        { "@type": "Question", "name": "How do I keep chicken and rice from getting mushy?", "acceptedAnswer": { "@type": "Answer", "text": "Cover the pot tightly and don't lift the lid while the rice is cooking. Use the exact ratio of liquid to rice (usually 1.5:1 broth to rice), and let it rest 5 minutes off heat before serving." } },
        { "@type": "Question", "name": "Can I substitute brown rice in chicken and rice?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, but add 10–15 extra minutes of cook time and increase liquid by ¼ cup. Brown rice takes longer to cook than white rice and needs more liquid." } },
        { "@type": "Question", "name": "Can chicken and rice be frozen?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, but rice texture changes slightly when frozen and reheated — it softens. For best results, freeze the chicken separately from the rice, or accept slightly softer rice after reheating with a splash of broth." } }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById('faq-schema');
      if (el) el.remove();
    };
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
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="text-xs text-slate-400 mb-8">
          <ol className="flex items-center gap-1.5">
            <li><a href="https://pantrypivot.com" className="hover:text-orange-500 transition-colors">Home</a></li>
            <li className="text-slate-300">›</li>
            <li>Recipes</li>
            <li className="text-slate-300">›</li>
            <li className="text-slate-600 font-medium">Chicken and Rice</li>
          </ol>
        </nav>

        {/* Table of Contents */}
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
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Chicken and Rice Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Classic comfort food made easy — juicy chicken and perfectly cooked rice in four delicious ways.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">What Can I Make With Chicken and Rice?</h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto text-center mb-8 leading-relaxed">This page contains 4 kosher meat chicken and rice recipes — baked, soup, casserole, and rice bowl. All recipes are dairy-free. Ingredients are simple pantry staples with no specialty items required.</p>

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
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-2xl text-center transition-all shadow-md"
            >
              Order Ingredients on Amazon Fresh
            </a>
            <a
              href={PANTRYPIVOT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-slate-900 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-2xl text-center transition-all shadow-md"
            >
              Generate More Recipes on PantryPivot →
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="flex-1 border-2 border-slate-200 hover:border-orange-300 text-slate-700 font-bold py-3 px-6 rounded-2xl text-center transition-all"
            >
              {copied ? '✓ Link copied!' : 'Share this recipe'}
            </button>
          </div>
        </div>

        {/* Cooking Tips */}
        <div id="cooking-tips" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mt-10">
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">Chicken and Rice Tips</h2>
          <ul className="space-y-3">
            {[
              "Toast the rice in the chicken drippings for 1 minute before adding broth — this adds a nutty depth of flavor that plain boiled rice lacks.",
              "Cover the pot tightly while the rice cooks. Every steam release means less water for the rice to absorb, leading to crunchy undercooked spots.",
              "Use bone-in chicken thighs for the most flavorful rice — the fat and collagen enrich the whole dish.",
              "Don't check on the rice while it's cooking. Trust the timing and let it steam undisturbed for the full 25 minutes.",
              "Let the dish rest 5 minutes off heat before serving — the rice continues to steam and the chicken juices redistribute."
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-orange-400 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Substitutions */}
        <div id="substitutions" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mt-6">
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">Ingredient Substitutions</h2>
          <ul className="space-y-3">
            {[
              "White rice ↔ brown rice: Use brown rice with 10–15 extra minutes of cook time and ¼ cup more liquid.",
              "Chicken thighs ↔ chicken breasts: Breasts work but are less forgiving — reduce cook time by 5 minutes to avoid drying out.",
              "Chicken broth ↔ vegetable broth: Makes the dish pareve — a great option for pareve meals.",
              "Dried thyme ↔ dried rosemary or oregano: Any dried herb works; rosemary gives a more Mediterranean flavor.",
              "Fresh garlic ↔ garlic powder: Use ¼ tsp garlic powder per clove when fresh isn't available."
            ].map((sub, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-orange-400 flex-shrink-0" />
                <span>{sub}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Storage */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mt-6">
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">Storage &amp; Reheating</h2>
          <ul className="space-y-3">
            {[
              "Fridge: 3–4 days in an airtight container.",
              "Freezer: Freezes up to 3 months. Note that rice texture softens when frozen and reheated.",
              "Reheat: Reheat on the stovetop or in the microwave with a splash of broth to restore moisture."
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-orange-400 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div id="faq" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mt-6">
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Can I use uncooked rice directly in chicken and rice?", a: "Yes — the rice cooks in the chicken broth during the recipe, absorbing all the flavor. Use raw long-grain white rice. Do not use pre-cooked or instant rice as it will become mushy." },
              { q: "How do I keep chicken and rice from getting mushy?", a: "Cover the pot tightly and don't lift the lid while the rice is cooking. Use the exact ratio of liquid to rice (usually 1.5:1 broth to rice), and let it rest 5 minutes off heat before serving." },
              { q: "Can I substitute brown rice in chicken and rice?", a: "Yes, but add 10–15 extra minutes of cook time and increase liquid by ¼ cup. Brown rice takes longer to cook than white rice and needs more liquid." },
              { q: "Can chicken and rice be frozen?", a: "Yes, but rice texture changes slightly when frozen and reheated — it softens. For best results, freeze the chicken separately from the rice, or accept slightly softer rice after reheating with a splash of broth." }
            ].map(({ q, a }, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-5">
                <p className="font-bold text-slate-900 mb-2">{q}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* More Recipes */}
        <div className="mt-10">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">More Recipes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Link to="/recipes/air-fryer-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍗</span> Air Fryer Chicken
            </Link>
            <Link to="/recipes/crockpot-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍲</span> Crockpot Chicken
            </Link>
            <Link to="/recipes/instant-pot-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">⚡</span> Instant Pot Chicken
            </Link>
            <Link to="/recipes/roast-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍗</span> Roast Chicken
            </Link>
            <Link to="/recipes/chicken-soup" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍜</span> Chicken Soup
            </Link>
            <Link to="/recipes/ground-turkey" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🦃</span> Ground Turkey
            </Link>
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
          <Link to="/recipes/air-fryer-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Air Fryer Chicken</Link>
          <Link to="/recipes/crockpot-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Crockpot Chicken</Link>
          <Link to="/recipes/salmon" className="text-slate-500 hover:text-orange-600 transition-colors">Salmon Recipes</Link>
          <Link to="/recipes/ground-turkey" className="text-slate-500 hover:text-orange-600 transition-colors">Ground Turkey</Link>
          <Link to="/recipes/ground-beef-pasta" className="text-slate-500 hover:text-orange-600 transition-colors">Ground Beef Pasta</Link>
          <Link to="/recipes/instant-pot-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Instant Pot Chicken</Link>
          <Link to="/recipes/chicken-soup" className="text-slate-500 hover:text-orange-600 transition-colors">Chicken Soup</Link>
          <Link to="/recipes/roast-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Roast Chicken</Link>
        </div>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed text-center">
          Disclosure: PantryPivot participates in the Amazon Associates Program. <br />
          As an Amazon Associate, we may earn from qualifying purchases at no additional cost to you.
        </p>
      </footer>
    </div>
  );
};

export default ChickenAndRice;
