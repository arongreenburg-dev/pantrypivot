import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const KosherHub: React.FC = () => {
  useEffect(() => {
    document.title = 'Kosher Recipes — PantryPivot';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Kosher recipes organized by category: meat, pareve, and dairy-free. From brisket to shakshuka — all made from ingredients you already have.');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://pantrypivot.com/kosher-recipes');
  }, []);

  const meatRecipes = [
    { label: 'Passover Recipes', href: '/recipes/passover', emoji: '🍷', desc: 'Brisket, matzo ball soup, roasted chicken — kosher for Passover.' },
    { label: 'Chicken Soup', href: '/recipes/chicken-soup', emoji: '🍜', desc: 'Classic chicken broth with vegetables. Meat, no dairy.' },
    { label: 'Roast Chicken', href: '/recipes/roast-chicken', emoji: '🍗', desc: 'Herb-roasted whole chicken. Naturally meat, no dairy needed.' },
    { label: 'Air Fryer Chicken', href: '/recipes/air-fryer-chicken', emoji: '🍗', desc: 'Crispy chicken thighs or breasts with no dairy ingredients.' },
    { label: 'Baked Chicken Thighs', href: '/recipes/baked-chicken-thighs', emoji: '🍗', desc: 'Oven-baked thighs with olive oil and spices. Fully meat.' },
    { label: 'Crockpot Chicken', href: '/recipes/crockpot-chicken', emoji: '🍲', desc: 'Slow-cooked chicken with vegetables. Skip any cream variants.' },
    { label: 'Chicken and Rice', href: '/recipes/chicken-and-rice', emoji: '🍚', desc: 'One-pot chicken and rice — naturally dairy-free.' },
    { label: 'Beef Stew', href: '/recipes/beef-stew', emoji: '🥩', desc: 'Braised beef with root vegetables and broth. Meat, no dairy.' },
    { label: 'Ground Beef and Rice', href: '/recipes/ground-beef-and-rice', emoji: '🍚', desc: 'Simple ground beef with rice. Meat, no dairy required.' },
    { label: 'Beef and Vegetables', href: '/recipes/beef-and-vegetables', emoji: '🥩', desc: 'Sautéed beef with seasonal vegetables. All meat.' },
    { label: 'Ground Turkey', href: '/recipes/ground-turkey', emoji: '🦃', desc: 'Versatile ground turkey recipes. Meat, all dairy-free.' },
    { label: 'Turkey and Vegetables', href: '/recipes/turkey-and-vegetables', emoji: '🦃', desc: 'Lean turkey with roasted vegetables.' },
    { label: 'Dairy-Free Marry Me Chicken', href: '/recipes/dairy-free-marry-me-chicken', emoji: '🍋', desc: 'Pareve version of the viral recipe — all the flavor, no dairy.' },
    { label: 'Chicken Stir Fry', href: '/recipes/chicken-stir-fry', emoji: '🥢', desc: 'Quick stir fry with chicken and vegetables. No dairy.' },
    { label: 'One Pan Chicken', href: '/recipes/one-pan-chicken', emoji: '🍗', desc: 'Easy weeknight chicken with vegetables. Dairy-free by default.' },
  ];

  const pareveRecipes = [
    { label: 'Shakshuka', href: '/recipes/shakshuka', emoji: '🍳', desc: 'Eggs poached in spiced tomato sauce. Classic pareve dish.' },
    { label: 'Eggs and Vegetables', href: '/recipes/eggs-and-vegetables', emoji: '🥚', desc: 'Scrambled or baked eggs with seasonal vegetables. Pareve.' },
    { label: 'Lentil Soup', href: '/recipes/lentil-soup', emoji: '🍲', desc: 'Hearty lentil and vegetable soup. 100% pareve.' },
    { label: 'Salmon Recipes', href: '/recipes/salmon', emoji: '🐟', desc: 'Salmon is pareve in kosher law — enjoy with meat or dairy meals.' },
    { label: 'Salmon and Rice', href: '/recipes/salmon-and-rice', emoji: '🐟', desc: 'Salmon with rice — pareve and incredibly versatile.' },
    { label: 'Salmon and Vegetables', href: '/recipes/salmon-and-vegetables', emoji: '🐟', desc: 'Roasted salmon with seasonal vegetables. Pareve.' },
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
            <li className="text-slate-600 font-medium">Kosher Recipes</li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <div className="inline-block bg-indigo-50 text-indigo-700 font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">✡ Kosher Kitchen</div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
            Kosher Recipes from Your Pantry
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            All the recipes here are compatible with a kosher kitchen — organized by category so you know exactly what you're working with.
          </p>
        </div>

        {/* Kosher Primer */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 mb-10">
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">The Three Kosher Categories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-red-50 rounded-2xl p-5">
              <div className="text-2xl mb-2">🥩</div>
              <h3 className="font-black text-slate-900 mb-1">Meat (Fleishig)</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Beef, lamb, chicken, turkey. Must come from a kosher animal, slaughtered according to halacha. Cannot be eaten with or cooked with dairy.</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-5">
              <div className="text-2xl mb-2">🐟</div>
              <h3 className="font-black text-slate-900 mb-1">Pareve</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Fish, eggs, fruits, vegetables, grains, legumes. Neutral — can be eaten with either meat or dairy meals. Fish with fins and scales is kosher.</p>
            </div>
            <div className="bg-yellow-50 rounded-2xl p-5">
              <div className="text-2xl mb-2">🥛</div>
              <h3 className="font-black text-slate-900 mb-1">Dairy (Milchig)</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Milk, cheese, butter, cream. Must come from a kosher animal. Cannot be mixed with meat — many families wait 1–6 hours between meat and dairy meals.</p>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-5 leading-relaxed">
            <strong className="text-slate-700">Key rule:</strong> Never mix meat and dairy in the same dish or meal. Pareve foods are flexible and can accompany either. All recipes below are either meat-based (no dairy) or pareve. Verify ingredients — always check that your packaged goods carry a reliable kosher certification (OU, OK, Star-K, Kof-K, etc.).
          </p>
        </div>

        {/* Meat Recipes */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">🥩</span>
            <h2 className="text-2xl font-extrabold text-slate-900">Meat Dishes</h2>
            <span className="text-xs font-black text-red-600 uppercase tracking-wide bg-red-50 px-3 py-1 rounded-full">Fleishig — No Dairy</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {meatRecipes.map(({ label, href, emoji, desc }) => (
              <Link
                key={href}
                to={href}
                className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all"
              >
                <span className="text-2xl flex-shrink-0 mt-0.5">{emoji}</span>
                <div>
                  <div className="font-bold text-slate-800 hover:text-orange-600 transition-colors">{label}</div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Pareve Recipes */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">🐟</span>
            <h2 className="text-2xl font-extrabold text-slate-900">Pareve Dishes</h2>
            <span className="text-xs font-black text-blue-600 uppercase tracking-wide bg-blue-50 px-3 py-1 rounded-full">Fish, Eggs & Veg</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pareveRecipes.map(({ label, href, emoji, desc }) => (
              <Link
                key={href}
                to={href}
                className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all"
              >
                <span className="text-2xl flex-shrink-0 mt-0.5">{emoji}</span>
                <div>
                  <div className="font-bold text-slate-800 hover:text-orange-600 transition-colors">{label}</div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-orange-50 border border-orange-100 rounded-3xl p-8 text-center">
          <div className="text-3xl mb-3">👨‍🍳</div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Need a Custom Kosher Recipe?</h2>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Tell the PantryPivot generator what you have on hand and set your dietary preference to Kosher — it'll generate a recipe that fits your kitchen.
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

export default KosherHub;
