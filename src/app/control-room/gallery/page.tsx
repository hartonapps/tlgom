"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { onAuthStateChanged, type User } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { ArrowRight, Eye, EyeOff, FolderTree, Images, LoaderCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth, db, firebaseReady } from "@/lib/firebase/client";
import type { GalleryAlbum, GalleryPhoto } from "@/lib/gallery";

export default function GalleryAdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { if (!auth) return; return onAuthStateChanged(auth, (next) => { setUser(next); setReady(true); }); }, []);
  useEffect(() => { if (ready && !user) router.replace("/control-room?next=/control-room/gallery"); }, [ready, user, router]);
  useEffect(() => {
    if (!db || !user) return;
    const stopAlbums = onSnapshot(collection(db, "galleryAlbums"), (snapshot) => setAlbums(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as GalleryAlbum)).sort((a, b) => (a.order || 0) - (b.order || 0))));
    const stopPhotos = onSnapshot(collection(db, "galleryPhotos"), (snapshot) => setPhotos(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as GalleryPhoto))));
    return () => { stopAlbums(); stopPhotos(); };
  }, [user]);

  async function createAlbum(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!db || !user) return;
    const formElement = event.currentTarget; const form = new FormData(formElement);
    setBusy(true); setError("");
    try {
      await addDoc(collection(db, "galleryAlbums"), {
        name: String(form.get("name") || "").trim(), slug: String(form.get("slug") || "").trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
        description: String(form.get("description") || "").trim(), parentId: String(form.get("parentId") || ""), ministrySlug: String(form.get("ministrySlug") || "").trim(),
        coverImageUrl: "", coverPublicId: "", visible: true, order: albums.length,
      });
      formElement.reset(); setMessage("Album created. Open it to add photos or create a child album.");
    } catch (saveError) { setError(saveError instanceof Error ? saveError.message : "Could not create album."); } finally { setBusy(false); }
  }

  async function toggleAlbum(album: GalleryAlbum) { if (db) await updateDoc(doc(db, "galleryAlbums", album.id), { visible: album.visible === false }); }
  async function removeAlbum(album: GalleryAlbum) {
    if (!db || !window.confirm(`Delete “${album.name}” and its album record? Photos inside it will also be removed.`)) return;
    const ids = new Set<string>(); const collect = (parentId: string) => { ids.add(parentId); albums.filter((item) => item.parentId === parentId).forEach((child) => collect(child.id)); }; collect(album.id);
    try { const relatedPhotos = photos.filter((photo) => ids.has(photo.albumId)); const publicIds = relatedPhotos.map((photo) => photo.publicId).filter(Boolean); if (publicIds.length && user) await fetch("/api/cloudinary/delete", { method: "POST", headers: { Authorization: `Bearer ${await user.getIdToken()}`, "Content-Type": "application/json" }, body: JSON.stringify({ publicIds }) }); await Promise.all(relatedPhotos.map((photo) => deleteDoc(doc(db!, "galleryPhotos", photo.id)))); await Promise.all([...ids].map((id) => deleteDoc(doc(db!, "galleryAlbums", id)))); setMessage("Album and its nested albums deleted."); } catch { setError("Could not delete album."); }
  }

  function renderTree(parentId = "", depth = 0): ReactNode {
    return albums.filter((album) => (album.parentId || "") === parentId).map((album) => <div className="gallery-tree-node" key={album.id} style={{ marginLeft: `${depth * 24}px` }}>
      <article className="gallery-admin-album">
        <div className="gallery-admin-album-cover" style={{ backgroundImage: album.coverImageUrl ? `url("${album.coverImageUrl}")` : undefined }}>{!album.coverImageUrl && <Images size={17} />}</div>
        <div className="sermon-admin-copy"><strong>{album.name}</strong><small>/{album.slug}{album.ministrySlug ? ` · ${album.ministrySlug}` : ""}</small></div>
        <Link className="gallery-open-link" href={`/control-room/gallery/${album.id}`}>Manage album <ArrowRight size={14} /></Link>
        <button className="admin-visibility-button" title={album.visible === false ? "Publish album" : "Hide album"} type="button" onClick={() => toggleAlbum(album)}>{album.visible === false ? <EyeOff size={16} /> : <Eye size={16} />}</button>
        <button className="sermon-action-button delete" title="Delete album" type="button" onClick={() => removeAlbum(album)}><Trash2 size={15} /></button>
      </article>
      {renderTree(album.id, depth + 1)}
    </div>);
  }

  if (!firebaseReady || !ready || !user) return <main className="login-page"><LoaderCircle className="spin" size={28} /></main>;
  return <main className="admin-page"><section className="admin-content">
    <Link className="admin-back" href="/control-room"><ArrowRight size={16} style={{ transform: "rotate(180deg)" }} /> Back to Control Room</Link>
    <div className="admin-topbar"><div><p className="admin-kicker">Digital archive</p><h1>Manage photo gallery</h1><p className="admin-intro">Build one connected album tree. Open any album to edit it, upload photos, reorder them, or add another level beneath it.</p></div></div>
    {message && <div className="admin-notice success">{message}</div>}{error && <div className="admin-notice error">{error}</div>}
    <form className="sermon-form" onSubmit={createAlbum}><div className="upload-title"><FolderTree size={19} /><div><h2>Create an album</h2><p>Leave the parent empty for a top-level album, or choose one to nest it.</p></div></div>
      <div className="sermon-form-grid"><label>Album name<input name="name" required placeholder="Evangelism" /></label><label>Slug<input name="slug" required placeholder="evangelism-ministry" /></label><label>Parent album<select name="parentId" defaultValue=""><option value="">Top-level album</option>{albums.map((album) => <option value={album.id} key={album.id}>{album.name}{album.parentId ? " · nested" : ""}</option>)}</select></label><label>Connect to ministry slug <span className="field-note">Optional</span><input name="ministrySlug" placeholder="youth-ministry" /></label><label className="wide-field">Description<textarea name="description" placeholder="What visitors will find in this album." /></label></div>
      <p className="gallery-cover-note">Covers are chosen automatically from photos uploaded inside the album. A parent with no photos inherits a cover from its nested albums.</p><button className="admin-button" disabled={busy}>{busy ? "Creating..." : "Create album"}</button>
    </form>
    <div className="gallery-admin-layout"><div><div className="slides-header"><div><p className="admin-kicker">Album tree</p><h2>{albums.length} {albums.length === 1 ? "album" : "albums"}</h2></div><p>Each row is one album. Use Manage album to open its own workspace.</p></div><div className="gallery-admin-albums">{albums.length ? renderTree() : <div className="empty-slides"><FolderTree size={28} /><h3>No albums yet</h3><p>Create your first top-level album above.</p></div>}</div></div></div>
  </section></main>;
}
