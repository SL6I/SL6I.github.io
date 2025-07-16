/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        "opensans": ['Open Sans', 'sans-serif'],
        "outfit": ['Outfit', 'sans-serif'],
      },
      colors: {
        'darkBg': '#181a1c',
      },
      backgroundImage: {
        'themeGradient': "linear-gradient(45deg, #ff82f3 0%, #7b13ff 50%, #400d64 100%);",
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      },
      keyframes: {
        loaderLetter: {
          '0%' : {
            opacity: '1',
          },
          '100%' : {
            opacity: '0',
          }
        },
      },
      animation: {
        loader: 'loaderLetter 1.0s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

