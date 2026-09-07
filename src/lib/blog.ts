export type ArticleBlockType = "paragraph" | "heading" | "image" | "gallery" | "quote" | "bullet-list" | "numbered-list" | "callout" | "divider" | "link-embed" | "cta-button";
export type ArticleImage = { url: string; alt: string };
export type ArticleBlock = { id: string; type: ArticleBlockType; content?: string; level?: 2 | 3; imageUrl?: string; imageAlt?: string; images?: ArticleImage[]; author?: string; title?: string; variant?: "info" | "tip" | "warning"; label?: string; url?: string };
export type BlogPost = { id: string; title: string; slug: string; excerpt: string; category: string; readTime: number; featuredImage: string; featuredImageAlt: string; blocks: ArticleBlock[]; seoTitle: string; metaDescription: string; keywords: string[]; ogTitle: string; ogDescription: string; ogImage: string; tags: string[]; status: "draft" | "published"; createdAt?: unknown; updatedAt?: unknown; publishedAt?: unknown };

export const emptyBlogPost = (id = ""): BlogPost => ({ id, title: "", slug: "", excerpt: "", category: "", readTime: 4, featuredImage: "", featuredImageAlt: "", blocks: [], seoTitle: "", metaDescription: "", keywords: [], ogTitle: "", ogDescription: "", ogImage: "", tags: [], status: "draft" });

export function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
