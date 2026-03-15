import React from 'react';
import { Link } from 'react-router-dom';

const RECIPES = [
  { label: 'Air Fryer Chicken', href: '/recipes/air-fryer-chicken', emoji: '🍗' },
  { label: 'Crockpot Chicken', href: '/recipes/crockpot-chicken', emoji: '🍲' },
  { label: 'Salmon Recipes', href: '/recipes/salmon', emoji: '🐟' },
  { label: 'Ground Turkey', href: '/recipes/ground-turkey', emoji: '🦃' },
  { label: 'Chicken and Rice', href: '/recipes/chicken-and-rice', emoji: '🍚' },
  { label: 'Ground Beef Pasta', href: '/recipes/ground-beef-pasta', emoji: '🍝' },
  { label: 'Instant Pot Chicken', href: '/recipes/instant-pot-chicken', emoji: '⚡' },
];

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center">
          <a href="https://pantrypivot.com" className="text-xl font-bold text-orange-600 flex items-center gap-2">
            <img src="/apple-touch-icon.png" className="h-8 w-8 rounded-lg" alt="PantryPivot logo" /> PantryPivot
          </a>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-20 text-center w-full">
        <div className="text-6xl mb-6">🍳</div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Page Not Found</h1>
        <p className="text-lg text-slate-500 mb-10 max-w-md mx-auto">
          Looks like this page got left in the oven too long. Let's find you something good to make.
        </p>
        <a
          href="https://pantrypivot.com"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-md mb-16"
        >
          Back to PantryPivot →
        </a>

        <h2 className="text-xl font-extrabold text-slate-900 mb-6">Browse Recipe Ideas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {RECIPES.map(({ label, href, emoji }) => (
            <Link
              key={href}
              to={href}
              className="flex items-center gap-2 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all text-sm font-semibold text-slate-700 hover:text-orange-600"
            >
              <span className="text-xl">{emoji}</span>
              {label}
            </Link>
          ))}
        </div>
      </main>

      <footer className="max-w-4xl mx-auto px-4 py-8 border-t border-slate-200 mt-12 text-center w-full">
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed">
          Disclosure: PantryPivot participates in the Amazon Associates Program. <br />
          As an Amazon Associate, we may earn from qualifying purchases at no additional cost to you.
        </p>
      </footer>
    </div>
  );
};

export default NotFound;
