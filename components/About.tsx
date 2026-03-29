import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  useEffect(() => {
    document.title = 'About PantryPivot — Cook What You Have';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'PantryPivot is a free AI recipe generator built for people who want to cook from what they already have — no grocery run required.');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://pantrypivot.com/about');
  }, []);

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

      <main className="max-w-2xl mx-auto px-4 py-12">
        <nav aria-label="breadcrumb" className="text-xs text-slate-400 mb-8">
          <ol className="flex items-center gap-1.5">
            <li><Link to="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
            <li className="text-slate-300">›</li>
            <li className="text-slate-600 font-medium">About</li>
          </ol>
        </nav>

        <div className="mb-10">
          <div className="mb-6 p-3 bg-orange-100 rounded-full inline-block">
            <span className="text-3xl">👨‍🍳</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-5 leading-tight">
            Cook what you have.
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            PantryPivot is a free AI recipe generator. You tell it what's in your kitchen — a few ingredients, dietary needs, how much time you have — and it builds a real recipe around that.
          </p>
        </div>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7">
            <h2 className="text-lg font-extrabold text-slate-900 mb-3">Why it exists</h2>
            <p>
              Most recipe sites work the other way around — you find a recipe and then go buy what it needs. That works fine if you're planning ahead, but it doesn't help much when it's 6pm and you have a chicken breast, half an onion, and some pantry staples.
            </p>
            <p className="mt-3">
              PantryPivot flips that. Start with what you have. Skip the grocery run.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7">
            <h2 className="text-lg font-extrabold text-slate-900 mb-3">How it works</h2>
            <p>
              Type in your ingredients (or snap a photo of your fridge), set any dietary preferences — kosher, dairy-free, gluten-free, vegetarian, and more — and PantryPivot generates a recipe that actually fits what you have and how you eat.
            </p>
            <p className="mt-3">
              It handles the culinary logic: substitutions, proportions, technique. You just cook.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7">
            <h2 className="text-lg font-extrabold text-slate-900 mb-3">It's free</h2>
            <p>
              No account required. No paywall. Generate as many recipes as you want.
            </p>
            <p className="mt-3">
              The recipe landing pages (like the ones in the <Link to="/ingredients" className="text-orange-600 hover:text-orange-700 font-semibold">Ingredients Index</Link>) are there for people who want specific combinations — chicken and rice, salmon and vegetables, that kind of thing. The generator handles everything else.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7">
            <h2 className="text-lg font-extrabold text-slate-900 mb-3">Who it's for</h2>
            <p>
              Anyone who cooks at home and doesn't always want to plan meals in advance. People with dietary restrictions who are tired of recipes that don't respect them. People who want to use what's in the pantry before it goes bad.
            </p>
            <p className="mt-3">
              If you keep a reasonably stocked kitchen, PantryPivot can usually find you something good to make with it.
            </p>
          </div>
        </div>

        <div className="mt-10 bg-orange-50 border border-orange-100 rounded-3xl p-8 text-center">
          <h2 className="text-xl font-extrabold text-slate-900 mb-2">Ready to cook?</h2>
          <p className="text-slate-600 mb-6">Tell us what you have and we'll handle the rest.</p>
          <Link
            to="/"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-md"
          >
            Open Recipe Generator
          </Link>
        </div>
      </main>

      <footer className="max-w-2xl mx-auto px-4 py-8 border-t border-slate-200 mt-12 text-center">
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed">
          Disclosure: PantryPivot participates in the Amazon Associates Program.<br />
          As an Amazon Associate, we may earn from qualifying purchases at no additional cost to you.
        </p>
      </footer>
    </div>
  );
};

export default About;
