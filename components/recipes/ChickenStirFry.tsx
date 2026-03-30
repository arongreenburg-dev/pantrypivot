import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare const window: Window & { gtag: (...args: unknown[]) => void };

type Tab = 'garlic' | 'teriyaki' | 'spicy' | 'veggie';

interface Recipe {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

const recipes: Record<Tab, Recipe> = {
  garlic: {
    title: 'Garlic Ginger Chicken Stir-Fry',
    description: 'Crispy chicken strips with broccoli and bell pepper in a garlic-ginger soy sauce — better than takeout in 20 minutes.',
    time: '20 min',
    servings: '4 servings',
    ingredients: [
      '1.5 lbs boneless, skinless chicken breast, sliced thin',
      '2 cups broccoli florets',
      '1 red bell pepper, sliced',
      '4 cloves garlic, minced',
      '1 tbsp fresh ginger, grated',
      '3 tbsp soy sauce',
      '1 tbsp oyster sauce',
      '1 tsp sesame oil',
      '1 tbsp cornstarch',
      '2 tbsp vegetable oil',
      '¼ cup chicken broth',
      '1 tsp sugar',
    ],
    instructions: [
      'Mix sauce: soy sauce, oyster sauce, broth, sugar, and ½ tbsp cornstarch. Set aside.',
      'Toss chicken with remaining cornstarch and a pinch of pepper.',
      'Heat vegetable oil in a wok over high heat until smoking. Add chicken in a single layer; cook undisturbed 2 minutes, then stir-fry 3–4 more minutes until cooked through. Remove.',
      'Add broccoli to the wok; stir-fry 2 minutes.',
      'Add bell pepper; stir-fry 1 minute.',
      'Push vegetables to one side. Add garlic and ginger; cook 30 seconds.',
      'Return chicken to pan. Pour sauce over; toss 1–2 minutes until thickened and coating everything.',
      'Drizzle sesame oil. Serve immediately over steamed rice.',
    ],
  },
  teriyaki: {
    title: 'Teriyaki Chicken Stir-Fry',
    description: 'Chicken thighs with homemade teriyaki sauce, broccoli, and snap peas — sweet, savory, and ready in 25 minutes.',
    time: '25 min',
    servings: '4 servings',
    ingredients: [
      '1.5 lbs boneless, skinless chicken thighs, sliced',
      '2 cups broccoli florets',
      '1 cup sugar snap peas',
      '3 cloves garlic, minced',
      '3 tbsp soy sauce',
      '2 tbsp mirin',
      '1 tbsp honey',
      '1 tsp fresh ginger, grated',
      '1 tsp sesame oil',
      '2 tbsp vegetable oil',
      '1 tbsp sesame seeds, for garnish',
      '3 scallions, sliced, for garnish',
    ],
    instructions: [
      'Mix teriyaki sauce: soy sauce, mirin, honey, garlic, and ginger in a small bowl.',
      'Heat vegetable oil in a wok or large skillet over high heat.',
      'Add chicken; stir-fry 6–7 minutes until golden and cooked through. Remove.',
      'Add broccoli; stir-fry 3 minutes until bright green and tender-crisp.',
      'Add snap peas; stir-fry 1 minute.',
      'Return chicken to pan. Pour teriyaki sauce over everything.',
      'Toss and cook 2 minutes until sauce reduces slightly and coats the chicken and vegetables.',
      'Drizzle sesame oil. Garnish with sesame seeds and scallions. Serve over rice.',
    ],
  },
  spicy: {
    title: 'Spicy Szechuan Chicken Stir-Fry',
    description: 'Chicken with Szechuan peppercorns, dried chilies, garlic, ginger, and black vinegar — bold, numbing heat in 20 minutes.',
    time: '20 min',
    servings: '4 servings',
    ingredients: [
      '1.5 lbs boneless, skinless chicken breast, sliced',
      '1 tsp Szechuan peppercorns (or ½ tsp red chili flakes)',
      '6 dried red chilies',
      '4 cloves garlic, minced',
      '1 tbsp fresh ginger, grated',
      '3 tbsp soy sauce',
      '1 tbsp black vinegar (or rice vinegar)',
      '1 tsp sesame oil',
      '1 tbsp cornstarch',
      '2 tbsp vegetable oil',
      '1 tsp sugar',
      '2 scallions, sliced, for garnish',
    ],
    instructions: [
      'Toss chicken with cornstarch and a pinch of salt.',
      'Toast Szechuan peppercorns in a dry pan over medium heat 1 minute until fragrant. Crush lightly.',
      'Mix sauce: soy sauce, black vinegar, sugar, and sesame oil.',
      'Heat vegetable oil in a wok over high heat. Add dried chilies and toasted peppercorns; stir-fry 30 seconds until fragrant.',
      'Add chicken; stir-fry 5–6 minutes until golden and cooked through.',
      'Add garlic and ginger; stir-fry 30 seconds.',
      'Pour sauce over; toss 1–2 minutes until chicken is coated and sauce thickens.',
      'Garnish with scallions and serve over rice.',
    ],
  },
  veggie: {
    title: 'Chicken and Vegetable Stir-Fry',
    description: 'Chicken breast with bok choy, mushrooms, snap peas, and carrots in a light garlic-soy sauce — clean, balanced, and quick.',
    time: '25 min',
    servings: '4 servings',
    ingredients: [
      '1.5 lbs boneless, skinless chicken breast, sliced',
      '2 cups baby bok choy, halved',
      '8 oz shiitake or button mushrooms, sliced',
      '1 cup sugar snap peas',
      '2 medium carrots, julienned',
      '3 cloves garlic, minced',
      '1 tbsp fresh ginger, grated',
      '3 tbsp soy sauce',
      '1 tsp sesame oil',
      '1 tbsp cornstarch',
      '2 tbsp vegetable oil',
      '¼ cup chicken broth',
    ],
    instructions: [
      'Mix sauce: soy sauce, broth, and ½ tbsp cornstarch. Set aside.',
      'Toss chicken with remaining cornstarch.',
      'Heat vegetable oil in a wok over high heat. Stir-fry chicken 5–6 minutes until cooked through. Remove.',
      'Add carrots; stir-fry 2 minutes.',
      'Add mushrooms; cook undisturbed 2 minutes until they start to brown, then stir.',
      'Add snap peas and bok choy; stir-fry 2 minutes.',
      'Add garlic and ginger; stir-fry 30 seconds.',
      'Return chicken. Pour sauce over; toss until thickened. Drizzle sesame oil and serve over rice.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'garlic', label: 'Garlic Ginger' },
  { key: 'teriyaki', label: 'Teriyaki' },
  { key: 'spicy', label: 'Spicy Szechuan' },
  { key: 'veggie', label: 'Chicken & Vegetables' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const ChickenStirFry: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('garlic');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Chicken Stir-Fry Recipes (Garlic, Teriyaki, Spicy) | PantryPivot';
    const PAGE_DESC = 'Quick and easy chicken stir-fry recipes — garlic ginger, teriyaki, spicy, and vegetable. Better than takeout in 20 minutes. No dairy.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/chicken-stir-fry';
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
      "name": "Garlic Ginger Chicken Stir-Fry",
      "description": "Crispy chicken strips with broccoli and bell pepper in a garlic-ginger soy sauce — better than takeout in 20 minutes.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT10M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "Chinese-American",
      "keywords": "chicken stir-fry, garlic ginger chicken, teriyaki stir-fry, quick chicken dinner, dairy-free stir-fry",
      "url": "https://pantrypivot.com/recipes/chicken-stir-fry",
      "recipeIngredient": [
        "1.5 lbs boneless, skinless chicken breast, sliced thin",
        "2 cups broccoli florets",
        "1 red bell pepper, sliced",
        "4 cloves garlic, minced",
        "1 tbsp fresh ginger, grated",
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Mix sauce. Toss chicken with cornstarch." },
        { "@type": "HowToStep", "text": "Stir-fry chicken in hot wok until cooked through. Remove." },
        { "@type": "HowToStep", "text": "Stir-fry broccoli and bell pepper. Add garlic and ginger." },
        { "@type": "HowToStep", "text": "Return chicken, pour sauce, toss until thickened. Drizzle sesame oil and serve." },
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
        { "@type": "Question", "name": "How do I make stir-fry sauce not watery?", "acceptedAnswer": { "@type": "Answer", "text": "Add 1 tsp cornstarch to your sauce mixture — it thickens when it hits the hot pan. Also make sure vegetables are dry before adding." } },
        { "@type": "Question", "name": "What oil is best for stir-fry?", "acceptedAnswer": { "@type": "Answer", "text": "Use a high smoke-point oil: vegetable, canola, or avocado oil. Sesame oil is a finisher — add at the end for flavor, not for cooking." } },
        { "@type": "Question", "name": "How do I keep chicken from sticking in a stir-fry?", "acceptedAnswer": { "@type": "Answer", "text": "Make sure the pan is very hot before adding chicken, and don't move the chicken for 2 minutes — let it sear and naturally release before stirring." } },
        { "@type": "Question", "name": "Can I make stir-fry ahead of time?", "acceptedAnswer": { "@type": "Answer", "text": "Prep all vegetables and sauce ahead, but stir-fry is best cooked fresh. Pre-cooked stir-fry reheats okay but loses the crispy, caramelized texture." } },
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
      "name": "Chicken Stir-Fry Recipes",
      "description": "Four kosher meat chicken stir-fry recipes — garlic, teriyaki, spicy, and vegetable variations ready in 25 minutes.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "chicken stir-fry, kosher chicken, dairy-free chicken, wok chicken, easy stir-fry dinner",
      "suitableForDiet": "https://schema.org/KosherDiet",
      "recipeIngredient": [
        "1.5 lbs boneless skinless chicken breast, sliced thin",
        "2 cups mixed vegetables (broccoli, snap peas, bell pepper)",
        "3 cloves garlic, minced",
        "1 tbsp fresh ginger, grated",
        "3 tbsp soy sauce",
        "1 tbsp sesame oil",
        "2 tbsp vegetable oil"
      ],
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Slice chicken thin against the grain. Toss with cornstarch, salt, and pepper." },
        { "@type": "HowToStep", "text": "Heat wok or large skillet over high heat until smoking. Add oil, then cook chicken in a single layer 5–6 minutes until golden. Remove." },
        { "@type": "HowToStep", "text": "Stir-fry vegetables 3 minutes. Add garlic and ginger 30 seconds. Return chicken, add sauce, toss 1–2 minutes until thickened. Serve over rice." }
      ],
      "prepTime": "PT15M",
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
            <li className="text-slate-600 font-medium">Chicken Stir-Fry</li>
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
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Chicken Stir-Fry Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Faster than takeout — crispy, saucy chicken stir-fry four delicious ways.</p>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">What Can I Make With Chicken for a Stir-Fry?</h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto text-center mb-8 leading-relaxed">This page contains 4 kosher meat chicken stir-fry recipes — garlic, teriyaki, spicy, and vegetable. All recipes are dairy-free. Ingredients are simple pantry staples with no specialty items required.</p>

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
              'The secret to stir-fry: high heat, small batches, constant movement.',
              'Velveting the chicken makes it restaurant-soft: toss raw chicken with 1 tsp baking soda + 1 tbsp soy sauce, rest 20 minutes, rinse.',
              'Have everything prepped and at the pan before you start cooking — stir-fry moves fast.',
              'Cook sauce ingredients (garlic, ginger) for just 30 seconds before adding liquids — they burn quickly on high heat.',
              "Don't add soy sauce to a screaming hot dry pan — it burns immediately. Add the sauce mixture after all proteins and vegetables are cooked.",
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
              'Oyster sauce ↔ hoisin sauce: Slightly sweeter and thicker — use a bit less.',
              'Mirin ↔ rice wine vinegar + 1 tsp sugar: Adds the same sweet-savory note to teriyaki.',
              'Fresh ginger ↔ ground ginger: Use ½ tsp ground ginger per 1 tbsp fresh.',
              'Broccoli ↔ bok choy or green beans: All cook quickly and absorb sauce beautifully.',
              'Chicken breast ↔ chicken thighs: Thighs are more forgiving; they won\'t dry out if slightly overcooked.',
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
              'Best served immediately — stir-fry loses its crispy texture as it sits.',
              'Leftovers keep 3 days in the fridge; reheat in a hot skillet with a splash of soy sauce.',
              'Avoid microwaving stir-fry — it steams the chicken and makes vegetables limp.',
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
              { q: 'How do I make stir-fry sauce not watery?', a: 'Add 1 tsp cornstarch to your sauce mixture — it thickens when it hits the hot pan. Also make sure vegetables are dry before adding.' },
              { q: 'What oil is best for stir-fry?', a: 'Use a high smoke-point oil: vegetable, canola, or avocado oil. Sesame oil is a finisher — add at the end for flavor, not for cooking.' },
              { q: 'How do I keep chicken from sticking in a stir-fry?', a: "Make sure the pan is very hot before adding chicken, and don't move the chicken for 2 minutes — let it sear and naturally release before stirring." },
              { q: 'Can I make stir-fry ahead of time?', a: "Prep all vegetables and sauce ahead, but stir-fry is best cooked fresh. Pre-cooked stir-fry reheats okay but loses the crispy, caramelized texture." },
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
              { to: '/recipes/chicken-and-broccoli', label: '🥦 Chicken and Broccoli' },
              { to: '/recipes/chicken-and-vegetables', label: '🥦 Chicken and Vegetables' },
              { to: '/recipes/chicken-and-mushrooms', label: '🍄 Chicken and Mushrooms' },
              { to: '/recipes/air-fryer-chicken', label: '🍗 Air Fryer Chicken' },
              { to: '/recipes/one-pan-chicken', label: '🍳 One-Pan Chicken' },
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
            { to: '/recipes/chicken-and-broccoli', label: '🥦 Chicken and Broccoli' },
            { to: '/recipes/chicken-and-vegetables', label: '🥦 Chicken and Vegetables' },
            { to: '/recipes/chicken-and-mushrooms', label: '🍄 Chicken and Mushrooms' },
            { to: '/recipes/air-fryer-chicken', label: '🍗 Air Fryer Chicken' },
            { to: '/recipes/one-pan-chicken', label: '🍳 One-Pan Chicken' },
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

export default ChickenStirFry;
