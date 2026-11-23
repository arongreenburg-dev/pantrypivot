import { validRecipes, validIdeas } from './apiValidation.js';
import type { WizardState } from '../types';
type AnyResp = any;

async function postJSON(path: string, body: any): Promise<AnyResp> {
  let resp: Response;
  try {
    resp = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(65000),
    });
  } catch {
    throw Error('Couldn’t reach the recipe service. Your inputs are still here. Try again.');
  }
  if (!resp.ok)
    throw Error(
      [400, 413].includes(resp.status)
        ? 'Shorten your request or choose a smaller photo.'
        : 'Recipe generation is temporarily unavailable. Your inputs are still here. Try again later.',
    );
  const data = await resp.json().catch(() => null);
  if (!(path.endsWith('Recipes') ? validRecipes(data) : validIdeas(data)))
    throw Error('The recipe service returned an incomplete answer. Please try again.');
  return data;
}

export async function generateRecipes(input: WizardState): Promise<AnyResp> {
  return postJSON('/api/generateRecipes', input);
}

export async function generateIdeas(input: WizardState): Promise<AnyResp> {
  return postJSON('/api/generateIdeas', input);
}

export async function generateRecipesStream(input: any): Promise<AnyResp> {
  return generateRecipes(input);
}

export async function generateIdeasStream(input: any): Promise<AnyResp> {
  return generateIdeas(input);
}
