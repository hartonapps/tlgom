"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { ArrowLeft, Edit3, Eye, EyeOff, LoaderCircle, Plus, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth, db, firebaseReady } from "@/lib/firebase/client";
import { defaultGivingSettings, givingCurrencies, normalizeGivingAccounts, type GivingAccount } from "@/lib/giving";

const blank = (id: string): GivingAccount => ({ id, imageUrl: "", bankName: "", accountName: "", accountNumber: "", currency: "NGN", note: "", category: "offering", visible: true });

async function uploadBankImage(file: File, token: string) {
  const response = await fetch("/api/cloudinary/sign", { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ folder: "tlgom/branding" }) });
  const signature = await response.json();
  if (!response.ok) throw new Error(signature.error || "Could not authorize upload.");
  const form = new FormData();
  form.append("file", file); form.append("api_key", signature.apiKey); form.append("timestamp", signature.timestamp); form.append("folder", signature.folder); form.append("signature", signature.signature);
  const upload = await fetch(`https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`, { method: "POST", body: form });
  const result = await upload.json();
  if (!upload.ok) throw new Error(result.error?.message || "Cloudinary upload failed.");
  return result.secure_url as string;
}

export default function GivingAdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [accounts, setAccounts] = useState<GivingAccount[]>(defaultGivingSettings.accounts);
  const [editing, setEditing] = useState<GivingAccount | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { if (!auth) return; return onAuthStateChanged(auth, (next) => { setUser(next); setReady(true); }); }, []);
  useEffect(() => { if (ready && !user) router.replace("/control-room?next=/control-room/giving"); }, [ready, user, router]);
  useEffect(() => {
    if (!db || !user) return;
    return onSnapshot(doc(db, "siteSettings", "giving"), (snapshot) => {
      const saved = normalizeGivingAccounts(snapshot.data() as Record<string, unknown> | undefined);
      setAccounts(saved.map((account) => ({ ...blank(account.id), ...account })));
    });
  }, [user]);

  function update(key: keyof GivingAccount, value: string) { setEditing((current) => current ? { ...current, [key]: value } : current); }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!db || !user || !editing) return;
    if (!editing.bankName.trim() || !editing.accountName.trim() || !editing.accountNumber.trim()) { setError("Complete the bank, account name, and account number fields."); return; }
    setBusy(true); setError("");
    try {
      const file = new FormData(event.currentTarget).get("image");
      const imageUrl = file instanceof File && file.size ? await uploadBankImage(file, await user.getIdToken()) : editing.imageUrl;
      const updated = { ...editing, imageUrl, bankName: editing.bankName.trim(), accountName: editing.accountName.trim(), accountNumber: editing.accountNumber.trim(), currency: editing.currency.trim().toUpperCase(), category: editing.category || "offering", note: editing.note.trim() };
      const nextAccounts = accounts.some((account) => account.id === editing.id) ? accounts.map((account) => account.id === editing.id ? updated : account) : [...accounts, updated];
      await setDoc(doc(db, "siteSettings", "giving"), { accounts: nextAccounts }, { merge: true });
      setEditing(null); setMessage("Account details saved.");
    } catch (saveError) { setError(saveError instanceof Error ? saveError.message : "Could not save account details."); }
    finally { setBusy(false); }
  }

  async function remove(account: GivingAccount) {
    if (!db || !window.confirm(`Delete ${account.bankName} account?`)) return;
    await setDoc(doc(db, "siteSettings", "giving"), { accounts: accounts.filter((item) => item.id !== account.id) }, { merge: true }); setMessage("Account deleted.");
  }
  async function toggle(account: GivingAccount) {
    if (!db) return;
    await setDoc(doc(db, "siteSettings", "giving"), { accounts: accounts.map((item) => item.id === account.id ? { ...item, visible: item.visible === false } : item) }, { merge: true });
  }

  if (!firebaseReady || !ready || !user) return <main className="login-page"><LoaderCircle className="spin" size={28} /></main>;
  return <main className="admin-page"><section className="admin-content">
    <Link className="admin-back" href="/control-room"><ArrowLeft size={16} /> Back to Control Room</Link>
    <div className="admin-topbar"><div><p className="admin-kicker">Public giving</p><h1>Edit account details</h1><p className="admin-intro">Save each bank account as a separate record and assign its currency.</p></div></div>
    {message && <div className="admin-notice success">{message}</div>}{error && <div className="admin-notice error">{error}</div>}
    <div className="giving-admin-list">{accounts.map((account) => <article className={`giving-admin-row ${account.visible === false ? "is-hidden" : ""}`} key={account.id}>
      {account.imageUrl && <img src={account.imageUrl} alt="" />}<div><strong>{account.bankName || "Unnamed bank"}</strong><small>{account.currency} · {account.accountName} · {account.accountNumber}</small></div>
      <button type="button" title={account.visible === false ? "Show account" : "Hide account"} onClick={() => toggle(account)}>{account.visible === false ? <EyeOff size={17} /> : <Eye size={17} />}</button>
      <button type="button" title="Edit account" onClick={() => setEditing(account)}><Edit3 size={17} /></button><button type="button" title="Delete account" onClick={() => remove(account)}><Trash2 size={17} /></button>
    </article>)}</div>
    <button type="button" className="admin-button" onClick={() => setEditing(blank(`account-${Date.now()}`))}><Plus size={17} /> Add account</button>
    {editing && <form className="sermon-form edit-sermon-form" onSubmit={save}><div className="upload-title"><Edit3 size={19} /><div><h2>{accounts.some((account) => account.id === editing.id) ? "Edit account" : "Add account"}</h2><p>Set the bank details shown under the selected currency tab.</p></div><button className="icon-close-button" type="button" onClick={() => setEditing(null)}><X size={18} /></button></div>
      <div className="sermon-form-grid"><label>Account category<select value={editing.category} onChange={(event) => update("category", event.target.value)}><option value="tithe">Tithe</option><option value="offering">Offering</option></select></label><label>Bank image<input name="image" type="file" accept="image/jpeg,image/png,image/webp" /></label><label>Currency<select value={editing.currency} onChange={(event) => update("currency", event.target.value)}>{givingCurrencies.map((item) => <option key={item}>{item}</option>)}</select></label><label>Bank name<input required value={editing.bankName} onChange={(event) => update("bankName", event.target.value)} /></label><label>Account name<input required value={editing.accountName} onChange={(event) => update("accountName", event.target.value)} /></label><label>Account number<input required value={editing.accountNumber} onChange={(event) => update("accountNumber", event.target.value)} /></label><label className="wide-field">Explanation <span className="field-note">Optional</span><textarea value={editing.note} onChange={(event) => update("note", event.target.value)} /></label></div>
      {editing.imageUrl && <img className="giving-admin-preview" src={editing.imageUrl} alt="Current bank logo" />}<button className="admin-button" disabled={busy}>{busy ? "Saving..." : "Save account"}</button>
    </form>}
  </section></main>;
}
