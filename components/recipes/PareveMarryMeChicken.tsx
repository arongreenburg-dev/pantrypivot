import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'classic' | 'soup' | 'instantpot' | 'crockpot';

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
    title: 'Classic Dairy-Free Marry Me Chicken',
    description: 'Rich, creamy, and completely dairy-free — sun-dried tomatoes and coconut cream create an irresistible sauce. Fully pareve and kosher-friendly.',
    time: '35 min',
    servings: '4 servings',
    ingredients: [
      '4 boneless, skinless chicken breasts (6–8 oz each)',
      '1 can (13.5 oz) full-fat coconut cream',
      '½ cup sun-dried tomatoes in oil, drained and chopped',
      '4 cloves garlic, minced',
      '1 cup chicken broth',
      '2 tbsp olive oil',
      '1 tsp smoked paprika',
      '1 tsp Italian seasoning',
      '½ tsp red pepper flakes',
      '1 tsp salt',
      '½ tsp black pepper',
      'Fresh basil or parsley for garnish',
    ],
    instructions: [
      'Season chicken breasts on both sides with paprika, salt, and pepper.',
      'Heat olive oil in a large skillet over medium-high heat. Sear chicken 4–5 minutes per side until golden. Remove and set aside.',
      'In the same skillet, reduce heat to medium. Add garlic and cook 30 seconds until fragrant.',
      'Add sun-dried tomatoes and Italian seasoning. Stir and cook 1 minute.',
      'Pour in chicken broth and scrape up any browned bits from the pan.',
      'Add coconut cream and red pepper flakes. Stir well to combine. Bring to a gentle simmer.',
      'Return chicken to the skillet. Spoon sauce over the top.',
      'Simmer uncovered 10–12 minutes until chicken is cooked through (165°F) and sauce has thickened.',
      'Garnish with fresh basil or parsley and serve immediately.',
    ],
  },
  soup: {
    title: 'Dairy-Free Marry Me Chicken Soup',
    description: 'All the flavors of Marry Me Chicken in a cozy, creamy soup — with gnocchi, spinach, and coconut cream. No dairy, all comfort.',
    time: '40 min',
    servings: '6 servings',
    ingredients: [
      '1.5 lbs boneless, skinless chicken breasts or thighs',
      '1 can (13.5 oz) full-fat coconut cream',
      '½ cup sun-dried tomatoes, chopped',
      '4 cups chicken broth',
      '1 lb potato gnocchi (or small pasta)',
      '3 cups fresh spinach',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '2 tbsp olive oil',
      '1 tsp Italian seasoning',
      '½ tsp red pepper flakes',
      '1 tsp smoked paprika',
      '1 tsp salt',
      '½ tsp black pepper',
      'Fresh basil for garnish',
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat. Add onion and cook 4 minutes. Add garlic and cook 30 seconds.',
      'Add whole chicken breasts, chicken broth, paprika, Italian seasoning, red pepper flakes, salt, and pepper.',
      'Bring to a boil, reduce heat, and simmer 20 minutes until chicken is cooked through.',
      'Remove chicken, shred with two forks, and return to pot.',
      'Add sun-dried tomatoes and coconut cream. Stir to combine and bring back to a gentle simmer.',
      'Add gnocchi and cook 3–4 minutes until they float and are tender.',
      'Stir in fresh spinach and cook 1–2 minutes until wilted.',
      'Taste and adjust seasoning. Garnish with fresh basil and serve hot.',
    ],
  },
  instantpot: {
    title: 'Instant Pot Dairy-Free Marry Me Chicken',
    description: 'Pressure-cooked marry me chicken with coconut cream and sun-dried tomatoes — tender, saucy, and completely dairy-free in under 30 minutes.',
    time: '30 min',
    servings: '4 servings',
    ingredients: [
      '4 boneless, skinless chicken breasts',
      '1 can (13.5 oz) full-fat coconut cream',
      '½ cup sun-dried tomatoes, chopped',
      '4 cloves garlic, minced',
      '½ cup chicken broth',
      '2 tbsp olive oil',
      '1 tsp smoked paprika',
      '1 tsp Italian seasoning',
      '½ tsp red pepper flakes',
      '1 tsp salt',
      '½ tsp black pepper',
      'Fresh basil for garnish',
    ],
    instructions: [
      'Season chicken breasts with paprika, salt, and pepper.',
      'Set Instant Pot to Sauté. Heat olive oil and sear chicken 2–3 minutes per side. Press Cancel.',
      'Remove chicken. Add chicken broth and scrape up any browned bits.',
      'Add garlic, sun-dried tomatoes, Italian seasoning, and red pepper flakes.',
      'Return chicken to the pot. Seal lid, set valve to Sealing.',
      'Cook on Manual High Pressure for 8 minutes.',
      'Natural release 5 minutes, then quick-release remaining pressure.',
      'Remove chicken. Set Instant Pot to Sauté. Stir in coconut cream and simmer 3–4 minutes until sauce thickens.',
      'Return chicken and spoon sauce over the top. Garnish with fresh basil.',
    ],
  },
  crockpot: {
    title: 'Crockpot Dairy-Free Marry Me Chicken',
    description: 'Set-it-and-forget-it dairy-free marry me chicken with coconut cream — slow-cooked to fall-apart tenderness with a rich, creamy sauce.',
    time: '6 hrs (low) or 3 hrs (high)',
    servings: '4 servings',
    ingredients: [
      '4 boneless, skinless chicken breasts',
      '1 can (13.5 oz) full-fat coconut cream',
      '½ cup sun-dried tomatoes, chopped',
      '4 cloves garlic, minced',
      '½ cup chicken broth',
      '1 tsp smoked paprika',
      '1 tsp Italian seasoning',
      '½ tsp red pepper flakes',
      '1 tsp salt',
      '½ tsp black pepper',
      'Fresh basil or parsley for garnish',
    ],
    instructions: [
      'Season chicken breasts with paprika, salt, and pepper. Place in the crockpot.',
      'Add minced garlic, sun-dried tomatoes, Italian seasoning, and red pepper flakes on top of and around the chicken.',
      'Pour chicken broth around the chicken.',
      'Cook on LOW for 6 hours or HIGH for 3 hours, until chicken is very tender.',
      'Remove chicken from the crockpot. Stir coconut cream into the cooking liquid.',
      'Return chicken and let it rest in the sauce for 10 minutes.',
      'Optionally shred the chicken or leave whole. Spoon sauce generously over the top.',
      'Garnish with fresh basil or parsley and serve over rice or pasta.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'classic', label: 'Dairy-Free Classic' },
  { key: 'soup', label: 'Dairy-Free Soup' },
  { key: 'instantpot', label: 'Dairy-Free Instant Pot' },
  { key: 'crockpot', label: 'Dairy-Free Crockpot' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const PareveMarryMeChicken: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('classic');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Dairy-Free Marry Me Chicken | PantryPivot';
    const PAGE_DESC = 'Dairy-free Marry Me Chicken made with coconut cream — classic, soup, Instant Pot, and Crockpot versions. Kosher-friendly and delicious.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/dairy-free-marry-me-chicken';
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
      "name": "Dairy-Free Marry Me Chicken",
      "description": "Dairy-free Marry Me Chicken made with coconut cream — classic, soup, Instant Pot, and Crockpot versions. Kosher-friendly and delicious.",
      "image": "https://images.pexels.com/photos/30120281/pexels-photo-30120281.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT10M",
      "cookTime": "PT35M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "dairy-free marry me chicken, pareve marry me chicken, coconut cream chicken, kosher chicken",
      "url": "https://pantrypivot.com/recipes/dairy-free-marry-me-chicken",
      "recipeIngredient": [
        "4 boneless, skinless chicken breasts (6\u20138 oz each)",
        "1 can (13.5 oz) full-fat coconut cream",
        "\u00bd cup sun-dried tomatoes in oil, drained and chopped",
        "4 cloves garlic, minced",
        "1 cup chicken broth"
      ],
      "recipeYield": "4 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Season chicken breasts on both sides with paprika, salt, and pepper." },
        { "@type": "HowToStep", "text": "Heat olive oil in a large skillet over medium-high heat. Sear chicken 4\u20135 minutes per side until golden. Remove and set aside." },
        { "@type": "HowToStep", "text": "In the same skillet, reduce heat to medium. Add garlic and cook 30 seconds until fragrant." },
        { "@type": "HowToStep", "text": "Add sun-dried tomatoes and Italian seasoning. Stir and cook 1 minute." },
        { "@type": "HowToStep", "text": "Pour in chicken broth and scrape up any browned bits from the pan." },
        { "@type": "HowToStep", "text": "Add coconut cream and red pepper flakes. Stir well to combine. Bring to a gentle simmer." },
        { "@type": "HowToStep", "text": "Return chicken to the skillet. Spoon sauce over the top." },
        { "@type": "HowToStep", "text": "Simmer uncovered 10\u201312 minutes until chicken is cooked through (165\u00b0F) and sauce has thickened." },
        { "@type": "HowToStep", "text": "Garnish with fresh basil or parsley and serve immediately." }
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
            <li className="text-slate-600 font-medium">Dairy-Free Marry Me Chicken</li>
          </ol>
        </nav>

        {/* Hero Image */}
        <div className="mb-8 rounded-2xl overflow-hidden">
          <img
            src="https://images.pexels.com/photos/30120281/pexels-photo-30120281.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Creamy dairy-free marry me chicken skillet with sun-dried tomatoes"
            width={800}
            height={500}
            loading="lazy"
            fetchPriority="high"
            className="w-full object-cover rounded-2xl"
          />
          <p className="text-xs text-slate-400 text-center mt-1">Photo by Change C.C via Pexels</p>
        </div>

        <div className="text-center mb-10">
          <span className="inline-block bg-green-100 text-green-700 font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
            Dairy-Free
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Dairy-Free Marry Me Chicken</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            The viral recipe — made completely dairy-free with coconut cream. Classic, soup, Instant Pot, and Crockpot versions.
          </p>
        </div>

        {/* Passover note */}
        <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-2xl px-5 py-4 mb-6 max-w-2xl mx-auto">
          <span className="text-green-600 text-lg flex-shrink-0">✅</span>
          <p className="text-sm text-green-800 font-medium leading-snug">
            This recipe is Kosher for Passover when made with potato starch instead of flour.
          </p>
        </div>

        {/* Amazon CTA */}
        <div className="text-center mb-6">
          <a
            href={AMAZON_LINK}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-colors text-sm"
          >
            Order Ingredients on Amazon Fresh
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap justify-center mb-8">
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
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block bg-green-100 text-green-700 font-black text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                Dairy-Free
              </span>
            </div>
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

            {/* Instructions */}
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

        {/* More Recipes */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">More Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/recipes/chicken-and-rice" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍚</span> Chicken and Rice
            </Link>
            <Link to="/recipes/crockpot-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍲</span> Crockpot Chicken
            </Link>
            <Link to="/recipes/instant-pot-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">⚡</span> Instant Pot Chicken
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
          <Link to="/recipes/shakshuka" className="text-slate-500 hover:text-orange-600 transition-colors">Shakshuka</Link>
          <Link to="/recipes/ground-turkey-sweet-potato" className="text-slate-500 hover:text-orange-600 transition-colors">Turkey & Sweet Potato</Link>
        </div>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed text-center">
          Disclosure: PantryPivot participates in the Amazon Associates Program. <br />
          As an Amazon Associate, we may earn from qualifying purchases at no additional cost to you.
        </p>
      </footer>
    </div>
  );
};

export default PareveMarryMeChicken;
