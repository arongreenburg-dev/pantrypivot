import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare const window: Window & { gtag: (...args: unknown[]) => void };

type Tab = 'stirfry' | 'sheetpan' | 'baked' | 'bowl';

interface Recipe {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

const recipes: Record<Tab, Recipe> = {
  stirfry: {
    title: 'Classic Chicken and Broccoli Stir-Fry',
    description: 'Chinese-American stir-fry with garlic-ginger sauce, soy sauce, and sesame oil — better than takeout in 25 minutes.',
    time: '25 min',
    servings: '4 servings',
    ingredients: [
      '1.5 lbs boneless skinless chicken breast, sliced thin',
      '4 cups broccoli florets',
      '3 cloves garlic, minced',
      '1 tbsp fresh ginger, grated',
      '3 tbsp soy sauce',
      '1 tbsp oyster sauce',
      '1 tsp sesame oil',
      '1 tbsp cornstarch, divided',
      '2 tbsp vegetable oil',
      '½ tsp black pepper',
      '1 tsp sugar',
      '¼ cup chicken broth',
    ],
    instructions: [
      'Mix sauce: combine soy sauce, oyster sauce, chicken broth, ½ tbsp cornstarch, and sugar in a small bowl. Set aside.',
      'Toss sliced chicken with remaining ½ tbsp cornstarch and a pinch of pepper.',
      'Heat vegetable oil in a wok or large skillet over high heat until smoking.',
      'Add chicken in a single layer; cook 5–6 minutes, flipping once, until cooked through. Remove and set aside.',
      'Add broccoli to the same pan; stir-fry 3 minutes until bright green and just tender-crisp.',
      'Push broccoli to the side. Add garlic and ginger; cook 30 seconds until fragrant.',
      'Return chicken to pan. Pour sauce over everything.',
      'Toss constantly for 1–2 minutes until sauce thickens and coats everything evenly.',
      'Drizzle sesame oil over the top and serve immediately over steamed rice.',
    ],
  },
  sheetpan: {
    title: 'Sheet Pan Chicken and Broccoli',
    description: 'Lemon-garlic chicken and broccoli roasted on one pan with Italian seasoning — easy cleanup, big flavor.',
    time: '35 min',
    servings: '4 servings',
    ingredients: [
      '1.5 lbs boneless skinless chicken thighs, cut into 1.5-inch pieces',
      '4 cups broccoli florets',
      '4 cloves garlic, minced',
      '3 tbsp olive oil',
      '1 tbsp lemon juice',
      '1 tsp lemon zest',
      '1 tsp Italian seasoning',
      '½ tsp smoked paprika',
      '½ tsp salt',
      '¼ tsp black pepper',
      '¼ tsp red pepper flakes (optional)',
      '2 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'Preheat oven to 425°F. Line a large sheet pan with foil and lightly oil it.',
      'In a large bowl, toss chicken pieces with 2 tbsp olive oil, garlic, lemon juice, lemon zest, Italian seasoning, paprika, salt, and pepper.',
      'Spread chicken on one side of the prepared pan in a single layer.',
      'Toss broccoli with remaining 1 tbsp olive oil, salt, and pepper. Spread on the other side of the pan.',
      'Roast 20–22 minutes, flipping chicken and tossing broccoli halfway through, until chicken is cooked through and broccoli edges are charred.',
      'Check chicken reaches 165°F internal temperature.',
      'Sprinkle with fresh parsley and red pepper flakes if using. Serve immediately.',
    ],
  },
  baked: {
    title: 'Baked Chicken and Broccoli Casserole',
    description: 'Chicken and broccoli baked together in a casserole dish with garlic, lemon, and herbs — simple, hands-off dinner.',
    time: '40 min',
    servings: '4 servings',
    ingredients: [
      '1.5 lbs boneless skinless chicken breast, cut into 2-inch chunks',
      '4 cups broccoli florets',
      '4 cloves garlic, minced',
      '3 tbsp olive oil',
      '2 tbsp lemon juice',
      '1 tsp dried oregano',
      '1 tsp dried thyme',
      '½ tsp garlic powder',
      '½ tsp onion powder',
      '½ tsp salt',
      '¼ tsp black pepper',
      '¼ cup chicken broth',
    ],
    instructions: [
      'Preheat oven to 400°F. Lightly oil a 9×13-inch baking dish.',
      'In a large bowl, whisk together olive oil, lemon juice, garlic, oregano, thyme, garlic powder, onion powder, salt, and pepper.',
      'Add chicken chunks to the bowl and toss to coat thoroughly.',
      'Add broccoli florets and toss everything together.',
      'Transfer to the prepared baking dish, spreading in an even layer.',
      'Pour chicken broth around the edges of the dish.',
      'Bake 28–32 minutes, stirring once halfway through, until chicken is cooked to 165°F and broccoli is tender with slightly caramelized edges.',
      'Let rest 3 minutes before serving.',
    ],
  },
  bowl: {
    title: 'Quick Chicken Broccoli Bowl',
    description: 'Fast skillet chicken and broccoli with garlic-soy glaze over steamed rice — ready in 20 minutes.',
    time: '20 min',
    servings: '2 servings',
    ingredients: [
      '¾ lb boneless skinless chicken breast, diced',
      '2 cups broccoli florets',
      '3 cloves garlic, minced',
      '2 tbsp soy sauce',
      '1 tbsp honey',
      '1 tsp sesame oil',
      '1 tbsp vegetable oil',
      '1 tsp cornstarch',
      '2 tbsp water',
      '2 cups cooked white rice, for serving',
      '1 tsp sesame seeds, for garnish',
    ],
    instructions: [
      'Mix soy sauce, honey, cornstarch, and water together in a small bowl to make the sauce.',
      'Heat vegetable oil in a large skillet over medium-high heat.',
      'Add diced chicken in a single layer; cook 5–6 minutes, stirring occasionally, until golden and cooked through.',
      'Add broccoli florets; cook 3 minutes, stirring, until bright green and just tender.',
      'Add garlic; cook 30 seconds until fragrant.',
      'Pour sauce over chicken and broccoli; toss 1 minute until sauce thickens and coats everything.',
      'Drizzle with sesame oil, garnish with sesame seeds, and serve over steamed rice.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'stirfry', label: 'Stir-Fry' },
  { key: 'sheetpan', label: 'Sheet Pan' },
  { key: 'baked', label: 'Baked Casserole' },
  { key: 'bowl', label: 'Chicken Broccoli Bowl' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const ChickenAndBroccoli: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('stirfry');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Chicken and Broccoli Recipes (Stir-Fry, Sheet Pan, Baked) | PantryPivot';
    const PAGE_DESC = 'Easy chicken and broccoli recipes — stir-fry, sheet pan, baked, and rice bowls. Quick weeknight dinners ready in 30 minutes.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/chicken-and-broccoli';
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
      "name": "Classic Chicken and Broccoli Stir-Fry",
      "description": "Chinese-American stir-fry with garlic-ginger sauce, soy sauce, and sesame oil — better than takeout in 25 minutes.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT15M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "Chinese-American",
      "keywords": "chicken and broccoli, stir-fry, chicken stir-fry, easy weeknight dinner, dairy-free chicken",
      "url": "https://pantrypivot.com/recipes/chicken-and-broccoli",
      "recipeIngredient": [
        "1.5 lbs boneless skinless chicken breast, sliced thin",
        "4 cups broccoli florets",
        "3 cloves garlic, minced",
        "1 tbsp fresh ginger, grated",
        "3 tbsp soy sauce",
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Mix sauce: combine soy sauce, oyster sauce, chicken broth, cornstarch, and sugar in a small bowl." },
        { "@type": "HowToStep", "text": "Toss sliced chicken with cornstarch and pepper." },
        { "@type": "HowToStep", "text": "Heat vegetable oil in a wok over high heat until smoking. Stir-fry chicken 5–6 minutes." },
        { "@type": "HowToStep", "text": "Remove chicken. Stir-fry broccoli 3 minutes. Add garlic and ginger 30 seconds." },
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
        { "@type": "Question", "name": "Why is my chicken and broccoli stir-fry watery?", "acceptedAnswer": { "@type": "Answer", "text": "Too much liquid in the pan from wet ingredients or too low heat. Pat chicken dry, use high heat, and make sure broccoli is well-drained. Add cornstarch to the sauce to thicken it." } },
        { "@type": "Question", "name": "Can I use frozen broccoli for stir-fry?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, but thaw and pat completely dry first. Frozen broccoli holds more water and will steam instead of stir-fry if added wet." } },
        { "@type": "Question", "name": "How do I keep chicken moist in a stir-fry?", "acceptedAnswer": { "@type": "Answer", "text": "Slice thin against the grain, cook on high heat for just 5-6 minutes, and don't overcook. Letting it rest 2 minutes before serving also helps." } },
        { "@type": "Question", "name": "What can I serve with chicken and broccoli?", "acceptedAnswer": { "@type": "Answer", "text": "White rice, brown rice, cauliflower rice, or noodles all work well. A simple side of steamed edamame rounds out the meal." } },
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
      "name": "Chicken and Broccoli Recipes",
      "description": "Four kosher meat recipes featuring chicken and broccoli — stir-fry, sheet pan, baked casserole, and rice bowl.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "recipeCategory": "Main Course",
      "recipeCuisine": "Jewish",
      "keywords": "chicken and broccoli, kosher chicken, dairy-free chicken dinner, chicken stir-fry, sheet pan chicken",
      "suitableForDiet": "https://schema.org/KosherDiet",
      "recipeIngredient": [
        "1.5 lbs boneless skinless chicken breast",
        "4 cups broccoli florets",
        "3 cloves garlic, minced",
        "3 tbsp soy sauce",
        "2 tbsp vegetable oil",
        "1 tsp sesame oil"
      ],
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Slice chicken thin and toss with cornstarch and seasoning." },
        { "@type": "HowToStep", "text": "Heat oil in a wok or skillet over high heat. Cook chicken 5–6 minutes until cooked through. Remove and set aside." },
        { "@type": "HowToStep", "text": "Add broccoli and stir-fry 3 minutes. Add garlic, return chicken, pour sauce, and toss until coated and thickened. Serve over rice." }
      ],
      "prepTime": "PT15M",
      "cookTime": "PT25M",
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
            <li className="text-slate-600 font-medium">Chicken and Broccoli</li>
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
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Chicken and Broccoli Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Four ways to make chicken and broccoli — from quick stir-fry to easy sheet pan dinners.</p>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">What Can I Make With Chicken and Broccoli?</h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto text-center mb-8 leading-relaxed">This page contains 4 kosher meat recipes using chicken and broccoli — stir-fry, sheet pan, baked, and rice bowl. All recipes are dairy-free. Ingredients are simple pantry staples with no specialty items required.</p>

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
              'Blanch broccoli in boiling salted water for 90 seconds before stir-frying — it stays vibrant green and cooks more evenly.',
              'Slice chicken thin against the grain for the most tender stir-fry pieces.',
              'Get your wok or skillet screaming hot before adding the chicken — you want a sear, not a steam.',
              "Don't overcrowd the pan. Cook chicken in batches if needed so it browns rather than steams.",
              'Add the sauce last and toss quickly — overcooking the sauce makes it gluey.',
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
              'Chicken breast ↔ chicken thighs: Thighs are more forgiving and stay juicy; reduce cook time by 1–2 minutes.',
              'Fresh broccoli ↔ frozen broccoli: Thaw and pat dry frozen broccoli before stir-frying to avoid steaming.',
              'Soy sauce ↔ tamari (gluten-free) or coconut aminos (lower sodium).',
              'Oyster sauce ↔ hoisin sauce or an extra tablespoon of soy sauce plus ½ tsp sugar.',
              'Fresh ginger ↔ ½ tsp ground ginger powder (add with the garlic).',
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
              'Refrigerate in an airtight container for up to 3–4 days.',
              'Reheat in a hot skillet over medium-high heat or microwave with a splash of water to loosen the sauce.',
              'Broccoli softens after refrigeration — this dish is best eaten fresh.',
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
              { q: 'Why is my chicken and broccoli stir-fry watery?', a: 'Too much liquid in the pan from wet ingredients or too low heat. Pat chicken dry, use high heat, and make sure broccoli is well-drained. Add cornstarch to the sauce to thicken it.' },
              { q: 'Can I use frozen broccoli for stir-fry?', a: 'Yes, but thaw and pat completely dry first. Frozen broccoli holds more water and will steam instead of stir-fry if added wet.' },
              { q: 'How do I keep chicken moist in a stir-fry?', a: 'Slice thin against the grain, cook on high heat for just 5–6 minutes, and don\'t overcook. Letting it rest 2 minutes before serving also helps.' },
              { q: 'What can I serve with chicken and broccoli?', a: 'White rice, brown rice, cauliflower rice, or noodles all work well. A simple side of steamed edamame rounds out the meal.' },
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
              { to: '/recipes/chicken-stir-fry', label: '🥢 Chicken Stir-Fry' },
              { to: '/recipes/chicken-and-vegetables', label: '🥦 Chicken and Vegetables' },
              { to: '/recipes/chicken-and-mushrooms', label: '🍄 Chicken and Mushrooms' },
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
            { to: '/recipes/chicken-stir-fry', label: '🥢 Chicken Stir-Fry' },
            { to: '/recipes/chicken-and-vegetables', label: '🥦 Chicken and Vegetables' },
            { to: '/recipes/chicken-and-mushrooms', label: '🍄 Chicken and Mushrooms' },
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

export default ChickenAndBroccoli;
