/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { SlideshowImage } from "@/lib/slideshow";

const navItems = [["Home", "/"], ["About", "/about"], ["Events", "/events"]];
const galleryItems = [["Photo gallery", "/gallery"], ["Video-sermon", "/media"], ["Article", "/articles"]];
const logoUrl = "https://res.cloudinary.com/hularox3/image/upload/q_auto:best,f_auto,w_1600/tlgom/branding/logo.png";

function getHighQualityImageUrl(url: string) { return url.includes("/upload/") && !url.includes("q_auto") ? url.replace("/upload/", "/upload/q_auto:best,f_auto,w_1600/") : url; }

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [slides, setSlides] = useState<SlideshowImage[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => { const update = () => setViewportWidth(window.innerWidth); update(); window.addEventListener("resize", update, { passive: true }); return () => window.removeEventListener("resize", update); }, []);
  useEffect(() => { const update = () => setScrolled(window.scrollY > 12); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  useEffect(() => { const close = (event: PointerEvent) => { if (galleryRef.current && !galleryRef.current.contains(event.target as Node)) setGalleryOpen(false); }; document.addEventListener("pointerdown", close); return () => document.removeEventListener("pointerdown", close); }, []);
  useEffect(() => { if (!db) return; return onSnapshot(collection(db, "slideshow"), (snapshot) => { setSlides(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as SlideshowImage)).filter((item) => item.enabled !== false).sort((a, b) => a.order - b.order)); setActiveSlide(0); }); }, []);

  const closeMenus = () => { setMenuOpen(false); setGalleryOpen(false); };
  const legacy = (slide: SlideshowImage) => !slide.desktopImageUrl && !slide.tabletImageUrl && !slide.mobileImageUrl && Boolean(slide.imageUrl);
  const desktopSlides = slides.filter((slide) => slide.desktopImageUrl || legacy(slide));
  const tabletSlides = slides.filter((slide) => slide.tabletImageUrl || legacy(slide));
  const mobileSlides = slides.filter((slide) => slide.mobileImageUrl || legacy(slide));
  const visibleSlides = viewportWidth > 0 && viewportWidth <= 760 ? mobileSlides : viewportWidth > 0 && viewportWidth <= 1050 ? tabletSlides : desktopSlides;

  useEffect(() => { if (!visibleSlides.length) return; const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % visibleSlides.length), 6500); return () => window.clearInterval(timer); }, [visibleSlides.length]);
  const renderTrack = (items: SlideshowImage[], className: string, imageKey: "desktopImageUrl" | "tabletImageUrl" | "mobileImageUrl") => { const activeIndex = items.findIndex((slide) => slide.id === visibleSlides[activeSlide % Math.max(visibleSlides.length, 1)]?.id); return <div className={`hero-background-track ${className}`} style={{ transform: `translateX(-${items.length && activeIndex >= 0 ? activeIndex * 100 : 0}%)` }}>{items.map((slide) => <div className="hero-background" key={`${className}-${slide.id}`}><div className="hero-background-image" style={{ backgroundImage: `url("${getHighQualityImageUrl(slide[imageKey] || (legacy(slide) ? slide.imageUrl : "") || "")}")` }} /></div>)}</div>; };

  return <><main className={`hero-page ${slides.length ? "has-slides" : "no-slides"}`}>{renderTrack(desktopSlides, "desktop-track", "desktopImageUrl")}{renderTrack(tabletSlides, "tablet-track", "tabletImageUrl")}{renderTrack(mobileSlides, "mobile-track", "mobileImageUrl")}<div className="hero-shade" aria-hidden="true" /><header className={`site-header hero-header ${scrolled ? "is-scrolled" : ""}`}><div className="container header-inner"><Link className="header-brand" href="/" aria-label="TLGOM home"><Image src={logoUrl} alt="The Life Global Outreach Ministries logo" width={50} height={50} priority /><span><strong>THE LIFE GLOBAL</strong><small>OUTREACH MINISTRIES</small></span></Link><nav className={`desktop-nav ${menuOpen ? "mobile-open" : ""}`} aria-label="Main navigation">{navItems.map(([label, href], index) => <a className={index === 0 ? "active" : ""} href={href} key={label} onClick={closeMenus}>{label}</a>)}<div className={`nav-dropdown ${galleryOpen ? "open" : ""}`} ref={galleryRef}><button className="nav-dropdown-trigger" onClick={() => { if (window.innerWidth <= 760) setGalleryOpen(!galleryOpen); }} aria-expanded={galleryOpen}>Gallery <ChevronDown size={15} /></button><div className="nav-dropdown-menu">{galleryItems.map(([label, href]) => <a href={href} key={label} onClick={closeMenus}>{label}</a>)}</div></div></nav><a className="give-button" href="/give">Give/Tithe</a><button className="menu-button hero-menu" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button></div></header><Link className="hero-logo" href="/" aria-label="TLGOM home"><span className="logo-ring" aria-hidden="true" /><span className="logo-background"><span className="logo-background-text">TLGOM logo background</span></span><Image src={logoUrl} alt="The Life Global Outreach Ministries logo" width={76} height={76} priority /></Link><section className="hero-content"><div className="container hero-content-inner"><div className="hero-actions"><a className="hero-button primary" href="/about-us">Discover the ministry <ArrowRight size={18} /></a><a className="hero-button secondary" href="/prayer-request">Need a prayer ?</a></div></div></section>{visibleSlides.length > 1 && <div className="slide-controls" aria-label="Hero slides">{visibleSlides.map((slide, index) => <button className={index === activeSlide % visibleSlides.length ? "selected" : ""} key={slide.id} aria-label={`Show slide ${index + 1}`} aria-pressed={index === activeSlide % visibleSlides.length} onClick={() => setActiveSlide(index)} />)}</div>}</main><section className="welcome-section"><div className="container welcome-grid"><div className="welcome-visual"><div className="welcome-image-frame"><Image src="/go.png" alt="Rev'd Dr. Joseph Ola, General Overseer of The Life Global Outreach Ministries" fill sizes="(max-width: 760px) 90vw, 45vw" /></div><div className="welcome-caption">Rev'd Dr. Joseph Ola<br /><small>General Overseer</small></div></div><div className="welcome-copy"><p className="section-kicker">Welcome to The Life Global Outreach Ministries</p><h2><em>A Global Mission.</em></h2><p className="welcome-lead">TLGOM is a ministry focused on leading people to Christ massively, worldwide, and establishing them in the Word of God.</p><Link className="welcome-link" href="/about-us">Discover our story <ArrowRight size={17} /></Link></div></div></section></>;
}
