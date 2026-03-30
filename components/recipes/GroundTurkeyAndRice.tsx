import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare const window: Window & { gtag: (...args: unknown[]) => void };

type Tab = 'skillet' | 'bowl' | 'stuffedpeppers' | 'friedrice';

interface Recipe {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

const recipes: Record<Tab, Recipe> = {
  skillet: {
    title: 'Ground Turkey and Rice Skillet',
    description: 'Seasoned ground turkey and long-grain rice cooked together in one skillet with tomatoes and bell pepper — a fast, filling weeknight dinner.',
    time: '30 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground turkey',
      '1 cup long-grain white rice',
      '1 medium onion, diced',
      '1 red bell pepper, diced',
      '3 cloves garlic, minced',
      '1 can (14.5 oz) diced tomatoes',
      '1½ cups chicken broth',
      '1 tbsp olive oil',
      '1 tsp cumin',
      '1 tsp chili powder',
      '½ tsp smoked paprika',
      '½ tsp salt',
      '¼ tsp black pepper',
      '2 tbsp fresh cilantro, chopped',
    ],
    instructions: [
      'Heat olive oil in a large skillet over medium-high heat. Add onion and bell pepper; cook 4–5 minutes until softened.',
      'Add garlic; cook 1 minute until fragrant.',
      'Add ground turkey. Break apart with a wooden spoon. Cook 6–7 minutes until no longer pink. Drain excess fat if needed.',
      'Stir in cumin, chili powder, smoked paprika, salt, and pepper. Cook 1 minute to bloom the spices.',
      'Add rice; stir to coat grains with the spice mixture.',
      'Pour in diced tomatoes (with juices) and chicken broth. Stir to combine.',
      'Bring to a boil, then reduce heat to low. Cover tightly and simmer 18–20 minutes until rice is cooked and liquid is absorbed.',
      'Remove from heat. Rest covered 5 minutes, then fluff with a fork. Garnish with fresh cilantro.',
    ],
  },
  bowl: {
    title: 'Ground Turkey Rice Bowl',
    description: 'Seasoned ground turkey over steamed rice with fresh toppings — a customizable, protein-packed bowl inspired by Korean ground meat bowls.',
    time: '25 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground turkey',
      '2 cups cooked white or brown rice',
      '4 cloves garlic, minced',
      '1 tbsp fresh ginger, grated',
      '3 tbsp soy sauce (or tamari)',
      '1 tbsp sesame oil',
      '1 tbsp rice vinegar',
      '1 tsp honey',
      '½ tsp red pepper flakes',
      '1 tbsp vegetable oil',
      '2 green onions, sliced',
      '1 tsp sesame seeds',
      '1 cup shredded carrots',
      '1 cup cucumber, sliced',
    ],
    instructions: [
      'In a small bowl, whisk together soy sauce, sesame oil, rice vinegar, honey, and red pepper flakes. Set sauce aside.',
      'Heat vegetable oil in a skillet over medium-high heat. Add ground turkey; break apart and cook 5–6 minutes until no longer pink.',
      'Add garlic and ginger; cook 1 minute until fragrant.',
      'Pour sauce over the turkey. Stir and cook 2–3 minutes until the sauce reduces and coats the meat.',
      'Divide cooked rice into bowls. Spoon ground turkey mixture over the rice.',
      'Top with shredded carrots and cucumber slices.',
      'Garnish with green onions and sesame seeds. Serve immediately.',
    ],
  },
  stuffedpeppers: {
    title: 'Ground Turkey Stuffed Peppers with Rice',
    description: 'Colorful bell peppers stuffed with seasoned ground turkey and rice, baked until tender — a hearty, satisfying meal with minimal cleanup.',
    time: '55 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground turkey',
      '1 cup cooked long-grain white rice',
      '4 large bell peppers (any color)',
      '1 medium onion, diced',
      '3 cloves garlic, minced',
      '1 can (14.5 oz) diced tomatoes, drained',
      '1 tsp Italian seasoning',
      '1 tsp cumin',
      '½ tsp salt',
      '¼ tsp black pepper',
      '1 tbsp olive oil',
      '½ cup chicken broth',
      '2 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'Preheat oven to 375°F. Cut tops off bell peppers; remove seeds and membranes. Place in a baking dish.',
      'Heat olive oil in a skillet over medium-high heat. Add onion; cook 4 minutes until softened.',
      'Add garlic; cook 1 minute. Add ground turkey; break apart and cook 6–7 minutes until cooked through.',
      'Stir in drained diced tomatoes, Italian seasoning, cumin, salt, and pepper. Cook 2 minutes.',
      'Remove from heat. Stir in cooked rice and fresh parsley.',
      'Stuff each pepper generously with the turkey-rice filling, mounding it on top.',
      'Pour chicken broth into the bottom of the baking dish (this steams the peppers). Cover tightly with foil.',
      'Bake 30 minutes. Remove foil; bake 10 more minutes until peppers are tender. Serve hot.',
    ],
  },
  friedrice: {
    title: 'Ground Turkey Fried Rice',
    description: 'Crispy fried rice with seasoned ground turkey, eggs, and vegetables — a quick weeknight meal that is better than takeout.',
    time: '20 min',
    servings: '4 servings',
    ingredients: [
      '1 lb ground turkey',
      '3 cups day-old cooked rice (cold)',
      '2 eggs, lightly beaten',
      '1 cup frozen peas and carrots, thawed',
      '1 medium onion, diced',
      '3 cloves garlic, minced',
      '1 tbsp fresh ginger, grated',
      '3 tbsp soy sauce (or tamari)',
      '1 tbsp sesame oil',
      '2 tbsp vegetable oil',
      '2 green onions, sliced',
      '½ tsp white pepper',
    ],
    instructions: [
      'Make sure rice is cold and dry — day-old rice is ideal. Break up any clumps.',
      'Heat 1 tbsp vegetable oil in a large wok or skillet over high heat until very hot.',
      'Add ground turkey. Break apart and cook 5–6 minutes until browned. Season with white pepper. Remove to a plate.',
      'Add remaining 1 tbsp oil to the wok. Add onion; stir-fry 2 minutes. Add garlic and ginger; stir-fry 1 minute.',
      'Push everything to one side. Pour beaten eggs into the empty side; scramble quickly until just set, then break apart and mix with the onion.',
      'Add cold rice to the wok. Press down and let it sit undisturbed 1–2 minutes to develop crispy bits, then stir-fry vigorously.',
      'Add peas and carrots; stir-fry 1 minute.',
      'Return turkey to the wok. Pour in soy sauce and sesame oil. Toss everything together 1–2 minutes until well combined. Top with green onions and serve.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'skillet', label: 'Skillet' },
  { key: 'bowl', label: 'Bowl' },
  { key: 'stuffedpeppers', label: 'Stuffed Peppers' },
  { key: 'friedrice', label: 'Fried Rice' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const GroundTurkeyAndRice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('skillet');
  const [copied, setCopied] = useState(false);

  const recipe = recipes[activeTab];

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Ground Turkey and Rice Recipes (Skillet, Bowl, Stuffed Peppers) | PantryPivot';

    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const createdDesc = !metaDesc;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    const prevDesc = metaDesc.content;
    metaDesc.content = 'Easy ground turkey and rice recipes including one-skillet dinner, rice bowl, stuffed peppers, and fried rice. Healthy, dairy-free, and ready in 30 minutes.';

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const createdCanon = !canonical;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    const prevCanon = canonical.href;
    canonical.href = 'https://pantrypivot.com/recipes/ground-turkey-and-rice';

    return () => {
      document.title = prevTitle;
      if (createdDesc) metaDesc?.remove();
      else if (metaDesc) metaDesc.content = prevDesc;
      if (createdCanon) canonical?.remove();
      else if (canonical) canonical.href = prevCanon;
    };
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'recipe-schema';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      name: recipe.title,
      description: recipe.description,
      totalTime: `PT${recipe.time.replace(' min', 'M')}`,
      recipeYield: recipe.servings,
      recipeCategory: 'Main Course',
      recipeCuisine: 'American',
      keywords: 'ground turkey and rice, ground turkey recipe, turkey rice skillet, healthy ground turkey',
      recipeIngredient: recipe.ingredients,
      recipeInstructions: recipe.instructions.map((step, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        text: step,
      })),
    });
    const existing = document.getElementById('recipe-schema');
    if (existing) existing.remove();
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [activeTab, recipe]);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Should I drain ground turkey after cooking?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ground turkey is naturally leaner than beef, but you can tilt the pan and spoon off any accumulated fat if needed. For the skillet recipe, draining keeps the dish from becoming greasy.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I use brown rice instead of white rice?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Brown rice adds fiber and a nuttier flavor. Increase cooking liquid by ¼ cup and extend the simmer time to 35–40 minutes. For fried rice, any cooked rice works — just make sure it is cold and dry.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I keep ground turkey from drying out?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Avoid overcooking — ground turkey reaches a safe 165°F quickly. Adding sauce, broth, or diced tomatoes to the recipe adds moisture. Do not cook on excessively high heat for extended periods.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I meal prep these recipes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. All four recipes store well in the refrigerator for 3–4 days. The skillet and stuffed peppers reheat particularly well. Store in airtight containers and reheat with a splash of broth or water to prevent drying.',
          },
        },
      ],
    });
    const existing = document.getElementById('faq-schema');
    if (existing) existing.remove();
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText('https://pantrypivot.com/recipes/ground-turkey-and-rice').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'page-recipe-schema';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Recipe",
      "name": "Ground Turkey and Rice Recipes",
      "description": "Four kosher meat ground turkey and rice recipes — one-skillet, rice bowl, stuffed peppers, and turkey fried rice.",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "recipeCategory": "Main Course",
      "recipeCuisine": "American",
      "keywords": "ground turkey and rice, kosher turkey dinner, dairy-free turkey, healthy turkey rice bowl, stuffed peppers turkey",
      "suitableForDiet": "https://schema.org/KosherDiet",
      "recipeIngredient": [
        "1 lb ground turkey",
        "1.5 cups long-grain white rice",
        "1 medium onion, diced",
        "3 cloves garlic, minced",
        "2 tbsp olive oil",
        "2 cups chicken or vegetable broth",
        "1 tsp cumin"
      ],
      "recipeInstructions": [
        { "@type": "HowToStep", "text": "Brown ground turkey in olive oil, breaking apart, 8–10 minutes until cooked through. Add onion and garlic, cook 3 minutes." },
        { "@type": "HowToStep", "text": "Stir in rice and cumin. Add broth and bring to a boil." },
        { "@type": "HowToStep", "text": "Reduce heat to low, cover, and simmer 18–20 minutes until rice is tender and liquid absorbed. Fluff and adjust seasoning." }
      ],
      "prepTime": "PT15M",
      "cookTime": "PT35M",
      "recipeYield": "4 servings"
    });
    document.head.appendChild(script);
    return () => { const el = document.getElementById('page-recipe-schema'); if (el) el.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-orange-500 font-bold text-xl">PantryPivot</Link>
          <nav className="flex gap-4 text-sm text-slate-600">
            <Link to="/recipes" className="hover:text-orange-500">Recipes</Link>
            <Link to="/pantry" className="hover:text-orange-500">My Pantry</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/recipes" className="hover:text-orange-500">Recipes</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">Ground Turkey and Rice</span>
        </nav>

        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-800">Ground Turkey and Rice Recipes</h1>
            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">🥩 Meat</span>
          </div>
          <p className="text-slate-600 text-lg">Four easy ground turkey and rice dinners — one-skillet, rice bowl, stuffed peppers, and fried rice.</p>
        </div>

        {/* Share button */}
        <button
          onClick={handleShare}
          className="mb-6 px-4 py-2 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
        >
          {copied ? '✓ Link copied!' : '🔗 Share this page'}
        </button>

        {/* TOC */}
        <nav className="bg-white rounded-xl border border-slate-200 p-5 mb-8">
          <h2 className="font-semibold text-slate-700 mb-3">On this page</h2>
          <ul className="space-y-1 text-sm text-orange-600">
            <li><a href="#recipes" className="hover:underline">Recipes</a></li>
            <li><a href="#tips" className="hover:underline">Cooking Tips</a></li>
            <li><a href="#substitutions" className="hover:underline">Substitutions</a></li>
            <li><a href="#storage" className="hover:underline">Storage & Reheating</a></li>
            <li><a href="#faq" className="hover:underline">FAQ</a></li>
          </ul>
        </nav>

        <h2 className="text-2xl font-bold text-slate-800 mb-3">What Can I Make With Ground Turkey and Rice?</h2>
        <p className="text-sm text-slate-500 max-w-2xl mb-8 leading-relaxed">This page contains 4 kosher meat ground turkey and rice recipes — skillet, bowl, stuffed peppers, and fried rice. All recipes are dairy-free. Ingredients are simple pantry staples with no specialty items required.</p>

        {/* Tabs */}
        <div id="recipes" className="mb-6 flex flex-wrap gap-2">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === key
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-orange-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Recipe card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{recipe.title}</h2>
          <p className="text-slate-600 mb-4">{recipe.description}</p>
          <div className="flex gap-6 text-sm text-slate-500 mb-6">
            <span>⏱ {recipe.time}</span>
            <span>🍽 {recipe.servings}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-orange-400 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Instructions</h3>
              <ol className="space-y-3">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold text-xs">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={AMAZON_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.gtag('event', 'click', { event_category: 'affiliate', event_label: 'amazon-fresh-ground-turkey-rice' })}
              className="px-5 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
            >
              Order Ingredients on Amazon Fresh
            </a>
            <a
              href={PANTRYPIVOT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              Find More Recipes on PantryPivot
            </a>
          </div>
        </div>

        {/* Cooking Tips */}
        <section id="tips" className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Cooking Tips</h2>
          <ul className="space-y-3">
            {[
              'Ground turkey cooks faster than beef — it reaches a safe 165°F in about 7 minutes over medium-high heat.',
              'Season ground turkey generously. It has a milder flavor than beef and benefits from bold spices and aromatics.',
              'For fried rice, use day-old cold rice. Fresh hot rice is too wet and will clump and steam instead of fry.',
              'Do not press or smash turkey while cooking — letting it sit undisturbed for 2–3 minutes before breaking apart creates better browning.',
              'For stuffed peppers, parboil peppers in boiling water for 3 minutes before stuffing if you prefer very tender peppers.',
              'Add fresh herbs like cilantro or parsley at the end of cooking for the brightest flavor.',
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-orange-400 mt-0.5 flex-shrink-0">✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>

        {/* Substitutions */}
        <section id="substitutions" className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Substitutions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { from: 'Ground turkey', to: 'Ground chicken, ground beef, or ground lamb — adjust cook times accordingly' },
              { from: 'White rice', to: 'Brown rice (increase liquid and cook time), cauliflower rice, or quinoa' },
              { from: 'Soy sauce', to: 'Tamari (gluten-free) or coconut aminos for a milder, slightly sweet flavor' },
              { from: 'Bell pepper', to: 'Poblano, Anaheim, or cubanelle peppers for different heat levels' },
              { from: 'Diced tomatoes', to: 'Crushed tomatoes, fresh diced tomatoes, or fire-roasted tomatoes' },
              { from: 'Chicken broth', to: 'Vegetable broth or water with ½ tsp extra salt' },
            ].map(({ from, to }, i) => (
              <div key={i} className="bg-slate-50 rounded-lg p-3">
                <span className="font-medium text-slate-700 text-sm">{from}:</span>
                <span className="text-slate-600 text-sm ml-1">{to}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Storage */}
        <section id="storage" className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Storage & Reheating</h2>
          <div className="space-y-3 text-sm text-slate-600">
            <p><span className="font-medium text-slate-700">Refrigerator:</span> Store in an airtight container for 3–4 days. All four recipes reheat well.</p>
            <p><span className="font-medium text-slate-700">Freezer:</span> The skillet dinner and stuffed peppers (without filling) freeze well for up to 3 months. Avoid freezing fried rice — the texture degrades. Thaw overnight in the fridge.</p>
            <p><span className="font-medium text-slate-700">Reheating:</span> Warm in a covered skillet over medium-low heat with 2–3 tbsp of broth or water to restore moisture. Microwave on medium power in 90-second intervals, stirring between rounds.</p>
            <p><span className="font-medium text-slate-700">Meal prep:</span> Make a double batch of the skillet dinner — it makes excellent lunches. Stuffed peppers reheat beautifully in a 350°F oven for 15 minutes.</p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              {
                q: 'Should I drain ground turkey after cooking?',
                a: 'Ground turkey is naturally leaner than beef, but you can tilt the pan and spoon off any accumulated fat if needed. For the skillet recipe, draining keeps the dish from becoming greasy.',
              },
              {
                q: 'Can I use brown rice instead of white rice?',
                a: 'Yes. Brown rice adds fiber and a nuttier flavor. Increase cooking liquid by ¼ cup and extend the simmer time to 35–40 minutes. For fried rice, any cooked rice works — just make sure it is cold and dry.',
              },
              {
                q: 'How do I keep ground turkey from drying out?',
                a: 'Avoid overcooking — ground turkey reaches a safe 165°F quickly. Adding sauce, broth, or diced tomatoes to the recipe adds moisture. Do not cook on excessively high heat for extended periods.',
              },
              {
                q: 'Can I meal prep these recipes?',
                a: 'Yes. All four recipes store well in the refrigerator for 3–4 days. The skillet and stuffed peppers reheat particularly well. Store in airtight containers and reheat with a splash of broth or water to prevent drying.',
              },
            ].map(({ q, a }, i) => (
              <div key={i}>
                <h3 className="font-semibold text-slate-700 mb-1">{q}</h3>
                <p className="text-slate-600 text-sm">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* More Recipes */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">More Recipes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { to: '/recipes/ground-turkey', label: 'Ground Turkey Recipes' },
              { to: '/recipes/ground-turkey-sweet-potato', label: 'Ground Turkey Sweet Potato' },
              { to: '/recipes/turkey-and-vegetables', label: 'Turkey and Vegetables' },
              { to: '/recipes/chicken-and-rice', label: 'Chicken and Rice' },
              { to: '/recipes/ground-beef-and-rice', label: 'Ground Beef and Rice' },
              { to: '/recipes/beef-and-potatoes', label: 'Beef and Potatoes' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-700 hover:border-orange-300 hover:text-orange-600 transition-colors text-center"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} PantryPivot. All rights reserved.</p>
          <p className="mt-1">
            <Link to="/privacy" className="hover:text-orange-500 mr-4">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-orange-500">Terms of Use</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GroundTurkeyAndRice;
