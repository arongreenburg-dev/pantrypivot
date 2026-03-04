import type { WizardState } from "../types";

type AnyResp = any;

async function postJSON(path: string, body: any): Promise<AnyResp> {
  const resp = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`API error ${resp.status}: ${txt}`);
  }

  return resp.json();
}

export async function generateRecipes(input: WizardState): Promise<AnyResp> {
  return postJSON("/api/generateRecipes", input);
}

export async function generateIdeas(input: WizardState): Promise<AnyResp> {
  return postJSON("/api/generateIdeas", input);
}

export async function generateRecipesStream(input: any): Promise<AnyResp> {
  return generateRecipes(input);
}

export async function generateIdeasStream(input: any): Promise<AnyResp> {
  return generateIdeas(input);
}
