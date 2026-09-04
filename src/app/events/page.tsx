import type { Metadata } from "next";
import EventsArchive from "@/components/EventsArchive";

export const metadata: Metadata = {
  title: "Upcoming Events | The Life Global Outreach Ministries",
  description: "Find upcoming worship services, outreach programmes, and ministry events at The Life Global Outreach Ministries.",
  alternates: { canonical: "/events" },
  openGraph: { title: "Upcoming Events | TLGOM", description: "See upcoming worship services, outreach programmes, and ministry events at TLGOM.", type: "website" },
};

export default function EventsPage() { return <EventsArchive />; }
