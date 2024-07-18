import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        didot: ["'Didot', 'Didot LT STD', 'Hoefler Text', 'Garamond', 'Times New Roman', serif"],
      },
      colors: {
        primary: "#C94D03",
         main: "#FFEDCC"
      },
    },
  },
  plugins: [],
} satisfies Config;