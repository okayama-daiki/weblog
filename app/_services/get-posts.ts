import { type Item, normalizePages } from "nextra/normalize-pages";
import { getPageMap } from "nextra/page-map";

/**
 * getPosts retrieves a list of posts from the /posts directory.
 * @returns A promise that resolves to an array of post objects.
 */
export async function getPosts(): Promise<Item[]> {
	const { directories } = normalizePages({
		list: await getPageMap("/posts"),
		route: "/posts",
	});
	return directories
		.filter((post) => post.name !== "index")
		.map((post) => {
			if (post.frontMatter === undefined) {
				post.frontMatter = {
					tags: [],
					description: "",
				};
			}
			return post;
		})
		.sort(
			(a, b) =>
				new Date(b.frontMatter.date).getTime() -
				new Date(a.frontMatter.date).getTime(),
		);
}

/**
 * getTags retrieves a list of unique tags from all posts.
 * @returns A promise that resolves to an array of unique tags.
 */
export async function getTags() {
	const posts = await getPosts();
	const tags = posts.flatMap((post) => post.frontMatter.tags);
	return tags;
}
