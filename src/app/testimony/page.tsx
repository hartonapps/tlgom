import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SubmissionForms from "@/components/SubmissionForms";
import TestimonyCarousel from "@/components/TestimonyCarousel";
import { getPublicCollection } from "@/lib/firebase/public-data";
import type { PublishedTestimony } from "@/lib/testimonies";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Testimonies | The Life Global Outreach Ministries", description: "Read testimonies of God's faithfulness and share what He has done through The Life Global Outreach Ministries.", alternates: { canonical: "/testimony" }, openGraph: { title: "Testimonies | TLGOM", description: "Be encouraged by testimonies of God's faithfulness and share your own story.", url: "/testimony", type: "website", images: [{ url: "/logo.png", width: 512, height: 512, alt: "The Life Global Outreach Ministries logo" }] } };

export default async function TestimonyPage() { const testimonies = (await getPublicCollection("testimonies") as PublishedTestimony[]).filter((item) => item.published && item.message).sort((a, b) => (a.order || 0) - (b.order || 0)); return <main className="testimony-page"><SiteHeader /><section className="testimony-hero"><div className="container"><p className="section-kicker">Stories of God's faithfulness</p><h1>Testimonies</h1><p>Every testimony is a reminder that God is still at work. Your story can strengthen someone who is searching, encourage a believer, and point hearts back to Jesus.</p></div></section><section className="testimony-stories"><div className="container"><div className="testimony-section-heading"><p className="section-kicker">Be encouraged</p><h2>What God has done</h2><p>These stories celebrate God's grace and encourage us to trust Him in every season.</p></div><TestimonyCarousel testimonies={testimonies} /></div></section><SubmissionForms types={["testimony"]} content={{ title: "Share what God has done", description: "Your testimony may be the encouragement someone needs to turn to God, keep believing, or take their next step of faith." }} /><SiteFooter /></main>; }
