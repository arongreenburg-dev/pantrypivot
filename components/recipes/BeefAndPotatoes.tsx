import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare const window: Window & { gtag: (...args: unknown[]) => void };

type Tab = 'stew' | 'skillet' | 'sheetpan' | 'hash';

interface Recipe {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

const recipes: Record<Tab, Recipe> = {
  stew: {
    title: 'Classic Beef and Potato Stew',
    description: 'Tender chunks of beef and golden potatoes braised in a rich, savory broth with carrots and onions — the ultimate cold-weather comfort food.',
    time: '90 min',
    servings: '6 servings',
    ingredients: [
      '2 lbs beef chuck, cut into 1½-inch cubes',
      '1½ lbs Yukon Gold potatoes, cut into 1-inch chunks',
      '3 medium carrots, sliced into rounds',
      '2 stalks celery, sliced',
      '1 large onion, diced',
      '4 cloves garlic, minced',
      '2 tbsp tomato paste',
      '3 cups beef broth',
      '1 cup water',
      '2 tbsp olive oil',
      '2 tbsp all-purpose flour',
      '1 tsp dried thyme',
      '1 tsp dried rosemary',
      '1 bay leaf',
      '½ tsp salt',
      '¼ tsp black pepper',
      '2 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'Pat beef dry with paper towels; season generously with salt and pepper. Toss with flour.',
      'Heat olive oil in a large Dutch oven over medium-high heat. Brown beef in batches — 3–4 minutes per side. Do not crowd the pot. Remove and set aside.',
      'Reduce heat to medium. Add onion and celery to the pot; cook 4–5 minutes, scraping up any browned bits.',
      'Add garlic; cook 1 minute. Add tomato paste; stir and cook 2 minutes until it darkens slightly.',
      'Pour in beef broth and water. Return beef to the pot. Add thyme, rosemary, and bay leaf. Bring to a boil.',
      'Reduce heat to low. Cover and simmer 45 minutes.',
      'Add potatoes and carrots. Continue simmering, covered, 30–35 more minutes until beef is fork-tender and vegetables are cooked through.',
      'Remove bay leaf. Taste and adjust seasoning. Garnish with fresh parsley. Serve with bread for dipping.',
    ],
  },
  skillet: {
    title: 'Beef and Potato Skillet',
    description: 'Ground beef and diced potatoes cooked together in one skillet with onion, garlic, and smoked paprika — a fast, hearty dinner ready in 30 minutes.',
    time: '30 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground beef (80/20)',
      '1½ lbs Yukon Gold potatoes, diced small (½-inch)',
      '1 medium onion, diced',
      '1 red bell pepper, diced',
      '3 cloves garlic, minced',
      '1 can (14.5 oz) diced tomatoes, drained',
      '1 tbsp olive oil',
      '1 tsp smoked paprika',
      '1 tsp cumin',
      '½ tsp garlic powder',
      '½ tsp salt',
      '¼ tsp black pepper',
      '¼ tsp red pepper flakes (optional)',
      '2 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'Heat olive oil in a large cast-iron or heavy skillet over medium-high heat.',
      'Add diced potatoes in a single layer. Cook undisturbed 5 minutes until golden on the bottom, then stir. Continue cooking 5–7 more minutes until tender and lightly crisped. Remove to a plate.',
      'Add ground beef to the skillet. Break apart with a spoon; cook 5–6 minutes until browned. Drain excess fat.',
      'Add onion and bell pepper; cook 3 minutes.',
      'Add garlic, smoked paprika, cumin, garlic powder, salt, pepper, and red pepper flakes. Stir and cook 1 minute.',
      'Stir in drained diced tomatoes. Return potatoes to the pan.',
      'Toss everything together and cook 2–3 minutes until heated through and flavors meld.',
      'Taste and adjust seasoning. Garnish with fresh parsley and serve.',
    ],
  },
  sheetpan: {
    title: 'Sheet Pan Beef and Potatoes',
    description: 'Seasoned beef chunks and baby potatoes roasted together on one pan until caramelized and tender — minimal prep, maximum flavor.',
    time: '50 min',
    servings: '4 servings',
    ingredients: [
      '1½ lbs beef sirloin or top round, cut into 1½-inch cubes',
      '1½ lbs baby potatoes, halved',
      '1 large red onion, cut into wedges',
      '1 red bell pepper, cut into chunks',
      '4 cloves garlic, minced',
      '3 tbsp olive oil',
      '1 tsp dried rosemary',
      '1 tsp dried thyme',
      '1 tsp smoked paprika',
      '½ tsp garlic powder',
      '¾ tsp salt',
      '¼ tsp black pepper',
      '2 tbsp fresh parsley, chopped',
      '1 tbsp balsamic vinegar',
    ],
    instructions: [
      'Preheat oven to 425°F. Line a large rimmed baking sheet with parchment paper.',
      'In a large bowl, whisk together olive oil, garlic, rosemary, thyme, smoked paprika, garlic powder, salt, and pepper.',
      'Add beef cubes to the bowl; toss to coat. Remove and set aside. Add potatoes, onion, and bell pepper to the same bowl; toss to coat.',
      'Spread vegetables in a single layer on the prepared sheet pan. Roast 15 minutes.',
      'Push vegetables to the edges. Add beef pieces in the center in a single layer.',
      'Return to oven and roast 18–22 minutes until beef is cooked to desired doneness and potatoes are tender and golden.',
      'Drizzle balsamic vinegar over everything during the last 2 minutes of cooking.',
      'Garnish with fresh parsley and serve immediately.',
    ],
  },
  hash: {
    title: 'Beef and Potato Hash',
    description: 'Crispy diced potatoes and seasoned beef cooked in a skillet until deeply browned — a satisfying hash that works for breakfast, lunch, or dinner.',
    time: '30 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground beef or leftover beef, shredded',
      '1½ lbs russet potatoes, peeled and diced small',
      '1 medium onion, diced',
      '1 green bell pepper, diced',
      '3 cloves garlic, minced',
      '2 tbsp olive oil',
      '1 tsp Worcestershire sauce',
      '1 tsp smoked paprika',
      '½ tsp onion powder',
      '½ tsp salt',
      '¼ tsp black pepper',
      '2 green onions, sliced',
    ],
    instructions: [
      'Heat 1 tbsp olive oil in a large cast-iron skillet over medium-high heat.',
      'Add diced potatoes in a single layer. Season with half the salt and pepper. Cook undisturbed 5 minutes until a crust forms on the bottom.',
      'Stir, then cook another 5–7 minutes, stirring every 2 minutes, until potatoes are crispy and cooked through. Remove to a plate.',
      'Add remaining 1 tbsp oil. Add beef (if raw, break apart and cook 5–6 minutes; if using leftover beef, add and cook 2–3 minutes to heat).',
      'Add onion and bell pepper; cook 3 minutes until softened.',
      'Add garlic, smoked paprika, onion powder, Worcestershire sauce, and remaining salt and pepper. Stir 1 minute.',
      'Return crispy potatoes to the pan. Press the hash down firmly into the skillet and let it cook undisturbed 2–3 minutes to form a crust on the bottom.',
      'Flip sections of the hash to expose the crust side up. Top with green onions. Serve hot.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'stew', label: 'Stew' },
  { key: 'skillet', label: 'Skillet' },
  { key: 'sheetpan', label: 'Sheet Pan' },
  { key: 'hash', label: 'Hash' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const BeefAndPotatoes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('stew');
  const [copied, setCopied] = useState(false);

  const recipe = recipes[activeTab];

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Beef and Potatoes Recipes (Stew, Skillet, Sheet Pan, Hash) | PantryPivot';

    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const createdDesc = !metaDesc;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    const prevDesc = metaDesc.content;
    metaDesc.content = 'Easy beef and potatoes recipes including classic stew, one-skillet dinner, sheet pan roast, and crispy hash. Hearty, dairy-free, and family-friendly.';

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const createdCanon = !canonical;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    const prevCanon = canonical.href;
    canonical.href = 'https://pantrypivot.com/recipes/beef-and-potatoes';

    return () => {
      document.title = prevTitle;
      if (createdDesc) metaDesc?.remove();
      else if (metaDesc) metaDesc.content = prevDesc;
      if (createdCanon) canonical?.remove();
      else if (canonical) canonical.href = prevCanon;
    };
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'recipe-schema';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      name: recipe.title,
      description: recipe.description,
      totalTime: `PT${recipe.time.replace(' min', 'M')}`,
      recipeYield: recipe.servings,
      recipeCategory: 'Main Course',
      recipeCuisine: 'American',
      keywords: 'beef and potatoes, beef potato stew, ground beef potatoes, sheet pan beef',
      recipeIngredient: recipe.ingredients,
      recipeInstructions: recipe.instructions.map((step, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        text: step,
      })),
    });
    const existing = document.getElementById('recipe-schema');
    if (existing) existing.remove();
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [activeTab, recipe]);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the best cut of beef for stew?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Beef chuck is the best choice for stew. It has enough fat and connective tissue to become tender and flavorful during long, slow braising. Avoid lean cuts like sirloin for stews — they will become tough and dry.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I get crispy potatoes in a skillet?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The key is not to stir too often. Add potatoes in a single layer to a hot, oiled pan and let them sit undisturbed for 4–5 minutes to develop a golden crust before stirring. Avoid crowding the pan.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I use a slow cooker for the stew?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Brown the beef and sauté the aromatics on the stovetop first, then transfer everything to a slow cooker. Cook on low for 7–8 hours or high for 4–5 hours. Add potatoes and carrots halfway through to prevent them from getting mushy.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I store and reheat beef stew?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Beef stew keeps in the refrigerator for 3–4 days and freezes well for up to 3 months. Reheat gently on the stovetop over medium-low heat, adding a splash of broth if it has thickened. The flavor improves the next day as it sits.',
          },
        },
      ],
    });
    const existing = document.getElementById('faq-schema');
    if (existing) existing.remove();
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText('https://pantrypivot.com/recipes/beef-and-potatoes').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'page-recipe-schema';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Recipe",
      "name": "Beef and Potatoes Recipes",
      "description": "Four kosher meat beef and potato recipes — classic stew, quick skillet, sheet pan roast, and crispy hash.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "beef and potatoes, kosher beef dinner, dairy-free beef, beef potato skillet, easy beef dinner",
      "suitableForDiet": "https://schema.org/KosherDiet",
      "recipeIngredient": [
        "1.5 lbs beef chuck or ground beef",
        "1.5 lbs potatoes, diced or cubed",
        "1 large onion, diced",
        "3 cloves garlic, minced",
        "2 cups beef broth",
        "2 tbsp olive oil",
        "1 tsp smoked paprika"
      ],
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Brown beef in olive oil over high heat until seared on all sides. Remove and set aside." },
        { "@type": "HowToStep", "text": "Cook onion and garlic in the same pan 3 minutes. Add potatoes, broth, and paprika. Return beef to the pan." },
        { "@type": "HowToStep", "text": "Simmer covered 30–40 minutes until beef is tender and potatoes are cooked through. Season to taste and serve." }
      ],
      "prepTime": "PT15M",
      "cookTime": "PT45M",
      "recipeYield": "4 servings"
    });
    document.head.appendChild(script);
    return () => { const el = document.getElementById('page-recipe-schema'); if (el) el.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-orange-500 font-bold text-xl">PantryPivot</Link>
          <nav className="flex gap-4 text-sm text-slate-600">
            <Link to="/recipes" className="hover:text-orange-500">Recipes</Link>
            <Link to="/pantry" className="hover:text-orange-500">My Pantry</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/recipes" className="hover:text-orange-500">Recipes</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">Beef and Potatoes</span>
        </nav>

        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-800">Beef and Potatoes Recipes</h1>
            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">🥩 Meat</span>
          </div>
          <p className="text-slate-600 text-lg">Four hearty ways to cook beef and potatoes — classic stew, quick skillet, sheet pan roast, and crispy hash.</p>
        </div>

        {/* Share button */}
        <button
          onClick={handleShare}
          className="mb-6 px-4 py-2 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
        >
          {copied ? '✓ Link copied!' : '🔗 Share this page'}
        </button>

        {/* TOC */}
        <nav className="bg-white rounded-xl border border-slate-200 p-5 mb-8">
          <h2 className="font-semibold text-slate-700 mb-3">On this page</h2>
          <ul className="space-y-1 text-sm text-orange-600">
            <li><a href="#recipes" className="hover:underline">Recipes</a></li>
            <li><a href="#tips" className="hover:underline">Cooking Tips</a></li>
            <li><a href="#substitutions" className="hover:underline">Substitutions</a></li>
            <li><a href="#storage" className="hover:underline">Storage & Reheating</a></li>
            <li><a href="#faq" className="hover:underline">FAQ</a></li>
          </ul>
        </nav>

        <h2 className="text-2xl font-bold text-slate-800 mb-3">What Can I Make With Beef and Potatoes?</h2>
        <p className="text-sm text-slate-500 max-w-2xl mb-8 leading-relaxed">This page contains 4 kosher meat beef and potato recipes — stew, skillet, sheet pan, and hash. All recipes are dairy-free. Ingredients are simple pantry staples with no specialty items required.</p>

        {/* Tabs */}
        <div id="recipes" className="mb-6 flex flex-wrap gap-2">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === key
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-orange-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Recipe card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{recipe.title}</h2>
          <p className="text-slate-600 mb-4">{recipe.description}</p>
          <div className="flex gap-6 text-sm text-slate-500 mb-6">
            <span>⏱ {recipe.time}</span>
            <span>🍽 {recipe.servings}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-orange-400 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Instructions</h3>
              <ol className="space-y-3">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold text-xs">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={AMAZON_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.gtag('event', 'click', { event_category: 'affiliate', event_label: 'amazon-fresh-beef-potatoes' })}
              className="px-5 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
            >
              Order Ingredients on Amazon Fresh
            </a>
            <a
              href={PANTRYPIVOT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              Find More Recipes on PantryPivot
            </a>
          </div>
        </div>

        {/* Cooking Tips */}
        <section id="tips" className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Cooking Tips</h2>
          <ul className="space-y-3">
            {[
              'For stew, always brown the beef in batches. Crowding the pot causes steaming instead of searing — you lose the rich, caramelized crust that deepens flavor.',
              'Pat beef completely dry before browning. Surface moisture is the biggest obstacle to a good sear.',
              'Yukon Gold potatoes hold their shape well in stews and skillets. Russets are better for crispy hash because they have less moisture.',
              'For the crispiest skillet potatoes, parboil the diced potatoes in salted water for 5 minutes first, then drain and fry — the surface starch helps them crisp.',
              'Season in layers: season the beef before browning, season again when adding vegetables, and taste and adjust at the end.',
              'Balsamic vinegar or a splash of Worcestershire sauce deepens the savory notes in beef dishes without adding dairy.',
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-orange-400 mt-0.5 flex-shrink-0">✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>

        {/* Substitutions */}
        <section id="substitutions" className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Substitutions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { from: 'Beef chuck (stew)', to: 'Lamb shoulder, pork shoulder, or boneless short ribs' },
              { from: 'Ground beef (skillet/hash)', to: 'Ground turkey, ground lamb, or Italian sausage removed from casing' },
              { from: 'Yukon Gold potatoes', to: 'Red potatoes (similar texture) or sweet potatoes for a different flavor profile' },
              { from: 'Beef broth', to: 'Chicken broth, vegetable broth, or water with 1 tsp Worcestershire sauce' },
              { from: 'Diced tomatoes', to: 'Tomato paste (2 tbsp) plus extra broth, or fire-roasted tomatoes for more depth' },
              { from: 'Fresh herbs', to: 'Dried herbs work fine — use ⅓ the amount of fresh' },
            ].map(({ from, to }, i) => (
              <div key={i} className="bg-slate-50 rounded-lg p-3">
                <span className="font-medium text-slate-700 text-sm">{from}:</span>
                <span className="text-slate-600 text-sm ml-1">{to}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Storage */}
        <section id="storage" className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Storage & Reheating</h2>
          <div className="space-y-3 text-sm text-slate-600">
            <p><span className="font-medium text-slate-700">Refrigerator:</span> All four recipes keep well for 3–4 days in an airtight container. Stew flavor actually improves overnight as flavors meld.</p>
            <p><span className="font-medium text-slate-700">Freezer:</span> Beef stew and skillet dishes freeze well for up to 3 months. Allow to cool completely before transferring to freezer-safe containers. Note: potatoes can become slightly grainy after freezing but remain palatable in stews and soups.</p>
            <p><span className="font-medium text-slate-700">Reheating:</span> Reheat stew and skillet dishes in a covered pot over medium-low heat, adding a splash of broth if needed. Sheet pan dishes reheat best in a 375°F oven for 10–12 minutes to restore some crispness. Hash reheats well in a hot skillet.</p>
            <p><span className="font-medium text-slate-700">Meal prep:</span> The stew and skillet both make excellent batch-cook meals. Make a double batch and freeze half for an easy future dinner.</p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              {
                q: 'What is the best cut of beef for stew?',
                a: 'Beef chuck is the best choice for stew. It has enough fat and connective tissue to become tender and flavorful during long, slow braising. Avoid lean cuts like sirloin for stews — they will become tough and dry.',
              },
              {
                q: 'How do I get crispy potatoes in a skillet?',
                a: 'The key is not to stir too often. Add potatoes in a single layer to a hot, oiled pan and let them sit undisturbed for 4–5 minutes to develop a golden crust before stirring. Avoid crowding the pan.',
              },
              {
                q: 'Can I use a slow cooker for the stew?',
                a: 'Yes. Brown the beef and sauté the aromatics on the stovetop first, then transfer everything to a slow cooker. Cook on low for 7–8 hours or high for 4–5 hours. Add potatoes and carrots halfway through to prevent them from getting mushy.',
              },
              {
                q: 'How do I store and reheat beef stew?',
                a: 'Beef stew keeps in the refrigerator for 3–4 days and freezes well for up to 3 months. Reheat gently on the stovetop over medium-low heat, adding a splash of broth if it has thickened. The flavor improves the next day as it sits.',
              },
            ].map(({ q, a }, i) => (
              <div key={i}>
                <h3 className="font-semibold text-slate-700 mb-1">{q}</h3>
                <p className="text-slate-600 text-sm">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* More Recipes */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">More Recipes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { to: '/recipes/beef-stew', label: 'Beef Stew' },
              { to: '/recipes/ground-beef-and-potatoes', label: 'Ground Beef and Potatoes' },
              { to: '/recipes/beef-and-vegetables', label: 'Beef and Vegetables' },
              { to: '/recipes/ground-beef-and-rice', label: 'Ground Beef and Rice' },
              { to: '/recipes/ground-beef-pasta', label: 'Ground Beef Pasta' },
              { to: '/recipes/chicken-and-potatoes', label: 'Chicken and Potatoes' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-700 hover:border-orange-300 hover:text-orange-600 transition-colors text-center"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} PantryPivot. All rights reserved.</p>
          <p className="mt-1">
            <Link to="/privacy" className="hover:text-orange-500 mr-4">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-orange-500">Terms of Use</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BeefAndPotatoes;
