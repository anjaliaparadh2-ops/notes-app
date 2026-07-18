// Keep this list in sync with backend/models/Note.js SUBJECTS array.
export const SUBJECTS = [
  "Electrical Circuit Analysis",
  "Signals & Systems",
  "Analog and Digital Electronics",
  "Numerical Methods for Computer Programming",
];

// URL-safe slug for routing, e.g. "/subject/electrical-circuit-analysis"
export const toSlug = (subject) =>
  subject.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const fromSlug = (slug) => {
  const match = SUBJECTS.find((s) => toSlug(s) === slug);
  return match || null;
};
