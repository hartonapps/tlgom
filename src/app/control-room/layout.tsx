"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { auth, firebaseReady } from "@/lib/firebase/client";

export default function ControlRoomLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname(); const router = useRouter(); const [ready, setReady] = useState(false); const [user, setUser] = useState<unknown>(null);
  useEffect(() => { if (!auth) { setReady(true); return; } return onAuthStateChanged(auth, (next) => { setUser(next); setReady(true); }); }, []);
  useEffect(() => { if (ready && pathname !== "/control-room" && !user) router.replace(`/control-room?next=${encodeURIComponent(pathname)}`); }, [pathname, ready, router, user]);
  if (!firebaseReady || pathname === "/control-room") return <>{children}</>;
  if (!ready || !user) return <main className="login-page"><LoaderCircle className="spin" size={28} /></main>;
  return <>{children}</>;
}
