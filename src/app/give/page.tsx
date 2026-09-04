import type { Metadata } from "next";
import { ArrowRight, Banknote, Heart, Landmark, ShieldCheck } from "lucide-react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Give and Tithe | The Life Global Outreach Ministries",
  description: "Partner with The Life Global Outreach Ministries through faithful giving and support the work of Christ locally and worldwide.",
  alternates: { canonical: "/give" },
  openGraph: { title: "Give and Tithe | TLGOM", description: "Partner with The Life Global Outreach Ministries through faithful giving.", type: "website" },
};

const methods = [
  { icon: Landmark, label: "Bank transfer", title: "Give through your bank", text: "Our verified bank details will be displayed here once they are added in the Control Room." },
  { icon: Banknote, label: "In person", title: "Give when we gather", text: "You can give during any worship service or visit the church office for assistance." },
  { icon: Heart, label: "Online giving", title: "A simple act of partnership", text: "Online payment details will be added here when the ministry’s preferred provider is ready." },
];

export default function GivePage() {
  return <main className="give-page"><SiteHeader /><section className="give-hero"><div className="container"><p className="section-kicker">Partnership & stewardship</p><h1>Give and tithe</h1><p>Your generosity helps TLGOM lead people to Christ, establish them in the Word, and serve communities with faith and compassion.</p></div></section><section className="give-content"><div className="container"><div className="give-intro"><div><p className="section-kicker">A living mission</p><h2>Give with purpose.</h2></div><p>Giving is an expression of worship and partnership. Every gift helps make room for the Gospel, discipleship, prayer, and outreach.</p></div><div className="give-methods">{methods.map(({ icon: Icon, label, title, text }) => <article className="give-method" key={label}><span className="give-method-icon"><Icon size={22} /></span><small>{label}</small><h3>{title}</h3><p>{text}</p></article>)}</div><div className="give-trust"><ShieldCheck size={24} /><div><h3>Give freely and prayerfully</h3><p>There is no pressure to give. Please confirm all payment details on this page before making a transfer.</p></div></div><Link className="give-contact-link" href="/#prayer-testimony">Need help or prayer? Connect with us <ArrowRight size={16} /></Link></div></section><SiteFooter /></main>;
}
