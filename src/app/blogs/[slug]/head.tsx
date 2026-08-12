import { getBlogBySlug } from "@/lib/store";

export default function Head({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const post = getBlogBySlug(slug);
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  if (!post) {
    return (
      <>
        <title>Pack Home Health | Blog</title>
        <meta name="robots" content="noindex" />
      </>
    );
  }

  const fullUrl = `${site.replace(/\/$/, "")}/blogs/${post.slug}`;
  const imageUrl = `${site.replace(/\/$/, "")}${post.image}`;

  return (
    <>
      <title>{post.title} — Pack Home Health</title>
      <meta name="description" content={post.snippet} />

      {/* Open Graph */}
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.snippet} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.snippet} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  );
}
