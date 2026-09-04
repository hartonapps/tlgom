"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { ArrowRight, CalendarDays, ImagePlus, LayoutList, LoaderCircle, LogOut, MessageSquareText, Settings, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth, db, firebaseReady } from "@/lib/firebase/client";

export default function ControlRoomPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (nextUser) => { setUser(nextUser); setAuthReady(true); });
  }, []);
  useEffect(() => { if (!db || !user) return; return onSnapshot(collection(db, "submissions"), (snapshot) => setUnread(snapshot.docs.filter((item) => item.data().viewed !== true).length)); }, [user]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true); setError("");
    try {
      if (!auth) throw new Error("Firebase is not configured.");
      await signInWithEmailAndPassword(auth, String(form.get("email")), String(form.get("password")));
      const next = new URLSearchParams(window.location.search).get("next");
      if (next?.startsWith("/control-room/")) router.replace(next);
    } catch (loginError) { setError(loginError instanceof Error ? loginError.message : "Unable to sign in."); }
    finally { setBusy(false); }
  }

  if (!firebaseReady) return <main className="login-page"><div className="login-card"><p className="admin-kicker">Setup required</p><h1>Connect Firebase first</h1><p className="setup-copy">Add the Firebase web credentials to your local <code>.env.local</code> file, restart the dev server, and return here.</p></div></main>;
  if (!authReady) return <main className="login-page"><LoaderCircle className="spin" size={28} /></main>;
  if (!user) return <main className="login-page"><div className="login-card"><div className="admin-logo dark"><span>TLGOM</span><small>CONTROL ROOM</small></div><p className="admin-kicker">Firebase account access</p><h1>Welcome back</h1>{error && <div className="admin-notice error">{error}</div>}<form onSubmit={login}><label>Email address<input name="email" type="email" autoComplete="email" required /></label><label>Password<input name="password" type="password" autoComplete="current-password" required /></label><button className="admin-button full" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button></form></div></main>;

  return <main className="dashboard-page"><header className="dashboard-header"><div className="dashboard-brand"><span>TLGOM</span><small>CONTROL ROOM</small></div><div className="dashboard-user"><span>{user.email}</span><button className="dashboard-signout" onClick={() => auth && signOut(auth)}><LogOut size={14} /> Sign out</button></div></header><section className="dashboard-main"><p className="admin-kicker">Workspace</p><h1>Control Room</h1><p className="dashboard-intro">Manage the content that powers the public church website.</p>{unread > 0 && <Link className="submission-toast" href="/control-room/submissions"><span className="notification-dot" /> You have {unread} unread {unread === 1 ? "submission" : "submissions"} <ArrowRight size={15} /></Link>}<div className="dashboard-tools"><Link className="dashboard-tool" href="/control-room/slideshow"><span className="dashboard-tool-icon"><ImagePlus size={22} /></span><span><strong>Edit slideshow images</strong><small>Upload, assign devices, reorder, and remove homepage hero images.</small></span><ArrowRight size={19} /></Link><Link className="dashboard-tool" href="/control-room/sections"><span className="dashboard-tool-icon"><LayoutList size={22} /></span><span><strong>Arrange homepage sections</strong><small>Drag and save the order visitors see after the hero.</small></span><ArrowRight size={19} /></Link><Link className="dashboard-tool" href="/control-room/sermons"><span className="dashboard-tool-icon"><Video size={22} /></span><span><strong>Manage sermons</strong><small>Add featured messages and maintain the sermon archive.</small></span><ArrowRight size={19} /></Link><Link className="dashboard-tool" href="/control-room/events"><span className="dashboard-tool-icon"><CalendarDays size={22} /></span><span><strong>Manage events</strong><small>Add events, recurring Sunday services, countdowns, and covers.</small></span><ArrowRight size={19} /></Link><Link className="dashboard-tool" href="/control-room/submissions"><span className="dashboard-tool-icon"><MessageSquareText size={22} /></span><span><strong>Prayer requests & testimonies {unread > 0 && <b className="unread-badge">{unread}</b>}</strong><small>Review visitor submissions and mark them as viewed.</small></span><ArrowRight size={19} /></Link><Link className="dashboard-tool" href="/control-room/settings"><span className="dashboard-tool-icon"><Settings size={22} /></span><span><strong>Notification settings</strong><small>Choose which email addresses receive new submissions.</small></span><ArrowRight size={19} /></Link></div></section></main>;
}
