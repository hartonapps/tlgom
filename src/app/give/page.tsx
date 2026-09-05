import type { Metadata } from "next";
import GivePageClient from "@/components/GivePageClient";
import { getPublicDocument } from "@/lib/firebase/public-data";
export const metadata: Metadata = { title: "Tithe/Give | The Life Global Outreach Ministries", description: "Support The Life Global Outreach Ministries through giving and tithing.", alternates: { canonical: "/give" }, openGraph: { title: "Tithe/Give | TLGOM", description: "Support The Life Global Outreach Ministries through giving and tithing.", type: "website", url: "/give", images: [{ url: "/logo.png", width: 512, height: 512, alt: "The Life Global Outreach Ministries logo" }] }, twitter: { card: "summary_large_image", title: "Tithe/Give | TLGOM", description: "Support The Life Global Outreach Ministries through giving and tithing.", images: ["/logo.png"] } };
export const dynamic = "force-dynamic";
export default async function GivePage() { const giving = await getPublicDocument("siteSettings", "giving"); return <GivePageClient initialData={giving} />; }
