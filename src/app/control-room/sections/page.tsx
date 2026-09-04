"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { ArrowLeft, GripVertical, LoaderCircle, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth, db, firebaseReady } from "@/lib/firebase/client";

type SectionId = "welcome" | "battle-cry" | "featured-sermons" | "upcoming-events" | "ministries" | "submissions";
const initialOrder: SectionId[] = ["welcome", "battle-cry", "featured-sermons", "upcoming-events", "ministries", "submissions"];
type SectionContent = { welcomeKicker: string; welcomeHeading: string; welcomeLead: string; battleKicker: string; battleQuote: string; battleReference: string; submissionTitle: string; submissionDescription: string };
const initialContent: SectionContent = { welcomeKicker: "Welcome to The Life Global Outreach Ministries", welcomeHeading: "A Global Mission.", welcomeLead: "TLGOM is a ministry focused on leading people to Christ massively, worldwide, and establishing them in the Word of God.", battleKicker: "Our battle cry", battleQuote: "Jesus Christ the same yesterday, today and forever.", battleReference: "Hebrews 13:8", submissionTitle: "There is room for your story.", submissionDescription: "Whether you need prayer or want to share what God has done, we are ready to listen." };
const sectionDetails: Record<SectionId, { title: string; description: string }> = {
  welcome: { title: "Welcome / Introduction", description: "G.O. introduction and the link to learn more about TLGOM." },
  "battle-cry": { title: "Battle Cry", description: "Jesus Christ the same yesterday, today and forever — Hebrews 13:8." },
  "featured-sermons": { title: "Video Sermons", description: "Selected video messages from the TLGOM sermon archive." },
  "upcoming-events": { title: "Upcoming Events", description: "The nearest church events and Sunday gatherings." },
  ministries: { title: "Ministries", description: "A preview of the ministry groups visitors can join." },
  submissions: { title: "Prayer & Testimony", description: "The side-by-side visitor submission forms." },
};

export default function SectionsAdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [order, setOrder] = useState<SectionId[]>(initialOrder);
  const [content, setContent] = useState<SectionContent>(initialContent);
  const [dragged, setDragged] = useState<SectionId | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { if (!auth) return; return onAuthStateChanged(auth, (nextUser) => { setUser(nextUser); setAuthReady(true); }); }, []);
  useEffect(() => { if (authReady && !user) router.replace("/control-room?next=/control-room/sections"); }, [authReady, user, router]);
  useEffect(() => { if (!db || !user) return; return onSnapshot(doc(db, "siteSettings", "homepage"), (snapshot) => { const data = snapshot.data(); if (Array.isArray(data?.sectionOrder)) { const valid = data.sectionOrder.filter((item): item is SectionId => item === "welcome" || item === "battle-cry" || item === "featured-sermons" || item === "upcoming-events" || item === "ministries" || item === "submissions"); setOrder([...valid, ...initialOrder.filter((item) => !valid.includes(item))]); } if (data?.sectionContent && typeof data.sectionContent === "object") setContent({ ...initialContent, ...data.sectionContent }); }); }, [user]);

  function moveSection(fromId: SectionId, toId: SectionId) {
    const next = [...order]; const from = next.indexOf(fromId); const to = next.indexOf(toId);
    if (from < 0 || to < 0 || from === to) return;
    const [moved] = next.splice(from, 1); next.splice(to, 0, moved); setOrder(next);
  }

  async function saveOrder() {
    if (!db) return; setBusy(true); setMessage(""); setError("");
    try { await setDoc(doc(db, "siteSettings", "homepage"), { sectionOrder: order, sectionContent: content, updatedAt: new Date() }, { merge: true }); setMessage("Homepage sections saved."); }
    catch (saveError) { setError(saveError instanceof Error ? saveError.message : "Could not save section order."); }
    finally { setBusy(false); }
  }

  if (!firebaseReady) return <main className="login-page"><div className="login-card"><p className="admin-kicker">Setup required</p><h1>Connect Firebase first</h1></div></main>;
  if (!authReady || !user) return <main className="login-page"><LoaderCircle className="spin" size={28} /></main>;

  return <main className="admin-page"><section className="admin-content"><Link className="admin-back" href="/control-room"><ArrowLeft size={16} /> Back to Control Room</Link><div className="admin-topbar"><div><p className="admin-kicker">Homepage</p><h1>Edit homepage sections</h1><p className="admin-intro">Arrange sections and edit the content visitors should experience.</p></div></div>{message && <div className="admin-notice success">{message}</div>}{error && <div className="admin-notice error">{error}</div>}<div className="section-order-card"><div className="section-order-heading"><div><h2>Homepage flow</h2><p>The hero stays first. Arrange the sections below it.</p></div><button className="admin-button" onClick={saveOrder} disabled={busy}>{busy ? <LoaderCircle className="spin" size={17} /> : <Save size={17} />} {busy ? "Saving..." : "Save everything"}</button></div><div className="section-order-list">{order.map((section, index) => <article className={`section-order-row ${dragged === section ? "dragging" : ""}`} key={section} draggable onDragStart={() => setDragged(section)} onDragOver={(event) => event.preventDefault()} onDrop={() => { if (dragged) moveSection(dragged, section); setDragged(null); }}><GripVertical className="section-drag-icon" size={21} /><span className="section-order-number">{String(index + 1).padStart(2, "0")}</span><span className="section-order-copy"><strong>{sectionDetails[section].title}</strong><small>{sectionDetails[section].description}</small></span></article>)}</div></div><div className="section-edit-card"><div className="section-edit-heading"><h2>Edit section content</h2><p>These values update the public homepage when you save.</p></div><div className="section-edit-grid"><div className="section-edit-group"><h3>Welcome / Introduction</h3><label>Label<input value={content.welcomeKicker} onChange={(event) => setContent({ ...content, welcomeKicker: event.target.value })} /></label><label>Heading<input value={content.welcomeHeading} onChange={(event) => setContent({ ...content, welcomeHeading: event.target.value })} /></label><label>Intro text<textarea value={content.welcomeLead} onChange={(event) => setContent({ ...content, welcomeLead: event.target.value })} /></label></div><div className="section-edit-group"><h3>Battle Cry</h3><label>Label<input value={content.battleKicker} onChange={(event) => setContent({ ...content, battleKicker: event.target.value })} /></label><label>Scripture quote<textarea value={content.battleQuote} onChange={(event) => setContent({ ...content, battleQuote: event.target.value })} /></label><label>Reference<input value={content.battleReference} onChange={(event) => setContent({ ...content, battleReference: event.target.value })} /></label></div><div className="section-edit-group"><h3>Prayer & Testimony</h3><label>Heading<input value={content.submissionTitle} onChange={(event) => setContent({ ...content, submissionTitle: event.target.value })} /></label><label>Intro text<textarea value={content.submissionDescription} onChange={(event) => setContent({ ...content, submissionDescription: event.target.value })} /></label></div></div></div></section></main>;
}
