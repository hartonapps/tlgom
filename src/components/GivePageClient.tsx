"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { normalizeGivingAccounts, type GivingAccount } from "@/lib/giving";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const categories = ["tithe", "offering"] as const;
const categoryInfo = {
  tithe: { title: "Tithe", intro: "Honor God with your tithe through the account details below.", verse: "Bring the whole tithe into the storehouse, that there may be food in my house. Test me in this," , reference: "Malachi 3:10" },
  offering: { title: "Offering", intro: "Give freely and cheerfully to support the work of the ministry.", verse: "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.", reference: "1 Corinthians 9:7" },
} as const;

function AccountCard({ account }: { account: GivingAccount }) {
  return <article className="give-details-card">
    <div className="give-bank-heading">
      <div className="give-bank-image">{account.imageUrl ? <img src={account.imageUrl} alt={`${account.bankName} logo`} /> : <span>{account.bankName.slice(0, 1)}</span>}</div>
      <div><small>{account.currency}</small><h3>{account.bankName}</h3></div>
    </div>
    <div className="give-account-details">
      <div><span>Account name</span><strong>{account.accountName}</strong></div>
      <div><span>Account number</span><strong>{account.accountNumber}</strong></div>
    </div>
    {account.note && <p className="give-account-note">{account.note}</p>}
  </article>;
}

export default function GivePageClient({ initialData }: { initialData?: Record<string, unknown> }) {
  const [accounts, setAccounts] = useState<GivingAccount[]>(normalizeGivingAccounts(initialData).filter((account) => account.visible !== false && account.accountNumber?.trim()));
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!db) { setLoading(false); return; }
    return onSnapshot(doc(db, "siteSettings", "giving"), (snapshot) => {
      setAccounts(normalizeGivingAccounts(snapshot.data() as Record<string, unknown> | undefined).filter((account) => account.visible !== false && account.accountNumber?.trim()));
      setLoading(false);
    }, () => setLoading(false));
  }, []);

  const grouped = useMemo(() => categories.map((category) => ({ category, accounts: accounts.filter((account) => (account.category || "offering") === category) })), [accounts]);
  return <main className="give-page"><SiteHeader />
    <section className="give-hero"><div className="container"><p className="section-kicker">Partnership & stewardship</p><h1>Tithe/Give</h1><p>Support the work of Christ through TLGOM.</p></div></section>
    <section className="give-content"><div className="container">
      <div className="give-intro"><div><p className="section-kicker">A living mission</p><h2>Give with purpose.</h2></div><p>Send your tithes and offering to the account details below. As you give, may you be blessed.</p></div>
      {loading ? <div className="give-loading">Loading account details...</div> : accounts.length === 0 ? <div className="give-loading">Account details are currently unavailable.</div> : <div className="giving-category-list">{grouped.map(({ category, accounts: categoryAccounts }) => categoryAccounts.length > 0 && <section className="giving-category" key={category}><div className="giving-category-heading"><div><p className="section-kicker">Give toward</p><h2>{categoryInfo[category].title}</h2></div><p>{categoryInfo[category].intro}</p></div><div className="give-account-list">{categoryAccounts.map((account) => <AccountCard account={account} key={account.id} />)}</div><blockquote className="giving-verse">“{categoryInfo[category].verse}”<cite>{categoryInfo[category].reference}</cite></blockquote></section>)}</div>}
      <div className="give-trust"><ShieldCheck size={24} /><div><h3>Give freely and prayerfully</h3><p>Thank you for supporting the work of TLGOM.</p></div></div>
      <Link className="give-contact-link" href="/#prayer-testimony">Need help or prayer? Connect with us <ArrowRight size={16} /></Link>
    </div></section><SiteFooter /></main>;
}
