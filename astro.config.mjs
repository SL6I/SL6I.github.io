// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    site: 'https://sl6i.github.io',
    base: '/', // Root deployment for username.github.io
    integrations: [
        tailwind()
    ],
});
