import { defineConfig } from 'astro/config';

// Absolute URLs are needed for og:image and the canonical link. The org site
// emberterm.github.io is served from the root, so no `base`.
export default defineConfig({
  output: 'static',
  site: 'https://emberterm.github.io',
});
