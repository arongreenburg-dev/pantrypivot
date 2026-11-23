import { AmazonLink } from './HolidayPicks';
import { DISCLOSURE } from '../affiliateCatalog';
export default function PantryShortcuts() {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-bold">Need ingredients?</h2>
      <p>Grocery delivery availability varies by location. {DISCLOSURE}</p>
      <div className="flex flex-wrap gap-4">
        <AmazonLink id="amazon_same_day_delivery" eventLabel="amazon_fresh" compact />
        <AmazonLink id="amazon_staples" compact />
      </div>
    </section>
  );
}
