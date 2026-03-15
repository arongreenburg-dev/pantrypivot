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
  const recipe = recipes[activeTab];
  useEffect(() => {
    document.title = 'Salmon Recipes | PantryPivot';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Easy pareve salmon recipes — baked, sheet pan, air fryer, and salmon with sweet potato. Kosher-friendly weeknight dinners.');
    return () => {
      document.title = 'Recipes for Ingredients You Have | AI Recipe Generator';
      if (meta) meta.setAttribute('content', 'Stop staring at the fridge. Find recipes for the ingredients you already have. AI generates a custom recipe in under 30 seconds.');
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-orange-600 flex items-center gap-2">
            <img src="/apple-touch-icon.png" className="h-8 w-8 rounded-lg" alt="PantryPivot" /> PantryPivot
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <span className="inline-block bg-blue-100 text-blue-700 font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
            Pareve
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Salmon Recipes</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Flavorful, pareve salmon dishes — no meat, no dairy. Fresh, simple, and ready in under 35 minutes.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap justify-center mb-8">
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
          </div>
        </div>

        {/* More Recipes */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">More Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/recipes/air-fryer-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍗</span> Air Fryer Chicken
            </Link>
            <Link to="/recipes/ground-turkey" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🦃</span> Ground Turkey
            </Link>
            <Link to="/recipes/ground-beef-pasta" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍝</span> Ground Beef Pasta
            </Link>
          </div>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto px-4 py-8 border-t border-slate-200 mt-12 text-center">
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed">
          Disclosure: PantryPivot participates in the Amazon Associates Program. <br />
          As an Amazon Associate, we may earn from qualifying purchases at no additional cost to you.
        </p>
      </footer>
    </div>
  );
};

export default SalmonRecipes;
