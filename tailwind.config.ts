import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        screens: {
          lg: "1200px"
        }
      },
      animation: {
        "fade-in": "fade-in 3s ease-in-out",
        appear: "appear 3010ms",
        "fade-out": "fade-out 300ms ease-in-out",
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
        appear: {
          "0%": {
            left: '100%'
          },
          "30%": {
            left: '0%'
          },
          "80%": {
            left: "0%"
          },
          "100%": {
            left: "100%"
          }
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
