"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

const navItems = [["Home", "/"], ["About", "/about-us"], ["Events", "/events"]];
const galleryItems = [["Photo gallery", "/photo-gallery"], ["Video sermons", "/sermons"]];
const logoUrl = "https://res.cloudinary.com/hularox3/image/upload/q_auto:best,f_auto,w_1600/tlgom/branding/logo.png";

export default function HomepageHeader({ scrolled }: { scrolled?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false); const [galleryOpen, setGalleryOpen] = useState(false); const [internalScrolled, setInternalScrolled] = useState(false); const galleryRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (scrolled !== undefined) return; const update = () => setInternalScrolled(window.scrollY > 12); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, [scrolled]);
  useEffect(() => { const close = (event: PointerEvent) => { if (galleryRef.current && !galleryRef.current.contains(event.target as Node)) setGalleryOpen(false); }; document.addEventListener("pointerdown", close); return () => document.removeEventListener("pointerdown", close); }, []);
  const closeMenus = () => { setMenuOpen(false); setGalleryOpen(false); }; const isScrolled = scrolled ?? internalScrolled;
  return <header className={`site-header hero-header ${isScrolled ? "is-scrolled" : ""}`}><div className="container header-inner"><Link className="header-brand" href="/" aria-label="TLGOM home" onClick={closeMenus}><Image src={logoUrl} alt="The Life Global Outreach Ministries logo" width={50} height={50} priority /><span><strong>THE LIFE GLOBAL</strong><small>OUTREACH MINISTRIES</small></span></Link><nav className={`desktop-nav ${menuOpen ? "mobile-open" : ""}`} aria-label="Main navigation">{navItems.map(([label, href], index) => <a className={index === 0 ? "active" : ""} href={href} key={label} onClick={closeMenus}>{label}</a>)}<div className={`nav-dropdown ${galleryOpen ? "open" : ""}`} ref={galleryRef}><button className="nav-dropdown-trigger" type="button" onClick={() => { if (window.innerWidth <= 760) setGalleryOpen(!galleryOpen); }} aria-expanded={galleryOpen}>Gallery <ChevronDown size={15} /></button><div className="nav-dropdown-menu">{galleryItems.map(([label, href]) => <a href={href} key={label} onClick={closeMenus}>{label}</a>)}</div></div></nav><a className="give-button" href="/give">Tithe/Give</a><button className="menu-button hero-menu" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button></div></header>;
}
