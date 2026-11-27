import { Link } from 'react-router-dom';
import { catalog, DISCLOSURE, type PickId } from '../affiliateCatalog';

export function track(name: string, fields: Record<string, string> = {}) {
  (window as any).gtag?.('event', name, fields);
}

export function AmazonLink({
  id,
  eventLabel,
  className,
  compact,
  placement,
  label: customLabel,
}: {
  id: PickId;
  label?: string;
  eventLabel?: string;
  className?: string;
  compact?: boolean;
  placement?: string;
}) {
  const item = catalog[id];
  const label =
    customLabel ??
    (item.kind === 'Product' ? item.name + ' on Amazon' : item.kind === 'Grocery/Pantry' ? 'Browse ' + item.name : 'Browse options on Amazon · ' + item.name);
  return (
    <span>
      <a
        href={item.url}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className={className ? 'inline-block ' + className : 'font-semibold text-orange-800 underline underline-offset-4'}
        onClick={() =>
          track('affiliate_click', {
            event_label: eventLabel || id,
            product: id,
            link_text: eventLabel || id,
            link_url: item.url,
            item_type: item.kind,
            event_category: item.kind === 'Product' ? 'amazon_tool' : item.kind === 'Grocery/Pantry' ? 'amazon_storefront' : 'amazon_category',
            placement: placement || window.location.pathname,
          })
        }
      >
        {label}
      </a>
      {!compact && (
        <small className="block mt-1 text-slate-600">
          {DISCLOSURE} {id === 'amazon_same_day_delivery' && 'Availability varies by location.'}
        </small>
      )}
    </span>
  );
}

export function PicksEntry() {
  return (
    <aside className="season-promo print:hidden">
      <div>
        <strong>Getting your kitchen ready for the holidays?</strong>
        <p>Cookware, prep tools and storage essentials.</p>
      </div>
      <Link
        to="/holiday-kitchen-picks"
        onClick={() => track('holiday_picks_opened', { placement: location.pathname })}
      >
        See holiday kitchen picks →
      </Link>
    </aside>
  );
}

const groups: Record<string, PickId[]> = {
  'Roasting and baking': [
    'nordic_ware_sheet_pan',
    'cuisinart_dutch_oven',
    'lodge_dutch_oven',
    'lodge_cast_iron_skillet',
    'roasting_pans_with_racks',
    'sheet_pans',
    'pie_dishes',
    'cookware',
    'instant_read_thermometers',
  ],
  'Prep tools': [
    'henckels_chefs_knife',
    'victorinox_chefs_knife',
    'oxo_measuring_cups_cr',
    'oxo_measuring_cups_atk',
    'vollrath_mixing_bowls',
    'cuisinart_mixing_bowls',
    'potato_mashers',
  ],
  'Small appliances': [
    'kitchenaid_stand_mixer',
    'allclad_immersion_blender',
    'breville_immersion_blender',
    'cuisinart_food_processor',
    'breville_food_processor',
    'instant_pot_multicooker',
    'zojirushi_multicooker',
    'ninja_air_fryer',
    'instant_vortex_air_fryer',
    'immersion_blenders',
  ],
  'Leftovers and storage': ['food_storage_containers', 'freezer_bags'],
};
export default function HolidayPicks() {
  return (
    <main className="season">
      <Link to="/">← PantryPivot</Link>
      <h1>Holiday kitchen picks</h1>
      <p>{DISCLOSURE}</p>
      <Link to="/thanksgiving">Thanksgiving meal planner →</Link>
      <section id="air-fryer-guide" aria-labelledby="air-fryer-guide-title">
        <h2 id="air-fryer-guide-title">One basket, two baskets, or a sheet pan?</h2>
        <p>Choose based on what you usually cook together.</p>
        <ul>
          <li>
            <strong>One batch at a time.</strong> For a lunch of crisp stuffing patties,
            the Instant Vortex Plus gives you one 6-quart basket for the whole batch.{' '}
            <AmazonLink id="instant_vortex_air_fryer" compact placement="holiday_air_fryer_guide" />
          </li>
          <li>
            <strong>Two sides with different cooking times.</strong> The Ninja Foodi DualZone
            splits its 8 quarts between two baskets. Give potatoes a head start and cook
            the second side on its own setting.{' '}
            <AmazonLink id="ninja_air_fryer" compact placement="holiday_air_fryer_guide" />
          </li>
          <li>
            <strong>A tableful of people.</strong> If you already have a rimmed half sheet,
            use it in the oven and spread the potatoes in one layer. If you need pans,
            the Nordic Ware Naturals listing includes two.{' '}
            <AmazonLink id="nordic_ware_sheet_pan" compact placement="holiday_air_fryer_guide" />
          </li>
        </ul>
      </section>
      <div className="season-grid">
        {Object.entries(groups).map(([group, ids]) => (
          <section key={group}>
            <h2>{group}</h2>
            <ul>
              {ids.map((id) => (
                <li key={id}>
                  <AmazonLink id={id} compact />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
