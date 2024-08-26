/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,vue,ts}"],
	theme: {
		fontFamily: {
			mono: ['"Roboto Mono"', "mono"]
		},
		extend: {
			fontSize: {
				"2xs": ["0.7rem", "1rem"],
				"3xs": ["0.6rem", "0.95rem"]
			}
		}
	},
	plugins: []
};
