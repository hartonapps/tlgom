"use client";

import type { PublishedTestimony } from "@/lib/testimonies";

function abbreviation(name: string) { return name.trim().split(/\s+/).filter(Boolean).map((part) => `${part.charAt(0).toUpperCase()}.`).join(" "); }

export default function TestimonyCarousel({ testimonies }: { testimonies: PublishedTestimony[] }) {
  if (!testimonies.length) return <div className="testimony-empty"><p>We are preparing a collection of testimonies. Your story may encourage someone next.</p></div>;
  const loop = [...testimonies, ...testimonies];
  return <div className="testimony-marquee" aria-label="Published testimonies"><div className="testimony-marquee-track">{loop.map((testimony, index) => <article className="testimony-feature" key={`${testimony.id}-${index}`}><span className="testimony-quote-mark">“</span><p>{testimony.message}</p>{testimony.showName && <strong>{abbreviation(testimony.name)}</strong>}</article>)}</div></div>;
}
