"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { ArrowLeft, Eye, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth, db, firebaseReady } from "@/lib/firebase/client";

type Submission = { id: string; type?: string; name?: string; phone?: string; email?: string; message?: string; whatsapp?: boolean; viewed?: boolean; createdAt?: { toDate?: () => Date } };
type SubmissionFilter = "all" | "prayer" | "testimony";

export default function SubmissionsPage() {
  const router = useRouter(); const [user, setUser] = useState<User | null>(null); const [ready, setReady] = useState(false); const [items, setItems] = useState<Submission[]>([]); const [filter, setFilter] = useState<SubmissionFilter>("all"); const [error, setError] = useState("");
  useEffect(() => { if (!auth) return; return onAuthStateChanged(auth, (next) => { setUser(next); setReady(true); }); }, []); useEffect(() => { if (ready && !user) router.replace("/control-room?next=/control-room/submissions"); }, [ready, user, router]); useEffect(() => { if (!db || !user) return; return onSnapshot(collection(db, "submissions"), (snapshot) => setItems(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as Submission)).sort((a, b) => Number(b.viewed !== true) - Number(a.viewed !== true))), () => setError("Could not load submissions.")); }, [user]);
  async function markViewed(item: Submission) { if (!db || item.viewed) return; try { await updateDoc(doc(db, "submissions", item.id), { viewed: true }); } catch { setError("Could not mark submission as viewed."); } }
  if (!firebaseReady || !ready || !user) return <main className="login-page"><LoaderCircle className="spin" size={28} /></main>;
  const visibleItems = filter === "all" ? items : items.filter((item) => filter === "testimony" ? item.type === "testimony" : item.type !== "testimony");
  return <main className="admin-page"><section className="admin-content"><Link className="admin-back" href="/control-room"><ArrowLeft size={16} /> Back to Control Room</Link><div className="admin-topbar"><div><p className="admin-kicker">Inbox</p><h1>Prayer requests & testimonies</h1><p className="admin-intro">Review visitor messages and mark each one as viewed.</p></div></div>{error && <div className="admin-notice error">{error}</div>}<div className="submission-tabs" role="tablist" aria-label="Submission type"><button className={filter === "all" ? "active" : ""} type="button" onClick={() => setFilter("all")}>All <b>{items.length}</b></button><button className={filter === "prayer" ? "active" : ""} type="button" onClick={() => setFilter("prayer")}>Prayer requests <b>{items.filter((item) => item.type !== "testimony").length}</b></button><button className={filter === "testimony" ? "active" : ""} type="button" onClick={() => setFilter("testimony")}>Testimonies <b>{items.filter((item) => item.type === "testimony").length}</b></button></div><div className="submission-list">{visibleItems.length === 0 ? <div className="empty-slides"><h3>No submissions in this tab</h3><p>New visitor messages will appear here.</p></div> : visibleItems.map((item) => <article className={`submission-row ${item.viewed ? "viewed" : "unread"}`} key={item.id} onClick={() => markViewed(item)}><div className="submission-row-heading"><span className="submission-type">{item.type === "testimony" ? "Testimony" : "Prayer request"}</span>{!item.viewed && <span className="new-label">New</span>}<time>{item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : "Recently"}</time></div><h2>{item.name || "Anonymous"}</h2><p className="submission-contact">{item.phone || "No phone"}{item.whatsapp ? " · WhatsApp" : ""}{item.email ? ` · ${item.email}` : ""}</p><p className="submission-message">{item.message}</p><button className="submission-view-button" type="button" onClick={(event) => { event.stopPropagation(); markViewed(item); }}><Eye size={15} /> {item.viewed ? "Viewed" : "Mark as viewed"}</button></article>)}</div></section></main>;
}
