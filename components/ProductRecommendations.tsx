import React from 'react';
import { AffiliateProduct } from '../types';
import { KITCHEN_TOOLS_CATALOG, KitchenTool } from '../affiliateCatalog';
import ReviewerBadge from './ReviewerBadge';

const AMAZON_TAG = 'pantrypivot20-20';

function getAffiliateLink(asin: string): string {
  return `https://www.amazon.com/dp/${asin}/?tag=${AMAZON_TAG}`;
}

const FEATURED_TOOLS = KITCHEN_TOOLS_CATALOG.filter(t =>
  ['victorinox_chefs_knife', 'lodge_cast_iron_skillet',
   'nordic_ware_sheet_pan', 'cuisinart_dutch_oven',
   'vollrath_mixing_bowls', 'kitchenaid_stand_mixer']
  .includes(t.eventLabel)
);

interface ProductRecommendationsProps {
  products: AffiliateProduct[];
  heading?: string;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  products,
  heading = 'Recommended Products',
}) => {
  return (
    <section className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-slate-900">{heading}</h2>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Affiliate Links</span>
        </div>
        <p className="text-sm text-slate-500 mt-1">Top picks from America's Test Kitchen and Consumer Reports</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {FEATURED_TOOLS.map((tool: KitchenTool) => (
          <div
            key={tool.eventLabel}
            className="flex flex-col gap-3 p-4 bg-orange-50 rounded-3xl border-2 border-orange-200 hover:border-orange-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <span className="font-bold text-slate-900 text-xs leading-snug">{tool.name}</span>
            <ReviewerBadge reviewer={tool.reviewer} />
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto w-full text-center bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-xs py-2.5 px-3 rounded-2xl transition-colors duration-200 shadow-sm hover:shadow-md"
              onClick={() => (window as any).gtag?.('event', 'affiliate_click', {
                event_category: 'amazon_tool',
                event_label: tool.eventLabel + '_results',
              })}
            >
              Buy on Amazon →
            </a>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 text-center">Open any recipe to see all 19 recommended tools</p>

      {(products ?? []).length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(products ?? []).map((product) => {
            const href = getAffiliateLink(product.asin);
            return (
              <div
                key={`${product.asin}-${product.name}`}
                className="flex flex-col gap-3 p-5 bg-orange-50 rounded-3xl border-2 border-orange-200 hover:border-orange-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <span className="font-bold text-slate-900 text-sm leading-snug">
                  {product.name}
                </span>

                {product.reviewer && <ReviewerBadge reviewer={product.reviewer} />}

                {product.description && (
                  <p className="text-xs text-slate-500 leading-relaxed">{product.description}</p>
                )}

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mt-auto w-full text-center bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-sm py-3 px-4 rounded-2xl transition-colors duration-200 shadow-sm hover:shadow-md"
                  onClick={() => (window as any).gtag?.('event', 'affiliate_click', { link_url: href, link_text: product.name })}
                >
                  Check Current Price →
                </a>
              </div>
            );
          })}
        </div>
      )}

      <div className="space-y-3 pt-2">
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed text-center">
          Disclosure: PantryPivot participates in the Amazon Associates Program (pantrypivot20-20).{' '}
          As an Amazon Associate, we may earn from qualifying purchases at no additional cost to you.
        </p>
        <p className="text-[10px] text-slate-400 leading-relaxed text-center">
          America's Test Kitchen® and Consumer Reports® are registered trademarks of their respective owners.
          PantryPivot is not affiliated with or endorsed by these organizations.
        </p>
      </div>
    </section>
  );
};

export default ProductRecommendations;
