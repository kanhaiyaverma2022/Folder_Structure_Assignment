export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-100": "#09090B",
        "active-blue":"#2563EB",
        "light-blue":"#2563EB1A",
        "zinc-200": "#E4E4E7"

      },
      fontFamily: {
        sans: ["var(--Fonts-Font-Sans, Geist)", "sans-serif"],
        geist: ['Geist', 'sans-serif'],
      },
      fontSize: {
        "text-lg": [
          "var(--Size-Text-Lg, 18px)",
          {
            lineHeight: "var(--Leading-Leading-7, 28px)",
            fontWeight: "var(--Weight-Font-Semibold, 600)",
          },
        ],
        'xs': ['12px', '20px'],
      },
      spacing: {
        // Custom padding values
        "px-25": "10px",  // horizontal padding
        "px-05": "2px",   // vertical padding
      },
    },
  },
  plugins: [],
}
