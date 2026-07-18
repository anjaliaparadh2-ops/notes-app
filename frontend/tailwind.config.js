/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // These map straight to the CSS variables defined in src/index.css.
      // Change a hex value there and the whole app's palette updates —
      // no need to touch any component file.
      colors: {
        primary: "var(--color-primary)",
        "primary-dark": "var(--color-primary-dark)",
        "primary-light": "var(--color-primary-light)",
        accent: "var(--color-accent)",
        surface: "var(--color-surface)",
        "surface-alt": "var(--color-surface-alt)",
        border: "var(--color-border)",
        "text-main": "var(--color-text-main)",
        "text-muted": "var(--color-text-muted)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        heading: ["var(--font-heading)"],
      },
      borderRadius: {
        card: "var(--radius-card)",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.08)",
        "card-hover": "0 8px 20px -6px rgba(15, 23, 42, 0.15)",
      },
    },
  },
  plugins: [],
};
