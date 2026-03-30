import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AMAZON_LINK = 'https://amzn.to/40ZcXPs';
const PANTRYPIVOT_LINK = 'https://pantrypivot.com';

type PlannerTab = 'menu' | 'timeline' | 'seder-plate' | 'shopping';

const PassoverSederPlanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PlannerTab>('menu');
  const [copied, setCopied] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const PAGE_TITLE = 'Passover Seder Planner 2026 — Menu, Timeline & Shopping List | PantryPivot';
    const PAGE_DESC = 'Plan your Passover Seder 2026 with a complete menu, day-by-day prep timeline, Seder plate guide, and shopping list. Kosher for Passover, chametz-free.';
    const PAGE_URL = 'https://pantrypivot.com/recipes/passover-seder-planner';
    document.title = PAGE_TITLE;
    const update = (sel: string, attr: string, val: string): string => {
      const el = document.querySelector(sel);
      const prev = el ? (el.getAttribute(attr) ?? '') : '';
      if (el) el.setAttribute(attr, val);
      return prev;
    };
    const prevDesc    = update('meta[name="description"]',       'content', PAGE_DESC);
    const prevOgTitle = update('meta[property="og:title"]',      'content', PAGE_TITLE);
    const prevOgDesc  = update('meta[property="og:description"]','content', PAGE_DESC);
    const prevOgUrl   = update('meta[property="og:url"]',        'content', PAGE_URL);
    const existingCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const prevCanonical = existingCanonical ? existingCanonical.getAttribute('href') : null;
    const canonRef: HTMLLinkElement = existingCanonical || (() => {
      const el = document.createElement('link') as HTMLLinkElement;
      el.rel = 'canonical';
      document.head.appendChild(el);
      return el;
    })();
    canonRef.href = PAGE_URL;
    return () => {
      document.title = 'Recipes for Ingredients You Have | AI Recipe Generator';
      update('meta[name="description"]',       'content', prevDesc);
      update('meta[property="og:title"]',      'content', prevOgTitle);
      update('meta[property="og:description"]','content', prevOgDesc);
      update('meta[property="og:url"]',        'content', prevOgUrl);
      if (prevCanonical !== null) canonRef.href = prevCanonical;
      else canonRef.remove();
    };
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'seder-howto-schema';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Plan a Passover Seder",
      "description": "A complete guide to planning a Passover Seder — menu, prep timeline, Seder plate, and shopping list. Kosher for Passover 2026.",
      "url": "https://pantrypivot.com/recipes/passover-seder-planner",
      "author": { "@type": "Organization", "name": "PantryPivot" },
      "publisher": { "@type": "Organization", "name": "PantryPivot", "url": "https://pantrypivot.com" },
      "totalTime": "P7D",
      "step": [
        { "@type": "HowToStep", "name": "One week before: order ingredients", "text": "Order all Kosher for Passover certified ingredients online or at a Jewish grocery store. Look for the 'Kosher for Passover' certification on all packaged goods." },
        { "@type": "HowToStep", "name": "Two days before: brisket prep", "text": "Make the brisket 1–2 days ahead. It tastes better the next day and slices more cleanly when cold." },
        { "@type": "HowToStep", "name": "Day before: soups and cakes", "text": "Prepare matzo ball soup broth and refrigerate overnight. Make the flourless chocolate cake — it improves overnight in the fridge." },
        { "@type": "HowToStep", "name": "Seder day: final cooking", "text": "Make matzo balls 2 hours before Seder. Roast vegetables and prepare salads. Reheat brisket in braising liquid, covered, at 325°F for 30–40 minutes." },
        { "@type": "HowToStep", "name": "1 hour before: prepare the Seder plate", "text": "Arrange the Seder plate with shank bone, roasted egg, bitter herbs (horseradish), charoset, karpas, and chazeret. Set out matzo under a cloth." }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById('seder-howto-schema');
      if (el) el.remove();
    };
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'seder-faq-schema';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "When is Passover 2026?",
          "acceptedAnswer": { "@type": "Answer", "text": "Passover 2026 begins Wednesday evening, April 1, 2026. The first Seder is Wednesday night, April 1. The second Seder (Diaspora) is Thursday night, April 2. Passover ends Thursday night, April 9 in the Diaspora (Wednesday night, April 8 in Israel)." }
        },
        {
          "@type": "Question",
          "name": "What food goes on the Seder plate?",
          "acceptedAnswer": { "@type": "Answer", "text": "The Seder plate holds six symbolic foods: shank bone (zeroa) representing the Passover sacrifice; roasted egg (beitzah) representing spring and renewal; bitter herbs such as horseradish (maror) representing the bitterness of slavery; charoset (a sweet paste of apples, nuts, and wine) representing the mortar used by Hebrew slaves; parsley or another vegetable (karpas) representing spring; and a second bitter herb (chazeret) usually romaine lettuce." }
        },
        {
          "@type": "Question",
          "name": "How far in advance can I make Passover food?",
          "acceptedAnswer": { "@type": "Answer", "text": "Brisket is best made 1–2 days ahead — it slices more cleanly when cold and the flavor deepens overnight. Matzo ball soup broth can be made 1–2 days ahead; add matzo balls the day of the Seder. Flourless chocolate cake is excellent made the day before. Roasted chicken and vegetables are best made day-of." }
        },
        {
          "@type": "Question",
          "name": "How many matzot are needed for a Seder?",
          "acceptedAnswer": { "@type": "Answer", "text": "In many communities, three whole matzot are placed on the Seder table — the middle one is broken for yachatz and the afikomen. For eating during the meal, plan roughly 1 box of matzo per 4–6 people. Make sure your matzo is certified kosher for Passover." }
        }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById('seder-faq-schema');
      if (el) el.remove();
    };
  }, []);

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const TABS: { key: PlannerTab; label: string }[] = [
    { key: 'menu', label: 'Seder Menu' },
    { key: 'timeline', label: 'Prep Timeline' },
    { key: 'seder-plate', label: 'Seder Plate Guide' },
    { key: 'shopping', label: 'Shopping List' },
  ];

  const menuCourses = [
    {
      course: 'Seder Plate',
      color: 'bg-indigo-50 border-indigo-200',
      accent: 'text-indigo-700',
      items: [
        { name: 'Shank bone (zeroa)', note: 'Roasted lamb or chicken bone — symbolic; customs vary on whether it is eaten' },
        { name: 'Roasted egg (beitzah)', note: 'Hard-boiled then briefly roasted or charred' },
        { name: 'Maror — bitter herbs', note: 'Commonly horseradish and/or romaine lettuce, depending on custom' },
        { name: 'Ashkenazi Charoset', note: 'Apple, walnut, cinnamon, kosher-for-Passover wine — recipe below; Sephardic versions vary' },
        { name: 'Karpas', note: 'A vegetable dipped in salt water — parsley, celery, and boiled potato are all common choices' },
        { name: 'Chazeret — second bitter herb', note: 'Commonly romaine lettuce' },
      ],
    },
    {
      course: 'Soup',
      color: 'bg-amber-50 border-amber-200',
      accent: 'text-amber-700',
      items: [
        { name: 'Matzo Ball Soup', note: 'Classic Seder first course', link: '/recipes/passover' },
        { name: 'Matzo', note: 'Three matzot on the table is standard in most communities for Seder rituals; have additional matzo available for eating throughout the meal' },
      ],
    },
    {
      course: 'Main Course',
      color: 'bg-red-50 border-red-200',
      accent: 'text-red-700',
      items: [
        { name: 'Passover Brisket', note: 'The Seder centerpiece — make 1–2 days ahead', link: '/recipes/passover' },
        { name: 'Roasted Chicken', note: 'If serving a crowd alongside brisket', link: '/recipes/passover' },
        { name: 'Roasted Root Vegetables', note: 'Carrots, sweet potato, parsnips — naturally Passover-friendly' },
        { name: 'Braised short ribs (alternative)', note: 'Cook like brisket, 3–4 hours at 325°F' },
      ],
    },
    {
      course: 'Sides & Salads',
      color: 'bg-green-50 border-green-200',
      accent: 'text-green-700',
      items: [
        { name: 'Israeli salad', note: 'Diced cucumber, tomato, red onion, lemon — use kosher-for-Passover certified olive oil where required by your custom' },
        { name: 'Roasted asparagus', note: 'Olive oil, salt, 400°F for 12 minutes' },
        { name: 'Roasted sweet potatoes', note: 'Cubed, olive oil, cinnamon — naturally Passover-friendly' },
        { name: 'Quinoa tabbouleh', note: 'Some communities use certified-for-Passover quinoa; others avoid it. Follow your family or rabbinic custom.' },
      ],
    },
    {
      course: 'Dessert',
      color: 'bg-purple-50 border-purple-200',
      accent: 'text-purple-700',
      items: [
        { name: 'Flourless Chocolate Cake', note: 'Pareve and gluten-free — make the day before; use kosher-for-Passover certified chocolate and cocoa', link: '/recipes/passover' },
        { name: 'Macaroons', note: 'Coconut or almond — look for Kosher for Passover on the label' },
        { name: 'Meringues', note: 'Egg whites and sugar — chametz-free; use kosher-for-Passover certified sugar' },
        { name: 'Fresh fruit platter', note: 'Always safe and always welcome' },
      ],
    },
  ];

  const timelineItems = [
    {
      day: '1 Week Before',
      date: 'March 25',
      tasks: [
        'Order all groceries online — look for Kosher for Passover certification on every packaged item',
        'Order matzo (you need ~1 box per 4–6 people), matzo meal, potato starch',
        'Order certified Passover wine and/or grape juice — each participant needs enough for four ritual cups; amounts depend on cup size and custom',
        'Clean and kasher your kitchen for Passover if needed',
        'Set guest count and finalize your menu',
        'Order a shank bone from your butcher if you can\'t find one',
      ],
    },
    {
      day: '3 Days Before',
      date: 'Sunday, March 29',
      tasks: [
        'Make the charoset — it gets better as it sits. Refrigerate in an airtight container.',
        'Make the flourless chocolate cake — improves overnight, stays good for 3–4 days in the fridge',
        'Buy fresh horseradish root if you want to grate your own maror',
        'Confirm headcount and set your table',
      ],
    },
    {
      day: '2 Days Before',
      date: 'Monday, March 30',
      tasks: [
        'Make the brisket (this is the most important make-ahead) — braise 3–3½ hours at 325°F',
        'Let brisket cool completely, then refrigerate in braising liquid overnight',
        'Make the chicken soup broth — simmer whole chicken 2 hours, strain, refrigerate overnight',
        'Shred the chicken meat from the broth and refrigerate separately',
      ],
    },
    {
      day: 'Day Before',
      date: 'Tuesday, March 31',
      tasks: [
        'Make the matzo ball mixture — refrigerate it until 2 hours before Seder',
        'Skim the solidified fat from the brisket braising liquid',
        'Slice the cold brisket against the grain, return slices to pan with braising liquid',
        'Set the Seder table: Haggadahs, wine glasses (4 per person), Seder plate, matzo cover',
        'Fill Elijah\'s cup and Miriam\'s cup',
        'Prepare salt water for karpas dipping',
        'Grate fresh horseradish for maror (wear goggles — it\'s serious)',
      ],
    },
    {
      day: 'Seder Day',
      date: 'Wednesday, April 1',
      tasks: [
        '3–4 hours before: Form and cook matzo balls in gently simmering broth (20–25 min, lid on)',
        '2 hours before: Begin reheating brisket covered at 325°F with braising liquid (30–40 min)',
        '90 minutes before: Roast vegetables at 400°F until tender (35–40 min)',
        '1 hour before: Arrange the Seder plate — shank bone, egg, maror, charoset, karpas, chazeret',
        '30 minutes before: Warm the soup on low. Do not boil once matzo balls are in — they\'ll fall apart',
        'At the Seder: Place three matzot under a cloth alongside the Seder plate (standard in most communities). Have additional matzo on the table for eating throughout the meal',
      ],
    },
  ];

  const sederPlateItems = [
    {
      name: 'Zeroa — Shank Bone',
      emoji: '🦴',
      symbol: 'Represents the Paschal lamb sacrificed in Egypt and the arm of God outstretched to free the Israelites.',
      how: 'Use a roasted lamb shank bone or a roasted chicken neck/wing. Roast at 400°F for 30–40 minutes until browned. It is symbolic — customs vary on whether it is eaten.',
    },
    {
      name: 'Beitzah — Roasted Egg',
      emoji: '🥚',
      symbol: 'Represents the festival sacrifice offered at the Temple, and more broadly the cycle of life and renewal. Some communities also associate it with mourning the Temple\'s destruction.',
      how: 'Hard-boil an egg, then hold it over a flame or roast briefly until it has brown spots. Some people use a blowtorch.',
    },
    {
      name: 'Maror — Bitter Herbs',
      emoji: '🌿',
      symbol: 'Represents the bitterness of slavery in Egypt.',
      how: 'Commonly freshly grated horseradish root or romaine lettuce, depending on your custom. Both are valid — follow your family or rabbinic practice.',
    },
    {
      name: 'Charoset — Sweet Paste',
      emoji: '🍎',
      symbol: 'Represents the mortar used by Hebrew slaves to build Pharaoh\'s cities.',
      how: 'Ashkenazi charoset: peel and finely chop 3 apples, mix with ½ cup chopped walnuts, 1 tsp cinnamon, 2–3 tbsp sweet kosher-for-Passover red wine. Sephardic charoset varies by community — often uses dates and almonds.',
    },
    {
      name: 'Karpas — Vegetable',
      emoji: '🌱',
      symbol: 'Represents spring and new beginnings. Dipped in salt water to evoke the tears of the slaves.',
      how: 'Common choices include fresh parsley, celery, or boiled potato — follow your family\'s custom. Dip in a bowl of salted water at the start of the Seder.',
    },
    {
      name: 'Chazeret — Second Bitter Herb',
      emoji: '🥬',
      symbol: 'Used for the Hillel sandwich (korech) — combining matzo, bitter herb, and charoset.',
      how: 'Commonly romaine lettuce. The inner white parts of romaine are traditionally used.',
    },
  ];

  const shoppingList = [
    {
      category: 'Meat & Protein',
      items: [
        '3–4 lb flat-cut beef brisket (per 6–8 people)',
        'Whole chicken (3½–4 lb) for matzo ball soup',
        'Shank bone or chicken neck for Seder plate',
        'Eggs (2 dozen — matzo balls, flourless cake, roasted egg)',
      ],
    },
    {
      category: 'Produce',
      items: [
        '3 large onions',
        '1 head garlic',
        'Fresh dill and parsley',
        '6 large carrots',
        '3 stalks celery',
        '3 large apples (for charoset)',
        'Fresh horseradish root',
        'Romaine lettuce',
        'Parsley (for karpas)',
        'Root vegetables: parsnips, sweet potatoes, turnips',
        'Fresh berries (for chocolate cake garnish)',
      ],
    },
    {
      category: 'Pantry — Use Kosher for Passover Certified Versions',
      items: [
        'Matzo (KFP) — roughly 1 box per 4–6 people',
        'Matzo meal (KFP) — 1–2 boxes',
        'Potato starch (KFP)',
        'Unsweetened cocoa powder (KFP)',
        'Bittersweet chocolate, 8 oz (KFP)',
        'Granulated sugar (KFP)',
        'Olive oil (KFP)',
        'Vegetable oil (KFP)',
        'Tomato paste (KFP)',
        'Schmaltz or vegetable oil for matzo balls (KFP)',
        'Walnuts or almonds for charoset (KFP)',
        'Ground cinnamon (KFP)',
      ],
    },
    {
      category: 'Kosher for Passover Wines & Liquids',
      items: [
        'Kosher for Passover wine or grape juice (each participant needs enough for four ritual cups; exact amounts depend on cup size and custom)',
        '1 bottle dry kosher-for-Passover red wine (for brisket)',
        'Kosher beef broth (KFP certified)',
        'Kosher chicken broth (KFP certified, or make your own)',
        'Grape juice (for children and those who don\'t drink)',
      ],
    },
    {
      category: 'Seder Table Items',
      items: [
        'Haggadahs (one per person)',
        'Seder plate',
        'Matzo cover or napkins',
        'Wine glasses (4 per adult)',
        'Cup for Elijah',
        'Cup for Miriam (water)',
        'Salt water (for karpas)',
        'Candles and candlesticks for Yom Tov',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-orange-600 flex items-center gap-2">
            <img src="/apple-touch-icon.png" className="h-8 w-8 rounded-lg" alt="PantryPivot" loading="lazy" /> PantryPivot
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="text-xs text-slate-400 mb-8">
          <ol className="flex items-center gap-1.5">
            <li><a href="https://pantrypivot.com" className="hover:text-orange-500 transition-colors">Home</a></li>
            <li className="text-slate-300">›</li>
            <li>Recipes</li>
            <li className="text-slate-300">›</li>
            <li><Link to="/recipes/passover" className="hover:text-orange-500 transition-colors">Passover</Link></li>
            <li className="text-slate-300">›</li>
            <li className="text-slate-600 font-medium">Seder Planner</li>
          </ol>
        </nav>

        {/* Jump nav */}
        <nav className="mb-8 overflow-x-auto">
          <div className="flex gap-2 text-sm font-semibold text-slate-500 whitespace-nowrap pb-1">
            <span className="text-slate-400 text-xs uppercase tracking-wider self-center">Jump to:</span>
            <a href="#menu" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-indigo-300 hover:text-indigo-700 transition-colors">Menu</a>
            <a href="#timeline" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-indigo-300 hover:text-indigo-700 transition-colors">Prep Timeline</a>
            <a href="#seder-plate" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-indigo-300 hover:text-indigo-700 transition-colors">Seder Plate</a>
            <a href="#shopping" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-indigo-300 hover:text-indigo-700 transition-colors">Shopping List</a>
            <a href="#faq" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-indigo-300 hover:text-indigo-700 transition-colors">FAQ</a>
            <a href="https://pantrypivot.com" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-indigo-300 hover:text-indigo-700 transition-colors">✨ Custom Recipe</a>
          </div>
        </nav>

        {/* Hero */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold px-5 py-2 rounded-full text-sm">
            🍷 Passover 2026 — First Seder: Wednesday, April 1
          </span>
        </div>

        <div className="text-center mb-4">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Passover Seder Planner 2026</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Everything you need to host a Seder — a complete kosher menu, day-by-day prep timeline, Seder plate guide, and printable shopping list.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 text-center mb-3 mt-8">How Do I Plan a Passover Seder?</h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto text-center mb-8 leading-relaxed">
          This Seder planner covers four things: a complete Passover menu with links to full recipes, a day-by-day prep timeline starting one week before the Seder, a guide to the six items on the Seder plate, and a full shopping list. Recipes are designed to be chametz-free. For packaged ingredients, use kosher-for-Passover certified products where applicable. Kitniyot practices vary by community — follow your family or rabbinic custom.
        </p>

        {/* Tab nav */}
        <div className="flex gap-2 flex-wrap justify-center mb-8">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm border transition-all ${
                activeTab === tab.key
                  ? 'bg-indigo-700 border-indigo-700 text-white shadow-md'
                  : 'border-slate-200 text-slate-600 bg-white hover:border-indigo-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* MENU TAB */}
        {activeTab === 'menu' && (
          <div id="menu" className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 text-sm text-indigo-800 leading-relaxed">
              <strong>Seder dinner serves 8–10.</strong> Scale the brisket and soup up or down based on headcount. The flourless chocolate cake serves 10. Recipes linked below are on this site.
            </div>

            {menuCourses.map((course) => (
              <div key={course.course} className={`bg-white border ${course.color} rounded-3xl shadow-sm overflow-hidden`}>
                <div className={`${course.color} px-6 py-3 border-b ${course.color.replace('bg-', 'border-')}`}>
                  <h3 className={`font-black text-sm uppercase tracking-wide ${course.accent}`}>{course.course}</h3>
                </div>
                <ul className="divide-y divide-slate-50">
                  {course.items.map((item) => (
                    <li key={item.name} className="flex items-start gap-3 px-6 py-4">
                      <span className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${course.accent.replace('text-', 'bg-')}`} />
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-slate-800">
                          {'link' in item && item.link ? (
                            <Link to={item.link} className="hover:text-indigo-700 underline underline-offset-2">
                              {item.name}
                            </Link>
                          ) : item.name}
                        </span>
                        <span className="text-slate-500 text-sm ml-2">— {item.note}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Charoset recipe inline */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              <h3 className="text-lg font-extrabold text-slate-900 mb-1">Ashkenazi Charoset Recipe</h3>
              <p className="text-sm text-slate-500 mb-5">Makes enough for 8–10 people. Best made 1–2 days ahead.</p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-black text-indigo-700 uppercase tracking-wide mb-3">Ingredients</p>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    {[
                      '3 medium apples, peeled and very finely chopped (Fuji or Gala)',
                      '¾ cup walnuts, finely chopped',
                      '1½ tsp ground cinnamon',
                      '3–4 tbsp sweet kosher-for-Passover red wine (Manischewitz or similar)',
                      '1 tbsp honey (optional)',
                    ].map((ing, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-black text-indigo-700 uppercase tracking-wide mb-3">Instructions</p>
                  <ol className="space-y-3 text-slate-700 text-sm">
                    {[
                      'Peel and finely dice the apples — dice small so the charoset holds together. Do not grate; grating makes it too wet.',
                      'Combine apples, walnuts, cinnamon, wine, and honey in a bowl. Mix well.',
                      'Taste and adjust — add more wine for a more complex flavor, more cinnamon for warmth.',
                      'Cover and refrigerate at least 2 hours (overnight is better). The flavors meld and it becomes more paste-like.',
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-700 text-white text-xs font-black flex items-center justify-center mt-0.5">{i + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <Link
                to="/recipes/passover"
                className="inline-block bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-md"
              >
                View Full Passover Recipes →
              </Link>
            </div>
          </div>
        )}

        {/* TIMELINE TAB */}
        {activeTab === 'timeline' && (
          <div id="timeline" className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800 leading-relaxed">
              <strong>Passover 2026:</strong> First Seder is Wednesday night, April 1. Second Seder (Diaspora) is Thursday night, April 2. Passover ends Thursday night, April 9 in the Diaspora (Wednesday night, April 8 in Israel).
            </div>

            {timelineItems.map((block) => (
              <div key={block.day} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-indigo-700 px-6 py-4">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-black text-white text-lg">{block.day}</h3>
                    <span className="text-indigo-200 text-sm font-semibold">{block.date}</span>
                  </div>
                </div>
                <ul className="p-6 space-y-3">
                  {block.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-indigo-400 flex-shrink-0" />
                      <span className="leading-relaxed text-sm">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* SEDER PLATE TAB */}
        {activeTab === 'seder-plate' && (
          <div id="seder-plate" className="space-y-4">
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 text-sm text-indigo-800 leading-relaxed">
              The Seder plate (ke'ara) holds six symbolic foods, each representing an aspect of the Passover story. It is placed at the center of the table before the Seder begins. The three matzot used during the Seder are separate — typically covered with a cloth alongside or beneath the Seder plate.
            </div>

            {sederPlateItems.map((item) => (
              <div key={item.name} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-7">
                <div className="flex items-start gap-4">
                  <span className="text-4xl flex-shrink-0">{item.emoji}</span>
                  <div>
                    <h3 className="font-black text-slate-900 text-lg mb-2">{item.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3">
                      <span className="font-semibold text-slate-700">What it symbolizes: </span>{item.symbol}
                    </p>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      <span className="font-semibold">How to prepare it: </span>{item.how}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Hillel sandwich note */}
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-7">
              <h3 className="font-black text-slate-900 text-lg mb-2">The Hillel Sandwich (Korech)</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                During the Seder, the korech step involves making a sandwich of matzo, bitter herb (maror), and charoset, following the practice of the ancient sage Hillel. Use the romaine lettuce (chazeret) from the Seder plate, or more horseradish. The sweetness of the charoset offsets the bitterness of the maror.
              </p>
            </div>

            {/* Afikomen */}
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-7">
              <h3 className="font-black text-slate-900 text-lg mb-2">The Afikomen</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                In many communities, three matzot are placed on the Seder table. The middle one is broken early in the Seder — the smaller piece goes back between the other two, and the larger piece becomes the afikomen. The afikomen is hidden by the leader (or stolen by children) and redeemed for a prize at the end of the meal. The Seder does not conclude until the afikomen is found and eaten.
              </p>
            </div>
          </div>
        )}

        {/* SHOPPING LIST TAB */}
        {activeTab === 'shopping' && (
          <div id="shopping" className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800 leading-relaxed">
              <strong>Check items off as you shop.</strong> Recipes are designed to be chametz-free. For packaged ingredients, use products certified Kosher for Passover. Kitniyot practices vary by community. Your progress saves in this browser session.
            </div>

            {shoppingList.map((section) => (
              <div key={section.category} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-indigo-50 border-b border-indigo-100 px-6 py-3">
                  <h3 className="font-black text-sm uppercase tracking-wide text-indigo-700">{section.category}</h3>
                </div>
                <ul className="p-4 space-y-1">
                  {section.items.map((item) => {
                    const id = `${section.category}:${item}`;
                    const checked = checkedItems.has(id);
                    return (
                      <li key={item}>
                        <button
                          onClick={() => toggleCheck(id)}
                          className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${checked ? 'bg-indigo-50' : 'hover:bg-slate-50'}`}
                        >
                          <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${checked ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}>
                            {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                          </span>
                          <span className={`text-sm leading-relaxed ${checked ? 'line-through text-slate-400' : 'text-slate-700'}`}>{item}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            <div className="text-center pt-2">
              <a
                href={AMAZON_LINK}
                onClick={() => window.gtag('event', 'affiliate_click', { link_url: 'https://amzn.to/40ZcXPs', link_text: 'amazon_fresh_passover' })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-md"
              >
                Order Passover Groceries on Amazon Fresh →
              </a>
            </div>
          </div>
        )}

        {/* FAQ */}
        <div id="faq" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mt-10">
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "When is Passover 2026?",
                a: "Passover 2026 begins Wednesday evening, April 1, 2026. The first Seder is Wednesday night, April 1. The second Seder (Diaspora) is Thursday night, April 2. Passover ends Thursday night, April 9 in the Diaspora (Wednesday night, April 8 in Israel).",
              },
              {
                q: "What food goes on the Seder plate?",
                a: "The Seder plate holds six symbolic foods: shank bone (zeroa) representing the Passover sacrifice; roasted egg (beitzah) representing spring and renewal; bitter herbs such as horseradish (maror) representing the bitterness of slavery; charoset (a sweet paste of apples, nuts, and wine) representing the mortar used by Hebrew slaves; parsley or another vegetable (karpas) representing spring; and a second bitter herb (chazeret) usually romaine lettuce.",
              },
              {
                q: "How far in advance can I make Passover food?",
                a: "Brisket is best made 1–2 days ahead — it slices more cleanly when cold and the flavor deepens overnight. Matzo ball soup broth can be made 1–2 days ahead; add matzo balls the day of the Seder. Flourless chocolate cake is excellent made the day before. Roasted chicken and vegetables are best made day-of.",
              },
              {
                q: "How many matzot are needed for a Seder?",
                a: "In many communities, three whole matzot are placed on the Seder table — the middle one is broken for yachatz and the afikomen. For eating during the meal, plan roughly 1 box of matzo per 4–6 people. Make sure your matzo is certified kosher for Passover.",
              },
              {
                q: "How much wine do I need for a Passover Seder?",
                a: "Each participant needs enough wine or grape juice for four ritual cups; exact amounts depend on cup size and custom. Have both wine and grape juice available so all guests can participate.",
              },
            ].map(({ q, a }, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-5">
                <p className="font-bold text-slate-900 mb-2">{q}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-indigo-700 rounded-3xl p-8 mt-8 text-center text-white">
          <h2 className="text-2xl font-black mb-2">Need a Custom Passover Recipe?</h2>
          <p className="text-indigo-200 mb-6 text-sm">Tell PantryPivot what you have — we'll generate a Kosher for Passover recipe in under a minute.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={PANTRYPIVOT_LINK}
              className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold py-3 px-8 rounded-2xl transition-all shadow-md"
            >
              Generate a Passover Recipe →
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="border-2 border-indigo-400 hover:border-white text-white font-bold py-3 px-8 rounded-2xl transition-all"
            >
              {copied ? '✓ Link copied!' : 'Share this planner'}
            </button>
          </div>
        </div>

        {/* More Recipes */}
        <div className="mt-10">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">More Passover & Kosher Recipes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Link to="/recipes/passover" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-indigo-700">
              <span className="text-2xl">🍷</span> Passover Recipes
            </Link>
            <Link to="/recipes/roast-chicken" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍗</span> Roast Chicken
            </Link>
            <Link to="/recipes/chicken-soup" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍜</span> Chicken Soup
            </Link>
            <Link to="/recipes/beef-stew" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🥩</span> Beef Stew
            </Link>
            <Link to="/recipes/shakshuka" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">🍳</span> Shakshuka
            </Link>
            <Link to="/kosher-recipes" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all font-semibold text-slate-700 hover:text-orange-600">
              <span className="text-2xl">✡️</span> Kosher Hub
            </Link>
          </div>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto px-4 pt-10 pb-8 border-t border-slate-200 mt-12">
        <div className="text-center mb-6">
          <a href="https://pantrypivot.com" className="inline-block bg-slate-900 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-2xl transition-all text-sm">
            Generate More Recipes on PantryPivot →
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-8 text-sm">
          <Link to="/recipes/passover" className="text-slate-500 hover:text-indigo-700 transition-colors">Passover Recipes</Link>
          <Link to="/recipes/roast-chicken" className="text-slate-500 hover:text-orange-600 transition-colors">Roast Chicken</Link>
          <Link to="/recipes/chicken-soup" className="text-slate-500 hover:text-orange-600 transition-colors">Chicken Soup</Link>
          <Link to="/recipes/beef-stew" className="text-slate-500 hover:text-orange-600 transition-colors">Beef Stew</Link>
          <Link to="/recipes/shakshuka" className="text-slate-500 hover:text-orange-600 transition-colors">Shakshuka</Link>
          <Link to="/kosher-recipes" className="text-slate-500 hover:text-orange-600 transition-colors">Kosher Recipes</Link>
        </div>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed text-center">
          Disclosure: PantryPivot participates in the Amazon Associates Program. <br />
          As an Amazon Associate, we may earn from qualifying purchases at no additional cost to you.
        </p>
      </footer>
    </div>
  );
};

export default PassoverSederPlanner;
