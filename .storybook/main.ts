import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: [
    // '../stories/**/*.mdx', // MDX requires essentials addon - temporarily disabled
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@storybook/addon-vitest',
  ],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],
  viteFinal: async config => {
    if (config.optimizeDeps) {
      config.optimizeDeps.exclude = [...(config.optimizeDeps.exclude || []), 'react-leaflet'];
    }
    return config;
  },
};
export default config;
