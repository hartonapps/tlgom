import { ArrowRight, CalendarDays } from "lucide-react";
import { formatEventDate, type ChurchEvent } from "@/lib/events";

function statusFor(start: Date, now: Date, duration = 120) { const difference = start.getTime() - now.getTime(); if (difference <= 0 && difference >= -duration * 60000) return "Ongoing"; const minutes = Math.max(0, Math.floor(difference / 60000)); const days = Math.floor(minutes / 1440); const hours = Math.floor((minutes % 1440) / 60); return days ? `${days}d ${hours}h` : hours ? `${hours}h ${minutes % 60}m` : `${minutes % 60}m`; }

export default function EventCard({ event, start, now = new Date(), archive = false }: { event: ChurchEvent; start: Date; now?: Date; archive?: boolean }) {
  const status = statusFor(start, now, event.durationMinutes);
  return <a className={archive ? "events-archive-card" : "event-card events-archive-card"} href={archive ? `/events#event-${event.id}` : "/events"} id={archive ? `event-${event.id}` : undefined} key={event.id}><div className="events-archive-image" style={{ backgroundImage: event.imageUrl ? `url("${event.imageUrl}")` : undefined }}><span className={status === "Ongoing" ? "event-status ongoing" : "event-status"}>{status}</span>{!event.imageUrl && <CalendarDays size={32} />}</div><div className="events-archive-copy"><small>{formatEventDate(start)}{event.time ? ` · ${event.time}` : ""}</small><h2>{event.title}</h2><p className="events-archive-location">{event.location || "TLGOM"}{event.recurringSunday ? " · Every Sunday" : ""}</p>{event.description && <p className="events-archive-description">{event.description}</p>}<span className="events-archive-link">Event details <ArrowRight size={15} /></span></div></a>;
}
