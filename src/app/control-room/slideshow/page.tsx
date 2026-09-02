"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, writeBatch } from "firebase/firestore";
import { ArrowDown, ArrowUp, ImagePlus, LoaderCircle, LogOut, Move, Trash2, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth, db, firebaseReady } from "@/lib/firebase/client";
import type { SlideshowImage } from "@/lib/slideshow";

async function uploadToCloudinary(file: File, token: string) {
  const signatureResponse = await fetch("/api/cloudinary/sign", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
  const signature = await signatureResponse.json();
  if (!signatureResponse.ok) throw new Error(signature.error || "Could not authorize upload.");
  const uploadData = new FormData(); uploadData.append("file", file); uploadData.append("api_key", signature.apiKey); uploadData.append("timestamp", signature.timestamp); uploadData.append("folder", signature.folder); uploadData.append("signature", signature.signature);
  const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`, { method: "POST", body: uploadData });
  const uploaded = await uploadResponse.json();
  if (!uploadResponse.ok) throw new Error(uploaded.error?.message || "Cloudinary upload failed.");
  return { url: uploaded.secure_url as string, publicId: uploaded.public_id as string };
}

export default function SlideshowAdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [slides, setSlides] = useState<SlideshowImage[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<SlideshowImage | null>(null);

  useEffect(() => {
    document.querySelector<HTMLAnchorElement>(".admin-nav-item.active")?.setAttribute("href", "/control-room");
    const handleBackClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest(".admin-nav-item.active")) {
        event.preventDefault();
        router.push("/control-room");
      }
    };
    document.addEventListener("click", handleBackClick);
    return () => document.removeEventListener("click", handleBackClick);
  }, [router]);

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setIsAdmin(Boolean(nextUser));
      setAuthReady(true);
    });
  }, []);

  useEffect(() => {
    if (!db || !isAdmin) return;
    return onSnapshot(collection(db, "slideshow"), (snapshot) => {
      setSlides(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as SlideshowImage)).sort((a, b) => a.order - b.order));
    }, () => setError("Could not load slideshow images. Check your Firestore rules."));
  }, [isAdmin]);

  if (!firebaseReady) return <SetupMessage />;
  if (!authReady) return <LoadingScreen />;
  if (!user || !isAdmin) return <LoginScreen user={user} onLogin={setUser} onError={setError} error={error} />;
  const currentUser = user;
  const firestore = db;

  async function uploadSlide(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const desktopFile = form.get("desktopImage");
    const tabletFile = form.get("tabletImage");
    const mobileFile = form.get("mobileImage");
    const selectedFiles = [desktopFile, tabletFile, mobileFile].filter((file): file is File => file instanceof File && file.size > 0);
    if (!selectedFiles.length) { setError("Choose at least one image."); return; }
    setBusy(true); setError(""); setMessage("");
    try {
      const token = await currentUser.getIdToken();
      const [desktop, tablet, mobile] = await Promise.all([desktopFile instanceof File && desktopFile.size ? uploadToCloudinary(desktopFile, token) : Promise.resolve(null), tabletFile instanceof File && tabletFile.size ? uploadToCloudinary(tabletFile, token) : Promise.resolve(null), mobileFile instanceof File && mobileFile.size ? uploadToCloudinary(mobileFile, token) : Promise.resolve(null)]);
      if (!firestore) throw new Error("Firestore is not configured.");
      const slideData = { ...(desktop && { imageUrl: desktop.url, publicId: desktop.publicId, desktopImageUrl: desktop.url, desktopPublicId: desktop.publicId }), ...(tablet && { tabletImageUrl: tablet.url, tabletPublicId: tablet.publicId }), ...(mobile && { mobileImageUrl: mobile.url, mobilePublicId: mobile.publicId }), order: slides.length, enabled: true, createdAt: serverTimestamp() };
      await addDoc(collection(firestore, "slideshow"), slideData);
      formElement.reset(); setMessage("Slide added successfully.");
    } catch (uploadError) { setError(uploadError instanceof Error ? uploadError.message : "Unable to add slide."); }
    finally { setBusy(false); }
  }

  async function deleteSlide(slide: SlideshowImage) {
    if (!firestore) return;
    setConfirmDelete(slide);
  }

  async function removeSlide() {
    if (!firestore || !confirmDelete) return;
    const slide = confirmDelete;
    setConfirmDelete(null);
    setBusy(true); setError("");
    try {
      const token = await currentUser.getIdToken();
      await fetch("/api/cloudinary/delete", { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ publicIds: [slide.desktopPublicId, slide.tabletPublicId, slide.mobilePublicId, slide.publicId].filter(Boolean) }) });
      await deleteDoc(doc(firestore, "slideshow", slide.id)); await normalizeOrder([...slides].filter((item) => item.id !== slide.id)); setMessage("Slide deleted.");
    } catch (deleteError) { setError(deleteError instanceof Error ? deleteError.message : "Unable to delete slide."); }
    finally { setBusy(false); }
  }

  async function normalizeOrder(nextSlides: SlideshowImage[]) {
    if (!firestore) return;
    const batch = writeBatch(firestore); nextSlides.forEach((slide, index) => batch.update(doc(firestore, "slideshow", slide.id), { order: index })); await batch.commit();
  }

  async function reorder(fromId: string, toId: string) {
    const next = [...slides]; const fromIndex = next.findIndex((slide) => slide.id === fromId); const toIndex = next.findIndex((slide) => slide.id === toId); if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return;
    const [moved] = next.splice(fromIndex, 1); next.splice(toIndex, 0, moved); setSlides(next); setDraggedId(null); await normalizeOrder(next);
  }

  async function moveBy(slideIndex: number, direction: -1 | 1) { const target = slideIndex + direction; if (target < 0 || target >= slides.length) return; await reorder(slides[slideIndex].id, slides[target].id); }

  return <><main className="admin-page"><aside className="admin-sidebar"><div className="admin-logo"><span>TLGOM</span><small>CONTROL ROOM</small></div><div className="admin-nav-label">Content</div><Link className="admin-nav-item active" href="/control-room/slideshow"><ImagePlus size={17} /> Slideshow image</Link><div className="admin-nav-item muted">Sermons <small>soon</small></div><div className="admin-nav-item muted">Events <small>soon</small></div><div className="admin-nav-item muted">Gallery <small>soon</small></div><button className="admin-signout" onClick={() => auth && signOut(auth)}><LogOut size={16} /> Sign out</button></aside><section className="admin-content"><div className="admin-topbar"><div><p className="admin-kicker">Homepage</p><h1>Slideshow images</h1><p className="admin-intro">Manage the images visitors see in the homepage hero.</p></div><span className="admin-user">{user.email}</span></div>{message && <div className="admin-notice success">{message}</div>}{error && <div className="admin-notice error">{error}</div>}<form className="upload-card" onSubmit={uploadSlide}><div className="upload-title"><UploadCloud size={19} /><div><h2>Add slideshow image</h2><p>Add only the sizes you need; missing sizes keep their existing device slides.</p></div></div><div className="upload-fields"><label className="file-field"><span>Laptop image</span><input type="file" name="desktopImage" accept="image/jpeg,image/png,image/webp" /></label><label className="file-field"><span>Tablet image</span><input type="file" name="tabletImage" accept="image/jpeg,image/png,image/webp" /></label><label className="file-field"><span>Phone image</span><input type="file" name="mobileImage" accept="image/jpeg,image/png,image/webp" /></label><button className="admin-button" disabled={busy}>{busy ? <LoaderCircle className="spin" size={17} /> : <UploadCloud size={17} />} {busy ? "Uploading..." : "Add image"}</button></div></form><div className="slides-header"><div><p className="admin-kicker">Live order</p><h2>{slides.length} {slides.length === 1 ? "image" : "images"}</h2></div><p>Drag a card to reorder. The public hero follows this order.</p></div><div className="slides-list">{slides.length === 0 ? <div className="empty-slides"><ImagePlus size={28} /><h3>No slideshow images yet</h3><p>Upload your first hero image above.</p></div> : slides.map((slide, index) => <article className={`slide-row ${draggedId === slide.id ? "dragging" : ""}`} key={slide.id} draggable onDragStart={() => setDraggedId(slide.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => draggedId && reorder(draggedId, slide.id)}><div className="drag-handle" aria-label="Drag to reorder"><Move size={17} /></div><div className="slide-preview" style={{ backgroundImage: `url("${slide.imageUrl}")` }} /><div className="slide-info"><span className="slide-number">{String(index + 1).padStart(2, "0")}</span><strong>Homepage hero image</strong><small>{slide.enabled ? "Published to homepage" : "Hidden from homepage"}</small></div><div className="row-actions"><button aria-label="Move up" disabled={index === 0 || busy} onClick={() => moveBy(index, -1)}><ArrowUp size={17} /></button><button aria-label="Move down" disabled={index === slides.length - 1 || busy} onClick={() => moveBy(index, 1)}><ArrowDown size={17} /></button><button className="delete-button" aria-label="Delete image" disabled={busy} onClick={() => deleteSlide(slide)}><Trash2 size={17} /></button></div></article>)}</div></section></main>{confirmDelete && <DeleteConfirmation slide={confirmDelete} onCancel={() => setConfirmDelete(null)} onConfirm={removeSlide} />}</>;
}

function DeleteConfirmation({ slide, onCancel, onConfirm }: { slide: SlideshowImage; onCancel: () => void; onConfirm: () => void }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onCancel()}><div className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="delete-title"><p className="admin-kicker">Remove image</p><h2 id="delete-title">Delete this slideshow image?</h2><p>This removes the image from the homepage and deletes it from Cloudinary.</p><div className="modal-preview" style={{ backgroundImage: `url("${slide.imageUrl}")` }} /><div className="modal-actions"><button className="modal-cancel" onClick={onCancel}>Cancel</button><button className="modal-delete" onClick={onConfirm}>Delete image</button></div></div></div>;
}

function LoginScreen({ user, onLogin, onError, error }: { user: User | null; onLogin: (user: User) => void; onError: (message: string) => void; error: string }) {
  const [busy, setBusy] = useState(false);
  async function login(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const form = new FormData(event.currentTarget); setBusy(true); onError(""); try { if (!auth) throw new Error("Firebase is not configured."); const result = await signInWithEmailAndPassword(auth, String(form.get("email")), String(form.get("password"))); onLogin(result.user); } catch (loginError) { onError(loginError instanceof Error ? loginError.message : "Unable to sign in."); } finally { setBusy(false); } }
  return <main className="login-page"><div className="login-card"><div className="admin-logo dark"><span>TLGOM</span><small>CONTROL ROOM</small></div><p className="admin-kicker">Firebase account access</p><h1>Welcome back</h1>{error && <div className="admin-notice error">{error}</div>}{!user && <form onSubmit={login}><label>Email address<input name="email" type="email" autoComplete="email" required /></label><label>Password<input name="password" type="password" autoComplete="current-password" required /></label><button className="admin-button full" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button></form>}</div></main>;
}

function SetupMessage() { return <main className="login-page"><div className="login-card"><div className="admin-logo dark"><span>TLGOM</span><small>CONTROL ROOM</small></div><p className="admin-kicker">Setup required</p><h1>Connect Firebase first</h1><p className="setup-copy">Add the Firebase web credentials to your local <code>.env.local</code> file, restart the dev server, and return here.</p></div></main>; }
function LoadingScreen() { return <main className="login-page"><LoaderCircle className="spin" size={28} /></main>; }
