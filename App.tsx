
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { GenerationResponse, DetailedRecipe, SavedRecipe, AppSettings } from './types';
import { getSettings, saveRecipe, deleteRecipe } from './lib/storage';
import Wizard from './components/Wizard';
import RecipeCards from './components/RecipeCards';
import RecipeDetail from './components/RecipeDetail';
import Settings from './components/Settings';
import SavedRecipes from './components/SavedRecipes';
import AirFryerChicken from './components/recipes/AirFryerChicken';
import CrockpotChicken from './components/recipes/CrockpotChicken';
import SalmonRecipes from './components/recipes/SalmonRecipes';
import GroundTurkey from './components/recipes/GroundTurkey';
import ChickenAndRice from './components/recipes/ChickenAndRice';
import GroundBeefPasta from './components/recipes/GroundBeefPasta';
import InstantPotChicken from './components/recipes/InstantPotChicken';
import ReactGA from 'react-ga4';

type View = 'home' | 'results' | 'detail' | 'settings' | 'saved';

const LOADING_MESSAGES = [
  { emoji: "🔪", text: "Chopping the ingredients..." },
  { emoji: "🍳", text: "We're cooking something up..." },
  { emoji: "👨‍🍳", text: "Chef is getting creative..." },
  { emoji: "🌿", text: "Seasoning to perfection..." },
  { emoji: "🍽️", text: "Serving up something great..." },
  { emoji: "⭐", text: "Almost ready to plate..." },
];

const LoadingMessages: React.FC = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);
  const msg = LOADING_MESSAGES[index];
 return (
    <div className="text-center transition-all duration-500">
      <div className="text-5xl mb-4 animate-bounce">{msg.emoji}</div>
      <h3 className="text-2xl font-black text-slate-900 mb-2">{msg.text}</h3>
      <p className="text-slate-500 font-medium">Usually ready in under a minute.</p>
    </div>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  }, []);

  const [settings, setSettings] = useState<AppSettings>(getSettings());
  const [currentView, setCurrentView] = useState<View>('home');
  const [generationResults, setGenerationResults] = useState<GenerationResponse | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<DetailedRecipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleRecipeGenerated = (data: GenerationResponse) => {
    setGenerationResults(data);
    setCurrentView('results');
    setIsLoading(false);
    window.scrollTo(0, 0);
  };

  const handleSelectRecipe = (recipeId: string) => {
    const card = generationResults?.recipeCards?.find(c => c.id === recipeId);
    const recipe = generationResults?.selectedRecipe;
    if (recipe) {
      setSelectedRecipe({ ...recipe, name: card?.name ?? recipe.name });
      setCurrentView('detail');
    }
  };

  const handleSave = (recipe: DetailedRecipe) => {
    const newSaved: SavedRecipe = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      data: recipe
    };
    saveRecipe(newSaved);
    alert('Recipe saved to your collection!');
  };

  const homeView = (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => setCurrentView('home')}
            className="text-xl font-bold text-orange-600 flex items-center gap-2"
          >
            <img src="/apple-touch-icon.png" className="h-8 w-8 rounded-lg" alt="PantryPivot" /> PantryPivot
          </button>
          <div className="flex gap-4 items-center">
            <button onClick={() => setCurrentView('saved')} className="text-slate-600 hover:text-orange-600 transition-colors text-sm font-semibold">
              My Saves
            </button>
            <button onClick={() => setCurrentView('settings')} className="text-slate-600 hover:text-orange-600 transition-colors text-sm font-semibold flex items-center gap-1">
              <span>⚙️</span> Preferences
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
            <span>⚠️</span> {error}
          </div>
        )}

        {currentView === 'home' && (
          <div className="space-y-12">
            <div className="text-center py-6 flex flex-col items-center">
              <div className="mb-6 p-3 bg-orange-100 rounded-full inline-block animate-bounce">
                <span className="text-3xl">👨‍🍳</span>
              </div>
              <h1 className="text-5xl font-extrabold text-slate-900 mb-6 leading-tight max-w-2xl">
                Find recipes with the ingredients you already have.
              </h1>
              <p className="text-xl text-slate-500 mb-10 max-w-xl">
                Tell us what you want to make, or what you have on hand, and we'll handle the culinary logic, dietary rules, and smart customization. Use the optional settings below to fine-tune your result.
              </p>
            </div>

            <Wizard
              settings={settings}
              onComplete={handleRecipeGenerated}
              onLoading={(loading) => {
                setIsLoading(loading);
                if (!loading) setStreamingText('');
              }}
              onStream={(text) => setStreamingText(text)}
              onError={(err) => setError(err)}
              isLoading={isLoading}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full pt-12">
               <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:border-orange-200 transition-colors group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🥑</div>
                  <h3 className="font-bold text-lg mb-2">Smart Health</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">Anti-inflammatory, Keto, or Heart-Healthy? We nudge you toward better nutrition.</p>
               </div>
               <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🥗</div>
                  <h3 className="font-bold text-lg mb-2">Dietary & Preferences</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">Vegetarian, Vegan, Gluten-Free, Dairy-Free, or Kosher? We respect all your dietary standards.</p>
               </div>
               <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-colors group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📸</div>
                  <h3 className="font-bold text-lg mb-2">Photo Scan</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">Don't want to type? Snap a photo of your fridge and our AI will identify the ingredients.</p>
               </div>
            </div>

            {/* Recipe Ideas */}
            <div className="pt-4">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-6 text-center">Recipe Ideas</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {[
                  { label: 'Air Fryer Chicken', href: '/recipes/air-fryer-chicken', emoji: '🍗' },
                  { label: 'Crockpot Chicken', href: '/recipes/crockpot-chicken', emoji: '🍲' },
                  { label: 'Salmon Recipes', href: '/recipes/salmon', emoji: '🐟' },
                  { label: 'Ground Turkey', href: '/recipes/ground-turkey', emoji: '🦃' },
                  { label: 'Chicken and Rice', href: '/recipes/chicken-and-rice', emoji: '🍚' },
                  { label: 'Ground Beef Pasta', href: '/recipes/ground-beef-pasta', emoji: '🍝' },
                  { label: 'Instant Pot Chicken', href: '/recipes/instant-pot-chicken', emoji: '⚡' },
                ].map(({ label, href, emoji }) => (
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
            </div>
          </div>
        )}

        {currentView === 'results' && generationResults && (
          <RecipeCards
            cards={generationResults.recipeCards}
            onSelect={handleSelectRecipe}
            onStartOver={() => setCurrentView('home')}
          />
        )}

        {currentView === 'detail' && selectedRecipe && (
          <RecipeDetail
            recipe={selectedRecipe}
            onSave={() => handleSave(selectedRecipe)}
            onStartOver={() => setCurrentView('results')}
          />
        )}

        {currentView === 'settings' && (
          <Settings
            settings={settings}
            onSave={(newSettings) => {
              setSettings(newSettings);
              setCurrentView('home');
            }}
          />
        )}

        {currentView === 'saved' && (
          <SavedRecipes
            onSelect={(recipe) => {
              setSelectedRecipe(recipe);
              setCurrentView('detail');
            }}
            onDelete={deleteRecipe}
          />
        )}
      </main>

      {isLoading && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mb-6"></div>
            <LoadingMessages />
          </div>
        </div>
      )}
      <footer className="max-w-4xl mx-auto px-4 py-8 border-t border-slate-200 mt-12 text-center">
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed">
          Disclosure: PantryPivot participates in the Amazon Associates Program. <br />
          As an Amazon Associate, we may earn from qualifying purchases at no additional cost to you.
        </p>
      </footer>
    </div>
  );

  return (
    <Routes>
      <Route path="/recipes/air-fryer-chicken" element={<AirFryerChicken />} />
      <Route path="/recipes/crockpot-chicken" element={<CrockpotChicken />} />
      <Route path="/recipes/salmon" element={<SalmonRecipes />} />
      <Route path="/recipes/ground-turkey" element={<GroundTurkey />} />
      <Route path="/recipes/chicken-and-rice" element={<ChickenAndRice />} />
      <Route path="/recipes/ground-beef-pasta" element={<GroundBeefPasta />} />
      <Route path="/recipes/instant-pot-chicken" element={<InstantPotChicken />} />
      <Route path="*" element={homeView} />
    </Routes>
  );
};

export default App;
