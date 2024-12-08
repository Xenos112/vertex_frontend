import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        background: "var(--background)",
      },
      colors: {
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        "primary-disabled": "var(--primary-disabled)",
        "forground-disabled": "var(--forground-disabled)",
        grayish: "var(--grayish)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
