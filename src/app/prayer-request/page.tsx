import type { Metadata } from "next";
import SubmissionForms from "@/components/SubmissionForms";

export const metadata: Metadata = { title: "Submit a Prayer Request | TLGOM", description: "Share your prayer request with The Life Global Outreach Ministries. Our ministry family is ready to stand with you in prayer." };
export default function PrayerRequestPage() { return <main><SubmissionForms /></main>; }
