import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 3s ease-in-out",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            width: "100%",
          },
          "100%": {
            width: "0%",
          },
        },
      },
      backgroundColor: {
        background: "var(--background)",
      },
      colors: {
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        "primary-disabled": "var(--primary-disabled)",
        "forground-disabled": "var(--forground-disabled)",
        grayish: "var(--grayish)",
        "input-background": "var(--input-background)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
