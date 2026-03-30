import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare const window: Window & { gtag: (...args: unknown[]) => void };

type Tab = 'sheetpan' | 'stirfry' | 'mediterranean' | 'soup';

interface Recipe {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

const recipes: Record<Tab, Recipe> = {
  sheetpan: {
    title: 'Sheet Pan Salmon and Vegetables',
    description: 'Flaky salmon fillets roasted on one pan with colorful bell peppers, zucchini, and asparagus — a complete dinner ready in 30 minutes.',
    time: '30 min',
    servings: '4 servings',
    ingredients: [
      '4 salmon fillets (6 oz each)',
      '1 zucchini, sliced into half-moons',
      '1 red bell pepper, sliced',
      '1 yellow bell pepper, sliced',
      '1 bunch asparagus, trimmed',
      '1 cup cherry tomatoes',
      '3 tbsp olive oil, divided',
      '4 cloves garlic, minced',
      '1 tsp smoked paprika',
      '1 tsp dried oregano',
      '½ tsp salt',
      '¼ tsp black pepper',
      '2 tbsp fresh lemon juice',
      '2 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'Preheat oven to 425°F. Line a large rimmed baking sheet with parchment paper.',
      'Toss zucchini, bell peppers, asparagus, and cherry tomatoes with 2 tbsp olive oil, half the garlic, oregano, salt, and pepper. Spread in a single layer on the sheet pan.',
      'Roast vegetables 10 minutes while you prepare the salmon.',
      'Pat salmon fillets dry with paper towels. Mix remaining 1 tbsp olive oil, remaining garlic, smoked paprika, salt, and pepper. Rub all over salmon.',
      'Push vegetables to the edges of the pan. Nestle salmon fillets in the center.',
      'Return to oven and roast 12–15 minutes, until salmon flakes easily with a fork and vegetables are tender with lightly charred edges.',
      'Drizzle lemon juice over everything. Garnish with fresh parsley.',
      'Serve directly from the pan — no extra dishes needed.',
    ],
  },
  stirfry: {
    title: 'Salmon Vegetable Stir-Fry',
    description: 'Tender salmon pieces and crisp vegetables stir-fried in a savory garlic-ginger sauce — better than takeout and ready in 20 minutes.',
    time: '20 min',
    servings: '4 servings',
    ingredients: [
      '1½ lbs salmon fillet, skin removed, cut into 1-inch cubes',
      '2 cups broccoli florets',
      '1 red bell pepper, sliced',
      '1 cup snap peas',
      '1 medium carrot, julienned',
      '3 cloves garlic, minced',
      '1 tbsp fresh ginger, grated',
      '3 tbsp soy sauce (or tamari for gluten-free)',
      '1 tbsp sesame oil',
      '1 tbsp rice vinegar',
      '1 tsp honey',
      '1 tbsp cornstarch',
      '2 tbsp vegetable oil',
      '2 green onions, sliced',
      '1 tsp sesame seeds',
    ],
    instructions: [
      'In a small bowl, whisk together soy sauce, sesame oil, rice vinegar, honey, and cornstarch. Set sauce aside.',
      'Heat 1 tbsp vegetable oil in a large wok or skillet over high heat until shimmering.',
      'Add salmon cubes in a single layer. Cook undisturbed 2 minutes, then gently turn. Cook another 1–2 minutes until just cooked through. Remove to a plate.',
      'Add remaining 1 tbsp oil to the wok. Add broccoli and carrots; stir-fry 2–3 minutes.',
      'Add bell pepper, snap peas, garlic, and ginger. Stir-fry 2 minutes more until vegetables are crisp-tender.',
      'Pour sauce over vegetables. Stir until sauce thickens and coats everything, about 1 minute.',
      'Gently fold salmon back in. Toss once or twice — salmon breaks easily so be gentle.',
      'Top with green onions and sesame seeds. Serve over steamed rice.',
    ],
  },
  mediterranean: {
    title: 'Mediterranean Baked Salmon and Vegetables',
    description: 'Salmon baked over a bed of olives, artichokes, sun-dried tomatoes, and zucchini with fresh herbs and lemon — vibrant and effortlessly elegant.',
    time: '35 min',
    servings: '4 servings',
    ingredients: [
      '4 salmon fillets (6 oz each)',
      '1 zucchini, sliced',
      '1 cup cherry tomatoes, halved',
      '½ cup Kalamata olives, pitted',
      '1 can (14 oz) artichoke hearts, drained and quartered',
      '¼ cup sun-dried tomatoes, chopped',
      '4 cloves garlic, minced',
      '3 tbsp olive oil',
      '1 tsp dried oregano',
      '1 tsp dried thyme',
      '½ tsp salt',
      '¼ tsp black pepper',
      '1 lemon, sliced into rounds',
      '¼ cup fresh basil leaves',
    ],
    instructions: [
      'Preheat oven to 400°F. Oil a large baking dish.',
      'Combine zucchini, cherry tomatoes, olives, artichoke hearts, sun-dried tomatoes, and garlic in the baking dish. Drizzle with 2 tbsp olive oil; season with oregano, thyme, salt, and pepper. Toss to coat.',
      'Roast vegetables 15 minutes until starting to soften.',
      'Pat salmon dry. Season with salt, pepper, and a drizzle of remaining 1 tbsp olive oil.',
      'Nestle salmon fillets into the vegetable mixture. Lay lemon slices on top of each fillet.',
      'Bake 14–16 minutes until salmon is opaque and flakes easily with a fork.',
      'Scatter fresh basil over the top before serving.',
      'Serve directly from the baking dish with crusty bread or rice to soak up the savory juices.',
    ],
  },
  soup: {
    title: 'Salmon Vegetable Soup',
    description: 'A light, brothy soup with tender salmon chunks, potato, corn, and leafy greens — nourishing, quick, and deeply satisfying.',
    time: '35 min',
    servings: '4 servings',
    ingredients: [
      '1½ lbs salmon fillet, skin removed, cut into 1-inch pieces',
      '2 medium Yukon Gold potatoes, diced',
      '2 medium carrots, sliced',
      '2 stalks celery, sliced',
      '1 cup frozen corn',
      '2 cups fresh spinach',
      '1 medium onion, diced',
      '4 cloves garlic, minced',
      '4 cups fish stock or chicken broth',
      '1 cup water',
      '2 tbsp olive oil',
      '1 tsp dried dill',
      '½ tsp salt',
      '¼ tsp black pepper',
      '2 tbsp fresh lemon juice',
      '2 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat. Add onion and celery; cook 4–5 minutes until softened.',
      'Add garlic; cook 1 minute until fragrant.',
      'Pour in broth and water. Add potatoes, carrots, dill, salt, and pepper.',
      'Bring to a boil, then reduce heat to medium-low. Simmer 12–15 minutes until potatoes and carrots are just tender.',
      'Add corn; simmer 2 minutes.',
      'Gently add salmon pieces. Simmer 5–6 minutes until salmon is cooked through and flakes easily — do not boil vigorously or salmon will break apart.',
      'Stir in spinach; cook 1–2 minutes until wilted.',
      'Add lemon juice. Taste and adjust seasoning. Ladle into bowls and garnish with fresh parsley.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'sheetpan', label: 'Sheet Pan' },
  { key: 'stirfry', label: 'Stir-Fry' },
  { key: 'mediterranean', label: 'Mediterranean' },
  { key: 'soup', label: 'Soup' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const SalmonAndVegetables: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('sheetpan');
  const [copied, setCopied] = useState(false);

  const recipe = recipes[activeTab];

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Salmon and Vegetables Recipes (Sheet Pan, Stir-Fry, Mediterranean) | PantryPivot';

    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const createdDesc = !metaDesc;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    const prevDesc = metaDesc.content;
    metaDesc.content = 'Easy salmon and vegetables recipes including sheet pan, stir-fry, Mediterranean baked, and hearty soup. Healthy, dairy-free, and ready in 30 minutes.';

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const createdCanon = !canonical;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    const prevCanon = canonical.href;
    canonical.href = 'https://pantrypivot.com/recipes/salmon-and-vegetables';

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
      keywords: 'salmon and vegetables, salmon recipe, healthy salmon, sheet pan salmon',
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
          name: 'How do I know when salmon is fully cooked?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Salmon is done when it flakes easily with a fork and has turned from translucent to opaque. An internal temperature of 145°F is the USDA recommendation. Many cooks prefer 125–130°F for medium doneness.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I use frozen salmon for these recipes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Thaw frozen salmon overnight in the refrigerator or in a sealed bag under cold running water for 30–45 minutes. Pat dry before cooking to ensure proper searing or roasting.',
          },
        },
        {
          '@type': 'Question',
          name: 'What vegetables go well with salmon?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Asparagus, zucchini, bell peppers, spinach, broccoli, and cherry tomatoes all pair beautifully with salmon. Heartier vegetables like potatoes and carrots work well in soups and braises.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I store leftover salmon?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Store cooked salmon in an airtight container in the refrigerator for up to 2 days. Reheat gently in a covered skillet over low heat with a splash of water, or enjoy cold over salad.',
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
    navigator.clipboard.writeText('https://pantrypivot.com/recipes/salmon-and-vegetables').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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
          <span className="text-slate-700">Salmon and Vegetables</span>
        </nav>

        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-800">Salmon and Vegetables Recipes</h1>
            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">🐟 Fish</span>
          </div>
          <p className="text-slate-600 text-lg">Four easy ways to cook salmon with vegetables — sheet pan, stir-fry, Mediterranean baked, and hearty soup.</p>
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

        <h2 className="text-2xl font-bold text-slate-800 mb-3">What Can I Make With Salmon and Vegetables?</h2>
        <p className="text-sm text-slate-500 max-w-2xl mb-8 leading-relaxed">This page contains 4 kosher pareve salmon and vegetable recipes — sheet pan, stir-fry, Mediterranean, and soup. All recipes are dairy-free and pareve. Ingredients are simple pantry staples with no specialty items required.</p>

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
              onClick={() => window.gtag('event', 'click', { event_category: 'affiliate', event_label: 'amazon-fresh-salmon-vegetables' })}
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
              'Pat salmon completely dry before cooking — moisture is the enemy of a good sear or crispy skin.',
              'Bring salmon to room temperature 15 minutes before cooking for more even heat penetration.',
              'For sheet pan meals, cut all vegetables to a similar size so they cook at the same rate.',
              'Do not overcrowd the pan — give salmon and vegetables space so they roast, not steam.',
              'Check salmon thickness; thinner fillets (under 1 inch) cook in 10–12 minutes at 425°F, thicker ones need 14–16 minutes.',
              'Add delicate greens like spinach in the last 1–2 minutes of cooking — they wilt quickly and can become mushy if overdone.',
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
              { from: 'Salmon', to: 'Trout, arctic char, or cod — adjust cook time for thinner fillets' },
              { from: 'Soy sauce', to: 'Tamari (gluten-free), coconut aminos, or fish sauce (less, to taste)' },
              { from: 'Zucchini', to: 'Yellow squash or eggplant — slightly longer roast time for eggplant' },
              { from: 'Asparagus', to: 'Green beans, broccolini, or snap peas' },
              { from: 'Cherry tomatoes', to: 'Diced plum tomatoes or sun-dried tomatoes (use less — more intense)' },
              { from: 'Fresh ginger', to: '½ tsp ground ginger per 1 tbsp fresh' },
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
            <p><span className="font-medium text-slate-700">Refrigerator:</span> Store cooked salmon and vegetables in an airtight container for up to 2 days. Salmon deteriorates faster than chicken or beef — use promptly.</p>
            <p><span className="font-medium text-slate-700">Freezer:</span> Not recommended for most of these preparations — the texture of cooked salmon suffers significantly after freezing. Soup freezes reasonably well for up to 1 month.</p>
            <p><span className="font-medium text-slate-700">Reheating:</span> Warm gently in a covered skillet over low heat with a splash of broth or water. Avoid the microwave if possible — it tends to dry out and over-cook salmon further. Leftover salmon is excellent cold over salad greens.</p>
            <p><span className="font-medium text-slate-700">Meal prep:</span> Prep and chop vegetables 1–2 days ahead; store in the fridge. Cook salmon fresh for best results.</p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              {
                q: 'How do I know when salmon is fully cooked?',
                a: 'Salmon is done when it flakes easily with a fork and has turned from translucent to opaque. An internal temperature of 145°F is the USDA recommendation. Many cooks prefer 125–130°F for medium doneness.',
              },
              {
                q: 'Can I use frozen salmon for these recipes?',
                a: 'Yes. Thaw frozen salmon overnight in the refrigerator or in a sealed bag under cold running water for 30–45 minutes. Pat dry before cooking to ensure proper searing or roasting.',
              },
              {
                q: 'What vegetables go well with salmon?',
                a: 'Asparagus, zucchini, bell peppers, spinach, broccoli, and cherry tomatoes all pair beautifully with salmon. Heartier vegetables like potatoes and carrots work well in soups and braises.',
              },
              {
                q: 'How do I store leftover salmon?',
                a: 'Store cooked salmon in an airtight container in the refrigerator for up to 2 days. Reheat gently in a covered skillet over low heat with a splash of water, or enjoy cold over salad.',
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
              { to: '/recipes/salmon-recipes', label: 'Salmon Recipes' },
              { to: '/recipes/salmon-and-rice', label: 'Salmon and Rice' },
              { to: '/recipes/eggs-and-vegetables', label: 'Eggs and Vegetables' },
              { to: '/recipes/lentil-soup', label: 'Lentil Soup' },
              { to: '/recipes/shakshuka', label: 'Shakshuka' },
              { to: '/recipes/chicken-and-vegetables', label: 'Chicken and Vegetables' },
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

export default SalmonAndVegetables;
