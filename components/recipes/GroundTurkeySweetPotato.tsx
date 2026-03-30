import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'bowl' | 'skillet' | 'stuffed' | 'soup';

interface Recipe {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

const recipes: Record<Tab, Recipe> = {
  bowl: {
    title: 'Ground Turkey Sweet Potato Bowl',
    description: 'Seasoned ground turkey over roasted sweet potato with fresh toppings — a protein-packed, healthy bowl ready in 30 minutes.',
    time: '30 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground turkey (93% lean)',
      '2 medium sweet potatoes, diced into 1-inch cubes',
      '1 tbsp olive oil (for turkey)',
      '1 tbsp olive oil (for sweet potato)',
      '1 small onion, diced',
      '3 cloves garlic, minced',
      '1 tsp cumin',
      '1 tsp smoked paprika',
      '½ tsp chili powder',
      '1 tsp salt',
      '½ tsp black pepper',
      '2 tbsp chicken broth or water',
      '2 cups cooked rice or quinoa for serving',
      'Fresh cilantro and lime wedges for serving',
    ],
    instructions: [
      'Preheat oven to 425°F. Toss diced sweet potato with 1 tbsp olive oil, ½ tsp salt, and a pinch of paprika. Spread on a baking sheet.',
      'Roast sweet potatoes 20–25 minutes, flipping once, until golden and tender.',
      'Meanwhile, heat 1 tbsp olive oil in a large skillet over medium-high heat. Add onion and cook 3 minutes.',
      'Add garlic and cook 30 seconds. Add ground turkey and break apart with a spatula.',
      'Cook turkey 6–8 minutes until browned and cooked through. Drain excess liquid.',
      'Add cumin, paprika, chili powder, salt, and pepper. Stir to coat. Add broth and cook 1 minute.',
      'Assemble bowls: rice or quinoa → seasoned turkey → roasted sweet potato.',
      'Top with fresh cilantro and a squeeze of lime.',
    ],
  },
  skillet: {
    title: 'Ground Turkey Sweet Potato Skillet',
    description: 'A hearty one-pan skillet with ground turkey and sweet potato cooked together in savory spices — quick cleanup, big flavor.',
    time: '30 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground turkey',
      '2 medium sweet potatoes, peeled and diced small',
      '1 tbsp olive oil',
      '1 small onion, diced',
      '3 cloves garlic, minced',
      '1 red bell pepper, diced',
      '1 tsp cumin',
      '1 tsp smoked paprika',
      '½ tsp garlic powder',
      '½ tsp dried oregano',
      '1 tsp salt',
      '½ tsp black pepper',
      '¼ cup chicken broth or water',
      'Fresh parsley for garnish',
    ],
    instructions: [
      'Heat olive oil in a large skillet over medium heat. Add onion and bell pepper. Cook 4 minutes.',
      'Add garlic and cook 30 seconds.',
      'Add sweet potato. Cook 5 minutes, stirring occasionally.',
      'Add ground turkey, breaking it apart. Cook 6–8 minutes until no pink remains.',
      'Drain any excess fat or liquid.',
      'Add cumin, paprika, garlic powder, oregano, salt, and pepper. Stir to coat.',
      'Add chicken broth. Cover and cook 5 minutes until sweet potato is fork-tender.',
      'Garnish with fresh parsley and serve directly from the pan.',
    ],
  },
  stuffed: {
    title: 'Ground Turkey Stuffed Sweet Potato',
    description: 'Sweet potatoes stuffed with seasoned ground turkey — a naturally sweet, satisfying meal with zero cleanup.',
    time: '50 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground turkey',
      '4 medium sweet potatoes',
      '1 tbsp olive oil',
      '1 small onion, diced',
      '3 cloves garlic, minced',
      '1 tsp cumin',
      '1 tsp smoked paprika',
      '½ tsp chili powder',
      '1 tsp salt',
      '½ tsp black pepper',
      '2 tbsp chicken broth',
      '1 can (14 oz) black beans, drained (optional)',
      'Fresh cilantro and lime for serving',
    ],
    instructions: [
      'Preheat oven to 400°F. Pierce sweet potatoes all over with a fork. Place on a baking sheet and roast 40–45 minutes until tender.',
      'While potatoes bake, heat olive oil in a skillet over medium heat. Add onion and cook 3 minutes.',
      'Add garlic and cook 30 seconds. Add ground turkey and break apart. Cook 6–8 minutes until done.',
      'Add cumin, paprika, chili powder, salt, pepper, and broth. Stir and cook 1 minute.',
      'If using black beans, stir them in now and cook 2 more minutes.',
      'Slice baked sweet potatoes lengthwise. Fluff the inside with a fork.',
      'Spoon ground turkey filling generously into each sweet potato.',
      'Top with cilantro and a squeeze of lime.',
    ],
  },
  soup: {
    title: 'Ground Turkey Sweet Potato Soup',
    description: 'A warming, nourishing soup with ground turkey, sweet potato, and aromatic spices — cozy and ready in 30 minutes.',
    time: '30 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground turkey',
      '2 medium sweet potatoes, peeled and diced',
      '1 tbsp olive oil',
      '1 small onion, diced',
      '3 cloves garlic, minced',
      '4 cups chicken broth',
      '1 can (14 oz) diced tomatoes',
      '1 tsp cumin',
      '1 tsp smoked paprika',
      '½ tsp coriander',
      '1 tsp salt',
      '½ tsp black pepper',
      'Fresh parsley or cilantro for garnish',
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat. Add onion and cook 3 minutes.',
      'Add garlic and cook 30 seconds. Add ground turkey and break apart. Cook 5 minutes until mostly done.',
      'Add cumin, paprika, coriander, salt, and pepper. Stir to coat.',
      'Add sweet potatoes, chicken broth, and diced tomatoes. Stir to combine.',
      'Bring to a boil, then reduce heat and simmer 15 minutes until sweet potato is very tender.',
      'Taste and adjust seasoning.',
      'Serve garnished with fresh parsley or cilantro.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'bowl', label: 'Sweet Potato Bowl' },
  { key: 'skillet', label: 'Sweet Potato Skillet' },
  { key: 'stuffed', label: 'Stuffed Sweet Potato' },
  { key: 'soup', label: 'Sweet Potato Soup' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const GroundTurkeySweetPotato: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('bowl');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Ground Turkey Sweet Potato Recipes (Healthy One-Pan Dinners) | PantryPivot';
    const PAGE_DESC = 'Easy ground turkey and sweet potato recipes — bowls, skillet, stuffed sweet potato, and soup. Healthy meat-only meals ready in 30 minutes.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/ground-turkey-sweet-potato';
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
      "name": "Ground Turkey Sweet Potato",
      "description": "Easy ground turkey and sweet potato recipes — bowls, skillet, stuffed sweet potato, and soup. Healthy meat-only meals ready in 30 minutes.",
      "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT30M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "ground turkey sweet potato, ground turkey sweet potato bowl, healthy ground turkey recipes",
      "url": "https://pantrypivot.com/recipes/ground-turkey-sweet-potato",
      "recipeIngredient": [
        "1 lb ground turkey (93% lean)",
        "2 medium sweet potatoes, diced into 1-inch cubes",
        "1 tbsp olive oil (for turkey)",
        "1 tbsp olive oil (for sweet potato)",
        "1 small onion, diced"
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Preheat oven to 425°F. Toss diced sweet potato with 1 tbsp olive oil, ½ tsp salt, and a pinch of paprika. Spread on a baking sheet." },
        { "@type": "HowToStep", "text": "Roast sweet potatoes 20–25 minutes, flipping once, until golden and tender." },
        { "@type": "HowToStep", "text": "Meanwhile, heat 1 tbsp olive oil in a large skillet over medium-high heat. Add onion and cook 3 minutes." },
        { "@type": "HowToStep", "text": "Add garlic and cook 30 seconds. Add ground turkey and break apart with a spatula." },
        { "@type": "HowToStep", "text": "Cook turkey 6–8 minutes until browned and cooked through. Drain excess liquid." },
        { "@type": "HowToStep", "text": "Add cumin, paprika, chili powder, salt, and pepper. Stir to coat. Add broth and cook 1 minute." },
        { "@type": "HowToStep", "text": "Assemble bowls: rice or quinoa → seasoned turkey → roasted sweet potato." },
        { "@type": "HowToStep", "text": "Top with fresh cilantro and a squeeze of lime." }
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
        { "@type": "Question", "name": "Can I use regular potatoes instead of sweet potato?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — regular Yukon Gold or russet potatoes work as a direct substitute. They have a more neutral flavor compared to sweet potato's natural sweetness. Adjust the spices slightly — reduce the cinnamon if using regular potatoes as it pairs less naturally." } },
        { "@type": "Question", "name": "How do I stop sweet potatoes from getting mushy?", "acceptedAnswer": { "@type": "Answer", "text": "Cut sweet potatoes into uniform pieces (½-inch cubes for skillets, 1-inch for roasting). Don't overcrowd the pan — too many pieces steam instead of roast. For the skillet method, add sweet potatoes first and cook until nearly tender before adding turkey." } },
        { "@type": "Question", "name": "Is ground turkey sweet potato good for meal prep?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — this is an excellent meal prep dish. It reheats well, and the flavors actually improve overnight as the spices develop. Portion into containers with rice or quinoa for easy weekday lunches. Keeps in the fridge for up to 4 days." } },
        { "@type": "Question", "name": "What goes well with ground turkey and sweet potato?", "acceptedAnswer": { "@type": "Answer", "text": "Great pairings include cilantro lime rice, quinoa, roasted vegetables, or a simple green salad. A squeeze of fresh lime juice over the finished dish brightens all the flavors. Sliced avocado or a fresh tomato salsa makes a great topping." } }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById('faq-schema');
      if (el) el.remove();
    };
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'page-recipe-schema';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Recipe",
      "name": "Ground Turkey and Sweet Potato Recipes",
      "description": "Four kosher meat ground turkey and sweet potato recipes — bowls, skillet, stuffed sweet potatoes, and hearty soup.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "ground turkey sweet potato, kosher ground turkey, dairy-free dinner, healthy turkey dinner, stuffed sweet potato",
      "suitableForDiet": "https://schema.org/KosherDiet",
      "recipeIngredient": [
        "1 lb ground turkey",
        "2 large sweet potatoes",
        "1 medium onion, diced",
        "3 cloves garlic, minced",
        "2 tbsp olive oil",
        "1 tsp cumin",
        "1 tsp smoked paprika"
      ],
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Pierce sweet potatoes and microwave 5 minutes per side, or roast at 400°F for 45 minutes until tender." },
        { "@type": "HowToStep", "text": "Brown ground turkey in olive oil with onion and garlic. Season with cumin, paprika, salt, and pepper. Cook until turkey is cooked through." },
        { "@type": "HowToStep", "text": "Split sweet potatoes and stuff with turkey mixture, or serve turkey over cubed roasted sweet potato in a bowl." }
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
      {/* Header */}
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
            <li className="text-slate-600 font-medium">Ground Turkey Sweet Potato</li>
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
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Ground Turkey Sweet Potato Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Healthy, hearty, and ready in 30 minutes — ground turkey and sweet potato recipes your whole family will love.
          </p>
        </div>

        {/* Cookware CTA */}
        <div className="text-center mb-6">
          <a href="https://amzn.to/4bvEX2h" target="_blank" rel="noopener noreferrer"
            className="inline-block border-2 border-orange-400 text-orange-600 hover:bg-orange-50 font-bold py-2.5 px-6 rounded-2xl transition-all text-sm">
            Shop Skillets on Amazon →
          </a>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">What Can I Make With Ground Turkey and Sweet Potato?</h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto text-center mb-8 leading-relaxed">This page contains 4 kosher meat ground turkey and sweet potato recipes — bowls, skillet, stuffed sweet potatoes, and soup. All recipes are dairy-free. Ingredients are simple pantry staples with no specialty items required.</p>

        {/* Tabs */}
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

        {/* Recipe Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Recipe Header */}
          <div className="bg-orange-50 border-b border-orange-100 px-8 py-6">
            <h2 className="text-2xl font-black text-slate-900 mb-1">{recipe.title}</h2>
            <p className="text-slate-500 mb-4">{recipe.description}</p>
            <div className="flex gap-4 text-sm font-semibold text-slate-600">
              <span>⏱ {recipe.time}</span>
              <span>👥 {recipe.servings}</span>
            </div>
          </div>

          <div className="p-8 grid md:grid-cols-2 gap-10">
            {/* Ingredients */}
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-wide text-sm text-orange-600">
                Ingredients
              </h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-wide text-sm text-orange-600">
                Instructions
              </h3>
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

          {/* CTAs */}
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
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">Cooking Tips</h2>
          <ul className="space-y-3">
            {[
              'Cut sweet potatoes uniformly — ½-inch cubes for skillets, 1-inch cubes for roasting. Uniform size means everything cooks at the same rate.',
              'Roast sweet potatoes separately from the turkey for the best caramelization. When cooked together, the moisture from the turkey steams the potatoes instead of roasting them.',
              'Drain turkey well before adding spices — ground turkey releases moisture and the spices need to coat the meat, not dissolve in liquid.',
              'The cumin-cinnamon-paprika combination is the key spice combo for this dish. Do not skip the cinnamon — it is subtle but essential.',
              'Build complete bowls: a grain base (rice, quinoa) + seasoned turkey + sweet potato = a balanced, satisfying meal.',
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Substitutions */}
        <div id="substitutions" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mt-6">
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">Substitutions</h2>
          <ul className="space-y-3">
            {[
              'Sweet potato ↔ butternut squash: A direct substitute with a similar flavor profile and cooking behavior.',
              'Ground turkey ↔ ground chicken: 1:1 substitution with very similar results.',
              'White rice ↔ brown rice or quinoa: Brown rice adds fiber; quinoa is pareve and adds complete protein.',
              'Chicken broth ↔ vegetable broth: Makes the dish pareve — ideal when serving alongside dairy dishes.',
              'Fresh lime ↔ lemon juice: Lemon works if lime is not available — add just before serving for brightness.',
            ].map((sub, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                {sub}
              </li>
            ))}
          </ul>
        </div>

        {/* Storage */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mt-6">
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">Storage</h2>
          <ul className="space-y-3">
            {[
              'Fridge: 3–4 days in a sealed container.',
              'Freezer: Freeze (without toppings or cilantro) for up to 3 months.',
              'Reheat: In a skillet with a splash of chicken broth over medium heat.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div id="faq" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mt-6">
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I use regular potatoes instead of sweet potato?', a: "Yes — regular Yukon Gold or russet potatoes work as a direct substitute. They have a more neutral flavor compared to sweet potato's natural sweetness. Adjust the spices slightly — reduce the cinnamon if using regular potatoes as it pairs less naturally." },
              { q: 'How do I stop sweet potatoes from getting mushy?', a: 'Cut sweet potatoes into uniform pieces (½-inch cubes for skillets, 1-inch for roasting). Do not overcrowd the pan — too many pieces steam instead of roast. For the skillet method, add sweet potatoes first and cook until nearly tender before adding turkey.' },
              { q: 'Is ground turkey sweet potato good for meal prep?', a: 'Yes — this is an excellent meal prep dish. It reheats well, and the flavors actually improve overnight as the spices develop. Portion into containers with rice or quinoa for easy weekday lunches. Keeps in the fridge for up to 4 days.' },
              { q: 'What goes well with ground turkey and sweet potato?', a: 'Great pairings include cilantro lime rice, quinoa, roasted vegetables, or a simple green salad. A squeeze of fresh lime juice over the finished dish brightens all the flavors. Sliced avocado or a fresh tomato salsa makes a great topping.' },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-slate-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* More Recipes */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">More Recipes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Link to="/recipes/ground-turkey" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🦃</span> Ground Turkey
            </Link>
            <Link to="/recipes/chicken-and-rice" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍚</span> Chicken and Rice
            </Link>
            <Link to="/recipes/salmon" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🐟</span> Salmon Recipes
            </Link>
            <Link to="/recipes/air-fryer-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍗</span> Air Fryer Chicken
            </Link>
            <Link to="/recipes/beef-stew" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🥩</span> Beef Stew
            </Link>
            <Link to="/recipes/shakshuka" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍳</span> Shakshuka
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
          <Link to="/recipes/chicken-and-rice" className="text-slate-500 hover:text-orange-600 transition-colors">Chicken and Rice</Link>
          <Link to="/recipes/ground-beef-pasta" className="text-slate-500 hover:text-orange-600 transition-colors">Ground Beef Pasta</Link>
          <Link to="/recipes/instant-pot-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Instant Pot Chicken</Link>
          <Link to="/recipes/beef-stew" className="text-slate-500 hover:text-orange-600 transition-colors">Beef Stew</Link>
          <Link to="/recipes/roast-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Roast Chicken</Link>
          <Link to="/recipes/chicken-soup" className="text-slate-500 hover:text-orange-600 transition-colors">Chicken Soup</Link>
        </div>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed text-center">
          Disclosure: PantryPivot participates in the Amazon Associates Program. <br />
          As an Amazon Associate, we may earn from qualifying purchases at no additional cost to you.
        </p>
      </footer>
    </div>
  );
};

export default GroundTurkeySweetPotato;
