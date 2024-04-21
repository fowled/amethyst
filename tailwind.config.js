module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			sans: ["Inter", "sans-serif"],
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
