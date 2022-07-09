/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				brand: 'rgb(var(--color-brand) / <alpha-value>)'
			}
		}
	},
	plugins: []
};
