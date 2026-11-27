import { Link } from 'react-router-dom';
import { AmazonLink } from './HolidayPicks';
import { DISCLOSURE } from '../affiliateCatalog';

export const STORAGE_PLACEMENT = 'thanksgiving_leftovers_storage';

// Compact storage picks shown under the leftovers form, before and during generation.
export default function LeftoversStorage() {
  return (
    <aside className="leftovers-storage print:hidden" aria-labelledby="leftovers-storage-title">
      <h2 id="leftovers-storage-title">Packing some away?</h2>
      <p>Freeze portions you won't eat within 3–4 days.</p>
      <ul>
        <li>
          <AmazonLink
            id="freezer_bags"
            placement={STORAGE_PLACEMENT}
            label="Gallon freezer bags on Amazon"
            compact
          />
          <span> · Fill, press flat and freeze. Flat bags stack and thaw faster.</span>
        </li>
        <li>
          <AmazonLink
            id="food_storage_containers"
            placement={STORAGE_PLACEMENT}
            label="Glass storage containers with lids on Amazon"
            compact
          />
          <span> · Stack ready-to-reheat meals in the fridge or freezer.</span>
        </li>
      </ul>
      <p className="leftovers-storage-disclosure">Paid links. {DISCLOSURE}</p>
      <Link to="/holiday-kitchen-picks">Full holiday kitchen guide →</Link>
    </aside>
  );
}
