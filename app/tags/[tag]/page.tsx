import { PostCard } from "nextra-theme-blog";
import { getPosts, getTags } from "@/app/_services/get-posts";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ tag: string }>;
}) {
	const tag = (await params).tag;
	return {
		title: `Posts Tagged with “${decodeURIComponent(tag)}”`,
	};
}

export async function generateStaticParams() {
	const allTags = await getTags();
	return [...new Set(allTags)].map((tag) => ({ tag }));
}

export default async function TagPage({
	params,
}: {
	params: Promise<{ tag: string }>;
}) {
	const { title } = await generateMetadata({ params });
	const posts = await getPosts();
	const tag = (await params).tag;
	return (
		<>
			<h1>{title}</h1>
			{posts
				.filter((post) =>
					post.frontMatter.tags.includes(decodeURIComponent(tag)),
				)
				.map((post) => (
					<PostCard key={post.route} post={post} />
				))}
		</>
	);
}
