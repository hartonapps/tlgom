import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About Us | The Life Global Outreach Ministries",
  description: "Learn who The Life Global Outreach Ministries is, our mission, vision, battle cry, scripture, and leadership.",
  alternates: { canonical: "/about-us" },
  openGraph: { title: "About Us | The Life Global Outreach Ministries", description: "Learn about the mission, vision, faith, and leadership of TLGOM.", url: "/about-us", type: "website", images: [{ url: "/logo.png", width: 512, height: 512, alt: "The Life Global Outreach Ministries logo" }] },
  twitter: { card: "summary_large_image", title: "About Us | TLGOM", description: "Learn about the mission, vision, faith, and leadership of TLGOM.", images: ["/logo.png"] },
};

export default function AboutPage() {
  return <main className="about-page"><SiteHeader /><section className="about-hero"><div className="container"><p className="section-kicker">The Life Global Outreach Ministries</p><h1>About us</h1><p>A ministry focused on leading people to Christ massively, worldwide, and establishing them in the Word of God.</p></div></section><section className="about-content"><div className="container about-content-grid"><article><p className="section-kicker">Who we are</p><h2>A global family of faith.</h2><p>TLGOM is a Christian ministry committed to making Christ known through worship, prayer, biblical teaching, discipleship, and outreach.</p></article><article><p className="section-kicker">Our vision and mission</p><h2>Christ known. Lives established.</h2><p>We exist to lead people to Jesus Christ and establish them in the Word of God, raising a growing family that lives out the gospel in every community.</p></article></div><div className="container about-verses"><blockquote>“There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit.”<cite>Romans 8:1 · Our battle cry</cite></blockquote><blockquote>“Jesus Christ the same yesterday, and to day, and for ever.”<cite>Hebrews 13:8 · Our scripture</cite></blockquote></div><div className="container about-leader"><p className="section-kicker">Our General Overseer</p><h2>Rev&apos;d Dr. Joseph Ola</h2><p>Leading the ministry with a passion for Christ, the Word of God, prayer, and global outreach.</p></div></section><SiteFooter /></main>;
}
