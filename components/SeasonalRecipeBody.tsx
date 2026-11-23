import type { ReactNode } from 'react';

export default function SeasonalRecipeBody({ ingredients, steps }: {
  ingredients: { item: string; amount: string }[];
  steps: ReactNode[];
}) {
  return <div className="season-recipe-body">
    <div><h4>Ingredients</h4>
      <ul>{ingredients.map(({item, amount}) => <li key={item}><strong>{amount}</strong> {item}</li>)}</ul>
    </div>
    <div><h4>Preparation steps</h4>
      <ol>{steps.map((step, i) => <li key={i}>{step}</li>)}</ol>
    </div>
  </div>;
}
