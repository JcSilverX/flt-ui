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
			keyframes: {
				fade: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"caret-blink": {
					"0%,70%,100%": { opacity: "1" },
					"20%,50%": { opacity: "0" },
				},
			},
			animation: {
				fade: "fade 1s ease-in-out",
				"caret-blink": "caret-blink 1.25s ease-out infinite",
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
				".scrollbar-w-none": {
					"scrollbar-width": "none",
				},
				".scrollbar-w-none::-webkit-scrollbar": {
					"scrollbar-width": "none",
				},
			};

			addUtilities(newUtilities);
		},
	],
};
export default config;
