export type ChurchEvent = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  date?: string;
  time?: string;
  durationMinutes?: number;
  imageUrl?: string;
  publicId?: string;
  recurringSunday?: boolean;
  order?: number;
  enabled?: boolean;
};

export function getNextEventDate(event: ChurchEvent, now = new Date()) {
  if (!event.recurringSunday) {
    if (!event.date) return null;
    const date = new Date(`${event.date}T${event.time || "00:00"}`);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  if (!event.time) return null;
  const next = new Date(now);
  const daysUntilSunday = (7 - next.getDay()) % 7;
  next.setDate(next.getDate() + daysUntilSunday);
  const [hours, minutes] = event.time.split(":").map(Number);
  next.setHours(hours || 0, minutes || 0, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 7);
  return next;
}

export function formatEventDate(date: Date) {
  return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}
