/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { SlideshowImage } from "@/lib/slideshow";
import { getYouTubeThumbnailUrl } from "@/lib/sermons";
import type { Sermon } from "@/lib/sermons";
import { formatEventDate, getNextEventDate } from "@/lib/events";
import type { ChurchEvent } from "@/lib/events";
import SubmissionForms from "@/components/SubmissionForms";

const navItems = [["Home", "/"], ["About", "/about-us"], ["Events", "/events"]];
const galleryItems = [["Photo gallery", "/gallery"], ["Video-sermon", "/media"], ["Article", "/articles"]];
const logoUrl = "https://res.cloudinary.com/hularox3/image/upload/q_auto:best,f_auto,w_1600/tlgom/branding/logo.png";
const goImageUrl = "/go.png";
type HomepageSectionId = "welcome" | "battle-cry" | "featured-sermons" | "upcoming-events";
const defaultSectionOrder: HomepageSectionId[] = ["welcome", "battle-cry", "featured-sermons", "upcoming-events"];
type HomepageSectionContent = { welcomeKicker: string; welcomeHeading: string; welcomeLead: string; battleKicker: string; battleQuote: string; battleReference: string };
const defaultSectionContent: HomepageSectionContent = { welcomeKicker: "Welcome to The Life Global Outreach Ministries", welcomeHeading: "A Global Mission.", welcomeLead: "TLGOM is a ministry focused on leading people to Christ massively, worldwide, and establishing them in the Word of God.", battleKicker: "Our battle cry", battleQuote: "Jesus Christ the same yesterday, today and forever.", battleReference: "Hebrews 13:8" };

function getHighQualityImageUrl(url: string) { return url.includes("/upload/") && !url.includes("q_auto") ? url.replace("/upload/", "/upload/q_auto:best,f_auto,w_1600/") : url; }

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [slides, setSlides] = useState<SlideshowImage[]>([]);
  const [sectionOrder, setSectionOrder] = useState<HomepageSectionId[]>(defaultSectionOrder);
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [now, setNow] = useState(() => new Date());
  const [sectionContent, setSectionContent] = useState<HomepageSectionContent>(defaultSectionContent);
  const galleryRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => { const update = () => setViewportWidth(window.innerWidth); update(); window.addEventListener("resize", update, { passive: true }); return () => window.removeEventListener("resize", update); }, []);
  useEffect(() => { const update = () => setScrolled(window.scrollY > 12); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  useEffect(() => { const close = (event: PointerEvent) => { if (galleryRef.current && !galleryRef.current.contains(event.target as Node)) setGalleryOpen(false); }; document.addEventListener("pointerdown", close); return () => document.removeEventListener("pointerdown", close); }, []);
  useEffect(() => { if (!db) return; return onSnapshot(collection(db, "slideshow"), (snapshot) => { setSlides(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as SlideshowImage)).filter((item) => item.enabled !== false).sort((a, b) => a.order - b.order)); setActiveSlide(0); }); }, []);
  useEffect(() => { if (!db) return; return onSnapshot(collection(db, "sermons"), (snapshot) => setSermons(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as Sermon)).filter((item) => item.enabled !== false).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)))); }, []);
  useEffect(() => { if (!db) return; return onSnapshot(collection(db, "events"), (snapshot) => setEvents(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as ChurchEvent)).filter((item) => item.enabled !== false))); }, []);
  useEffect(() => { const timer = window.setInterval(() => setNow(new Date()), 1000); return () => window.clearInterval(timer); }, []);
  useEffect(() => { if (!db) return; return onSnapshot(doc(db, "siteSettings", "homepage"), (snapshot) => { const saved = snapshot.data()?.sectionOrder; if (Array.isArray(saved)) { const valid = saved.filter((item): item is HomepageSectionId => item === "welcome" || item === "battle-cry" || item === "featured-sermons" || item === "upcoming-events"); setSectionOrder([...valid, ...defaultSectionOrder.filter((item) => !valid.includes(item))]); } }); }, []);
  useEffect(() => { if (!db) return; return onSnapshot(doc(db, "siteSettings", "homepage"), (snapshot) => { const saved = snapshot.data()?.sectionContent; if (saved && typeof saved === "object") setSectionContent({ ...defaultSectionContent, ...saved }); }); }, []);

  const closeMenus = () => { setMenuOpen(false); setGalleryOpen(false); };
  const legacy = (slide: SlideshowImage) => !slide.desktopImageUrl && !slide.tabletImageUrl && !slide.mobileImageUrl && Boolean(slide.imageUrl);
  const desktopSlides = slides.filter((slide) => slide.desktopImageUrl || legacy(slide));
  const tabletSlides = slides.filter((slide) => slide.tabletImageUrl || legacy(slide));
  const mobileSlides = slides.filter((slide) => slide.mobileImageUrl || legacy(slide));
  const visibleSlides = viewportWidth > 0 && viewportWidth <= 760 ? mobileSlides : viewportWidth > 0 && viewportWidth <= 1050 ? tabletSlides : desktopSlides;

  useEffect(() => { if (!visibleSlides.length) return; const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % visibleSlides.length), 6500); return () => window.clearInterval(timer); }, [visibleSlides.length]);
  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      if ((event.target as HTMLElement).closest(".hero-page")) touchStartX.current = event.changedTouches[0]?.clientX ?? null;
    };
    const handleTouchEnd = (event: TouchEvent) => {
      if (touchStartX.current === null || !visibleSlides.length || !(event.target as HTMLElement).closest(".hero-page")) return;
      const distance = event.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(distance) > 50) setActiveSlide((current) => (current + (distance < 0 ? 1 : -1) + visibleSlides.length) % visibleSlides.length);
      touchStartX.current = null;
    };
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => { document.removeEventListener("touchstart", handleTouchStart); document.removeEventListener("touchend", handleTouchEnd); };
  }, [visibleSlides.length]);
  const renderTrack = (items: SlideshowImage[], className: string, imageKey: "desktopImageUrl" | "tabletImageUrl" | "mobileImageUrl") => { const activeIndex = items.findIndex((slide) => slide.id === visibleSlides[activeSlide % Math.max(visibleSlides.length, 1)]?.id); return <div className={`hero-background-track ${className}`} style={{ transform: `translateX(-${items.length && activeIndex >= 0 ? activeIndex * 100 : 0}%)` }}>{items.map((slide) => <div className="hero-background" key={`${className}-${slide.id}`}><div className="hero-background-image" style={{ backgroundImage: `url("${getHighQualityImageUrl(slide[imageKey] || (legacy(slide) ? slide.imageUrl : "") || "")}")` }} /></div>)}</div>; };

  const welcomeSection = <section className="welcome-section"><div className="container welcome-grid"><div className="welcome-visual"><div className="welcome-image-frame"><Image src={goImageUrl} alt="Rev'd Dr. Joseph Ola, General Overseer of The Life Global Outreach Ministries" fill sizes="(max-width: 760px) 90vw, 45vw" /></div><div className="welcome-caption">Rev'd Dr. Joseph Ola<br /><small>General Overseer</small></div></div><div className="welcome-copy"><p className="section-kicker">{sectionContent.welcomeKicker}</p><h2><em>{sectionContent.welcomeHeading}</em></h2><p className="welcome-lead">{sectionContent.welcomeLead}</p><Link className="welcome-link" href="/about-us">Discover our story <ArrowRight size={17} /></Link></div></div></section>;
  const battleCrySection = <section className="battle-cry-section"><div className="battle-cry-glow" aria-hidden="true" /><div className="container battle-cry-inner"><p className="section-kicker">{sectionContent.battleKicker}</p><blockquote>{sectionContent.battleQuote}</blockquote><cite>{sectionContent.battleReference}</cite><span className="battle-cry-mark" aria-hidden="true">13:8</span></div></section>;
  const featuredSermons = sermons.slice(0, 3);
  const featuredSermonsSection = <section className="featured-sermons-section"><div className="container"><div className="featured-sermons-heading"><div><p className="section-kicker">From the archive</p><h2>Video sermons</h2></div></div><div className="sermon-cards">{featuredSermons.map((sermon) => <a className="sermon-card" href={sermon.youtubeUrl || "/sermons"} key={sermon.id} target={sermon.youtubeUrl ? "_blank" : undefined} rel={sermon.youtubeUrl ? "noreferrer" : undefined}><div className="sermon-card-image" style={{ backgroundImage: (sermon.coverImageUrl || getYouTubeThumbnailUrl(sermon.youtubeUrl || "")) ? `url("${sermon.coverImageUrl || getYouTubeThumbnailUrl(sermon.youtubeUrl || "")}")` : undefined }}><span>Watch message</span></div><div className="sermon-card-copy"><small>{sermon.date || "Message"}</small><h3>{sermon.title}</h3><p>{sermon.speaker || "TLGOM"}</p></div></a>)}<Link className="sermon-card view-all-card" href="/sermons"><strong>View all sermons</strong><small>Explore the full archive</small><ArrowRight size={19} /></Link></div></div></section>;
  const upcomingEvents = events.map((event) => ({ event, start: getNextEventDate(event, now) })).filter((item): item is { event: ChurchEvent; start: Date } => Boolean(item.start)).filter(({ event, start }) => event.recurringSunday || start.getTime() >= now.getTime() - (event.durationMinutes || 120) * 60000).sort((a, b) => a.start.getTime() - b.start.getTime()).slice(0, 2);
  const eventCountdown = (start: Date, durationMinutes = 120) => { const difference = start.getTime() - now.getTime(); if (difference <= 0 && difference >= -durationMinutes * 60000) return "Ongoing"; const totalMinutes = Math.max(0, Math.floor(difference / 60000)); const days = Math.floor(totalMinutes / 1440); const hours = Math.floor((totalMinutes % 1440) / 60); const minutes = totalMinutes % 60; return days ? `${days}d ${hours}h` : hours ? `${hours}h ${minutes}m` : `${minutes}m`; };
  const upcomingEventsSection = <section className="upcoming-events-section"><div className="container"><div className="upcoming-events-heading"><div><p className="section-kicker">Gather with us</p><h2>Upcoming events</h2></div></div>{upcomingEvents.length === 0 ? <div className="no-events-message"><span>✦</span><h3>No upcoming events</h3><p>Check back soon for what is happening at TLGOM.</p></div> : <div className="event-cards">{upcomingEvents.map(({ event, start }) => <a className="event-card" href="/events" key={event.id}><div className="event-card-image" style={{ backgroundImage: event.imageUrl ? `url("${event.imageUrl}")` : undefined }}><span className={eventCountdown(start, event.durationMinutes) === "Ongoing" ? "event-status ongoing" : "event-status"}>{eventCountdown(start, event.durationMinutes)}</span></div><div className="event-card-copy"><small>{formatEventDate(start)}{event.time ? ` · ${event.time}` : ""}</small><h3>{event.title}</h3><p>{event.location || "TLGOM"}</p><span className="event-card-link">Event details <ArrowRight size={15} /></span></div></a>)}<Link className="event-card view-all-event-card" href="/events"><strong>View more events</strong><small>See the complete church calendar</small><ArrowRight size={19} /></Link></div>}</div></section>;
  return <><main className={`hero-page ${slides.length ? "has-slides" : "no-slides"}`}>{renderTrack(desktopSlides, "desktop-track", "desktopImageUrl")}{renderTrack(tabletSlides, "tablet-track", "tabletImageUrl")}{renderTrack(mobileSlides, "mobile-track", "mobileImageUrl")}<div className="hero-shade" aria-hidden="true" /><header className={`site-header hero-header ${scrolled ? "is-scrolled" : ""}`}><div className="container header-inner"><Link className="header-brand" href="/" aria-label="TLGOM home"><Image src={logoUrl} alt="The Life Global Outreach Ministries logo" width={50} height={50} priority /><span><strong>THE LIFE GLOBAL</strong><small>OUTREACH MINISTRIES</small></span></Link><nav className={`desktop-nav ${menuOpen ? "mobile-open" : ""}`} aria-label="Main navigation">{navItems.map(([label, href], index) => <a className={index === 0 ? "active" : ""} href={href} key={label} onClick={closeMenus}>{label}</a>)}<div className={`nav-dropdown ${galleryOpen ? "open" : ""}`} ref={galleryRef}><button className="nav-dropdown-trigger" onClick={() => { if (window.innerWidth <= 760) setGalleryOpen(!galleryOpen); }} aria-expanded={galleryOpen}>Gallery <ChevronDown size={15} /></button><div className="nav-dropdown-menu">{galleryItems.map(([label, href]) => <a href={href} key={label} onClick={closeMenus}>{label}</a>)}</div></div></nav><a className="give-button" href="/give">Give/Tithe</a><button className="menu-button hero-menu" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button></div></header><Link className="hero-logo" href="/" aria-label="TLGOM home"><span className="logo-ring" aria-hidden="true" /><span className="logo-background"><span className="logo-background-text">TLGOM logo background</span></span><Image src={logoUrl} alt="The Life Global Outreach Ministries logo" width={76} height={76} priority /></Link><section className="hero-content"><div className="container hero-content-inner"><div className="hero-actions"><a className="hero-button primary" href="/about-us">Discover the ministry <ArrowRight size={18} /></a><a className="hero-button secondary" href="/prayer-request">Need a prayer ?</a></div></div></section>{visibleSlides.length > 1 && <div className="slide-controls" aria-label="Hero slides">{visibleSlides.map((slide, index) => <button className={index === activeSlide % visibleSlides.length ? "selected" : ""} key={slide.id} aria-label={`Show slide ${index + 1}`} aria-pressed={index === activeSlide % visibleSlides.length} onClick={() => setActiveSlide(index)} />)}</div>}</main>{sectionOrder.map((section) => section === "welcome" ? <div key={section}>{welcomeSection}</div> : section === "battle-cry" ? <div key={section}>{battleCrySection}</div> : section === "featured-sermons" ? <div key={section}>{featuredSermonsSection}</div> : <div key={section}>{upcomingEventsSection}</div>)}<SubmissionForms /></>;
}
