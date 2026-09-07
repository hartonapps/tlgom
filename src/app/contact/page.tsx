import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactPageClient from "@/components/ContactPageClient";
import { getPublicDocument } from "@/lib/firebase/public-data";
import { defaultContactSettings, type ContactSettings } from "@/lib/contact";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Contact The Life Global Outreach Ministries | TLGOM", description: "Contact The Life Global Outreach Ministries for ministry information, prayer, partnership, and general enquiries.", alternates: { canonical: "/contact" }, openGraph: { title: "Contact TLGOM", description: "Get in touch with The Life Global Outreach Ministries.", url: "/contact", type: "website", images: [{ url: "/logo.png", width: 512, height: 512, alt: "The Life Global Outreach Ministries logo" }] } };
export default async function ContactPage() { const data = await getPublicDocument("siteSettings", "contact"); const contact = { ...defaultContactSettings, ...(data || {}) } as ContactSettings; return <main className="contact-page"><SiteHeader /><ContactPageClient contact={contact} /><SiteFooter /></main>; }
