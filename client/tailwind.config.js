/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blueGray: '#E0E5ED',
        lightBlue: '#325184',
        lightGray: '#E0E5ED',
        lightGray1: '#BABABA',
        black1: '#212529',
        red: '#FF0000',
        lightRed: '#F2E2DF',
        textGray: '#2F302C'
      },
      },
    },
  plugins: [],
}
