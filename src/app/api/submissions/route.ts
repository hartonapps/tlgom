import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";

export const runtime = "nodejs";

const clean = (value: unknown, max = 5000) => String(value || "").trim().slice(0, max);
const html = (value: string) => value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] || character).replace(/\n/g, "<br />");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const type = body.type === "testimony" ? "testimony" : "prayer";
    const name = clean(body.name, 120); const phone = clean(body.phone, 50); const email = clean(body.email, 160); const message = clean(body.message, 10000); const whatsapp = Boolean(body.whatsapp); const consent = Boolean(body.consent); const publicConsent = Boolean(body.publicConsent);
    if (!name || !phone || !message) return NextResponse.json({ error: "Name, phone number, and message are required." }, { status: 400 });
    const db = getAdminDb(); const submission = { type, name, phone, email, message, whatsapp, consent, publicConsent, viewed: false, createdAt: new Date() };
    await db.collection("submissions").add(submission);
    const settings = await db.collection("siteSettings").doc("notifications").get(); const recipients = Array.isArray(settings.data()?.notificationEmails) ? settings.data()?.notificationEmails.filter((item: unknown) => typeof item === "string" && item.includes("@")) : [];
    let emailSent = false;
    if (process.env.RESEND_API_KEY && process.env.RESEND_FROM && recipients.length) {
      const emailResponse = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.RESEND_FROM, to: recipients, subject: `New ${type} submission from ${name}`, html: `<div style="font-family:Arial,sans-serif;color:#1f2855;max-width:680px"><h2 style="margin-bottom:20px">New ${type} submission</h2><table style="border-collapse:collapse;width:100%;font-size:14px"><tbody><tr><th style="background:#f1f3fa;border:1px solid #dfe3ed;padding:11px;text-align:left;width:150px">Name</th><td style="border:1px solid #dfe3ed;padding:11px">${html(name)}</td></tr><tr><th style="background:#f1f3fa;border:1px solid #dfe3ed;padding:11px;text-align:left">Phone</th><td style="border:1px solid #dfe3ed;padding:11px">${html(phone)}${whatsapp ? " · WhatsApp" : ""}</td></tr><tr><th style="background:#f1f3fa;border:1px solid #dfe3ed;padding:11px;text-align:left">Email</th><td style="border:1px solid #dfe3ed;padding:11px">${html(email || "Not provided")}</td></tr><tr><th style="background:#f1f3fa;border:1px solid #dfe3ed;padding:11px;text-align:left">Public consent</th><td style="border:1px solid #dfe3ed;padding:11px">${publicConsent ? "Yes" : "No"}</td></tr><tr><th style="background:#f1f3fa;border:1px solid #dfe3ed;padding:11px;text-align:left;vertical-align:top">Message</th><td style="border:1px solid #dfe3ed;padding:11px;line-height:1.6">${html(message)}</td></tr></tbody></table></div>` }) });
      emailSent = emailResponse.ok;
      if (!emailResponse.ok) console.error("Resend rejected submission notification:", await emailResponse.text());
    } else {
      console.warn("Submission stored, but email notification was skipped. Check RESEND_API_KEY, RESEND_FROM, and Control Room notification recipients.");
    }
    return NextResponse.json({ ok: true, emailSent });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not submit your request." }, { status: 500 }); }
}
