
import React, { useState } from 'react';
import { AppSettings, HouseholdType, SpiceLevel, KosherType, SkillLevel, UnitSystem } from '../types';
import { HOUSEHOLD_TYPES, SPICE_LEVELS, HEALTH_DIETS, RELIGIOUS_DIETS, CUISINE_REGIONS, COMMON_EQUIPMENT, SKILL_LEVELS, UNIT_SYSTEMS } from '../constants';
import { saveSettings } from '../lib/storage';

interface SettingsProps {
  settings: AppSettings;
  onSave: (settings: AppSettings) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, onSave }) => {
  const [form, setForm] = useState<AppSettings>({ ...settings });

  const update = (key: keyof AppSettings, val: any) => setForm(f => ({ ...f, [key]: val }));
  
  const toggle = (key: 'defaultDietaryRestrictions' | 'defaultCuisines' | 'defaultEquipment', item: string) => {
    const list = [...(form[key] as string[])];
    const index = list.indexOf(item);
    if (index > -1) {
      list.splice(index, 1);
      if (item === 'Kosher' && key === 'defaultDietaryRestrictions') update('isKosher', false);
    } else {
      list.push(item);
      if (item === 'Kosher' && key === 'defaultDietaryRestrictions') update('isKosher', true);
    }
    update(key, list);
  };

  const handleSave = () => {
    const finalForm = { ...form, hasOnboarded: true };
    saveSettings(finalForm);
    onSave(finalForm);
    alert('Preferences saved! We will use these for your future searches.');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-900 mb-2">My Kitchen Profile</h2>
        <p className="text-slate-500">Optional: Set these defaults to skip steps in the meal quiz.</p>
      </div>
      
      <div className="space-y-8 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
        <section className="space-y-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">The Basics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Your Name</label>
              <input 
                type="text" 
                value={form.name || ''} 
                onChange={e => update('name', e.target.value)}
                placeholder="Chef"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none text-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Skill Level</label>
              <select 
                value={form.skillLevel}
                onChange={e => update('skillLevel', e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none text-sm"
              >
                {SKILL_LEVELS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Units</label>
              <div className="flex gap-2">
                {UNIT_SYSTEMS.map(u => (
                  <button 
                    key={u}
                    onClick={() => update('unitSystem', u)}
                    className={`flex-1 py-3 rounded-2xl text-sm font-bold border transition-all ${form.unitSystem === u ? 'bg-slate-800 border-slate-800 text-white shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'}`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-bold text-slate-700 mb-2">Favorite Chef (Style Inspiration)</label>
              <input 
                type="text" 
                value={form.favoriteChef || ''} 
                onChange={e => update('favoriteChef', e.target.value)}
                placeholder="Ina Garten, Jamie Oliver, etc."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none text-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">Dietary Standards</h3>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {RELIGIOUS_DIETS.map(d => (
                <button 
                  key={d}
                  onClick={() => toggle('defaultDietaryRestrictions', d)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${form.defaultDietaryRestrictions.includes(d) ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-200'}`}
                >
                  {d}
                </button>
              ))}
            </div>

            {form.isKosher && (
              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 animate-in slide-in-from-top-4">
                <p className="text-xs font-bold text-blue-800">✡️ Kosher Mode Active</p>
                <p className="text-[10px] text-blue-400 font-medium">We'll ask for the meal category (Meat/Dairy/Pareve) when you plan a specific meal.</p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {HEALTH_DIETS.map(d => (
                <button 
                  key={d}
                  onClick={() => toggle('defaultDietaryRestrictions', d)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${form.defaultDietaryRestrictions.includes(d) ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-emerald-200'}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </section>

        <button 
          onClick={handleSave}
          className="w-full bg-slate-900 text-white font-black py-5 rounded-[2rem] hover:bg-orange-600 transition-all shadow-xl shadow-slate-200 transform hover:scale-[1.02]"
        >
          Save All Preferences
        </button>
      </div>
    </div>
  );
};

export default Settings;
