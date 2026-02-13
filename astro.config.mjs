// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";


import icon from "astro-icon";



import preact from "@astrojs/preact";



import vercel from "@astrojs/vercel";



import sitemap from "@astrojs/sitemap";



// https://astro.build/config
export default defineConfig({
  site: "https://telepro.cl",
  vite: {
    plugins: [tailwindcss()],
  },

  output: 'server',
  integrations: [icon(), preact(), sitemap()],
  adapter: vercel(),
});
