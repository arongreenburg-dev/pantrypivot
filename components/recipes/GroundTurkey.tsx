import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'classic' | 'bowls' | 'sweetpotato' | 'healthy';

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
    title: 'Classic Ground Turkey',
    description: 'Savory seasoned ground turkey — a lean, versatile base for tacos, pasta, bowls, or lettuce wraps.',
    time: '20 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground turkey (93% lean)',
      '1 tbsp olive oil',
      '1 small onion, diced',
      '3 cloves garlic, minced',
      '1 tsp cumin',
      '1 tsp smoked paprika',
      '½ tsp chili powder',
      '½ tsp dried oregano',
      '1 tsp salt',
      '¼ tsp black pepper',
      '2 tbsp chicken broth or water',
    ],
    instructions: [
      'Heat olive oil in a large skillet over medium-high heat.',
      'Add diced onion and cook 3–4 minutes until softened.',
      'Add garlic and cook 30 seconds until fragrant.',
      'Add ground turkey, breaking it apart with a spatula. Cook 6–8 minutes until no pink remains.',
      'Drain any excess liquid from the pan.',
      'Add cumin, paprika, chili powder, oregano, salt, and pepper. Stir to coat.',
      'Add broth or water and stir, scraping up any browned bits. Cook 1–2 more minutes.',
      'Taste and adjust seasoning. Serve over rice, in tacos, or in lettuce wraps.',
    ],
  },
  bowls: {
    title: 'Ground Turkey Bowls',
    description: 'Seasoned ground turkey over rice with roasted vegetables — a complete, satisfying meal prep bowl.',
    time: '30 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground turkey',
      '2 cups cooked white or brown rice',
      '1 zucchini, diced',
      '1 red bell pepper, diced',
      '1 cup corn kernels (frozen or canned)',
      '1 tbsp olive oil',
      '3 cloves garlic, minced',
      '1 tsp cumin',
      '1 tsp smoked paprika',
      '½ tsp garlic powder',
      '1 tsp salt',
      '¼ tsp black pepper',
      '1 lime, juiced',
      '2 tbsp fresh cilantro, chopped (optional)',
    ],
    instructions: [
      'Heat olive oil in a large skillet over medium-high heat.',
      'Add ground turkey, breaking apart as it cooks, until browned — about 7 minutes. Drain excess liquid.',
      'Push turkey to one side. Add zucchini and bell pepper to the other side and cook 4 minutes.',
      'Add garlic, corn, cumin, paprika, garlic powder, salt, and pepper. Stir everything together.',
      'Cook 2–3 more minutes until vegetables are tender and everything is well seasoned.',
      'Squeeze lime juice over the pan and stir.',
      'Serve over warm rice and top with cilantro if using.',
    ],
  },
  sweetpotato: {
    title: 'Ground Turkey and Sweet Potato',
    description: 'A hearty one-pan meal with lean turkey and caramelized sweet potato — naturally sweet and savory.',
    time: '35 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground turkey',
      '2 medium sweet potatoes, peeled and diced into ½-inch cubes',
      '1 small onion, diced',
      '3 cloves garlic, minced',
      '2 tbsp olive oil, divided',
      '1 tsp cumin',
      '1 tsp smoked paprika',
      '½ tsp cinnamon',
      '½ tsp chili powder',
      '1 tsp salt',
      '¼ tsp black pepper',
      '¼ cup chicken broth',
    ],
    instructions: [
      'Heat 1 tbsp olive oil in a large skillet over medium-high heat.',
      'Add sweet potato cubes, season with ½ tsp salt and ¼ tsp paprika. Cook 8–10 minutes, stirring occasionally, until tender and lightly caramelized. Remove and set aside.',
      'In the same skillet, heat remaining 1 tbsp olive oil. Add onion and cook 3 minutes.',
      'Add garlic and cook 30 seconds.',
      'Add ground turkey and cook, breaking apart, until browned — about 7 minutes.',
      'Add cumin, remaining paprika, cinnamon, chili powder, salt, and pepper. Stir to coat.',
      'Return sweet potatoes to the pan. Add chicken broth and stir everything together.',
      'Cook 2–3 minutes until broth is absorbed and flavors meld. Serve immediately.',
    ],
  },
  healthy: {
    title: 'Healthy Ground Turkey Dinner',
    description: 'A light, protein-packed turkey skillet with spinach and tomatoes — ready in under 25 minutes.',
    time: '25 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground turkey (93% lean)',
      '3 cups baby spinach',
      '1 can (14.5 oz) diced tomatoes, drained',
      '1 small onion, finely diced',
      '3 cloves garlic, minced',
      '1 tbsp olive oil',
      '1 tsp Italian seasoning',
      '½ tsp smoked paprika',
      '½ tsp cumin',
      '1 tsp salt',
      '¼ tsp red pepper flakes (optional)',
      '¼ tsp black pepper',
    ],
    instructions: [
      'Heat olive oil in a large skillet over medium heat.',
      'Add onion and cook 3–4 minutes until soft.',
      'Add garlic and cook 30 seconds.',
      'Increase heat to medium-high. Add ground turkey and break apart as it cooks — about 7 minutes until no pink remains.',
      'Drain any excess liquid.',
      'Stir in Italian seasoning, paprika, cumin, salt, pepper, and red pepper flakes.',
      'Add drained diced tomatoes. Stir and cook 2 minutes.',
      'Add spinach and fold in until wilted — about 1–2 minutes.',
      'Taste, adjust seasoning, and serve over cauliflower rice, regular rice, or on its own.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'classic', label: 'Classic Ground Turkey' },
  { key: 'bowls', label: 'Ground Turkey Bowls' },
  { key: 'sweetpotato', label: 'Ground Turkey & Sweet Potato' },
  { key: 'healthy', label: 'Healthy Ground Turkey Dinner' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const GroundTurkey: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('classic');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];
  useEffect(() => {
    const PAGE_TITLE = 'Ground Turkey Recipes (Lean and Flavorful Dinners) | PantryPivot';
    const PAGE_DESC = 'Easy ground turkey recipes — classic, bowls, sweet potato, and healthy dinner ideas. Quick meat-only meals under 30 minutes.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/ground-turkey';
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
      "name": "Ground Turkey Recipes",
      "description": "Easy ground turkey recipes — classic, bowls, sweet potato, and healthy dinner ideas. Quick meat-only meals under 30 minutes.",
      "image": "https://images.pexels.com/photos/34429593/pexels-photo-34429593.jpeg?auto=compresshttps://images.pexels.com/photos/34429593/pexels-photo-34429593.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT30M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "ground turkey recipes, easy ground turkey, ground turkey dinner",
      "url": "https://pantrypivot.com/recipes/ground-turkey",
      "recipeIngredient": [
        "1 lb ground turkey (93% lean)",
        "1 tbsp olive oil",
        "1 small onion, diced",
        "3 cloves garlic, minced",
        "1 tsp cumin"
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Heat olive oil in a large skillet over medium-high heat." },
        { "@type": "HowToStep", "text": "Add diced onion and cook 3–4 minutes until softened." },
        { "@type": "HowToStep", "text": "Add garlic and cook 30 seconds until fragrant." },
        { "@type": "HowToStep", "text": "Add ground turkey, breaking it apart with a spatula. Cook 6–8 minutes until no pink remains." },
        { "@type": "HowToStep", "text": "Drain any excess liquid from the pan." },
        { "@type": "HowToStep", "text": "Add cumin, paprika, chili powder, oregano, salt, and pepper. Stir to coat." },
        { "@type": "HowToStep", "text": "Add broth or water and stir, scraping up any browned bits. Cook 1–2 more minutes." },
        { "@type": "HowToStep", "text": "Taste and adjust seasoning. Serve over rice, in tacos, or in lettuce wraps." }
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
        { "@type": "Question", "name": "Is ground turkey healthier than ground beef?", "acceptedAnswer": { "@type": "Answer", "text": "Ground turkey (93% lean) has less fat and fewer calories than most ground beef. However, ground beef has more iron, zinc, and B12. For a kosher meal prep perspective, ground turkey is a leaner protein that works well in almost any ground beef recipe." } },
        { "@type": "Question", "name": "Why is my ground turkey so dry?", "acceptedAnswer": { "@type": "Answer", "text": "Ground turkey dries out faster than beef because it has less fat. Don't overcook it — remove from heat as soon as it reaches 165°F. Adding 2–3 tbsp of chicken broth or water while cooking keeps it moist. Thighs-based ground turkey stays juicier than breast-based." } },
        { "@type": "Question", "name": "Can I substitute ground turkey for ground beef?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — in most recipes like tacos, pasta sauce, or rice bowls, ground turkey is a direct substitute. Season it more aggressively since it has less natural fat and flavor. It's leaner, so you may need to add a little extra olive oil." } },
        { "@type": "Question", "name": "How do I add more flavor to ground turkey?", "acceptedAnswer": { "@type": "Answer", "text": "Season generously — ground turkey needs more seasoning than beef. Use cumin, smoked paprika, garlic, and onion for savory depth. Adding a tablespoon of chicken broth while cooking keeps it moist and adds flavor. Fresh garlic is more impactful than garlic powder here." } }
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
            <li className="text-slate-600 font-medium">Ground Turkey</li>
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
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Ground Turkey Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Lean, flavorful, and endlessly versatile — ground turkey recipes the whole family will love.
          </p>
        </div>

        {/* Amazon CTA */}
        <div className="text-center mb-6">
          <a
            href="https://amzn.to/4bvEX2h"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-colors text-sm"
          >
            Shop Skillets and Pans on Amazon →
          </a>
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
              "Don't overcook ground turkey. Remove it from the heat as soon as it reaches 165°F — overcooked turkey is dry and crumbly.",
              'Drain excess liquid after browning. Turkey releases more moisture than beef and can steam itself if the liquid builds up.',
              'Season generously. Ground turkey has less natural fat than beef, so you need more spices and aromatics to build flavor.',
              "Use high heat for browning. A hot pan gets better color and caramelization — don't stir constantly, let it sit and brown.",
              "Don't press down on the turkey while cooking. Pressing squeezes out the moisture that keeps it tender.",
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
              'Ground turkey ↔ ground chicken: A direct 1:1 substitution with virtually identical cooking behavior and flavor.',
              '93% lean ↔ 85% lean ground turkey: The fattier 85% lean turkey is juicier and more forgiving — great for beginners.',
              'Cumin ↔ curry powder: For an entirely different flavor profile, substitute the cumin with ½ tsp curry powder.',
              'Chicken broth ↔ water: Plain water works fine for keeping turkey moist while cooking — the seasoning provides all the flavor.',
              'Fresh garlic (3 cloves) ↔ garlic powder (¾ tsp): A useful pantry swap when fresh garlic is not available.',
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
              'Freezer: Freeze cooked turkey for 3–4 months.',
              'Reheat: In a skillet with a splash of broth over medium-low heat to keep it moist.',
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
              { q: 'Is ground turkey healthier than ground beef?', a: 'Ground turkey (93% lean) has less fat and fewer calories than most ground beef. However, ground beef has more iron, zinc, and B12. For a kosher meal prep perspective, ground turkey is a leaner protein that works well in almost any ground beef recipe.' },
              { q: 'Why is my ground turkey so dry?', a: "Ground turkey dries out faster than beef because it has less fat. Don't overcook it — remove from heat as soon as it reaches 165°F. Adding 2–3 tbsp of chicken broth or water while cooking keeps it moist. Thighs-based ground turkey stays juicier than breast-based." },
              { q: 'Can I substitute ground turkey for ground beef?', a: "Yes — in most recipes like tacos, pasta sauce, or rice bowls, ground turkey is a direct substitute. Season it more aggressively since it has less natural fat and flavor. It's leaner, so you may need to add a little extra olive oil." },
              { q: 'How do I add more flavor to ground turkey?', a: 'Season generously — ground turkey needs more seasoning than beef. Use cumin, smoked paprika, garlic, and onion for savory depth. Adding a tablespoon of chicken broth while cooking keeps it moist and adds flavor. Fresh garlic is more impactful than garlic powder here.' },
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
            <Link to="/recipes/ground-beef-pasta" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍝</span> Ground Beef Pasta
            </Link>
            <Link to="/recipes/chicken-and-rice" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍚</span> Chicken and Rice
            </Link>
            <Link to="/recipes/ground-turkey-sweet-potato" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍠</span> Turkey Sweet Potato
            </Link>
            <Link to="/recipes/air-fryer-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍗</span> Air Fryer Chicken
            </Link>
            <Link to="/recipes/shakshuka" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍳</span> Shakshuka
            </Link>
            <Link to="/recipes/salmon" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🐟</span> Salmon Recipes
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
          <Link to="/recipes/chicken-and-rice" className="text-slate-500 hover:text-orange-600 transition-colors">Chicken and Rice</Link>
          <Link to="/recipes/ground-beef-pasta" className="text-slate-500 hover:text-orange-600 transition-colors">Ground Beef Pasta</Link>
          <Link to="/recipes/instant-pot-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Instant Pot Chicken</Link>
          <Link to="/recipes/shakshuka" className="text-slate-500 hover:text-orange-600 transition-colors">Shakshuka</Link>
        </div>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed text-center">
          Disclosure: PantryPivot participates in the Amazon Associates Program. <br />
          As an Amazon Associate, we may earn from qualifying purchases at no additional cost to you.
        </p>
      </footer>
    </div>
  );
};

export default GroundTurkey;
