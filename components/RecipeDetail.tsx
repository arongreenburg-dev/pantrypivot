
import React, { useState } from 'react';
import { DetailedRecipe } from '../types';
import { AFFILIATE_LINKS, KITCHEN_TOOL_LINKS } from '../constants';

interface RecipeDetailProps {
  recipe: DetailedRecipe;
  onSave: () => void;
  onStartOver: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onSave, onStartOver }) => {
  const [showGroceryList, setShowGroceryList] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const handleCopy = () => {
    const text = `
Recipe: ${recipe.name}
Servings: ${recipe.servings}
Time: ${recipe.timeMinutes} mins

Ingredients:
${recipe.ingredients.map(i => `- ${i.amount} ${i.item}`).join('\n')}

Steps:
${recipe.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}
    `;
    navigator.clipboard.writeText(text);
    alert('Recipe copied to clipboard!');
  };

  const handlePrint = () => {
    setIsPrinting(true);
    console.log('Print button clicked for:', recipe.name);
    // Use a small timeout to ensure the browser event loop handles the click first
    setTimeout(() => {
      try {
        window.print();
      } catch (error) {
        console.error('Print failed:', error);
        alert('Print dialog could not be opened. Please use your browser menu or Ctrl+P / Cmd+P.');
      } finally {
        setIsPrinting(false);
      }
    }, 250);
  };

  const trackClick = (label: string) => {
    console.log(`User clicked: ${label}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 print:p-0">
      {isPrinting && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex items-center justify-center print:hidden">
          <div className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl animate-pulse">
            Preparing Recipe for Print...
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 print:hidden">
        <button onClick={onStartOver} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <span className="text-2xl">←</span>
        </button>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">{recipe.name}</h1>
      </div>

      <div className="flex flex-wrap gap-4 items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100 print:shadow-none print:border-none">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👥</span>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Servings</p>
            <p className="text-sm font-bold">{recipe.servings} People</p>
          </div>
        </div>
        <div className="w-px h-8 bg-slate-100" />
        <div className="flex items-center gap-2">
          <span className="text-2xl">⏱️</span>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Ready In</p>
            <p className="text-sm font-bold">{recipe.timeMinutes} Mins</p>
          </div>
        </div>
        <div className="w-px h-8 bg-slate-100" />
        <div className="flex flex-1 justify-end gap-3 print:hidden">
          <button onClick={handlePrint} className="p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors" title="Print">🖨️</button>
          <button onClick={handleCopy} className="p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors" title="Copy">📋</button>
          <button onClick={onSave} className="p-3 bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-2xl font-bold px-6 transition-colors">Save Recipe</button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 print:hidden">
        <span className="text-xs text-slate-400 font-bold italic uppercase tracking-tighter">Ready to Cook?</span>
        <div className="flex flex-wrap justify-center gap-3">
          <a 
            href={AFFILIATE_LINKS.ORDER_INGREDIENTS} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => trackClick('Order Ingredients')}
            className="bg-blue-600 text-white text-sm font-bold py-3 px-8 rounded-2xl flex items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all transform hover:-translate-y-0.5"
          >
            🛒 Order Ingredients
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 print:shadow-none print:border-none">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-xl">🥗</span> Ingredients
            </h3>
            <ul className="space-y-3">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex justify-between items-start gap-4 border-b border-slate-50 pb-2 last:border-0">
                  <span className="text-slate-800 text-sm font-medium">{ing.item}</span>
                  <span className="text-orange-600 text-xs font-black shrink-0">{ing.amount}</span>
                </li>
              ))}
            </ul>
          </div>

          {recipe.nutritionEstimate && (
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg">
              <h3 className="text-sm font-bold mb-4 text-slate-400 uppercase tracking-widest">Est. Nutrition</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-2xl font-black">{recipe.nutritionEstimate.calories}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Calories</p>
                </div>
                <div>
                  <p className="text-2xl font-black">{recipe.nutritionEstimate.protein_g}g</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Protein</p>
                </div>
                <div>
                  <p className="text-2xl font-black">{recipe.nutritionEstimate.carbs_g}g</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Carbs</p>
                </div>
                <div>
                  <p className="text-2xl font-black">{recipe.nutritionEstimate.fat_g}g</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Fat</p>
                </div>
              </div>
              <p className="text-[8px] text-slate-500 italic uppercase leading-tight">{recipe.nutritionEstimate.disclaimer}</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 print:shadow-none print:border-none">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-2xl">👨‍🍳</span> Preparation Steps
            </h3>
            <div className="space-y-8">
              {recipe.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-orange-100">
                    {i + 1}
                  </span>
                  <p className="text-slate-700 leading-relaxed font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
              <h4 className="font-bold text-blue-800 mb-2 text-sm flex items-center gap-2">
                <span>🔄</span> Clever Substitutions
              </h4>
              <ul className="space-y-2">
                {recipe.substitutions.map((s, i) => <li key={i} className="text-xs text-blue-700 font-medium">• {s}</li>)}
              </ul>
            </div>
            <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100">
              <h4 className="font-bold text-purple-800 mb-2 text-sm flex items-center gap-2">
                <span>🍱</span> Leftover Storage
              </h4>
              <ul className="space-y-2">
                {recipe.leftovers.map((l, i) => <li key={i} className="text-xs text-purple-700 font-medium">• {l}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Next Steps Section */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-6 print:hidden">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-3xl">🚀</span> Next Steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => { handlePrint(); trackClick('Print Recipe'); }}
            className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all text-left"
          >
            <span className="text-2xl">🖨️</span>
            <div>
              <p className="font-bold">Print Recipe</p>
              <p className="text-xs text-slate-400">Keep a paper copy in the kitchen</p>
            </div>
          </button>
          <button 
            onClick={() => { setShowGroceryList(true); trackClick('Generate Grocery List'); }}
            className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all text-left"
          >
            <span className="text-2xl">📝</span>
            <div>
              <p className="font-bold">Generate Grocery List</p>
              <p className="text-xs text-slate-400">Extract ingredients for shopping</p>
            </div>
          </button>
          <a 
            href={AFFILIATE_LINKS.ORDER_INGREDIENTS}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick('Order Ingredients on Amazon')}
            className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all text-left"
          >
            <span className="text-2xl">📦</span>
            <div>
              <p className="font-bold">Order on Amazon</p>
              <p className="text-xs text-slate-400">Get ingredients delivered</p>
            </div>
          </a>
          <a 
            href={AFFILIATE_LINKS.PANTRY_ITEMS}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick('Stock Your Pantry')}
            className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all text-left"
          >
            <span className="text-2xl">🥫</span>
            <div>
              <p className="font-bold">Stock Your Pantry</p>
              <p className="text-xs text-slate-400">Essential staples & ingredients</p>
            </div>
          </a>
          <div className="col-span-full pt-4 border-t border-white/10">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recommended Kitchen Tools</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(KITCHEN_TOOL_LINKS).map(([name, link]) => (
                <a 
                  key={name}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick(`Tool: ${name}`)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] font-bold transition-all"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grocery List Modal */}
      {showGroceryList && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 print:relative print:bg-white print:p-0 print:inset-auto">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-300 print:shadow-none print:p-0">
            <div className="flex justify-between items-center print:hidden">
              <h3 className="text-2xl font-black text-slate-900">Grocery List</h3>
              <button onClick={() => setShowGroceryList(false)} className="text-slate-400 hover:text-slate-600 text-2xl">✕</button>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-slate-500 font-medium">Ingredients for {recipe.name}:</p>
              <ul className="space-y-2 border-y border-slate-100 py-4">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                    <span className="w-5 h-5 border-2 border-slate-200 rounded flex-shrink-0" />
                    <span>{ing.amount} {ing.item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 print:hidden">
              <button 
                onClick={() => { handlePrint(); trackClick('Print Grocery List'); }}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
              >
                Print Grocery List
              </button>
              <a 
                href={AFFILIATE_LINKS.AMAZON_FRESH}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick('Order on Amazon Fresh')}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-center hover:bg-blue-700 transition-all"
              >
                Order on Amazon Fresh
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
