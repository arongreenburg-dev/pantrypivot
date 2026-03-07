
import React, { useState, useEffect } from 'react';
import { WizardState, GenerationResponse, AppSettings, ConvenienceFilter, UnitSystem, MealIdea } from '../types';
import { MEAL_TYPES, EFFORT_LEVELS, SPICE_LEVELS, HOUSEHOLD_TYPES, RELIGIOUS_DIETS, HEALTH_DIETS, CUISINE_REGIONS, COMMON_EQUIPMENT, KOSHER_TYPES, PANTRY_STAPLES, COMMON_ALLERGENS, STAPLE_LINKS, CONVENIENCE_FILTERS, AFFILIATE_LINKS, UNIT_SYSTEMS } from '../constants';
import { generateRecipes, generateIdeas } from '../lib/recipeModel';
import VoiceInput from './VoiceInput';

interface WizardProps {
  settings: AppSettings;
  onComplete: (data: GenerationResponse) => void;
  onLoading: (loading: boolean) => void;
  onStream?: (text: string) => void;
  onError: (error: string) => void;
  isLoading: boolean;
}

const MEAT_KEYWORDS = ['beef', 'chicken', 'steak', 'lamb', 'meat', 'turkey', 'veal', 'ground beef', 'ribs', 'bacon', 'ham', 'salmon', 'tuna', 'fish'];
const VEGGIE_KEYWORDS = ['broccoli', 'carrot', 'spinach', 'kale', 'pepper', 'onion', 'garlic', 'potato', 'vegetable', 'greens', 'zucchini', 'tomato', 'cabbage', 'lettuce', 'cucumber', 'cauliflower', 'asparagus', 'beans'];

const Wizard: React.FC<WizardProps> = ({ settings, onComplete, onLoading, onStream, onError, isLoading }) => {
  const [showStaples, setShowStaples] = useState(false);
  const [formData, setFormData] = useState<WizardState>({
    userPrompt: '',
    mealType: 'Main Dish',
    servings: 2,
    leftovers: false,
    timeAvailable: 30,
    effortLevel: 'Medium',
    spiceLevel: settings.defaultSpice,
    cuisines: settings.defaultCuisines,
    household: settings.defaultHousehold,
    allergies: [],
    customAllergies: '',
    dietaryRestrictions: settings.defaultDietaryRestrictions,
    convenienceFilters: [],
    customHealthGoals: '',
    customReligious: '',
    pantryStaples: [...PANTRY_STAPLES],
    equipment: [...COMMON_EQUIPMENT],
    avoidList: [],
    isKosher: settings.isKosher,
    kosherType: [],
    skillLevel: settings.skillLevel,
    unitSystem: settings.unitSystem,
    favoriteChef: settings.favoriteChef
  });

  const updateForm = (key: keyof WizardState, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleList = (key: 'cuisines' | 'dietaryRestrictions' | 'equipment' | 'allergies' | 'pantryStaples' | 'convenienceFilters' | 'kosherType', item: string) => {
    let list = [...(formData[key] as string[])];
    const index = list.indexOf(item);
    
    if (key === 'kosherType') {
      // For Kosher Type, we treat it as a single selection or toggle
      if (index > -1) {
        list = [];
      } else {
        list = [item];
      }
      updateForm(key, list);
      return;
    }

    if (index > -1) {
      list.splice(index, 1);
      if (item === 'Kosher' && key === 'dietaryRestrictions') {
        updateForm('isKosher', false);
        updateForm('kosherType', []);
      }
    } else {
      list.push(item);
      if (item === 'Kosher' && key === 'dietaryRestrictions') updateForm('isKosher', true);
    }
    updateForm(key, list);
  };

  const handleSelectAllStaples = () => {
    if (formData.pantryStaples.length === PANTRY_STAPLES.length) {
      updateForm('pantryStaples', []);
    } else {
      updateForm('pantryStaples', [...PANTRY_STAPLES]);
    }
  };

  const handleSelectAllEquipment = () => {
    if (formData.equipment.length === COMMON_EQUIPMENT.length) {
      updateForm('equipment', []);
    } else {
      updateForm('equipment', [...COMMON_EQUIPMENT]);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateForm('ingredientPhoto', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (overridePrompt?: string) => {
    onLoading(true);
    try {
      const dataToSubmit = overridePrompt ? { ...formData, userPrompt: overridePrompt } : formData;
      const results = await generateRecipes(dataToSubmit, onStream);
      onComplete(results);
    } catch (err: any) {
      onError(err.message || 'Something went wrong');
    } finally {
      onLoading(false);
    }
  };

  const hasMeatInput = MEAT_KEYWORDS.some(k => formData.userPrompt.toLowerCase().includes(k));
  const hasVeggieInput = VEGGIE_KEYWORDS.some(k => formData.userPrompt.toLowerCase().includes(k) || formData.pantryStaples.some(s => s.toLowerCase().includes(k)));
  const showVeggieNudge = hasMeatInput && !hasVeggieInput && formData.userPrompt.trim().length > 3;

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 max-w-2xl mx-auto">
      <div className="p-8">
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900">What's on your mind or in your pantry?</h2>
              <div className="relative">
                <textarea 
                  value={formData.userPrompt}
                  onChange={(e) => updateForm('userPrompt', e.target.value)}
                  placeholder="e.g. 'eggplant parm but baked', '2 chicken breasts and broccoli', 'need a shakshuka recipe'..."
                  className="w-full h-40 px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-orange-500 focus:ring-0 outline-none transition-all text-lg font-medium resize-none shadow-inner bg-slate-50/50"
                />
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <label className="flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl cursor-pointer transition-colors text-[10px] font-bold border border-slate-200 shadow-sm">
                    <span>📷</span> {formData.ingredientPhoto ? 'Photo Added!' : 'Snap Ingredients'}
                    <input type="file" accept="image/*" capture="environment" multiple onChange={handlePhotoUpload} className="hidden" />
```

**That's it. Two things added:**

| What was added | What it does |
|---|---|
| `capture="environment"` | Opens the camera directly on phones |
| `multiple` | Lets the user select more than one photo |

---

### Commit message:
```
fix: photo upload now supports camera and multiple photos
                  </label>
                  <VoiceInput 
                    onTranscript={(text) => updateForm('userPrompt', formData.userPrompt ? `${formData.userPrompt} ${text}` : text)} 
                  />
                </div>
              </div>
              {formData.ingredientPhoto && (
                <div className="flex justify-end">
                  <button onClick={() => updateForm('ingredientPhoto', undefined)} className="text-red-500 text-[10px] font-bold underline">Remove photo</button>
                </div>
              )}
              
              <button 
                onClick={() => handleSubmit()}
                disabled={isLoading}
                className="w-full bg-orange-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-100 hover:bg-orange-700 transition-all transform hover:scale-[1.01] disabled:opacity-50 text-base"
              >
                {isLoading ? 'Cooking up ideas...' : 'Generate My Recipe'}
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Optional Refinements</span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-500">Dietary & Health</p>
                <div className="flex flex-wrap gap-2">
                  {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Low-Carb', 'Kosher'].map(d => (
                    <button 
                      key={d}
                      onClick={() => toggleList('dietaryRestrictions', d)}
                      className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${formData.dietaryRestrictions.includes(d) ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'border-slate-200 text-slate-600 hover:border-blue-300'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                {formData.dietaryRestrictions.includes('Kosher') && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-2xl border border-blue-100 animate-in fade-in slide-in-from-top-2">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 text-center">Kosher Type (Select One)</p>
                    <div className="flex gap-2">
                      {['Meat', 'Dairy', 'Pareve'].map(t => (
                        <button 
                          key={t}
                          onClick={() => toggleList('kosherType', t)}
                          className={`flex-1 py-2 rounded-xl text-[10px] font-black transition-all border ${formData.kosherType.includes(t) ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-blue-100 text-blue-400 hover:bg-blue-50'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Other Dietary or Religious Needs</p>
                  <div className="relative">
                    <input 
                      type="text"
                      value={formData.customReligious}
                      onChange={(e) => updateForm('customReligious', e.target.value)}
                      placeholder="e.g. 'Halal', 'No beef', 'Temple Style'..."
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <div className="absolute top-1 right-1">
                      <VoiceInput 
                        onTranscript={(text) => updateForm('customReligious', formData.customReligious ? `${formData.customReligious} ${text}` : text)} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-500">Cuisine Style</p>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2 scrollbar-thin">
                  {Object.values(CUISINE_REGIONS).flat().map(c => (
                    <button 
                      key={c}
                      onClick={() => toggleList('cuisines', c)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${formData.cuisines.includes(c) ? 'bg-orange-100 border-orange-400 text-orange-700' : 'border-slate-200 text-slate-600 hover:border-orange-300'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-500">Meal Type</p>
                  <select 
                    value={formData.mealType}
                    onChange={(e) => updateForm('mealType', e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none"
                  >
                    {MEAL_TYPES.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-500">Time Available</p>
                  <div className="flex items-center gap-3">
                    <input 
                      type="range" min="10" max="120" step="5"
                      value={formData.timeAvailable}
                      onChange={(e) => updateForm('timeAvailable', parseInt(e.target.value))}
                      className="flex-1 accent-orange-500"
                    />
                    <span className="text-[10px] font-black text-orange-600 w-12">{formData.timeAvailable}m</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-500">Convenience</p>
                <div className="flex flex-wrap gap-2">
                  {CONVENIENCE_FILTERS.map(f => (
                    <button 
                      key={f}
                      onClick={() => toggleList('convenienceFilters', f)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${formData.convenienceFilters.includes(f) ? 'bg-emerald-100 border-emerald-400 text-emerald-700' : 'border-slate-200 text-slate-600 hover:border-emerald-300'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Other Health or Lifestyle Goals</p>
                  <div className="relative">
                    <input 
                      type="text"
                      value={formData.customHealthGoals}
                      onChange={(e) => updateForm('customHealthGoals', e.target.value)}
                      placeholder="e.g. 'Low sodium', 'High protein', 'No nightshades'..."
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <div className="absolute top-1 right-1">
                      <VoiceInput 
                        onTranscript={(text) => updateForm('customHealthGoals', formData.customHealthGoals ? `${formData.customHealthGoals} ${text}` : text)} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-500">Equipment</p>
                <div className="flex flex-wrap gap-2">
                  {COMMON_EQUIPMENT.map(e => (
                    <button 
                      key={e}
                      onClick={() => toggleList('equipment', e)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${formData.equipment.includes(e) ? 'bg-slate-800 border-slate-800 text-white shadow-sm' : 'border-slate-200 text-slate-600 hover:border-orange-300'}`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-500">Allergies</p>
                <div className="flex flex-wrap gap-2">
                  {COMMON_ALLERGENS.map(a => (
                    <button 
                      key={a}
                      onClick={() => toggleList('allergies', a)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${formData.allergies.includes(a) ? 'bg-red-100 border-red-400 text-red-700' : 'border-slate-200 text-slate-600 hover:border-red-300'}`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Other Allergies</p>
                  <div className="relative">
                    <input 
                      type="text"
                      value={formData.customAllergies}
                      onChange={(e) => updateForm('customAllergies', e.target.value)}
                      placeholder="e.g. 'Strawberries', 'Cilantro', 'Mushrooms'..."
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:ring-1 focus:ring-red-500"
                    />
                    <div className="absolute top-1 right-1">
                      <VoiceInput 
                        onTranscript={(text) => updateForm('customAllergies', formData.customAllergies ? `${formData.customAllergies} ${text}` : text)} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => handleSubmit()}
              disabled={isLoading}
              className="w-full bg-orange-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-orange-100 hover:bg-orange-700 transition-all transform hover:scale-[1.01] disabled:opacity-50 text-lg"
            >
              {isLoading ? 'Cooking up ideas...' : 'Generate My Recipe'}
            </button>
          </div>
      </div>
    </div>
  );
};

export default Wizard;
