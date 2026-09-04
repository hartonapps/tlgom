import { ArrowRight, Play, Video } from "lucide-react";
import { formatSpeakerName, getYouTubeThumbnailUrl, type Sermon } from "@/lib/sermons";

export default function SermonCard({ sermon, archive = false }: { sermon: Sermon; archive?: boolean }) {
  const thumbnail = sermon.coverImageUrl || getYouTubeThumbnailUrl(sermon.youtubeUrl || "");
  return <a className={archive ? "sermon-archive-card" : "sermon-card sermon-archive-card"} href={sermon.youtubeUrl || "#"} target={sermon.youtubeUrl ? "_blank" : undefined} rel={sermon.youtubeUrl ? "noreferrer" : undefined} key={sermon.id}><div className="sermon-archive-image" style={{ backgroundImage: thumbnail ? `url("${thumbnail}")` : undefined }}>{!thumbnail && <Video size={30} />}<span><Play size={14} fill="currentColor" /> Watch message</span></div><div className="sermon-archive-copy"><small>{sermon.date || "Message"}</small><h2>{sermon.title}</h2><p className="sermon-archive-speaker">{formatSpeakerName(sermon.speaker) || "TLGOM"}</p>{sermon.description && <p className="sermon-archive-description">{sermon.description}</p>}<span className="sermon-archive-link">Watch sermon <ArrowRight size={15} /></span></div></a>;
}
