/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#111827",  
        steelGray: "#6B7280",      
        pureWhite: "#FFFFFF",   
      },
      fontSize: {
        sml: '20px',
      },
    },
  },
  plugins: []
};
