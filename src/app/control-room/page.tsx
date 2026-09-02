"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { ArrowRight, ImagePlus } from "lucide-react";
import { auth } from "@/lib/firebase/client";

export default function ControlRoomPage() {
  return <main className="dashboard-page"><section className="dashboard-card"><div className="dashboard-actions"><button className="dashboard-signout" onClick={() => auth && signOut(auth)}>Sign out</button></div><p className="admin-kicker">TLGOM</p><h1>Control Room</h1><p>Manage the content that powers the public church website.</p><Link className="admin-button" href="/control-room/slideshow"><ImagePlus size={17} /> Open slideshow image <ArrowRight size={16} /></Link></section></main>;
}
