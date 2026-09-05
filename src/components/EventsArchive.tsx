"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Search, X } from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { formatEventDate, getNextEventDate, type ChurchEvent } from "@/lib/events";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import EventCard from "@/components/EventCard";

function countdown(start: Date, now: Date, duration = 120) { const difference = start.getTime() - now.getTime(); if (difference <= 0 && difference >= -duration * 60000) return "Ongoing"; const minutes = Math.max(0, Math.floor(difference / 60000)); const days = Math.floor(minutes / 1440); const hours = Math.floor((minutes % 1440) / 60); return days ? `${days}d ${hours}h` : hours ? `${hours}h ${minutes % 60}m` : `${minutes % 60}m`; }

export default function EventsArchive({ initialEvents = [] }: { initialEvents?: ChurchEvent[] }) {
  const [events, setEvents] = useState<ChurchEvent[]>(initialEvents); const [query, setQuery] = useState(""); const [location, setLocation] = useState("all"); const [month, setMonth] = useState("all"); const [now, setNow] = useState(() => new Date()); const [loading, setLoading] = useState(false);
  useEffect(() => { const timer = window.setInterval(() => setNow(new Date()), 30000); return () => window.clearInterval(timer); }, []);
  useEffect(() => { if (!db) { setLoading(false); return; } return onSnapshot(collection(db, "events"), (snapshot) => { setEvents(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as ChurchEvent)).filter((item) => item.enabled !== false)); setLoading(false); }, () => setLoading(false)); }, []);
  const dated = useMemo(() => events.map((event) => ({ event, start: getNextEventDate(event, now) })).filter((item): item is { event: ChurchEvent; start: Date } => Boolean(item.start)).sort((a, b) => a.start.getTime() - b.start.getTime()), [events, now]);
  const locations = useMemo(() => Array.from(new Set(dated.map((item) => item.event.location).filter(Boolean) as string[])).sort(), [dated]);
  const months = useMemo(() => Array.from(new Set(dated.map((item) => `${item.start.getFullYear()}-${String(item.start.getMonth() + 1).padStart(2, "0")}`))), [dated]);
  const filtered = useMemo(() => { const text = query.trim().toLocaleLowerCase(); return dated.filter(({ event, start }) => { const searchable = [event.title, event.description, event.location, event.date, event.time].join(" ").toLocaleLowerCase(); const monthKey = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}`; return (!text || searchable.includes(text)) && (location === "all" || event.location === location) && (month === "all" || monthKey === month); }); }, [dated, location, month, query]);
  return <main className="events-page"><SiteHeader /><section className="events-hero"><div className="container"><p className="section-kicker">Gather with us</p><h1>Upcoming events</h1><p>Stay connected with worship services, outreach programmes, and moments to grow together at TLGOM.</p></div></section><section className="events-content"><div className="container"><div className="events-tools"><label className="events-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search events, places or topics" aria-label="Search events" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={16} /></button>}</label><label><span>Location</span><select value={location} onChange={(event) => setLocation(event.target.value)}><option value="all">All locations</option>{locations.map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Month</span><select value={month} onChange={(event) => setMonth(event.target.value)}><option value="all">All months</option>{months.map((item) => <option key={item} value={item}>{new Date(`${item}-01T00:00`).toLocaleDateString(undefined, { month: "long", year: "numeric" })}</option>)}</select></label></div>{loading ? <div className="events-empty"><CalendarDays className="spin" size={28} /></div> : filtered.length ? <div className="events-archive-grid">{filtered.map(({ event, start }) => <EventCard event={event} start={start} now={now} archive key={event.id} />)}</div> : <div className="events-empty"><CalendarDays size={28} /><h2>No upcoming events</h2><p>Try another search or check back soon for the next gathering.</p></div>}</div></section><SiteFooter /></main>;
}
