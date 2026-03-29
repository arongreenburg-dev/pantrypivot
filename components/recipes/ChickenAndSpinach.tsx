import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare const window: Window & { gtag: (...args: unknown[]) => void };

type Tab = 'skillet' | 'stuffed' | 'soup' | 'pasta';

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
    title: 'Garlic Chicken and Spinach Skillet',
    description: 'Seared chicken thighs and wilted spinach in a savory garlic and white wine pan sauce — an elegant weeknight dinner ready in 25 minutes.',
    time: '25 min',
    servings: '4 servings',
    ingredients: [
      '1½ lbs boneless, skinless chicken thighs',
      '6 oz fresh baby spinach',
      '6 cloves garlic, thinly sliced',
      '1 small onion, finely diced',
      '½ cup chicken broth',
      '¼ cup dry white wine (or extra broth)',
      '2 tbsp olive oil',
      '1 tsp dried Italian seasoning',
      '½ tsp smoked paprika',
      '½ tsp salt',
      '¼ tsp black pepper',
      '1 tsp lemon zest',
      '1 tbsp fresh lemon juice',
      '2 tbsp fresh parsley, chopped',
    ],
    instructions: [
      'Pat chicken thighs dry with paper towels. Season both sides with salt, pepper, smoked paprika, and Italian seasoning.',
      'Heat olive oil in a large skillet over medium-high heat until shimmering. Add chicken thighs smooth-side down. Sear undisturbed 5–6 minutes until deep golden brown.',
      'Flip and cook 4–5 minutes more until cooked through (165°F internal temperature). Remove to a plate and tent with foil.',
      'Reduce heat to medium. Add onion to the pan; cook 3 minutes until softened, scraping up any browned bits.',
      'Add sliced garlic; cook 1–2 minutes until pale golden and fragrant.',
      'Pour in white wine; cook 1 minute until mostly evaporated. Add chicken broth; simmer 2 minutes.',
      'Add baby spinach in batches, stirring to wilt each addition before adding more — it takes about 2 minutes total.',
      'Stir in lemon zest and lemon juice. Return chicken to the pan; nestle into the spinach and spoon pan sauce over the top. Garnish with parsley. Serve immediately.',
    ],
  },
  stuffed: {
    title: 'Spinach-Stuffed Chicken Breast',
    description: 'Juicy chicken breasts filled with a savory garlic spinach stuffing, seared and then finished in the oven — impressive but straightforward.',
    time: '40 min',
    servings: '4 servings',
    ingredients: [
      '4 boneless, skinless chicken breasts (6–7 oz each)',
      '5 oz fresh baby spinach',
      '4 cloves garlic, minced',
      '1 small onion, finely diced',
      '¼ cup sun-dried tomatoes, finely chopped',
      '1 tbsp olive oil, plus 2 tbsp for searing',
      '1 tsp dried Italian seasoning',
      '½ tsp red pepper flakes',
      '½ tsp salt',
      '¼ tsp black pepper',
      '½ tsp garlic powder',
      '1 tbsp fresh lemon juice',
      '8 toothpicks',
    ],
    instructions: [
      'Preheat oven to 400°F.',
      'Heat 1 tbsp olive oil in a skillet over medium heat. Add onion; cook 3 minutes. Add garlic and red pepper flakes; cook 1 minute.',
      'Add spinach; stir until fully wilted, 2–3 minutes. Drain any excess liquid. Stir in sun-dried tomatoes and lemon juice. Season with salt and pepper. Let filling cool 5 minutes.',
      'Cut a deep pocket into the thickest side of each chicken breast — insert knife horizontally and slice almost all the way through, stopping ½ inch from each edge.',
      'Season chicken all over with salt, pepper, garlic powder, and Italian seasoning.',
      'Stuff each pocket with the spinach filling. Secure the opening with 2 toothpicks each.',
      'Heat 2 tbsp olive oil in an oven-safe skillet over medium-high heat. Sear stuffed chicken 3 minutes per side until golden.',
      'Transfer skillet to the oven. Bake 18–22 minutes until chicken reaches 165°F. Rest 5 minutes. Remove toothpicks before serving.',
    ],
  },
  soup: {
    title: 'Chicken Spinach Soup',
    description: 'A light, nourishing soup with tender shredded chicken, baby spinach, and white beans in a bright lemon-herb broth.',
    time: '40 min',
    servings: '6 servings',
    ingredients: [
      '1½ lbs boneless, skinless chicken breast',
      '6 oz fresh baby spinach',
      '1 can (15 oz) white beans (cannellini), drained and rinsed',
      '1 medium onion, diced',
      '3 medium carrots, sliced',
      '3 stalks celery, sliced',
      '4 cloves garlic, minced',
      '6 cups chicken broth',
      '2 tbsp olive oil',
      '1 tsp dried thyme',
      '1 tsp dried Italian seasoning',
      '½ tsp salt',
      '¼ tsp black pepper',
      '2 tbsp fresh lemon juice',
      '¼ cup fresh parsley, chopped',
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat. Add onion, carrots, and celery; cook 5 minutes until softened.',
      'Add garlic; cook 1 minute until fragrant.',
      'Pour in chicken broth. Add whole chicken breasts, thyme, Italian seasoning, salt, and pepper.',
      'Bring to a boil, then reduce heat to low. Simmer 18–20 minutes until chicken is cooked through.',
      'Remove chicken breasts to a cutting board. Use two forks to shred into bite-sized pieces.',
      'Add white beans to the simmering soup; cook 3 minutes.',
      'Return shredded chicken to the pot. Add baby spinach; stir until wilted, 1–2 minutes.',
      'Stir in lemon juice. Taste and adjust seasoning. Ladle into bowls and garnish generously with fresh parsley.',
    ],
  },
  pasta: {
    title: 'Chicken and Spinach Pasta',
    description: 'Seared chicken strips and wilted spinach tossed with pasta in a light garlic-tomato sauce — a complete meal in one pot with no dairy needed.',
    time: '30 min',
    servings: '4 servings',
    ingredients: [
      '12 oz penne or rigatoni',
      '1 lb boneless, skinless chicken breast, cut into strips',
      '5 oz fresh baby spinach',
      '4 cloves garlic, minced',
      '1 can (14.5 oz) diced tomatoes',
      '½ cup chicken broth',
      '½ cup pasta cooking water',
      '3 tbsp olive oil, divided',
      '1 tsp dried Italian seasoning',
      '½ tsp red pepper flakes',
      '½ tsp salt',
      '¼ tsp black pepper',
      '1 tsp lemon zest',
      '¼ cup fresh basil, torn',
    ],
    instructions: [
      'Bring a large pot of salted water to a boil. Cook pasta per package directions. Reserve 1 cup pasta water before draining.',
      'While pasta cooks, heat 1 tbsp olive oil in a large skillet over medium-high heat. Season chicken strips with salt and pepper.',
      'Sear chicken 3–4 minutes per side until golden and cooked through. Remove and slice or leave as strips.',
      'Add remaining 2 tbsp olive oil to the skillet. Add garlic and red pepper flakes; cook 1 minute over medium heat.',
      'Add diced tomatoes (with juices) and Italian seasoning. Simmer 5 minutes, stirring occasionally, until sauce thickens slightly.',
      'Pour in chicken broth and ½ cup reserved pasta water. Bring to a simmer.',
      'Add drained pasta and spinach to the sauce. Toss vigorously until spinach wilts and pasta is coated, adding more pasta water if needed for a saucier consistency.',
      'Return chicken to the pan. Add lemon zest; toss to combine. Top with fresh basil and serve immediately.',
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'skillet', label: 'Garlic Skillet' },
  { key: 'stuffed', label: 'Stuffed Chicken' },
  { key: 'soup', label: 'Soup' },
  { key: 'pasta', label: 'Pasta' },
];

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

const ChickenAndSpinach: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('skillet');
  const [copied, setCopied] = useState(false);

  const recipe = recipes[activeTab];

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Chicken and Spinach Recipes (Skillet, Stuffed, Soup, Pasta) | PantryPivot';

    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const createdDesc = !metaDesc;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    const prevDesc = metaDesc.content;
    metaDesc.content = 'Easy chicken and spinach recipes including garlic skillet, spinach-stuffed chicken breast, nourishing soup, and pasta. Healthy, dairy-free, and ready in 30–40 minutes.';

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const createdCanon = !canonical;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    const prevCanon = canonical.href;
    canonical.href = 'https://pantrypivot.com/recipes/chicken-and-spinach';

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
      keywords: 'chicken and spinach, spinach stuffed chicken, chicken spinach soup, chicken spinach pasta',
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
          name: 'Can I use frozen spinach instead of fresh?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Thaw frozen spinach completely and squeeze out as much moisture as possible in a clean towel or cheesecloth before using. Use about 5 oz frozen (after squeezing) to replace 6 oz fresh. It works especially well in the stuffed chicken and soup recipes.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I prevent the stuffed chicken from falling apart?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Toothpicks are your best friend for stuffed chicken. Make sure the filling is not too wet before stuffing. Let the filling cool and drain before using. Secure the opening well with 2 toothpicks per breast. Always remove toothpicks before serving.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is this recipe good for meal prep?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, especially the soup and skillet. Both keep well in the refrigerator for 3–4 days. The pasta is best eaten fresh, though leftovers are still good — add a splash of broth when reheating. Stuffed chicken reheats well in a 350°F oven for 12–15 minutes.',
          },
        },
        {
          '@type': 'Question',
          name: 'What can I substitute for white wine in the skillet?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Simply use extra chicken broth in place of white wine. You can also add a squeeze of lemon juice or a splash of white wine vinegar (start with 1 tsp) for a touch of acidity that the wine provides.',
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
    navigator.clipboard.writeText('https://pantrypivot.com/recipes/chicken-and-spinach').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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
          <span className="text-slate-700">Chicken and Spinach</span>
        </nav>

        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-800">Chicken and Spinach Recipes</h1>
            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">🥩 Meat</span>
          </div>
          <p className="text-slate-600 text-lg">Four delicious chicken and spinach dinners — garlic skillet, stuffed chicken breast, nourishing soup, and pasta.</p>
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
              onClick={() => window.gtag('event', 'click', { event_category: 'affiliate', event_label: 'amazon-fresh-chicken-spinach' })}
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
              'Fresh baby spinach is more convenient than mature spinach for these recipes — no stemming needed and it wilts quickly and evenly.',
              'For the stuffed chicken, squeeze all excess moisture from the cooked spinach filling before stuffing — too much liquid will make the chicken steam rather than roast.',
              'Pound chicken breasts to an even thickness (about ¾ inch) before stuffing or pan-searing to ensure even cooking.',
              'Add spinach to hot dishes at the very end — it wilts in 60–90 seconds and will over-cook and turn mushy if left too long.',
              'Lemon zest (not just juice) adds bright fragrance that complements both spinach and chicken beautifully — do not skip it.',
              'For the pasta, save that pasta cooking water — the starchy water is the secret to making the sauce cling to the noodles without dairy.',
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
              { from: 'Baby spinach', to: 'Frozen spinach (thaw and squeeze dry), baby kale, or Swiss chard (remove stems)' },
              { from: 'Chicken breast', to: 'Boneless chicken thighs — more forgiving on cooking time and extra flavorful' },
              { from: 'White wine', to: 'Extra chicken broth plus 1 tsp white wine vinegar or lemon juice for acidity' },
              { from: 'White beans (soup)', to: 'Chickpeas, kidney beans, or simply omit and add extra chicken or vegetables' },
              { from: 'Sun-dried tomatoes', to: 'Roasted red peppers or fresh cherry tomatoes sautéed until jammy' },
              { from: 'Penne (pasta)', to: 'Rigatoni, farfalle, or any short pasta with ridges that hold the sauce' },
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
            <p><span className="font-medium text-slate-700">Refrigerator:</span> Store all dishes in airtight containers for 3–4 days. The soup actually improves overnight. Pasta is best the day it is made but keeps acceptably for 2 days.</p>
            <p><span className="font-medium text-slate-700">Freezer:</span> The soup and skillet freeze well for up to 3 months. Stuffed chicken breasts can be frozen before or after cooking. Pasta does not freeze well due to the spinach and sauce texture changes.</p>
            <p><span className="font-medium text-slate-700">Reheating:</span> Reheat skillet and soup in a covered pan over medium-low heat with a splash of broth. Stuffed chicken reheats best in a 350°F oven for 12–15 minutes covered in foil. For pasta, add a few tablespoons of broth or water before microwaving or reheating in a pan.</p>
            <p><span className="font-medium text-slate-700">Meal prep:</span> The soup is an excellent meal-prep choice — make a large batch on Sunday and enjoy throughout the week. The stuffed chicken can be assembled up to 1 day ahead and stored in the refrigerator before cooking.</p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              {
                q: 'Can I use frozen spinach instead of fresh?',
                a: 'Yes. Thaw frozen spinach completely and squeeze out as much moisture as possible in a clean towel or cheesecloth before using. Use about 5 oz frozen (after squeezing) to replace 6 oz fresh. It works especially well in the stuffed chicken and soup recipes.',
              },
              {
                q: 'How do I prevent the stuffed chicken from falling apart?',
                a: 'Toothpicks are your best friend for stuffed chicken. Make sure the filling is not too wet before stuffing. Let the filling cool and drain before using. Secure the opening well with 2 toothpicks per breast. Always remove toothpicks before serving.',
              },
              {
                q: 'Is this recipe good for meal prep?',
                a: 'Yes, especially the soup and skillet. Both keep well in the refrigerator for 3–4 days. The pasta is best eaten fresh, though leftovers are still good — add a splash of broth when reheating. Stuffed chicken reheats well in a 350°F oven for 12–15 minutes.',
              },
              {
                q: 'What can I substitute for white wine in the skillet?',
                a: 'Simply use extra chicken broth in place of white wine. You can also add a squeeze of lemon juice or a splash of white wine vinegar (start with 1 tsp) for a touch of acidity that the wine provides.',
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
              { to: '/recipes/chicken-and-rice', label: 'Chicken and Rice' },
              { to: '/recipes/chicken-and-mushrooms', label: 'Chicken and Mushrooms' },
              { to: '/recipes/chicken-and-pasta', label: 'Chicken and Pasta' },
              { to: '/recipes/chicken-soup', label: 'Chicken Soup' },
              { to: '/recipes/air-fryer-chicken', label: 'Air Fryer Chicken' },
              { to: '/recipes/roast-chicken', label: 'Roast Chicken' },
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

export default ChickenAndSpinach;
