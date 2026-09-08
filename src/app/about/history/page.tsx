import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { defaultHistoryContent, normalizeHistoryHtml } from "@/lib/history";
import { getPublicDocument } from "@/lib/firebase/public-data";

export const metadata: Metadata = { title: "The Life Global Outreach Ministries History | TLGOM", description: "Discover the history, heritage, milestones, Liberty Convention journey, and continuing story of The Life Global Outreach Ministries.", alternates: { canonical: "/about/history" }, openGraph: { title: "TLGOM History | The Life Global Outreach Ministries", description: "Discover the story and heritage of The Life Global Outreach Ministries.", url: "/about/history", type: "website", images: [{ url: "/logo.png", width: 512, height: 512, alt: "The Life Global Outreach Ministries logo" }] } };

export default async function AboutHistoryPage() { const saved = await getPublicDocument("siteSettings", "history") as Record<string, unknown> | undefined; const content = typeof saved?.content === "string" ? saved.content : defaultHistoryContent; return <main className="about-page history-page"><SiteHeader /><section className="about-hero"><div className="container"><p className="section-kicker">The TLGOM story</p><h1>Our history</h1><p>A journey of faith, people, milestones, Liberty Conventions, service, and the continuing call to take the Word to the world.</p></div></section><section className="about-content"><div className="container history-content"><div className="history-rich-content" dangerouslySetInnerHTML={{ __html: normalizeHistoryHtml(content) }} /></div></section><SiteFooter /></main>; }
