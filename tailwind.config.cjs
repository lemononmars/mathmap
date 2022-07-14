/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      thai: ['Noto Serif Thai', 'serif']
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ['corporate']
  }
}
