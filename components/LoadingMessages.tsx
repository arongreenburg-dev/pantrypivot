import React, { useEffect, useState } from 'react';

const LOADING_MESSAGES = [
  { emoji: "🔪", text: "Chopping the ingredients..." },
  { emoji: "🍳", text: "We're cooking something up..." },
  { emoji: "👨‍🍳", text: "Chef is getting creative..." },
  { emoji: "🌿", text: "Seasoning to perfection..." },
  { emoji: "🍽️", text: "Serving up something great..." },
  { emoji: "⭐", text: "Almost ready to plate..." },
];

export const LoadingMessages: React.FC = () => {
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

export default LoadingMessages;
