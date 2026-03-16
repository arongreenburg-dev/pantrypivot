import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'brisket' | 'matzoBallSoup' | 'roastedChicken' | 'chocolateCake';

interface Recipe {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

const recipes: Record<Tab, Recipe> = {
  brisket: {
    title: 'Classic Passover Brisket',
    description: 'Slow-braised beef brisket in red wine and vegetables — the ultimate Seder centerpiece. Meat only, no dairy, strictly Kosher for Passover.',
    time: '4 hrs',
    servings: '6–8 servings',
    ingredients: [
      '3–4 lb flat-cut beef brisket',
      '3 tbsp olive oil',
      '2 large onions, thinly sliced',
      '6 garlic cloves, smashed',
      '2 tbsp tomato paste',
      '1 cup dry kosher red wine',
      '1 cup kosher beef broth',
      '3 large carrots, cut into 2-inch pieces',
      '2 stalks celery, roughly chopped',
      '1 tsp sweet paprika',
      '1 tsp dried thyme',
      '1 tsp salt (plus more to taste)',
      '½ tsp black pepper',
    ],
    instructions: [
      'Preheat oven to 325°F (165°C). Pat brisket dry and season generously with salt, pepper, and paprika on both sides.',
      'Heat olive oil in a large oven-safe Dutch oven or roasting pan over medium-high heat. Sear brisket 4–5 minutes per side until deeply browned. Remove and set aside.',
      'Reduce heat to medium. Add onions and cook, stirring, until softened and golden, about 8 minutes. Add garlic and tomato paste, cook 1 minute more.',
      'Pour in wine and broth, scraping up any browned bits from the bottom. Add thyme, carrots, and celery.',
      'Return brisket to the pot, fat side up. Liquid should come about halfway up the meat. Cover tightly with a lid or foil.',
      'Braise in the oven for 3–3½ hours, until fork-tender. Check once halfway through — add a splash of broth if it looks dry.',
      'Let rest 20 minutes before slicing against the grain. Spoon braising liquid over slices to serve.',
    ],
  },
  matzoBallSoup: {
    title: 'Matzo Ball Soup',
    description: 'Silky chicken broth with light, fluffy matzo balls — a Passover tradition. Made with kosher-for-Passover matzo meal. Meat broth, no dairy.',
    time: '2 hrs 30 min',
    servings: '6 servings',
    ingredients: [
      '1 whole chicken (3½–4 lbs), cut into pieces',
      '3 large carrots, cut into coins',
      '3 stalks celery, sliced',
      '1 large onion, quartered',
      '4 garlic cloves',
      '1 bunch fresh dill',
      '1 bunch fresh parsley',
      '1 tsp salt, plus more to taste',
      '½ tsp black pepper',
      '— For matzo balls —',
      '1 cup Passover matzo meal',
      '4 large eggs',
      '¼ cup schmaltz (rendered chicken fat) or vegetable oil',
      '¼ cup cold water or seltzer',
      '1 tsp salt',
      '¼ tsp black pepper',
      '2 tbsp fresh dill, finely chopped',
    ],
    instructions: [
      'Place chicken in a large pot. Cover with 10–12 cups cold water. Bring to a boil, skimming foam from the surface.',
      'Add carrots, celery, onion, garlic, dill, parsley, salt, and pepper. Reduce heat and simmer, partially covered, for 1½–2 hours.',
      'While broth simmers, make matzo ball mixture: whisk eggs, schmaltz or oil, cold water, salt, pepper, and dill in a bowl. Stir in matzo meal until just combined. Refrigerate 30 minutes.',
      'Remove chicken from broth and shred meat off the bones; discard bones and skin. Strain broth, return to pot with carrots and shredded chicken.',
      "Bring broth to a gentle simmer. With wet hands, roll matzo ball mixture into 1½-inch balls (mixture will be soft — don't overwork it).",
      'Gently lower matzo balls into simmering broth. Cover and cook 20–25 minutes without lifting the lid. They will puff up and become fluffy.',
      'Taste broth and adjust salt. Serve hot, topped with fresh dill.',
    ],
  },
  roastedChicken: {
    title: 'Roasted Chicken with Root Vegetables',
    description: 'Herb-rubbed chicken roasted over sweet root vegetables — simple, fragrant, and naturally Kosher for Passover. Meat only, pareve vegetables.',
    time: '1 hr 30 min',
    servings: '4–6 servings',
    ingredients: [
      '1 whole chicken (3½–4 lbs), or 4 lbs bone-in chicken pieces',
      '3 large carrots, cut into 2-inch pieces',
      '2 parsnips, cut into 2-inch pieces',
      '1 large sweet potato, cubed',
      '1 turnip, cubed',
      '1 large onion, cut into wedges',
      '8 garlic cloves, smashed',
      '4 tbsp olive oil, divided',
      '1½ tsp sweet paprika',
      '1 tsp dried thyme',
      '1 tsp dried rosemary',
      '1 tsp salt (plus more to taste)',
      '½ tsp black pepper',
      '1 lemon, halved',
    ],
    instructions: [
      'Preheat oven to 425°F (220°C). Toss carrots, parsnips, sweet potato, turnip, onion, and garlic with 2 tbsp olive oil, ½ tsp salt, and ¼ tsp pepper. Spread in a single layer in a large roasting pan.',
      'Pat chicken completely dry inside and out with paper towels — this is essential for crispy skin.',
      'Mix remaining 2 tbsp olive oil with paprika, thyme, rosemary, 1 tsp salt, and ¼ tsp pepper. Rub all over the chicken and under the breast skin.',
      'Squeeze one lemon half into the cavity, place both lemon halves inside.',
      'Nestle the chicken on top of the vegetables in the roasting pan. Tie legs together with kitchen twine.',
      'Roast 1 hour 15 minutes to 1 hour 30 minutes, until the thigh reads 165°F and the skin is deeply golden.',
      'Rest 10 minutes before carving. Serve chicken over the roasted vegetables with pan juices spooned on top.',
    ],
  },
  chocolateCake: {
    title: 'Flourless Chocolate Cake',
    description: 'Rich, fudgy flourless chocolate cake made with oil instead of butter — perfectly pareve, no dairy, and Kosher for Passover. Naturally gluten-free.',
    time: '1 hr',
    servings: '10 servings',
    ingredients: [
      '8 oz (225g) bittersweet chocolate (kosher for Passover), coarsely chopped',
      '½ cup vegetable oil or refined coconut oil',
      '4 large eggs',
      '¾ cup granulated sugar',
      '¼ cup unsweetened cocoa powder (kosher for Passover)',
      '1 tbsp potato starch',
      '½ tsp fine salt',
      '1 tsp Passover-certified vanilla extract or 1 tsp vanilla bean paste',
      'Cocoa powder and fresh berries, for serving (optional)',
    ],
    instructions: [
      'Preheat oven to 325°F (165°C). Grease a 9-inch round cake pan and line the bottom with parchment paper.',
      'Melt chocolate and oil together in a heatproof bowl set over barely simmering water (or in microwave in 30-second bursts), stirring until smooth. Let cool slightly.',
      'Whisk eggs and sugar in a large bowl until pale and slightly thickened, about 2 minutes.',
      'Add vanilla to the chocolate mixture. Gradually whisk the chocolate mixture into the egg mixture.',
      'Sift in cocoa powder and potato starch; add salt. Fold gently until just combined — do not overmix.',
      'Pour batter into prepared pan. Bake 28–32 minutes, until the center is just set (it will look slightly underdone — that is correct for a fudgy texture).',
      'Cool completely in the pan on a wire rack. Dust with cocoa powder and serve with fresh berries.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'brisket', label: 'Passover Brisket' },
  { key: 'matzoBallSoup', label: 'Matzo Ball Soup' },
  { key: 'roastedChicken', label: 'Roasted Chicken' },
  { key: 'chocolateCake', label: 'Flourless Chocolate Cake' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';
const HERO_IMAGE = 'https://images.pexels.com/photos/12645502/pexels-photo-12645502.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

const PassoverRecipes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('brisket');
  const [copied, setCopied] = useState(false);
  const recipe = recipes[activeTab];

  useEffect(() => {
    const PAGE_TITLE = 'Kosher for Passover Recipes (Chametz-Free) | PantryPivot';
    const PAGE_DESC = 'Easy Kosher for Passover recipes — brisket, matzo ball soup, roast chicken, and flourless chocolate cake. Chametz-free and kitniyot-free.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/passover';
    document.title = PAGE_TITLE;
    const update = (sel: string, attr: string, val: string): string => {
      const el = document.querySelector(sel);
      const prev = el ? (el.getAttribute(attr) ?? '') : '';
      if (el) el.setAttribute(attr, val);
      return prev;
    };
    const prevDesc    = update('meta[name="description"]',      'content', PAGE_DESC);
    const prevOgTitle = update('meta[property="og:title"]',     'content', PAGE_TITLE);
    const prevOgDesc  = update('meta[property="og:description"]','content', PAGE_DESC);
    const prevOgUrl   = update('meta[property="og:url"]',       'content', PAGE_URL);
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
      update('meta[name="description"]',       'content', prevDesc);
      update('meta[property="og:title"]',      'content', prevOgTitle);
      update('meta[property="og:description"]','content', prevOgDesc);
      update('meta[property="og:url"]',        'content', prevOgUrl);
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
      "name": "Classic Passover Brisket",
      "description": "Slow-braised beef brisket in red wine and vegetables — the ultimate Seder centerpiece. Kosher for Passover, meat only, no dairy.",
      "image": HERO_IMAGE,
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "prepTime": "PT20M",
      "cookTime": "PT210M",
      "recipeCategory": "Main Course",
      "recipeCuisine": "Jewish",
      "keywords": "kosher for passover, passover brisket, seder recipes, matzo ball soup, flourless chocolate cake",
      "url": "https://pantrypivot.com/recipes/passover",
      "recipeIngredient": [
        "3–4 lb flat-cut beef brisket",
        "3 tbsp olive oil",
        "2 large onions, thinly sliced",
        "6 garlic cloves, smashed",
        "1 cup dry kosher red wine",
        "1 cup kosher beef broth",
        "3 large carrots",
      ],
      "recipeYield": "6–8 servings",
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Preheat oven to 325°F. Pat brisket dry and season with salt, pepper, and paprika." },
        { "@type": "HowToStep", "text": "Sear brisket in hot oil 4–5 minutes per side until browned." },
        { "@type": "HowToStep", "text": "Sauté onions and garlic, add tomato paste, wine, and broth." },
        { "@type": "HowToStep", "text": "Return brisket to pot, add vegetables, cover and braise 3–3½ hours at 325°F." },
        { "@type": "HowToStep", "text": "Rest 20 minutes before slicing against the grain." },
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
        { "@type": "Question", "name": "What makes a recipe Kosher for Passover?", "acceptedAnswer": { "@type": "Answer", "text": "A Kosher for Passover recipe contains no chametz — leavened grains including wheat, barley, rye, oats, and spelt that have come into contact with water for more than 18 minutes. All ingredients must be certified Kosher for Passover. These recipes also avoid kitniyot (legumes, rice, corn) which Ashkenazi Jews traditionally don't eat on Passover." } },
        { "@type": "Question", "name": "Can I make Passover brisket the day before?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — brisket actually tastes better when made the day before. Make it a day ahead, let it cool, and refrigerate it in its braising liquid. The next day, skim the solidified fat from the surface, slice the cold brisket against the grain, and reheat it covered in a 325°F oven with the braising liquid for 30–40 minutes." } },
        { "@type": "Question", "name": "Is this recipe kitniyot-free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — all recipes on this page are kitniyot-free (no rice, corn, legumes, or beans). This makes them suitable for both Ashkenazi and Sephardic Passover traditions. The flourless chocolate cake uses potato starch rather than any kitniyot-based thickener." } },
        { "@type": "Question", "name": "How do I reheat Passover brisket?", "acceptedAnswer": { "@type": "Answer", "text": "Slice the cold brisket against the grain first — it slices much more cleanly when cold. Place in a baking dish, spoon the braising liquid over the slices, cover tightly with foil, and reheat at 325°F for 30–40 minutes until warmed through. The liquid keeps the slices moist." } }
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
            <li className="text-slate-600 font-medium">Kosher for Passover</li>
          </ol>
        </nav>

        {/* Table of Contents */}
        <nav className="mb-8 overflow-x-auto">
          <div className="flex gap-2 text-sm font-semibold text-slate-500 whitespace-nowrap pb-1">
            <span className="text-slate-400 text-xs uppercase tracking-wider self-center">Jump to:</span>
            <a href="#recipe-ideas" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-indigo-300 hover:text-indigo-700 transition-colors">Recipes</a>
            <a href="#cooking-tips" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-indigo-300 hover:text-indigo-700 transition-colors">Cooking Tips</a>
            <a href="#substitutions" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-indigo-300 hover:text-indigo-700 transition-colors">Substitutions</a>
            <a href="#faq" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-indigo-300 hover:text-indigo-700 transition-colors">FAQ</a>
            <a href="https://pantrypivot.com" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-indigo-300 hover:text-indigo-700 transition-colors">✨ Custom Recipe</a>
          </div>
        </nav>

        {/* Passover badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold px-5 py-2 rounded-full text-sm">
            🍷 Kosher for Passover — Chametz-Free &amp; Kitniyot-Free
          </span>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Kosher for Passover Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Traditional Seder favorites — brisket, matzo ball soup, roast chicken, and flourless chocolate cake. All strictly chametz-free and kitniyot-free.
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
            Shop Passover Ingredients on Amazon Fresh →
          </a>
        </div>

        {/* Tabs */}
        <div id="recipe-ideas" className="flex gap-2 flex-wrap justify-center mb-8">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm border transition-all ${
                activeTab === tab.key
                  ? 'bg-indigo-700 border-indigo-700 text-white shadow-md'
                  : 'border-slate-200 text-slate-600 bg-white hover:border-indigo-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Recipe Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-indigo-50 border-b border-indigo-100 px-8 py-6">
            <h2 className="text-2xl font-black text-slate-900 mb-1">{recipe.title}</h2>
            <p className="text-slate-500 mb-4">{recipe.description}</p>
            <div className="flex gap-4 text-sm font-semibold text-slate-600">
              <span>⏱ {recipe.time}</span>
              <span>👥 {recipe.servings}</span>
            </div>
          </div>

          <div className="p-8 grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-sm font-black text-indigo-700 uppercase tracking-wide mb-4">
                Ingredients
              </h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black text-indigo-700 uppercase tracking-wide mb-4">
                Instructions
              </h3>
              <ol className="space-y-4">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-700 text-white text-xs font-black flex items-center justify-center mt-0.5">
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
              className="flex-1 border-2 border-slate-200 hover:border-indigo-300 text-slate-700 font-bold py-3 px-6 rounded-2xl text-center transition-all"
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
              "Make the brisket the day before the Seder — it slices much more cleanly when cold, and the flavors deepen overnight.",
              "The matzo ball mixture must be refrigerated for at least 30 minutes before shaping. This lets the matzo meal hydrate and firm up, which is what creates fluffy, light matzo balls.",
              "Do not lift the lid while matzo balls are cooking. The steam is what makes them light and fluffy. Lifting the lid lets the steam escape and causes them to deflate.",
              "Use potato starch to thicken sauces and gravies instead of flour or cornstarch — it's 100% chametz-free and kitniyot-free.",
              "Check all chocolate for a Kosher for Passover certification on the label. Many standard chocolates contain chametz or kitniyot as additives.",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-indigo-400 flex-shrink-0" />
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
              "Potato starch ↔ tapioca starch: Equal substitution for thickening — both are Kosher for Passover and kitniyot-free.",
              "Vegetable oil ↔ schmaltz (rendered chicken fat) for matzo balls: Schmaltz makes more flavorful matzo balls. Equal substitution.",
              "Dry red wine ↔ extra beef broth: If you don't have kosher wine, use an additional cup of beef broth plus 1 tbsp apple cider vinegar for acidity.",
              "Bittersweet chocolate ↔ dark chocolate: Use any dark chocolate (60–70% cacao) that is certified Kosher for Passover.",
              "Fresh dill ↔ dried dill: Use ½ tsp dried dill per 1 tbsp fresh. Add dried dill at the end of cooking for best flavor.",
            ].map((sub, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-indigo-400 flex-shrink-0" />
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
              "Brisket: fridge 4–5 days (tastes better on day 2), freezes excellently for 3 months.",
              "Matzo ball soup: fridge 3 days — keep matzo balls and broth together.",
              "Flourless chocolate cake: fridge 5 days covered.",
              "Roasted chicken: fridge 3–4 days.",
              "Reheat brisket covered at 325°F with braising liquid.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-indigo-400 flex-shrink-0" />
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
                q: "What makes a recipe Kosher for Passover?",
                a: "A Kosher for Passover recipe contains no chametz — leavened grains including wheat, barley, rye, oats, and spelt that have come into contact with water for more than 18 minutes. All ingredients must be certified Kosher for Passover. These recipes also avoid kitniyot (legumes, rice, corn) which Ashkenazi Jews traditionally don't eat on Passover.",
              },
              {
                q: "Can I make Passover brisket the day before?",
                a: "Yes — brisket actually tastes better when made the day before. Make it a day ahead, let it cool, and refrigerate it in its braising liquid. The next day, skim the solidified fat from the surface, slice the cold brisket against the grain, and reheat it covered in a 325°F oven with the braising liquid for 30–40 minutes.",
              },
              {
                q: "Is this recipe kitniyot-free?",
                a: "Yes — all recipes on this page are kitniyot-free (no rice, corn, legumes, or beans). This makes them suitable for both Ashkenazi and Sephardic Passover traditions. The flourless chocolate cake uses potato starch rather than any kitniyot-based thickener.",
              },
              {
                q: "How do I reheat Passover brisket?",
                a: "Slice the cold brisket against the grain first — it slices much more cleanly when cold. Place in a baking dish, spoon the braising liquid over the slices, cover tightly with foil, and reheat at 325°F for 30–40 minutes until warmed through. The liquid keeps the slices moist.",
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
            <Link to="/recipes/roast-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍗</span> Roast Chicken
            </Link>
            <Link to="/recipes/chicken-soup" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍜</span> Chicken Soup
            </Link>
            <Link to="/recipes/beef-stew" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🥩</span> Beef Stew
            </Link>
            <Link to="/recipes/shakshuka" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍳</span> Shakshuka
            </Link>
            <Link to="/recipes/dairy-free-marry-me-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍗</span> Dairy-Free Marry Me Chicken
            </Link>
            <Link to="/recipes/easter" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🐣</span> Easter Dinner
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
          <Link to="/recipes/roast-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Roast Chicken</Link>
          <Link to="/recipes/chicken-soup" className="text-slate-500 hover:text-orange-600 transition-colors">Chicken Soup</Link>
          <Link to="/recipes/beef-stew" className="text-slate-500 hover:text-orange-600 transition-colors">Beef Stew</Link>
          <Link to="/recipes/shakshuka" className="text-slate-500 hover:text-orange-600 transition-colors">Shakshuka</Link>
          <Link to="/recipes/easter" className="text-slate-500 hover:text-orange-600 transition-colors">Easter Recipes</Link>
        </div>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed text-center">
          Disclosure: PantryPivot participates in the Amazon Associates Program. <br />
          As an Amazon Associate, we may earn from qualifying purchases at no additional cost to you.
        </p>
      </footer>
    </div>
  );
};

export default PassoverRecipes;
