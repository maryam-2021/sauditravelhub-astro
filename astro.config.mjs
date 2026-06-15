// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  // Suppress the <meta name="generator" content="Astro v..."> tag
  // to avoid disclosing tech stack version info to automated scanners.
  metaGenerator: false,
  vite: {
    plugins: [tailwindcss()]
  }
});