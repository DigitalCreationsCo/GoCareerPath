import sharedConfig from './design-system/tailwind.config.shared.js';
import tailwindcssAnimate from 'tailwindcss-animate';
import tailwindcssTextshadow from 'tailwindcss-textshadow';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [sharedConfig],
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      transitionDelay: {
        250: '250ms',
      },
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssTextshadow],
};
