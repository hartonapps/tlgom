"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Video, X } from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { formatSpeakerName, getYouTubeThumbnailUrl, normalizeSpeakerName, type Sermon } from "@/lib/sermons";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SermonCard from "@/components/SermonCard";

export default function SermonsArchive({ initialSermons = [] }: { initialSermons?: Sermon[] }) {
  const [sermons, setSermons] = useState<Sermon[]>(initialSermons);
  const [query, setQuery] = useState("");
  const [speaker, setSpeaker] = useState("all");
  const [date, setDate] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!db) { setLoading(false); return; }
    return onSnapshot(collection(db, "sermons"), (snapshot) => {
      setSermons(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as Sermon)).filter((item) => item.enabled !== false).sort((a, b) => (a.date || "").localeCompare(b.date || "") * -1 || (a.order ?? 0) - (b.order ?? 0)));
      setLoading(false);
    }, () => setLoading(false));
  }, []);

  const speakers = useMemo(() => { const seen = new Set<string>(); return sermons.reduce<string[]>((result, item) => { const key = normalizeSpeakerName(item.speaker); if (key && !seen.has(key)) { seen.add(key); result.push(formatSpeakerName(item.speaker)); } return result; }, []); }, [sermons]);
  const dates = useMemo(() => Array.from(new Set(sermons.map((item) => item.date).filter(Boolean) as string[])).sort().reverse(), [sermons]);
  const filtered = useMemo(() => { const text = query.trim().toLocaleLowerCase(); return sermons.filter((item) => { const searchable = [item.title, item.speaker, item.date, item.description].join(" ").toLocaleLowerCase(); return (!text || searchable.includes(text)) && (speaker === "all" || normalizeSpeakerName(item.speaker) === normalizeSpeakerName(speaker)) && (date === "all" || item.date === date); }); }, [date, query, sermons, speaker]);

  return <main className="sermons-page"><SiteHeader /><section className="sermons-hero"><div className="container"><p className="section-kicker">TLGOM media archive</p><h1>Video sermons</h1><p>Watch messages from The Life Global Outreach Ministries and search the archive by title, preacher, date, or topic.</p></div></section><section className="sermons-content"><div className="container"><div className="sermons-tools"><label className="sermons-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search sermons, preachers or topics" aria-label="Search video sermons" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={16} /></button>}</label><label><span>Preacher</span><select value={speaker} onChange={(event) => setSpeaker(event.target.value)}><option value="all">All preachers</option>{speakers.map((item) => <option key={normalizeSpeakerName(item)} value={item}>{item}</option>)}</select></label><label><span>Date</span><select value={date} onChange={(event) => setDate(event.target.value)}><option value="all">All dates</option>{dates.map((item) => <option key={item} value={item}>{item}</option>)}</select></label></div>{loading ? <div className="sermons-empty"><Video className="spin" size={28} /></div> : filtered.length ? <div className="sermons-archive-grid">{filtered.map((sermon) => <SermonCard sermon={sermon} archive key={sermon.id} />)}</div> : <div className="sermons-empty"><Video size={28} /><h2>No sermons found</h2><p>Try another title, preacher, date, or search term.</p></div>}</div></section><SiteFooter /></main>;
}
