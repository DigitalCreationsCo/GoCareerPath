import sharedConfig from '../../design-system/tailwind.config.shared.js';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [sharedConfig],
  content: ['./**/*.{js,ts,jsx,tsx,mdx}'],
};
