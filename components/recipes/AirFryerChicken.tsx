import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'classic' | 'parmesan' | 'tenderloins' | 'thighs';

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
    title: 'Classic Air Fryer Chicken Breast',
    description: 'Juicy, golden chicken breasts cooked to perfection in the air fryer. Ready in under 20 minutes.',
    time: '18 min',
    servings: '2 servings',
    ingredients: [
      '2 boneless, skinless chicken breasts (6–8 oz each)',
      '1 tbsp olive oil',
      '1 tsp garlic powder',
      '1 tsp onion powder',
      '1 tsp smoked paprika',
      '½ tsp dried oregano',
      '½ tsp salt',
      '¼ tsp black pepper',
    ],
    instructions: [
      'Preheat the air fryer to 375°F (190°C) for 3 minutes.',
      'Pat the chicken breasts dry with paper towels — this helps them brown evenly.',
      'Drizzle olive oil over both sides of each breast.',
      'Mix garlic powder, onion powder, paprika, oregano, salt, and pepper. Rub evenly over both sides of the chicken.',
      'Place chicken in the air fryer basket in a single layer, not touching.',
      'Cook at 375°F for 10 minutes, then flip and cook another 6–8 minutes until internal temperature reaches 165°F.',
      'Rest for 5 minutes before slicing to keep the juices locked in.',
    ],
  },
  parmesan: {
    title: 'Air Fryer Chicken Parmesan',
    description: 'Crispy breaded chicken with marinara — all the flavor of classic chicken parm, dairy-free.',
    time: '22 min',
    servings: '2 servings',
    ingredients: [
      '2 boneless, skinless chicken breasts',
      '½ cup breadcrumbs (plain or Italian-style)',
      '1 tsp garlic powder',
      '1 tsp Italian seasoning',
      '½ tsp salt',
      '¼ tsp black pepper',
      '1 egg, beaten',
      '½ cup marinara sauce (dairy-free)',
      '1 tbsp olive oil',
    ],
    instructions: [
      'Preheat air fryer to 400°F (200°C).',
      'Pound the chicken breasts to an even ¾-inch thickness.',
      'Mix breadcrumbs, garlic powder, Italian seasoning, salt, and pepper in a shallow bowl.',
      'Dip each breast in beaten egg, letting excess drip off, then coat thoroughly in the breadcrumb mixture.',
      'Lightly spray or brush both sides with olive oil.',
      'Air fry at 400°F for 8 minutes, flip carefully, then cook another 6 minutes.',
      'Spoon marinara sauce on top of each breast. Cook 2 more minutes until sauce is hot and chicken reads 165°F.',
      'Rest 3 minutes before serving.',
    ],
  },
  tenderloins: {
    title: 'Air Fryer Chicken Tenderloins',
    description: 'Tender strips with a flavorful seasoning crust — perfect for a quick weeknight meal.',
    time: '14 min',
    servings: '2–3 servings',
    ingredients: [
      '1 lb chicken tenderloins',
      '1 tbsp olive oil',
      '1 tsp garlic powder',
      '1 tsp smoked paprika',
      '½ tsp cumin',
      '½ tsp chili powder',
      '½ tsp salt',
      '¼ tsp black pepper',
    ],
    instructions: [
      'Preheat air fryer to 400°F (200°C).',
      'Remove the white tendon from each tenderloin if present — grip with a paper towel and pull.',
      'Toss tenderloins in olive oil until coated.',
      'Combine all spices and sprinkle over the tenderloins, tossing to coat evenly.',
      'Arrange in a single layer in the air fryer basket (work in batches if needed).',
      'Air fry for 5 minutes, flip, then cook another 4–5 minutes until internal temperature reaches 165°F.',
      'Serve immediately with your favorite dipping sauce.',
    ],
  },
  thighs: {
    title: 'Air Fryer Chicken Thighs',
    description: 'Bone-in, skin-on thighs with impossibly crispy skin and juicy meat inside.',
    time: '25 min',
    servings: '4 servings',
    ingredients: [
      '4 bone-in, skin-on chicken thighs',
      '1 tbsp olive oil',
      '1 tsp garlic powder',
      '1 tsp onion powder',
      '1 tsp smoked paprika',
      '½ tsp dried thyme',
      '1 tsp salt',
      '½ tsp black pepper',
    ],
    instructions: [
      'Preheat air fryer to 400°F (200°C).',
      'Pat chicken thighs completely dry — critical for crispy skin.',
      'Rub olive oil all over the thighs, including under the skin.',
      'Mix all spices together and rub evenly over each thigh, including under the skin for maximum flavor.',
      'Place thighs skin-side down in the air fryer basket.',
      'Cook at 400°F for 13 minutes, flip skin-side up, then cook another 10–12 minutes.',
      'Check internal temperature — thighs need to reach 165°F at the thickest part, away from the bone.',
      'Rest 5 minutes before serving.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'classic', label: 'Classic Breast' },
  { key: 'parmesan', label: 'Chicken Parmesan' },
  { key: 'tenderloins', label: 'Tenderloins' },
  { key: 'thighs', label: 'Thighs' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const AirFryerChicken: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('classic');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];
  useEffect(() => {
    const PAGE_TITLE = 'Air Fryer Chicken Recipes (Juicy Every Time) | PantryPivot';
    const PAGE_DESC = 'Easy air fryer chicken breast recipes — classic, tenderloins, thighs, and crispy chicken. Meat-only, ready in 25 minutes.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/air-fryer-chicken';
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
      "name": "Air Fryer Chicken Breast",
      "description": "Easy air fryer chicken breast recipes — classic, tenderloins, thighs, and crispy chicken. Meat-only, ready in 25 minutes.",
      "image": "https://images.pexels.com/photos/4110554/pexels-photo-4110554.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT25M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "air fryer chicken, air fryer chicken breast, easy chicken recipes",
      "url": "https://pantrypivot.com/recipes/air-fryer-chicken",
      "recipeIngredient": [
        "2 boneless, skinless chicken breasts (6\u20138 oz each)",
        "1 tbsp olive oil",
        "1 tsp garlic powder",
        "1 tsp onion powder",
        "1 tsp smoked paprika"
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Preheat the air fryer to 375°F (190°C) for 3 minutes." },
        { "@type": "HowToStep", "text": "Pat the chicken breasts dry with paper towels — this helps them brown evenly." },
        { "@type": "HowToStep", "text": "Drizzle olive oil over both sides of each breast." },
        { "@type": "HowToStep", "text": "Mix garlic powder, onion powder, paprika, oregano, salt, and pepper. Rub evenly over both sides of the chicken." },
        { "@type": "HowToStep", "text": "Place chicken in the air fryer basket in a single layer, not touching." },
        { "@type": "HowToStep", "text": "Cook at 375°F for 10 minutes, then flip and cook another 6–8 minutes until internal temperature reaches 165°F." },
        { "@type": "HowToStep", "text": "Rest for 5 minutes before slicing to keep the juices locked in." }
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
        { "@type": "Question", "name": "What temperature should I use for air fryer chicken breast?", "acceptedAnswer": { "@type": "Answer", "text": "Cook air fryer chicken breast at 375°F (190°C) for juicy, evenly cooked results. For crispier skin on thighs, use 400°F. Always preheat your air fryer for 3 minutes before adding the chicken." } },
        { "@type": "Question", "name": "How long does air fryer chicken take?", "acceptedAnswer": { "@type": "Answer", "text": "Boneless chicken breasts take 16–18 minutes at 375°F. Tenderloins take 9–10 minutes at 400°F. Bone-in thighs take 23–25 minutes at 400°F. Always verify with an instant-read thermometer — internal temp must reach 165°F." } },
        { "@type": "Question", "name": "Should I flip chicken in the air fryer?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, flip chicken halfway through cooking for even browning on both sides. For chicken breasts, flip at the 10-minute mark. For thighs, flip after 13 minutes. Tenderloins benefit from flipping at 5 minutes." } },
        { "@type": "Question", "name": "Can I cook frozen chicken in an air fryer?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, but add 5–8 extra minutes of cook time and ensure the internal temperature reaches 165°F. Pat as dry as possible after thawing or cook directly from frozen — just expect less browning on the exterior." } }
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
            <li className="text-slate-600 font-medium">Air Fryer Chicken</li>
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
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Air Fryer Chicken Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Quick, juicy, and full of flavor — these air fryer chicken recipes are ready in under 25 minutes.
          </p>
        </div>

        {/* Amazon CTA */}
        <div className="text-center mb-4">
          <a
            href="https://amzn.to/47MV8a6"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-colors text-sm"
          >
            Shop Top-Rated Air Fryers on Amazon →
          </a>
        </div>

        {/* Seasonal Banner */}
        {[6, 9, 10].includes(new Date().getMonth()) && (
          <a
            href="https://amzn.to/47MV8a6"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="block text-center bg-orange-500 text-white font-bold py-3 px-4 mb-6 text-sm hover:bg-orange-600 transition-colors rounded"
          >
            {new Date().getMonth() === 6 && '🛒 Prime Day — Save big on air fryers!'}
            {new Date().getMonth() === 9 && '🎃 Prime Big Deal Days — Limited-time deals on air fryers!'}
            {new Date().getMonth() === 10 && '🦃 Black Friday — Best prices of the year on air fryers!'}
          </a>
        )}

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
              href={AMAZON_LINK}
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
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">Air Fryer Chicken Tips</h2>
          <ul className="space-y-3">
            {[
              "Preheat your air fryer for 3 minutes — skipping this leads to uneven cooking and less browning.",
              "Pat chicken completely dry with paper towels before seasoning. Moisture is the enemy of crispy skin.",
              "Don't overcrowd the basket. Cook in a single layer with a little space between pieces — air needs to circulate.",
              "Use an instant-read thermometer. Chicken is safe at 165°F. Thighs can go to 175°F for the best texture.",
              "Rest 5 minutes after cooking before slicing. This keeps the juices inside the meat instead of on your cutting board."
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
              "Chicken breast ↔ thighs: Thighs are more forgiving and stay juicier. Adjust cook time up by 3–5 minutes for bone-in.",
              "Fresh chicken ↔ frozen: Thaw frozen chicken fully in the fridge first, then pat dry. Cooking from frozen works but reduces crispiness.",
              "Breadcrumbs: Use matzo meal for a Passover-friendly coating, or crushed plain crackers for a similar crunch.",
              "Olive oil ↔ avocado oil: Both work well. Avocado oil has a higher smoke point and a more neutral flavor.",
              "Italian seasoning mix: Make your own with dried oregano, basil, thyme, and rosemary in equal parts."
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
              "Fridge: Store cooked air fryer chicken in an airtight container for up to 3–4 days.",
              "Freezer: Freezes well for up to 3 months. Wrap individual pieces in foil before placing in a freezer bag.",
              "Reheat: The best way to reheat is back in the air fryer at 375°F for 3–4 minutes. This restores the crispy exterior. Avoid the microwave, which makes the coating soggy."
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
              { q: "What temperature should I use for air fryer chicken breast?", a: "Cook air fryer chicken breast at 375°F (190°C) for juicy, evenly cooked results. For crispier skin on thighs, bump it up to 400°F. Always preheat your air fryer for 3 minutes before adding the chicken." },
              { q: "How long does air fryer chicken take?", a: "Boneless chicken breasts take 16–18 minutes at 375°F. Tenderloins take 9–10 minutes at 400°F. Bone-in thighs take 23–25 minutes at 400°F. Always verify with an instant-read thermometer — it must read 165°F at the thickest part." },
              { q: "Should I flip chicken in the air fryer?", a: "Yes — flip halfway through for even browning. For chicken breasts, flip at the 10-minute mark. For thighs, flip after 13 minutes. Tenderloins benefit from flipping at 5 minutes." },
              { q: "Can I cook frozen chicken in an air fryer?", a: "Yes, but add 5–8 extra minutes and verify the internal temperature reaches 165°F. Pat as dry as possible and expect less browning on the exterior when cooking from frozen." }
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
            <Link to="/recipes/crockpot-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍲</span> Crockpot Chicken
            </Link>
            <Link to="/recipes/instant-pot-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">⚡</span> Instant Pot Chicken
            </Link>
            <Link to="/recipes/chicken-and-rice" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍚</span> Chicken and Rice
            </Link>
            <Link to="/recipes/roast-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍗</span> Roast Chicken
            </Link>
            <Link to="/recipes/chicken-soup" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍜</span> Chicken Soup
            </Link>
            <Link to="/recipes/dairy-free-marry-me-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🌿</span> Dairy-Free Marry Me Chicken
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
          <Link to="/recipes/crockpot-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Crockpot Chicken</Link>
          <Link to="/recipes/salmon" className="text-slate-500 hover:text-orange-600 transition-colors">Salmon Recipes</Link>
          <Link to="/recipes/ground-turkey" className="text-slate-500 hover:text-orange-600 transition-colors">Ground Turkey</Link>
          <Link to="/recipes/chicken-and-rice" className="text-slate-500 hover:text-orange-600 transition-colors">Chicken and Rice</Link>
          <Link to="/recipes/ground-beef-pasta" className="text-slate-500 hover:text-orange-600 transition-colors">Ground Beef Pasta</Link>
          <Link to="/recipes/instant-pot-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Instant Pot Chicken</Link>
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

export default AirFryerChicken;
