import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const IngredientsIndex: React.FC = () => {
  useEffect(() => {
    document.title = 'Recipe Index by Ingredient — PantryPivot';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Browse all PantryPivot recipe pages by protein: chicken, beef, turkey, salmon, eggs and vegetarian.');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://pantrypivot.com/ingredients');
  }, []);

  const categories = [
    {
      name: 'Chicken',
      emoji: '🍗',
      color: 'orange',
      bgClass: 'bg-orange-50',
      borderClass: 'border-orange-100',
      badgeClass: 'bg-orange-100 text-orange-700',
      recipes: [
        { label: 'Air Fryer Chicken', href: '/recipes/air-fryer-chicken', desc: 'Crispy air fryer chicken — thighs, breasts, or wings.' },
        { label: 'Crockpot Chicken', href: '/recipes/crockpot-chicken', desc: 'Slow-cooker chicken for hands-off weeknight dinners.' },
        { label: 'Instant Pot Chicken', href: '/recipes/instant-pot-chicken', desc: 'Fast, juicy chicken from a pressure cooker.' },
        { label: 'Roast Chicken', href: '/recipes/roast-chicken', desc: 'Classic whole roasted chicken with herbs.' },
        { label: 'Chicken Soup', href: '/recipes/chicken-soup', desc: 'Homemade chicken broth and vegetable soup.' },
        { label: 'Chicken and Rice', href: '/recipes/chicken-and-rice', desc: 'One-pot chicken and rice — simple and satisfying.' },
        { label: 'Chicken and Broccoli', href: '/recipes/chicken-and-broccoli', desc: 'Quick stir-fry or baked chicken with broccoli.' },
        { label: 'Chicken and Potatoes', href: '/recipes/chicken-and-potatoes', desc: 'Oven-baked chicken and potatoes, one pan.' },
        { label: 'Chicken and Vegetables', href: '/recipes/chicken-and-vegetables', desc: 'Flexible chicken with whatever veg you have.' },
        { label: 'Chicken and Mushrooms', href: '/recipes/chicken-and-mushrooms', desc: 'Savory chicken in a rich mushroom sauce.' },
        { label: 'Chicken and Sweet Potato', href: '/recipes/chicken-and-sweet-potato', desc: 'Sweet and savory chicken with roasted sweet potato.' },
        { label: 'Chicken Stir Fry', href: '/recipes/chicken-stir-fry', desc: 'Fast stir fry with chicken, veggies, and sauce.' },
        { label: 'Baked Chicken Thighs', href: '/recipes/baked-chicken-thighs', desc: 'Juicy, crispy-skinned baked chicken thighs.' },
        { label: 'One Pan Chicken', href: '/recipes/one-pan-chicken', desc: 'Everything on one pan — minimal cleanup.' },
        { label: 'Chicken and Pasta', href: '/recipes/chicken-and-pasta', desc: 'Chicken pasta dishes for any night of the week.' },
        { label: 'Chicken and Spinach', href: '/recipes/chicken-and-spinach', desc: 'Chicken with spinach — light and nutrient-dense.' },
        { label: 'Dairy-Free Marry Me Chicken', href: '/recipes/dairy-free-marry-me-chicken', desc: 'The viral recipe, made pareve with no dairy.' },
      ],
    },
    {
      name: 'Beef',
      emoji: '🥩',
      color: 'red',
      bgClass: 'bg-red-50',
      borderClass: 'border-red-100',
      badgeClass: 'bg-red-100 text-red-700',
      recipes: [
        { label: 'Ground Beef Pasta', href: '/recipes/ground-beef-pasta', desc: 'Ground beef with pasta — from Bolognese to beefy mac.' },
        { label: 'Beef Stew', href: '/recipes/beef-stew', desc: 'Slow-braised beef with root vegetables and rich broth.' },
        { label: 'Ground Beef and Potatoes', href: '/recipes/ground-beef-and-potatoes', desc: 'Skillet ground beef with potatoes — hearty and fast.' },
        { label: 'Beef and Vegetables', href: '/recipes/beef-and-vegetables', desc: 'Sautéed beef with seasonal vegetables.' },
        { label: 'Ground Beef and Rice', href: '/recipes/ground-beef-and-rice', desc: 'Ground beef over rice — simple weeknight staple.' },
        { label: 'Beef and Potatoes', href: '/recipes/beef-and-potatoes', desc: 'Classic beef and potato combinations — roasted or stewed.' },
      ],
    },
    {
      name: 'Turkey',
      emoji: '🦃',
      color: 'amber',
      bgClass: 'bg-amber-50',
      borderClass: 'border-amber-100',
      badgeClass: 'bg-amber-100 text-amber-700',
      recipes: [
        { label: 'Ground Turkey', href: '/recipes/ground-turkey', desc: 'Versatile ground turkey recipes for any occasion.' },
        { label: 'Ground Turkey and Sweet Potato', href: '/recipes/ground-turkey-sweet-potato', desc: 'Lean turkey paired with sweet potato — fall favorite.' },
        { label: 'Turkey and Vegetables', href: '/recipes/turkey-and-vegetables', desc: 'Ground or sliced turkey with roasted or sautéed veg.' },
        { label: 'Ground Turkey and Rice', href: '/recipes/ground-turkey-and-rice', desc: 'Ground turkey over rice — light and easy to meal prep.' },
      ],
    },
    {
      name: 'Salmon',
      emoji: '🐟',
      color: 'blue',
      bgClass: 'bg-blue-50',
      borderClass: 'border-blue-100',
      badgeClass: 'bg-blue-100 text-blue-700',
      recipes: [
        { label: 'Salmon Recipes', href: '/recipes/salmon', desc: 'Pan-seared, baked, and glazed salmon — multiple methods.' },
        { label: 'Salmon and Rice', href: '/recipes/salmon-and-rice', desc: 'Salmon over rice — a clean, complete meal.' },
        { label: 'Salmon and Vegetables', href: '/recipes/salmon-and-vegetables', desc: 'Sheet pan salmon with roasted vegetables.' },
      ],
    },
    {
      name: 'Eggs & Vegetarian',
      emoji: '🥚',
      color: 'emerald',
      bgClass: 'bg-emerald-50',
      borderClass: 'border-emerald-100',
      badgeClass: 'bg-emerald-100 text-emerald-700',
      recipes: [
        { label: 'Shakshuka', href: '/recipes/shakshuka', desc: 'Eggs poached in spiced tomato sauce — the perfect any-meal dish.' },
        { label: 'Eggs and Vegetables', href: '/recipes/eggs-and-vegetables', desc: 'Scrambled, baked, or frittata-style eggs with veg.' },
        { label: 'Lentil Soup', href: '/recipes/lentil-soup', desc: 'Hearty red or green lentil soup — naturally vegan.' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-orange-600 flex items-center gap-2">
            <img src="/apple-touch-icon.png" className="h-8 w-8 rounded-lg" alt="PantryPivot" />
            PantryPivot
          </Link>
          <Link to="/" className="text-slate-600 hover:text-orange-600 transition-colors text-sm font-semibold">
            ← Recipe Generator
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <nav aria-label="breadcrumb" className="text-xs text-slate-400 mb-8">
          <ol className="flex items-center gap-1.5">
            <li><Link to="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
            <li className="text-slate-300">›</li>
            <li className="text-slate-600 font-medium">Ingredients</li>
          </ol>
        </nav>

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
            Browse Recipes by Ingredient
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            36 recipe pages organized by what's in your fridge. Click any category to find step-by-step recipes for the protein you have on hand.
          </p>
        </div>

        {/* Jump links */}
        <nav className="mb-10 overflow-x-auto">
          <div className="flex gap-2 text-sm font-semibold text-slate-500 whitespace-nowrap pb-1">
            {categories.map(cat => (
              <a
                key={cat.name}
                href={`#${cat.name.toLowerCase().replace(/[^a-z]/g, '-')}`}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-orange-300 hover:text-orange-600 transition-colors"
              >
                {cat.emoji} {cat.name}
              </a>
            ))}
          </div>
        </nav>

        <div className="space-y-12">
          {categories.map(cat => (
            <section key={cat.name} id={cat.name.toLowerCase().replace(/[^a-z]/g, '-')}>
              <div className={`flex items-center gap-3 mb-5 p-5 ${cat.bgClass} rounded-2xl border ${cat.borderClass}`}>
                <span className="text-3xl">{cat.emoji}</span>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">{cat.name}</h2>
                  <span className={`text-xs font-black uppercase tracking-wide px-2 py-0.5 rounded-full ${cat.badgeClass}`}>
                    {cat.recipes.length} recipe {cat.recipes.length === 1 ? 'page' : 'pages'}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cat.recipes.map(({ label, href, desc }) => (
                  <Link
                    key={href}
                    to={href}
                    className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all"
                  >
                    <span className="text-xl flex-shrink-0 mt-0.5">{cat.emoji}</span>
                    <div>
                      <div className="font-bold text-slate-800 hover:text-orange-600 transition-colors text-sm">{label}</div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-orange-50 border border-orange-100 rounded-3xl p-8 text-center">
          <div className="text-3xl mb-3">🧠</div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Don't See Your Ingredient?</h2>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            The recipe generator can work with anything in your pantry — just type what you have and it'll figure out the rest.
          </p>
          <Link
            to="/"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-md"
          >
            Open Recipe Generator
          </Link>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto px-4 py-8 border-t border-slate-200 mt-12 text-center">
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed">
          Disclosure: PantryPivot participates in the Amazon Associates Program.<br />
          As an Amazon Associate, we may earn from qualifying purchases at no additional cost to you.
        </p>
      </footer>
    </div>
  );
};

export default IngredientsIndex;
