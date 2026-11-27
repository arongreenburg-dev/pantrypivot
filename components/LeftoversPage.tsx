import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LeftoversBox from './LeftoversBox';

export default function LeftoversPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Thanksgiving Leftover Recipes | PantryPivot';
    return () => {
      document.title = prev;
    };
  }, []);
  return (
    <main className="season">
      <Link to="/">← PantryPivot</Link>
      <h1>Turn your leftovers into new meals</h1>
      <p className="season-lede">
        Type what's in your fridge after Thanksgiving. You'll get three recipes that use it up.
      </p>
      <LeftoversBox />
      <p>
        Planning next year's menu? <Link to="/thanksgiving">Try the Thanksgiving planner →</Link>
      </p>
    </main>
  );
}
