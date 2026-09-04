import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://tlgom.vercel.app"),
  title: "The Life Global Outreach Ministries | A Ministry in Motion",
  description: "Leading people to Christ massively, worldwide, and establishing them in the Word of God.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
