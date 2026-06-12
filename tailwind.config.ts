import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        accentSoft: "var(--accent-soft)",
        accentCool: "var(--accent-cool)",
        brown: "var(--brown)",
        surface1: "var(--surface-1)",
        surface2: "var(--surface-2)",
        surface3: "var(--surface-3)"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"]
      },
      maxWidth: {
        prose: "80ch"
      },
      borderRadius: {
        panel: "var(--radius-panel)",
        card: "var(--radius-card)"
      },
      boxShadow: {
        surface: "0 10px 22px var(--surface-shadow)",
        "surface-hover": "0 14px 28px var(--surface-shadow-hover)"
      }
    }
  },
  plugins: []
};

export default config;
