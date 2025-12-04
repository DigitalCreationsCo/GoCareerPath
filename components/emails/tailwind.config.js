import sharedConfig from '../../design-system/tailwind.config.shared.js';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [sharedConfig],
  content: ['./**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
      },
    },
  },
};
