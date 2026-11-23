const text = (value) => typeof value === 'string' && value.trim().length > 0 && value.length <= 2000;
const list = (value, check, min = 0, max = 60) =>
  Array.isArray(value) && value.length >= min && value.length <= max && value.every(check);
const positive = (value) => Number.isFinite(value) && value > 0 && value <= 10000;

function validDetail(r) {
  return (
    r &&
    text(r.name) &&
    positive(r.servings) &&
    positive(r.timeMinutes) &&
    list(r.ingredients, (i) => text(i?.item) && text(i.amount), 1) &&
    list(r.steps, text, 1) &&
    list(r.substitutions ?? [], text) &&
    list(r.leftovers ?? [], text) &&
    (!r.nutritionEstimate ||
      (['calories', 'protein_g', 'carbs_g', 'fat_g'].every((k) =>
        Number.isFinite(r.nutritionEstimate[k]),
      ) &&
        text(r.nutritionEstimate.disclaimer)))
  );
}
export function validRecipes(data) {
  return (
    validDetail(data?.selectedRecipe) &&
    list(
      data.recipeCards,
      (c) =>
        text(c?.name) &&
        text(c.id) &&
        text(c.rationale) &&
        positive(c.timeMinutes) &&
        text(c.difficulty) &&
        list(c.ingredientsUsed, text) &&
        list(c.extraNeeded, text),
      1,
      5,
    ) &&
    (data.recipeDetails === undefined ||
      (list(data.recipeDetails, validDetail, 1, 5) &&
        data.recipeDetails.length === data.recipeCards.length &&
        data.recipeCards.every((c, i) => c.name === data.recipeDetails[i].name)))
  );
}
export const validIdeas = (data) =>
  list(data?.ideas, (i) => text(i?.name) && text(i.id) && text(i.description), 1, 6);
export function validInput(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).length > 48)
    return false;
  const { ingredientPhoto, ...fields } = body;
  if (JSON.stringify(fields).length > 24000) return false;
  return Object.entries(body).every(([key, v]) =>
    key === 'ingredientPhoto'
      ? typeof v === 'string' &&
        v.length < 6000000 &&
        /^data:image\/(jpeg|png|webp);base64,[a-zA-Z0-9+/=]+$/.test(v)
      : typeof v === 'string'
        ? v.length <= 2000
        : Array.isArray(v)
          ? list(v, text, 0, 50)
          : typeof v === 'boolean' || (Number.isFinite(v) && Math.abs(v) <= 10000),
  );
}
