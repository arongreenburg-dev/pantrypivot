import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PostPassoverLeftovers: React.FC = () => {
  useEffect(() => {
    const PAGE_TITLE = 'What to Do With Passover Leftovers | PantryPivot';
    const PAGE_DESC = 'A practical guide to cooking with leftover matzah, potato starch, almond flour, eggs, and more after Passover ends.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/post-passover-leftovers';
    document.title = PAGE_TITLE;
    const update = (sel: string, attr: string, val: string): string => {
      const el = document.querySelector(sel);
      const prev = el ? (el.getAttribute(attr) ?? '') : '';
      if (el) el.setAttribute(attr, val);
      return prev;
    };
    const prevDesc    = update('meta[name="description"]',       'content', PAGE_DESC);
    const prevOgTitle = update('meta[property="og:title"]',      'content', PAGE_TITLE);
    const prevOgDesc  = update('meta[property="og:description"]','content', PAGE_DESC);
    const prevOgUrl   = update('meta[property="og:url"]',        'content', PAGE_URL);
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
    script.id = 'post-passover-article-schema';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "What to Cook With Your Passover Leftovers",
      "description": "A practical guide to cooking with leftover matzah, potato starch, almond flour, eggs, and more after Passover ends.",
      "url": "https://pantrypivot.com/recipes/post-passover-leftovers",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "datePublished": "2026-04-09",
      "dateModified": "2026-04-09",
      "mainEntityOfPage": { "@type": "WebPage", "@id": "https://pantrypivot.com/recipes/post-passover-leftovers" }
    });
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById('post-passover-article-schema');
      if (el) el.remove();
    };
  }, []);

  const topLeftovers = [
    { rank: 1, item: 'Matzah', emoji: '🫓' },
    { rank: 2, item: 'Matzah meal', emoji: '🌾' },
    { rank: 3, item: 'Potato starch', emoji: '🥔' },
    { rank: 4, item: 'Macaroons', emoji: '🍪' },
    { rank: 5, item: 'Eggs', emoji: '🥚' },
    { rank: 6, item: 'Potatoes', emoji: '🥔' },
    { rank: 7, item: 'Almond flour', emoji: '🌰' },
    { rank: 8, item: 'Chocolate / baking chocolate', emoji: '🍫' },
    { rank: 9, item: 'Nuts (almonds, walnuts, pecans)', emoji: '🥜' },
    { rank: 10, item: 'Apples', emoji: '🍎' },
  ];

  const pantryCategories = [
    {
      name: 'Matzah & Matzah Products',
      emoji: '🫓',
      color: 'bg-amber-50 border-amber-200',
      accent: 'text-amber-700',
      dot: 'bg-amber-400',
      items: ['Matzah', 'Egg matzah', 'Matzah meal', 'Cake meal', 'Potato starch', 'Matzah farfel'],
    },
    {
      name: 'Pantry Items',
      emoji: '🍫',
      color: 'bg-orange-50 border-orange-200',
      accent: 'text-orange-700',
      dot: 'bg-orange-400',
      items: ['Macaroons', 'Chocolate bars', 'Baking chocolate', 'Nuts', 'Dried fruit', 'Honey', 'Jam and preserves'],
    },
    {
      name: 'Baking Ingredients',
      emoji: '🌰',
      color: 'bg-yellow-50 border-yellow-200',
      accent: 'text-yellow-700',
      dot: 'bg-yellow-400',
      items: ['Almond flour', 'Coconut flakes', 'Cocoa powder', 'Chocolate chips', 'Vanilla sugar', 'Powdered sugar'],
    },
    {
      name: 'Produce',
      emoji: '🍎',
      color: 'bg-green-50 border-green-200',
      accent: 'text-green-700',
      dot: 'bg-green-400',
      items: ['Potatoes', 'Sweet potatoes', 'Onions', 'Carrots', 'Apples', 'Fresh herbs (parsley, dill)'],
    },
    {
      name: 'Fridge Items',
      emoji: '🥚',
      color: 'bg-blue-50 border-blue-200',
      accent: 'text-blue-700',
      dot: 'bg-blue-400',
      items: ['Eggs', 'Horseradish', 'Charoset', 'Romaine', 'Cooked chicken or brisket'],
    },
    {
      name: 'Oils and Condiments',
      emoji: '🫙',
      color: 'bg-slate-50 border-slate-200',
      accent: 'text-slate-700',
      dot: 'bg-slate-400',
      items: ['Olive oil', 'Avocado oil', 'Duck sauce', 'Passover mayonnaise', 'Mustard'],
    },
  ];

  const whatToMake = [
    { ingredient: 'Matzah', emoji: '🫓', ideas: 'Matzah brei, lasagna layers, homemade breadcrumbs' },
    { ingredient: 'Matzah meal', emoji: '🌾', ideas: 'Coating for chicken or fish, pancakes' },
    { ingredient: 'Potato starch', emoji: '🥔', ideas: 'Crispy roasted potatoes, fried chicken coating' },
    { ingredient: 'Almond flour', emoji: '🌰', ideas: 'Cookies, pancakes, cake base' },
    { ingredient: 'Chocolate', emoji: '🍫', ideas: 'Chocolate bark, truffles, brownies' },
    { ingredient: 'Eggs', emoji: '🥚', ideas: 'Frittata, egg salad, shakshuka' },
    { ingredient: 'Apples + nuts', emoji: '🍎', ideas: 'Baked crumble, charoset-style granola' },
    { ingredient: 'Potatoes', emoji: '🥔', ideas: 'Soup, roasted wedges, latkes (now that you can again)' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-orange-600 flex items-center gap-2">
            <img src="/apple-touch-icon.png" className="h-8 w-8 rounded-lg" alt="PantryPivot" loading="lazy" /> PantryPivot
          </a>
          <nav className="flex gap-4 text-sm font-semibold text-slate-600">
            <a href="/" className="hover:text-orange-600 transition-colors">Recipe Generator</a>
            <Link to="/kosher-recipes" className="hover:text-orange-600 transition-colors">Kosher Recipes</Link>
          </nav>
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
            <li><Link to="/recipes/passover" className="hover:text-orange-500 transition-colors">Passover</Link></li>
            <li className="text-slate-300">›</li>
            <li className="text-slate-600 font-medium">Post-Passover Leftovers</li>
          </ol>
        </nav>

        {/* Jump nav */}
        <nav className="mb-8 overflow-x-auto">
          <div className="flex gap-2 text-sm font-semibold text-slate-500 whitespace-nowrap pb-1">
            <span className="text-slate-400 text-xs uppercase tracking-wider self-center">Jump to:</span>
            <a href="#top-10" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-orange-300 hover:text-orange-600 transition-colors">Top 10</a>
            <a href="#by-category" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-orange-300 hover:text-orange-600 transition-colors">Full Pantry</a>
            <a href="#what-to-make" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-orange-300 hover:text-orange-600 transition-colors">What to Cook</a>
            <a href="#generator" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-orange-300 hover:text-orange-600 transition-colors">Custom Recipe</a>
          </div>
        </nav>

        {/* Hero */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
            What to Cook With Your Passover Leftovers
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Passover ends the same way every year — a pantry full of matzah, potato starch, almond flour, and macaroons. Here's a practical guide to using up the most common surplus ingredients before they sit forgotten until next April.
          </p>
          <p className="text-sm text-slate-400 mt-4">
            Planning for next year?{' '}
            <Link to="/recipes/passover-seder-planner" className="text-orange-600 hover:underline font-semibold">
              See our Passover Seder Planner.
            </Link>
          </p>
        </div>

        {/* TOP 10 SECTION */}
        <section id="top-10" className="mb-12">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">The Most Common Passover Leftovers</h2>
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <ol className="divide-y divide-slate-50">
              {topLeftovers.map(({ rank, item, emoji }) => (
                <li key={rank} className="flex items-center gap-4 px-6 py-4">
                  <span className="text-2xl font-black text-slate-200 w-8 text-right flex-shrink-0">{rank}</span>
                  <span className="text-2xl flex-shrink-0">{emoji}</span>
                  <span className="font-semibold text-slate-800">
                    {item}
                    {rank === 1 && (
                      <span className="ml-3">
                        — store in{' '}
                        <a
                          href="https://amzn.to/4ca99QI"
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="text-orange-600 hover:underline"
                          onClick={() => (window as any).gtag?.('event', 'affiliate_click', { link_url: 'https://amzn.to/4ca99QI', link_text: 'airtight_containers_matzah' })}
                        >
                          airtight containers
                        </a>
                        {' '}to keep it fresh
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* BY CATEGORY SECTION */}
        <section id="by-category" className="mb-12">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Full Leftover Pantry Breakdown</h2>
          <div className="space-y-4">
            {pantryCategories.map((cat) => (
              <div key={cat.name} className={`bg-white border ${cat.color} rounded-3xl shadow-sm overflow-hidden`}>
                <div className={`${cat.color} px-6 py-3 border-b`}>
                  <h3 className={`font-black text-sm uppercase tracking-wide ${cat.accent}`}>
                    <span className="mr-2">{cat.emoji}</span>{cat.name}
                  </h3>
                </div>
                <ul className="px-6 py-4 flex flex-wrap gap-x-6 gap-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-700 text-sm">
                      <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${cat.dot}`} />
                      {cat.name === 'Baking Ingredients' && item === 'Almond flour' ? (
                        <>
                          <a
                            href="https://amzn.to/3OxEmp7"
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="text-orange-600 hover:underline font-medium"
                            onClick={() => (window as any).gtag?.('event', 'affiliate_click', { link_url: 'https://amzn.to/3OxEmp7', link_text: 'bulk_almond_flour' })}
                          >
                            Almond flour
                          </a>
                          {' '}(buy in bulk bags next year to save)
                        </>
                      ) : (
                        item
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* WHAT TO MAKE SECTION */}
        <section id="what-to-make" className="mb-12">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">What to Actually Cook This Week</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whatToMake.map(({ ingredient, emoji, ideas }) => (
              <div key={ingredient} className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-orange-200 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{emoji}</span>
                  <h3 className="font-bold text-slate-900">{ingredient}</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  <span className="text-slate-400">→ </span>{ideas}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800 leading-relaxed">
            <strong>Tip:</strong> Matzah makes an excellent lasagna substitute — layer it with sauce and filling just like pasta sheets. Soak briefly in warm water first to soften.
          </div>
        </section>

        {/* CTA SECTION */}
        <section id="generator" className="bg-orange-600 rounded-3xl p-8 mb-12 text-center text-white">
          <h2 className="text-2xl font-black mb-2">Have a specific combination to work with?</h2>
          <p className="text-orange-100 mb-6 text-sm leading-relaxed">
            Enter whatever is left in your kitchen and get a custom recipe.
          </p>
          <a
            href="/"
            className="inline-block bg-white text-orange-600 hover:bg-orange-50 font-bold py-3 px-8 rounded-2xl transition-all shadow-md"
          >
            Generate a Recipe →
          </a>
        </section>

        {/* More Links */}
        <div className="mt-10">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">More Passover & Kosher Recipes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Link to="/recipes/passover" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍷</span> Passover Recipes
            </Link>
            <Link to="/recipes/passover-seder-planner" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">📋</span> Seder Planner
            </Link>
            <Link to="/recipes/shakshuka" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍳</span> Shakshuka
            </Link>
            <Link to="/recipes/eggs-and-vegetables" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🥚</span> Eggs & Vegetables
            </Link>
            <Link to="/recipes/roast-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍗</span> Roast Chicken
            </Link>
            <Link to="/kosher-recipes" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">✡️</span> Kosher Recipes
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
          <Link to="/recipes/passover" className="text-slate-500 hover:text-orange-600 transition-colors">Passover Recipes</Link>
          <Link to="/recipes/passover-seder-planner" className="text-slate-500 hover:text-orange-600 transition-colors">Seder Planner</Link>
          <Link to="/recipes/shakshuka" className="text-slate-500 hover:text-orange-600 transition-colors">Shakshuka</Link>
          <Link to="/recipes/roast-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Roast Chicken</Link>
          <Link to="/kosher-recipes" className="text-slate-500 hover:text-orange-600 transition-colors">Kosher Recipes</Link>
        </div>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed text-center">
          Disclosure: PantryPivot participates in the Amazon Associates Program. <br />
          As an Amazon Associate, we may earn from qualifying purchases at no additional cost to you.
        </p>
      </footer>
    </div>
  );
};

export default PostPassoverLeftovers;
