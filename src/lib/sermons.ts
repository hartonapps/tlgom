export type Sermon = {
  id: string;
  title: string;
  speaker?: string;
  date?: string;
  coverImageUrl?: string;
  youtubeUrl?: string;
  description?: string;
  order?: number;
  enabled?: boolean;
};

export function normalizeSpeakerName(value?: string) {
  return (value || "").trim().replace(/\s+/g, " ").toLocaleLowerCase();
}

export function formatSpeakerName(value?: string) {
  return (value || "").trim().replace(/\s+/g, " ");
}

export function getYouTubeVideoId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([A-Za-z0-9_-]{11})/);
  return match?.[1] || "";
}

export function getYouTubeThumbnailUrl(url: string) {
  const id = getYouTubeVideoId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : "";
}
