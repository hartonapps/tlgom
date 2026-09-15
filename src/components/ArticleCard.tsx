import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

export default function ArticleCard({ post }: { post: BlogPost }) { return <Link className="homepage-article-card" href={`/blog/${post.slug}`}><div className="homepage-article-image" style={{ backgroundImage: post.featuredImage ? `url("${post.featuredImage}")` : undefined }}>{!post.featuredImage && <FileText size={26} />}</div><div className="homepage-article-copy"><small>{post.category || "TLGOM journal"} · {post.readTime || 4} min read</small><h3>{post.title}</h3><p>{post.excerpt || "Read the latest encouragement and ministry insight from TLGOM."}</p><span>Read article <ArrowRight size={15} /></span></div></Link>; }
