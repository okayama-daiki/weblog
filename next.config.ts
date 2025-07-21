import nextra from "nextra";

const withNextra = nextra({
	latex: true,
});

export default withNextra({
	turbopack: {
		resolveAlias: {
			"next-mdx-import-source-file": "./src/mdx-components.tsx",
		},
	},
});
