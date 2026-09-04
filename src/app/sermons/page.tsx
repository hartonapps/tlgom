import type { Metadata } from "next";
import SermonsArchive from "@/components/SermonsArchive";

export const metadata: Metadata = {
  title: "Video Sermons | The Life Global Outreach Ministries",
  description: "Watch video sermons and messages from The Life Global Outreach Ministries. Search by sermon title, preacher, date, or message details.",
  alternates: { canonical: "/sermons" },
  openGraph: { title: "Video Sermons | TLGOM", description: "Watch and search video sermons from The Life Global Outreach Ministries.", type: "website" },
};

export default function SermonsPage() {
  return <SermonsArchive />;
}
