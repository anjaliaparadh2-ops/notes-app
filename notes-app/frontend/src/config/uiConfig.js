// -----------------------------------------------------------------------------
// UI CONFIG
// Centralized Tailwind utility strings for recurring elements (cards, buttons,
// inputs). Change a value here and every component using it updates at once.
// Colors/fonts themselves live in src/index.css as CSS variables — this file
// just controls layout/spacing/shape presets built on top of them.
// -----------------------------------------------------------------------------

export const ui = {
  page: "min-h-screen flex flex-col bg-surface-alt",
  container: "w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",

  card: "bg-surface border border-border rounded-card shadow-card hover:shadow-card-hover transition-shadow duration-200",
  cardPadding: "p-5 sm:p-6",

  heading1: "font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-primary tracking-tight",
  heading2: "font-heading text-xl sm:text-2xl font-semibold text-primary",
  bodyText: "text-text-main text-sm sm:text-base",
  mutedText: "text-text-muted text-sm",

  btnPrimary:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-primary-dark active:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed",
  btnAccent:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed",
  btnOutline:
    "inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-main transition-colors duration-150 hover:bg-surface-alt",

  input:
    "w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent transition",

  label: "block text-sm font-medium text-text-main mb-1.5",
};

export default ui;
