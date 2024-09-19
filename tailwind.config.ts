/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        didot: ["'Didot', 'Didot LT STD', 'Hoefler Text', 'Garamond', 'Times New Roman', serif"],
        noto: ['"Noto Sans"', 'sans-serif'], // Add Noto Sans here
      },
      colors: {
        primary: "#C94D03",
        main: "#FFEDCC",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function (context: { addUtilities: (utilities: Record<string, any>) => void }) {
      const { addUtilities } = context;
      const newFontUtilities = {
        '.font-noto': {
          fontFamily: '"Noto Sans", sans-serif',
          fontOpticalSizing: 'auto',
          fontStyle: 'normal',
          fontVariationSettings: '"wdth" 100',
        },
        '.font-noto-bold': {
          fontFamily: '"Noto Sans", sans-serif',
          fontWeight: '700',
          fontOpticalSizing: 'auto',
          fontStyle: 'normal',
          fontVariationSettings: '"wdth" 100',
        },
      };

      addUtilities(newFontUtilities);
    },
  ],
};

export default config;
