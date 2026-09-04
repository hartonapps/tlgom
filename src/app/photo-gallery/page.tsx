import type { Metadata } from "next";
import GalleryBrowser from "@/components/GalleryBrowser";
export const metadata: Metadata = { title: "Photo Gallery | The Life Global Outreach Ministries", description: "Explore photographs and memories from The Life Global Outreach Ministries." };
export default function PhotoGalleryPage() { return <GalleryBrowser />; }
