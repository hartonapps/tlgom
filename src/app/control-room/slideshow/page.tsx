"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, User } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, writeBatch } from "firebase/firestore";
import { ArrowDown, ArrowLeft, ArrowUp, ImagePlus, LoaderCircle, Move, Trash2, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth, db, firebaseReady } from "@/lib/firebase/client";
import type { SlideshowImage } from "@/lib/slideshow";

type UploadTarget = "all" | "desktop" | "tablet" | "mobile";

async function uploadToCloudinary(file: File, token: string) {
  const response = await fetch("/api/cloudinary/sign", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
  const signature = await response.json();
  if (!response.ok) throw new Error(signature.error || "Could not authorize upload.");
  const form = new FormData();
  form.append("file", file); form.append("api_key", signature.apiKey); form.append("timestamp", signature.timestamp); form.append("folder", signature.folder); form.append("signature", signature.signature);
  const upload = await fetch(`https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`, { method: "POST", body: form });
  const result = await upload.json();
  if (!upload.ok) throw new Error(result.error?.message || "Cloudinary upload failed.");
  return { url: result.secure_url as string, publicId: result.public_id as string };
}

export default function SlideshowAdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [slides, setSlides] = useState<SlideshowImage[]>([]);
  const [target, setTarget] = useState<UploadTarget>("all");
  const [viewTarget, setViewTarget] = useState<UploadTarget>("all");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<SlideshowImage | null>(null);

  useEffect(() => { if (!auth) return; return onAuthStateChanged(auth, (nextUser) => { setUser(nextUser); setAuthReady(true); }); }, []);
  useEffect(() => { if (authReady && !user) router.replace("/control-room?next=/control-room/slideshow"); }, [authReady, user, router]);
  useEffect(() => { if (!db || !user) return; return onSnapshot(collection(db, "slideshow"), (snapshot) => setSlides(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as SlideshowImage)).sort((a, b) => a.order - b.order)), () => setError("Could not load slideshow images. Check your Firestore rules.")); }, [user]);

  async function uploadSlide(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const file = new FormData(event.currentTarget).get("image");
    if (!(file instanceof File) || !file.size) { setError("Choose an image first."); return; }
    if (!user || !db) { setError("Firebase is not configured."); return; }
    setBusy(true); setError(""); setMessage("");
    try {
      const uploaded = await uploadToCloudinary(file, await user.getIdToken());
      const shared = { imageUrl: uploaded.url, publicId: uploaded.publicId };
      const fields = target === "all" ? { desktopImageUrl: uploaded.url, desktopPublicId: uploaded.publicId, tabletImageUrl: uploaded.url, tabletPublicId: uploaded.publicId, mobileImageUrl: uploaded.url, mobilePublicId: uploaded.publicId } : target === "desktop" ? { desktopImageUrl: uploaded.url, desktopPublicId: uploaded.publicId } : target === "tablet" ? { tabletImageUrl: uploaded.url, tabletPublicId: uploaded.publicId } : { mobileImageUrl: uploaded.url, mobilePublicId: uploaded.publicId };
      await addDoc(collection(db, "slideshow"), { ...shared, ...fields, order: slides.length, enabled: true, createdAt: serverTimestamp() });
      event.currentTarget.reset(); setMessage(`Image assigned to ${target === "all" ? "all devices" : target}.`);
    } catch (uploadError) { setError(uploadError instanceof Error ? uploadError.message : "Unable to add image."); } finally { setBusy(false); }
  }

  async function normalizeOrder(nextSlides: SlideshowImage[]) { if (!db) return; const firestore = db; const batch = writeBatch(firestore); nextSlides.forEach((slide, index) => batch.update(doc(firestore, "slideshow", slide.id), { order: index })); await batch.commit(); }
  async function reorder(fromId: string, toId: string) { const next = [...slides]; const from = next.findIndex((slide) => slide.id === fromId); const to = next.findIndex((slide) => slide.id === toId); if (from < 0 || to < 0 || from === to) return; const [moved] = next.splice(from, 1); next.splice(to, 0, moved); setSlides(next); setDraggedId(null); await normalizeOrder(next); }
  async function removeSlide() { if (!db || !confirmDelete) return; const firestore = db; const slide = confirmDelete; setConfirmDelete(null); setBusy(true); setError(""); try { const ids = [...new Set([slide.desktopPublicId, slide.tabletPublicId, slide.mobilePublicId, slide.publicId].filter(Boolean))]; const response = await fetch("/api/cloudinary/delete", { method: "POST", headers: { Authorization: `Bearer ${user ? await user.getIdToken() : ""}`, "Content-Type": "application/json" }, body: JSON.stringify({ publicIds: ids }) }); if (!response.ok) throw new Error("Could not delete the Cloudinary image."); await deleteDoc(doc(firestore, "slideshow", slide.id)); await normalizeOrder(slides.filter((item) => item.id !== slide.id)); setMessage("Image deleted."); } catch (deleteError) { setError(deleteError instanceof Error ? deleteError.message : "Unable to delete image."); } finally { setBusy(false); } }

  const visibleSlides = viewTarget === "all" ? slides : slides.filter((slide) => Boolean(slide[`${viewTarget}ImageUrl` as "desktopImageUrl" | "tabletImageUrl" | "mobileImageUrl"]));
  const imageForView = (slide: SlideshowImage) => viewTarget === "desktop" ? slide.desktopImageUrl || slide.imageUrl : viewTarget === "tablet" ? slide.tabletImageUrl || slide.imageUrl : viewTarget === "mobile" ? slide.mobileImageUrl || slide.imageUrl : slide.imageUrl || slide.desktopImageUrl || slide.tabletImageUrl || slide.mobileImageUrl || "";

  if (!firebaseReady) return <SetupMessage />;
  if (!authReady || !user) return <LoadingScreen />;

  return <><main className="admin-page"><section className="admin-content"><Link className="admin-back" href="/control-room"><ArrowLeft size={16} /> Back to Control Room</Link><div className="admin-topbar"><div><p className="admin-kicker">Homepage</p><h1>Edit slideshow images</h1><p className="admin-intro">Choose where each uploaded hero image should appear.</p></div><div className="admin-user-actions"><span className="admin-user">{user.email}</span></div></div>{message && <div className="admin-notice success">{message}</div>}{error && <div className="admin-notice error">{error}</div>}<form className="upload-card" onSubmit={uploadSlide}><div className="upload-title"><UploadCloud size={19} /><div><h2>Upload hero image</h2><p>Images assigned to a device appear only on that device.</p></div></div><div className="upload-tabs" role="tablist" aria-label="Image device target">{(["all", "desktop", "tablet", "mobile"] as UploadTarget[]).map((item) => <button type="button" role="tab" aria-selected={target === item} className={target === item ? "active" : ""} key={item} onClick={() => setTarget(item)}>{item === "all" ? "All devices" : item === "desktop" ? "Laptop" : item === "tablet" ? "Tablet" : "Phone"}</button>)}</div><div className="upload-fields"><label className="file-field"><span>{target === "all" ? "Image for all devices" : `${target} image`}</span><input type="file" name="image" accept="image/jpeg,image/png,image/webp" required /></label><button className="admin-button" disabled={busy}>{busy ? <LoaderCircle className="spin" size={17} /> : <UploadCloud size={17} />} {busy ? "Uploading..." : "Upload image"}</button></div></form><div className="slides-header"><div><p className="admin-kicker">Live order</p><h2>{visibleSlides.length} {visibleSlides.length === 1 ? "image" : "images"}</h2></div><p>View the images assigned to each device. Drag a card to reorder the public hero.</p></div><div className="upload-tabs live-order-tabs" role="tablist" aria-label="Live order device view">{(["all", "desktop", "tablet", "mobile"] as UploadTarget[]).map((item) => <button type="button" role="tab" aria-selected={viewTarget === item} className={viewTarget === item ? "active" : ""} key={item} onClick={() => setViewTarget(item)}>{item === "all" ? "All devices" : item === "desktop" ? "Laptop" : item === "tablet" ? "Tablet" : "Phone"}</button>)}</div><div className="slides-list">{visibleSlides.length === 0 ? <div className="empty-slides"><ImagePlus size={28} /><h3>No images for this device</h3><p>Upload an image and assign it to this device above.</p></div> : visibleSlides.map((slide, index) => <article className={`slide-row ${draggedId === slide.id ? "dragging" : ""}`} key={slide.id} draggable onDragStart={() => setDraggedId(slide.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => draggedId && reorder(draggedId, slide.id)}><div className="drag-handle" aria-label="Drag to reorder"><Move size={17} /></div><div className="slide-preview" style={{ backgroundImage: `url("${imageForView(slide)}")` }} /><div className="slide-info"><span className="slide-number">{String(index + 1).padStart(2, "0")}</span><strong>Homepage hero image</strong><small>{[slide.desktopImageUrl && "Laptop", slide.tabletImageUrl && "Tablet", slide.mobileImageUrl && "Phone"].filter(Boolean).join(" · ") || "Unassigned"}</small></div><div className="row-actions"><button type="button" aria-label="Move up" disabled={index === 0 || busy} onClick={() => reorder(slides[slides.findIndex((item) => item.id === slide.id)].id, slides[Math.max(0, slides.findIndex((item) => item.id === slide.id) - 1)].id)}><ArrowUp size={17} /></button><button type="button" aria-label="Move down" disabled={index === visibleSlides.length - 1 || busy} onClick={() => { const position = slides.findIndex((item) => item.id === slide.id); if (position >= 0 && position < slides.length - 1) reorder(slide.id, slides[position + 1].id); }}><ArrowDown size={17} /></button><button type="button" className="delete-button" aria-label="Delete image" disabled={busy} onClick={() => setConfirmDelete(slide)}><Trash2 size={17} /></button></div></article>)}</div></section></main>{confirmDelete && <DeleteConfirmation slide={confirmDelete} onCancel={() => setConfirmDelete(null)} onConfirm={removeSlide} />}</>;
}

function DeleteConfirmation({ slide, onCancel, onConfirm }: { slide: SlideshowImage; onCancel: () => void; onConfirm: () => void }) { return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onCancel()}><div className="confirm-modal" role="dialog" aria-modal="true"><p className="admin-kicker">Remove image</p><h2>Delete this slideshow image?</h2><p>This removes the image from the homepage and Cloudinary.</p><div className="modal-preview" style={{ backgroundImage: `url("${slide.imageUrl || slide.desktopImageUrl || slide.tabletImageUrl || slide.mobileImageUrl || ""}")` }} /><div className="modal-actions"><button className="modal-cancel" onClick={onCancel}>Cancel</button><button className="modal-delete" onClick={onConfirm}>Delete image</button></div></div></div>; }
function SetupMessage() { return <main className="login-page"><div className="login-card"><p className="admin-kicker">Setup required</p><h1>Connect Firebase first</h1><p className="setup-copy">Add the Firebase web credentials to your local <code>.env.local</code> file, restart the dev server, and return here.</p></div></main>; }
function LoadingScreen() { return <main className="login-page"><LoaderCircle className="spin" size={28} /></main>; }
