import { AmazonLink } from './HolidayPicks';
import { DISCLOSURE } from '../affiliateCatalog';

export default function ProductRecommendations({
  heading = 'Recommended kitchen tools',
}: {
  heading?: string;
  products?: unknown[];
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-bold">{heading}</h2>
      <p>{DISCLOSURE}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {(
          [
            'victorinox_chefs_knife',
            'lodge_cast_iron_skillet',
            'nordic_ware_sheet_pan',
            'cuisinart_dutch_oven',
            'vollrath_mixing_bowls',
            'kitchenaid_stand_mixer',
          ] as const
        ).map((id) => (
          <AmazonLink key={id} id={id} eventLabel={id + '_results'} placement="results" compact />
        ))}
      </div>
    </section>
  );
}
