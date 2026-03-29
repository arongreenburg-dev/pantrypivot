import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'baked' | 'sheetpan' | 'airfryer' | 'sweetpotato';

interface Recipe {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

const recipes: Record<Tab, Recipe> = {
  baked: {
    title: 'Baked Salmon',
    description: 'Flaky, perfectly seasoned salmon baked in the oven in just 15 minutes — simple and pareve.',
    time: '20 min',
    servings: '2 servings',
    ingredients: [
      '2 salmon fillets (6 oz each), skin-on or skinless',
      '2 tbsp olive oil',
      '3 cloves garlic, minced',
      '1 lemon, zested and juiced',
      '1 tsp dried dill or fresh dill',
      '½ tsp smoked paprika',
      '½ tsp salt',
      '¼ tsp black pepper',
      'Fresh lemon slices for serving',
    ],
    instructions: [
      'Preheat oven to 400°F (200°C). Line a baking dish with parchment paper.',
      'Place salmon fillets in the baking dish, skin-side down.',
      'In a small bowl, mix olive oil, garlic, lemon zest, lemon juice, dill, paprika, salt, and pepper.',
      'Spoon the mixture evenly over the top of each fillet.',
      'Bake for 12–15 minutes, depending on thickness, until salmon flakes easily with a fork. Internal temperature should reach 125–130°F for medium or 145°F for well done.',
      'Serve immediately with lemon slices and your choice of side.',
    ],
  },
  sheetpan: {
    title: 'Sheet Pan Salmon',
    description: 'Salmon and vegetables roasted together on one pan — easy cleanup, big flavor.',
    time: '30 min',
    servings: '2 servings',
    ingredients: [
      '2 salmon fillets (6 oz each)',
      '2 cups broccoli florets',
      '1 red bell pepper, sliced',
      '1 zucchini, sliced into half-moons',
      '3 tbsp olive oil, divided',
      '3 cloves garlic, minced',
      '1 tsp Italian seasoning',
      '½ tsp garlic powder',
      '1 lemon, sliced',
      '1 tsp salt, divided',
      '½ tsp black pepper, divided',
    ],
    instructions: [
      'Preheat oven to 425°F (220°C). Line a large sheet pan with parchment paper.',
      'Toss broccoli, bell pepper, and zucchini with 2 tbsp olive oil, Italian seasoning, ½ tsp salt, and ¼ tsp pepper. Spread on the sheet pan.',
      'Roast vegetables for 10 minutes.',
      'Push vegetables to the sides of the pan. Place salmon fillets in the center.',
      'Drizzle remaining 1 tbsp olive oil over salmon, then rub with minced garlic, garlic powder, remaining salt and pepper.',
      'Place lemon slices on top of the salmon.',
      'Return to oven and roast 12–14 more minutes until salmon is cooked through.',
      'Serve directly from the pan.',
    ],
  },
  airfryer: {
    title: 'Air Fryer Salmon',
    description: 'Crispy outside, tender inside — air fryer salmon is ready in just 10 minutes.',
    time: '12 min',
    servings: '2 servings',
    ingredients: [
      '2 salmon fillets (6 oz each), about 1 inch thick',
      '1 tbsp olive oil',
      '1 tsp garlic powder',
      '½ tsp smoked paprika',
      '½ tsp dried dill',
      '½ tsp salt',
      '¼ tsp black pepper',
      '1 lemon, cut into wedges',
    ],
    instructions: [
      'Preheat air fryer to 400°F (200°C) for 3 minutes.',
      'Pat salmon fillets completely dry.',
      'Brush olive oil on both sides of each fillet.',
      'Mix garlic powder, paprika, dill, salt, and pepper. Rub evenly over the top of each fillet.',
      'Place salmon skin-side down in the air fryer basket. Do not overcrowd.',
      'Air fry for 8–10 minutes. No flipping needed — salmon is done when it flakes easily and the internal temperature reaches 125–130°F.',
      'Serve with lemon wedges.',
    ],
  },
  sweetpotato: {
    title: 'Salmon and Sweet Potato',
    description: 'A nutritious, satisfying meal — herbed salmon paired with caramelized sweet potato.',
    time: '35 min',
    servings: '2 servings',
    ingredients: [
      '2 salmon fillets (6 oz each)',
      '2 medium sweet potatoes, peeled and cubed into 1-inch pieces',
      '3 tbsp olive oil, divided',
      '1 tsp cumin',
      '1 tsp smoked paprika',
      '½ tsp cinnamon',
      '½ tsp garlic powder',
      '1 tsp salt, divided',
      '½ tsp black pepper, divided',
      '1 lemon, juiced',
      '2 tbsp fresh parsley, chopped (optional)',
    ],
    instructions: [
      'Preheat oven to 425°F (220°C). Line a large sheet pan with parchment.',
      'Toss sweet potato cubes with 2 tbsp olive oil, cumin, cinnamon, ½ tsp salt, and ¼ tsp pepper.',
      'Spread sweet potatoes in a single layer on the sheet pan and roast 15 minutes.',
      'Flip sweet potatoes, then push to one side of the pan.',
      'Place salmon fillets on the other side. Drizzle with remaining 1 tbsp olive oil, lemon juice, smoked paprika, garlic powder, remaining salt and pepper.',
      'Return to oven and roast 12–14 minutes until salmon flakes easily.',
      'Garnish with fresh parsley if using. Serve together straight from the pan.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'baked', label: 'Baked Salmon' },
  { key: 'sheetpan', label: 'Sheet Pan Salmon' },
  { key: 'airfryer', label: 'Air Fryer Salmon' },
  { key: 'sweetpotato', label: 'Salmon & Sweet Potato' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const SalmonRecipes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('baked');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];
  useEffect(() => {
    const PAGE_TITLE = 'Salmon Recipes (Easy Pareve Weeknight Dinners) | PantryPivot';
    const PAGE_DESC = 'Easy pareve salmon recipes — baked, sheet pan, air fryer, and salmon with sweet potato. Kosher-friendly weeknight dinners.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/salmon';
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
    script.id = 'faq-schema';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "How do I know when salmon is cooked through?", "acceptedAnswer": { "@type": "Answer", "text": "Salmon is done when it flakes easily with a fork and the flesh has turned from translucent to opaque. For medium salmon (recommended), the internal temperature should reach 125–130°F. For well-done, cook to 145°F. Overcooked salmon becomes dry and chalky." } },
        { "@type": "Question", "name": "Should I cook salmon skin-side up or down?", "acceptedAnswer": { "@type": "Answer", "text": "For baked and air fryer salmon, place skin-side down. The skin acts as a natural barrier, protecting the delicate flesh from direct heat and keeping the fillet moist. In a skillet, start skin-side down to crisp the skin, then flip for the last 1–2 minutes." } },
        { "@type": "Question", "name": "Is salmon pareve in kosher law?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — fish is pareve under kosher law. Salmon has both fins and scales, making it kosher. As a pareve food, it can be eaten with both meat and dairy meals, though it is traditionally not served on the same plate as meat." } },
        { "@type": "Question", "name": "Can I use frozen salmon for these recipes?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — frozen salmon works well. Thaw it overnight in the refrigerator, then pat it completely dry before cooking. Properly thawed and dried frozen salmon cooks identically to fresh and is often just as good in quality." } }
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
    script.id = 'recipe-schema';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Recipe",
      "name": "Baked Salmon",
      "description": "Easy pareve salmon recipes — baked, sheet pan, air fryer, and salmon with sweet potato. Kosher-friendly weeknight dinners.",
      "image": "https://images.pexels.com/photos/5639482/pexels-photo-5639482.jpeg?auto=compresshttps://images.pexels.com/photos/5639482/pexels-photo-5639482.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT25M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "salmon recipes, baked salmon, easy salmon, pareve recipes",
      "url": "https://pantrypivot.com/recipes/salmon",
      "recipeIngredient": [
        "2 salmon fillets (6 oz each), skin-on or skinless",
        "2 tbsp olive oil",
        "3 cloves garlic, minced",
        "1 lemon, zested and juiced",
        "1 tsp dried dill or fresh dill"
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Preheat oven to 400°F (200°C). Line a baking dish with parchment paper." },
        { "@type": "HowToStep", "text": "Place salmon fillets in the baking dish, skin-side down." },
        { "@type": "HowToStep", "text": "In a small bowl, mix olive oil, garlic, lemon zest, lemon juice, dill, paprika, salt, and pepper." },
        { "@type": "HowToStep", "text": "Spoon the mixture evenly over the top of each fillet." },
        { "@type": "HowToStep", "text": "Bake for 12–15 minutes, depending on thickness, until salmon flakes easily with a fork. Internal temperature should reach 125–130°F for medium or 145°F for well done." },
        { "@type": "HowToStep", "text": "Serve immediately with lemon slices and your choice of side." }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById('recipe-schema');
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
            <li className="text-slate-600 font-medium">Salmon Recipes</li>
          </ol>
        </nav>

        {/* Table of Contents */}
        <nav className="mb-8 overflow-x-auto">
          <div className="flex gap-2 text-sm font-semibold text-slate-500 whitespace-nowrap pb-1">
            <span className="text-slate-400 text-xs uppercase tracking-wider self-center">Jump to:</span>
            <a href="#recipe-ideas" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-blue-300 hover:text-blue-600 transition-colors">Recipes</a>
            <a href="#cooking-tips" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-blue-300 hover:text-blue-600 transition-colors">Cooking Tips</a>
            <a href="#substitutions" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-blue-300 hover:text-blue-600 transition-colors">Substitutions</a>
            <a href="#faq" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-blue-300 hover:text-blue-600 transition-colors">FAQ</a>
            <a href="https://pantrypivot.com" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-blue-300 hover:text-blue-600 transition-colors">✨ Custom Recipe</a>
          </div>
        </nav>

        <div className="text-center mb-10">
          <span className="inline-block bg-blue-100 text-blue-700 font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
            ✅ Pareve
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Salmon Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Flavorful, pareve salmon dishes — no meat, no dairy. Fresh, simple, and ready in under 35 minutes.
          </p>
        </div>

        {/* Tabs */}
        <div id="recipe-ideas" className="flex gap-2 flex-wrap justify-center mb-8">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm border transition-all ${
                activeTab === tab.key
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'border-slate-200 text-slate-600 bg-white hover:border-blue-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Recipe Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-blue-50 border-b border-blue-100 px-8 py-6">
            <h2 className="text-2xl font-black text-slate-900 mb-1">{recipe.title}</h2>
            <p className="text-slate-500 mb-4">{recipe.description}</p>
            <div className="flex gap-4 text-sm font-semibold text-slate-600">
              <span>⏱ {recipe.time}</span>
              <span>👥 {recipe.servings}</span>
            </div>
          </div>

          <div className="p-8 grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-sm font-black text-blue-600 uppercase tracking-wide mb-4">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black text-blue-600 uppercase tracking-wide mb-4">Instructions</h3>
              <ol className="space-y-4">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center mt-0.5">
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
              "Don't overcook salmon. The target internal temperature is 125–130°F for medium (flaky and moist). At 145°F it's well-done but can be dry. The flesh should be opaque but slightly translucent in the very center.",
              "Keep the skin on during cooking. Skin-on salmon holds together better, cooks more evenly, and the skin acts as a moisture barrier. You can always remove it after cooking.",
              "Pat salmon completely dry before cooking. Moisture prevents browning and creates steam in the air fryer or oven.",
              "Let salmon rest at room temperature for 10 minutes before cooking. Cold salmon placed directly in a hot oven cooks unevenly.",
              "Use parchment paper for baked salmon. It prevents sticking and makes cleanup effortless.",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-400 flex-shrink-0" />
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
              "Fresh salmon ↔ frozen salmon: Thaw frozen salmon overnight in the fridge, then pat completely dry before cooking. The results are virtually identical.",
              "Lemon juice ↔ lime juice: Lime gives a slightly different citrus note that pairs especially well with cumin-spiced salmon.",
              "Dill ↔ fresh parsley or cilantro: All three herbs work beautifully with salmon. Cilantro gives a more vibrant, fresh flavor; parsley is more neutral.",
              "Olive oil ↔ avocado oil: Avocado oil has a higher smoke point and a more neutral flavor — ideal for air fryer salmon at 400°F.",
              "Smoked paprika ↔ sweet paprika + pinch of cumin: This replicates the smoky, complex flavor if you don't have smoked paprika.",
            ].map((sub, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-400 flex-shrink-0" />
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
              "Fridge: Cooked salmon keeps for 2–3 days. It has a shorter shelf life than chicken or beef — don't push it to 4 days.",
              "Freezer: Raw salmon freezes well for up to 3 months. Cooked salmon can be frozen but the texture suffers — it becomes drier after thawing.",
              "Reheat: Reheat gently in a 275°F oven, covered loosely with foil, for 10–15 minutes. Avoid the microwave — it overcooks salmon very quickly. Cold leftover salmon is also excellent flaked over a salad.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-400 flex-shrink-0" />
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
              {
                q: "How do I know when salmon is cooked through?",
                a: "Salmon is done when it flakes easily with a fork and the flesh has turned from translucent to opaque. For medium salmon (recommended), the internal temperature should reach 125–130°F. For well-done, cook to 145°F. Overcooked salmon becomes dry and chalky.",
              },
              {
                q: "Should I cook salmon skin-side up or down?",
                a: "For baked and air fryer salmon, place skin-side down. The skin acts as a natural barrier, protecting the delicate flesh from direct heat and keeping the fillet moist. In a skillet, start skin-side down to crisp the skin, then flip for the last 1–2 minutes.",
              },
              {
                q: "Is salmon pareve in kosher law?",
                a: "Yes — fish is pareve under kosher law. Salmon has both fins and scales, making it kosher. As a pareve food, it can be eaten with both meat and dairy meals, though it is traditionally not served on the same plate as meat.",
              },
              {
                q: "Can I use frozen salmon for these recipes?",
                a: "Yes — frozen salmon works well. Thaw it overnight in the refrigerator, then pat it completely dry before cooking. Properly thawed and dried frozen salmon cooks identically to fresh and is often just as good in quality.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-5">
                <p className="font-bold text-slate-900 mb-2">{item.q}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* More Recipes */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">More Recipes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Link to="/recipes/shakshuka" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍳</span> Shakshuka
            </Link>
            <Link to="/recipes/easter" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🐣</span> Easter Dinner
            </Link>
            <Link to="/recipes/air-fryer-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍗</span> Air Fryer Chicken
            </Link>
            <Link to="/recipes/ground-turkey" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🦃</span> Ground Turkey
            </Link>
            <Link to="/recipes/passover" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍷</span> Passover Recipes
            </Link>
            <Link to="/recipes/ground-turkey-sweet-potato" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍠</span> Turkey & Sweet Potato
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
          <Link to="/recipes/ground-turkey" className="text-slate-500 hover:text-orange-600 transition-colors">Ground Turkey</Link>
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

export default SalmonRecipes;
