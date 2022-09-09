/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: [
        "Heebo",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      mono: ["Menlo", "Monaco", "Courier New", "monospace"],
    },
    fontSize: {
      tiny: "0.625rem",
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    colors: {
      button: "var(--color-primary)",
      transparent: "transparent",
      primary: {
        DEFAULT: "var(--color-primary)",
        dark: "var(--color-primary-dark)",
      },
      accent: {
        DEFAULT: "var(--color-accent)",
        hover: "var(--color-accent-hover)",
        disabled: "var(--color-accent-disabled)",
      },
      black: "#000",
    },
    extend: {
      spacing: {
        "5l": "10rem",
        "n1/2": "-50%",
        400: "400px",
        300: "300px",
      },
      boxShadow: {
        outlineLg: "0 0 0 4pt var(--color-primary-800)",
        outlineMd: "0 0 0 2pt var(--color-primary-800)",
        outlineSm: "0 0 0 1pt var(--color-primary-800)",
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0px",
        4: "4px",
        2: "2px",
      },
      outline: {
        "no-chrome": "none",
      },
      keyframes: {
        breathe: {
          "0%, 100%": {
            boxShadow: "0 0 20px 2px var(--color-primary-100-translucent)",
            borderColor: "var(--color-primary-300)",
          },
          "50%": {
            boxShadow: "0 0 20px 2px transparent",
            borderColor: "var(--color-primary-700)",
          },
        },
      },
      animation: {
        "breathe-slow": "breathe 5s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
