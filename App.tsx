
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { GenerationResponse, DetailedRecipe, SavedRecipe, AppSettings } from './types';
import { getSettings, saveRecipe, deleteRecipe } from './lib/storage';
import Wizard from './components/Wizard';
import RecipeCards from './components/RecipeCards';
import RecipeDetail from './components/RecipeDetail';
import Settings from './components/Settings';
import SavedRecipes from './components/SavedRecipes';
import NotFound from './components/NotFound';

const AirFryerChicken = lazy(() => import('./components/recipes/AirFryerChicken'));
const CrockpotChicken = lazy(() => import('./components/recipes/CrockpotChicken'));
const SalmonRecipes = lazy(() => import('./components/recipes/SalmonRecipes'));
const GroundTurkey = lazy(() => import('./components/recipes/GroundTurkey'));
const ChickenAndRice = lazy(() => import('./components/recipes/ChickenAndRice'));
const GroundBeefPasta = lazy(() => import('./components/recipes/GroundBeefPasta'));
const InstantPotChicken = lazy(() => import('./components/recipes/InstantPotChicken'));
const BeefStew = lazy(() => import('./components/recipes/BeefStew'));
const RoastChicken = lazy(() => import('./components/recipes/RoastChicken'));
const ChickenSoup = lazy(() => import('./components/recipes/ChickenSoup'));
const Shakshuka = lazy(() => import('./components/recipes/Shakshuka'));
const GroundTurkeySweetPotato = lazy(() => import('./components/recipes/GroundTurkeySweetPotato'));
const PareveMarryMeChicken = lazy(() => import('./components/recipes/PareveMarryMeChicken'));
const PassoverRecipes = lazy(() => import('./components/recipes/PassoverRecipes'));
const PassoverSederPlanner = lazy(() => import('./components/recipes/PassoverSederPlanner'));
const PostPassoverLeftovers = lazy(() => import('./components/recipes/PostPassoverLeftovers'));
const EasterRecipes = lazy(() => import('./components/recipes/EasterRecipes'));
const ChickenAndBroccoli = lazy(() => import('./components/recipes/ChickenAndBroccoli'));
const ChickenAndPotatoes = lazy(() => import('./components/recipes/ChickenAndPotatoes'));
const GroundBeefAndPotatoes = lazy(() => import('./components/recipes/GroundBeefAndPotatoes'));
const ChickenAndVegetables = lazy(() => import('./components/recipes/ChickenAndVegetables'));
const SalmonAndRice = lazy(() => import('./components/recipes/SalmonAndRice'));
const TurkeyAndVegetables = lazy(() => import('./components/recipes/TurkeyAndVegetables'));
const ChickenAndMushrooms = lazy(() => import('./components/recipes/ChickenAndMushrooms'));
const BeefAndVegetables = lazy(() => import('./components/recipes/BeefAndVegetables'));
const ChickenAndSweetPotato = lazy(() => import('./components/recipes/ChickenAndSweetPotato'));
const EggsAndVegetables = lazy(() => import('./components/recipes/EggsAndVegetables'));
const LentilSoup = lazy(() => import('./components/recipes/LentilSoup'));
const ChickenStirFry = lazy(() => import('./components/recipes/ChickenStirFry'));
const GroundBeefAndRice = lazy(() => import('./components/recipes/GroundBeefAndRice'));
const BakedChickenThighs = lazy(() => import('./components/recipes/BakedChickenThighs'));
const OnePanChicken = lazy(() => import('./components/recipes/OnePanChicken'));
const ChickenAndPasta = lazy(() => import('./components/recipes/ChickenAndPasta'));
const SalmonAndVegetables = lazy(() => import('./components/recipes/SalmonAndVegetables'));
const GroundTurkeyAndRice = lazy(() => import('./components/recipes/GroundTurkeyAndRice'));
const BeefAndPotatoes = lazy(() => import('./components/recipes/BeefAndPotatoes'));
const ChickenAndSpinach = lazy(() => import('./components/recipes/ChickenAndSpinach'));
const KosherHub = lazy(() => import('./components/KosherHub'));
const IngredientsIndex = lazy(() => import('./components/IngredientsIndex'));
const About = lazy(() => import('./components/About'));
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

  const _now = new Date();
  const _md = _now.getMonth() * 100 + _now.getDate(); // 0-indexed month * 100 + day
  const showEasterGrid     = _md >= 215 && _md <= 325; // Mar 15 – Apr 25

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
                  { label: 'Beef Stew', href: '/recipes/beef-stew', emoji: '🥩' },
                  { label: 'Roast Chicken', href: '/recipes/roast-chicken', emoji: '🍗' },
                  { label: 'Chicken Soup', href: '/recipes/chicken-soup', emoji: '🍜' },
                  { label: 'Shakshuka', href: '/recipes/shakshuka', emoji: '🍳' },
                  { label: 'Turkey & Sweet Potato', href: '/recipes/ground-turkey-sweet-potato', emoji: '🍠' },
                  { label: 'Dairy-Free Marry Me Chicken', href: '/recipes/dairy-free-marry-me-chicken', emoji: '🍋' },
                  { label: 'Passover Recipes', href: '/recipes/passover', emoji: '🍷' },
                  { label: 'Passover Seder Planner', href: '/recipes/passover-seder-planner', emoji: '📋' },
                  ...(showEasterGrid ? [{ label: 'Easter Dinner', href: '/recipes/easter', emoji: '🐣' }] : []),
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
          <>
            {generationResults?.kosherForPassover && (
              <div className="mb-4 text-center">
                <span className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold px-4 py-2 rounded-full text-sm">
                  🍷 Kosher for Passover
                </span>
              </div>
            )}
            <RecipeDetail
              recipe={selectedRecipe}
              onSave={() => handleSave(selectedRecipe)}
              onStartOver={() => setCurrentView('results')}
            />
          </>
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
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-slate-50"><div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div></div>}>
      <Routes>
        <Route path="/" element={homeView} />
        <Route path="/recipes/air-fryer-chicken" element={<AirFryerChicken />} />
        <Route path="/recipes/crockpot-chicken" element={<CrockpotChicken />} />
        <Route path="/recipes/salmon" element={<SalmonRecipes />} />
        <Route path="/recipes/ground-turkey" element={<GroundTurkey />} />
        <Route path="/recipes/chicken-and-rice" element={<ChickenAndRice />} />
        <Route path="/recipes/ground-beef-pasta" element={<GroundBeefPasta />} />
        <Route path="/recipes/instant-pot-chicken" element={<InstantPotChicken />} />
        <Route path="/recipes/beef-stew" element={<BeefStew />} />
        <Route path="/recipes/roast-chicken" element={<RoastChicken />} />
        <Route path="/recipes/chicken-soup" element={<ChickenSoup />} />
        <Route path="/recipes/shakshuka" element={<Shakshuka />} />
        <Route path="/recipes/ground-turkey-sweet-potato" element={<GroundTurkeySweetPotato />} />
        <Route path="/recipes/dairy-free-marry-me-chicken" element={<PareveMarryMeChicken />} />
        <Route path="/recipes/passover" element={<PassoverRecipes />} />
        <Route path="/recipes/passover-seder-planner" element={<PassoverSederPlanner />} />
        <Route path="/recipes/post-passover-leftovers" element={<PostPassoverLeftovers />} />
        <Route path="/recipes/easter" element={<EasterRecipes />} />
        <Route path="/recipes/chicken-and-broccoli" element={<ChickenAndBroccoli />} />
        <Route path="/recipes/chicken-and-potatoes" element={<ChickenAndPotatoes />} />
        <Route path="/recipes/ground-beef-and-potatoes" element={<GroundBeefAndPotatoes />} />
        <Route path="/recipes/chicken-and-vegetables" element={<ChickenAndVegetables />} />
        <Route path="/recipes/salmon-and-rice" element={<SalmonAndRice />} />
        <Route path="/recipes/turkey-and-vegetables" element={<TurkeyAndVegetables />} />
        <Route path="/recipes/chicken-and-mushrooms" element={<ChickenAndMushrooms />} />
        <Route path="/recipes/beef-and-vegetables" element={<BeefAndVegetables />} />
        <Route path="/recipes/chicken-and-sweet-potato" element={<ChickenAndSweetPotato />} />
        <Route path="/recipes/eggs-and-vegetables" element={<EggsAndVegetables />} />
        <Route path="/recipes/lentil-soup" element={<LentilSoup />} />
        <Route path="/recipes/chicken-stir-fry" element={<ChickenStirFry />} />
        <Route path="/recipes/ground-beef-and-rice" element={<GroundBeefAndRice />} />
        <Route path="/recipes/baked-chicken-thighs" element={<BakedChickenThighs />} />
        <Route path="/recipes/one-pan-chicken" element={<OnePanChicken />} />
        <Route path="/recipes/chicken-and-pasta" element={<ChickenAndPasta />} />
        <Route path="/recipes/salmon-and-vegetables" element={<SalmonAndVegetables />} />
        <Route path="/recipes/ground-turkey-and-rice" element={<GroundTurkeyAndRice />} />
        <Route path="/recipes/beef-and-potatoes" element={<BeefAndPotatoes />} />
        <Route path="/recipes/chicken-and-spinach" element={<ChickenAndSpinach />} />
        <Route path="/kosher-recipes" element={<KosherHub />} />
        <Route path="/ingredients" element={<IngredientsIndex />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
