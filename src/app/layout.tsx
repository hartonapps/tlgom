import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://tlgom.vercel.app"),
  title: { default: "The Life Global Outreach Ministries", template: "%s | The Life Global Outreach Ministries" },
  description: "The Life Global Outreach Ministries leads people to Christ massively, worldwide, and establishes them in the Word of God through worship, prayer, teaching, and outreach.",
  applicationName: "The Life Global Outreach Ministries",
  keywords: ["The Life Global Outreach Ministries", "TLGOM", "Christian ministry", "church", "worship", "prayer", "Bible teaching", "Christian outreach"],
  authors: [{ name: "The Life Global Outreach Ministries" }],
  creator: "The Life Global Outreach Ministries",
  publisher: "The Life Global Outreach Ministries",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { type: "website", siteName: "The Life Global Outreach Ministries", title: "The Life Global Outreach Ministries", description: "Worship, prayer, Bible teaching, and Christian outreach from The Life Global Outreach Ministries.", images: [{ url: "/logo.png", width: 512, height: 512, alt: "The Life Global Outreach Ministries logo" }] },
  twitter: { card: "summary_large_image", title: "The Life Global Outreach Ministries", description: "Worship, prayer, Bible teaching, and Christian outreach from TLGOM.", images: ["/logo.png"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Church", name: "The Life Global Outreach Ministries", alternateName: "TLGOM", url: process.env.NEXT_PUBLIC_SITE_URL || "https://tlgom.vercel.app", logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://tlgom.vercel.app"}/logo.png`, description: "A Christian ministry leading people to Christ massively, worldwide, and establishing them in the Word of God." }) }} />{children}</body>
    </html>
  );
}
