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
    },
  },
  plugins: [],
} satisfies Config;
