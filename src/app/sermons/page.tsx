import type { Metadata } from "next";
import SermonsArchive from "@/components/SermonsArchive";
import { getPublicCollection } from "@/lib/firebase/public-data";
import type { Sermon } from "@/lib/sermons";

export const metadata: Metadata = {
  title: "Video Sermons | The Life Global Outreach Ministries",
  description: "Watch video sermons and messages from The Life Global Outreach Ministries. Search by sermon title, preacher, date, or message details.",
  alternates: { canonical: "/sermons" },
  openGraph: { title: "Video Sermons | TLGOM", description: "Watch and search video sermons from The Life Global Outreach Ministries.", type: "website", url: "/sermons", images: [{ url: "/logo.png", width: 512, height: 512, alt: "The Life Global Outreach Ministries logo" }] },
  twitter: { card: "summary_large_image", title: "Video Sermons | TLGOM", description: "Watch and search video sermons from The Life Global Outreach Ministries.", images: ["/logo.png"] },
};

export default function SermonsPage() {
  return <SermonsPageContent />;
}

async function SermonsPageContent() { const sermons = await getPublicCollection("sermons") as Sermon[]; return <SermonsArchive initialSermons={sermons} />; }
