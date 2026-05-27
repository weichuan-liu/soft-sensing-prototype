/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        app: "#000028",
        surface: "#171739",
        cyan: "#00CCCC",
        mint: "#00FFB9",
        success: "#01D65A",
        warning: "#FFD732",
        danger: "#FF2640",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["SFMono-Regular", "Consolas", "Liberation Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 12px 26px rgba(0, 204, 204, 0.14)",
      },
    },
  },
  plugins: [],
};
