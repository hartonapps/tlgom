import type { Metadata } from "next";
import GivePageClient from "@/components/GivePageClient";
export const metadata: Metadata = { title: "Give and Tithe | The Life Global Outreach Ministries", description: "Support The Life Global Outreach Ministries through giving and tithing.", alternates: { canonical: "/give" }, openGraph: { title: "Give and Tithe | TLGOM", description: "Support The Life Global Outreach Ministries through giving and tithing.", type: "website" } };
export default function GivePage() { return <GivePageClient />; }
