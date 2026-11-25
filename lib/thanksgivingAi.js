// Gemini picks one dish per course from fixed candidate lists. The schema limits every
// answer to the candidate names, so the model cannot return an index that is out of range.

export function validCourses(courses) {
  if (!Array.isArray(courses) || courses.length < 4 || courses.length > 5) return null;
  try {
    const lists = courses.map((x) => (typeof x === 'string' && x.length <= 800 ? JSON.parse(x) : null));
    return lists.every(
      (items) =>
        Array.isArray(items) &&
        items.length > 0 &&
        items.length <= 6 &&
        items.every((x) => typeof x === 'string' && x.trim() && x.length <= 120),
    )
      ? lists
      : null;
  } catch {
    return null;
  }
}

export function selectionPrompt(lists, influence, effort) {
  return [
    'You are planning a cohesive Thanksgiving menu.',
    'For each course, choose exactly one dish from that course\'s candidates, copying the name exactly.',
    `Cuisine influence: ${influence}`,
    `Effort: ${effort}`,
    'Courses:',
    ...lists.map((items, i) => `course${i}: ${items.join(' | ')}`),
    'Return JSON with one key per course, e.g. {"course0": "<dish name>"}.',
  ].join('\n');
}

export function selectionSchema(lists) {
  const properties = Object.fromEntries(
    lists.map((items, i) => [`course${i}`, { type: 'string', enum: [...new Set(items)] }]),
  );
  return {
    type: 'object',
    properties,
    required: Object.keys(properties),
  };
}

const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

// Accepts the schema shape, plus older shapes ({choices:[...]}, names or indices),
// so a model that drifts from the schema still yields a usable menu.
export function parseChoices(data, lists) {
  const raw = Array.isArray(data?.choices)
    ? data.choices
    : lists.map((_, i) => data?.[`course${i}`]);
  if (raw.length !== lists.length) return null;
  const choices = raw.map((v, i) => {
    const items = lists[i];
    if (Number.isInteger(v)) return v >= 0 && v < items.length ? v : -1;
    if (typeof v !== 'string') return -1;
    const exact = items.indexOf(v);
    if (exact >= 0) return exact;
    const n = norm(v);
    return items.findIndex((x) => norm(x) === n);
  });
  return choices.every((n) => n >= 0) ? choices : null;
}
