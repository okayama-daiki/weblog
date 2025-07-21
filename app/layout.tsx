import { Head, Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { Footer, Layout, Navbar, ThemeSwitch } from "nextra-theme-blog";
import "nextra-theme-blog/style.css";
import "katex/dist/katex.min.css";

export const metadata = {
	title: "Daiki Okayama's Weblog",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<Head backgroundColor={{ dark: "#0f172a", light: "#fefce8" }} />
			<body>
				<Layout>
					<Navbar pageMap={await getPageMap()}>
						<Search />
						<ThemeSwitch />
					</Navbar>

					{children}

					<Footer>
						<abbr
							title="This site and all its content are licensed under a Massachusetts Institute of Technology (MIT) License."
							style={{ cursor: "help" }}
						>
							MIT License
						</abbr>{" "}
						{new Date().getFullYear()} © Daiki Okayama.
						<a href="/feed.xml" style={{ float: "right" }}>
							RSS
						</a>
					</Footer>
				</Layout>
			</body>
		</html>
	);
}
