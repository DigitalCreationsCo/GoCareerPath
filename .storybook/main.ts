import type { StorybookConfig } from '@storybook/nextjs-vite';
import { configDotenv } from 'dotenv';

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.@(js|jsx|mjs|ts|tsx)",
    "../components/emails/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../design-system/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    // "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": '@storybook/nextjs-vite',
    "options": {},
  },
  "docs": {
    "autodocs": false
  },
  env: (() => {
    const envPath = process.env.NODE_ENV === 'production' ? '../.env' : '../.env.local';
    const result = configDotenv({ path: envPath });
    return result.parsed || {};
  })(),
};
export default config;
