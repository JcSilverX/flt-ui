import type { Config } from "tailwindcss";

type AddUtilities = (utilities: { [key: string]: any }) => void;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backfaceVisibility: {
        hidden: "hidden",
        visible: "visible",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: AddUtilities }) {
      const newUtilities = {
        ".backface-hidden": {
          "backface-visibility": "hidden",
        },
        ".backface-visible": {
          "backface-visibility": "visible",
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
export default config;
