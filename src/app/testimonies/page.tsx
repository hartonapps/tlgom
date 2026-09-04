import type { Metadata } from "next";
import SubmissionForms from "@/components/SubmissionForms";

export const metadata: Metadata = { title: "Share Your Testimony | TLGOM", description: "Share what God has done in your life with The Life Global Outreach Ministries." };
export default function TestimoniesPage() { return <main><SubmissionForms /></main>; }
