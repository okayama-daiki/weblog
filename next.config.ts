import type { NextConfig } from "next";
import nextra from "nextra";

const withNextra = nextra({
	latex: true,
});

const { experimental: experimentalOptions, ...stableOptions } = withNextra({
	turbopack: {
		resolveAlias: {
			"next-mdx-import-source-file": "./mdx-components.tsx",
		},
	},
});

// We need to exclude the `turbo` option from Nextra's default settings because it is now stable.
const { turbo, ...otherExperimentalOptions } = experimentalOptions || {};

export default {
	...stableOptions,
	experimental: otherExperimentalOptions,
	turbopack: {
		...turbo,
		...stableOptions.turbopack,
		resolveAlias: {
			// Merge resolveAlias from both turbo and stableOptions
			...turbo?.resolveAlias,
			...stableOptions.turbopack?.resolveAlias,
		},
	},
} as NextConfig;
