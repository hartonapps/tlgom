import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getPublicCollection } from "@/lib/firebase/public-data";
import type { BlogPost } from "@/lib/blog";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Articles | The Life Global Outreach Ministries", description: "Read biblical encouragement, ministry news, teaching, and Christian articles from The Life Global Outreach Ministries.", alternates: { canonical: "/blog" }, openGraph: { title: "Articles | TLGOM", description: "Read Christian articles and ministry updates from TLGOM.", url: "/blog", type: "website", images: [{ url: "/logo.png", width: 512, height: 512, alt: "The Life Global Outreach Ministries logo" }] } };

export default async function BlogPage() { const posts = await getPublicCollection("blogPosts") as BlogPost[]; const published = posts.filter((post) => post.status === "published"); return <main className="blog-page"><SiteHeader /><section className="blog-hero"><div className="container"><p className="section-kicker">TLGOM journal</p><h1>Articles</h1><p>Biblical encouragement, ministry insight, and stories to help you grow in faith.</p></div></section><section className="blog-content"><div className="container"><div className="blog-grid">{published.length ? published.map((post) => <Link className="blog-card" href={`/blog/${post.slug}`} key={post.id}>{post.featuredImage && <img src={post.featuredImage} alt={post.featuredImageAlt || post.title} />}<div><small>{post.category || "TLGOM journal"} · {post.readTime || 4} min read</small><h2>{post.title}</h2><p>{post.excerpt}</p><span>Read article →</span></div></Link>) : <div className="blog-empty"><h2>No articles yet</h2><p>New articles will appear here soon.</p></div>}</div></div></section><SiteFooter /></main>; }
