// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
    vite: {
    server: {
      // This section only runs in development mode by default
      proxy: {
        // When Astro's dev server receives a request for '/uploads/'...
        '/uploads': {
          // ...it forwards that request to your local Strapi backend.
          target: 'http://localhost:1337',

          // This ensures the Host header is correctly set for the target
          changeOrigin: true,

          // The rewrite is optional, but helps keep the path clean
          // It removes '/uploads' from the path before forwarding,
          // but Strapi usually handles the path correctly even without it.
          // rewrite: (path) => path.replace(/^\/uploads/, '/uploads'),
        },

        // OPTIONAL: Add a proxy for the entire API if your frontend needs it.
        '/api': {
          target: 'http://localhost:1337',
          changeOrigin: true,
        },
      },
    },
  }
});