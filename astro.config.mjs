// @ts-check

import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	integrations: [react()],
	  image: {
    domains: ['localhost:1337', 'majestic-garden-e773358a80.strapiapp.com'], // e.g. 'cms.adamsnape.xyz' or 'localhost:1337'
  },
	vite: {
		server: {
			// This section only runs in development mode by default
			proxy: {
				// When Astro's dev server receives a request for '/uploads/'...
				"/uploads": {
					// ...it forwards that request to your local Strapi backend.
					target: "http://localhost:1337",

					// This ensures the Host header is correctly set for the target
					changeOrigin: true,

					// The rewrite is optional, but helps keep the path clean
					// It removes '/uploads' from the path before forwarding,
					// but Strapi usually handles the path correctly even without it.
					// rewrite: (path) => path.replace(/^\/uploads/, '/uploads'),
				},

				// OPTIONAL: Add a proxy for the entire API if your frontend needs it.
				"/api": {
					target: "http://localhost:1337",
					changeOrigin: true,
				},
			},
		},
	},
});
