import React from 'react';
import { AFFILIATE_LINKS } from '../constants';

const PantryShortcuts: React.FC = () => {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">Need ingredients?</h2>
        <p className="text-sm text-slate-500 mt-1">Get everything delivered from Amazon</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href={AFFILIATE_LINKS.AMAZON_FRESH}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-sm py-3 px-4 rounded-2xl transition-colors duration-200 shadow-sm hover:shadow-md"
          onClick={() => (window as any).gtag?.('event', 'affiliate_click', {
            event_category: 'amazon_storefront',
            event_label: 'amazon_fresh',
          })}
        >
          Order Ingredients
        </a>
        <a
          href={AFFILIATE_LINKS.PANTRY_ITEMS}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-sm py-3 px-4 rounded-2xl transition-colors duration-200 shadow-sm hover:shadow-md"
          onClick={() => (window as any).gtag?.('event', 'affiliate_click', {
            event_category: 'amazon_storefront',
            event_label: 'amazon_staples',
          })}
        >
          Stock Your Pantry
        </a>
      </div>
    </section>
  );
};

export default PantryShortcuts;
