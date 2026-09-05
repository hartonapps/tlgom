import type { Metadata } from "next";
import EventsArchive from "@/components/EventsArchive";
import { getPublicCollection } from "@/lib/firebase/public-data";
import type { ChurchEvent } from "@/lib/events";

export const metadata: Metadata = {
  title: "Upcoming Events | The Life Global Outreach Ministries",
  description: "Find upcoming worship services, outreach programmes, and ministry events at The Life Global Outreach Ministries.",
  alternates: { canonical: "/events" },
  openGraph: { title: "Upcoming Events | TLGOM", description: "See upcoming worship services, outreach programmes, and ministry events at TLGOM.", type: "website", url: "/events", images: [{ url: "/logo.png", width: 512, height: 512, alt: "The Life Global Outreach Ministries logo" }] },
  twitter: { card: "summary_large_image", title: "Upcoming Events | TLGOM", description: "See upcoming worship services, outreach programmes, and ministry events at TLGOM.", images: ["/logo.png"] },
};

export const dynamic = "force-dynamic";
export default async function EventsPage() { const events = await getPublicCollection("events") as ChurchEvent[]; return <EventsArchive initialEvents={events} />; }
