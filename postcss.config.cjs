// postcss.config.cjs

module.exports = {
	plugins: {
		"postcss-preset-env": {
			// Stage 3 means stable features are enabled.
			// This includes the CSS Nesting specification.
			stage: 3,

			// Optionally specify browser support (e.g., last 2 major versions)
			// This is necessary for some polyfills to work correctly.
			browsers: "defaults",
		},
	},
};
