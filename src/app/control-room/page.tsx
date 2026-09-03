"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { ArrowRight, ImagePlus, LoaderCircle, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth, firebaseReady } from "@/lib/firebase/client";

export default function ControlRoomPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (nextUser) => { setUser(nextUser); setAuthReady(true); });
  }, []);

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

  return <main className="dashboard-page"><header className="dashboard-header"><div className="dashboard-brand"><span>TLGOM</span><small>CONTROL ROOM</small></div><div className="dashboard-user"><span>{user.email}</span><button className="dashboard-signout" onClick={() => auth && signOut(auth)}><LogOut size={14} /> Sign out</button></div></header><section className="dashboard-main"><p className="admin-kicker">Workspace</p><h1>Control Room</h1><p className="dashboard-intro">Manage the content that powers the public church website.</p><div className="dashboard-tools"><Link className="dashboard-tool" href="/control-room/slideshow"><span className="dashboard-tool-icon"><ImagePlus size={22} /></span><span><strong>Edit slideshow images</strong><small>Upload, assign devices, reorder, and remove homepage hero images.</small></span><ArrowRight size={19} /></Link></div></section></main>;
}
