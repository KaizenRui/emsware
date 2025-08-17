/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'custom-cyan': '#00ffff',
      },
      fontSize: {
        sml: '20px',
      },
    },
  },
  plugins: []
};
