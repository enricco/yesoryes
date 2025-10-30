/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f6f0e6',
        ink: '#1f1a16',
        graphite: '#50473f',
        blush: '#e9a9b2',
        moss: '#6f8b7c',
        tape: '#f4d9a6',
        parchment: '#efe6d7',
      },
      fontFamily: {
        hand: ['"Mansalva"', 'cursive'],
        body: ['"Pangolin"', 'cursive'],
      },
      backgroundImage: {
        'noise-soft': "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\" viewBox=\"0 0 200 200\"><filter id=\"n\" x=\"0\" y=\"0\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.75\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.08\" /></svg>')",
      },
      boxShadow: {
        deckle: '0 20px 50px rgba(31, 26, 22, 0.2)',
      },
      screens: {
        xs: '420px',
      },
    },
  },
  plugins: [],
};
