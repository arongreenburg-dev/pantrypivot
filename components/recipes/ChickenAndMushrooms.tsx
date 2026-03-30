import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare const window: Window & { gtag: (...args: unknown[]) => void };

type Tab = 'skillet' | 'baked' | 'soup' | 'stirfry';

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
    title: 'Garlic Chicken and Mushroom Skillet',
    description: 'Seared chicken thighs in a rich garlic-mushroom sauce made with chicken broth and thyme — deeply savory, completely dairy-free.',
    time: '35 min',
    servings: '4 servings',
    ingredients: [
      '4 bone-in, skin-on chicken thighs',
      '12 oz cremini mushrooms, sliced',
      '2 medium shallots, minced',
      '5 cloves garlic, minced',
      '1 cup chicken broth',
      '¼ cup dry white wine (or extra broth)',
      '1 tbsp fresh thyme leaves',
      '1 tbsp cornstarch + 2 tbsp cold water',
      '2 tbsp olive oil',
      '½ tsp salt',
      '¼ tsp black pepper',
      '2 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'Pat chicken thighs completely dry. Season with salt and pepper.',
      'Heat olive oil in a large oven-safe skillet over medium-high heat. Sear chicken skin-side down 6–7 minutes until deep golden brown. Flip and cook 4 more minutes. Remove and set aside.',
      'Add shallots to the same pan; cook 2 minutes. Add mushrooms in a single layer; cook undisturbed 3 minutes until they start to brown.',
      'Stir mushrooms, then cook 2 more minutes. Do not salt them yet.',
      'Add garlic and thyme; cook 1 minute. Add white wine; scrape up all the brown bits from the pan bottom.',
      'Add chicken broth; bring to a simmer. Return chicken skin-side up to the pan.',
      'Cover and simmer on medium-low 15 minutes until chicken reaches 165°F.',
      'Remove chicken. Stir cornstarch slurry into the sauce; cook 2 minutes until thickened. Season with salt and pepper. Return chicken to pan and serve garnished with parsley.',
    ],
  },
  baked: {
    title: 'Baked Chicken with Mushrooms',
    description: 'Chicken thighs baked with sliced mushrooms, garlic, fresh thyme, and white wine — hands-off and full of savory flavor.',
    time: '50 min',
    servings: '4 servings',
    ingredients: [
      '4 bone-in, skin-on chicken thighs',
      '12 oz cremini or shiitake mushrooms, sliced',
      '5 cloves garlic, minced',
      '½ cup chicken broth',
      '¼ cup dry white wine',
      '2 tbsp olive oil',
      '1 tbsp fresh thyme leaves',
      '1 tsp dried rosemary',
      '1 tsp smoked paprika',
      '½ tsp salt',
      '¼ tsp black pepper',
      '2 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'Preheat oven to 400°F.',
      'Pat chicken thighs dry. Rub with 1 tbsp olive oil, smoked paprika, salt, and pepper.',
      'Heat remaining oil in an oven-safe skillet over medium-high heat. Sear chicken skin-side down 5 minutes. Transfer to a plate.',
      'Add mushrooms, garlic, thyme, and rosemary to the skillet; cook 3 minutes.',
      'Pour in white wine; let it sizzle and reduce 1 minute. Add chicken broth.',
      'Nestle chicken skin-side up on top of the mushrooms. Spoon juices over the chicken.',
      'Bake 30–35 minutes until chicken is cooked through (165°F) and mushrooms are tender.',
      'Garnish with fresh parsley and serve with rice, crusty bread, or roasted vegetables.',
    ],
  },
  soup: {
    title: 'Chicken and Mushroom Soup',
    description: 'Rich, warming chicken and mushroom soup with garlic, thyme, and fresh herbs — no cream needed for depth and richness.',
    time: '50 min',
    servings: '6 servings',
    ingredients: [
      '1.5 lbs boneless, skinless chicken breast',
      '12 oz cremini mushrooms, sliced',
      '4 oz shiitake mushrooms, sliced',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '3 stalks celery, sliced',
      '6 cups chicken broth',
      '1 tbsp fresh thyme leaves',
      '1 tsp dried rosemary',
      '2 tbsp olive oil',
      '½ tsp salt',
      '¼ tsp black pepper',
      '3 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'In a large pot, heat olive oil over medium-high heat. Add chicken breasts; cook 6 minutes per side until golden. Remove and set aside to cool.',
      'Add onion and celery to the pot; cook 4 minutes. Add garlic; cook 1 minute.',
      'Add all mushrooms in two batches; cook each batch 4–5 minutes, undisturbed at first, until browned.',
      'Add chicken broth, thyme, and rosemary. Bring to a boil.',
      'Shred the cooked chicken with two forks. Return to the pot.',
      'Reduce heat and simmer 20 minutes.',
      'Season with salt and pepper.',
      'Ladle into bowls and garnish generously with fresh parsley.',
    ],
  },
  stirfry: {
    title: 'Chicken and Mushroom Stir-Fry',
    description: 'Thin-sliced chicken with shiitake and button mushrooms in garlic-ginger soy sauce — fast, savory, and completely dairy-free.',
    time: '20 min',
    servings: '4 servings',
    ingredients: [
      '1.5 lbs boneless, skinless chicken breast, sliced thin',
      '8 oz shiitake mushrooms, stems removed, caps sliced',
      '8 oz button mushrooms, sliced',
      '3 cloves garlic, minced',
      '1 tbsp fresh ginger, grated',
      '3 tbsp soy sauce',
      '1 tbsp oyster sauce',
      '1 tsp sesame oil',
      '1 tbsp cornstarch',
      '2 tbsp vegetable oil',
      '3 scallions, sliced, for garnish',
      '1 tsp sesame seeds, for garnish',
    ],
    instructions: [
      'Mix sauce: soy sauce, oyster sauce, and ½ tbsp cornstarch with 2 tbsp water. Set aside.',
      'Toss sliced chicken with remaining cornstarch.',
      'Heat vegetable oil in a wok over high heat. Stir-fry chicken 5–6 minutes until golden and cooked through. Remove.',
      'Wipe out any burnt bits. Add a little more oil and add all mushrooms in a single layer.',
      'Cook mushrooms undisturbed 3 minutes until browned. Stir and cook 2 more minutes.',
      'Add garlic and ginger; stir-fry 30 seconds.',
      'Return chicken to pan. Pour sauce over everything; toss 1–2 minutes until thickened.',
      'Drizzle sesame oil. Garnish with scallions and sesame seeds. Serve over steamed rice.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'skillet', label: 'Garlic Skillet' },
  { key: 'baked', label: 'Baked' },
  { key: 'soup', label: 'Soup' },
  { key: 'stirfry', label: 'Stir-Fry' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const ChickenAndMushrooms: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('skillet');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Chicken and Mushrooms Recipes (Skillet, Baked, Soup) | PantryPivot';
    const PAGE_DESC = 'Easy chicken and mushroom recipes — garlic skillet, baked, soup, and pasta. Rich, savory dinners that are completely dairy-free.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/chicken-and-mushrooms';
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
      "name": "Garlic Chicken and Mushroom Skillet",
      "description": "Seared chicken thighs in a rich garlic-mushroom sauce made with chicken broth and thyme — deeply savory, completely dairy-free.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT25M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "chicken and mushrooms, garlic mushroom chicken, dairy-free chicken skillet, chicken mushroom sauce",
      "url": "https://pantrypivot.com/recipes/chicken-and-mushrooms",
      "recipeIngredient": [
        "4 bone-in, skin-on chicken thighs",
        "12 oz cremini mushrooms, sliced",
        "2 medium shallots, minced",
        "5 cloves garlic, minced",
        "1 cup chicken broth",
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Pat chicken dry, season, and sear in olive oil skin-side down 6–7 minutes. Remove." },
        { "@type": "HowToStep", "text": "Cook shallots and mushrooms undisturbed 3 minutes until browned." },
        { "@type": "HowToStep", "text": "Add garlic, thyme, wine, and broth. Return chicken and simmer 15 minutes." },
        { "@type": "HowToStep", "text": "Thicken sauce with cornstarch slurry. Season and serve." },
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
        { "@type": "Question", "name": "How do I make a creamy chicken mushroom sauce without dairy?", "acceptedAnswer": { "@type": "Answer", "text": "Use chicken broth as the base and thicken with a cornstarch slurry (1 tbsp cornstarch + 2 tbsp cold water). It creates a glossy, rich sauce without any dairy." } },
        { "@type": "Question", "name": "What mushrooms work best with chicken?", "acceptedAnswer": { "@type": "Answer", "text": "Cremini (baby bellas) for everyday cooking, shiitake for depth and umami, portobello for a meatier texture." } },
        { "@type": "Question", "name": "How do I stop mushrooms from getting slimy when cooking?", "acceptedAnswer": { "@type": "Answer", "text": "Cook on high heat, don't crowd the pan, and don't add salt until after they start to brown. Salting too early draws out moisture." } },
        { "@type": "Question", "name": "Can I use canned mushrooms?", "acceptedAnswer": { "@type": "Answer", "text": "You can, but fresh mushrooms have far better flavor and texture. Canned mushrooms work best in soups where texture matters less." } },
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
      "name": "Chicken and Mushrooms Recipes",
      "description": "Four kosher meat chicken and mushroom recipes — garlic skillet, baked, soup, and stir-fry.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "chicken and mushrooms, kosher chicken dinner, dairy-free chicken mushroom, mushroom chicken skillet",
      "suitableForDiet": "https://schema.org/KosherDiet",
      "recipeIngredient": [
        "1.5 lbs boneless chicken thighs or breasts",
        "2 cups cremini or button mushrooms, sliced",
        "3 cloves garlic, minced",
        "1 medium onion, diced",
        "1 cup chicken broth",
        "2 tbsp olive oil",
        "fresh thyme"
      ],
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Season chicken and sear in olive oil 4–5 minutes per side until golden. Remove from pan." },
        { "@type": "HowToStep", "text": "Cook mushrooms in the same pan over high heat 5 minutes until browned. Add garlic and onion, cook 2 minutes more." },
        { "@type": "HowToStep", "text": "Return chicken to pan with broth and thyme. Simmer 10–12 minutes until chicken is cooked through and sauce has reduced." }
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
            <li className="text-slate-600 font-medium">Chicken and Mushrooms</li>
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
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Chicken and Mushrooms Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Rich, savory chicken and mushroom dinners — garlic-forward and completely dairy-free.</p>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">What Can I Make With Chicken and Mushrooms?</h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto text-center mb-8 leading-relaxed">This page contains 4 kosher meat chicken and mushroom recipes — skillet, baked, soup, and stir-fry. All recipes are dairy-free. Ingredients are simple pantry staples with no specialty items required.</p>

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
              "Don't wash mushrooms under running water — they absorb moisture and steam instead of sear. Wipe with a damp cloth.",
              'Let mushrooms cook undisturbed for 2–3 minutes before stirring — they need to brown, not steam.',
              'Use bone-in chicken thighs for maximum flavor in the broth-based sauce.',
              'For a thick sauce without cream: make a slurry of 1 tbsp cornstarch + 2 tbsp cold water, stir in at the end.',
              'A splash of white wine (or extra broth) after browning mushrooms lifts all the fond and adds depth.',
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
              'Cremini mushrooms ↔ shiitake: Shiitake have deeper umami; remove tough stems before cooking.',
              'Cremini ↔ portobello: Portobello creates a meatier, more substantial texture.',
              'Chicken thighs ↔ chicken breasts: Breasts are leaner but dry out faster; reduce sear time by 2 minutes.',
              'White wine ↔ chicken broth + 1 tsp apple cider vinegar: Adds brightness without alcohol.',
              'Fresh thyme ↔ dried thyme: Use ½ tsp dried for every 1 tbsp fresh.',
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
              'Reheat on stovetop over medium-low heat — the sauce thickens when chilled, so add a splash of broth.',
              'Soup keeps 5 days in the fridge and freezes up to 3 months.',
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
              { q: 'How do I make a creamy chicken mushroom sauce without dairy?', a: 'Use chicken broth as the base and thicken with a cornstarch slurry (1 tbsp cornstarch + 2 tbsp cold water). It creates a glossy, rich sauce without any dairy.' },
              { q: 'What mushrooms work best with chicken?', a: 'Cremini (baby bellas) for everyday cooking, shiitake for depth and umami, portobello for a meatier texture.' },
              { q: 'How do I stop mushrooms from getting slimy when cooking?', a: "Cook on high heat, don't crowd the pan, and don't add salt until after they start to brown. Salting too early draws out moisture." },
              { q: 'Can I use canned mushrooms?', a: 'You can, but fresh mushrooms have far better flavor and texture. Canned mushrooms work best in soups where texture matters less.' },
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
              { to: '/recipes/roast-chicken', label: '🍗 Roast Chicken' },
              { to: '/recipes/air-fryer-chicken', label: '🍗 Air Fryer Chicken' },
              { to: '/recipes/chicken-and-spinach', label: '🌿 Chicken and Spinach' },
              { to: '/recipes/crockpot-chicken', label: '🍲 Crockpot Chicken' },
              { to: '/recipes/chicken-soup', label: '🍜 Chicken Soup' },
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
            { to: '/recipes/roast-chicken', label: '🍗 Roast Chicken' },
            { to: '/recipes/air-fryer-chicken', label: '🍗 Air Fryer Chicken' },
            { to: '/recipes/chicken-and-spinach', label: '🌿 Chicken and Spinach' },
            { to: '/recipes/crockpot-chicken', label: '🍲 Crockpot Chicken' },
            { to: '/recipes/chicken-soup', label: '🍜 Chicken Soup' },
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

export default ChickenAndMushrooms;
