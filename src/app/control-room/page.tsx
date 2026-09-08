"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { ArrowRight, Banknote, CalendarDays, FileText, ImagePlus, Images, Info, LayoutList, LoaderCircle, LogOut, MessageSquareText, Settings, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth, db, firebaseReady } from "@/lib/firebase/client";

export default function ControlRoomPage() {
  const router = useRouter(); const [user, setUser] = useState<User | null>(null); const [authReady, setAuthReady] = useState(false); const [error, setError] = useState(""); const [busy, setBusy] = useState(false); const [unread, setUnread] = useState(0); const [metrics, setMetrics] = useState({ slides: 0, sermons: 0, events: 0, albums: 0, photos: 0 });
  useEffect(() => { if (!auth) return; return onAuthStateChanged(auth, (nextUser) => { setUser(nextUser); setAuthReady(true); }); }, []);
  useEffect(() => { if (!db || !user) return; const update = (key: keyof typeof metrics, collectionName: string) => onSnapshot(collection(db!, collectionName), (snapshot) => setMetrics((current) => ({ ...current, [key]: snapshot.size }))); const stops = [update("slides", "slideshow"), update("sermons", "sermons"), update("events", "events"), update("albums", "galleryAlbums"), update("photos", "galleryPhotos"), onSnapshot(collection(db!, "submissions"), (snapshot) => setUnread(snapshot.docs.filter((item) => item.data().viewed !== true).length))]; return () => stops.forEach((stop) => stop()); }, [user]);
  async function login(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const form = new FormData(event.currentTarget); setBusy(true); setError(""); try { if (!auth) throw new Error("Firebase is not configured."); await signInWithEmailAndPassword(auth, String(form.get("email")), String(form.get("password"))); const next = new URLSearchParams(window.location.search).get("next"); if (next?.startsWith("/control-room/")) router.replace(next); } catch (loginError) { setError(loginError instanceof Error ? loginError.message : "Unable to sign in."); } finally { setBusy(false); } }
  if (!firebaseReady) return <main className="login-page"><div className="login-card"><p className="admin-kicker">Setup required</p><h1>Connect Firebase first</h1><p className="setup-copy">Add the Firebase web credentials to your local <code>.env.local</code> file, restart the dev server, and return here.</p></div></main>;
  if (!authReady) return <main className="login-page"><LoaderCircle className="spin" size={28} /></main>;
  if (!user) return <main className="login-page"><div className="login-card"><div className="admin-logo dark"><span>TLGOM</span><small>CONTROL ROOM</small></div><p className="admin-kicker">Firebase account access</p><h1>Welcome back</h1>{error && <div className="admin-notice error">{error}</div>}<form onSubmit={login}><label>Email address<input name="email" type="email" autoComplete="email" required /></label><label>Password<input name="password" type="password" autoComplete="current-password" required /></label><button className="admin-button full" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button></form></div></main>;
  const tools = [
    ["/control-room/slideshow", ImagePlus, "Edit slideshow images", "Upload, assign devices, reorder, and remove homepage hero images."],
    ["/control-room/sections", LayoutList, "Arrange homepage sections", "Drag to reorder or hide homepage sections."],
    ["/control-room/blog", FileText, "Edit articles", "Create, edit, preview, and publish articles for the blog."],
    ["/control-room/about", Info, "Edit About page", "Update mission, vision, story, legacy, and leadership profiles."],
    ["/control-room/history", FileText, "Edit history", "Write and preview the ministry story shown at /about/history."],
    ["/control-room/sermons", Video, "Manage sermons", "Add featured messages and maintain the sermon archive."],
    ["/control-room/events", CalendarDays, "Manage events", "Add events, recurring Sunday services, countdowns, and covers."],
    ["/control-room/gallery", Images, "Manage photo gallery", "Create albums, upload photos, and manage image collections."],
    ["/control-room/submissions", MessageSquareText, "Prayer requests & testimonies", "Review visitor submissions and mark them as viewed."],
    ["/control-room/giving", Banknote, "Edit account details", "Update the bank information shown on the public giving page."],
    ["/control-room/settings", Settings, "Site settings", "Manage notifications, SEO, and social sharing details."],
  ] as const;
  return <main className="dashboard-page"><header className="dashboard-header"><div className="dashboard-brand"><span>TLGOM</span><small>CONTROL ROOM</small></div><div className="dashboard-user"><span>{user.email}</span><button className="dashboard-signout" onClick={() => auth && signOut(auth)}><LogOut size={14} /> Sign out</button></div></header><section className="dashboard-main"><p className="admin-kicker">Workspace</p><h1>Control Room</h1><p className="dashboard-intro">Manage the content that powers the public church website.</p><div className="dashboard-metrics"><div><strong>{metrics.slides}</strong><span>Hero images</span></div><div><strong>{metrics.sermons}</strong><span>Video sermons</span></div><div><strong>{metrics.events}</strong><span>Events</span></div><div><strong>{metrics.albums}</strong><span>Albums</span></div><div><strong>{metrics.photos}</strong><span>Gallery photos</span></div><div><strong>{unread}</strong><span>Unread submissions</span></div></div>{unread > 0 && <Link className="submission-toast" href="/control-room/submissions"><span className="notification-dot" /> You have {unread} unread {unread === 1 ? "submission" : "submissions"} <ArrowRight size={15} /></Link>}<div className="dashboard-tools">{tools.map(([href, Icon, title, description]) => <Link className="dashboard-tool" href={href} key={href}><span className="dashboard-tool-icon"><Icon size={22} /></span><span><strong>{title}{href === "/control-room/submissions" && unread > 0 && <b className="unread-badge">{unread}</b>}</strong><small>{description}</small></span><ArrowRight size={19} /></Link>)}</div></section></main>;
}
