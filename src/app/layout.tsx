import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
