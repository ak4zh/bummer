/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				brand: 'rgb(var(--color-brand) / <alpha-value>)'
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
