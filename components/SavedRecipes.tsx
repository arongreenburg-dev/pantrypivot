
import React, { useState, useEffect } from 'react';
import { SavedRecipe, DetailedRecipe } from '../types';
import { getSavedRecipes } from '../lib/storage';

interface SavedRecipesProps {
  onSelect: (recipe: DetailedRecipe) => void;
  onDelete: (id: string) => void;
}

const SavedRecipes: React.FC<SavedRecipesProps> = ({ onSelect, onDelete }) => {
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);

  useEffect(() => {
    setRecipes(getSavedRecipes());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this recipe?')) {
      onDelete(id);
      setRecipes(prev => prev.filter(r => r.id !== id));
    }
  };

  if (recipes.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="text-6xl mb-6 opacity-30">📚</div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">No Saved Recipes Yet</h3>
        <p className="text-slate-500">Your future favorites will appear here once you save them.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <h2 className="text-3xl font-black text-slate-900">Your Recipe Collection</h2>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1 italic">
          Saved locally to this device
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id}
            onClick={() => onSelect(recipe.data)}
            className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <button onClick={(e) => handleDelete(recipe.id, e)} className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all text-xs font-black">DELETE</button>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
               <span className="text-3xl">🍲</span>
               <div>
                  <h3 className="text-xl font-bold text-slate-800 leading-tight">{recipe.data.name}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{new Date(recipe.timestamp).toLocaleDateString()}</p>
               </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-slate-50 px-3 py-1 rounded-full text-[10px] font-bold text-slate-500">⏱️ {recipe.data.timeMinutes}m</div>
              <div className="bg-slate-50 px-3 py-1 rounded-full text-[10px] font-bold text-slate-500">👥 {recipe.data.servings} Servings</div>
              <div className="bg-slate-50 px-3 py-1 rounded-full text-[10px] font-bold text-slate-500">🥕 {recipe.data.ingredients.length} Ingredients</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedRecipes;
