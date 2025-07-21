import { useMDXComponents as getBlogMDXComponents } from "nextra-theme-blog"; // nextra-theme-blog or your custom theme

const blogComponents = getBlogMDXComponents({
	DateFormatter: ({ date }) =>
		`Last updated at ${date.toLocaleDateString("en", {
			day: "numeric",
			month: "long",
			year: "numeric",
		})}`,
});

// Merge components
export function useMDXComponents(components: Record<string, React.Component>) {
	return {
		...blogComponents,
		...components,
	};
}
