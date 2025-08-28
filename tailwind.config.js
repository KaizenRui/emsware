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
      keyframes: {
        dropdown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        }
      },
      animation: {
        dropdown: "dropdown 0.4s ease-out",
      },
    },
  },
  plugins: []
};
