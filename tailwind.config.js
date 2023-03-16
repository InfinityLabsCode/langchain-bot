/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // to let tailwind know there are classes in constant folder
    // because tailwind css is dumb AF to support dynamic classes
    './constants/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
      }
    },
    screens: {
      mobile: { min: '', max: '650px' },
      tablet : { min: '651', max: '1023px' },
      desktop: { min: '1024px', max: '' }
    }
  },
  plugins: []
};