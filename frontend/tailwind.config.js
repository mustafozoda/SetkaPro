/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // DARK
        background: '#0f0f1a',
        card: '#1a1b2f',
        accent: '#94b3fd',
        emeraldAccent: '#34d399',
        fuchsiaAccent: '#f472d0',
        borderLine: '#2c2d3e',
        hoverDark: '#1f2233',

        // LIGHT
        lightBg: '#73A1C4',
        lightCard: '#ffffff',
        lightText: '#1f2937',
        lightAccent: '#5c6ac4',
        lightBorder: '#e2e8f0',
        lightHover: '#e8edf3',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to bottom right, #111827, #0c0c1c, #131324)',
      },
      borderWidth: {
        'double': '3px',
      },
      borderStyle: {
        'dotted': 'dotted',
        'double': 'double',
      },
      transitionProperty: {
        'bg': 'background-color',
      },
    },
  },
  plugins: [],
}
