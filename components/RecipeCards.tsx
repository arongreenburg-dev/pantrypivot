
import React from 'react';
import { RecipeCard } from '../types';

interface RecipeCardsProps {
  cards: RecipeCard[];
  onSelect: (id: string) => void;
  onStartOver: () => void;
}

const RecipeCards: React.FC<RecipeCardsProps> = ({ cards, onSelect, onStartOver }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-900">Recommended for You</h2>
        <button onClick={onStartOver} className="text-orange-600 font-bold text-sm hover:underline transition-all">Adjust Preferences</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                card.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
                card.difficulty === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
              }`}>
                {card.difficulty}
              </span>
              <span className="text-slate-400 text-xs font-bold">⏱️ {card.timeMinutes}m</span>
            </div>

            <h3 className="text-xl font-extrabold text-slate-800 mb-2 leading-tight">{card.name}</h3>
            <p className="text-slate-600 text-sm mb-4 italic leading-relaxed">"{card.rationale}"</p>
            
            <div className="mt-auto pt-4 space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Key Ingredients</span>
                <div className="flex flex-wrap gap-1">
                  {card.ingredientsUsed.slice(0, 3).map(ing => (
                    <span key={ing} className="bg-slate-50 text-slate-600 px-2 py-0.5 rounded text-[10px] font-medium">{ing}</span>
                  ))}
                  {card.ingredientsUsed.length > 3 && <span className="text-[10px] text-slate-400">+{card.ingredientsUsed.length - 3} more</span>}
                </div>
              </div>

              {card.extraNeeded.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-orange-400 uppercase">Suggested Extras</span>
                  <p className="text-[10px] text-slate-500 truncate">{card.extraNeeded.join(', ')}</p>
                </div>
              )}

              <button 
                onClick={() => onSelect(card.id)}
                className="w-full bg-slate-900 text-white font-bold py-3 rounded-2xl hover:bg-orange-600 transition-colors mt-4 shadow-lg shadow-slate-200"
              >
                View Full Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCards;
